import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import Footer from '../Navigation/Footer';
import AdSenseScript from '../Ads/AdSenseScript';
import AdLayout from '../Ads/AdLayout';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AdSenseScript />
      
      <Navbar />
      
      <main className="flex-grow w-full">
        {/* Top Ad */}
        <div className="w-full mb-8 flex items-center justify-center bg-white px-4">
          <div className="w-full max-w-7xl">
            <AdLayout position="top" />
          </div>
        </div>
        
        <div className="w-full flex-grow flex flex-col lg:flex-row gap-8 px-4 mx-auto max-w-7xl">
          {/* Main Content */}
          <div className="flex-grow w-full">
            <Outlet />
          </div>
          
          {/* Sidebar Ad */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="w-full flex items-center justify-center bg-white">
              <AdLayout position="sidebar" className="sticky top-8" />
            </div>
          </aside>
        </div>
        
        {/* Bottom Ad */}
        <div className="w-full mt-8 flex items-center justify-center bg-white px-4">
          <div className="w-full max-w-7xl">
            <AdLayout position="bottom" />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 