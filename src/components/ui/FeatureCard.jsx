import React from "react";
import { useSound } from "../../hooks/useSound";

const FeatureCard = ({ icon, title, description, features }) => {
  const { playSound } = useSound();
  
  return (
    <div 
      onMouseEnter={() => playSound('hover')}
      className="bg-surface-container-lowest rounded-sm p-8 shadow-ambient transition-all duration-300 ease-out hover:bg-surface-container-low hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(45,52,53,0.15)] flex flex-col font-sans border border-outline-variant/30 w-full lg:max-w-[400px]"
    >
      {/* Abstract Structural Icon Container */}
      <div className="w-14 h-14 flex items-center justify-center border-t-2 border-l-2 border-primary mb-8 bg-surface shadow-md">
        <i className={`bi ${icon} text-primary text-2xl`}></i>
      </div>

      <h3 className="title-md text-on-surface mb-3">{title}</h3>
      <p className="body-md text-on-surface opacity-80 mb-8 flex-grow leading-relaxed">{description}</p>

      {/* Structured Feature List */}
      <ul className="flex flex-col gap-4 border-t border-outline-variant pt-6 mt-auto">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-on-surface text-sm opacity-90">
            <span className="w-1.5 h-1.5 bg-primary/40 mr-4"></span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;