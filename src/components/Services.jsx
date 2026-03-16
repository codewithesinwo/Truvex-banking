import React from "react";
import { motion } from "framer-motion";
import { SERVICES } from "../data/constants";
import { getIcon, fadeInVariant } from "../utils/helpers";

const renderServiceCard = (service, idx) => (
  <motion.div
    key={idx}
    {...fadeInVariant}
    transition={{ duration: 0.6, delay: idx * 0.1 }}
    className="group relative overflow-hidden bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="mb-6 bg-blue-100 w-14 h-14 flex items-center justify-center rounded-xl group-hover:bg-blue-600 transition-colors">
        {getIcon(service.icon, 28, "text-blue-600 group-hover:text-white transition-colors")}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
      <p className="text-slate-600 leading-relaxed">{service.description}</p>
    </div>
  </motion.div>
);

export default function Services() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16" {...fadeInVariant}>
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Banking Services for Every Need
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From everyday banking to advanced investment tools, we provide comprehensive financial services tailored to your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map(renderServiceCard)}
        </div>
      </div>
    </section>
  );
}
