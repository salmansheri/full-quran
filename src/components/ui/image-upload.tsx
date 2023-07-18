"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Button } from "./button";
import { ImagePlus } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  disabled,
}) => {
  const onUploadImage = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      {value.map((url) => (
        <div key={url} className=" relative w-[200px] h-[200px]">
          <Image
            src={url}
            alt="upload"
            fill
            className="object-cover object-center"
          />
        </div>
      ))}

      <CldUploadWidget onUpload={onUploadImage} uploadPreset="z1pzvmfo">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus />
              Upload An Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
