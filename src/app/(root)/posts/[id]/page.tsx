'use client'
import { useUserContext } from '@/context/UserContext'
import { useParams } from 'next/navigation'
import React from 'react'

const PostSinglePage = () => {
  const { id } = useParams()
  const { posts } = useUserContext()

  return (
    <div>
      {posts.length === 0 ? (
        <div className="text-center text-2xl font-bold my-10">
          No posts available!
        </div>
      ) : (
        posts
          .filter((post) => post.id === Number(id))
          .map((post) => (
            <div key={post.id} className="container mx-auto p-4 my-10">
              <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
              <p className="text-lg mt-10">{post.body}</p>
            </div>
          ))
      )}
    </div>
  )
}

export default PostSinglePage