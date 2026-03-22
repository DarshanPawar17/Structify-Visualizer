import React from 'react'
import Navbar from '../components/Navbar'
import GuideCard from '../components/ui/GuideCard'
import HelpCard from '../components/ui/HelpCard'
import Footer from '../components/Footer';
import { HashLink } from 'react-router-hash-link';

const dataStructures = [
  {
    title: "Stack",
    description:
      "Last-In-First-Out (LIFO) structure. Useful in recursion, expression evaluation, and undo operations.",
    timeComplexity: "O(1) push/pop",
    spaceComplexity: "O(n)",
    bestFor: "Function calls, backtracking",
  },
  {
    title: "Queue",
    description:
      "First-In-First-Out (FIFO) structure. Elements are inserted at the rear and removed from the front.",
    timeComplexity: "O(1) enqueue/dequeue",
    spaceComplexity: "O(n)",
    bestFor: "Scheduling, buffering, order processing",
  },
  {
    title: "Singly Linked List",
    description:
      "Linear collection of nodes where each node points to the next. Allows dynamic memory allocation.",
    timeComplexity: "O(1) insert/delete at head, O(n) search",
    spaceComplexity: "O(n)",
    bestFor: "Dynamic memory usage, sequential access",
  },
  {
    title: "Doubly Linked List",
    description:
      "Nodes contain pointers to both previous and next nodes, allowing bidirectional traversal.",
    timeComplexity: "O(1) insert/delete with reference, O(n) search",
    spaceComplexity: "O(n)",
    bestFor: "Navigation, undo/redo, browser history",
  },
  {
    title: "Binary Tree",
    description:
      "Hierarchical structure where each node has at most two children (left and right).",
    timeComplexity: "O(n) traversal, O(n) search",
    spaceComplexity: "O(n)",
    bestFor: "Hierarchical data representation",
  },
  {
    title: "Binary Search Tree (BST)",
    description:
      "A binary tree where left child < parent < right child. Enables efficient ordered operations.",
    timeComplexity: "O(log n) average search/insert/delete, O(n) worst-case",
    spaceComplexity: "O(n)",
    bestFor: "Efficient search, dynamic datasets",
  },
  {
    title: "Min Heap",
    description:
      "A complete binary tree where the parent node is always smaller than its children.",
    timeComplexity: "O(1) get min, O(log n) insert/delete",
    spaceComplexity: "O(n)",
    bestFor: "Priority queues, shortest path algorithms",
  },
  {
    title: "Max Heap",
    description:
      "A complete binary tree where the parent node is always greater than its children.",
    timeComplexity: "O(1) get max, O(log n) insert/delete",
    spaceComplexity: "O(n)",
    bestFor: "Priority scheduling, heap sort",
  },
  {
    title: "AVL Tree",
    description:
      "A self-balancing binary search tree where height difference between subtrees is at most 1.",
    timeComplexity: "O(log n) search/insert/delete",
    spaceComplexity: "O(n)",
    bestFor: "Balanced dynamic datasets, guaranteed log-time operations",
  },
];

