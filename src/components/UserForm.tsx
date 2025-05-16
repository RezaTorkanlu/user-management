"use client";

import React, { useState, useEffect } from "react";
import { NewUser, User } from "../types/users";
import { Input } from "./ui/input";
import { useFormik } from "formik";
import { Button } from "./ui/button";
import { updateUserValidation } from "@/helper/registerValidation";

type UserFormProps = {
  initialData?: Partial<User>;
  onSubmit: (data: NewUser) => Promise<void>;
};
const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [phone, setPhone] = useState(initialData?.phone ?? "");
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
      phone: initialData?.phone ?? "",
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        await onSubmit(values as NewUser);
        if (!initialData) {
          setName("");
          setEmail("");
          setPhone("");
        }
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: updateUserValidation,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 w-6/12 max-sm:w-full m-auto my-5 border rounded-2xl p-5 shadow-lg "
    >
      <div>
        <Input
          type="text"
          className="w-full h-10 border-none focus:outline-none "
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          placeholder="Your Name"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-600">{formik.errors.name}</p>
        )}
      </div>
      <div>
        <Input
          type="email"
          className="w-full h-10 border-none focus:outline-none "
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          placeholder="Your Email"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-600">{formik.errors.email}</p>
        )}
      </div>
      <div>
        <Input
          type="tel"
          className="w-full h-10 border-none focus:outline-none "
          value={formik.values.phone}
          onChange={formik.handleChange}
          name="phone"
          placeholder="Your Phone number"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-600">{formik.errors.phone}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={submitting}
        className=" text-white p-2 cursor-pointer rounded-md transition duration-300 ease-in-out"
      >
        {submitting
          ? "Sending ..."
          : initialData
          ? "Update User"
          : "Create User"}
      </Button>
    </form>
  );
};

export default UserForm;
