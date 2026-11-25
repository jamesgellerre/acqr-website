import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const sources = {
  light: '/logo-white.png',
  dark: '/logo-black.png',
} as const;

export const Logo: React.FC<LogoProps> = ({ className = 'h-12 w-auto', variant = 'dark' }) => {
  return (
    <img
      src={sources[variant]}
      alt="ACQR Investments"
      width={1400}
      height={599}
      className={`block ${className}`}
      decoding="async"
    />
  );
};