const Documentation = () => {
  return (
    <div className="w-full bg-white text-on-surface overflow-x-hidden font-sans min-h-screen flex flex-col">
      <Navbar />

      {/* Minimalist Architectural Hero */}
      <section className='relative w-full py-32 px-6 sm:px-16 flex flex-col items-center justify-center bg-[#F7F9F9] border-b border-[#EBEBEB]'>
        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
          <span className="text-[0.65rem] font-bold text-primary tracking-[0.3em] uppercase mb-6">Documentation</span>
          <h1 className="text-[#2A2D2E] text-5xl sm:text-7xl lg:text-[5rem] tracking-tight mb-8" style={{ fontFamily: '"Playfair Display", serif', lineHeight: '1.1' }}>
            Absolute <span className="italic">Clarity.</span>
          </h1>
          <p className="text-[#717171] text-lg font-serif italic max-w-2xl leading-relaxed">
            A comprehensive architectural guide to mastering data structures and leveraging the specialized Structify AI diagnostic system.
          </p>
        </div>
      </section>

      <div className='w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 py-24 px-6 sm:px-16'>
        
        {/* Quick Start Sidebar-Nav (Architectural Style) */}
        <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit flex flex-col gap-12">
           <div className="flex flex-col gap-6">
              <span className="text-[0.6rem] font-bold text-[#B0B0B0] tracking-[0.2em] uppercase border-b border-[#EBEBEB] pb-4">On this page</span>
              <nav className="flex flex-col gap-3 font-sans">
                 <a href="#quick-start" className="text-[#2A2D2E] text-[0.85rem] font-bold hover:text-primary transition-colors py-1">01. QUICK START</a>
                 <a href="#guides" className="text-[#717171] text-[0.85rem] hover:text-primary transition-colors py-1">02. DATA STRUCTURES</a>
                 <a href="#ai-assistant" className="text-[#717171] text-[0.85rem] hover:text-primary transition-colors py-1">03. AI ASSISTANT</a>
                 <a href="#help" className="text-[#717171] text-[0.85rem] hover:text-primary transition-colors py-1">04. SUPPORT</a>
              </nav>
           </div>
           
           <div className="bg-[#F7F9F9] p-8 border border-[#EBEBEB] rounded-sm hidden lg:flex flex-col gap-6">
              <span className="text-[#2A2D2E] text-[0.65rem] font-bold tracking-[0.2em] uppercase">Need Clarity?</span>
              <p className="text-[#8C8C8C] text-[0.8rem] leading-relaxed font-serif italic">
                Our AI diagnostic core is available in every visualization route to solve complex queries.
              </p>
              <HashLink smooth to="/#ai" className="text-primary text-[0.7rem] font-bold tracking-widest uppercase flex items-center gap-2 group">
                 Consult AI <span className="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></span>
              </HashLink>
           </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 flex flex-col gap-32">
          
          {/* 01. QUICK START */}
          <section id="quick-start" className="flex flex-col scroll-mt-32">
             <div className="mb-12">
               <h2 className="text-[#2A2D2E] text-3xl sm:text-4xl font-serif italic mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>01. Quick Start</h2>
               <div className="h-1 w-12 bg-primary"></div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { step: "01", title: "Select Structure", desc: "Choose from our catalog of 9+ architectural data models including Trees, Heaps, and Lists." },
                  { step: "02", title: "Live Execution", desc: "Interact with real-time operations and watch the structural topology mutate through animations." },
                  { step: "03", title: "AI Diagnostic", desc: "Utilize the integrated AI for immediate time-complexity analysis and structural feedback." }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-6 group">
                     <span className="text-4xl font-serif italic text-primary opacity-20 group-hover:opacity-100 transition-opacity" style={{ fontFamily: '"Playfair Display", serif' }}>{item.step}</span>
                     <h3 className="text-[#2A2D2E] font-bold tracking-[0.15em] text-[0.7rem] uppercase">{item.title}</h3>
                     <p className="text-[#717171] text-[0.9rem] leading-relaxed font-serif italic">{item.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* 02. DATA STRUCTURE GUIDES */}
          <section id="guides" className="flex flex-col scroll-mt-32">
             <div className="mb-12">
               <h2 className="text-[#2A2D2E] text-3xl sm:text-4xl font-serif italic mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>02. Data Structure Guides</h2>
               <div className="h-1 w-12 bg-primary"></div>
             </div>
             <div className="flex flex-wrap gap-8 justify-start">
               {dataStructures.map((ds, index) => (
                 <GuideCard key={index} {...ds} />
               ))}
             </div>
          </section>

          {/* 03. AI ASSISTANT SECTION */}
          <section id="ai-assistant" className="flex flex-col scroll-mt-32 bg-[#F7F9F9] p-12 sm:p-20 border border-[#EBEBEB] relative">
             <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#D1D5DB] opacity-50 m-6"></div>
             <div className="mb-12 relative z-10">
               <h2 className="text-[#2A2D2E] text-3xl sm:text-4xl font-serif italic mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>03. AI Assistant System</h2>
               <p className="text-[#717171] text-[0.9rem] font-serif italic leading-relaxed max-w-xl">
                 Each visualizer is equipped with a specialized LLM agent configured for deep structural analysis and algorithmic validation.
               </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                <div className="flex flex-col gap-6">
                   <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#2A2D2E]">Capabilities</h4>
                   <ul className="space-y-4">
                      {[
                        "Explain complex topological operations",
                        "Time & Space complexity auditing",
                        "Diagnostic code refactoring",
                        "Shortest-path logic derivation"
                      ].map((text, i) => (
                        <li key={i} className="flex items-center gap-4 text-[#717171] text-[0.9rem] font-serif italic">
                           <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> {text}
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="flex flex-col gap-6">
                   <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#2A2D2E]">Console Examples</h4>
                   <div className="flex flex-col gap-4">
                      {[
                        "Explain AVL tree rebalancing logic.",
                        "Why is recursion preferred for BST search?",
                        "Analyze this hash table collision."
                      ].map((text, i) => (
                        <div key={i} className="bg-white border border-[#EBEBEB] p-4 text-[0.8rem] text-[#8C8C8C] italic font-serif leading-relaxed shadow-sm">
                           "{text}"
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* 04. ADDITIONAL HELP */}
          <section id="help" className="flex flex-col scroll-mt-32 pb-12">
             <div className="mb-12">
               <h2 className="text-[#2A2D2E] text-3xl sm:text-4xl font-serif italic mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>04. Extended Support</h2>
               <div className="h-1 w-12 bg-primary"></div>
             </div>
             <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
               <HelpCard icon="bi-robot" title="Diagnostic Chat" description="Initiate a session with our primary AI core." buttonText="Consult Now" />
               <HelpCard icon="bi-code" title="Algorithm Lab" description="Interactive challenges for deep mastery." buttonText="Coming Soon" />
               <HelpCard icon="bi-book" title="Academic Vault" description="Detailed step-by-step video archives." buttonText="Coming Soon" />
             </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Documentation
