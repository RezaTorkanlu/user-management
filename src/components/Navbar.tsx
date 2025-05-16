import React from "react";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center shadow-2xl p-5 rounded-2xl mt-5 ">
      <div className="flex items-center gap-5">
        <Link href="/">
          <Image src={logo} width={32} height={32} alt="logo-icon" />
        </Link>
        <Button type='button' >
          <Link href="/register">Sign Up</Link>
        </Button>
      </div>
      <div className="flex gap-4">
        <Button type='button' >
          <Link href="/users/create">Create User</Link>
        </Button>
        <Button type='button' >
          <Link href="/posts">See Posts</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
