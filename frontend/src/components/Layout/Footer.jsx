import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { motion } from "framer-motion";

const footerLinks = [
  {
    id: "01",
    title: "Company",
    links: ["Home", "About Us", "Services", "Our Team"],
  },
  {
    id: "02",
    title: "Policy",
    links: ["Policies", "Contact", "FAQ"],
  },
  {
    id: "03",
    title: "Support",
    links: ["Account", "Support Center", "Feedback", "Accessibility"],
  },
];

const socialLinks = [
  {
    id: 1,
    icon: <FaFacebookF />,
    url: "#",
    color: "hover:bg-blue-600",
  },
  {
    id: 2,
    icon: <FaTwitter />,
    url: "#",
    color: "hover:bg-blue-400",
  },
  {
    id: 3,
    icon: <FaLinkedinIn />,
    url: "#",
    color: "hover:bg-blue-700",
  },
  {
    id: 4,
    icon: <FiInstagram />,
    url: "#",
    color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
  },
  {
    id: 5,
    icon: <FaGithub />,
    url: "#",
    color: "hover:bg-gray-800",
  },
];

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className="text-white mt-20">
      <div className="overflow-x-hidden -mb-0.5">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fill: "url(#gradient)",
            width: "125%",
            height: 112,
            transform: "rotate(180deg)",
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" />
        </svg>
      </div>

      <div className="bg-gradient-to-b from-gray-900 to-black">
        <div className="container px-5 py-20 mx-auto">
          <div className="mb-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              SnappHire
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-gray-400 max-w-lg mx-auto"
            >
              Connecting talented students with their dream jobs. 
              Your pathway to a successful career starts here.
            </motion.p>
            
            <motion.div 
              className="flex justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {socialLinks.map((socialLink) => (
                <motion.a
                  key={socialLink.id}
                  href={socialLink.url}
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-300 ${socialLink.color} hover:shadow-lg transform hover:-translate-y-1`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialLink.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div className="w-full flex flex-wrap gap-10 justify-center -mb-10 -px-4">
            {footerLinks.map(({ id, title, links }, index) => (
              <motion.div 
                className="w-auto px-4" 
                key={id + title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <h2 className="font-medium text-white tracking-wider text-lg mb-3 border-b border-blue-500 pb-2 inline-block">
                  {title}
                </h2>
                <div className="mb-10 flex flex-col gap-3">
                  {links.map((link, i) => (
                    <Link
                      key={link + i}
                      to="/"
                      className="text-gray-400 text-base transition-all duration-300 hover:text-blue-400 transform hover:translate-x-1 flex items-center"
                    >
                      <span className="bg-blue-500 h-1 w-1 rounded-full mr-2 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                      {link}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="container mx-auto py-6 px-5 flex flex-wrap flex-col sm:flex-row">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-base text-center sm:text-left"
            >
              &copy; {new Date().getFullYear()} SnappHire —
              <a
                href="#"
                className="text-blue-400 ml-1 transition-colors duration-300 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                @SixLadders
              </a>
            </motion.p>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-400 text-base"
            >
              Designed with ❤️ by SixLadders
            </motion.span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
