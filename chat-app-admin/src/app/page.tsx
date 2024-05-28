"use client";

import {UploadButton} from "@/utils/uploadthing";
import axios from "axios";
import Image from "next/image";
import {useEffect, useState} from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const [data, setData] = useState([]);
  const handleUpload = (name: string, url: string) => {
    axios
      .post("/api/upload", {name, url})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("/api/upload")
      .then((response) => {
        console.log(response);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex h-screen flex-col items-center justify-center p-20">
      <div>
        <h1>upload gif</h1>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res[0]?.url);
            handleUpload(res[0]?.name, res[0]?.url);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <div className="mt-10">
        <h1>All Gifs</h1>
        <div className="flex flex-row gap-5 mt-5">
          {data &&
            data.map((item: any) => {
              return (
                <Image
                  key={item._id}
                  src={item.url}
                  alt={item.name}
                  width={400}
                  height={500}
                  className="h-40 w-auto"
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
