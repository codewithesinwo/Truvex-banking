import React, { useState } from "react";
import { motion } from "framer-motion";
import { FAQS } from "../data/constants";
import { fadeInVariant } from "../utils/helpers";
import { ChevronDown } from "lucide-react";

const renderFAQItem = (faq, idx, expandedIdx, setExpandedIdx) => (
  <motion.div
    key={idx}
    {...fadeInVariant}
    transition={{ duration: 0.6, delay: idx * 0.1 }}
    className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 transition-colors"
  >
    <button
      onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
      className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
    >
      <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
      <ChevronDown
        size={24}
        className={`flex-shrink-0 text-blue-600 transition-transform duration-300 ${
          expandedIdx === idx ? "rotate-180" : ""
        }`}
      />
    </button>

    {expandedIdx === idx && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="border-t border-slate-200 bg-slate-50 p-6"
      >
        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
      </motion.div>
    )}
  </motion.div>
);

export default function FAQ() {
  const [expandedIdx, setExpandedIdx] = useState(0);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16" {...fadeInVariant}>
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Got Questions?
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg">
            Find answers to common questions about Truvex Bank.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) =>
            renderFAQItem(faq, idx, expandedIdx, setExpandedIdx)
          )}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="mt-16 p-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 text-center"
          {...fadeInVariant}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-slate-600 mb-6">
            Our support team is available 24/7 to help you.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
