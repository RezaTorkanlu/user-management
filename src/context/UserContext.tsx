'use client'
import React, { createContext, useCallback, useContext } from "react";
import { User, NewUser, UpdateUser } from "../types/users";
import useFetch from "@/hooks/useFetch";
import { createUser, updateUser ,deleteUser} from "@/services/userService";

interface UserContextProps {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (newUser: NewUser) => void;
  editUser: (id: number, updatedUser: UpdateUser) => void;
  removeUser: (id: number) => void;
  fetchUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{
  children: React.ReactNode;
  initialUsers?: User[];
}> = ({ children, initialUsers = [] }) => {
  const { users, loading, error, setUsers, fetchUsers,setLoading } =
    useFetch(initialUsers);

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
        setLoading(true)
        await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setLoading(false)
      }
    },
    [setUsers]
  );
  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        addUser,
        editUser,
        removeUser,
        fetchUsers,
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
