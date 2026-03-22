import React from 'react'

const GuideCard = ({ 
  title, 
  description, 
  timeComplexity, 
  spaceComplexity, 
  bestFor 
}) => {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-sm p-8 text-[#2A2D2E] w-[450px] hover:shadow-ambient transition-all duration-500 group">
      {/* Title */}
      <h2 className="text-2xl tracking-tight mb-4 font-serif italic" style={{ fontFamily: '"Playfair Display", serif' }}>{title}</h2>

      {/* Description */}
      <p className="text-[#717171] mb-8 font-serif leading-relaxed italic text-[0.95rem] border-l-2 border-[#EBEBEB] pl-4 group-hover:border-primary transition-colors">{description}</p>

      {/* Details */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col gap-1">
            <span className="text-[0.6rem] font-bold text-[#B0B0B0] tracking-[0.2em] uppercase">Time Complexity</span>
            <span className="text-[0.85rem] font-medium text-[#2A2D2E]">{timeComplexity}</span>
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-[0.6rem] font-bold text-[#B0B0B0] tracking-[0.2em] uppercase">Space Complexity</span>
            <span className="text-[0.85rem] font-medium text-[#2A2D2E]">{spaceComplexity}</span>
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-[0.6rem] font-bold text-[#B0B0B0] tracking-[0.2em] uppercase">Best For</span>
            <span className="text-[0.85rem] font-medium text-[#2A2D2E]">{bestFor}</span>
        </div>
      </div>

      {/* Button */}
      <button className="flex items-center gap-3 text-[#2A2D2E] font-bold tracking-[0.15em] uppercase text-[0.65rem] border-t border-[#F2F4F4] pt-6 w-full hover:text-primary transition-colors cursor-pointer group">
        <span className="bi bi-arrow-right text-lg group-hover:translate-x-2 transition-transform"></span>
        Initialize {title} Visualizer
      </button>
    </div>
  );
};

export default GuideCard
