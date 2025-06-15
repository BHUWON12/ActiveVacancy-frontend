import React from 'react';
import AdSenseAd from '../AdSense/AdSenseAd';

interface AdLayoutProps {
  position: 'top' | 'sidebar' | 'content' | 'bottom';
  className?: string;
}

export default function AdLayout({ position, className = '' }: AdLayoutProps) {
  const getAdFormat = () => {
    switch (position) {
      case 'top':
        return 'horizontal';
      case 'sidebar':
        return 'vertical';
      case 'content':
        return 'rectangle';
      case 'bottom':
        return 'horizontal';
      default:
        return 'responsive';
    }
  };

  const getSlotId = () => {
    // Return placeholder slot IDs since we don't have actual AdSense slots yet
    switch (position) {
      case 'top':
        return 'top-ad-slot';
      case 'sidebar':
        return 'sidebar-ad-slot';
      case 'content':
        return 'content-ad-slot';
      case 'bottom':
        return 'bottom-ad-slot';
      default:
        return 'default-ad-slot';
    }
  };

  return (
    <div className={`ad-layout ${position} w-full flex justify-center items-center ${className}`}>
      <div className="w-full max-w-full">
        <AdSenseAd
          slot={getSlotId()}
          format={getAdFormat()}
          className={`ad-${position} w-full`}
        />
      </div>
    </div>
  );
} 