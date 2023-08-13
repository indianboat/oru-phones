"use client";

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { TbEdit, TbUpload } from "react-icons/tb";


const ProfileDashboard = () => {

  const { data: session, status } = useSession(); // client side session

  if (status === "loading") {
    return "Loading...";
  }

  if (status == "unauthenticated") {
    redirect("/login");
  }


  return (
    <>
      <div className="container mx-auto border mt-8 flex flex-col items-center">
        <div className="bg-[#1E2875] h-40 rounded-xl p-4 w-full">
          <h1 className='text-white uppercase'>My Profile</h1>
        </div>
        <div className="border border-red-700 lg:gap-x-20 lg:gap-y-8 md:gap-x-16 md:gap-y-6 sm:gap-x-12 sm:gap-y-4 gap-6 lg:p-8 md:p-7 sm:p-6 p-4 bg-white rounded-2xl -translate-y-16 w-11/12 mx-atuo grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">

          {/* Photo */}
          <div className="flex justify-between items-center rounded-2xl p-4 border">
            <div className="bg-[#FFA78D] rounded-full overflow-hidden">
              <Image src="avatar.svg" width={160} height={160} alt='user-avatar' />
            </div>
            <div className="">
              <button className='bg-[#F0EFFA] px-4 py-2 rounded-full text-sm flex items-center gap-x-2'>Upload Photo <TbUpload/></button>
            </div>
          </div>


          {/* Professional details */}
          <div className="border flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <h1 className='font-semibold'>Professional Details</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut deleniti eum autem obcaecati officiis dolores.</p>
          </div>




          {/* Personal Details */}
          <div className="border flex flex-col gap-4 rounded-2xl shadow-md p-6 h-fit">
            <div className="border">
              <h2 className='text-gray-600'>Your Name</h2>
              <div className="flex flex-row gap-2 justify-between items-center">
                <p className='font-semibold lg:text-base md:text-[14px] sm:text-[13px] text-[12px]'>Pankaj Kushwaha</p>
                <button className='bg-[#F0EFFA] p-2 rounded-full shadow'><TbEdit/></button>
              </div>
            </div>
            <div className="border">
              <h2 className='text-gray-600'>Email</h2>
              <div className="flex flex-row gap-2 justify-between items-center">
                <p className='font-semibold lg:text-base md:text-[14px] sm:text-[13px] text-[12px]'>iampankaj852@gmail.com</p>
                <button className='bg-[#F0EFFA] p-2 rounded-full shadow'><TbEdit/></button>
              </div>
            </div>
            <div className="border">
              <h2 className='text-gray-600'>Phone Number</h2>
              <div className="flex flex-row gap-2 justify-between items-center">
                <p className='font-semibold lg:text-base md:text-[14px] sm:text-[13px] text-[12px]'>+91 8851611581</p>
                <button className='bg-[#F0EFFA] p-2 rounded-full shadow'><TbEdit/></button>
              </div>
            </div>

          </div>

          {/* Certificates */}
          <div className="border flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <div className="flex justify-between items-center mb-3">
              <h1 className='font-semibold'>Certificates</h1>
              <button className='bg-[#F0EFFA] px-6 py-1 rounded-full'>Edit</button>
            </div>
            <div className="border rounded-full flex items-center p-4">
              <div className="">
                <Image src="certificateIcon.svg" width={40} height={40} alt='certificateIcon' />
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <h2 className='font-medium text-lg'>Python</h2>
                <h2>Coding Ninjas</h2>
              </div>
            </div>
            <div className="border rounded-full flex items-center p-4">
              <div className="">
                <Image src="certificateIcon.svg" width={40} height={40} alt='certificateIcon' />
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <h2 className='font-medium text-lg'>Python</h2>
                <h2>Coding Ninjas</h2>
              </div>
            </div>
          </div>


          {/* About */}
          <div className="border flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <div className="flex justify-between items-center mb-2">
              <h1 className='font-semibold'>About <span className='text-[#413B89]'>Pankaj</span></h1>
              <button className='bg-[#F0EFFA] px-6 py-1 rounded-full'>Edit</button>
            </div>
            <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit odio magni vel quo accusantium! Laboriosam magni distinctio minima vel deleniti.</p>
          </div>


          {/* Experience */}
          <div className="border flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <div className="flex justify-between items-center mb-3">
              <h1 className='font-semibold'>Experience</h1>
              <button className='bg-[#F0EFFA] px-6 py-1 rounded-full'>Edit</button>
            </div>

            <div className="border rounded-2xl flex xl:flex-row lg:flex-row md:flex-col sm:flex-row flex-col items-center p-4 gap-2">

              <div className="flex flex-col justify-start items-start w-full border">
                <h1 className='font-medium'>7 years (2014-2021)</h1>
                <h1>Oruphones</h1>
              </div>

              <div className="flex flex-col justify-end lg:items-end md:items-start sm:items-end items-start w-full border">
                <h1 className='text-gray-700 font-medium'>Full Time</h1>
                <h1 className='text-gray-700 '>Full Stack Developer</h1>
              </div>
            </div>
          </div>


          {/* Skills */}
          <div className="border flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <div className="flex items-center justify-between mb-2">
              <h1 className='font-semibold'>Skills</h1>
              <button className='bg-[#F0EFFA] px-6 py-1 rounded-full'>Edit</button>
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              <span className='border shadow rounded-full bg-slate-300 px-4 py-1'>Nextjs</span>
              <span className='border shadow rounded-full bg-slate-300 px-4 py-1'>tailwind css</span>
            </div>
          </div>

          {/* Education */}
          <div className="border flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <div className="flex justify-between items-center mb-3">
              <h1 className='font-semibold'>Education</h1>
              <button className='bg-[#F0EFFA] px-6 py-1 rounded-full'>Edit</button>
            </div>

            <div className="border rounded-2xl flex flex-col p-4 gap-2">
              <div className="">
                <h1 className='text-[#413B89] font-semibold uppercase text-lg'>IIT Hyderabad</h1>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className='font-medium'>2017-2020</p>
                <p className='font-medium'>BCA</p>
              </div>
              <div className="">
                <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fugit ullam amet similique est saepe blanditiis incidunt reprehenderit numquam repudiandae.</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default ProfileDashboard