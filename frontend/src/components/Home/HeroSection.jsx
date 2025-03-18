import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
      color: "from-indigo-400 to-indigo-600",
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
      color: "from-pink-400 to-pink-600",
    },
  ];

  // Staggered animation for children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 text-black py-32 font-poppins overflow-hidden">
      <div className="container mx-auto flex flex-col items-center px-4 relative">
        {/* Floating shapes for background design */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="w-64 h-64 rounded-full bg-blue-100 absolute -top-20 -left-20 opacity-50"
            animate={{ 
              y: [0, 30, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="w-96 h-96 rounded-full bg-purple-100 absolute -bottom-40 -right-20 opacity-50"
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="w-40 h-40 rounded-full bg-indigo-100 absolute top-40 right-20 opacity-40"
            animate={{ 
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="text-center relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-2"
          >
            <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold inline-block">Launch Your Career Today</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-2 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Find a job that suits</span>
          </motion.h1>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">your interests and skills</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 mt-6 text-lg max-w-3xl mx-auto"
          >
            Explore thousands of job opportunities from top companies. Whether you're a seasoned professional 
            or a fresh graduate, find the perfect role that matches your career aspirations.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium text-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/job/getall')}
            >
              Find Jobs
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg border-2 border-blue-500 text-blue-600 font-medium text-lg hover:bg-blue-50 transition-all duration-300"
              onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-10 lg:px-36 mt-20 max-w-7xl mx-auto relative z-10"
      >
        {details.map((element) => (
          <motion.div
            key={element.id}
            variants={item}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
            className={`card bg-white rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative`}
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${element.color}`}></div>
            <div className={`icon text-4xl mb-4 bg-gradient-to-r ${element.color} bg-clip-text text-transparent`}>
              {element.icon}
            </div>
            <div className="content text-center">
              <motion.p 
                className="text-2xl font-bold text-gray-800 mb-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {element.title}
              </motion.p>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {element.subTitle}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;
