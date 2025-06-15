import React from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: 'rectangle' | 'horizontal' | 'vertical' | 'responsive';
  className?: string;
}

export default function AdSenseAd({ slot, format = 'responsive', className = '' }: AdSenseAdProps) {
  const getAdDimensions = () => {
    switch (format) {
      case 'rectangle':
        return { width: '300px', height: '250px' };
      case 'horizontal':
        return { width: '728px', height: '90px' };
      case 'vertical':
        return { width: '160px', height: '600px' };
      default:
        return { width: '100%', height: 'auto' };
    }
  };

  const dimensions = getAdDimensions();

  return (
    <div className={`adsense-container responsive w-full flex justify-center items-center ${className}`}>
      <div className="adsense-wrapper w-full flex justify-center">
        {/* Actual AdSense code - commented out until AdSense account is set up
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: dimensions.width,
            height: dimensions.height,
            ...(format === 'responsive' && {
              width: '100%',
              height: 'auto',
              minHeight: '100px'
            })
          }}
          data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXXX'}
          data-ad-slot={slot}
          data-ad-format={format === 'responsive' ? 'auto' : undefined}
          data-full-width-responsive={format === 'responsive' ? 'true' : undefined}
        />
        */}
        
        {/* Placeholder for development and production */}
        <div
          className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium"
          style={{
            width: format === 'responsive' ? '100%' : `min(${dimensions.width}, 100%)`,
            height: dimensions.height,
            minHeight: format === 'responsive' ? '100px' : dimensions.height,
            maxWidth: format === 'responsive' ? '100%' : dimensions.width
          }}
        >
          <div className="text-center p-4 break-words">
            AdSense Ad Placeholder ({format})
            <br />
            Slot: {slot}
          </div>
        </div>
      </div>
    </div>
  );
}