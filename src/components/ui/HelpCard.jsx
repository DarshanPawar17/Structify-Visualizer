import React from 'react'

const HelpCard = ({ icon, title, description, buttonText }) => {
  return (
    <div className="bg-white rounded-sm py-10 px-8 shadow-sm flex flex-col items-center text-center hover:shadow-ambient transition-all duration-500 border border-[#EBEBEB] w-full">
      {/* Icon */}
      <div className="w-16 h-16 bg-[#F7F9F9] rounded-sm flex items-center justify-center mb-8 border border-[#EBEBEB] relative">
         <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-primary"></div>
         <i className={`bi ${icon} text-primary text-3xl`}></i>
      </div>

      {/* Title */}
      <h3 className="text-xl font-serif italic text-[#2A2D2E] mb-4 tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#717171] font-serif italic text-[0.9rem] mb-8 leading-relaxed max-w-[240px]">{description}</p>

      {/* Button */}
      <button className="bg-[#2A2D2E] text-white text-[0.65rem] font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-black transition-all cursor-pointer shadow-md rounded-sm w-full">
        {buttonText}
      </button>
    </div>
  )
}

export default HelpCard
