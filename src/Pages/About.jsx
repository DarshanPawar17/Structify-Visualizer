import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const About = () => {
  // Inject Playfair + Cormorant fonts
  React.useEffect(() => {
    if (!document.getElementById('about-fonts')) {
      const link = document.createElement('link');
      link.id = 'about-fonts';
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Playfair+Display:ital,wght@0,400;1,400&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="w-full bg-surface text-on-surface overflow-x-hidden font-sans">
      <Navbar />

      {/* Hero Section: 2 Column — Text Left, Photo Right */}
      <section className="w-full bg-white border-b border-[#EBEBEB]">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">

          {/* Left Column: Editorial Text */}
          <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-20 lg:py-0">
            <div className="mb-8">
              <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase" style={{ color: '#886d52' }}>About the Creator</span>
            </div>

            <h1 className="text-[#2A2D2E] text-5xl sm:text-6xl lg:text-[4.5rem] tracking-tight mb-6" style={{ fontFamily: '"Playfair Display", serif', lineHeight: '1.1' }}>
              Darshan Pawar
            </h1>

            <p className="text-[0.95rem] italic mb-10" style={{ fontFamily: '"Cormorant Garamond", serif', color: '#717171' }}>
              Full-Stack Developer & Competitive Coder
            </p>

            <p className="text-[#717171] text-[0.9rem] leading-relaxed max-w-[440px] mb-14">
              I'm Darshan Pawar, a CS student and coding enthusiast. I built Structify with a singular goal: to make learning data structures easier and more interactive. Instead of just reading code, you can now see how it works — step by step, visually. Perfect for beginners, interview prep, or anyone curious about how data structures actually function.
            </p>

            {/* Social Links — pill style matching the screenshot */}
            <div className="flex flex-wrap gap-4">
              <a href="https://github.com/DarshanPawar17" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#F7F7F7] px-5 py-3 text-[#5f5e5e] text-[0.6rem] font-bold tracking-[0.15em] uppercase hover:bg-[#EBEBEB] transition-colors" style={{ color: '#5f5e5e' }}>
                <i className="bi bi-github text-sm"></i> GitHub
              </a>
              <a href="https://www.linkedin.com/in/darshan-jagdish-pawar-9b9701298" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#F7F7F7] px-5 py-3 text-[#5f5e5e] text-[0.6rem] font-bold tracking-[0.15em] uppercase hover:bg-[#EBEBEB] transition-colors" style={{ color: '#5f5e5e' }}>
                <i className="bi bi-linkedin text-sm"></i> LinkedIn
              </a>
              <a href="https://leetcode.com/u/Darshan_Pawar_17/" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#F7F7F7] px-5 py-3 text-[#5f5e5e] text-[0.6rem] font-bold tracking-[0.15em] uppercase hover:bg-[#EBEBEB] transition-colors" style={{ color: '#5f5e5e' }}>
                <i className="bi bi-code-slash text-sm"></i> LeetCode
              </a>
            </div>
          </div>

          {/* Right Column: Portrait Photo with EST. badge */}
          <div className="relative flex items-center justify-center px-8 lg:px-16 py-16 lg:py-0">
            <div className="relative w-[320px] h-[380px] sm:w-[360px] sm:h-[420px] lg:w-[400px] lg:h-[460px] border border-[#EBEBEB] shadow-[0_20px_60px_rgba(45,52,53,0.06)] overflow-hidden">
              <img
                src="/images/user_avatar.png"
                alt="Darshan Pawar"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* EST. Badge */}
            <div className="absolute bottom-20 lg:bottom-12 right-12 lg:right-8 select-none">
              <span className="text-[#B0B0B0] text-[0.6rem] font-bold tracking-[0.3em] uppercase">Est. 2024</span>
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Journey Section */}
      <section className="bg-[#F7F9F9] py-32 px-8 sm:px-16 lg:px-24 border-t border-[#EBEBEB]">
        <div className="w-full max-w-[1200px] mx-auto">

          <div className="flex justify-between items-start mb-20 relative">
            <div className="max-w-2xl z-10">
              <h2 className="text-[#2A2D2E] text-4xl sm:text-5xl tracking-tight mb-8" style={{ fontFamily: '"Playfair Display", serif', lineHeight: '1.2' }}>
                The Philosophy
              </h2>
              <p className="text-[#717171] leading-relaxed text-[0.95rem] font-sans">
                Every decision in Structify is guided by a singular principle: clarity through interaction.
              </p>
            </div>
            <div className="hidden lg:block absolute right-8 top-0 select-none pointer-events-none">
              <span className="text-[12rem] leading-[0.75]" style={{ fontFamily: '"Playfair Display", serif', color: '#F0F0F0' }}>02</span>
            </div>
          </div>

          {/* 2-Column bordered grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* The Mission */}
            <div className="p-12 lg:p-16 flex flex-col gap-6 bg-white border border-[#EBEBEB] shadow-[0_4px_20px_rgba(0,0,0,0.02)] premium-hover">
              <div className="flex gap-4 items-center mb-4">
                <i className="bi bi-heart text-[#886d52] text-xl"></i>
                <span className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">01 — The Mission</span>
              </div>
              <h3 className="text-[#2A2D2E] text-[1.75rem] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Why Structify Exists</h3>
              <p className="text-[#717171] text-[0.9rem] leading-relaxed">
                Data structures are the foundation of computer science, yet they're often taught in abstract ways that make them hard to grasp. Structify was born from the belief that visual learning and interactive exploration can make these concepts click for students and developers alike.
              </p>
            </div>

            {/* The Journey */}
            <div className="p-12 lg:p-16 flex flex-col gap-6 bg-white border border-[#EBEBEB] shadow-[0_4px_20px_rgba(0,0,0,0.02)] premium-hover">
              <div className="flex gap-4 items-center mb-4">
                <i className="bi bi-rocket-takeoff text-[#886d52] text-xl"></i>
                <span className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">02 — The Journey</span>
              </div>
              <h3 className="text-[#2A2D2E] text-[1.75rem] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>From Idea to Platform</h3>
              <p className="text-[#717171] text-[0.9rem] leading-relaxed">
                Starting as a simple visualization tool for my own learning, Structify evolved into a comprehensive platform. Each data structure comes with its own specialized AI assistant, making personalized learning possible for thousands of users worldwide.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Connect CTA Section */}
      <section className="bg-white py-32 px-8 flex flex-col items-center justify-center text-center border-t border-[#EBEBEB]">
        <div className="text-[#E0E0E0] text-[1.15rem] font-sans tracking-[0.2em] mb-10 select-none">
          ✦
        </div>
        <h2 className="text-[#2A2D2E] text-3xl sm:text-4xl lg:text-[2.65rem] italic max-w-[700px] mx-auto mb-6" style={{ fontFamily: '"Cormorant Garamond", serif', lineHeight: '1.3' }}>
          Let's build something extraordinary together.
        </h2>
        <p className="text-[#8C8C8C] text-[0.9rem] max-w-[480px] mb-12 leading-relaxed">
          Have questions about data structures? Want to contribute to Structify? Or just want to chat about technology and education? I'd love to hear from you.
        </p>
        <Link to="/contact">
          <button className="bg-[#5f5e5e] text-[0.65rem] font-bold tracking-[0.15em] uppercase px-12 py-5 hover:bg-[#4a4949] transition-colors border-none cursor-pointer" style={{ color: '#fff' }}>
            Get in Touch
          </button>
        </Link>
      </section>

      <Footer />
    </div>
  )
}

export default About
