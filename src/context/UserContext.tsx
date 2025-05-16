"use client";
import React, { createContext, use, useCallback, useContext } from "react";
import { User, NewUser, UpdateUser } from "../types/users";
import {
  createUser,
  updateUser,
  deleteUser,
  updatePost,
  deletePost,
} from "@/services/userService";
import { Posts, UpdatePost } from "@/types/posts";
import useFetch from "@/hooks/useFetch";

interface UserContextProps {
  users: User[];
  posts: Posts[];
  loading: boolean;
  error: string | null;
  addUser: (newUser: NewUser) => void;
  editUser: (id: number, updatedUser: UpdateUser) => void;
  editPost: (id: number, updatedPost: UpdatePost) => void;
  removeUser: (id: number) => void;
  removePost: (id: number) => void;
  fetchPosts: () => Promise<void>;
  fetchUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{
  children: React.ReactNode;
  initialUsers?: User[];
  initialPosts?: Posts[];
}> = ({ children, initialUsers = [], initialPosts = [] }) => {
  const {
    users,
    posts,
    loading,
    error,
    setUsers,
    fetchUsers,
    setLoading,
    fetchPosts,
    setPosts,
  } = useFetch(initialUsers, initialPosts);
  
  // User Logics
  const addUser = useCallback(
    async (newUser: NewUser) => {
      try {
        const createdUser = await createUser(newUser);
        setUsers((prevUsers) => [...prevUsers, createdUser]);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
    [setUsers]
  );

  const editUser = useCallback(
    async (id: number, updatedUser: UpdateUser) => {
      try {
        const updated = await updateUser(id, updatedUser);
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? updated : user))
        );
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    [setUsers]
  );

  const removeUser = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setLoading(false);
      }
    },
    [setUsers]
  );

  // Posts Logics
  const editPost = useCallback(
    async (id: number, updatedPost: UpdatePost) => {
      try {
        const updated = await updatePost(id, updatedPost);
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? updated : post))
        );
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },
    [setPosts]
  );

  const removePost = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await deletePost(id);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    [setPosts]
  );

  
  return (
    <UserContext.Provider
      value={{
        users,
        posts,
        loading,
        error,
        addUser,
        editPost,
        editUser,
        removeUser,
        removePost,
        fetchUsers,
        fetchPosts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
