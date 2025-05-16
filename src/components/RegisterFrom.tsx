"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import DatePiker from "@/helper/DatePiker";
import SelectBox from "@/helper/SelectBox";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import ImageUploader from "@/helper/ImageUploader";
import { useFormik } from "formik";
import { registerValidation } from "@/helper/registerValidation";
type RegisterFormProps = {
  handleSubmit: () => void;
};
const RegisterFrom = ({handleSubmit}:RegisterFormProps) => {
  const [secondaryPhone, setSecondaryPhone] = useState<string>("");
  const formick = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      secondaryPhone: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleSubmit();
    },
    validationSchema: registerValidation,
  });
  const handlePlusPhoneNumber = () => {
    if (secondaryPhone) {
      setSecondaryPhone("");
    } else {
      setSecondaryPhone("your second phone number");
    }
  };

  return (
    <form
      onSubmit={formick.handleSubmit}
      className="w-6/12 flex flex-col gap-4 max-sm:w-full m-auto my-5 border rounded-2xl p-5 shadow-lg"
    >
      <div>
        <ImageUploader />
      </div>
      <div>
        <Input
          type="text"
          className="w-full"
          name="name"
          placeholder="User Name"
          value={formick.values.name}
          onChange={formick.handleChange}
        />
        {formick.touched.name && formick.errors.name && (
          <p className="text-red-600">{formick.errors.name}</p>
        )}
      </div>
      <div>
        <Input
          type="email"
          className="w-full"
          name="email"
          placeholder="Email"
          value={formick.values.email}
          onChange={formick.handleChange}
        />
        {formick.touched.email && formick.errors.email && (
          <p className="text-red-600">{formick.errors.email}</p>
        )}
      </div>
      <div className="flex justify-between gap-2">
        <Input
          type="tel"
          className="w-full"
          name="phone"
          placeholder="Phone Number"
          value={formick.values.phone}
          onChange={formick.handleChange}
        />
        {formick.touched.phone && formick.errors.phone && (
          <p className="text-red-600">{formick.errors.phone}</p>
        )}
        <Button type="button" onClick={handlePlusPhoneNumber}>
          {secondaryPhone ? <FaMinus /> : <FaPlus />}
        </Button>
      </div>
      {secondaryPhone && (
        <div>
          <Input
            type="tel"
            className="w-full "
            name="secondaryPhone"
            placeholder={secondaryPhone}
            value={formick.values.secondaryPhone}
            onChange={formick.handleChange}
          />
        </div>
      )}

      <div className=" flex justify-between gap-5">
        <div>
          <SelectBox />
        </div>
        <div className="w-1/2 ">
          <DatePiker />
        </div>
      </div>
      <Button className="w-full" type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegisterFrom;
