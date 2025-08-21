import React, { useState, useEffect } from 'react';
import { Users, Target, Award, Heart, BookOpen, ChevronDown } from 'lucide-react';

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We exist to eliminate barriers between talented individuals and their dream careers.',
    },
    {
      icon: Users,
      title: 'People-First',
      description: 'Every decision we make puts job seekers and employers at the center of our considerations.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our technology to our customer service.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about connecting people with opportunities that transform lives.',
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-hover:hover {
          transform: translateY(-15px) scale(1.05);
          box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1);
        }
        .primary-gradient {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }
        .primary-gradient-light {
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
        }
      `}</style>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated background shapes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-100 opacity-40 animate-float"
            style={{
              width: `${60 + Math.random() * 100}px`,
              height: `${60 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Interactive cursor effect */}
        <div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-200/20 to-blue-300/20 blur-3xl transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            transform: `translate3d(0, ${scrollY * 0.1}px, 0)`
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center relative z-10">
          {/* Animated hero icon */}
          <div className="inline-flex items-center justify-center mb-8 animate-scale-in">
            <div className="relative">
              <div className="w-16 h-16 rounded-full primary-gradient flex items-center justify-center animate-pulse-glow">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="absolute inset-0 w-16 h-16 rounded-full bg-blue-400 animate-ping opacity-20"></div>
            </div>
          </div>

          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl animate-slide-up mb-6 relative">
            About Us
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-30 animate-shimmer"></div>
          </h1>
          
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-slide-up leading-relaxed" style={{animationDelay: '0.2s'}}>
            We are dedicated to making the job search process 
            <span className="text-blue-600 font-semibold"> faster</span> and 
            <span className="text-blue-600 font-semibold"> more efficient</span> for both job seekers and employers.
          </p>

          {/* Animated scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full animate-pulse-glow">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl relative">
              Our Story
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full mt-2"></div>
            </h2>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {[
              {
                title: "The Beginning",
                content: "activevacancy was born from a simple yet powerful observation: the job search process was broken. Too many talented individuals were struggling to find their dream jobs, while companies were missing out on exceptional candidates due to inefficient hiring processes."
              },
              {
                title: "The Revolution", 
                content: "In 2023, we set out to revolutionize the job search experience. Our platform was built on the belief that finding the right job shouldn't be a full-time job itself. We combined cutting-edge technology with human-centered design to create a seamless, efficient, and enjoyable job search experience."
              },
              {
                title: "Today's Impact",
                content: "Today, we're proud to have helped thousands of job seekers find their perfect roles and enabled hundreds of companies to build their dream teams. Our platform continues to evolve, incorporating the latest advancements in AI and machine learning to make job matching more accurate and efficient than ever."
              },
              {
                title: "Looking Forward",
                content: "As we look to the future, our commitment remains unwavering: to eliminate barriers between talented individuals and their dream careers, one successful match at a time."
              }
            ].map((story, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover relative group animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-0.5">
                  <div className="bg-white rounded-2xl h-full w-full"></div>
                </div>
                
                <div className="relative px-6 py-8 sm:p-10">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {story.content}
                  </p>
                  
                  {/* Floating accent dot */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-blue-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl relative">
              Our Values
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full mt-2"></div>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-6 card-hover group relative overflow-hidden animate-scale-in"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300 animate-pulse-glow">
                      <value.icon className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <h3 className="mt-4 text-lg font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500 text-center leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}