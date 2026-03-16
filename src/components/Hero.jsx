import React from 'react';
import { motion } from 'framer-motion';
import TruveBankPhoneImg from "/truvphone.png";

const renderEmailSignup = () => (
  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
    <input
      type="email"
      placeholder="Enter your email"
      className="px-5 py-4 w-full sm:w-80 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-blue-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-lg"
    >
      Get Started
    </motion.button>
  </div>
);

const renderPhoneImage = () => (
  <motion.div
    className="flex-1 flex justify-center lg:justify-end"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  >
    <img
      src={TruveBankPhoneImg}
      alt="Truvex Mobile App"
      className="max-w-[300px] md:max-w-[450px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
    />
  </motion.div>
);

export default function Hero() {
  return (
    <div
      className="bg-cover bg-center py-20 flex items-center"
      style={{ backgroundImage: `url('/herobackground.png')` }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Modern Digital Banking{" "}
            <span className="text-blue-600">Made Easy</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Manage your finances, pay bills, and transfer money seamlessly with
            Truvex Bank. Secure, fast, and user-friendly banking at your fingertips.
          </p>
          {renderEmailSignup()}
        </motion.div>

        {/* Right Image */}
        {renderPhoneImage()}
      </div>
    </div>
  );
}