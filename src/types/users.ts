export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  secondaryPhone?: string | undefined;
  gender: string;
  dateOfBirth: Date | null;
  image: FileList | null ;
}

export type NewUser = Omit<
  User,
  "id" | "secondaryPhone" | "gender" | "dateOfBirth" | "image"
>;
export type UpdateUser = Partial<Omit<User, "id">>;
export type RegisterUser = Omit<User, 'id'>