import { Posts } from "@/types/posts";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaPen, FaTimes } from "react-icons/fa";
import Link from "next/link";

interface PostListProps {
  posts: Posts[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
const PostList = ({ onDelete, onEdit, posts }: PostListProps) => {
  if (!Array.isArray(posts) || posts.length === 0)
    return <p className=" font-bold text-center text-2xl">Post Not Found!</p>;

  return (
    <Table className="mt-5">
      <TableHeader className="bg-gray-500">
        <TableRow >
          <TableHead className="text-white">Title</TableHead>
          <TableHead className="text-white">Post</TableHead>
          <TableHead className="text-center text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id} className="odd:bg-gray-100 even:bg-gray-300">
            <TableCell className="max-w-98 truncate"><Link href={`posts/${post.id}`}>{ post.title}</Link></TableCell>
            <TableCell className="max-w-xs truncate">{post.body}</TableCell>
            <TableCell className="flex items-center gap-2 justify-end">
            <Button size="sm" variant="outline" onClick={() => onEdit(post.id)}>
              <FaPen />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(post.id)}
            >
              <FaTimes />
            </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PostList;
