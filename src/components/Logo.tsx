import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12 w-auto", variant = 'dark' }) => {
  const color = variant === 'light' ? '#FFFFFF' : '#143D24';
  
  return (
    <svg 
      viewBox="0 0 960 288" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <text 
        x="50%" 
        y="168" 
        textAnchor="middle" 
        fontFamily="'Montserrat', sans-serif" 
        fontSize="166" 
        fontWeight="200" 
        letterSpacing="0.11664em" 
        fill={color}
      >
        ACQR
      </text>
      <text 
        x="50%" 
        y="258" 
        textAnchor="middle" 
        fontFamily="'Montserrat', sans-serif" 
        fontSize="34" 
        fontWeight="200" 
        letterSpacing="0.49896em" 
        fill={color}
      >
        INVESTMENTS
      </text>
    </svg>
  );
};
