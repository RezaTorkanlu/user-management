import React from 'react'
import Image from 'next/image'
import logo from '@/app/favicon.ico'
import Link from 'next/link'

const Navbar = () => {

  const navLinks = [
    {
      id: 1,
      link: "/",
      title:'reza'
    },
    {
      id: 2,
      link: "/",
      title:'reza'
    },
    {
      id: 3,
      link: "/",
      title:'reza'
    },
    {
      id: 4,
      link: "/",
      title:'reza'
    },
  ]
  
  return (
    <nav className='flex justify-between items-center shadow-2xl p-5 rounded-2xl'>
      <div className='navFlex'>
        <Image
          src={logo}
          width={32}
          height={32}
          alt='logo-icon'
        />
        <p className='text-xl mx-4'>torkan project</p>
      </div>
      <div className="">
        <ul className='navFlex'>
        {navLinks.map((link) => (
          <li key={link.id} className='mx-5'>
            <Link href={link.link}>
              {link.title}
            </Link>
          </li>
        ))}
          </ul>
      </div>
    </nav>
  )
}

export default Navbar