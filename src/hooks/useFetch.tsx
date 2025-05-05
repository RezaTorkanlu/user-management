import axios from "axios";
import React, { useEffect, useState } from "react";
import { User } from "@/types/users";
const useFetch = (url:string) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await axios.get<User[]>(url);
        setUsers(res.data)
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false)
      }
    };
    fetchUsers()
  }, [url]);

  return { users, loading, error };
};

export default useFetch;
