import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { motion } from "framer-motion";
import { FaBriefcase, FaLocationArrow, FaDollarSign, FaBuilding, FaGlobe, FaFolder, FaList } from "react-icons/fa";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role === "Student" && user.special === "")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (salaryType === "Fixed Salary") {
        setSalaryFrom("");
        setSalaryTo("");
      } else if (salaryType === "Ranged Salary") {
        setFixedSalary("");
      } else {
        setSalaryFrom("");
        setSalaryTo("");
        setFixedSalary("");
      }

      const jobData = fixedSalary.length >= 4
        ? {
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
          }
        : {
            title,
            description,
            category,
            country,
            city,
            location,
            salaryFrom,
            salaryTo,
          };

      const res = await axios.post("http://localhost:4000/api/v1/job/post", jobData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      toast.success(res.data.message);
      clearForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error posting job");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setCountry("");
    setCity("");
    setLocation("");
    setSalaryFrom("");
    setSalaryTo("");
    setFixedSalary("");
    setSalaryType("default");
  };

  return (
    <motion.div 
      className="job_post min-h-screen pt-24 pb-12 px-4 sm:px-6 bg-gradient-to-br from-indigo-50 to-blue-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-gray-900"
          variants={itemVariants}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            Post a New Job
          </span>
        </motion.h1>

        <motion.form
          onSubmit={handleJobPost}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
          variants={itemVariants}
        >
          {/* Job Title and Category */}
          <div className="space-y-6">
            <motion.div className="wrapper flex flex-col md:flex-row gap-4 mb-4" variants={itemVariants}>
              <div className="flex-1 relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                  <FaBriefcase className="mr-2 text-indigo-500" /> Job Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter job title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  required
                />
              </div>
              
              <div className="flex-1 relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                  <FaFolder className="mr-2 text-indigo-500" /> Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Graphics & Design">Graphics & Design</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Frontend Web Development">Frontend Web Development</option>
                  <option value="MERN Stack Development">MERN STACK Development</option>
                  <option value="Account & Finance">Account & Finance</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Video Animation">Video Animation</option>
                  <option value="MEAN Stack Development">MEAN STACK Development</option>
                  <option value="MEVN Stack Development">MEVN STACK Development</option>
                  <option value="Data Entry Operator">Data Entry Operator</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                  <FaList className="text-indigo-500" />
                </div>
              </div>
            </motion.div>

            {/* Country and City */}
            <motion.div className="wrapper flex flex-col md:flex-row gap-4 mb-4" variants={itemVariants}>
              <div className="flex-1 relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                  <FaGlobe className="mr-2 text-indigo-500" /> Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  required
                />
              </div>
              
              <div className="flex-1 relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                  <FaBuilding className="mr-2 text-indigo-500" /> City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  required
                />
              </div>
            </motion.div>

            {/* Location */}
            <motion.div className="mb-4" variants={itemVariants}>
              <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                <FaLocationArrow className="mr-2 text-indigo-500" /> Specific Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter specific location (address, landmark, etc.)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                required
              />
            </motion.div>

            {/* Salary Type and Details */}
            <motion.div className="salary_wrapper mb-6" variants={itemVariants}>
              <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                <FaDollarSign className="mr-2 text-indigo-500" /> Salary Details
              </label>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 mb-4"
                required
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              
              <div className="mt-4">
                {salaryType === "default" ? (
                  <p className="text-red-500 text-sm">Please provide Salary Type</p>
                ) : salaryType === "Fixed Salary" ? (
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-gray-500">
                      <FaDollarSign />
                    </span>
                    <input
                      type="number"
                      placeholder="Enter Fixed Salary"
                      value={fixedSalary}
                      onChange={(e) => setFixedSalary(e.target.value)}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      required
                    />
                  </div>
                ) : (
                  <div className="ranged_salary flex gap-4">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-2 text-gray-500">
                        <FaDollarSign />
                      </span>
                      <input
                        type="number"
                        placeholder="Salary From"
                        value={salaryFrom}
                        onChange={(e) => setSalaryFrom(e.target.value)}
                        className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        required
                      />
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-2 text-gray-500">
                        <FaDollarSign />
                      </span>
                      <input
                        type="number"
                        placeholder="Salary To"
                        value={salaryTo}
                        onChange={(e) => setSalaryTo(e.target.value)}
                        className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div className="mb-6" variants={itemVariants}>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Job Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter detailed job description, requirements, responsibilities, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 h-40 resize-none"
                required
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white py-3 px-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-[1.02]"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  <span>Posting Job...</span>
                </div>
              ) : (
                "Post Job"
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default PostJob;
