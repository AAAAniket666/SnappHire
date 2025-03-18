import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  const toggleMenu = () => {
    setShow(!show);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full ${scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-black/80'} text-white p-4 shadow-lg z-50 ${isAuthorized ? "block" : "hidden"} transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold"
          >
            <span className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-extrabold">SnappHire</span>
          </motion.div>
          <div className="md:hidden">
            {show ? (
              <motion.div
                whileTap={{ scale: 0.9 }}
              >
                <IoMdClose onClick={toggleMenu} className="text-2xl cursor-pointer hover:text-blue-400 transition-colors" />
              </motion.div>
            ) : (
              <motion.div
                whileTap={{ scale: 0.9 }}
              >
                <GiHamburgerMenu onClick={toggleMenu} className="text-2xl cursor-pointer hover:text-blue-400 transition-colors" />
              </motion.div>
            )}
          </div>
        </div>
        <motion.ul 
          className={`flex-col md:flex-row md:flex md:items-center md:justify-end mt-4 md:mt-0 ${show ? "block" : "hidden md:flex"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          <motion.li 
            className="md:ml-6 my-2 md:my-0"
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              to="/" 
              className={`block py-2 md:py-0 relative transition-all duration-300 ease-in-out ${isActive('/') ? 'text-blue-400' : 'hover:text-blue-400'}`} 
              onClick={toggleMenu}
            >
              <span>Home</span>
              {isActive('/') && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.li>
          <motion.li 
            className="md:ml-6 my-2 md:my-0"
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              to="/job/getall" 
              className={`block py-2 md:py-0 relative transition-all duration-300 ease-in-out ${isActive('/job/getall') ? 'text-blue-400' : 'hover:text-blue-400'}`} 
              onClick={toggleMenu}
            >
              <span>All Jobs</span>
              {isActive('/job/getall') && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.li>
          <motion.li 
            className="md:ml-6 my-2 md:my-0"
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              to="/applications/me" 
              className={`block py-2 md:py-0 relative transition-all duration-300 ease-in-out ${isActive('/applications/me') ? 'text-blue-400' : 'hover:text-blue-400'}`} 
              onClick={toggleMenu}
            >
              <span>{user && (user.role === "Employer" ) ? "" : "My Application"}</span>
              {user && user.role !== "Employer" && isActive('/applications/me') && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.li>
          {user && (user.role === "Employer" || user.special === "special") && (
            <>
              <motion.li 
                className="md:ml-6 my-2 md:my-0"
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  to="/job/post" 
                  className={`block py-2 md:py-0 relative transition-all duration-300 ease-in-out ${isActive('/job/post') ? 'text-blue-400' : 'hover:text-blue-400'}`} 
                  onClick={toggleMenu}
                >
                  <span>Post Jobs</span>
                  {isActive('/job/post') && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
              <motion.li 
                className="md:ml-6 my-2 md:my-0"
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  to="/job/me" 
                  className={`block py-2 md:py-0 relative transition-all duration-300 ease-in-out ${isActive('/job/me') ? 'text-blue-400' : 'hover:text-blue-400'}`} 
                  onClick={toggleMenu}
                >
                  <span>Jobs Posted</span>
                  {isActive('/job/me') && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
              <motion.li 
                className="md:ml-6 my-2 md:my-0"
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  to={"/invite/student"} 
                  className={`block py-2 md:py-0 relative transition-all duration-300 ease-in-out ${isActive('/invite/student') ? 'text-blue-400' : 'hover:text-blue-400'}`} 
                  onClick={toggleMenu}
                >
                  <span>Invite Students</span>
                  {isActive('/invite/student') && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
            </>
          )}
          {user && user.role === "Student" && (
            <>
              <motion.li 
                className="md:ml-6 my-2 md:my-0"
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  to="/profile/student" 
                  className={`block py-2 md:py-0 relative transition-all duration-300 ease-in-out ${isActive('/profile/student') ? 'text-blue-400' : 'hover:text-blue-400'}`} 
                  onClick={toggleMenu}
                >
                  <span>Profile</span>
                  {isActive('/profile/student') && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
            </>
          )}
          <motion.li 
            className="md:ml-6 my-2 md:my-0"
            whileHover={{ scale: 1.05 }}
          >
            <motion.button 
              onClick={handleLogout} 
              className="block w-full md:w-auto py-2 md:py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 px-5 text-white rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/30"
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </motion.li>
        </motion.ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;