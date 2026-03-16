import React from "react";
import { motion } from "framer-motion";
import { FEATURES, TRUST_LOGOS } from "../data/constants";
import { getIcon, fadeInVariant } from "../utils/helpers";

const renderTrustLogos = () => (
  <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale">
    {TRUST_LOGOS.map((logo, idx) => (
      <span key={idx} className="font-bold text-sm tracking-widest">
        {logo}
      </span>
    ))}
  </div>
);

const renderFeatureCard = (feature, index) => (
  <motion.div
    key={index}
    {...fadeInVariant}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="flex gap-5 bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:-translate-y-1"
  >
    <div className={`${feature.bgColor} p-4 h-fit rounded-full flex items-center justify-center shrink-0`}>
      {getIcon(feature.icon, 24, "text-blue-600")}
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
    </div>
  </motion.div>
);

const FeaturesSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-white via-blue-50 to-blue-100 flex flex-col items-center">
      {/* Trust Header */}
      <motion.div className="text-center mb-16" {...fadeInVariant}>
        <p className="text-slate-600 font-medium mb-8 text-lg">
          Trusted by over 1,000,000 users!
        </p>
        {renderTrustLogos()}
      </motion.div>

      {/* Cards Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => renderFeatureCard(feature, index))}
      </div>
    </section>
  );
};

export default FeaturesSection;
