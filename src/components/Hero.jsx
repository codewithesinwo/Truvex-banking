import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, CreditCard, Send } from "lucide-react";
import TruveBankPhoneImg from "/truvphone.png";

export default function Hero() {
  return (
    <section
      id="features"
      className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-24 overflow-hidden"
    >
      {/* Background blur accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        {/* LEFT CONTENT */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <ShieldCheck size={16} />
            Trusted Digital Banking Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Banking That Works <span className="text-blue-600">For You</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Send money, manage your finances, and track spending effortlessly
            with Truvex Bank. Built for speed, security, and simplicity.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="inline-block bg-blue-900 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-800 transition"
              >
                Get Started
              </Link>
            </motion.div>

            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
            >
              Learn More
            </a>
          </div>

          {/* Trust Features */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-600" />
              Bank-level Security
            </div>
            <div className="flex items-center gap-2">
              <Send size={18} className="text-blue-600" />
              Instant Transfers
            </div>
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-blue-600" />
              Smart Cards
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src={TruveBankPhoneImg}
            alt="Truvex Mobile App"
            className="max-w-[500px] md:max-w-[900px] object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
