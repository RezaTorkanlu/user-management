import { Input } from "@/components/ui/input"
import { useState } from "react"

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null)
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
    }
  }
  return (
    <div >
      {image && <img src={URL.createObjectURL(image)} alt="preview" className="size-40 rounded-full flex m-auto" />}
      <label htmlFor="pic" >Upload Your Image</label>
      <Input id="pic" type="file" accept="image/*" onChange={handleImageChange} className="mt-4" />
    </div>
  )
}

export default ImageUploader