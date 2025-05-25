import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };
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
          onClick={() => setImage(null)}
        >
          <FaTimes />
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
