import React from "react";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center shadow-2xl p-5 rounded-2xl min-sm: ">
      <div className="flex items-center ">
        <Image src={logo} width={32} height={32} alt="logo-icon" />
        <p className="text-xl mx-4 max-sm:hidden">torkan project</p>
      </div>
      <div className="border  p-2 rounded-2xl flex items-center gap-4 bg-gray-800 text-white shadow-xl">
          <Link href="/users/create" className="hover:text-gray-300">
            Create User
          </Link>
        </div>
    </nav>
  );
};

export default Navbar;
