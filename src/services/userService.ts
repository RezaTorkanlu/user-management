
import axios from "axios";
import { User, NewUser, UpdateUser } from "@/types/users";

const API_URL = "https://jsonplaceholder.typicode.com/users";

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
