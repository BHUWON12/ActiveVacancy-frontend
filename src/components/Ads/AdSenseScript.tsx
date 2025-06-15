import React from 'react';

export default function AdSenseScript() {
  // Commented out until AdSense account is set up
  /*
  React.useEffect(() => {
    try {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_ADSENSE_CLIENT_ID}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    } catch (err) {
      console.error('Error loading AdSense script:', err);
    }
  }, []);
  */

  return null;
} 