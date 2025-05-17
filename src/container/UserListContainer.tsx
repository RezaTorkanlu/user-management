"use client";
import Error from "@/app/Error";
import Loading from "@/app/Loading";
import UserList from "@/components/UserList";
import React, { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserListContainer = () => {
  const { users, loading, error, removeUser } = useUserContext();
  const [search, setSearch] = useState<string>("");
  const [typeSearch, setTypeSearch] = useState<string>("name");
  const router = useRouter();

  const filteredUsers = users.filter((user) => {
    if (typeSearch === "name") {
      return user.name.toLowerCase().includes(search.toLowerCase());
    } else {
      return user.email.toLowerCase().includes(search.toLowerCase());
    }
  });

  const handleDelete = async (id: number) => {
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
  };

  const handleEdit = (id: number) => {
    router.push(`/users/edit/${id}`);
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-center gap-5 my-10 m-auto w-6/12 max-sm:w-full ">
        <Input
          className=" h-10 "
          placeholder={`Search by ${typeSearch}`}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />

        <Button
          type="button"
          onClick={() =>
            setTypeSearch(typeSearch === "name" ? "email" : "name")
          }
        >
          search by {typeSearch === "name" ? "email" : "name"}
        </Button>
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
