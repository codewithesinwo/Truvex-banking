import React from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "../data/constants";
import { fadeInVariant, getAvatarColor } from "../utils/helpers";
import { Star } from "lucide-react";

const renderStars = (rating) => (
  <div className="flex gap-1">
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const renderTestimonialCard = (testimonial, idx) => (
  <motion.div
    key={idx}
    {...fadeInVariant}
    transition={{ duration: 0.6, delay: idx * 0.15 }}
    className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-400 shadow-sm hover:shadow-lg transition-all duration-300"
  >
    {renderStars(testimonial.rating)}
    <p className="text-slate-600 leading-relaxed my-4 italic">"{testimonial.text}"</p>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(testimonial.avatar)}`}>
        {testimonial.avatar}
      </div>
      <div>
        <p className="font-semibold text-slate-900">{testimonial.name}</p>
        <p className="text-sm text-slate-500">{testimonial.role}</p>
      </div>
    </div>
  </motion.div>
);

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16" {...fadeInVariant}>
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Customer Love
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Loved by Thousands
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Join our community of satisfied users who trust Truvex Bank with their finances.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(renderTestimonialCard)}
        </div>
      </div>
    </section>
  );
}
