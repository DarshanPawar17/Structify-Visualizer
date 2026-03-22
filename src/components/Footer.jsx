import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
  return (
    <>
      {/* Dark Geometric Pre-Footer CTA matching the image texture and typography */}
      <section className='relative w-full py-40 sm:py-56 flex flex-col items-center justify-center overflow-hidden bg-[#0D141E] border-t border-[#EBEBEB]'>
        {/* Subtle Poly Background Image to match the provided dark low-poly texture */}
        <div className="absolute inset-0 w-full h-full opacity-30 select-none pointer-events-none mix-blend-overlay">
           <img 
              src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000" 
              alt="Dark Geometric Background" 
              className="w-full h-full object-cover grayscale opacity-50"
           />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
          <div className="flex flex-col text-[#FAFAFA]" style={{ fontFamily: '"Playfair Display", "Times New Roman", serif', lineHeight: '1.05' }}>
            <span className="text-5xl sm:text-7xl lg:text-[6rem] tracking-tight mb-3">Elevate your</span>
            <span className="text-5xl sm:text-7xl lg:text-[7rem] italic pr-6" style={{ color: '#E4CAA0' }}>Learning</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-16 font-sans w-full sm:w-auto justify-center">
            <Link to="/data-structures" className="w-full sm:w-auto outline-none" tabIndex={-1}>
              <button className="w-full sm:w-auto bg-white text-[#0D141E] text-[0.65rem] font-bold tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#F2F4F4] transition-colors shadow-lg cursor-pointer flex items-center justify-center outline-none border border-transparent">
                Start Visualizing
              </button>
            </Link>
            <Link to="/documentation" className="w-full sm:w-auto outline-none" tabIndex={-1}>
              <button className="w-full sm:w-auto bg-transparent border border-[#3A4556] text-white text-[0.65rem] font-bold tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#1A2535] transition-colors cursor-pointer flex items-center justify-center outline-none">
                Read Documentation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pristine Minimalist White Footer matching the screenshot */}
      <footer className='w-full bg-white pt-24 pb-12 px-8 sm:px-16 lg:px-24 flex flex-col font-sans border-t border-[#EBEBEB]'>
        <div className='flex flex-col lg:flex-row justify-between items-start gap-16 w-full max-w-[1400px] mx-auto'>
          
          {/* Logo Area */}
          <div className='flex flex-col lg:w-1/4'>
            <div className='text-[#2A2D2E] text-2xl flex items-center gap-3 font-bold tracking-tight' style={{ fontFamily: '"Manrope", sans-serif' }}>
              <div className="flex">
                <span className="bi bi-node-plus text-[#2A2D2E] text-xl opacity-90"></span>
              </div>
              Structify
            </div>
          </div>

          {/* Links Grid containing authentic, relevant project routes */}
          <div className='grid grid-cols-2 md:grid-cols-3 gap-12 sm:gap-16 lg:gap-24 lg:w-3/4'>
            
            {/* PLATFORM */}
            <div className='flex flex-col gap-6'>
              <span className="text-[#2A2D2E] text-[0.6rem] font-bold uppercase tracking-[0.3em]">Platform</span>
              <div className="flex flex-col gap-4">
                <Link to="/features" className="text-[#8C8C8C] text-[0.8rem] hover:text-[#2A2D2E] transition-colors">Features</Link>
                <Link to="/data-structures" className="text-[#8C8C8C] text-[0.8rem] hover:text-[#2A2D2E] transition-colors">Data Structures</Link>
                <HashLink smooth to="/#ai" className="text-[#8C8C8C] text-[0.8rem] hover:text-[#2A2D2E] transition-colors">Structify AI</HashLink>
              </div>
            </div>

            {/* RESOURCES */}
            <div className='flex flex-col gap-6'>
              <span className="text-[#2A2D2E] text-[0.6rem] font-bold uppercase tracking-[0.3em]">Resources</span>
              <div className="flex flex-col gap-4">
                <Link to="/documentation" className="text-[#8C8C8C] text-[0.8rem] hover:text-[#2A2D2E] transition-colors">Documentation</Link>
                <a href="https://github.com/DarshanPawar17/Structify-Visualizer" target="_blank" rel="noreferrer" className="text-[#8C8C8C] text-[0.8rem] hover:text-[#2A2D2E] transition-colors">Source Code</a>
              </div>
            </div>

            {/* CREATOR */}
            <div className='flex flex-col gap-6'>
              <span className="text-[#2A2D2E] text-[0.6rem] font-bold uppercase tracking-[0.3em]">Developer</span>
              <div className="flex flex-col gap-4">
                <Link to="/about" className="text-[#8C8C8C] text-[0.8rem] hover:text-[#2A2D2E] transition-colors">About Me</Link>
                <Link to="/contact" className="text-[#8C8C8C] text-[0.8rem] hover:text-[#2A2D2E] transition-colors">Contact</Link>
              </div>
            </div>

          </div>
        </div>
        
        {/* Bottom Bar below the grid columns */}
        <div className="w-full max-w-[1400px] mx-auto border-t border-[#F2F4F4] mt-24 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[#B0B0B0] text-[0.65rem] tracking-[0.15em] uppercase">© 2026 DARSHAN PAWAR. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6 text-[#D1D5DB] text-[0.95rem]">
            <i className="bi bi-twitter-x hover:text-[#2A2D2E] cursor-pointer transition-colors"></i>
            <i className="bi bi-github hover:text-[#2A2D2E] cursor-pointer transition-colors"></i>
            <i className="bi bi-linkedin hover:text-[#2A2D2E] cursor-pointer transition-colors"></i>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
