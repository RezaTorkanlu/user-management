import * as Yup from "yup";


export const registerValidation = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must be digits")
    .required("Phone number is required"),
  secondaryPhone: Yup.string()
    .matches(/^\d+$/, "Secondary phone number must be digits")
});

export const updateUserValidation = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must be digits")
})

export const updatePostValidation = Yup.object().shape({
  title: Yup.string()
    .min(4, "Title must be at least 4 characters")
    .required("Title is required"),
  body: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
})

