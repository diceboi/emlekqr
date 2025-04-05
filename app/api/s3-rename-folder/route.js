import { NextResponse } from "next/server";
import { S3Client, CopyObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Create S3 client with proper configuration
const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCES_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCRESS_KEY,
  },
});

export async function POST(request) {
  try {
    const { sourceFolder, destinationFolder } = await request.json();

    if (!sourceFolder || !destinationFolder) {
      return NextResponse.json(
        { success: false, error: "Source and destination folders are required" },
        { status: 400 }
      );
    }

    console.log(`Renaming folder from ${sourceFolder} to ${destinationFolder}`);

    // List all objects in the source folder
    const listParams = {
      Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME || "elmekqr-storage",
      Prefix: sourceFolder,
    };

    console.log("Listing objects with params:", listParams);
    const listCommand = new ListObjectsV2Command(listParams);
    const listedObjects = await s3Client.send(listCommand);

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      return NextResponse.json(
        { success: false, error: "Source folder is empty or doesn't exist" },
        { status: 404 }
      );
    }

    console.log(`Found ${listedObjects.Contents.length} objects to move`);

    // Process each object one by one instead of using Promise.all to better track issues
    const results = [];
    for (const object of listedObjects.Contents) {
      try {
        const sourceKey = object.Key;
        const destinationKey = sourceKey.replace(sourceFolder, destinationFolder);

        console.log(`Moving ${sourceKey} to ${destinationKey}`);
        
        // Properly URL encode the source path for CopySource
        const encodedSource = encodeURIComponent(`${process.env.NEXT_AWS_S3_BUCKET_NAME || "elmekqr-storage"}/${sourceKey}`)
          .replace(/%2F/g, '/'); // Keep forward slashes as-is for S3 paths
        
        const copyParams = {
          Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME || "elmekqr-storage",
          CopySource: encodedSource,
          Key: destinationKey,
        };

        console.log("Copy params:", JSON.stringify(copyParams, null, 2));
        
        const copyCommand = new CopyObjectCommand(copyParams);
        await s3Client.send(copyCommand);

        // After successful copy, delete the original object
        const deleteParams = {
          Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME || "elmekqr-storage",
          Key: sourceKey,
        };

        const deleteCommand = new DeleteObjectCommand(deleteParams);
        await s3Client.send(deleteCommand);

        results.push({ 
          sourceKey, 
          destinationKey, 
          status: "success" 
        });
      } catch (err) {
        console.error(`Error processing object ${object.Key}:`, err);
        results.push({ 
          sourceKey: object.Key, 
          error: err.message,
          status: "error" 
        });
      }
    }

    const successCount = results.filter(r => r.status === "success").length;
    const errorCount = results.filter(r => r.status === "error").length;

    return NextResponse.json({ 
      success: errorCount === 0,
      message: `${successCount} files moved successfully, ${errorCount} files failed`,
      sourceFolder,
      destinationFolder,
      details: results
    });
  } catch (error) {
    console.error("Error renaming S3 folder:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Error renaming folder",
        stack: error.stack
      },
      { status: 500 }
    );
  }
}