import React from "react";
import { User } from "@/types/users";

import { FaPen, FaTimes } from "react-icons/fa";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";

type UserListProps = {
  users: User[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};
const UserList: React.FC<UserListProps> = ({ users, onDelete, onEdit }) => {
  if (!Array.isArray(users) || users.length === 0)
    return <p className=" font-bold text-center text-2xl">User Not Found!</p>;

  return (
    <Table>
      <TableHeader className="bg-gray-500">
        <TableRow>
          <TableHead className="text-white">Name</TableHead>
          <TableHead className="text-white">Email</TableHead>
          <TableHead className="text-white">Phone</TableHead>
          <TableHead className="text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="odd:bg-gray-100 even:bg-gray-300">
            <TableCell>{ user.name}</TableCell>
            <TableCell>{ user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(user.id)}>
                <FaPen />
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(user.id)}>
                <FaTimes />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
