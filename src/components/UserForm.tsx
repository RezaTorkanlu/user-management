"use client";

import { NewUser, User } from "../types/users";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateUserValidation } from "@/helper/registerValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./UI/input";
import { Button } from "./UI/button";

type UserFormProps = {
  initialData?: Partial<User>;
  onSubmit?: (data: NewUser) => Promise<void>;
};

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
    },
    resolver: yupResolver(updateUserValidation),
  });

  const handleUserSubmit: SubmitHandler<NewUser> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await onSubmit?.(data);
    } catch {
      setError("root", { message: "Submission failed" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleUserSubmit)}
      className="flex flex-col gap-4 w-6/12 max-sm:w-full m-auto my-5 border rounded-2xl p-5 shadow-lg "
    >
      <div>
        <Input
          type="text"
          className="w-full h-10 border-none focus:outline-none "
          {...register("name")}
          placeholder="Your Name"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
      </div>
      <div>
        <Input
          type="email"
          className="w-full h-10 border-none focus:outline-none "
          {...register("email")}
          placeholder="Your Email"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div>
        <Input
          type="tel"
          className="w-full h-10 border-none focus:outline-none "
          {...register("phone")}
          placeholder="Your Phone number"
        />
        {errors.phone && (
          <div className="text-red-500">{errors.phone.message}</div>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-blue-500">
        {isSubmitting
          ? "Sending ..."
          : initialData
          ? "Update User"
          : "Create User"}
      </Button>
    </form>
  );
};

export default UserForm;
