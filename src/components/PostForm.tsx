"use client";

import { updatePostValidation } from "@/helper/registerValidation";
import { NewPost, Posts } from "@/types/posts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


interface PostFormProps {
  initialData?: Partial<Posts>;
  onSubmit: (data: NewPost) => Promise<void>;
}
const PostForm = ({ initialData ,onSubmit }: PostFormProps) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPost>({
    defaultValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
    },
    resolver: yupResolver(updatePostValidation),
  });
  const handlePostSubmit = async (data: NewPost) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setError("root", { message: "Submission failed" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handlePostSubmit)}
      className="flex flex-col gap-4 w-6/12 max-sm:w-full m-auto my-5 border rounded-2xl p-5 shadow-lg "
    >
      <div>
        <Input
          type="text"
          {...register("title")}
          className="w-full h-10 p-5"
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>
      <div>
        <Textarea
          placeholder="Write your post here..."
          className="w-full p-5 "
          {...register("body")}
        />
        {errors.body && <p className="text-red-600">{errors.body.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-blue-500">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default PostForm;
