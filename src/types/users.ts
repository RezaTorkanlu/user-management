export interface User{
  id: number,
  name: string,
  email: string;
  phone: number | string;
}

export type NewUser = Omit<User, 'id'>
export type UpdateUser = Partial<Omit<User, 'id' >>