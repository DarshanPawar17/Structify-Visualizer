import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);
  const { user, logout, updatePhoto } = useAuth();

  const avatars = [
    { name: "Pikachu", path: "/avatars/pikachu.png" },
    { name: "Charmander", path: "/avatars/charmander.png" },
    { name: "Squirtle", path: "/avatars/squirtle.png" },
    { name: "Eevee", path: "/avatars/eevee.png" },
    { name: "Gengar", path: "/avatars/gengar.png" },
  ];

  const handleAvatarSelect = async (path) => {
    try {
      await updatePhoto(path);
      setShowAvatars(false);
    } catch (err) {
      console.error("Failed to update avatar:", err);
    }
  };

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
      <div id="auth-area" className="hidden md:flex items-center gap-8 relative">
        {!user ? (
          <Link to="/signin" className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity">
            Sign In
          </Link>
        ) : (
          <div className="flex items-center gap-4 relative">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAvatars(!showAvatars)}
                className="relative group transition-transform active:scale-95"
              >
                <img 
                  src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.uid} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-primary/20 hover:border-primary transition-all cursor-pointer shadow-md group-hover:shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bi bi-pencil-fill"></span>
                </div>
              </button>
              
              <div className="flex flex-col">
                <span className="label-sm text-on-surface font-bold truncate max-w-[100px]">
                  {user.displayName || user.email.split('@')[0]}
                </span>
                <button 
                  onClick={logout}
                  className="label-sm text-primary text-[10px] uppercase tracking-wider font-bold hover:underline opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-left"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Avatar Selector Dropdown */}
            {showAvatars && (
              <div className="absolute top-14 right-0 w-64 glass-surface rounded-2xl p-4 shadow-2xl animate-blur-reveal border border-primary/10 z-[60]">
                <div className="flex justify-between items-center mb-4 border-b border-primary/5 pb-2">
                  <span className="label-sm text-on-surface opacity-80">Choose Avatar</span>
                  <button onClick={() => setShowAvatars(false)} className="text-on-surface hover:text-primary transition-colors">
                    <span className="bi bi-x-lg"></span>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar.name}
                      onClick={() => handleAvatarSelect(avatar.path)}
                      className="relative rounded-xl overflow-hidden aspect-square border-2 border-transparent hover:border-primary transition-all active:scale-90 group p-1"
                    >
                      <img src={avatar.path} alt={avatar.name} className="w-full h-full object-contain" />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bi bi-check-lg text-white"></span>
                      </div>
                    </button>
                  ))}
                  <button 
                    onClick={() => handleAvatarSelect(null)}
                    className="flex flex-col items-center justify-center bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer group p-1"
                  >
                    <span className="bi bi-trash text-gray-400 group-hover:text-red-500 transition-colors"></span>
                    <span className="text-[8px] text-gray-400">Clear</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
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
        
        {!user ? (
          <Link
            to="/signin"
            className="label-sm text-on-surface opacity-60 hover:opacity-100 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        ) : (
          <button
            onClick={() => { logout(); setIsOpen(false); }}
            className="label-sm text-primary opacity-60 hover:opacity-100 transition-opacity"
          >
            Sign Out
          </button>
        )}

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