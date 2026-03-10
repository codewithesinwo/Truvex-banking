import { User } from 'lucide-react';
import { useState, useEffect } from 'react';

const homeLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'About US', href: '/about' },
  { name: 'Help', href: '/help' },
  { name: 'Login', icon: User, href: '/login' },
];  

export default function Header() {
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
            >
              Truvex Bank
            </a>
          </div>

          <div className="flex space-x-5 items-center">
            {homeLinks.map((link) => {
              const Icon=link.icon;

            return(
              <span className='flex gap-2'>
              {Icon&&<Icon/>}
               <a
                key={link.name}
                href={link.href}
                className={`transition font-medium ${
                  activeLink === link.href ?
                    "text-blue-800"
                  : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.name}
              </a>
              </span>
            )
             }
          )}
{/* 
            <div className="flex items-center space-x-1 cursor-pointer border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 transition">
                <User size={20} />
              <h1 className="text-gray-600 hover:text-gray-900 transition cursor-pointer">Login</h1>
            </div> */}

            <div className="bg-blue-900 cursor-pointer border border-gray-300 rounded-md px-3 py-1">
              <h1 className="text-gray-100">Get Started</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
