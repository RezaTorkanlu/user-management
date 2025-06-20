
import axios from "axios";
import { User, NewUser, UpdateUser } from "@/types/users";
import { Posts, UpdatePost } from "@/types/posts";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const API_URL_POST = "https://jsonplaceholder.typicode.com/posts";

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(API_URL);
  return data;
};

export const getUserById = async (id: number): Promise<User> => {
  const { data } = await axios.get<User>(`${API_URL}/${id}`);
  return data;
};

export const createUser = async (user: NewUser): Promise<User> => {
  const { data } = await axios.post<User>(API_URL, user);
  return data;
};

export const updateUser = async (
  id: number,
  user: UpdateUser
): Promise<User> => {
  const { data } = await axios.put<User>(`${API_URL}/${id}`, user);
  return data;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const res =  await axios.delete(`${API_URL}/${id}`);
  return res.status === 200
};

// APIs for posts
export const getPosts = async (): Promise<Posts[]> => {
  const { data } = await axios.get<Posts[]>(API_URL_POST);
  return data
}

export const getPostById = async (id: number) => {
  const { data } = await axios.get<Posts>(`${API_URL_POST}/${id}`)
  return data
}

// disable for now
// export const createPost = async (post: Posts) => {
//   const { data } = await axios.post<Posts>(API_URL_POST, post)
//   return data
// }

export const updatePost = async (id: number, post: UpdatePost):Promise<Posts> => {
  const { data } = await axios.put<Posts>(`${API_URL_POST}/${id}` , post)
  return data
}

export const deletePost = async (id: number):Promise<boolean> => {
  const res =  await axios.delete<Posts>(`${API_URL_POST}/${id}`)
  return res.status === 200
}