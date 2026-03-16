import React from "react";
import { motion } from "framer-motion";
import { FOOTER_LINKS } from "../data/constants";
import { fadeInVariant } from "../utils/helpers";
import { Facebook, LinkedIn, Twitter, Instagram } from "lucide-react";

const socialIcons = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: LinkedIn, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
];

const renderSocialLink = ({ icon: Icon, label }) => (
  <a
    key={label}
    href="#"
    className="text-slate-600 hover:text-blue-600 transition-colors"
    aria-label={label}
  >
    <Icon size={24} />
  </a>
);

const renderFooterLink = (link) => (
  <a
    key={link.name}
    href={link.href}
    className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
  >
    {link.name}
  </a>
);

const renderFooterSection = (title, links) => (
  <div key={title}>
    <h4 className="font-semibold text-slate-900 mb-4">{title}</h4>
    <ul className="space-y-2">{links.map(renderFooterLink)}</ul>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <motion.div
          className="mb-12 pb-12 border-b border-slate-700"
          {...fadeInVariant}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Branding & Newsletter */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Truvex Bank</h2>
              <p className="text-slate-400 max-w-xs">
                Modern banking for everyone. Simple, secure, and global.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className="w-full md:w-auto">
              <p className="text-sm font-semibold text-white mb-3">
                Stay Updated
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="px-4 py-2 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          {...fadeInVariant}
          transition={{ delay: 0.1 }}
        >
          {Object.entries(FOOTER_LINKS).map(([title, links]) =>
            renderFooterSection(title, links)
          )}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
          {...fadeInVariant}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-8">
            <p className="text-sm">
              © {currentYear} Truvex Bank. All rights reserved.
            </p>
            <div className="flex gap-6">
              {socialIcons.map(renderSocialLink)}
            </div>
          </div>

          {/* Compliance Badges */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>🔒 256-bit SSL Encrypted</span>
            <span>✓ FDIC Insured</span>
            <span>✓ Regulated</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
