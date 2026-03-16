import React from "react";
import { motion } from "framer-motion";
import { STATS, VALUES, PARTNERS } from "../data/constants";
import { getIcon, slideInLeftVariant, scaleInVariant, fadeInVariant } from "../utils/helpers";
import { CheckCircle2 } from "lucide-react";

const missionPoints = [
  "Fully regulated and licensed",
  "Transparent low-fee structure",
  "24/7 Priority human support",
];

const renderMissionPoint = (point, index) => (
  <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
    <CheckCircle2 size={20} className="text-green-500" />
    {point}
  </li>
);

const renderStatCard = (stat, idx) => (
  <motion.div
    key={idx}
    {...scaleInVariant}
    transition={{ duration: 0.6, delay: idx * 0.1 }}
    className="group bg-slate-50 p-10 rounded-3xl border border-slate-100 text-center hover:bg-blue-900 transition-colors duration-500 cursor-pointer"
  >
    <p className="text-4xl font-bold text-blue-900 mb-1 group-hover:text-white transition-colors">
      {stat.value}
    </p>
    <p className="text-slate-500 text-sm font-medium group-hover:text-blue-200 transition-colors">
      {stat.label}
    </p>
  </motion.div>
);

const renderValueCard = (value, idx) => (
  <motion.div
    key={idx}
    {...fadeInVariant}
    transition={{ delay: idx * 0.2 }}
    className="p-10 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
  >
    <div className="mb-6 bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl">
      {getIcon(value.icon, 32, "text-blue-600")}
    </div>
    <h4 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h4>
    <p className="text-slate-600 leading-relaxed italic">"{value.description}"</p>
  </motion.div>
);

const renderPartnerLogo = (partner) => (
  <span key={partner} className="text-2xl font-bold text-slate-800 hover:text-blue-600 transition cursor-pointer">
    {partner}
  </span>
);

export default function About() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Partner Logos */}
        <motion.div {...fadeInVariant} className="mb-24 text-center">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-8">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-60 hover:opacity-100 transition-opacity">
            {PARTNERS.map(renderPartnerLogo)}
          </div>
        </motion.div>

        {/* Mission Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <motion.div className="lg:w-1/2" {...slideInLeftVariant}>
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
              Our Mission
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.1]">
              Built for the next generation of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                global finance.
              </span>
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Truvex Bank was founded to strip away the complexity of traditional banking.
              We believe financial freedom should be accessible, transparent, and digital-first.
            </p>
            <ul className="space-y-4">
              {missionPoints.map(renderMissionPoint)}
            </ul>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="lg:w-1/2 grid grid-cols-2 gap-6 w-full"
            {...scaleInVariant}
          >
            {STATS.map(renderStatCard)}
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-10">
          {VALUES.map(renderValueCard)}
        </div>
      </div>
    </section>
  );
}
