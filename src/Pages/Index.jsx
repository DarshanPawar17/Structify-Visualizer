import React from 'react'
import Navbar from '../components/Navbar'
import PillButton from '../components/ui/PillButton'
import StepCard from '../components/ui/StepCard'
import FeatureBox from '../components/ui/FeatureBox'
import Footer from '../components/Footer'
import DataStructureCard from '../components/ui/DataStructureCard'
import ChatCard from '../components/ChatCard'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

const Index = () => {
  // Inject the Google Fonts for both Hero (Playfair) and the Quote (Cormorant Garamond)
  React.useEffect(() => {
    if (!document.getElementById('classic-fonts')) {
      const link = document.createElement('link');
      link.id = 'classic-fonts';
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Playfair+Display:ital,wght@0,400;1,400&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="w-full bg-surface text-on-surface overflow-x-hidden font-sans">
      <Navbar />
      <div className='w-full grid grid-cols-1 xl:grid-cols-12 lg:min-h-[85vh] bg-surface relative' id='first-page'>
        {/* Left 6 columns: Editorial Typographic Hero */}
        <div className="xl:col-span-6 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 lg:py-0 z-10 w-full relative bg-surface lg:h-[85vh]">
          <div className="mb-6 mt-16 lg:mt-0">
            <span className="text-[0.6rem] font-bold text-tertiary tracking-[0.25em] uppercase" style={{ color: '#886d52' }}>Precision Through Absence</span>
          </div>
          {/* Using Playfair for that exact premium editorial Serif image look */}
          <div className="flex flex-col mb-8 text-[#2A2D2E]" style={{ fontFamily: '"Playfair Display", "Didot", "Times New Roman", serif' }}>
            <span className="font-normal text-5xl sm:text-7xl lg:text-[6rem] xl:text-[7rem] leading-[0.95] tracking-tight">Visualize</span>
            <span className="font-normal text-5xl sm:text-7xl lg:text-[6rem] xl:text-[7rem] leading-[0.95] tracking-tight">Data</span>
            <span className="font-light italic text-5xl sm:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] leading-[0.95] tracking-tight pr-4 text-[#3C3F40]">Structures</span>
          </div>
          <p className="body-md text-on-surface max-w-[420px] mb-10 opacity-70 leading-relaxed font-sans text-[0.95rem]">
            Visualize, understand, and master fundamental data structures with interactive animations, real code examples, and AI-powered assistance.
          </p>
          <div className='flex flex-col sm:flex-row gap-6 items-start sm:items-center font-sans'>
            <Link to="/data-structures">
              <button className="bg-[#5f5e5e] text-white text-[0.6875rem] font-bold tracking-[0.15em] uppercase px-10 py-5 hover:bg-[#4a4949] transition-colors border-none cursor-pointer">
                Start Visualizing
              </button>
            </Link>
            <Link to="/documentation">
              <button className="bg-transparent border border-[#ebeeef] text-[#5f5e5e] text-[0.6875rem] font-bold tracking-[0.15em] uppercase px-10 py-5 hover:bg-[#f2f4f4] transition-colors cursor-pointer">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Right 6 columns: Bleeding Image */}
        <div className="xl:col-span-6 relative h-[400px] xl:h-auto min-h-[400px] border-l border-outline-variant">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=100" 
            alt="Programming and Code" 
            className="absolute inset-0 w-full h-full object-cover object-center bg-surface-container-low"
          />
        </div>
      </div>
      {/* The Asymmetrical Monolith Methodology Section */}
      <section id="why-visualizing" className='bg-surface py-24 px-8 sm:px-16 lg:px-24 flex flex-col w-full relative border-t border-[#EBEBEB] mt-16'>
        <div className='w-full max-w-[1400px] mx-auto relative'>
          
          <div className="flex justify-between items-start mb-16 relative">
             <div className="max-w-2xl z-10">
               <h2 className="text-[#2A2D2E] text-4xl sm:text-5xl lg:text-[3.5rem] tracking-tight mb-8" style={{ fontFamily: '"Playfair Display", "Times New Roman", serif', lineHeight: '1.2' }}>
                 Why Visualization Works
               </h2>
               <p className="text-[#717171] leading-relaxed text-[0.95rem] font-sans">
                 Transform abstract concepts into clear, interactive experiences that make learning<br className="hidden md:block"/>
                 data structures intuitive and engaging.
               </p>
             </div>
             {/* Giant Faint Number Decorator */}
             <div className="hidden lg:block absolute right-8 top-0 select-none pointer-events-none">
               <span className="text-[12rem] leading-[0.75]" style={{ fontFamily: '"Playfair Display", serif', color: '#F7F7F7' }}>01</span>
             </div>
          </div>

          {/* Precision 3-Column Border Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 border border-[#EBEBEB]">
            
            {/* Column 1: See It -> /features */}
            <Link to="/features" className="p-10 lg:p-14 flex flex-col gap-6 lg:border-r border-[#EBEBEB] bg-white group hover:bg-[#FDFDFD] transition-colors cursor-pointer outline-none premium-hover">
              <div>
                <i className="bi bi-eye text-[#2A2D2E] text-2xl mb-8 block opacity-80"></i>
                <h3 className="text-[#2A2D2E] text-[1.75rem] mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>See It</h3>
                <p className="text-[#717171] text-[0.9rem] leading-relaxed mb-16">
                  Visual animations make complex algorithms crystal clear. Watch how data moves and transforms in real-time.
                </p>
              </div>
              <div className="mt-auto flex items-center text-[#5f5e5e] text-[0.65rem] font-bold tracking-[0.2em] uppercase group-hover:text-[#2A2D2E] transition-colors">
                Learn More <i className="bi bi-record-circle ml-3 text-sm"></i>
              </div>
            </Link>

            {/* Column 2: Content Box -> /data-structures */}
            <Link to="/data-structures" className="relative min-h-[400px] lg:min-h-full overflow-hidden bg-[#F2F4F4] flex flex-col justify-end border-t lg:border-t-0 border-b lg:border-b-0 border-[#EBEBEB] group cursor-pointer outline-none block">
               <img 
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=100&w=1000" 
                alt="Algorithmic Structure"
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-[0.3] grayscale group-hover:scale-105 group-hover:opacity-[0.4] transition-all duration-700 ease-out"
              />
              <div className="relative z-10 w-full flex justify-center pb-10">
                <span className="bg-white px-8 py-3 text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.25em] uppercase shadow-ambient group-hover:shadow-lg transition-shadow duration-500">
                  LIVE SIMULATION
                </span>
              </div>
            </Link>

            {/* Column 3: Understand It -> /documentation */}
            <Link to="/documentation" className="p-10 lg:p-14 flex flex-col gap-6 lg:border-l border-[#EBEBEB] bg-white group hover:bg-[#FDFDFD] transition-colors cursor-pointer outline-none premium-hover">
              <div>
                <i className="bi bi-lightbulb text-[#2A2D2E] text-2xl mb-8 block opacity-80"></i>
                <h3 className="text-[#2A2D2E] text-[1.75rem] mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>Understand It</h3>
                <p className="text-[#717171] text-[0.9rem] leading-relaxed mb-16">
                  Interactive elements help you grasp the underlying logic. Experiment with different inputs and edge cases.
                </p>
              </div>
              <div className="mt-auto flex items-center text-[#5f5e5e] text-[0.65rem] font-bold tracking-[0.2em] uppercase group-hover:text-[#2A2D2E] transition-colors">
                System Specs <i className="bi bi-lightbulb ml-3 text-sm"></i>
              </div>
            </Link>

          </div>
        </div>
      </section>
      {/* AI Section (Matching the Image Layout) */}
      <section className='bg-[#F7F9F9] py-32 px-8 sm:px-16 lg:px-24 flex justify-center w-full relative border-t border-[#EBEBEB]' id='ai'>
        <div className='w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24'>
          
          {/* Left Column: Chat Card contained in the elegant framed box */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center">
            {/* The white perfectly square container with deep shadow */}
            <div className="w-full max-w-[500px] aspect-square bg-white shadow-[0_20px_60px_rgba(45,52,53,0.06)] relative flex items-center justify-center p-8 sm:p-12 premium-hover">
              {/* Top-Left Corner Bracket */}
              <div className="absolute top-8 left-8 w-12 h-12 border-t-[1px] border-l-[1px] border-[#D1D5DB]"></div>
              {/* Bottom-Right Corner Bracket */}
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b-[1px] border-r-[1px] border-[#D1D5DB]"></div>
              
              {/* The AI Agent ChatCard replacing the image */}
              <div className="w-full h-full relative z-10 flex border-[0.5px] border-[#EBEBEB]">
                <ChatCard />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-4">
              <span className="text-[0.65rem] font-bold text-tertiary tracking-[0.25em] uppercase" style={{ color: '#886d52' }}>Silent Authority</span>
            </div>
            
            <h2 className="text-[#2A2D2E] text-4xl sm:text-5xl lg:text-[3.25rem] tracking-tight mb-8" style={{ fontFamily: '"Playfair Display", "Times New Roman", serif', lineHeight: '1.2' }}>
              Meet Structify AI
            </h2>
            
            <p className="text-[#717171] leading-relaxed text-[0.95rem] font-sans mb-12 max-w-[480px]">
              Each visualizer comes with a specialized AI assistant that understands the intricacies of that specific data structure. Get instant explanations and solve complex problems.
            </p>

            {/* Feature List Items */}
            <div className="flex flex-col w-full max-w-[480px]">
              
              {/* List Item 01 */}
              <div className="flex gap-6 pb-6 border-b border-[#EBEBEB]">
                <span className="text-[#B0B0B0] text-[0.65rem] font-bold tracking-widest mt-1">01</span>
                <div className="flex flex-col gap-3">
                  <span className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Specialized Knowledge</span>
                  <p className="text-[#8C8C8C] text-[0.85rem] leading-relaxed">
                    Each AI assistant is trained specifically on one data structure, providing deep, contextual understanding.
                  </p>
                </div>
              </div>

              {/* List Item 02 */}
              <div className="flex gap-6 py-6 border-b border-[#EBEBEB]">
                <span className="text-[#B0B0B0] text-[0.65rem] font-bold tracking-widest mt-1">02</span>
                <div className="flex flex-col gap-3">
                  <span className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Instant Problem Solving</span>
                  <p className="text-[#8C8C8C] text-[0.85rem] leading-relaxed">
                    Stuck on a concept? Ask questions, get step-by-step solutions, and understand the "why" behind every operation.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Editorial Quote Section */}
      <section className="bg-white py-32 sm:py-48 px-8 flex flex-col items-center justify-center text-center border-t border-[#F2F4F4]">
        {/* Subtle Ornamental Quote Mark ('99' as per the image) */}
        <div className="text-[#E0E0E0] text-[1.15rem] font-sans tracking-[0.2em] mb-12 select-none">
          99
        </div>
        
        {/* Main Quote Body - Using Cormorant Garamond for the ultra-thin delicate typographic look */}
        <p className="text-[#364147] text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.3] italic max-w-[850px] mx-auto mb-14 font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          "Mastering algorithms isn't just about code; it's<br/> about seeing the architecture of thought in motion."
        </p>
        
        {/* Minimalist Divider Line */}
        <div className="w-14 h-[1px] bg-[#E5E7EB] mb-12"></div>
        
        {/* Attribution / Signature */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#1A202C] text-[0.65rem] font-bold tracking-[0.3em] uppercase">Darshan Pawar</span>
          <span className="text-[#9CA3AF] text-[0.55rem] font-bold tracking-[0.2em] uppercase mt-1">Chief Architect, Structify</span>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Index
