"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import DatePiker from "@/helper/DatePiker";
import SelectBox from "@/helper/SelectBox";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import ImageUploader from "@/helper/ImageUploader";
import { registerValidation } from "@/helper/registerValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
      dateOfBirth: new Date(),
      secondaryPhone: undefined,
      gender: "",
      image: null,
    },
    resolver: yupResolver(registerValidation),
  });

  const gender = watch("gender");
  const dateOfBirth = watch("dateOfBirth");

  const handleFormSubmit: SubmitHandler<RegisterUser> = async (data) => {
    try {
      await new Promise((res) => setTimeout(res, 2000));
      await onSubmit(data);
      console.log(data);
    } catch (error) {
      setError("root", { message: "Submission failed" });
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
      <div className=" gap-2">
        <ImageUploader onUpload={(file) => setValue("image", file as null)} />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>
      <div>
        <Input
          type="text"
          className="w-full"
          placeholder="User Name"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <Input
          type="email"
          className="w-full"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flex justify-between gap-2">
        <Input
          type="tel"
          className="w-full"
          placeholder="Phone Number"
          {...register("phone")}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        <Button type="button" onClick={handleAddPhone}>
          {showSecondaryPhone ? <FaMinus /> : <FaPlus />}
        </Button>
      </div>
      {showSecondaryPhone && (
        <div>
          <Input
            type="tel"
            className="w-full "
            placeholder="secondaryPhone"
            {...register("secondaryPhone")}
          />
          {errors.secondaryPhone && (
            <p className="text-red-500">{errors.secondaryPhone.message}</p>
          )}
        </div>
      )}

      <div className=" flex justify-between gap-5">
        <div>
          <label className="text-sm p-2">gender</label>
          <SelectBox
            gender={gender}
            onChange={(value) =>
              setValue("gender", value, { shouldValidate: true })
            }
          />
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>
        <div className="w-1/2 ">
          <label className="text-sm p-2">date of birth</label>
          <DatePiker
            selectedDate={dateOfBirth}
            onChange={(value) =>
              setValue("dateOfBirth", value as Date, { shouldValidate: true })
            }
          />
          {errors.dateOfBirth && (
            <p className="text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>
      </div>
      <Button className="w-full" type="submit">
        Register
      </Button>
      {errors.root && (
        <p className="text-red-500 text-center">{errors.root.message}</p>
      )}
    </form>
  );
};

export default RegisterFrom;
