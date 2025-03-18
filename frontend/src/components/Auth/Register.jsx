import React, { useContext, useState } from "react";
import { MdOutlineMailOutline, MdPersonOutline, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaRegUser, FaPhone, FaArrowRight } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { motion } from "framer-motion";

const Register = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fathersName: "",
        mothersName: "",
        middleName: "",
        lastName: "",
        candidateFullName: "",
        branch: "",
        classRollNumber: "",
        prnNumber: "",
        studentMobileNumber: "",
        parentMobileNumber: "",
        panCardNumber: "",
        aadharCardNumber: "",
        residentialAddress: "",
        currentLocation: "",
        currentAddress: "",
        permanentResidenceCity: "",
        permanentResidenceState: "",
        dateOfBirth: "",
        gender: "",
        lgbtq: "",
        physicallyDisabled: "",
        physicalDisabilityDetails: "",
        nationality: "",
        foreignLanguage: "",
        foreignLanguageProficiency: "",
        schoolName: "",
        boardName: "",
        yearOfPassing10th: "",
        percentage10th: "",
        yearGapAfter10th: "",
        schoolCollegeName12th: "",
        boardName12th: "",
        yearOfPassing12th: "",
        percentage12th: "",
        yearGapAfter12th: "",
        schoolCollegeNameDiploma: "",
        boardNameDiploma: "",
        yearOfPassingDiploma: "",
        diplomaGraduatedState: "",
        sem1DiplomaPercentage: "",
        sem2DiplomaPercentage: "",
        sem3DiplomaPercentage: "",
        sem4DiplomaPercentage: "",
        sem5DiplomaPercentage: "",
        sem6DiplomaPercentage: "",
        aggregatePercentageDiploma: "",
        yearGapAfterDiploma: "",
        currentPursuingDegree: "",
        yearOfAdmission: "",
        sem1CGPA: "",
        sem1PassingDate: "",
        sem2CGPA: "",
        sem2PassingDate: "",
        sem3CGPA: "",
        sem3PassingDate: "",
        sem4CGPA: "",
        sem4PassingDate: "",
        sem5CGPA: "",
        sem5PassingDate: "",
        aggregateCGPITillSem5: "",
        aggregatePercentageTillSem5: "",
        yearDropInUG: "",
        deadKT: "",
        totalDeadKT: "",
        liveKT: "",
        totalLiveKT: "",
        totalInternalKT: "",
        totalExternalKT: "",
        yearOfEducationGap: "",
        additionalQualification: "",
        technologiesKnown: "",
        workExperienceMonths: "",
        internshipCompany: "",
        internshipRole: "",
        postGraduationCGPA: "",
        workExperienceYears: "",
        special: ""
    });

    const { isAuthorized, setIsAuthorized } = useContext(Context);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {data} = await axios.post(
                "http://localhost:4000/api/v1/user/register",
                {name, email, phone, password, role, ...formData},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setFormData({});
            setIsAuthorized(true);
        } catch (error) {
          const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
          toast.error(errorMessage);
        } finally {
          setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (isAuthorized) {
        return <Navigate to={"/"} />;
    }

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const renderStepIndicator = () => {
        return (
            <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                    <motion.div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => step > 1 && setStep(1)}
                    >
                        1
                    </motion.div>
                    <div className={`w-16 h-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    <motion.div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => step > 2 && setStep(2)}
                    >
                        2
                    </motion.div>
                    <div className={`w-16 h-1 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    <motion.div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => step > 3 && setStep(3)}
                    >
                        3
                    </motion.div>
                </div>
            </div>
        );
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <svg 
                    className="absolute top-0 right-0 text-blue-100 w-96 h-96 opacity-70 transform translate-x-1/3 -translate-y-1/4"
                    viewBox="0 0 200 200" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        fill="currentColor" 
                        d="M45.3,-53.9C58.4,-46.3,68.9,-31.9,72.1,-15.8C75.3,0.4,71.3,18.2,62.5,31.1C53.8,44,40.2,51.9,25.6,57.5C11,63.2,-4.6,66.5,-20.4,63.2C-36.2,60,-52.3,50.1,-62,35.2C-71.7,20.2,-75.1,0.1,-69.8,-16.1C-64.6,-32.3,-50.6,-44.6,-36.1,-52.4C-21.6,-60.1,-6.5,-63.2,8.9,-63.5C24.3,-63.7,32.1,-61.5,45.3,-53.9Z" 
                        transform="translate(100 100)" 
                    />
                </svg>
                <svg 
                    className="absolute -bottom-20 -left-20 text-indigo-100 w-80 h-80 opacity-70"
                    viewBox="0 0 200 200" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        fill="currentColor" 
                        d="M38.9,-64.5C51.1,-58.4,62.3,-49.3,69.5,-37.1C76.7,-24.9,80,-9.5,78.9,5.6C77.8,20.8,72.4,35.7,63.2,48.5C54,61.2,41,71.8,25.5,78.5C10,85.3,-8.1,88.2,-23.7,83.9C-39.3,79.5,-52.4,68,-65.3,54.4C-78.2,40.8,-90.8,25.2,-93.7,7.7C-96.6,-9.9,-89.7,-29.4,-77.4,-42.7C-65.1,-56,-47.3,-63,-31.3,-68.5C-15.2,-74.1,-0.8,-78.2,11.8,-75.7C24.4,-73.2,26.7,-70.7,38.9,-64.5Z" 
                        transform="translate(100 100)" 
                    />
                </svg>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl z-10"
            >
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        {step === 1 ? "Create Your Account" : 
                         step === 2 ? "Personal Information" : 
                         "Education Details"}
                    </h2>
                    <p className="text-gray-600 mt-2">
                        {step === 1 ? "Get started with your job search journey" : 
                         step === 2 ? "Help us know you better" : 
                         "Share your educational background"}
                    </p>
                </div>

                {renderStepIndicator()}

                <form onSubmit={step === 3 ? handleRegister : (e) => e.preventDefault()}>
                    {step === 1 && (
                        <motion.div 
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            className="space-y-5"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdOutlineMailOutline className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdPersonOutline className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaPhone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <RiLock2Fill className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaRegUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        name="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="Student">Student</option>
                                        {/* Add more role options as needed */}
                                    </select>
                                </div>
                            </div>

                            <motion.button
                                type="button"
                                onClick={() => setStep(2)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center"
                            >
                                Continue <MdNavigateNext className="ml-2 text-xl" />
                            </motion.button>
                            
                            <div className="text-center mt-6 pt-6 border-t border-gray-200">
                                <p className="text-gray-600">Already have an account?</p>
                                <Link to="/login" className="mt-2 inline-block text-indigo-600 font-medium hover:text-indigo-800 transition duration-200 flex items-center justify-center">
                                    Sign in <FaArrowRight className="ml-2 text-xs" />
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name</label>
                                <input
                                    type="text"
                                    name="fathersName"
                                    placeholder="Enter father's name"
                                    value={formData.fathersName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mother's Name</label>
                                <input
                                    type="text"
                                    name="mothersName"
                                    placeholder="Enter mother's name"
                                    value={formData.mothersName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                                <input
                                    type="text"
                                    name="middleName"
                                    placeholder="Enter middle name"
                                    value={formData.middleName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="flex space-x-4 col-span-full mt-6">
                                <motion.button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg transition duration-300 flex items-center justify-center"
                                >
                                    <MdNavigateBefore className="mr-2 text-xl" /> Back
                                </motion.button>
                                
                                <motion.button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center"
                                >
                                    Continue <MdNavigateNext className="ml-2 text-xl" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div 
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Pursuing Degree</label>
                                <input
                                    type="text"
                                    name="currentPursuingDegree"
                                    placeholder="e.g., B.Tech, BCA"
                                    value={formData.currentPursuingDegree}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                                <input
                                    type="text"
                                    name="branch"
                                    placeholder="e.g., Computer Science"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Class Roll Number</label>
                                <input
                                    type="text"
                                    name="classRollNumber"
                                    placeholder="Your roll number"
                                    value={formData.classRollNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Admission</label>
                                <input
                                    type="text"
                                    name="yearOfAdmission"
                                    placeholder="e.g., 2020"
                                    value={formData.yearOfAdmission}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Known</label>
                                <input
                                    type="text"
                                    name="technologiesKnown"
                                    placeholder="e.g., Java, Python, React"
                                    value={formData.technologiesKnown}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience (Months)</label>
                                <input
                                    type="number"
                                    name="workExperienceMonths"
                                    placeholder="e.g., 6"
                                    value={formData.workExperienceMonths}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                                />
                            </div>

                            <div className="flex space-x-4 col-span-full mt-6">
                                <motion.button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg transition duration-300 flex items-center justify-center"
                                >
                                    <MdNavigateBefore className="mr-2 text-xl" /> Back
                                </motion.button>
                                
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : "Complete Registration"}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </form>
            </motion.div>
        </section>
    );
};

export default Register;
