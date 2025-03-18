import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-5xl mb-4" />,
      title: "Create Account",
      description: "Sign up by creating a user account on the portal. Provide your basic details to get started.",
      color: "from-blue-400 to-blue-600",
      delay: 0,
    },
    {
      id: 2,
      icon: <MdFindInPage className="text-5xl mb-4" />,
      title: "Find a Job/Post a Job",
      description: "Browse available job listings or post new job openings. Tailor your search or job postings to match your specific needs.",
      color: "from-indigo-400 to-indigo-600",
      delay: 0.2,
    },
    {
      id: 3,
      icon: <IoMdSend className="text-5xl mb-4" />,
      title: "Apply For Jobs/Recruit Suitable Candidates",
      description: "Apply for jobs or recruit suitable candidates by submitting applications or job proposals through the portal.",
      color: "from-purple-400 to-purple-600",
      delay: 0.4,
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg 
          className="absolute -bottom-10 -right-10 text-blue-100 w-72 h-72 opacity-70"
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
          className="absolute -top-20 -left-20 text-indigo-100 w-80 h-80 opacity-70"
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold inline-block mb-3">Simple Process</span>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">How SnappHire Works</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 relative">
          {/* Connecting lines between cards */}
          <div className="hidden md:block absolute top-1/3 left-[calc(33%-30px)] w-[calc(33%+60px)] h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          <div className="hidden md:block absolute top-1/3 right-[calc(33%-30px)] w-[calc(33%+60px)] h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.delay }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 }
              }}
              className="flex-1 relative z-10"
            >
              <div className="bg-white rounded-xl p-8 h-full flex flex-col items-center text-center shadow-lg border border-gray-100 overflow-hidden relative">
                {/* Step number */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center opacity-20">
                  <span className="text-4xl font-bold">{step.id}</span>
                </div>
                
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color}`}></div>
                
                {/* Icon with gradient */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r ${step.color} text-white`}>
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                
                <p className="text-gray-600">
                  {step.description}
                </p>
                
                {/* Number indicator */}
                <div className="mt-6 flex items-center justify-center">
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${step.color} text-white font-semibold`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {step.id}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-14"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-xl transition-all duration-300"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
