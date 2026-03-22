import React from 'react'
import Navbar from '../components/Navbar'
import FeatureCard from '../components/ui/FeatureCard'
import Footer from '../components/Footer'
import ChatCard from '../components/ChatCard'
import { Link } from 'react-router-dom'

const Features = () => {
  return (
    <div className="w-full bg-surface text-on-surface overflow-x-hidden font-sans min-h-screen flex flex-col">
      <Navbar />

      {/* Asymmetric Structural Hero */}
      <div className='w-full grid grid-cols-1 lg:grid-cols-12 min-h-[60vh] bg-surface relative px-6 sm:px-16 py-32'>
        <div className="lg:col-span-8 flex flex-col justify-center z-10 pr-0 lg:pr-16">
          <div className="mb-6">
            <span className="label-sm text-primary tracking-[0.1em] border-b border-outline-variant pb-1 uppercase">Advanced Instrumentation</span>
          </div>
          <h1 className="display-lg text-on-surface mb-8">
            Powerful Features for <span className="text-primary italic">Absolute Mastery.</span>
          </h1>
          <p className="body-md text-on-surface max-w-2xl mb-12 opacity-80 leading-relaxed">
            Discover the comprehensive set of tools and features that make Structify the most effective platform to learn complex data structures and algorithms through pure, unadulterated visualization.
          </p>
          <div className='flex flex-col sm:flex-row gap-8 items-start sm:items-center'>
            <Link to="/data-structures">
              <button className="bg-primary text-on-primary rounded-sm px-8 py-4 title-md cursor-pointer hover:bg-primary-dim transition-colors shadow-ambient">
                Try Interactive Demo
              </button>
            </Link>
            <Link to="/documentation">
              <button className="border-b border-primary text-primary pb-1 title-md hover:text-on-surface transition-colors cursor-pointer">
                Explore Documentation
              </button>
            </Link>
          </div>
        </div>
        
        {/* Right 4 columns empty/images */}
        <div className="lg:col-span-4 relative h-[300px] lg:h-auto border-l border-outline-variant mt-16 lg:mt-0">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=100" 
            alt="Data System Mechanics" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 mix-blend-multiply"
          />
        </div>
      </div>

      {/* Feature Grid Section */}
      <div className='bg-surface-container-low py-32 px-6 sm:px-16 w-full flex flex-col'>
        <div className='w-full max-w-7xl mx-auto'>
          <div className="mb-4">
            <span className="label-sm text-primary tracking-[0.1em] border-b border-outline-variant pb-1 uppercase">Core Capabilities</span>
          </div>
          <div className='headline-md text-on-surface mb-6'>
            Everything You Need to Excel
          </div>
        </div>
        
        <div className='flex flex-wrap gap-8 lg:gap-12 justify-center mt-16 max-w-7xl mx-auto w-full'>
          <FeatureCard
            icon="bi-eye"
            title="Interactive Visualizations"
            description="Watch data structures come alive with real-time CSS/SVG animations and step-by-step breakdowns."
            features={[
              "Real-time node animations",
              "Step-by-step execution sequences",
              "Perfect architectural diagrams"
            ]}
          />
          <FeatureCard
            icon="bi-robot"
            title="AI-Powered Learning"
            description="Get personalized explanations and algorithmic hints from the embedded Structify AI diagnostic console."
            features={[
              "Structural analysis",
              "Adaptive diagnostic logic",
              "Instant time-complexity feedback"
            ]}
          />
          <FeatureCard
            icon="bi-person"
            title="Collaborative Sync"
            description="Share your visualization states securely and learn structural mechanics together with peers."
            features={[
              "Progress state sharing",
              "Peer algorithmic review",
              "Immutable data tracking"
            ]}
          />
          <FeatureCard
            icon="bi-book"
            title="Comprehensive Documentation"
            description="Access our rigorous, textbook-quality guides and absolute best practices for every data architecture."
            features={[
              "Academic-tier guides",
              "Time complexity matrices",
              "Real-world application use cases"
            ]}
          />
          <FeatureCard
            icon="bi-code"
            title="Code Construction"
            description="Write and test the underlying algorithms directly integrating into the visualization pipeline."
            features={[
              "Monolithic editor integration",
              "Compilation state tracking",
              "Memory stack traces"
            ]}
          />
          <FeatureCard
            icon="bi-cpu"
            title="Performance Auditing"
            description="Strict metrics on Big-O notation, time arrays, and memory footprint comparisons."
            features={[
              "Big-O structural analysis",
              "CPU operation counts",
              "Comparison logging"
            ]}
          />
        </div>
      </div>

      {/* Embedded AI Section (Matching the Image Layout) */}
      <section className='bg-[#F7F9F9] py-32 px-8 sm:px-16 lg:px-24 flex justify-center w-full relative border-t border-[#EBEBEB]' id='ai'>
        <div className='w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24'>
          
          {/* Left Column: Chat Card contained in the elegant framed box */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center">
            <div className="w-full max-w-[500px] aspect-square bg-white shadow-[0_20px_60px_rgba(45,52,53,0.06)] relative flex items-center justify-center p-8 sm:p-12">
              <div className="absolute top-8 left-8 w-12 h-12 border-t-[1px] border-l-[1px] border-[#D1D5DB]"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b-[1px] border-r-[1px] border-[#D1D5DB]"></div>
              <div className="w-full h-full relative z-10 flex border-[0.5px] border-[#EBEBEB]">
                <ChatCard />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-[0.65rem] font-bold text-tertiary tracking-[0.25em] uppercase" style={{ color: '#886d52' }}>Silent Authority</span>
            </div>
            
            <h2 className="text-[#2A2D2E] text-4xl sm:text-5xl lg:text-[3.25rem] tracking-tight mb-8" style={{ fontFamily: '"Playfair Display", "Times New Roman", serif', lineHeight: '1.2' }}>
              Meet Structify AI
            </h2>
            
            <p className="text-[#717171] leading-relaxed text-[0.95rem] font-sans mb-12 max-w-[480px]">
              Each visualizer comes with a specialized AI assistant that understands the intricacies of that specific data structure. Get instant explanations and solve complex problems.
            </p>

            <div className="flex flex-col w-full max-w-[480px]">
              <div className="flex gap-6 pb-8 border-b border-[#EBEBEB]">
                <span className="text-[#B0B0B0] text-[0.65rem] font-bold tracking-widest mt-1">01</span>
                <div className="flex flex-col gap-3">
                  <span className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Contextual Logic</span>
                  <p className="text-[#8C8C8C] text-[0.85rem] leading-relaxed">
                    The AI Agent is injected directly into every visualization route, tracking your structural changes in real-time.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 pt-8 border-b border-[#EBEBEB] pb-8">
                <span className="text-[#B0B0B0] text-[0.65rem] font-bold tracking-widest mt-1">02</span>
                <div className="flex flex-col gap-3">
                  <span className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Algorithm Optimization</span>
                  <p className="text-[#8C8C8C] text-[0.85rem] leading-relaxed">
                    Prompt the assistant to refactor your data queries or ask it why an O(n^2) approach is failing your array limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Features;
