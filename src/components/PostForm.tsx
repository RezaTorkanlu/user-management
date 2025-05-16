"use client";

import { updatePostValidation } from "@/helper/registerValidation";
import { NewPost, Posts } from "@/types/posts";
import { Form, useFormik } from "formik";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PostFormProps {
  initialData?: Partial<Posts>;
  onSubmit: (data: NewPost) => Promise<void>;
}
const PostForm = ({ initialData, onSubmit }: PostFormProps) => {
  const [title, setTitle] = useState(initialData?.title);
  const [text, setText] = useState(initialData?.body);
  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
    },
    onSubmit: async (values) => {
      try {
        await onSubmit(values as NewPost);
        if (!initialData) {
          setTitle("");
          setText("");
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    validationSchema: updatePostValidation,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 w-6/12 max-sm:w-full m-auto my-5 border rounded-2xl p-5 shadow-lg "
    >
      <div>
        <Input
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          name="title"
          className="w-full h-10 p-5"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-600">{formik.errors.title}</p>
        )}
      </div>
      <div>
        <Textarea
          placeholder="Write your post here..."
          value={formik.values.body}
          onChange={formik.handleChange}
          name="body"
          className="w-full p-5 "
        />
        {formik.touched.body && formik.errors.body && (
          <p className="text-red-600">{formik.errors.body}</p>
        )}
      </div>
      <Button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default PostForm;
