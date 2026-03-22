import React from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-blur-reveal">
      {children}
    </div>
  );
};

export default PageTransition;
