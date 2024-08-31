"use server"

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCES_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCRESS_KEY,
  },
});

export const listS3Objects = async (bucket, prefix) => {
  const params = {
    Bucket: bucket,
    Prefix: prefix,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const data = await s3Client.send(command);
    return data.Contents.map(item => `https://${bucket}.s3.amazonaws.com/${item.Key}`);
  } catch (err) {
    console.error('Error fetching objects from S3:', err);
    return [];
  }
};