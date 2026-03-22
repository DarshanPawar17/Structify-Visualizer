import { useEffect } from 'react';
import { useSound } from '../hooks/useSound';

const GlobalSoundPlayer = () => {
  const { playSound } = useSound();

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const isInteractiveNode = e.target.closest('button, a, [role="button"]');
      
      // Also check if the raw classList includes cursor-pointer to act as an interactive element
      let isCursorPointer = false;
      const closestElement = e.target.closest('*');
      if (closestElement && typeof closestElement.className === 'string') {
          isCursorPointer = closestElement.className.includes('cursor-pointer');
      }

      if (isInteractiveNode || isCursorPointer) {
        playSound('click');
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [playSound]);

  return null;
};

export default GlobalSoundPlayer;
