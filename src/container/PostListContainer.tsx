"use client";

import Error from "@/app/Error";
import Loading from "@/app/Loading";
import PostList from "@/components/PostList";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PostListContainer = () => {
  const { posts, removePost, loading, error } = useUserContext();
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const filterPosts = posts.filter((post) =>
    post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  const handleDeletePost = async (id: number) => {
    if (window.confirm("Are You Sure You Want To Delete This Post?")) {
      try {
        await removePost(id);
        toast.success("Post Deleted !");
      } catch (error) {
        console.error("error deleting post :", error);
        toast.error("Oporation is faild");
      }
    } else {
      toast.info("Post deletion cancelled");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  const handleEditPost = (id: number) => {
    router.push(`/posts/edit/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center w-6/12 m-auto ">
        <Input
          placeholder="search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <PostList
        posts={filterPosts}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />
    </div>
  );
};

export default PostListContainer;
