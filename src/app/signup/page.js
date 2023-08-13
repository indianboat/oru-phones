"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Formik, FieldArray, Field } from "formik";
import InputComponent from "../components/InputComponent";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';


const Signup = () => {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (push, skills) => {
    if (newSkill.trim() !== '') {
      push(newSkill.trim());
      setNewSkill('');
    }
  };

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    skills: [],
    experiences: [{ from: "", end: "", companyName: "", designation: "", workType: "" }],
    educations: [{ university: "", batch: "", city: "", state: "", degreeName: "", desc: "" }],
    certificates: [{ courseName: "", companyName: "", from: "", end: "" }],
    about:"",
    professionalDetail:""
  };

  async function onSubmit(values, {resetForm}) {
    const res = await fetch("/api/signup", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(values)
    });

    if (res.status == 422) {
      toast("User already exists !");
    } 
    
    else if ( res.status == 201) {
      toast("Sign up Success, redirecting...");
      setTimeout(() => {
        resetForm();
        router.push("/login");
      }, 2500);
    } 

    else if (res.status == 500) {
      toast("Internal Server Error, Please try again later !");
    }
  }



  return (
    <>
      <Toaster/>
      <div className="container flex flex-col lg:w-10/12 md:w-11/12 sm:w-full w-full mx-auto my-6 border p-4">
        <div className="flex w-full justify-between gap-y-8">
          <div className="border w-full p-4">
            <h1 className="font-semibold text-3xl drop-shadow">Sign up</h1>

            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {(formik) => (
                <form className="mt-6 flex flex-col gap-y-4" onSubmit={formik.handleSubmit}>
                  <h2 className="text-xl my-2 font-bold">Personal Details</h2>

                  {/* Personal Details */}
                  <div className="gap-x-24 gap-y-8 w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mx-auto bg-slate-50 dark:bg-neutral-900 p-8 rounded-lg">

                    <InputComponent label="First Name" type="text" isRequired={true} name="fname" placeholder="Enter your first name" id="fname" />
                    <InputComponent label="Last Name" type="text" isRequired={false} name="lname" placeholder="Enter your last name" id="lname" />
                    <InputComponent label="Email" type="email" isRequired={true} name="email" placeholder="Enter your email address" id="email" />
                    <InputComponent label="Mobile" type="tel" maxLength={10} minLength={10} isRequired={true} name="mobile" placeholder="Enter your mobile number" id="mobile" />

                    <div className="flex flex-col lg:col-span-2 md:col-span-2 sm:col-span-1 col-span-1">
                      <label
                        htmlFor="password"
                        className="text-slate-600 dark:text-slate-200 text-sm"
                      >
                        Password*
                      </label>
                      <div className="mt-1 flex items-center justify-end">
                        <Field
                          className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 pr-12 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create Strong password"
                          id="password"
                          name="password"
                          required
                        />
                        <div className="flex rounded-e-md justify-center  items-center px-3 py-2 absolute">
                          <button type="button" onClick={() => setShowPassword(!showPassword)}>{
                            showPassword ? <FaRegEye size={24} className="text-slate-400" /> : <FaRegEyeSlash size={24} className="text-slate-400" />
                          }</button>
                        </div>
                      </div>
                      <span className="text-[12px] mt-1">
                        password must be 8-16 characters long and contain atleast one uppercase, one lowercase character and one number
                      </span>
                    </div>

                  </div>


                  {/* About Section */}
                  <h2 className="mt-4 text-xl font-bold">About yourself</h2>
                  <div className="border gap-5 w-full mx-auto bg-slate-50 dark:bg-neutral-900 p-8 rounded-lg">
                    <label
                      htmlFor="about"
                      className="text-slate-600 dark:text-slate-200 text-sm"
                    >
                      About
                    </label>
                    <div className="mt-1 flex items-center justify-end">
                      <Field
                        as="textarea"
                        className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 pr-12 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                        placeholder="write about yourself"
                        id="about"
                        name="about"
                        rows={4}
                      />
                    </div>
                  </div>





                  {/* experiences Section */}
                  <h2 className="mt-4 text-xl font-bold">About Experiences</h2>

                  <FieldArray name="experiences">
                    {
                      ({ push, remove }) => (
                        <div className="border flex flex-col gap-y-5">
                          <AnimatePresence>
                            {
                              formik.values.experiences.map((epx, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  className="border gap-5 w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-auto bg-slate-50 dark:bg-neutral-900 p-8 rounded-lg">
                                  <InputComponent label="Company Name" type="text" placeholder="Enter company name" name={`experiences[${index}].companyName`} id={`experiences[${index}].companyName`} />
                                  <InputComponent label="Designation" type="text" placeholder="Enter designation" name={`experiences[${index}].designation`} id={`experiences[${index}].designation`} />
                                  <InputComponent label="From" type="date" name={`experiences[${index}].from`} id={`experiences[${index}].from`} />
                                  <InputComponent label="End" type="date" name={`experiences[${index}].end`} id={`experiences[${index}].end`} />

                                  <div className="flex flex-col">
                                    <label htmlFor={`experiences[${index}].workType`} className="text-slate-600 dark:text-slate-200 text-sm">Work Type</label>
                                    <div className="mt-1 flex items-center justify-end">
                                      <select name={`experiences[${index}].workType`} className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300" id={`experiences[${index}].workType`} >
                                        <option value="full_time">Full Time</option>
                                        <option value="part_time">Part Time</option>
                                        <option value="intern">Intern</option>
                                      </select>
                                    </div>
                                  </div>
                                  {index > 0 && (
                                    <motion.button
                                      type="button"
                                      className="px-2 py-1 text-sm text-white bg-red-500 rounded-lg w-fit"
                                      onClick={() => remove(index)}
                                    >
                                      Remove Section
                                    </motion.button>
                                  )}
                                </motion.div>


                              ))}
                          </AnimatePresence>

                          <motion.button
                            type="button"
                            className="px-2 py-2 text-sm text-white bg-neutral-700 rounded"
                            onClick={() => push('')}
                          >
                            Add more
                          </motion.button>

                        </div>
                      )
                    }
                  </FieldArray>

                  {/* About Skill  */}

                  <h2 className="mt-4 text-xl font-bold">About Skills</h2>
                  <FieldArray name="skills">
                    {
                      ({ push, remove }) => (
                        <div className="border gap-5 flex flex-col w-full mx-auto bg-slate-50 dark:bg-neutral-900 p-8 rounded-lg">

                          <div className="flex flex-row flex-wrap gap-5">
                            <AnimatePresence>
                              {formik.values.skills.map((skill, index) => (
                                <motion.span
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.2 }} className="flex relative justify-between min-w-28 rounded-full bg-blue-100 ps-6 pe-12 py-3 text-sm shadow">
                                  {skill}
                                  <button
                                    type="button"
                                    className="flex text-xs bg-blue-400 text-white rounded-full absolute right-3"
                                    onClick={() => remove(index)}
                                  >
                                    <IoIosClose size={20} />
                                  </button>
                                </motion.span>
                              ))}
                            </AnimatePresence>
                          </div>



                          <div className="flex flex-col">
                            <label
                              htmlFor="skills"
                              className="text-slate-600 dark:text-slate-200 text-sm"
                            >
                              Skills
                            </label>
                            <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col gap-6">
                              <input
                                type="text"
                                placeholder="Enter skill"
                                className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                              />
                              <button
                                type="button"
                                className="px-8 lg:w-[220px] md:w-[220px] sm:w-full w-full py-2 outline-purple-950 bg-[#333333] active:scale-95 transition-transform text-white border rounded-lg"
                                onClick={() => handleAddSkill(push, formik.values.skills)}
                              >
                                Add Skill
                              </button>
                            </div>
                          </div>

                        </div>
                      )}
                  </FieldArray>



                  {/* About Education  */}
                  <h1 className="mt-4 text-xl font-bold">About Education</h1>
                  <FieldArray name="educations">
                    {
                      ({ push, remove }) => (
                        <div className="border flex flex-col gap-y-5">
                          <AnimatePresence>
                            {
                              formik.values.educations.map((edu, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  className="border gap-5 w-full grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-auto bg-slate-50 dark:bg-neutral-900 p-8 rounded-lg">


                                  <InputComponent label="University Name" type="text" placeholder="Enter university" name={`educations[${index}].university`} id={`educations[${index}].university`} />
                                  <InputComponent label="Degree" type="text" placeholder="Enter degree" name={`educations[${index}].degreeName`} id={`educations[${index}].degreeName`} />
                                  <InputComponent label="State" type="text" placeholder="Enter state" name={`educations[${index}].state`} id={`educations[${index}].state`} />
                                  <InputComponent label="City" type="text" placeholder="Enter city" name={`educations[${index}].city`} id={`educations[${index}].city`} />
                                  <InputComponent label="Description" type="text" placeholder="Enter description" name={`educations[${index}].desc`} id={`educations[${index}].desc`} />
                                  <InputComponent label="Batch" type="month" name={`educations[${index}].batch`} id={`educations[${index}].batch`} />

                                  {index > 0 && (
                                    <motion.button
                                      type="button"
                                      className="px-2 py-1 text-sm text-white bg-red-500 rounded-lg w-fit"
                                      onClick={() => remove(index)}
                                    >
                                      Remove Section
                                    </motion.button>
                                  )}
                                </motion.div>


                              ))}
                          </AnimatePresence>

                          <motion.button
                            type="button"
                            className="px-2 py-2 text-sm text-white bg-neutral-700 rounded"
                            onClick={() => push('')}
                          >
                            Add more
                          </motion.button>

                        </div>
                      )
                    }
                  </FieldArray>




                  {/* Certificates */}
                  <h1 className="mt-4 text-xl font-bold">Add Certificates</h1>
                  <FieldArray name="certificates">
                    {
                      ({ push, remove }) => (
                        <div className="border flex flex-col gap-y-5">
                          <AnimatePresence>
                            {
                              formik.values.certificates.map((cert, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  className="border gap-5 w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 mx-auto bg-slate-50 dark:bg-neutral-900 p-8 rounded-lg">

                                  <InputComponent label="Course Name" type="text" placeholder="Enter course" name={`certificates[${index}].courseName`} id={`certificates[${index}].courseName`} />
                                  <InputComponent label="Company Name" type="text" placeholder="Enter company" name={`certificates[${index}].companyName`} id={`certificates[${index}].companyName`} />

                                  <InputComponent label="From" type="date" name={`certificates[${index}].from`} id={`certificates[${index}].from`} />
                                  <InputComponent label="End" type="date" name={`certificates[${index}].end`} id={`certificates[${index}].end`} />


                                  {index > 0 && (
                                    <motion.button
                                      type="button"
                                      className="px-2 py-1 text-sm text-white bg-red-500 rounded-lg w-fit"
                                      onClick={() => remove(index)}
                                    >
                                      Remove Section
                                    </motion.button>
                                  )}
                                </motion.div>


                              ))}
                          </AnimatePresence>

                          <motion.button
                            type="button"
                            className="px-2 py-2 text-sm text-white bg-neutral-700 rounded"
                            onClick={() => push('')}
                          >
                            Add more
                          </motion.button>

                        </div>
                      )
                    }
                  </FieldArray>


                  {/* Professional Section */}
                  <h2 className="mt-4 text-xl font-bold">Professional Details</h2>
                  <div className="border gap-5 w-full mx-auto bg-slate-50 dark:bg-neutral-900 p-8 rounded-lg">
                    <label
                      htmlFor="professionalDetail"
                      className="text-slate-600 dark:text-slate-200 text-sm"
                    >
                      Professional
                    </label>
                    <div className="mt-1 flex items-center justify-end">
                      <Field
                        as="textarea"
                        className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 pr-12 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                        placeholder="write about your professional"
                        id="professionalDetail"
                        name="professionalDetail"
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="px-3 py-2 outline-purple-950 bg-[#7F56DA] active:scale-95 transition-transform text-white border w-full rounded-lg"
                      type="submit"
                    >
                      Sign up
                    </button>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <span className="text-sm">
                      Have an account?{" "}
                      <Link
                        href={"/login"}
                        className="text-[#7F56DA] text-sm hover:underline outline-purple-950"
                      >
                        Sign in
                      </Link>
                    </span>
                  </div>
                </form>
              )}

            </Formik>

          </div>

        </div>
      </div >
    </>
  );
};

export default Signup;