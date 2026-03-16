import React from "react";
import { motion } from "framer-motion";
import { PRICING_PLANS } from "../data/constants";
import { fadeInVariant } from "../utils/helpers";
import { Check } from "lucide-react";

const renderFeature = (feature) => (
  <li key={feature} className="flex items-center gap-3">
    <Check size={20} className="text-green-500 flex-shrink-0" />
    <span className="text-slate-700">{feature}</span>
  </li>
);

const renderPricingCard = (plan, idx) => (
  <motion.div
    key={idx}
    {...fadeInVariant}
    transition={{ duration: 0.6, delay: idx * 0.15 }}
    className={`relative p-8 rounded-2xl transition-all duration-300 ${
      plan.highlighted
        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl scale-105 border-0"
        : "bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg"
    }`}
  >
    {plan.highlighted && (
      <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 px-4 py-1 rounded-bl-xl rounded-tr-2xl font-semibold text-sm">
        Most Popular
      </div>
    )}

    <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
      {plan.name}
    </h3>
    <p className={`text-sm mb-6 ${plan.highlighted ? "text-blue-100" : "text-slate-600"}`}>
      {plan.description}
    </p>

    <div className="mb-8">
      <span className={`text-4xl font-extrabold ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
        {plan.price}
      </span>
      {plan.price !== "Free" && (
        <span className={plan.highlighted ? "text-blue-100" : "text-slate-600"}>/month</span>
      )}
    </div>

    <button
      className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${
        plan.highlighted
          ? "bg-white text-blue-600 hover:bg-blue-50"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      Get Started
    </button>

    <ul className={`space-y-3 ${plan.highlighted ? "text-blue-50" : ""}`}>
      {plan.features.map(renderFeature)}
    </ul>
  </motion.div>
);

export default function Pricing() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16" {...fadeInVariant}>
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Simple Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Plans for Everyone
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your banking needs. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map(renderPricingCard)}
        </div>
      </div>
    </section>
  );
}
