"use client";
import { SingleImageDropzone } from "./SingleIMageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { Button } from "./ui/button";

export function SingleImageDropzoneUsage({
  onUploadResponse,
}: {
  onUploadResponse: (res: any) => void;
}) {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [isdisable, setIsdisable] = useState(false);
  const [Upload, setUpload] = useState("upload");
  const handleUpload = async (e: any) => {
    e.preventDefault();
    setIsdisable(true);
    setUpload("Uploading");
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          // console.log(progress);
        },
      });
      // you can run some server action or api here
      // to add the necessary data to your database
      console.log(res);
      // Pass the response data to the parent component
      onUploadResponse(res);
      setUpload("Uploaded");
    }
    setIsdisable(false);
  };

  return (
    <div>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <Button disabled={isdisable} onClick={handleUpload}>
        {Upload}
      </Button>
    </div>
  );
}
