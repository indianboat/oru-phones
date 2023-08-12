"use client";

import Image from "next/image";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Navbar = () => {

  const [isOpen, toggleOpen] = useCycle(false, true);
  const drawerVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: "0%" },
  }

  const { data: session } = useSession();

  async function handleSignout() {
    signOut();
  }

  return (
    <>
      <nav className="sticky top-0 border py-4 shadow-md px-4 flex border-red-500 ">
        <div className="border w-full flex items-center justify-between">
          <div className="flex items-center justify-center gap-x-6">
            {
              session ? <button onClick={() => toggleOpen()} className="border flex items-center justify-center">
                <Image src="hamburger.svg" width={30} height={30} alt="hamburger-icon" />
              </button> : null
            }


            <div className="flex gap-x-6 justify-center border items-center">
              <Link href="/"><Image className="border" src="logo.svg" width={82} height={37} alt="company-logo" /></Link>
              <Link href="/">Home</Link>

            </div>
          </div>


          {
            session ? (<div className="flex items-center justify-center lg:gap-x-6 md:gap-x-4 sm:gap-x-3 gap-x-3">
              <div className="">
                <Image src="notificationIcon.svg" width={25} height={25} alt="notification-icon" />
              </div>

              <div className="border p-2 lg:flex md:flex sm:hidden hidden gap-x-6 items-center rounded-md">
                <div className="flex items-center gap-x-3">
                  <Image src="avatar.svg" width={38} className=" rounded-md bg-[#FFA78D] " height={38} alt="avatar" />
                  <div className="flex flex-col">
                    <p className="text-[12px] text-[#373B5C]">Welcome back,</p>
                    <p className="text-[16px] text-[#373B5C] font-semibold">Pankaj Kushwaha</p>
                  </div>
                </div>
                <div className="">
                  <button><IoIosArrowDown className="text-[#1E2875]" size={20} strokeWidth={0.5} /></button>
                </div>
              </div>
              <div className="border lg:hidden md:hidden sm:flex flex gap-x-4 items-center rounded-full">
                <button><Image src="avatar.svg" width={38} className=" rounded-full bg-[#FFA78D] " height={38} alt="avatar" /></button>
              </div>
            </div>) : 
              (<div className="border flex items-center justify-center gap-x-6">
                <Link className="border active:scale-95 transition-transform px-5 py-2 shadow rounded-full" href="/login">Login</Link>
                <Link className="border active:scale-95 transition-transform px-5 py-2 shadow bg-[#2C2F44] text-white rounded-full" href="/signup">Sign up</Link>
              </div>)
          }

        </div>

      </nav>


      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="fixed bg-white z-50 dark:bg-[#18191C] border border-red-700 shadow-red-200 h-screen lg:w-64 md:w-60 sm:w-56 w-56 inset-0"
            >
              <div className="flex justify-center mt-3">
                <Link href="/" className="border py-2 px-4 shadow-sm rounded-lg text-[#222222]">Dashboard</Link>
              </div>
              <div className="mt-5 flex flex-col justify-between items-center h-full">
                <ul className="flex flex-col justify-center items-start gap-y-4 w-fit p-2">
                  <li className="flex items-center w-full gap-x-2"><IoIosArrowForward className="text-[#9197B3]" /><Link href="/" className="text-[#1A1558] hover:border-[#1A1558] hover:border border transition-colors text-base py-2 px-4 w-full shadow-sm rounded-lg">My Profile</Link></li>
                  <li className="flex items-center w-full gap-x-2"><IoIosArrowForward className="text-[#9197B3]" /><Link href="/" className="text-[#1A1558] hover:border-[#1A1558] hover:border border transition-colors text-base py-2 px-4 w-full shadow-sm rounded-lg">My Connections</Link></li>
                </ul>
                <div className="absolute bottom-0">
                  <button onClick={() => signOut()} className="hover:text-[#ff5a5a] transition-colors text-md font-semibold py-3  shadow-sm">Logout</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* OVERLAY */}
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleOpen()}
          />
        )}
      </AnimatePresence>

    </>
  )
}

export default Navbar