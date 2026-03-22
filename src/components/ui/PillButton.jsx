import { useSound } from "../../hooks/useSound";

const PillButton = ({ icon, text }) => {
  const { playSound } = useSound();

  return (
    <button 
      onMouseEnter={() => playSound('hover')}
      className="flex items-center gap-2 border-none text-on-primary px-6 py-2.5 rounded-sm font-semibold bg-primary font-sans cursor-default transition-colors hover:bg-primary-dim shadow-ambient"
    >
      <span className={`text-lg ${icon}`}></span>
      <span className="title-md">{text}</span>
    </button>
  );
};

export default PillButton;