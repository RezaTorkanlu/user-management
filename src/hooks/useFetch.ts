import  { useCallback, useEffect, useState } from "react";
import { User } from "@/types/users";
import { Posts } from "@/types/posts";
import { getPosts, getUsers } from "@/services/userService";

const useFetch = (initialUsers:User[] , initialPosts:Posts[]) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [posts , setPosts] = useState<Posts[]>(initialPosts)
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


  const fetchPosts = useCallback(async () => {
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      setError('Error to Get Posts');
    }
    fetchPosts()
  }, []);
  useEffect(() => {
    if (initialPosts.length === 0) fetchPosts();
  },[fetchPosts, initialPosts.length])
  
  return { users, loading, error, fetchUsers , setUsers,setLoading , fetchPosts, posts ,setPosts };
};

export default useFetch;
