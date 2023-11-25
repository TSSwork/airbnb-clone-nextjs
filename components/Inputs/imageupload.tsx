
"use client";
import React, { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

type ImageUploadProps ={
  onChange: (value: string) => void;
  value: string;
}

export default function ImageUpload({
  onChange,
  value,
}: ImageUploadProps) {

  const handleUpload = useCallback((result:any) => {
    onChange(result.info.secure_url);
  },[onChange])

  return (
    <CldUploadWidget 
    onUpload={handleUpload}
    uploadPreset='fuakpecs'
    options={{
      maxFiles:1
    }}
    
    >
      {({ open }) => {
        return(
          <div
          onClick={() => open?.()}
          className="relative cursor-pointer haove:opacity-70 transition border-dashed
          border-2 p-20 border-neutral-500 flex flex-col justify-center items-center
          gap-4 text-neutral-500"
          >
            <TbPhotoPlus size={50} />
            <div className="text-semibold text-lg">
              Click to upload
            </div>
            {value && (
              <div className="absolute insent-0 w-full h-full p-2">
                <Image src={value} alt="uploaded image" fill style={{ objectFit: 'cover'}}/>
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}
