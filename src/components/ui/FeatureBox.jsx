import { useSound } from "../../hooks/useSound";

const FeatureBox = ({ percentage, text }) => {
  const { playSound } = useSound();

  return (
    <div 
      onMouseEnter={() => playSound('hover')}
      className="flex flex-col items-start justify-center bg-surface-container-lowest rounded-sm p-8 shadow-ambient w-full border-none transition-colors duration-200 hover:bg-surface-container-low cursor-default font-sans group premium-hover"
    >
      <div className="display-lg text-primary mb-2 transition-colors duration-300 group-hover:text-on-surface">
        {percentage}
      </div>
      <div className="label-sm text-on-surface opacity-80 mt-1">
        {text}
      </div>
    </div>
  );
};

export default FeatureBox;