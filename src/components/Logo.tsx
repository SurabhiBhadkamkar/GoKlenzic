import React from 'react';

interface LogoProps {
  light?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Logo({ light = false, className = '', onClick }: LogoProps) {
  const textColor = light ? 'text-white' : 'text-brand-blue';
  const subtextColor = light ? 'text-brand-gold' : 'text-brand-gold';
  const stemColor = light ? '#FFFFFF' : '#118CAF';

  return (
    <div 
      className={`flex items-center space-x-2.5 select-none ${className}`}
      onClick={onClick}
    >
      {/* Recreated Logo Wave-Drop Icon */}
      <div className="relative h-11 w-11 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logo-cyan-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4CBDE3" />
              <stop offset="100%" stopColor="#118CAF" />
            </linearGradient>
            <linearGradient id="logo-green-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8AD275" />
              <stop offset="100%" stopColor="#64C25B" />
            </linearGradient>
            <linearGradient id="logo-teal-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#118CAF" />
              <stop offset="100%" stopColor="#06485C" />
            </linearGradient>
            <linearGradient id="logo-drop-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4CBDE3" stopOpacity={light ? 0.3 : 0.15} />
              <stop offset="100%" stopColor="#118CAF" stopOpacity={light ? 0.3 : 0.15} />
            </linearGradient>
          </defs>

          {/* Background Water Droplet shape */}
          <path 
            d="M50 6C50 6 19 37 19 62C19 78.5 33 92 50 92C67 92 81 78.5 81 62C81 37 50 6 50 6Z" 
            fill="url(#logo-drop-bg)" 
          />

          {/* Swooping Wave 1 (Teal base wave curving up from left side) */}
          <path 
            d="M48 7C40 19 23 38 23 60C23 74 33 85 46 87C37 84 29 74 29 60C29 46 43 25 48 7Z" 
            fill="url(#logo-teal-grad)" 
          />
          
          {/* Swooping Wave 2 (Green organic wave sweeping through middle) */}
          <path 
            d="M49 14C43 25 32 42 32 58C32 72 41 83.5 53 84.5C44.5 81.5 38 72 38 58C38 44 45.5 26 49 14Z" 
            fill="url(#logo-green-grad)" 
          />

          {/* Swooping Wave 3 (Ocean cyan wave cresting out of the drop, curling around) */}
          <path 
            d="M50 6C56 22 77 44 77 62C77 78.5 64 92 48 92C38.5 92 29.5 84 29.5 72C29.5 60 41.5 50 54 50C63 50 71 56.5 71 65C71 70.5 67 75 61.5 75C55 75 50 69.5 50 63.5C50 58 54 55 58 55C61 55 62.5 57 62.5 59.5C62.5 61.5 61 63 58.5 63C56.5 63 55.5 61.5 55.5 60.5C55.5 62.5 57.5 64.5 60 64.5C63.5 64.5 66 61 66 56.5C66 51 61 46.5 55 46.5C44.5 46.5 35 55.5 35 68C35 78.5 43.5 86.5 55.5 86.5C66 86.5 75 78 75 64C75 48 56 22 50 6Z" 
            fill="url(#logo-cyan-grad)" 
          />

          {/* Sparkling Stars - Apex Star */}
          <path 
            d="M50 9L52.5 16.5L60 19L52.5 21.5L50 29L47.5 21.5L40 19L47.5 16.5Z" 
            fill="#FFFFFF" 
          />
          <circle cx="50" cy="19" r="1.5" fill="#FFFFFF" />

          {/* Sparkling Stars - Wave Star 1 */}
          <path 
            d="M71 45L72.5 49L76.5 50.5L72.5 52L71 56L69.5 52L65.5 50.5L69.5 49Z" 
            fill="#FFFFFF" 
          />
          
          {/* Sparkling Stars - Wave Star 2 */}
          <path 
            d="M79 57L80 60L83 61L80 62L79 65L78 62L75 61L78 60Z" 
            fill="#FFFFFF" 
          />
        </svg>
      </div>

      {/* Styled Brand Name Text "GoKlenzic" with Wave K and Star i */}
      <div className="flex flex-col">
        <div className="flex items-center">
          {/* Go */}
          <span className={`font-display text-2xl font-extrabold tracking-tight leading-none ${textColor}`}>
            Go
          </span>
          
          {/* Custom Styled "K" with wave arm/leg */}
          <span className="inline-block relative h-7 w-5.5 -mx-0.5">
            <svg viewBox="0 0 24 28" className="absolute inset-0 h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Vertical stem */}
              <path d="M5 2C3.34 2 2 3.34 2 5V23C2 24.66 3.34 26 5 26V2Z" fill={stemColor} />
              {/* Top wave leg */}
              <path d="M4 14C8.5 13.5 16.5 11 19.5 5.5C21 3 22 2 22 2C22 2 21 3.5 19.5 5.5C16.5 9.5 10.5 12.5 4 14Z" fill={stemColor} />
              {/* Bottom wave leg */}
              <path d="M4 14C10 14.5 17.5 18.5 21.5 24.5C22.5 26 22.5 26 22.5 26C22.5 26 21.5 25 20.5 23.5C16.5 18 9.5 14.5 4 14Z" fill={stemColor} />
            </svg>
          </span>

          {/* lenz */}
          <span className={`font-display text-2xl font-extrabold tracking-tight leading-none ${textColor}`}>
            lenz
          </span>
          
          {/* Custom "i" with Sparkle dot */}
          <span className="inline-flex flex-col items-center justify-end relative h-7 w-2.5">
            <span className="absolute top-0.5 left-1/2 -translate-x-1/2 h-3.5 w-3.5">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5Z" fill={stemColor} />
              </svg>
            </span>
            <span 
              className="w-1.5 h-3 rounded-xs mt-auto" 
              style={{ backgroundColor: stemColor }}
            />
          </span>

          {/* c */}
          <span className={`font-display text-2xl font-extrabold tracking-tight leading-none ${textColor}`}>
            c
          </span>
        </div>
        
        {/* Subtitle text */}
        <span className={`block text-[8px] font-mono font-bold uppercase tracking-widest mt-0.5 ${subtextColor}`}>
          Eco Laundry Co.
        </span>
      </div>
    </div>
  );
}
