"use client";

import { useState } from "react";
import { revalidatePath } from 'next/cache'

const UploadForm = ({year, type, datasheet, closemodal}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("year", year)
    formData.append("type", type)
    formData.append("datasheet", datasheet)

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUploading(false);
      closemodal()
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  }

  return (
    <>
      <h1>Upload Files to S3 Bucket</h1>
      

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </>
  );
};

export default UploadForm;