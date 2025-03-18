
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaPaperPlane, FaArrowLeft } from "react-icons/fa";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // Fetch job details to display the job title
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/v1/job/${id}`, {
          withCredentials: true,
        });
        setJobTitle(data.job.title);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();

    // Prefill with user data if available
    if (user) {
      setName(user.firstName ? `${user.firstName} ${user.lastName || ''}` : '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [id, user]);

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      setResumeName(file.name);
    }
  };

  const handleApplication = async (e) => {
    e.preventDefault();
  
    if (!resume) {
      toast.error("Please select a resume file");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      setResumeName("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error(error.response?.data?.message || "An error occurred while submitting the application");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <section className="min-h-screen py-8 pt-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center mb-6 space-x-4">
            <button 
              onClick={() => navigateTo(-1)} 
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            >
              <FaArrowLeft className="mr-2" />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Apply for {jobTitle || "Job"}</h1>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-indigo-600 mb-8"
          >
            <div className="p-8">
              <p className="text-gray-600 mb-6">Please fill out the form below to apply for this position. All fields marked with * are required.</p>
              
              <form onSubmit={handleApplication} className="space-y-6">
                <motion.div variants={itemVariants} className="relative">
                  <div className="flex items-center absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-300"
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className="relative">
                    <div className="flex items-center absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      placeholder="Your Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-300"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <div className="flex items-center absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500">
                      <FaPhone />
                    </div>
                    <input
                      type="tel"
                      placeholder="Your Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-300"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="flex items-center absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500">
                    <FaMapMarkerAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Address *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-300"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="flex items-center absolute left-3 top-5 text-indigo-500">
                    <FaFileAlt />
                  </div>
                  <textarea
                    placeholder="Cover Letter... *"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                    className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-300 min-h-[150px]"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaFileAlt className="mr-2 text-indigo-500" />
                    Upload Resume *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf, .jpg, .png"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      name="resume"
                      required
                    />
                    <div className={`w-full px-4 py-3 border ${resumeName ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'} rounded-lg flex items-center justify-between`}>
                      <span className="text-gray-500 truncate">
                        {resumeName || "Select your resume (PDF, JPG, PNG)"}
                      </span>
                      <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg text-sm">Browse</span>
                    </div>
                  </div>
                  {resumeName && (
                    <p className="mt-2 text-sm text-green-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {resumeName}
                    </p>
                  )}
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-center mt-8">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center justify-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Submit Application
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-indigo-50 rounded-lg p-6 border border-indigo-100"
          >
            <h3 className="text-lg font-medium text-indigo-800 mb-3">Tips for a successful application:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Tailor your cover letter to the specific job requirements</li>
              <li>Ensure your resume is up-to-date and highlights relevant experience</li>
              <li>Provide a professional phone number and email address</li>
              <li>Double-check your application for any errors before submitting</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Application;