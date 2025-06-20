"use client";

import UserForm from '@/components/UserForm';
import { useUserContext } from '@/context/UserContext';
import { NewUser } from '@/types/users';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

const CreateUserPage = () => {
  const { addUser } = useUserContext()
  const router = useRouter()

  const handleSubmit = async (data: NewUser) => {
    try {
      await addUser(data)
      toast.success("User created successfully")
      router.push('/')
    } catch (error) {
      console.error("Error creating user:", error)
      toast.error("Error creating user")
    }
  }
  return (
    <div className=''>
      <h1 className='my-5 text-center font-bold text-xl'>Create New User</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  )
}


export default CreateUserPage;
