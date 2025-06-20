"use client";

import PostForm from "@/components/PostForm";
import { useUserContext } from "@/context/UserContext";
import { UpdatePost } from "@/types/posts";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditPostPage = () => {
  const { posts, editPost } = useUserContext();
  const { id } = useParams();
  const router = useRouter();

  const postToEdit = posts.find((post) => post.id === Number(id));

  const handleSubmit = async (data:UpdatePost) => {
    try {
      await editPost(Number(id), data);
      router.push("/posts");
      toast.success("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Error updating post");
    }
  };

  if (!postToEdit)
    return (
      <div className="text-center text-2xl font-bold my-10">
        Post not found!
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold text-center my-5">Edit for {postToEdit.title}</h1>
      <PostForm initialData={postToEdit} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditPostPage;
