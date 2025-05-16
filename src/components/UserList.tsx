import React from "react";
import { User } from "@/types/users";
import UserCard from "./UserCard";

type UserListProps = {
  users: User[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};
const UserList: React.FC<UserListProps> = ({ users, onDelete, onEdit }) => {
  if (!Array.isArray(users) || users.length === 0)
    return <p className=" font-bold text-center text-2xl">User Not Found!</p>;

  return (
    <div className="grid min-lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1 justify-center">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default UserList;
