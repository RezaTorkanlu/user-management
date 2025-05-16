'use client'

import UserForm from "@/components/UserForm"
import { useUserContext } from "@/context/UserContext"
import { UpdateUser } from "@/types/users"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"

const EditUserPage = () => {
  const { users, editUser } = useUserContext()
  const { id } = useParams()
  const router = useRouter()

  const userToEdit = users.find(user=>user.id === Number(id))

  const handleSubmit = async (data: UpdateUser) => {
    try {
      await editUser(Number(id), data)
      toast.success("User updated successfully")
      router.push('/')
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error("Error updating user")
    }
  }
  if (!userToEdit) return <div className="text-center text-2xl font-bold my-10">User not found!</div>
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold text-center my-5">Edit for {userToEdit?.name}</h1>
      <UserForm
        initialData={userToEdit}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default EditUserPage