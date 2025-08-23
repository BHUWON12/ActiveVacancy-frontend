import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import AdSenseAd from '../AdSense/AdSenseAd';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* AdSense Ad in Footer 
        <div className="mb-8">
          <AdSenseAd 
            slot="footer-banner"
            format="horizontal"
            className="bg-gray-800 rounded-lg p-4"
          />
        </div>*/}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-500 animate-text-fade">
                  ACTIVE
                </span>
                <span className="text-2xl font-bold text-white animate-text-fade [animation-delay:2s]">
                  VACANCY
                </span>
              </div>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              The fastest way to find and apply for your dream job. Connect with top employers 
              and accelerate your career with activevacancy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Two Columns */}
          <div className="md:col-span-1 col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/visajobs" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Visa Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-white transition-colors duration-200">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/privacyPolicy" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/testimonials" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-500" />
                <span className="text-gray-300">contact@activevacancy.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-500" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-500" />
                <span className="text-gray-300">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} activevacancy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}