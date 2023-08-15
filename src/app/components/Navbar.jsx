"use client";

import Image from "next/image";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Navbar = () => {

  const [isOpen, toggleOpen] = useCycle(false, true);

  const drawerHandler = () => {
    toggleOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      drawerHandler();
    }
  };

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
      <nav className="sticky top-0 py-4 z-50 shadow-md px-4 flex backdrop-saturate-[80%] backdrop-blur-sm bg-white/80 dark:bg-[#121212]/70">
        <div className="w-full flex items-center justify-between">

          <div className={session?"flex items-center justify-between gap-x-6":"flex items-center justify-between w-full gap-x-6"}>
            <button onClick={drawerHandler} className={session?"bg-slate-100 p-1 rounded-full flex items-center justify-center":"lg:hidden md:hidden sm:flex flex items-center justify-center"}>
              <Image src="hamburger.svg" width={35} height={35} alt="hamburger-icon" />
            </button>
            <div className="flex gap-x-6 justify-center items-center">
              <Link href={session ? "/profile" : "/"}><Image src="logo.svg" width={82} height={37} alt="company-logo" /></Link>
              <Link className="lg:flex md:flex sm:hidden hidden" href={session ? "/profile" : "/"}>Home</Link>
            </div>
          </div>


          {
            session ? (<div className="flex items-center w-full justify-end lg:gap-x-5 md:gap-x-4 sm:gap-x-3 gap-x-3">
              <div className="flex">
                <button><Image src="notificationIcon.svg" width={25} height={25} alt="notification-icon" /></button>
              </div>

              <div className="p-2 lg:flex md:flex sm:hidden hidden gap-x-6 items-center rounded-lg border shadow">
                <div className="flex items-center gap-x-3 ">
                  <Image src="avatar.svg" width={38} className=" rounded-md bg-[#FFA78D] " height={38} alt="avatar" />
                  <div className="flex flex-col">
                    <p className="text-[12px] text-[#373B5C]">Welcome back,</p>
                    <p className="text-[16px] text-[#373B5C] font-semibold capitalize">{session?.user.name}</p>
                  </div>
                </div>
                <div className="">
                  <button><IoIosArrowDown className="text-[#1E2875]" size={20} strokeWidth={0.5} /></button>
                </div>
              </div>
              <div className="lg:hidden md:hidden sm:flex flex gap-x-4 items-center rounded-full">
                <button><Image src="avatar.svg" width={38} className=" rounded-full bg-[#FFA78D] " height={38} alt="avatar" /></button>
              </div>
            </div>) :
              (<div className="lg:flex md:flex sm:hidden hidden items-center w-full justify-end gap-x-4">
                <Link className="active:scale-95 transition-transform py-2 px-4 shadow rounded-full" href="/login">Login</Link>
                <Link className="active:scale-95 transition-transform py-2 px-4 shadow bg-[#2C2F44] text-white rounded-full" href="/signup">Sign up</Link>
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
              className="fixed bg-white z-50 dark:bg-[#18191C] overflow-y-auto shadow-md h-screen lg:w-64 md:w-60 sm:w-56 w-56 inset-0"
            >
              {
                session ?
                  <>
                    <div className="flex justify-center mt-3">
                      <Link onClick={handleLinkClick} href={session ? "/profile" : "/"} className="border py-2 px-4 shadow-sm rounded-lg text-[#222222]">Dashboard</Link>
                    </div>
                    <div className="mt-5 flex flex-col justify-between items-center">
                      <ul className="flex flex-col justify-center items-start gap-y-4 w-fit p-2">
                        <li className="flex items-center w-full gap-x-2"><IoIosArrowForward className="text-[#9197B3]" /><Link href="/profile" onClick={handleLinkClick} className="text-[#1A1558] hover:border-[#1A1558] hover:border-2 border-2 transition-colors text-base py-2 px-4 w-full shadow-sm rounded-lg">My Profile</Link></li>
                        <li className="flex items-center w-full gap-x-2"><IoIosArrowForward className="text-[#9197B3]" /><Link href="/myconnections" onClick={handleLinkClick} className="text-[#1A1558] hover:border-[#1A1558] hover:border-2 border-2 transition-colors text-base py-2 px-4 w-full shadow-sm rounded-lg">My Connections</Link></li>
                        <li className="flex items-center justify-start w-full gap-x-2"><IoIosArrowForward className="text-[#9197B3]" /><button onClick={handleSignout} className="text-[#e75252] hover:border-[#cc4f4f] hover:border-2 text-left border-2 transition-colors text-base py-2 px-4 w-full shadow-sm rounded-lg">Logout</button></li>
                      </ul>
                    </div>
                  </>
                  :
                  <>
                    <div className="mt-5 flex flex-col justify-between items-center h-full">
                      <ul className="flex flex-col justify-center items-start gap-y-4 w-full p-2">
                        <li className="flex items-center w-full gap-x-2"><Link href="/" onClick={handleLinkClick} className="text-[#1A1558] hover:border-[#1A1558] hover:border-2 border-2 transition-colors text-base py-2 px-4 w-full shadow-sm rounded-lg">Home</Link></li>
                        <li className="flex items-center w-full gap-x-2"><Link href="/login" onClick={handleLinkClick} className="text-[#1A1558] hover:border-[#1A1558] hover:border-2 border-2 transition-colors text-base py-2 px-4 w-full shadow-sm rounded-lg">Login</Link></li>
                        <li className="flex items-center w-full gap-x-2"><Link href="/signup" onClick={handleLinkClick} className="text-[#1A1558] hover:border-[#1A1558] hover:border-2 border-2 transition-colors text-base py-2 px-4 w-full shadow-sm rounded-lg">Sign up</Link></li>
                      </ul>
                    </div>
                  </>
              }
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* OVERLAY */}
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40"
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