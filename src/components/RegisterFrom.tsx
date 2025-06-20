"use client";
import { Input } from "./UI/input";
import { Button } from "./UI/button";
import DatePiker from "@/helper/DatePiker";
import SelectBox from "@/helper/SelectBox";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import ImageUploader from "@/helper/ImageUploader";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { RegisterUser } from "@/types/users";
type RegisterFromProps = {
  onSubmit: (data: RegisterUser) => Promise<void>;
};
const RegisterFrom = ({ onSubmit }: RegisterFromProps) => {
  const [showSecondaryPhone, showSetSecondaryPhone] = useState<string>("");
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterUser>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: null,
      secondaryPhone: undefined,
      gender: "",
      image: null,
    },
  });

  const gender = watch("gender");
  const dateOfBirth = watch("dateOfBirth");

  const handleFormSubmit: SubmitHandler<RegisterUser> = async (data) => {
    try {
      await new Promise((res) => setTimeout(res, 2000));
      await onSubmit(data);
    } catch (error) {
      setError("root", { message: "Submission failed" });
      console.log(error);
    }
  };

  const handleAddPhone = () => {
    showSetSecondaryPhone((prev) => (prev ? "" : "Secondary Phone Number"));
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-6/12 flex flex-col gap-4 max-sm:w-full m-auto my-5 border rounded-2xl p-5 shadow-lg"
    >
      {/* profile image */}
      <div className=" gap-2">
        <ImageUploader
          onUpload={(file) => setValue("image", file as FileList | null)}
          {...register("image", {
            required: "you sould upload an profile image",
            validate: {
              lessThan2MB: (file) => {
                if (file && file[0]?.size > 2 * 1024 * 1024) {
                  return "Image size should be less than 2MB";
                }
                return true;
              },
            },
          })}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>
      {/* user name */}
      <div>
        <Input
          type="text"
          className="w-full"
          placeholder="User Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 8,
              message: "Name must be at least 8 characters",
            },
          })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      {/* email */}
      <div>
        <Input
          type="email"
          className="w-full"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Email must be a valid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      {/* phone number */}
      <div className="flex justify-between gap-2">
        <Input
          type="tel"
          className="w-full"
          placeholder="Phone Number , like 09123456789"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^(?:\+98|0)?9\d{9}$/,
              message: "Phone number must be a valid Iranian mobile number",
            },
          })}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        <Button type="button" className="bg-blue-400" onClick={handleAddPhone}>
          {showSecondaryPhone ? <FaMinus /> : <FaPlus />}
        </Button>
        {/* phone number 2 optional */}
      </div>
      {showSecondaryPhone && (
        <div>
          <Input
            type="tel"
            className="w-full "
            placeholder="secondaryPhone"
            {...register("secondaryPhone", {
              pattern: {
                value: /^(?:\+98|0)?9\d{9}$/,
                message: "Phone number must be a valid Iranian mobile number",
              },
            })}
          />
          {errors.secondaryPhone && (
            <p className="text-red-500">{errors.secondaryPhone.message}</p>
          )}
        </div>
      )}
      {/* gender */}
      <div className=" flex justify-between gap-5">
        <div>
          <label className="text-sm p-2">gender</label>
          <SelectBox
            gender={gender}
            {...register("gender", { required: "gender must be selected" })}
            onChange={(value) =>
              setValue("gender", value, { shouldValidate: true })
            }
          />
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>
        {/* date of birth */}
        <div className="w-1/2 ">
          <label className="text-sm p-2">date of birth</label>
          <DatePiker
            selectedDate={dateOfBirth || undefined}
            {...register("dateOfBirth", {
              required: "Date of birth is required",
              validate: {
                isValidDate: (date) => {
                  if (date instanceof Date && !isNaN(date.getTime())) {
                    return true;
                  }
                  return "Please select a valid date";
                },
              },
            })}
            onChange={(value) =>
              setValue("dateOfBirth", value as Date, { shouldValidate: true })
            }
          />
          {errors.dateOfBirth && (
            <p className="text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>
      </div>
      <Button className="w-full bg-blue-500" variant="secondary" type="submit">
        Register
      </Button>
      {errors.root && (
        <p className="text-red-500 text-center">{errors.root.message}</p>
      )}
    </form>
  );
};

export default RegisterFrom;
