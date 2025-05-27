import * as Yup from "yup";

export const registerValidation = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be digits"),
  secondaryPhone: Yup.string()
    .optional()
    .matches(/^\d+$/, "Secondary phone number must be digits"),
  gender: Yup.string().required("gender is required"),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  image: Yup.mixed().required(),
});

export const updateUserValidation = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must be digits")
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
