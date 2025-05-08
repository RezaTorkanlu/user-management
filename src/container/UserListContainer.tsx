"use client";
import Error from "@/app/Error";
import Loading from "@/app/Loading";
import UserList from "@/components/UI/UserList";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Input from "@/components/Input/Input";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



const UserListContainer = () => {
  const { users, loading, error, removeUser} = useUserContext();
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async(id: number) => { 
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await removeUser(id);
        toast.success("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error deleting user");
      }
    } else {
      toast.info("User deletion cancelled");
      }
  }

  const handleEdit = (id: number) => {
    router.push(`/users/edit/${id}`);
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-center border rounded  my-10 m-auto w-6/12 max-sm:w-full ">
        <span className="mx-2">
          <FaSearch className="size-5 " />
        </span>
        <Input
          placeholder="search users by name or email"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </div>
      <UserList
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserListContainer;
