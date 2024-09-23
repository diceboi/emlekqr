import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCES_KEY_ID,
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCRESS_KEY,
    },
});

async function uploadFileToS3(fileBuffer, filePath, fileName) {
    const fileSharpBuffer = await sharp(Buffer.from(fileBuffer, 'base64')).webp({ quality: 75 }).toBuffer();

    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key: filePath, // Full path for S3 Key
        Body: fileSharpBuffer,
        ContentType: "image/webp",
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return fileName;
}

export async function POST(request) {
    try {
        const { fileBuffer, filePath, fileName } = await request.json();

        if (!fileBuffer) {
            return NextResponse.json({ error: "File data is required" }, { status: 400 });
        }

        const uploadedFileName = await uploadFileToS3(fileBuffer, filePath, fileName);

        return NextResponse.json({ success: true, fileName: uploadedFileName });
    } catch (error) {
        return NextResponse.json({ error: "File upload failed", details: error.message }, { status: 500 });
    }
}
