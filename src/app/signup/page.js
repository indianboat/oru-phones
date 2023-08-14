"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Formik, FieldArray, Field, Form, ErrorMessage } from "formik";
import InputComponent from "../components/InputComponent";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from "../components/Spinner";


const Signup = () => {

  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showCertificates, setShowCertificates] = useState(false);
  const [showProfessionalDetail, setShowProfessionalDetail] = useState(false);

  const initialValues = {
    fname: "",
    lname: "",
    about: "",
    email: "",
    mobile: "",
    password: "",
    skills: [],
    education: [],
    experience: [],
    certificates: [],
    professionalDetail: ""
  }

  async function onSubmit(values, { resetForm }) {
    setLoading(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (res.status == 422) {
      setLoading(false);
      toast.error("User already exists !");
    }

    else if (res.status == 201) {
      setLoading(false);
      resetForm();
      toast.success("Sign up Success, redirecting...");
      setTimeout(() => {
        push("/login");
      }, 2000);
    }

    else if (res.status == 500) {
      setLoading(false);
      toast.error("Internal Server Error, Please try again later !");
    }
  }


  const monthSample = [];
  const yearsSample = [];
  const numberSample = [];

  for (let index = 1; index < 12; index++) {
    if (index == 1) { monthSample.push(`${index} Month`)}
    else { monthSample.push(`${index} Months`) }
  }

  for (let i = 1990; i < 2024; i++) { yearsSample.push(i) }
  for (let j = 1; j < 19; j++) {
    if (j == 1) { numberSample.push(`${j} Year`)}
    else { numberSample.push(`${j} Years`)}
  }

  const expYears = [...monthSample, ...numberSample];


  return (
    <>
      <Toaster toastOptions={{ duration:1900 }} />
      { loading ? <Spinner/> : null }

      <div className="container flex flex-col lg:w-10/12 md:w-11/12 sm:w-full w-full mx-auto my-6 p-4 shadow-lg rounded-2xl">
        <div className="flex w-full justify-between gap-y-8">
          <div className="w-full p-4">
            <h1 className="font-semibold text-3xl drop-shadow">Sign up</h1>

            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ values, handleChange, setFieldValue }) => (
                <Form className="mt-6 flex flex-col gap-y-4">

                  {/* Personal Details */}
                  <h2 className="text-xl my-2 font-semibold underline">Personal Details</h2>
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

                  {/* About user Section */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl mt-4 mb-2 font-semibold underline">About yourself</h2>
                    {
                      !showAbout ? (<button
                        type="button"
                        onClick={() => setShowAbout(true)}
                        className="px-2 py-1 text-green-600 bg-green-100 rounded hover:bg-green-200"
                      >
                        Add About
                      </button>) : (<button
                        type="button"
                        onClick={() => {
                          setFieldValue("about", "");
                          setShowAbout(false);
                        }}
                        className="px-2 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200"
                      >
                        Remove About
                      </button>)
                    }
                  </div>
                  <AnimatePresence>
                    {showAbout ? (<>
                      <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="border gap-5 w-full mx-auto bg-slate-100 dark:bg-neutral-900 p-8 rounded-lg">
                        <label htmlFor="about" className="text-slate-600 dark:text-slate-200 text-sm">About</label>
                        <div
                        >
                          <Field
                            as="textarea"
                            id="about"
                            name="about"
                            className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 pr-12 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                            placeholder="write about yourself"
                            rows={4}
                          />
                        </div>
                      </motion.div>
                    </>) : null}
                  </AnimatePresence>

                  {/* About Experience */}
                  <h2 className="text-xl mt-4 mb-2 font-semibold underline">Experience</h2>
                  <FieldArray name="experience">
                    {({ push, remove }) => (
                      <div className="flex gap-3 flex-col">
                        {values.experience.map((exp, index) => (
                          <div key={index} className="border gap-5 w-full grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-auto bg-slate-50 dark:bg-neutral-900 p-8 rounded-lg">
                            <div>
                              <label htmlFor={`experience[${index}].from`}>From</label>
                              <Field
                                type="number"
                                id={`experience[${index}].from`}
                                name={`experience[${index}].from`}
                                placeholder="2018"
                                className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor={`experience[${index}].end`}>End</label>
                              <Field
                                type="number"
                                id={`experience[${index}].end`}
                                name={`experience[${index}].end`}
                                placeholder="2022"
                                className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor={`experience[${index}].totalExperience`}>Total Experience</label>
                              <Field
                                component="select"
                                id={`experience[${index}].totalExperience`}
                                name={`experience[${index}].totalExperience`}
                                className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                required
                              >
                                <option value="">Select</option>
                                {
                                  expYears.map((yyyy, fromIndex) => {
                                    return (<option key={fromIndex} value={yyyy}>{yyyy}</option>)
                                  })
                                }
                              </Field>
                            </div>
                            <div>
                              <label htmlFor={`experience[${index}].companyName`}>Company Name</label>
                              <Field
                                type="text"
                                id={`experience[${index}].companyName`}
                                name={`experience[${index}].companyName`}
                                placeholder="Enter company name"
                                className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor={`experience[${index}].designation`}>Designation</label>
                              <Field
                                type="text"
                                id={`experience[${index}].designation`}
                                name={`experience[${index}].designation`}
                                placeholder="Enter designation"
                                className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor={`experience[${index}].workType`}>Work Type</label>
                              <Field
                                component="select"
                                id={`experience[${index}].workType`}
                                name={`experience[${index}].workType`}
                                className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                required
                              >
                                <option value="">Select</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Intern">Intern</option>
                              </Field>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="px-2 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200"
                            >
                              Remove Experience
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              from: "",
                              end: "",
                              totalExperience: "",
                              companyName: "",
                              designation: "",
                              workType: "",
                            })
                          }
                          className="px-2 py-1 text-green-600 bg-green-100 rounded hover:bg-green-200"
                        >
                          Add Experience
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  {/* About Education */}
                  <h2 className="text-xl mt-4 mb-2 font-semibold underline">Education</h2>
                  <FieldArray name="education">
                    {({ push, remove }) => (
                      <div className="flex flex-col gap-3">
                        {values.education.map((edu, index) => (
                          <div key={index} className="border flex gap-5 flex-col mx-auto p-8 rounded-lg bg-slate-50 dark:bg-neutral-900">
                            <div className=" gap-5 w-full grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">

                              <div>
                                <label htmlFor={`education[${index}].university`} className="text-slate-600 dark:text-slate-200 text-sm">University</label>
                                <Field
                                  type="text"
                                  id={`education[${index}].university`}
                                  name={`education[${index}].university`}
                                  placeholder="Enter university"
                                  className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor={`education[${index}].city`} className="text-slate-600 dark:text-slate-200 text-sm">City</label>
                                <Field
                                  type="text"
                                  id={`education[${index}].city`}
                                  name={`education[${index}].city`}
                                  placeholder="Enter city"
                                  className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor={`education[${index}].state`} className="text-slate-600 dark:text-slate-200 text-sm">State</label>
                                <Field
                                  type="text"
                                  id={`education[${index}].state`}
                                  name={`education[${index}].state`}
                                  placeholder="Enter state"
                                  className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor={`education[${index}].batch`} className="text-slate-600 dark:text-slate-200 text-sm">Batch</label>
                                <Field
                                  type="month"
                                  id={`education[${index}].batch`}
                                  name={`education[${index}].batch`}
                                  className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor={`education[${index}].degreeName`} className="text-slate-600 dark:text-slate-200 text-sm">Degree</label>
                                <Field
                                  type="text"
                                  id={`education[${index}].degreeName`}
                                  name={`education[${index}].degreeName`}
                                  placeholder="Enter degree name"
                                  className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                  required
                                />
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="px-2 w-fit py-1 text-red-600 bg-red-100 rounded hover:bg-red-200"
                            >
                              Remove Education
                            </button>
                          </div>

                        ))}
                        <button
                          type="button"
                          onClick={() => push({ university: "", city: "", state: "", batch: "", degree: "" })}
                          className="px-2 py-1 text-green-600 bg-green-100 rounded hover:bg-green-200"
                        >
                          Add Education
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  {/* About Skills */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl mt-4 mb-2 font-semibold underline">Skills</h2>
                    {
                      !showSkills ? (<button
                        type="button"
                        onClick={() => setShowSkills(true)}
                        className="px-2 py-1 text-green-600 bg-green-100 rounded hover:bg-green-200"
                      >
                        Add Skills
                      </button>) : (<button
                        type="button"
                        onClick={() => {
                          setShowSkills(false);
                          values.skills = [];
                        }}
                        className="px-2 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200"
                      >
                        Remove Skills
                      </button>)
                    }
                  </div>
                  <AnimatePresence>
                    {
                      showSkills ? <FieldArray name="skills">
                        {({ push, remove }) => (
                          <motion.div initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="border gap-5 flex flex-col w-full mx-auto bg-slate-50 dark:bg-neutral-900 p-8 rounded-lg">
                            <div className="flex flex-row flex-wrap gap-5">
                              {values.skills && values.skills.map((skill, index) => (
                                <motion.span
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }} className="flex relative justify-between min-w-28 rounded-full bg-blue-100 ps-6 pe-12 py-3 text-sm shadow">
                                  <span>{skill}</span>
                                  <button
                                    type="button"
                                    className="flex text-xs bg-blue-400 text-white rounded-full absolute right-3"
                                    onClick={() => remove(index)}
                                  >
                                    <IoIosClose size={20} />
                                  </button>
                                </motion.span>
                              ))}
                            </div>

                            <div className="flex flex-col">
                              <label
                                htmlFor="skills"
                                className="text-slate-600 dark:text-slate-200 text-sm"
                              >
                                Skills
                              </label>
                              <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col gap-6">
                                <Field
                                  type="text"
                                  id="skills"
                                  value={newSkill}
                                  onChange={(e) => setNewSkill(e.target.value)}
                                  className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                  placeholder="Enter skill"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.target.value.trim() !== "") {
                                      e.preventDefault();
                                      push(e.target.value.trim());
                                      e.target.value = "";
                                      setNewSkill('')
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </FieldArray> : null
                    }
                  </AnimatePresence>

                  {/* About Certificates */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl mt-4 mb-2 font-semibold underline">Certificate</h2>
                    {
                      !showCertificates ? (<button
                        type="button"
                        onClick={() => setShowCertificates(true)}
                        className="px-2 py-1 text-green-600 bg-green-100 rounded hover:bg-green-200"
                      >
                        Add Certificates
                      </button>) : (<button
                        type="button"
                        onClick={() => {
                          setShowCertificates(false);
                          values.certificates = [];
                        }}
                        className="px-2 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200"
                      >
                        Remove Certificates
                      </button>)
                    }
                  </div>
                  <AnimatePresence>
                    {
                      showCertificates ? <FieldArray name="certificates">
                        {({ push, remove }) => (
                          <div className="border flex flex-col gap-y-5">
                            {values.certificates.map((certificate, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }} className="border gap-5 w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 mx-auto bg-slate-50 dark:bg-neutral-900 p-8 rounded-lg">

                                <div>
                                  <label htmlFor={`certificates[${index}].courseName`}>Course Name</label>
                                  <Field
                                    type="text"
                                    id={`certificates[${index}].courseName`}
                                    name={`certificates[${index}].courseName`}
                                    className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                    placeholder="Enter course"
                                    required
                                  />
                                </div>
                                <div>
                                  <label htmlFor={`certificates[${index}].companyName`}>Company Name</label>
                                  <Field
                                    type="text"
                                    id={`certificates[${index}].companyName`}
                                    name={`certificates[${index}].companyName`}
                                    className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                    placeholder="Enter company"
                                    required
                                  />
                                </div>
                                <div>
                                  <label htmlFor={`certificates[${index}].from`}>From</label>
                                  <Field
                                    type="month"
                                    id={`certificates[${index}].from`}
                                    name={`certificates[${index}].from`}
                                    className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                    required
                                  />
                                </div>
                                <div>
                                  <label htmlFor={`certificates[${index}].end`}>End</label>
                                  <Field
                                    type="month"
                                    id={`certificates[${index}].end`}
                                    name={`certificates[${index}].end`}
                                    className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                                    required
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="px-2 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200"
                                >
                                  Remove Certificate
                                </button>
                              </motion.div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push({ courseName: "", companyName: "", from: "", end: "" })}
                              className="px-2 py-1 text-green-600 bg-green-100 rounded hover:bg-green-200"
                            >
                              Add Certificate
                            </button>
                          </div>
                        )}
                      </FieldArray> : null
                    }
                  </AnimatePresence>

                  {/* Professional Details */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl mt-4 mb-2 font-semibold underline">Professional Details</h2>
                    {
                      !showProfessionalDetail ? (<button
                        type="button"
                        onClick={() => setShowProfessionalDetail(true)}
                        className="px-2 py-1 text-green-600 bg-green-100 rounded hover:bg-green-200"
                      >
                        Add Professional Detail
                      </button>) : (<button
                        type="button"
                        onClick={() => {
                          setShowProfessionalDetail(false);
                          values.professionalDetail = "";
                        }}
                        className="px-2 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200"
                      >
                        Remove Professional Detail
                      </button>)
                    }
                  </div>
                  <AnimatePresence>
                    {
                      showProfessionalDetail ? <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }} className="border gap-5 w-full mx-auto bg-slate-100 dark:bg-neutral-900 p-8 rounded-lg">
                        <label htmlFor="professionalDetail" className="text-slate-600 dark:text-slate-200 text-sm">Professional Detail</label>
                        <Field
                          as="textarea"
                          id="professionalDetail"
                          name="professionalDetail"
                          className="w-full focus:ring-2 shadow ring-[#7F56DA] border-2 pr-12 px-3 py-2 transition-all dark:border-[#3B3B3B] rounded-lg outline-none focus:border-gray-300"
                          placeholder="write about your professional."
                          rows={4}
                          required
                        />
                      </motion.div> : null
                    }
                  </AnimatePresence>


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
                </Form>
              )}

            </Formik>

          </div>

        </div>
      </div >
    </>
  );
};

export default Signup;