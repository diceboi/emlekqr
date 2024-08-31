import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp";

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_AWS_S3_ACCES_KEY_ID,
      secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCRESS_KEY,
    },
});


async function uploadFileToS3(file, fileName, year, type, datasheet) {
    const fileBuffer = await sharp(file).webp({quality: 75}).toBuffer()
    console.log(fileName)
    console.log(year)
    console.log(type)
    console.log(datasheet)

    const yearPath = year ? `${year}/` : '';
    const typePath = type ? `${type}/` : '';

    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key: `${datasheet}/${typePath}${yearPath}${fileName}`,
        Body: fileBuffer,
        ContentType: "image/webp",
    };
    
    const command = new PutObjectCommand(params);
    await s3Client.send(command)
    return fileName

}

export async function POST(request) {

    try {

        const formData = await request.formData();
        const file = formData.get("file")
        const year = formData.get("year")
        const type = formData.get("type")
        const datasheet = formData.get("datasheet")

        if(!file) {
            return NextResponse.json({ error: "Fájl kiválasztása kötelező" }, { status: 400 })
        }

        const buffer= Buffer.from(await file.arrayBuffer())
        const fileName = await uploadFileToS3(buffer, file.name, year, type, datasheet)

        return NextResponse.json({ success: true, fileName })
        
    } catch (error) {
        return NextResponse.json({ error: "Fájl feltöltés sikertelen", error })
    }

    

}