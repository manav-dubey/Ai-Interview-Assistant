'use client';
import { useState } from 'react';

const NavBar = () => {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4">
   

      {/* Hamburger icon for mobile */}
      <button
        className="lg:hidden text-gray-700"
        onClick={toggleMenu}
      >
        &#9776; {/* Hamburger icon */}
      </button>

      {/* Links for desktop and tablet (hidden on mobile) */}
      <div className="hidden lg:flex space-x-6 items-center">
        <a href="#features" className="group relative text-gray-700 hover:text-teal-600 transition-all">
          Features
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
        </a>
        <a href="#testimonials" className="group relative text-gray-700 hover:text-teal-600 transition-all">
          Stories
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
        </a>
        <a href="#contact" className="group relative text-gray-700 hover:text-teal-600 transition-all">
          Connect
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
        </a>
      </div>

      {/* Mobile menu (toggle visibility on button click) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col justify-center items-center">
          <a href="#features" className="block py-2 px-4 text-gray-700  hover:text-teal-600 transition-all">Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
          </a>
          <a href="#testimonials" className="block py-2 px-4 text-gray-700  hover:text-teal-600 transition-all">Stories
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
          </a>
          <a href="#contact" className="block py-2 px-4 text-gray-700  hover:text-teal-600 transition-all">Connect
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all"></span>
          </a>
        </div>
      )}
    </nav> 
  );
};

export default NavBar;
