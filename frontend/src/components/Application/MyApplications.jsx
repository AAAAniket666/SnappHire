import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaFileAlt, 
  FaTrashAlt, 
  FaEye,
  FaBuilding,
  FaBriefcase,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaChevronDown,
  FaCheck,
  FaTimes
} from "react-icons/fa";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
    
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const url = user && user.role === "Employer"
          ? "http://localhost:4000/api/v1/application/employer/getall"
          : "http://localhost:4000/api/v1/application/jobseeker/getall";
        const { data } = await axios.get(url, { withCredentials: true });
        setApplications(data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user, isAuthorized, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setApplications((prev) => prev.filter((application) => application._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const openResumeModal = (resume) => {
    setSelectedResume(resume);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedResume(null);
  };

  // Filter applications by status if student/applicant
  const filteredApplications = selectedStatus === "all" 
    ? applications 
    : applications.filter(app => {
        if (selectedStatus === "pending") return !app.status || app.status === "pending";
        return app.status === selectedStatus;
      });

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
    visible: { opacity: 1, y: 0 }
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

  return (
    <section className="min-h-screen py-12 pt-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            {user && user.role === "Student" ? "My Applications" : "Applications From Job Seekers"}
          </h1>
          
          {user && user.role === "Student" && (
            <div className="w-full md:w-auto">
              <div className="flex bg-white shadow-sm rounded-lg overflow-hidden">
                <button 
                  onClick={() => setSelectedStatus("all")} 
                  className={`px-4 py-2 ${selectedStatus === "all" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"} transition-colors duration-200`}
                >
                  All
                </button>
                <button 
                  onClick={() => setSelectedStatus("pending")} 
                  className={`px-4 py-2 ${selectedStatus === "pending" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"} transition-colors duration-200`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setSelectedStatus("accepted")} 
                  className={`px-4 py-2 ${selectedStatus === "accepted" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"} transition-colors duration-200`}
                >
                  Accepted
                </button>
                <button 
                  onClick={() => setSelectedStatus("rejected")} 
                  className={`px-4 py-2 ${selectedStatus === "rejected" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"} transition-colors duration-200`}
                >
                  Rejected
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {filteredApplications.length === 0 ? (
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md p-8 text-center"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gray-100 rounded-full p-6 mb-4">
                    <FaBriefcase className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">No Applications Found</h3>
                  <p className="text-gray-600 mb-6">
                    {user && user.role === "Student" 
                      ? "You haven't applied to any jobs yet. Start exploring jobs to apply!" 
                      : "You don't have any job applications from candidates yet."
                    }
                  </p>
                  <Link 
                    to="/job/getall" 
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                  >
                    <FaBriefcase className="mr-2" />
                    {user && user.role === "Student" ? "Browse Jobs" : "Post a Job"}
                  </Link>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence>
                <div className="space-y-6">
                  {filteredApplications.map((element) => (
                    <motion.div
                      key={element._id}
                      variants={itemVariants}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {user && user.role === "Student" ? (
                        <JobSeekerCard
                          element={element}
                          deleteApplication={deleteApplication}
                          openResumeModal={openResumeModal}
                          formatDate={formatDate}
                        />
                      ) : (
                        <EmployerCard
                          element={element}
                          openResumeModal={openResumeModal}
                          formatDate={formatDate}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </>
        )}

        {modalOpen && selectedResume && (
          <ResumeModal imageUrl={selectedResume} onClose={closeModal} />
        )}
      </motion.div>
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openResumeModal, formatDate }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-4">
          <div>
            <div className="flex items-center mb-2">
              <FaBriefcase className="text-indigo-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">{element.job?.title || "Job Application"}</h2>
            </div>
            {element.job?.company && (
              <div className="flex items-center text-gray-600 mb-2">
                <FaBuilding className="text-gray-500 mr-2" />
                <span>{element.job.company}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <span>Applied on {formatDate(element.createdAt)}</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(element.status)}`}>
              {element.status ? element.status.charAt(0).toUpperCase() + element.status.slice(1) : "Pending"}
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 mb-4"
        >
          <span className="font-medium text-gray-700">Application Details</span>
          <FaChevronDown className={`text-gray-500 transition-transform duration-300 ${expanded ? 'transform rotate-180' : ''}`} />
        </button>
        
        {expanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 animate-fadeIn">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <FaUser className="text-indigo-500 mr-2" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <p className="text-gray-600 flex items-center">
                  <FaEnvelope className="w-5 h-5 mr-2 text-gray-500" />
                  {element.email}
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaPhone className="w-5 h-5 mr-2 text-gray-500" />
                  {element.phone}
                </p>
                <p className="text-gray-600 flex items-start">
                  <FaMapMarkerAlt className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-gray-500" />
                  <span>{element.address}</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <FaFileAlt className="text-indigo-500 mr-2" />
                Cover Letter
              </h3>
              <p className="text-gray-600 whitespace-pre-line">{element.coverLetter}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center mt-4 space-x-3">
          <a 
            href={element.resume?.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-300"
          >
            <FaEye className="mr-2" />
            View Resume
          </a>
          
          <button
            onClick={() => deleteApplication(element._id)}
            className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-300"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openResumeModal, formatDate }) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(element.status || "pending");

  const updateApplicationStatus = async (newStatus) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/application/update/${element._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setStatus(newStatus);
      toast.success(`Application marked as ${newStatus}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
              <FaUser className="text-indigo-500 mr-2" />
              {element.name}
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600 flex items-center">
                <FaEnvelope className="w-5 h-5 mr-2 text-gray-500" />
                {element.email}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaPhone className="w-5 h-5 mr-2 text-gray-500" />
                {element.phone}
              </p>
              {element.job?.title && (
                <p className="text-gray-600 flex items-center">
                  <FaBriefcase className="w-5 h-5 mr-2 text-gray-500" />
                  Applied for: <span className="font-medium ml-1">{element.job.title}</span>
                </p>
              )}
              <p className="text-gray-600 flex items-center">
                <FaClock className="w-5 h-5 mr-2 text-gray-500" />
                Applied: {formatDate(element.createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className={`mb-3 px-3 py-1 rounded-full text-sm font-medium 
              ${status === "accepted" ? "bg-green-100 text-green-800" : 
                status === "rejected" ? "bg-red-100 text-red-800" : 
                "bg-yellow-100 text-yellow-800"}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => updateApplicationStatus("accepted")}
                className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors duration-200"
              >
                <FaCheck className="mr-1" />
                Accept
              </button>
              <button 
                onClick={() => updateApplicationStatus("rejected")}
                className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors duration-200"
              >
                <FaTimes className="mr-1" />
                Reject
              </button>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 mb-4"
        >
          <span className="font-medium text-gray-700">Application Details</span>
          <FaChevronDown className={`text-gray-500 transition-transform duration-300 ${expanded ? 'transform rotate-180' : ''}`} />
        </button>
        
        {expanded && (
          <div className="space-y-6 mb-4 animate-fadeIn">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <FaMapMarkerAlt className="text-indigo-500 mr-2" />
                Address
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{element.address}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <FaFileAlt className="text-indigo-500 mr-2" />
                Cover Letter
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 whitespace-pre-line">{element.coverLetter}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <a 
            href={element.resume?.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            <FaFileAlt className="mr-2" />
            View Resume
          </a>
        </div>
      </div>
    </div>
  );
};

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full h-5/6 flex flex-col relative">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Resume Preview</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto p-2">
          <iframe
            src={imageUrl}
            title="Resume Preview"
            className="w-full h-full border-0"
          />
        </div>
        <div className="p-4 border-t flex justify-end">
          <a 
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors mr-2"
          >
            Open in New Tab
          </a>
          <button 
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};