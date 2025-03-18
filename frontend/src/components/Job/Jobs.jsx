import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { motion } from "framer-motion";
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaFilter, FaTimes, FaChevronRight } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { BsCalendarX, BsBuilding } from "react-icons/bs";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    title: "",
    category: "",
    country: "",
    city: "",
    salaryFrom: "",
    salaryTo: "",
    expired: "",
  });

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
    setLoading(true);
    axios
      .get("http://localhost:4000/api/v1/job/getall", {
        withCredentials: true,
      })
      .then((res) => {
        setJobs(res.data.jobs);
        setFilteredJobs(res.data.jobs);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = jobs;
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filtered = filtered.filter((job) =>
          job[key]?.toString().toLowerCase().includes(filters[key].toString().toLowerCase())
        );
      }
    });
    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      title: "",
      category: "",
      country: "",
      city: "",
      salaryFrom: "",
      salaryTo: "",
      expired: "",
    });
  };

  const applyFilters = () => {
    // Filter logic is already handled in useEffect
    setShowFilters(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const categories = ["IT & Software", "Design", "Marketing", "Engineering", "Finance", "Healthcare"];
  const locations = ["Remote", "On-Site", "Hybrid"];

  return (
    <section className="min-h-screen py-8 pt-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-4">
            Find Your Perfect Job
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our extensive collection of job opportunities tailored to match your skills and aspirations.
          </p>
        </motion.div>

        {/* Popular categories */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-10 hidden md:block"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-lg p-4 shadow-md text-center cursor-pointer border border-gray-200 hover:border-indigo-300 transition-all duration-300"
                onClick={() => setFilters({...filters, category})}
              >
                <BiCategory className="mx-auto text-3xl text-indigo-500 mb-2" />
                <p className="font-medium text-gray-700">{category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Work type */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-10 hidden md:block"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Work Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {locations.map((location, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-lg p-6 shadow-md text-center cursor-pointer border border-gray-200 hover:border-indigo-300 transition-all duration-300"
                onClick={() => setFilters({...filters, city: location})}
              >
                <FaMapMarkerAlt className="mx-auto text-3xl text-indigo-500 mb-3" />
                <p className="font-medium text-gray-700 text-lg">{location}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              display: showFilters ? 'block' : 'none',
              transition: { duration: 0.3 }
            }}
            className={`w-full lg:w-1/4 bg-white p-6 border border-gray-200 rounded-xl shadow-lg mb-8 lg:mb-0 ${showFilters ? 'block' : 'hidden lg:block'} sticky top-24`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Filter Jobs</h2>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 lg:hidden"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBriefcase className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    placeholder="Search job titles..."
                    value={filters.title}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BiCategory className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. IT, Design..."
                    value={filters.category}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="country"
                    placeholder="e.g. USA, India..."
                    value={filters.country}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. New York, Remote..."
                    value={filters.city}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Salary
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="salaryFrom"
                      placeholder="From"
                      value={filters.salaryFrom}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Salary
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="salaryTo"
                      placeholder="To"
                      value={filters.salaryTo}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Status
                </label>
                <select
                  name="expired"
                  value={filters.expired}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="">All Jobs</option>
                  <option value="false">Active Jobs</option>
                  <option value="true">Expired Jobs</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetFilters}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                >
                  Reset
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={applyFilters}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center"
                >
                  Apply Filters
                </motion.button>
              </div>
            </div>
          </motion.aside>

          {/* Job listings */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Available Jobs</h2>
                <p className="text-gray-500">{filteredJobs.length} jobs found</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg border border-indigo-200 shadow-sm hover:shadow-md transition duration-300 flex items-center gap-2 lg:hidden"
              >
                <FaFilter />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </motion.button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md p-8 text-center"
              >
                <div className="text-gray-400 text-6xl mb-4">
                  <FaBriefcase className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Jobs Found</h3>
                <p className="text-gray-500 mb-6">We couldn't find any jobs matching your search criteria</p>
                <button 
                  onClick={resetFilters}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {filteredJobs.map((job) => (
                  <motion.div 
                    key={job._id} 
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, boxShadow: "0 10px 15px rgba(0,0,0,0.05)" }}
                    className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${job.expired ? 'border-red-400' : 'border-green-400'} transition-all duration-300`}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <BiCategory className="text-indigo-500" />
                              <span>{job.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaMapMarkerAlt className="text-indigo-500" />
                              <span>{job.country}, {job.city}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaDollarSign className="text-indigo-500" />
                              <span>{job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BsBuilding className="text-indigo-500" />
                              <span>{job.company || "Company Name"}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${job.expired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {job.expired ? (
                              <>
                                <BsCalendarX className="mr-1" />
                                Expired
                              </>
                            ) : (
                              <>
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                                Active
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4 text-gray-600 line-clamp-2">
                        {job.description}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills && job.skills.split(',').map((skill, index) => (
                          <span key={index} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-medium">
                            {skill.trim()}
                          </span>
                        ))}
                        {!job.skills && ['JavaScript', 'React', 'Node.js'].map((skill, index) => (
                          <span key={index} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <motion.div 
                        className="flex justify-end"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={`/job/${job._id}`}
                          className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition duration-200"
                        >
                          View Details <FaChevronRight className="ml-1 text-sm" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
