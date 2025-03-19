"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react'

const Navbar = () => {
  const [showdropdown, setshowdropdown] = useState(false)
  
  const { data: session } = useSession()
  return (
    <nav className='bg-gray-800 text-white flex justify-between px-3 h-14 items-center'>
      <div className="logo font-bold text-lg flex items-center justify-center">
        <Image src="/images/tea.png" height={80} width={80} alt="error" />
        <button><Link href="/"><p>Get Me a chai!</p></Link></button>
      </div>
      <ul className='flex items-center justify-center gap-5'>
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>{!session && <Link href="/login"><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login
        </button></Link>}</li>
        <div className='flex'>
          <li className='relative'>{session && <>
            <button onClick={()=>setshowdropdown(!showdropdown)} onBlur={()=>setTimeout(() => {setshowdropdown(false)}, 200)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>


            <div id="dropdown" className={`z-10 ${showdropdown? "":"hidden"} absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your page</Link>
                </li>
                <li>
                  <Link onClick={()=>signOut()} href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div>
          </>}</li>
          <li>{session && <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => { signOut() }}>Logout
          </button>}</li>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
