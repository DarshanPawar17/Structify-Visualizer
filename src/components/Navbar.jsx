import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-20 flex justify-between items-center px-8 sm:px-16 border-none sticky top-0 z-50 
  glass-surface font-sans shadow-ambient">
      {/* Logo */}
      <Link to="/" id="Logo" className="headline-md text-on-surface flex items-center gap-2 cursor-pointer font-extrabold tracking-tighter">
        <div>
          <span className="bi bi-chevron-left text-primary"></span>
          <span className="bi bi-chevron-right text-primary"></span>
        </div>
        Structify
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-12">
        <Link to="/" className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity">
          Features
        </Link>
        <Link to="/data-structures" className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity">
          Data Structures
        </Link>
        <HashLink smooth to="/#ai" className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity">
          Structify AI
        </HashLink>
        <Link to="/about" className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity">
          About
        </Link>
      </div>

      {/* Right Side: Sign In + Documentation */}
      <div id="auth-area" className="hidden md:flex items-center gap-8">
        <Link to="/signin" className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity">
          Sign In
        </Link>
        <Link className="bg-[#5f5e5e] border border-[#5f5e5e] px-7 py-2.5 text-[0.6rem] font-bold tracking-[0.15em] uppercase hover:bg-[#4a4949] transition-colors cursor-pointer" style={{ color: '#fff' }} to="/documentation">
          Documentation
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-on-surface text-2xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <span className="bi bi-x"></span> : <span className="bi bi-list"></span>}
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-20 left-0 w-full glass-surface flex flex-col items-center space-y-6 overflow-hidden transition-all duration-500 ease-in-out md:hidden shadow-ambient ${
          isOpen ? "max-h-96 py-8" : "max-h-0 py-0"
        }`}
      >
        <Link
          to="/"
          className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          Features
        </Link>
        <Link
          to="/data-structures"
          className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          Data Structures
        </Link>
        <HashLink
          smooth
          to="/#ai"
          className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          Structify AI
        </HashLink>
        <Link
          to="/about"
          className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          to="/signin"
          className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          Sign In
        </Link>
        <Link
          to="/documentation"
          className="bg-[#5f5e5e] border border-[#5f5e5e] px-6 py-2.5 text-[0.6rem] font-bold tracking-[0.15em] uppercase w-[80%] text-center"
          style={{ color: '#fff' }}
          onClick={() => setIsOpen(false)}
        >
          Documentation
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;