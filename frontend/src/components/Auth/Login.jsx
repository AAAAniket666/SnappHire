import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

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

      <div className="flex flex-col md:flex-row w-full max-w-5xl z-10">
        {/* Left panel - Brand/Marketing content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-12 rounded-l-2xl flex-col justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold mb-6">Welcome Back to SnappHire</h1>
            <p className="text-indigo-100 mb-8">Log in to access your account and continue your seamless job search journey.</p>
            
            <div className="space-y-8 mt-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Find Opportunities</h3>
                  <p className="text-indigo-100 text-sm mt-1">Discover new job postings tailored to your skills and preferences.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Track Applications</h3>
                  <p className="text-indigo-100 text-sm mt-1">Stay updated on the status of your job applications in one place.</p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-auto pt-8 border-t border-indigo-400 border-opacity-30">
            <p className="text-sm text-indigo-100">Don't have an account yet?</p>
            <Link to="/register">
              <motion.button 
                whileHover={{ x: 5 }}
                className="mt-2 flex items-center text-white font-semibold"
              >
                Register now <FaArrowRight className="ml-2" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right panel - Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 bg-white p-10 md:p-12 rounded-2xl md:rounded-l-none rounded-r-2xl shadow-xl"
        >
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
              <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Login As</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaRegUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <select 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)} 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Employer">Teacher</option>
                      <option value="Student">Student</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdOutlineMailOutline className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-200">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiLock2Fill className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>Sign In</>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </form>

            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600">Don't have an account?</p>
                <Link to="/register" className="mt-2 inline-block text-indigo-600 font-medium hover:text-indigo-800 transition duration-200">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
