import { Posts } from '@/types/posts'
import React from 'react'
import PostCard from './PostCard';

interface PostListProps {
  posts: Posts[],
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
const PostList = ({ onDelete, onEdit, posts }: PostListProps) => {
  if (!Array.isArray(posts) || posts.length === 0)
    return <p className=" font-bold text-center text-2xl">Post Not Found!</p>;
  console.log(posts)
  return (
    <div className='grid grid-cols-2 gap-4 mt-5'>
      {posts.map((post => (
        <PostCard 
          key={post.id}
          post={post}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )))}
    </div>
  )
}

export default PostList