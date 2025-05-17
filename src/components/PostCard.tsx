import { Posts } from "@/types/posts";
import React from "react";
import { Button } from "./ui/button";
import { FaPen, FaTimes } from "react-icons/fa";
interface PostCardProps {
  post: Posts;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
const PostCard = ({ post, onDelete, onEdit }: PostCardProps) => {
  const handleEdit = () => onEdit(post.id);
  const handleDelete = () => onDelete(post.id);

  return (
    <div className="border p-5 rounded shadow-xl my-2">
      <div className="p-2">
        <h2 className="text-center font-bold text-xl border-b-2 py-2">
          {post.title}
        </h2>
        <p className="p-2 ">{post.body}</p>
      </div>
      <div className="">
        <div className="flex justify-between p-2">
          <Button
            className=" cursor-pointer"
            type="button"
            onClick={handleEdit}
          >
            <FaPen />
          </Button>
          <Button
            className=" cursor-pointer"
            type="button"
            onClick={handleDelete}
          >
            <FaTimes />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
