import React from "react";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center shadow-2xl p-5 rounded-2xl mt-5 ">
      <div className="flex items-center mx-2">
        <Link href="/">
          <Image src={logo} width={32} height={32} alt="logo-icon" />
        </Link>
      </div>
      <div className="flex gap-4">
        <Button type='button' className="bg-gray-500" >
          <Link href="/"> Users</Link>
        </Button>
        <Button type='button' className="bg-gray-500" >
          <Link href="/posts"> Posts</Link>
        </Button>
        <Button type='button' variant='outline' size='lg' className="ml-8 mr-2 text-gray-600" >
          <Link href="/auth/register">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
