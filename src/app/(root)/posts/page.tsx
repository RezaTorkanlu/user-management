import PostListContainer from '@/container/PostListContainer'
import React from 'react'

const PostPage = () => {
  return (
    <div>
      <h1 className='text-center my-10 text-3xl font-bold'> Posts</h1>
      <PostListContainer />
    </div>
  )
}

export default PostPage