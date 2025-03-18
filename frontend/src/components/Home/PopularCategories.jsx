import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact, FaArrowRight } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
      color: "from-pink-500 to-rose-500",
      route: "/job/getall",
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
      color: "from-blue-500 to-cyan-500",
      route: "/job/getall",
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
      color: "from-indigo-500 to-purple-500",
      route: "/job/getall",
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact />,
      color: "from-sky-500 to-blue-600",
      route: "/job/getall",
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
      color: "from-emerald-500 to-green-600",
      route: "/job/getall",
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
      color: "from-orange-500 to-amber-500",
      route: "/job/getall",
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
      color: "from-fuchsia-500 to-purple-600",
      route: "/job/getall",
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
      color: "from-red-500 to-rose-600",
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
    <div className="py-20 bg-white relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-20 w-40 h-40 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute right-1/4 top-40 w-40 h-40 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute left-1/3 bottom-20 w-40 h-40 bg-gradient-to-r from-green-100 to-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold inline-block mb-3">Explore Opportunities</span>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Popular Categories</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Discover job opportunities across various industries. 
            Whether you're looking for remote work or office-based roles, find your next career move here.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              variants={item}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Link to={category.route} className="block h-full">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 overflow-hidden relative">
                  {/* Top decorator */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color}`}></div>
                  
                  <div className="flex items-start mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} text-white flex items-center justify-center text-xl`}>
                      {category.icon}
                    </div>
                    <div className="grow ml-4">
                      <h3 className="font-bold text-gray-800">{category.title}</h3>
                      <p className="text-gray-500 text-sm">{category.subTitle}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <motion.div 
                      className="flex items-center justify-end text-sm font-medium"
                      whileHover={{ x: 5 }}
                    >
                      <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                        View Jobs
                      </span>
                      <FaArrowRight className={`ml-2 text-xs bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* "View all categories" button */}
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/job/getall">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 mt-4 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 inline-flex items-center font-medium"
            >
              View All Categories
              <FaArrowRight className="ml-2 text-xs" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PopularCategories;
