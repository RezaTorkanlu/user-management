import React from "react";
import { User } from "@/types/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { FaPen, FaTimes } from "react-icons/fa";

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
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
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
