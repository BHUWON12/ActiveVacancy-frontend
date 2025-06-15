import React, { useEffect, useState } from 'react';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({ slot, format = 'auto', style, responsive = true, className = '' }: AdSenseProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      // Initialize adsbygoogle
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setIsLoaded(true);
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Don't render anything if AdSense is not loaded
  if (!isLoaded) return null;

  return (
    <div className={`w-full h-auto bg-gray-50 border border-dashed border-gray-400 flex items-center justify-center text-gray-600 text-sm ${className}`}>
      <ins
        className="adsbygoogle block"
        style={{
          display: 'block',
          textAlign: 'center',
          margin: '0 auto',
          ...style,
        }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Replace with your publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
      {!window.adsbygoogle && (
        <p className="text-center w-full break-words min-w-0">AdSense Ad Placeholder ({format})</p>
      )}
    </div>
  );
} 