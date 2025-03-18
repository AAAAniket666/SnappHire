import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck, FaSearch, FaLock, FaEnvelope, FaPaste, FaUserPlus, FaUsers, FaStar, FaGraduationCap, FaEnvelopeOpenText } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const TeacherInvite = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [input, setInput] = useState("");
    const [passCode, setPassCode] = useState("");
    const [code, setCode] = useState(false);
    const [appCode, setAppCode] = useState("");
    const [special, setSpecial] = useState(false);
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([
        { id: "sdfa", name: "John Doe", email: "john@example.com", status: "Active" },
        { id: "sdfa", name: "Jane Smith", email: "jane@example.com", status: "Pending" },
    ]);

    useEffect(() => {
        const fetchdetail = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:4000/api/v1/user/getstudent`,
                    {
                        withCredentials: true,
                    }
                );
                const res1 = await axios.get(
                    `http://localhost:4000/api/v1/user/getuser`,
                    {
                        withCredentials: true,
                    }
                );
                const u = await res1.data.user;
                if (u.passCode === "") {
                    setCode(true);
                }
                setPassCode(u.passCode);
                const st = await res.data.user;
                setStudents([...st]);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch student data");
            } finally {
                setLoading(false);
            }
        };
        fetchdetail();
    }, []);

    const handleInvite = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handlespecialInvite = () => {
        setSpecial(true);
    };
    
    const handlespecialclose = () => {
        setSpecial(false);
    };

    const validateEmail = async (email) => {
        try {
            const response = await axios.get(`https://emailverification.whoisxmlapi.com/api/v3?apiKey=at_Of0VWsuA65qOxyXJU8fJpkHgWEn4m&emailAddress=${email}`);
            return response.data.smtpCheck === 'true';
        } catch (error) {
            console.error('Error validating email:', error);
            return false;
        }
    };

    const handleSubmitInvite = async (e) => {
        e.preventDefault();
        if (!input.trim()) {
            toast.error("Please enter an email address");
            return;
        }
        
        setLoading(true);
        
        if (!await validateEmail(input)) {
            toast.error("Invalid email address");
            setInput("");
            setLoading(false);
            return;
        }
        
        try {
            const res = await axios.post(
                `http://localhost:4000/api/v1/invites/student`,
                { email: input },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setInput("");
            toast.success("Invite sent successfully");
        } catch (error) {
            toast.error("Invitation failed");
            console.log(error);
        } finally {
            setLoading(false);
            setShowPopup(false);
        }
    };

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            setPassCode(appCode);
            const res = await axios.post(
                `http://localhost:4000/api/v1/user/update-detail`,
                { passCode: appCode },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("App code successfully added");
            setAppCode("");
            setCode(false);
        } catch (error) {
            toast.error("Failed to update app code");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSpeicalSubmitInvite = async (e) => {
        e.preventDefault();
        if (!input.trim()) {
            toast.error("Please enter an email address");
            return;
        }
        
        setLoading(true);
        
        try {
            const res = await axios.post(
                `http://localhost:4000/api/v1/user/updatespecial`,
                { email: input },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setInput("");
            toast.success("Special invite sent successfully");
            setSpecial(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to send special invite");
        } finally {
            setLoading(false);
        }
    };

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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.3
            }
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.div 
            className="min-h-screen pt-24 pb-12 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-100"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-3xl mx-auto">
                <motion.h1 
                    className="text-3xl font-bold text-center mb-8"
                    variants={itemVariants}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                        Student Management
                    </span>
                </motion.h1>

                {!code && (
                    <motion.div variants={itemVariants}>
                        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
                            <div className="flex flex-col sm:flex-row gap-3 justify-between">
                                <motion.button
                                    className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg shadow transition-all duration-300"
                                    onClick={handleInvite}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaUserPlus className="mr-2" />
                                    Invite Student
                                </motion.button>

                                <motion.button
                                    className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg shadow transition-all duration-300"
                                    onClick={handleInvite}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaUsers className="mr-2" />
                                    Bulk Invite
                                </motion.button>

                                <motion.button
                                    className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg shadow transition-all duration-300"
                                    onClick={handlespecialInvite}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaStar className="mr-2" />
                                    Special Invite
                                </motion.button>
                            </div>
                        </div>

                        <motion.div 
                            className="bg-white rounded-xl shadow-md p-6 mb-6"
                            variants={itemVariants}
                        >
                            <div className="flex items-center mb-4">
                                <FaGraduationCap className="text-indigo-600 text-xl mr-2" />
                                <h2 className="text-xl font-bold text-gray-800">All Students</h2>
                            </div>

                            {loading ? (
                                <div className="flex justify-center py-10">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                                </div>
                            ) : students.length > 0 ? (
                                <div className="space-y-3">
                                    {students.map((student, index) => (
                                        <Link to={`/student/${student._id}`} key={student._id}>
                                            <motion.div 
                                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors duration-200"
                                                variants={cardVariants}
                                                whileHover="hover"
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <div className="w-full sm:w-1/3 mb-2 sm:mb-0 font-medium text-gray-800">
                                                    {student.name}
                                                </div>
                                                <div className="w-full sm:w-1/3 mb-2 sm:mb-0 text-gray-600">
                                                    {student.email}
                                                </div>
                                                <div className="w-full sm:w-1/3 flex justify-start sm:justify-end">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${student.status === "Active" || student.status === "" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                                        {student.status === "" ? "Active" : student.status}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    No students found. Invite students to get started.
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}

                <AnimatePresence>
                    {showPopup && (
                        <motion.div 
                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div 
                                className="bg-white p-6 rounded-xl w-full max-w-md"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <div className="flex items-center mb-4">
                                    <FaEnvelopeOpenText className="text-indigo-600 text-xl mr-2" />
                                    <h3 className="text-xl font-bold text-gray-800">
                                        Invite Student
                                    </h3>
                                </div>

                                <form
                                    onSubmit={handleSubmitInvite}
                                    className="flex flex-col"
                                >
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            Student Email
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                                            <input
                                                className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                onChange={(e) => setInput(e.target.value)}
                                                value={input}
                                                type="email"
                                                placeholder="Enter student email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <motion.button
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg shadow transition-all duration-300 flex items-center justify-center"
                                            type="submit"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center">
                                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                                    <span>Sending...</span>
                                                </div>
                                            ) : (
                                                <span>Send Invite</span>
                                            )}
                                        </motion.button>
                                        
                                        <motion.button
                                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow transition-all duration-300"
                                            onClick={handleClosePopup}
                                            type="button"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Cancel
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}

                    {code && (
                        <motion.div 
                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div 
                                className="bg-white p-6 rounded-xl w-full max-w-lg"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <div className="flex items-center mb-4">
                                    <FaLock className="text-indigo-600 text-xl mr-2" />
                                    <h3 className="text-xl font-bold text-gray-800">Add App Code</h3>
                                </div>
                                
                                <form
                                    onSubmit={handleCodeSubmit}
                                    className="flex flex-col mb-6"
                                >
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            Google App Password
                                        </label>
                                        <div className="relative">
                                            <FaLock className="absolute left-3 top-3 text-gray-500" />
                                            <input
                                                className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                onChange={(e) => setAppCode(e.target.value)}
                                                value={appCode}
                                                type="text"
                                                placeholder="Enter App Code"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg shadow transition-all duration-300 flex items-center justify-center"
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                                <span>Submitting...</span>
                                            </div>
                                        ) : (
                                            <span>Submit Code</span>
                                        )}
                                    </motion.button>
                                </form>
                                
                                <div className="bg-indigo-50 p-5 rounded-lg shadow border border-indigo-100 text-gray-800">
                                    <h4 className="font-medium mb-3 text-indigo-700">How to generate an App Password:</h4>
                                    <ul className="space-y-4">
                                        <li className="flex">
                                            <FaCheck className="text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                                            <span>Go to Google on your device and then to manage your Google account.</span>
                                        </li>
                                        <li className="flex">
                                            <FaLock className="text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                                            <span>Make sure you enable two-step verification.</span>
                                        </li>
                                        <li className="flex">
                                            <FaSearch className="text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                                            <span>Go to the search bar at the top and type "App password".</span>
                                        </li>
                                        <li className="flex">
                                            <FaEnvelope className="text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                                            <span>In the app name field, write "email".</span>
                                        </li>
                                        <li className="flex">
                                            <FaPaste className="text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                                            <span>Click on the create button and copy-paste the generated string into the input box above.</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {special && (
                        <motion.div 
                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div 
                                className="bg-white p-6 rounded-xl w-full max-w-md"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <div className="flex items-center mb-4">
                                    <FaStar className="text-indigo-600 text-xl mr-2" />
                                    <h3 className="text-xl font-bold text-gray-800">
                                        Special Invite
                                    </h3>
                                </div>
                                
                                <form
                                    onSubmit={handleSpeicalSubmitInvite}
                                    className="flex flex-col"
                                >
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            Student Email (Special Privileges)
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                                            <input
                                                className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                onChange={(e) => setInput(e.target.value)}
                                                value={input}
                                                type="email"
                                                placeholder="Enter student email for special invite"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <motion.button
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg shadow transition-all duration-300 flex items-center justify-center"
                                            type="submit"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center">
                                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                                    <span>Sending...</span>
                                                </div>
                                            ) : (
                                                <span>Send Special Invite</span>
                                            )}
                                        </motion.button>
                                        
                                        <motion.button
                                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow transition-all duration-300"
                                            onClick={handlespecialclose}
                                            type="button"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Cancel
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default TeacherInvite;
