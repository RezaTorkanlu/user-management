import { User } from "@/types/users";
import React from "react";
import { Button } from "./ui/button";
import { FaPen, FaTimes } from "react-icons/fa";

type UserCardProps = {
  user: User;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};
const UserCard: React.FC<UserCardProps> = ({ onDelete, onEdit, user }) => {
  const handleEdit = () => onEdit(user.id);
  const handleDelete = () => onDelete(user.id);

  return (
    <div className="bg-white shadow-md rounded-lg p-2 ">
      <div className="flex flex-col items-center p-4">
        <h3 className="p-3  font-semibold">{user.name}</h3>
        <p className="border-b">{user.email}</p>
        {user.phone && <p>{user.phone}</p>}
      </div>
      <div className="flex justify-between p-2">
        <Button className=" cursor-pointer" type="button" onClick={handleEdit}>
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
  );
};

export default UserCard;
