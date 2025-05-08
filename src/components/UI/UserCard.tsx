import { User } from '@/types/users'
import React from 'react'


type UserCardProps = {
  user: User,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
}
const UserCard:React.FC<UserCardProps> = ({onDelete,onEdit,user}) => {
  const handleEdit = () => onEdit(user.id)
  const handleDelete = () => onDelete(user.id)

  return (
    <div className='bg-white shadow-md rounded-lg p-4 '>
      <div className='flex flex-col items-center p-4'>
        <h3 className='p-3  font-semibold'>{user.name}</h3>
        <p className='border-b'>{user.email}</p>
        {user.phone && <p>{ user.phone }</p>}
      </div>
      <div className='flex justify-between p-2'>
        <button className='bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer' onClick={handleEdit}>Edit</button>
        <button className='bg-rose-600 text-white rounded-lg px-4 py-2 cursor-pointer' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default UserCard