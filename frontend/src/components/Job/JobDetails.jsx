import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaCalendarAlt, 
  FaBuilding, 
  FaGlobe,
  FaCity,
  FaChartLine,
  FaArrowLeft,
  FaBookmark,
  FaShare,
  FaClock
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdOutlineDescription, MdOutlineWork } from "react-icons/md";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [applyHover, setApplyHover] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
        setLoading(false);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

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

  const cardHoverVariants = {
    hover: { 
      y: -5, 
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Days posted ago
  const daysAgo = (dateString) => {
    if (!dateString) return '';
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  };

  // Toggle bookmark
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? 'Job removed from bookmarks' : 'Job added to bookmarks', {
      icon: bookmarked ? '🗑️' : '🔖',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  // Handle share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    toast.success('Job link copied to clipboard!', {
      icon: '📋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <section className="min-h-screen py-8 pt-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 via-blue-50 to-gray-50">
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
            <p className="text-indigo-600 animate-pulse">Loading job details...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between mb-6"
            >
              <button 
                onClick={() => navigateTo(-1)} 
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md"
              >
                <FaArrowLeft className="mr-2" />
                <span>Back to Jobs</span>
              </button>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleBookmark}
                  className={`p-2 rounded-full ${bookmarked ? 'bg-yellow-100 text-yellow-500' : 'bg-white text-gray-500 hover:text-yellow-500'} shadow-sm`}
                >
                  <FaBookmark />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white text-gray-500 hover:text-blue-500 shadow-sm relative"
                >
                  <FaShare />
                  <AnimatePresence>
                    {showShareTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -bottom-10 -left-6 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                      >
                        Link copied!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-indigo-600"
            >
              {/* Job header */}
              <div className="p-8 bg-gradient-to-r from-indigo-50 to-blue-50">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                      {job.title}
                      {job.featured && (
                        <span className="ml-3 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      {job.company && (
                        <div className="flex items-center">
                          <FaBuilding className="text-indigo-500 mr-2" />
                          <span>{job.company}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <BiCategory className="text-indigo-500 mr-2" />
                        <span>{job.category}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-indigo-500 mr-2" />
                        <span>{job.city}, {job.country}</span>
                      </div>
                      {job.jobPostedOn && (
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-indigo-500 mr-2" />
                          <span className="flex items-center">
                            <span className="mr-1">Posted</span>
                            <span className="font-medium">{daysAgo(job.jobPostedOn)}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${job.expired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} flex items-center`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${job.expired ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
                      {job.expired ? 'Expired' : 'Active'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Job details */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <motion.div 
                    variants={itemVariants}
                    whileHover="hover"
                    variants={cardHoverVariants}
                    className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <FaChartLine className="text-indigo-500 mr-2" />
                      Job Overview
                    </h2>
                    <ul className="space-y-4">
                      <li className="flex">
                        <span className="w-32 font-medium text-gray-600">Job Type:</span>
                        <span className="text-gray-800">{job.jobType || "Full Time"}</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 font-medium text-gray-600">Experience:</span>
                        <span className="text-gray-800">{job.experience || "1-3 Years"}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-32 font-medium text-gray-600">Salary:</span>
                        <span className="text-gray-800 font-semibold flex items-center">
                          <FaDollarSign className="text-green-500 mr-1" />
                          {job.fixedSalary ? (
                            job.fixedSalary
                          ) : (
                            `${job.salaryFrom} - ${job.salaryTo}`
                          )}
                        </span>
                      </li>
                      <li className="flex">
                        <span className="w-32 font-medium text-gray-600">Location:</span>
                        <span className="text-gray-800">{job.location || `${job.city}, ${job.country}`}</span>
                      </li>
                      {job.deadline && (
                        <li className="flex items-center">
                          <span className="w-32 font-medium text-gray-600">Deadline:</span>
                          <span className="text-gray-800 flex items-center">
                            <FaClock className="text-red-400 mr-1" />
                            {formatDate(job.deadline)}
                          </span>
                        </li>
                      )}
                    </ul>
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    whileHover="hover"
                    variants={cardHoverVariants}
                    className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <MdOutlineWork className="text-indigo-500 mr-2" />
                      Requirements
                    </h2>
                    <ul className="space-y-2 list-disc pl-5 text-gray-700">
                      {job.requirements ? (
                        job.requirements.split('\n').map((req, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {req}
                          </motion.li>
                        ))
                      ) : (
                        <>
                          {["Bachelor's degree in related field", 
                            "Strong problem-solving abilities", 
                            "Experience with relevant technologies", 
                            "Excellent communication skills", 
                            "Ability to work in a team environment"].map((req, index) => (
                              <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                {req}
                              </motion.li>
                            ))}
                        </>
                      )}
                    </ul>
                  </motion.div>
                </div>

                <motion.div 
                  variants={itemVariants}
                  whileHover="hover"
                  variants={cardHoverVariants}
                  className="mb-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <MdOutlineDescription className="text-indigo-500 mr-2" />
                    Job Description
                  </h2>
                  <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {job.description}
                  </div>
                </motion.div>

                {job.skills && (
                  <motion.div 
                    variants={itemVariants}
                    whileHover="hover"
                    variants={cardHoverVariants}
                    className="mb-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <FaBriefcase className="text-indigo-500 mr-2" />
                      Required Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.split(',').map((skill, index) => (
                        <motion.span 
                          key={index} 
                          className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-100"
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgb(238, 242, 255)",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {skill.trim()}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {user && user.role === "Employer" ? (
                  <motion.div 
                    variants={itemVariants}
                    className="text-center mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <p className="text-gray-700 mb-4">You are currently logged in as an employer and cannot apply for jobs</p>
                    <Link
                      to="/jobs"
                      className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      View Other Jobs
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div 
                    variants={itemVariants}
                    className="flex justify-center mt-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setApplyHover(true)}
                      onHoverEnd={() => setApplyHover(false)}
                      className="relative"
                    >
                      <Link
                        to={`/application/${job._id}`}
                        className="inline-block bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Apply Now
                      </Link>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: applyHover ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 h-1 bg-white rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default JobDetails;
