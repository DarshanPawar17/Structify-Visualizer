import { Link } from 'react-router-dom';
import { useSound } from '../../hooks/useSound';
import AnimatedThumbnail from './AnimatedThumbnail';

const DataStructureCard = ({ icon, title, complexity, description, dataStructure }) => {
  const { playSound } = useSound();

  return (
    <div 
      onMouseEnter={() => playSound('hover')}
      className="group flex flex-col bg-surface-container-lowest rounded-sm shadow-ambient w-full border-none transition-all duration-300 ease-out hover:bg-surface-container-low hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(45,52,53,0.15)] cursor-pointer overflow-hidden font-sans"
    >
      {/* Animated Video Thumbnail Header */}
      <div className="w-full h-48 relative overflow-hidden border-b border-outline-variant flex items-center justify-center bg-surface-container-low">
        <AnimatedThumbnail type={dataStructure} />
        <div className="absolute inset-0 bg-surface/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
      </div>
      
      <div className="flex flex-col p-8 w-full h-full">
        {/* Header: Icon & Complexity */}
        <div className="flex justify-between items-center w-full mb-6">
          <div className="flex items-center gap-3">
            <span className={`${icon} text-primary text-xl`}></span>
            <span className="label-sm text-primary border border-outline-variant px-2 py-0.5 rounded-sm bg-surface-container-low group-hover:bg-surface transition-colors">{complexity}</span>
          </div>
        </div>

        {/* Title and Description */}
        <h2 className="headline-md text-on-surface mb-3">{title}</h2>
        <p className="body-md text-on-surface opacity-80 mb-4">{description}</p>
        
        <Link to={`/visualization/${dataStructure.replace(/\s+/g, "")}`} className="w-full mt-2 block">
          <div className="flex items-center justify-between border-t border-outline-variant pt-4 transition-colors group-hover:border-primary">
            <span className="title-md text-on-surface group-hover:text-primary transition-colors">Explore Structure</span>
            <span className="bi bi-arrow-right text-on-surface group-hover:text-primary transition-colors transform group-hover:translate-x-2"></span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DataStructureCard;
