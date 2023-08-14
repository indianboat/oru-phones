"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import { CiMail } from "react-icons/ci";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { signIn, useSession} from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from "next/navigation";
import Spinner from "../components/Spinner";


const Signin = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { status } = useSession();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  async function onSubmit(values) {
    setLoading(true)
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/profile",
    });

    if(res.error == null){
      toast.success("Login success, redirecting...");
      setLoading(false);
    }
    else{
      toast.error(res.error, { duration:2500});
      setLoading(false);
    }    
  }

  if(status === "loading"){
    return <Spinner />
  }
  if(status === "authenticated"){
    redirect("/profile");
  }

  return (
    <>
    <Toaster/>
    {loading?<Spinner /> : null}
      <div className="container flex flex-col md:w-11/12 sm:w-full w-full mx-auto my-6 p-4">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 justify-between gap-y-8">
          <div className="lg:rounded-tl-[50px] xl:py-16 lg:py-16 md:py-14 sm:py-12 py-6 xl:px-28 lg:px-16 md:px-14 sm:px-8 px-3 bg-slate-50 dark:bg-neutral-900">
            <h1 className="font-semibold text-3xl drop-shadow">
              Welcome back
            </h1>
            <p className="mt-2 text-slate-700 dark:text-slate-200">
              Please enter your details.
            </p>
            <form className="mt-6" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-slate-600 dark:text-slate-200 text-sm"
                >
                  Email
                </label>
                <div className="mt-1 flex items-center justify-end">
                  <input
                    className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 pl-3 pr-14 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300 lowercase"
                    type="email"
                    placeholder="enter your email"
                    id="email"
                    name="email"
                    required
                    autoFocus
                    {...formik.getFieldProps("email")}
                    spellCheck={false}
                  />
                  <div className="flex rounded-e-md justify-center  items-center px-3 py-2 absolute">
                    <CiMail size={24} className="text-slate-400" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col">
                <label
                  htmlFor="password"
                  className="text-slate-600 dark:text-slate-200 text-sm"
                >
                  Password
                </label>
                <div className="mt-1 flex items-center justify-end">
                  <input
                    className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                    type={showPassword?"text":"password"}
                    placeholder="enter your password"
                    id="password"
                    name="password"
                    {...formik.getFieldProps("password")}
                    required
                  />
                  <div className="flex rounded-e-md justify-center  items-center px-3 py-2 absolute">
                    <button type="button" onClick={()=> setShowPassword(!showPassword)}>{
                      showPassword ? <FaRegEye size={24} className="text-slate-400" /> : <FaRegEyeSlash size={24} className="text-slate-400" />
                    }</button>
                  </div>
                </div>
              </div>
              <div className="my-4 flex justify-end">
                <Link
                  href={"/login"}
                  className="font-medium outline-purple-950"
                >
                  Forgot password
                </Link>
              </div>
              <div className="flex justify-center">
                <button
                  className="px-3 py-2 outline-purple-950 bg-[#7F56DA] active:scale-95 transition-transform text-white w-full rounded-lg"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <div className="mt-8 flex justify-center">
                <span className="text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={"/signup"}
                    className="text-[#7F56DA] text-sm hover:underline outline-purple-950"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </div>
          <div className="border flex lg:rounded-br-[50px] justify-end bg-gradient-radial to-[#8251F6] from-[#AC4EE5] dark:from-[#111111] dark:to-[#000000]">
            <Image
              src={"/login.svg"}
              width={1000}
              height={1000}
              sizes="100%"
              style={{ width: "100%", height: "100%" }}
              alt="signin-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
