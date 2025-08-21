import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-2xl p-10 text-center max-w-xl w-full border border-gray-100"
      >
        {/* 404 Title with subtle glow */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-7xl font-extrabold text-gray-900 drop-shadow-sm"
        >
          404
        </motion.h1>

        {/* Message */}
        <p className="mt-4 text-gray-600 text-lg md:text-xl">
          Page not found. The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-xl text-lg font-medium shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all duration-300"
          >
            Go back home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
