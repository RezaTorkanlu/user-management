import * as Yup from "yup";

export const updateUserValidation = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^(?:\+98|0)?9\d{9}$/, "Phone number must be a valid Iranian mobile number")
    .required("Phone number is required"),
});

export const updatePostValidation = Yup.object().shape({
  title: Yup.string()
    .min(4, "Title must be at least 4 characters")
    .required("Title is required"),
  body: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
});
