import React, { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSense: React.FC<AdSenseProps> = ({
  slot,
  style = {},
  format = 'auto',
  responsive = true,
  className = '',
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  if (!slot) {
    console.warn('AdSense: slot prop is required');
    return null;
  }

  const defaultStyle: React.CSSProperties = {
    display: 'block',
    textAlign: 'center',
    overflow: 'hidden',
    ...style,
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0',
    overflow: 'hidden',
    ...(responsive && {
      minHeight: '100px',
      '@media (max-width: 768px)': {
        minHeight: '50px',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        padding: '0 10px',
      },
    }),
  };

  return (
    <div className={`adsense-container ${responsive ? 'responsive' : ''} ${className}`}>
      <div className="adsense-wrapper">
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            overflow: 'hidden',
            ...style,
          }}
          data-ad-client={process.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    </div>
  );
};

// Responsive AdSense wrapper component
export const ResponsiveAdSense: React.FC<AdSenseProps> = (props) => {
  if (!props.slot) {
    console.warn('ResponsiveAdSense: slot prop is required');
    return null;
  }

  return (
    <div className="adsense-wrapper">
      <AdSense {...props} responsive={true} />
    </div>
  );
};

// Example usage components for different ad sizes
export const LeaderboardAd: React.FC<{ slot: string }> = ({ slot }) => {
  if (!slot) return null;
  return (
    <ResponsiveAdSense
      slot={slot}
      format="horizontal"
      className="w-full h-[90px] md:h-[250px]"
    />
  );
};

export const SidebarAd: React.FC<{ slot: string }> = ({ slot }) => {
  if (!slot) return null;
  return (
    <ResponsiveAdSense
      slot={slot}
      format="vertical"
      className="w-full h-[600px] md:h-[250px]"
    />
  );
};

export const InArticleAd: React.FC<{ slot: string }> = ({ slot }) => {
  if (!slot) return null;
  return (
    <ResponsiveAdSense
      slot={slot}
      format="auto"
      className="w-full my-4"
    />
  );
};

export const InFeedAd: React.FC<{ slot: string }> = ({ slot }) => {
  if (!slot) return null;
  return (
    <ResponsiveAdSense
      slot={slot}
      format="auto"
      className="w-full my-4"
    />
  );
}; 