import React from 'react';
import TruveBankPhoneImg from "/truvphone.png";

export default function Hero() {
  return (
    <div
      className="bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url('/herobackground.png')` }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Modern Digital Banking{" "}
            <span className="text-blue-600">Made Easy</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Manage your finances, pay bills, and transfer money seamlessly with
            Truvex Bank. Secure, fast, and user-friendly banking at your
            fingertips.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-4 w-full sm:w-80 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transform hover:-translate-y-0.5 transition-all shadow-lg">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <img
            src={TruveBankPhoneImg}
            alt="Truvex Mobile App"
            className="max-w-[300px] md:max-w-[450px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}