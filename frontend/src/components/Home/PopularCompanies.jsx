import React from "react";
import { FaMicrosoft, FaApple, FaMapMarkerAlt, FaBriefcase, FaArrowRight } from "react-icons/fa";
import { SiTesla, SiAmazon, SiGoogle, SiNetflix, SiFacebook } from "react-icons/si";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Redmond, Washington, USA",
      openPositions: 10,
      icon: <FaMicrosoft />,
      color: "from-blue-500 to-cyan-500",
      route: "/job/getall",
    },
    {
      id: 2,
      title: "Tesla",
      location: "Austin, Texas, USA",
      openPositions: 5,
      icon: <SiTesla />,
      color: "from-red-500 to-rose-600",
      route: "/job/getall",
    },
    {
      id: 3,
      title: "Apple",
      location: "Cupertino, California, USA",
      openPositions: 20,
      icon: <FaApple />,
      color: "from-gray-600 to-gray-800",
      route: "/job/getall",
    },
    {
      id: 4,
      title: "Google",
      location: "Mountain View, California, USA",
      openPositions: 15,
      icon: <SiGoogle />,
      color: "from-green-500 to-emerald-500",
      route: "/job/getall",
    },
    {
      id: 5,
      title: "Amazon",
      location: "Seattle, Washington, USA",
      openPositions: 25,
      icon: <SiAmazon />,
      color: "from-orange-500 to-amber-500",
      route: "/job/getall",
    },
    {
      id: 6,
      title: "Netflix",
      location: "Los Gatos, California, USA",
      openPositions: 8,
      icon: <SiNetflix />,
      color: "from-red-600 to-red-800",
      route: "/job/getall",
    },
  ];

  // Container and item animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <svg 
          className="absolute -top-24 -right-24 text-blue-100 w-96 h-96 opacity-50"
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill="currentColor" 
            d="M47.1,-51.2C59.5,-35.4,67.6,-17.7,68.1,0.5C68.7,18.7,61.7,37.4,49.3,52.3C36.8,67.2,18.4,78.2,1.6,76.6C-15.3,75.1,-30.5,60.9,-39.6,46.4C-48.7,31.8,-51.7,15.9,-52.6,-0.9C-53.6,-17.7,-52.4,-35.4,-43.3,-51.2C-34.1,-67,-17.1,-80.9,0.3,-81.2C17.7,-81.5,34.7,-67,47.1,-51.2Z" 
            transform="translate(100 100)" 
          />
        </svg>
        <svg 
          className="absolute -bottom-20 -left-20 text-purple-100 w-80 h-80 opacity-70"
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill="currentColor" 
            d="M40.5,-62.6C54.5,-49.4,69.3,-39.7,76.2,-25.8C83.1,-11.9,82.1,6.2,75.6,20.9C69.1,35.6,57.1,46.8,43.7,57.3C30.3,67.8,15.1,77.5,-0.1,77.7C-15.4,77.8,-30.7,68.3,-41.6,56.8C-52.4,45.3,-58.8,31.7,-64.9,16.6C-71.1,1.5,-77.1,-15.2,-74.1,-30.7C-71.1,-46.3,-59.1,-60.8,-44.5,-73.6C-29.9,-86.4,-15,-97.5,-0.5,-96.8C14,-96.1,27.9,-83.6,40.5,-62.6Z" 
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
          <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold inline-block mb-3">Industry Leaders</span>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Top Companies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Explore opportunities with leading companies across the globe.
            Start your career journey with organizations that value innovation and growth.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {companies.map((company) => (
            <motion.div 
              key={company.id}
              variants={item}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Link to={company.route} className="block h-full">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                  {/* Top gradient banner */}
                  <div className={`h-12 bg-gradient-to-r ${company.color}`}></div>
                  
                  <div className="p-6">
                    {/* Company info */}
                    <div className="flex items-center mb-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${company.color} p-4 text-white flex items-center justify-center text-2xl -mt-14 border-4 border-white shadow-md`}>
                        {company.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-bold text-xl text-gray-800">{company.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <FaMapMarkerAlt className="mr-1" />
                          <span>{company.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Company stats */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-gray-700">
                        <FaBriefcase className="mr-2 text-indigo-500" />
                        <span className="font-medium">{company.openPositions} Open Positions</span>
                      </div>
                      
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className={`flex items-center text-sm font-medium bg-gradient-to-r ${company.color} bg-clip-text text-transparent`}
                      >
                        <span>View Jobs</span>
                        <FaArrowRight className="ml-1 text-xs" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-14"
        >
          <Link to="/companies">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-xl transition-all duration-300"
            >
              Explore All Companies
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PopularCompanies;
