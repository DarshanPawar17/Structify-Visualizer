import React from 'react';

const AnimatedThumbnail = ({ type }) => {
  if (type === 'Stack') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-end pb-4 relative overflow-hidden bg-surface-container-low">
        <div className="w-32 h-16 border-x-4 border-b-4 border-outline-variant absolute bottom-6 rounded-b-sm"></div>
        {/* Boxes */}
        <div className="w-24 h-12 bg-primary/20 border-2 border-primary mb-1 rounded-sm z-10 transition-all duration-1000"></div>
        <div className="w-24 h-12 bg-primary/40 border-2 border-primary mb-1 rounded-sm z-10 transition-all duration-1000"></div>
        <div className="w-24 h-12 bg-primary border-2 border-primary mb-1 rounded-sm z-10 animate-bounce"></div>
      </div>
    );
  }

  if (type === 'Queue') {
    return (
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-surface-container-low">
        {/* Pipeline walls */}
        <div className="w-full h-32 border-y-4 border-outline-variant absolute flex items-center gap-6 px-4 overflow-hidden">
           <div className="w-16 h-16 rounded-full bg-primary/20 shrink-0 border-2 border-primary animate-pulse"></div>
           <div className="w-16 h-16 rounded-full bg-primary/40 shrink-0 border-2 border-primary animate-pulse" style={{animationDelay: '0.2s'}}></div>
           <div className="w-16 h-16 rounded-full bg-primary/80 shrink-0 border-2 border-primary animate-pulse" style={{animationDelay: '0.4s'}}></div>
           <div className="w-16 h-16 rounded-full bg-primary shrink-0 animate-bounce border-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (type === 'Singly Linked List' || type === 'Doubly Linked List') {
    return (
      <div className="w-full h-full flex items-center justify-center gap-2 overflow-hidden bg-surface-container-low">
        <div className="w-24 h-12 border-2 border-primary flex items-center justify-center text-primary text-sm font-bold tracking-tighter bg-surface rounded-sm relative shadow-md">
           DATA<span className="ml-2 border-l-2 border-primary h-full w-6 bg-primary/20"></span>
        </div>
        <span className="bi bi-arrow-right text-primary text-3xl animate-pulse"></span>
        <div className="w-24 h-12 border-2 border-primary flex items-center justify-center text-primary text-sm font-bold tracking-tighter bg-surface rounded-sm relative shadow-md">
           DATA<span className="ml-2 border-l-2 border-primary h-full w-6 bg-primary/60"></span>
        </div>
        <span className="bi bi-arrow-right text-primary text-3xl animate-pulse w-4 overflow-hidden"></span>
      </div>
    );
  }

  if (type.includes('Tree') || type.includes('Heap')) {
    const isHeap = type.includes('Heap');
    return (
      <div className="w-full h-full bg-surface-container-low overflow-hidden relative">
        <svg className="absolute w-full h-full top-0 left-0 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M 50 20 L 25 50" stroke="#5f5e5e" strokeWidth="1.5" opacity="0.3" />
           <path d="M 50 20 L 75 50" stroke="#5f5e5e" strokeWidth="1.5" opacity="0.3" />
           
           <path d="M 25 50 L 12 80" stroke="#5f5e5e" strokeWidth="1.5" opacity="0.3" />
           <path d="M 25 50 L 38 80" stroke="#5f5e5e" strokeWidth="1.5" opacity="0.3" />
           
           <path d="M 75 50 L 62 80" stroke="#5f5e5e" strokeWidth="1.5" opacity="0.3" />
           <path d="M 75 50 L 88 80" stroke="#5f5e5e" strokeWidth="1.5" opacity="0.3" />
        </svg>

        {/* Level 1 (Root) */}
        <div className={`absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center z-10 shadow-ambient bg-surface text-primary transition-all duration-700`}>
          <span className="text-[12px] font-bold">{isHeap ? '99' : '50'}</span>
        </div>

        {/* Level 2 */}
        <div className="absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-primary bg-surface flex items-center justify-center z-10 shadow-ambient transition-all duration-700 hover:bg-primary/20 cursor-pointer">
          <span className="text-[10px] text-primary font-bold">{isHeap ? '80' : '25'}</span>
        </div>
        <div className="absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-primary bg-surface flex items-center justify-center z-10 shadow-ambient transition-all duration-700 hover:bg-primary/20 cursor-pointer">
          <span className="text-[10px] text-primary font-bold">{isHeap ? '90' : '75'}</span>
        </div>

        {/* Level 3 */}
        <div className="absolute top-[80%] left-[12%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-primary bg-surface flex items-center justify-center z-10"></div>
        <div className="absolute top-[80%] left-[38%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-primary bg-surface flex items-center justify-center z-10"></div>
        <div className="absolute top-[80%] left-[62%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-primary bg-surface flex items-center justify-center z-10"></div>
        <div className="absolute top-[80%] left-[88%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-primary bg-surface flex items-center justify-center z-10"></div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="w-full h-full flex items-center justify-center gap-6 flex-wrap p-6 bg-surface-container-low">
      <div className="w-16 h-16 rotate-45 border-4 border-primary bg-primary/10 animate-pulse"></div>
      <div className="w-16 h-16 rotate-45 border-4 border-primary bg-primary/40 animate-pulse" style={{animationDelay: '0.2s'}}></div>
      <div className="w-16 h-16 rotate-45 border-4 border-primary bg-primary/70 animate-pulse" style={{animationDelay: '0.4s'}}></div>
    </div>
  );
}

export default AnimatedThumbnail;
