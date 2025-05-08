"use client";
import React from "react";

type IInputProps =  React.InputHTMLAttributes<HTMLInputElement> 
  


const Input = (props: IInputProps) => {
  return <input {...props} className=" w-full outline-none p-2" />;
};

export default Input;
