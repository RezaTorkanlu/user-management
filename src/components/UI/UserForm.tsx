"use client";

import React, { useState, useEffect } from "react";
import { NewUser, UpdateUser, User } from "../../types/users";
import Input from "../Input/Input";

type UserFormProps = {
  initialData?: Partial<User>;
  onSubmit: (data: NewUser) => Promise<void>;
};
const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [phone, setPhone] = useState(initialData?.phone ?? "");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "name is required";
    if (!email.includes("@")) errs.email = "email is not valid";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({ name, email, phone });
      if (!initialData) {
        setName("");
        setEmail("");
        setPhone("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? "");
      setEmail(initialData.email ?? "");
      setPhone(initialData.phone ?? "");
    }
  }, [initialData]);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-6/12 max-sm:w-full m-auto my-5 border rounded-2xl p-5 shadow-lg "
    >
      <div className="border-b-2 border-gray-300">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        {errors.name && <p className="text-red-600"> {errors.name}</p>}
      </div>
      <div className="border-b-2 border-gray-300">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
        />
        {errors.email && <p className="text-red-600"> {errors.email}</p>}
      </div>
      <div className="border-b-2 border-gray-300">
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Your Phone number"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-500 text-white p-2 cursor-pointer rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        {submitting
          ? "Sending ..."
          : initialData
          ? "Update User"
          : "Create User"}
      </button>
    </form>
  );
};

export default UserForm;
