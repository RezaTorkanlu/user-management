import React, { useCallback, useEffect, useState } from "react";
import { User } from "@/types/users";
import { getUsers } from "@/services/userService";

const useFetch = (initialUsers:User[] =[]) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      setError('Error to Get Users');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if(initialUsers.length === 0) fetchUsers();
  }, [fetchUsers , initialUsers.length]);

  return { users, loading, error, fetchUsers , setUsers,setLoading };
};

export default useFetch;
