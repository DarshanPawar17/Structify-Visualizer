import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
  // Inject the Google Fonts for consistent typography
  React.useEffect(() => {
    if (!document.getElementById('contact-fonts')) {
      const link = document.createElement('link');
      link.id = 'contact-fonts';
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Playfair+Display:ital,wght@0,400;1,400&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="w-full bg-white text-on-surface overflow-x-hidden font-sans">
      <Navbar />

      {/* Header Section */}
      <section className="py-24 px-8 text-center border-b border-[#EBEBEB]">
        <div className="mb-8">
          <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase" style={{ color: '#886d52' }}>Connect with Us</span>
        </div>
        <h1 className="text-[#2A2D2E] text-5xl sm:text-6xl lg:text-[4.5rem] tracking-tight mb-8" style={{ fontFamily: '"Playfair Display", serif', lineHeight: '1.1' }}>
          Get in Touch
        </h1>
        <p className="text-[#717171] text-[1.15rem] italic max-w-2xl mx-auto" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          Have a question, suggestion, or just want to say hello? Our architects are ready to assist you.
        </p>
      </section>

      {/* Main Content: Info + Form Grid */}
      <section className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#EBEBEB]">
        
        {/* Left Side: Contact Information (4 columns) */}
        <div className="lg:col-span-4 p-12 lg:p-24 bg-[#F7F9F9] lg:border-r border-[#EBEBEB] flex flex-col gap-16">
          
          <div>
            <h3 className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-8">Contact Information</h3>
            <div className="flex flex-col gap-10">
              <div className="flex gap-6 items-start">
                <i className="bi bi-envelope text-[#886d52] text-xl"></i>
                <div>
                  <div className="text-[#2A2D2E] text-[0.8rem] font-bold uppercase tracking-wider mb-1">Email</div>
                  <div className="text-[#717171] text-[0.9rem]">pawardarshan987@gmail.com</div>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <i className="bi bi-geo-alt text-[#886d52] text-xl"></i>
                <div>
                  <div className="text-[#2A2D2E] text-[0.8rem] font-bold uppercase tracking-wider mb-1">Location</div>
                  <div className="text-[#717171] text-[0.9rem]">Chhatrapati Sambhajinagar, MH</div>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <i className="bi bi-clock text-[#886d52] text-xl"></i>
                <div>
                  <div className="text-[#2A2D2E] text-[0.8rem] font-bold uppercase tracking-wider mb-1">Inquiry Time</div>
                  <div className="text-[#717171] text-[0.9rem]">Response within 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-8">Follow My Work</h3>
            <div className="flex flex-col gap-4">
              <a href="https://github.com/DarshanPawar17" target="_blank" rel="noreferrer" className="text-[#717171] text-[0.9rem] hover:text-[#2A2D2E] flex items-center gap-3 transition-colors">
                <i className="bi bi-github"></i> @DarshanPawar17
              </a>
              <a href="https://www.linkedin.com/in/darshan-jagdish-pawar-9b9701298" target="_blank" rel="noreferrer" className="text-[#717171] text-[0.9rem] hover:text-[#2A2D2E] flex items-center gap-3 transition-colors">
                <i className="bi bi-linkedin"></i> Darshan Pawar
              </a>
              <a href="https://leetcode.com/u/Darshan_Pawar_17/" target="_blank" rel="noreferrer" className="text-[#717171] text-[0.9rem] hover:text-[#2A2D2E] flex items-center gap-3 transition-colors">
                <i className="bi bi-code-slash"></i> LeetCode
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: Message Form (8 columns) */}
        <div className="lg:col-span-8 p-12 lg:p-24 bg-white">
          <form className="flex flex-col gap-12 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-4">
                <label htmlFor="name" className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="e.g. Julian Vane" 
                  className="bg-transparent border-b border-[#EBEBEB] py-3 text-[1rem] focus:border-[#2A2D2E] outline-none transition-colors placeholder:text-[#E0E0E0]"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="email" className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="e.g. julian@arch.com" 
                  className="bg-transparent border-b border-[#EBEBEB] py-3 text-[1rem] focus:border-[#2A2D2E] outline-none transition-colors placeholder:text-[#E0E0E0]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="subject" className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Subject</label>
              <input 
                type="text" 
                id="subject" 
                placeholder="Inquiry regarding visualization" 
                className="bg-transparent border-b border-[#EBEBEB] py-3 text-[1rem] focus:border-[#2A2D2E] outline-none transition-colors placeholder:text-[#E0E0E0]"
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="message" className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Message</label>
              <textarea 
                id="message" 
                placeholder="How can our logic serve your project?" 
                rows={6}
                className="bg-transparent border-b border-[#EBEBEB] py-3 text-[1rem] focus:border-[#2A2D2E] outline-none transition-colors placeholder:text-[#E0E0E0] resize-none"
              />
            </div>

            <div className="mt-8">
              <button 
                type="submit" 
                className="bg-[#5f5e5e] text-[0.65rem] font-bold tracking-[0.15em] uppercase px-16 py-5 hover:bg-[#4a4949] transition-colors border-none cursor-pointer"
                style={{ color: '#fff' }}
              >
                Send Inquiry
              </button>
            </div>
          </form>
        </div>

      </section>

      {/* Decorative Final Quote */}
      <section className="bg-white py-32 flex flex-col items-center justify-center text-center">
         <div className="text-[#F0F0F0] text-[8rem] leading-none select-none pointer-events-none" style={{ fontFamily: '"Playfair Display", serif' }}>
           &
         </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact
