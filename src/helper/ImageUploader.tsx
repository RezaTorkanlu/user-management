import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
type ImageUploaderProps = {
  onUpload:(file: File | null) => void;
}
const ImageUploader = ({onUpload} :ImageUploaderProps) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    onUpload(file);
  };

  const handleClearImage = () => {
    setImage(null);
    onUpload(null);
  }
  return (
    <div className="flex flex-col items-center justify-between">
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className="size-40 rounded-full"
        />
      )}
      <label htmlFor="pic">Upload Your Image</label>
      {image ? 'Change Image' : 'Select Image'}
      <div className="flex items-center justify-center mt-4 gap-5">
        <Input
          id="pic"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className=" w-full"
        />
        <Button
          type="button"
          className="cursor-pointer"
          onClick={handleClearImage}
        >
          <FaTimes />
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
