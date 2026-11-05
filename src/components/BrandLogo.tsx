import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 28, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="モザイクブレイク ロゴ"
    >
      <defs>
        <linearGradient id="mb-g1" x1="2" y1="2" x2="14" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mb-g2" x1="18" y1="2" x2="30" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#4338ca" />
        </linearGradient>
        <linearGradient id="mb-g3" x1="2" y1="18" x2="14" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mb-g4" x1="18" y1="18" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* 4つの洗練された幾何学モザイクプリズム片（光の結晶） */}
      <rect x="2.5" y="2.5" width="11" height="11" rx="3" fill="url(#mb-g1)" />
      <rect x="18.5" y="2.5" width="11" height="11" rx="3" fill="url(#mb-g2)" />
      <rect x="2.5" y="18.5" width="11" height="11" rx="3" fill="url(#mb-g3)" />
      <rect x="18.5" y="18.5" width="11" height="11" rx="3" fill="url(#mb-g4)" />
      {/* 貫通ブレイクを象徴する光の十字コア */}
      <circle cx="16" cy="16" r="2.2" fill="#ffffff" />
      <circle cx="16" cy="16" r="3.2" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
    </svg>
  );
};
