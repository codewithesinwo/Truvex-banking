import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/constants';
import { getIcon } from '../utils/helpers';

const renderLogo = () => (
  <a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
    Truvex Bank
  </a>
);

const renderNavLink = (link, activeLink) => (
  <a
    key={link.name}
    href={link.href}
    className={`flex items-center gap-2 transition font-medium ${
      activeLink === link.href
        ? 'text-blue-800'
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {link.icon && getIcon(link.icon, 18)}
    <span>{link.name}</span>
  </a>
);

const renderCTAButton = () => (
  <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition transform hover:scale-105">
    Get Started
  </button>
);

export default function Header() {
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {renderLogo()}
          <div className="flex space-x-8 items-center">
            {NAV_LINKS.map((link) => renderNavLink(link, activeLink))}
            {renderCTAButton()}
          </div>
        </div>
      </div>
    </header>
  );
}
