import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import exifParser from "exif-parser";

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCES_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCRESS_KEY,
  },
});

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");  // File Blob
  let filePath = formData.get("filePath");  // Directory path
  const fileName = formData.get("fileName");  // File name
  console.log("File Name: ", fileName, "File path: ", filePath);

  if (!file) {
    return NextResponse.json({ error: "File data is required" }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer(); // Convert Blob to buffer
  const imageBuffer = Buffer.from(fileBuffer);

  let rotationAngle = 0;
  const fileType = file.type; // Get the file type from the blob
  console.log("File Type: ", fileType);

  // Only attempt to parse EXIF data if the file is JPEG
  if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
    // Parse EXIF data from the file buffer
    try {
      const parser = exifParser.create(imageBuffer);
      const exifData = parser.parse();
      console.log("EXIF Data: ", exifData);

      // Step 1: Determine the required rotation based on EXIF orientation
      switch (exifData.tags?.Orientation) {  // Optional chaining in case Orientation is missing
        case 3:
          rotationAngle = 180; // Rotate 180 degrees
          console.log("Rotating 180 degrees");
          break;
        case 6:
          rotationAngle = 90; // Rotate 90 degrees clockwise
          console.log("Rotating 90 degrees clockwise");
          break;
        case 8:
          rotationAngle = -90; // Rotate 90 degrees counter-clockwise
          console.log("Rotating 90 degrees counterclockwise");
          break;
        default:
          console.log("No rotation needed");
          rotationAngle = 0; // No rotation needed (e.g., Orientation: 1)
      }
    } catch (error) {
      console.error("Error parsing EXIF data: ", error);  // Handle EXIF parsing errors
    }
  } else {
    console.log("Non-JPEG file, skipping EXIF parsing");
  }

  // Step 2: Process the image using sharp with the correct orientation
  try {
    const fileSharpBuffer = await sharp(imageBuffer)
      .rotate(rotationAngle)  // Apply the correct rotation based on EXIF for JPEG
      .webp({ quality: 75 })   // Convert to WebP format for compression
      .toBuffer();

    // Ensure filePath ends with a "/"  

    const params = {
      Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
      Key: filePath,  // Use filePath + fileName as the full key
      Body: fileSharpBuffer,
      ContentType: "image/webp",
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.error("Error during sharp processing:", error);  // Log sharp-related errors
    return NextResponse.json({ error: "Error during image processing", details: error.message }, { status: 500 });
  }
}
