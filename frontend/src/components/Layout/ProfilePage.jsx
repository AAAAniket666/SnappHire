import React, { useEffect, useReducer, useState } from 'react';
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaPhone, FaEnvelope, FaIdCard, FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaLanguage, FaCalendarAlt } from "react-icons/fa";

// Initial state
const initialState = {};

// Reducer function
const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return { ...state, ...action.payload };
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value };
        default:
            return state;
    }
};

const ProfilePage = () => {
    const [userData, dispatch] = useReducer(userReducer, initialState);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("personal");

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const res1 = await axios.get(
                    `http://localhost:4000/api/v1/user/getuser`,
                    { withCredentials: true }
                );
                const user = await res1.data.user;
                console.log("Fetched user data:", user);
                dispatch({ type: 'SET_USER_DATA', payload: user });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, []);

    const updateField = (field, value) => {
        dispatch({ type: 'UPDATE_FIELD', field, value });
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Format date helper function
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 to-blue-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <motion.div 
            className="min-h-screen pt-24 pb-12 px-4 sm:px-6 bg-gradient-to-br from-indigo-50 to-blue-100"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto">
                {/* Profile Header */}
                <motion.div 
                    className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden"
                    variants={itemVariants}
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 h-32 md:h-48 relative">
                        <div className="absolute -bottom-16 left-6 md:left-8">
                            <div className="bg-white p-2 rounded-full shadow-lg">
                                <div className="bg-gray-200 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-4xl md:text-5xl text-gray-600">
                                    {userData.name ? userData.name.charAt(0).toUpperCase() : <FaUser />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-6 md:px-8">
                        <h1 className="text-3xl font-bold text-gray-800">{userData.candidateFullName || userData.name || "Profile"}</h1>
                        <div className="flex flex-wrap mt-2 gap-3">
                            {userData.email && (
                                <div className="flex items-center text-gray-600">
                                    <FaEnvelope className="mr-2 text-indigo-500" />
                                    {userData.email}
                                </div>
                            )}
                            {userData.studentMobileNumber && (
                                <div className="flex items-center text-gray-600 ml-4">
                                    <FaPhone className="mr-2 text-indigo-500" />
                                    {userData.studentMobileNumber}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Tabs */}
                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
                    <div className="flex flex-wrap">
                        <button 
                            onClick={() => setActiveSection("personal")}
                            className={`px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-colors duration-200 flex items-center ${activeSection === "personal" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                        >
                            <FaUser className="mr-2" /> Personal
                        </button>
                        <button 
                            onClick={() => setActiveSection("contact")}
                            className={`px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-colors duration-200 flex items-center ${activeSection === "contact" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                        >
                            <FaEnvelope className="mr-2" /> Contact
                        </button>
                        <button 
                            onClick={() => setActiveSection("identification")}
                            className={`px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-colors duration-200 flex items-center ${activeSection === "identification" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                        >
                            <FaIdCard className="mr-2" /> Identification
                        </button>
                        <button 
                            onClick={() => setActiveSection("education")}
                            className={`px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-colors duration-200 flex items-center ${activeSection === "education" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                        >
                            <FaGraduationCap className="mr-2" /> Education
                        </button>
                        <button 
                            onClick={() => setActiveSection("degree")}
                            className={`px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-colors duration-200 flex items-center ${activeSection === "degree" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                        >
                            <FaBriefcase className="mr-2" /> Current Degree
                        </button>
                    </div>
                </motion.div>

                {/* Content Sections */}
                <motion.div 
                    className="space-y-8"
                    variants={containerVariants}
                    key={activeSection}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Personal Information */}
                    {activeSection === "personal" && (
                        <motion.div 
                            className="bg-white p-6 rounded-xl shadow-md"
                            variants={itemVariants}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FaUser className="mr-3 text-indigo-600" />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                <InfoCard label="Full Name" value={userData.candidateFullName} />
                                <InfoCard label="First Name" value={userData.name} />
                                <InfoCard label="Middle Name" value={userData.middleName} />
                                <InfoCard label="Last Name" value={userData.lastName} />
                                <InfoCard label="Father's Name" value={userData.fathersName} />
                                <InfoCard label="Mother's Name" value={userData.mothersName} />
                                <InfoCard 
                                    label="Date of Birth" 
                                    value={userData.dateOfBirth && formatDate(userData.dateOfBirth)} 
                                    icon={<FaCalendarAlt className="text-indigo-500" />}
                                />
                                <InfoCard label="Gender" value={userData.gender} />
                                <InfoCard label="LGBTQ" value={userData.lgbtq === "Yes" ? "Yes" : "No"} />
                                <InfoCard label="Physically Disabled" value={userData.physicallyDisabled === "Yes" ? "Yes" : "No"} />
                                {userData.physicallyDisabled === "Yes" && (
                                    <InfoCard label="Disability Details" value={userData.physicalDisabilityDetails} />
                                )}
                                <InfoCard 
                                    label="Nationality" 
                                    value={userData.nationality} 
                                    icon={<FaMapMarkerAlt className="text-indigo-500" />}
                                />
                                <InfoCard 
                                    label="Foreign Language" 
                                    value={userData.foreignLanguage} 
                                    icon={<FaLanguage className="text-indigo-500" />}
                                />
                                {userData.foreignLanguage && (
                                    <InfoCard label="Language Proficiency" value={userData.foreignLanguageProficiency} />
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Contact Information */}
                    {activeSection === "contact" && (
                        <motion.div 
                            className="bg-white p-6 rounded-xl shadow-md"
                            variants={itemVariants}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FaEnvelope className="mr-3 text-indigo-600" />
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                <InfoCard 
                                    label="Email" 
                                    value={userData.email} 
                                    icon={<FaEnvelope className="text-indigo-500" />}
                                />
                                <InfoCard 
                                    label="Mobile Number" 
                                    value={userData.studentMobileNumber} 
                                    icon={<FaPhone className="text-indigo-500" />}
                                />
                                <InfoCard 
                                    label="Parent Mobile" 
                                    value={userData.parentMobileNumber} 
                                    icon={<FaPhone className="text-indigo-500" />}
                                />
                                <InfoCard 
                                    label="Current Location" 
                                    value={userData.currentLocation} 
                                    icon={<FaMapMarkerAlt className="text-indigo-500" />}
                                />
                                <InfoCard 
                                    label="Current Address" 
                                    value={userData.currentAddress} 
                                    icon={<FaMapMarkerAlt className="text-indigo-500" />}
                                    fullWidth
                                />
                                <InfoCard 
                                    label="Residential Address" 
                                    value={userData.residentialAddress}
                                    icon={<FaMapMarkerAlt className="text-indigo-500" />}
                                    fullWidth
                                />
                                <InfoCard label="Permanent City" value={userData.permanentResidenceCity} />
                                <InfoCard label="Permanent State" value={userData.permanentResidenceState} />
                            </div>
                        </motion.div>
                    )}

                    {/* Identification Details */}
                    {activeSection === "identification" && (
                        <motion.div 
                            className="bg-white p-6 rounded-xl shadow-md"
                            variants={itemVariants}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FaIdCard className="mr-3 text-indigo-600" />
                                Identification Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InfoCard 
                                    label="PAN Card Number" 
                                    value={userData.panCardNumber} 
                                    icon={<FaIdCard className="text-indigo-500" />}
                                />
                                <InfoCard 
                                    label="Aadhar Card Number" 
                                    value={userData.aadharCardNumber} 
                                    icon={<FaIdCard className="text-indigo-500" />}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Educational Background */}
                    {activeSection === "education" && (
                        <motion.div 
                            className="space-y-6"
                            variants={containerVariants}
                        >
                            {/* 10th Grade */}
                            <motion.div 
                                className="bg-white p-6 rounded-xl shadow-md"
                                variants={itemVariants}
                            >
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <FaGraduationCap className="mr-3 text-indigo-600" />
                                    10th Grade Education
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    <InfoCard label="School Name" value={userData.schoolName} />
                                    <InfoCard label="Board Name" value={userData.boardName} />
                                    <InfoCard label="Year of Passing" value={userData.yearOfPassing10th} />
                                    <InfoCard label="Percentage" value={userData.percentage10th && `${userData.percentage10th}%`} />
                                    <InfoCard label="Year Gap After 10th" value={userData.yearGapAfter10th} />
                                </div>
                            </motion.div>

                            {/* 12th Grade */}
                            <motion.div 
                                className="bg-white p-6 rounded-xl shadow-md"
                                variants={itemVariants}
                            >
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <FaGraduationCap className="mr-3 text-indigo-600" />
                                    12th Grade Education
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    <InfoCard label="School/College Name" value={userData.schoolCollegeName12th} />
                                    <InfoCard label="Board Name" value={userData.boardName12th} />
                                    <InfoCard label="Year of Passing" value={userData.yearOfPassing12th} />
                                    <InfoCard label="Percentage" value={userData.percentage12th && `${userData.percentage12th}%`} />
                                    <InfoCard label="Year Gap After 12th" value={userData.yearGapAfter12th} />
                                </div>
                            </motion.div>

                            {/* Diploma */}
                            <motion.div 
                                className="bg-white p-6 rounded-xl shadow-md"
                                variants={itemVariants}
                            >
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <FaGraduationCap className="mr-3 text-indigo-600" />
                                    Diploma
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    <InfoCard label="School/College Name" value={userData.schoolCollegeNameDiploma} />
                                    <InfoCard label="Board Name" value={userData.boardNameDiploma} />
                                    <InfoCard label="Year of Passing" value={userData.yearOfPassingDiploma} />
                                    <InfoCard label="Graduated State" value={userData.diplomaGraduatedState} />
                                    <InfoCard label="Aggregate Percentage" value={userData.aggregatePercentageDiploma && `${userData.aggregatePercentageDiploma}%`} />
                                    
                                    {[1, 2, 3, 4, 5, 6].map(sem => (
                                        userData[`sem${sem}DiplomaPercentage`] && (
                                            <InfoCard 
                                                key={`diploma-sem-${sem}`}
                                                label={`Sem ${sem} Percentage`} 
                                                value={`${userData[`sem${sem}DiplomaPercentage`]}%`} 
                                            />
                                        )
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Current Pursuing Degree */}
                    {activeSection === "degree" && (
                        <motion.div 
                            className="bg-white p-6 rounded-xl shadow-md"
                            variants={itemVariants}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FaBriefcase className="mr-3 text-indigo-600" />
                                Current Pursuing Degree
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                <InfoCard label="Degree" value={userData.currentPursuingDegree} />
                                <InfoCard label="Year of Admission" value={userData.yearOfAdmission} />
                                <InfoCard label="Aggregate CGPA Till Sem 5" value={userData.aggregateCGPITillSem5} />
                                <InfoCard label="Aggregate Percentage Till Sem 5" value={userData.aggregatePercentageTillSem5 && `${userData.aggregatePercentageTillSem5}%`} />
                                <InfoCard label="Year Drop in UG" value={userData.yearDropInUG} />
                                
                                {[1, 2, 3, 4, 5].map(sem => (
                                    userData[`sem${sem}CGPA`] && (
                                        <div key={`degree-sem-${sem}`} className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-semibold text-gray-800 mb-2">Semester {sem}</h3>
                                            <p className="text-gray-700 mb-1">
                                                <span className="font-medium">CGPA:</span> {userData[`sem${sem}CGPA`]}
                                            </p>
                                            {userData[`sem${sem}PassingDate`] && (
                                                <p className="text-gray-700">
                                                    <span className="font-medium">Passing Date:</span> {formatDate(userData[`sem${sem}PassingDate`])}
                                                </p>
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

// Helper component for displaying info cards
const InfoCard = ({ label, value, icon, fullWidth }) => {
    if (!value) return null;
    
    return (
        <div className={`bg-gray-50 p-4 rounded-lg ${fullWidth ? "col-span-full" : ""}`}>
            <div className="flex items-center mb-2">
                {icon && <span className="mr-2">{icon}</span>}
                <h3 className="font-semibold text-gray-800">{label}</h3>
            </div>
            <p className="text-gray-700">{value}</p>
        </div>
    );
};

export default ProfilePage;