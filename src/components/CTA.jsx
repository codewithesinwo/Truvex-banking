import React from "react";
import { motion } from "framer-motion";
import { fadeInVariant } from "../utils/helpers";
import { ArrowRight } from "lucide-react";

const renderBeforeArrow = () => (
  <span className="inline-block text-lg font-bold text-slate-900">$0</span>
);

const renderAfterArrow = () => (
  <span className="inline-block text-lg font-bold text-green-600">Free</span>
);

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div {...fadeInVariant}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Transform Your Banking?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who've already switched to smarter banking.
            No deposit required. Start using Truvex Bank in just 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl flex items-center gap-2"
            >
              Open Account Now
              <ArrowRight size={20} />
            </motion.button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-900 transition-all">
              Learn More
            </button>
          </div>

          <p className="text-blue-100 text-sm">
            🎉 New users get free premium for 3 months!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
