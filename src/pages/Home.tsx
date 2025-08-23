import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Briefcase, Building, Users, Sparkles, Star, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const trustedCompanies = [
  { name: 'Google', logo: '/images/companies/google.png' },
  { name: 'Microsoft', logo: '/images/companies/microsoft.png' },
  { name: 'Amazon', logo: '/images/companies/amazon.png' },
  { name: 'Meta', logo: '/images/companies/meta.png' },
  { name: 'Apple', logo: '/images/companies/apple.png' },
  { name: 'Netflix', logo: '/images/companies/netflix.png' },
];

const FloatingOrb = ({ delay = 0, duration = 20, size = 'w-32 h-32' }) => (
  <div 
    className={`absolute ${size} rounded-full bg-gradient-to-r from-primary-400/20 to-primary-600/30 blur-xl animate-pulse`}
    style={{
      animation: `float ${duration}s infinite ease-in-out`,
      animationDelay: `${delay}s`,
    }}
  />
);

const ParticleField = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary-400/30 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-3deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes morphing {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 55% 40% 50% 65% / 55% 65% 35% 45%; }
          75% { border-radius: 30% 55% 35% 65% / 65% 55% 45% 35%; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        .morphing-blob {
          animation: morphing 8s ease-in-out infinite;
        }
        
        .glow-effect {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-primary-500/3 to-transparent"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
            }}
          />
          <ParticleField />
          
          {/* Floating Orbs */}
          <div className="absolute top-20 left-10">
            <FloatingOrb delay={0} duration={25} size="w-40 h-40" />
          </div>
          <div className="absolute top-40 right-20">
            <FloatingOrb delay={3} duration={20} size="w-24 h-24" />
          </div>
          <div className="absolute bottom-20 left-1/4">
            <FloatingOrb delay={6} duration={30} size="w-32 h-32" />
          </div>
          
          {/* Morphing Blob */}
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-primary-300/10 to-primary-600/20 morphing-blob"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50/80 backdrop-blur-sm border border-primary-200/50 text-primary-700 text-sm font-medium mb-8 hover:scale-105 transition-transform duration-300">
              <Star className="w-4 h-4 mr-2" />
              #one of the top Job Platform Worldwide
              <Sparkles className="w-4 h-4 ml-2" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-black text-gray-900 leading-none">
              <span className="inline-block hover:scale-105 transition-transform duration-500">Find Your</span>
              <span className="block mt-2 bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 shimmer hover:scale-105 transition-transform duration-500">
                Dream Job,
              </span>
              <span className="block mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-600 hover:scale-105 transition-transform duration-500">
                Build Your Future
              </span>
            </h1>
            
            <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              Discover opportunities that match your skills and aspirations. Join millions of professionals who found their perfect career match.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/jobs" className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-2xl shadow-primary-600/25 hover:shadow-3xl hover:shadow-primary-600/40 hover:-translate-y-1 glow-effect overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Search className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Browse 5K+ Jobs
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link to="/visajobs" className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-300 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:shadow-primary-200/30 hover:-translate-y-1">
                <TrendingUp className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Visa Jobs
              </Link>
            </div>
            
            {/* Stats Preview */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-black text-primary-600 group-hover:scale-110 transition-transform duration-300">5K+</div>
                <div className="text-sm text-gray-500 mt-1">Active Jobs</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-black text-primary-600 group-hover:scale-110 transition-transform duration-300">100k+</div>
                <div className="text-sm text-gray-500 mt-1">Job Seekers</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-black text-primary-600 group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-sm text-gray-500 mt-1">Companies</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Companies Section */}
      <div id="companies" className="relative bg-gradient-to-b from-white to-gray-50/50 py-20">
        <div className="absolute inset-0 opacity-30"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundPosition: 'center'
             }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-primary-100/50 backdrop-blur-sm border border-primary-200/30 text-primary-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Industry Leaders
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Trusted by <span className="text-primary-600">Global Giants</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals working at the world's most innovative companies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustedCompanies.map((company, index) => (
              <div
                key={index}
                className={`group relative h-40 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md rounded-3xl shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary-200/30 transition-all duration-500 border border-gray-100/50 hover:border-primary-200/50 hover:-translate-y-2 ${
                  isVisible.companies ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-w-[85%] max-h-[85%] object-contain filter group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div id="stats" className="relative bg-gradient-to-b from-gray-50/50 to-white py-20">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-72 h-72 bg-gradient-to-r from-primary-400/10 to-primary-600/20 rounded-full blur-3xl morphing-blob"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-r from-primary-300/8 to-primary-500/15 rounded-full blur-3xl morphing-blob" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: Search, title: 'Smart Job Matching', desc: 'AI-powered algorithm finds your perfect match in seconds', color: 'from-blue-500 to-primary-600' },
              { icon: Building, title: 'Premium Companies', desc: 'Direct connections with Fortune 500 and unicorn startups', color: 'from-primary-500 to-purple-600' },
              { icon: Users, title: 'Career Acceleration', desc: 'Expert guidance and resources to fast-track your growth', color: 'from-purple-500 to-pink-600' }
            ].map((item, index) => (
              <div
                key={index}
                className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/30 p-8 hover:shadow-2xl hover:shadow-primary-200/40 transition-all duration-500 border border-gray-100/50 hover:border-primary-200/50 hover:-translate-y-3 ${
                  isVisible.stats ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${item.color} p-1 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mx-auto shadow-lg`}>
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                      <item.icon className="h-10 w-10 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revolutionary Features Section */}
      <div id="features" className="relative py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-primary-400/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold mb-6 shadow-lg shadow-primary-600/30 hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 mr-2" />
              Next-Generation Platform
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Why Choose 
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400">
                activevacancy?
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of job searching with cutting-edge technology and unmatched opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Matching',
                desc: 'Revolutionary machine learning algorithms analyze your skills, experience, and preferences to find the perfect opportunities.',
                gradient: 'from-yellow-400 to-orange-500',
                bgGradient: 'from-yellow-50 to-orange-50'
              },
              {
                icon: Briefcase,
                title: 'Premium Resources',
                desc: 'Access exclusive interview prep, salary negotiation guides, and career coaching from industry experts.',
                gradient: 'from-green-400 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50'
              },
              {
                icon: Building,
                title: 'Company Intelligence',
                desc: 'Deep insights into company culture, salary ranges, growth opportunities, and employee satisfaction scores.',
                gradient: 'from-purple-400 to-indigo-500',
                bgGradient: 'from-purple-50 to-indigo-50'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/20 p-8 hover:shadow-2xl transition-all duration-700 border border-gray-100/50 hover:border-primary-200/50 hover:-translate-y-4 ${
                  isVisible.features ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-1 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-gray-700" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 w-3 h-3 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-primary-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" style={{ transitionDelay: '200ms' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-24 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 overflow-hidden">
        <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 0l100 100M100 0L0 100' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3C/svg%3E")`,
               backgroundPosition: 'center'
             }}></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-primary-100 mb-10 leading-relaxed">
            Join millions of professionals who've found their dream jobs. Your perfect opportunity is waiting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative inline-flex items-center px-10 py-5 text-xl font-bold rounded-2xl text-primary-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl shadow-black/10 hover:shadow-3xl hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Search className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Start Job Hunt
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button className="inline-flex items-center px-10 py-5 text-xl font-bold rounded-2xl text-white bg-primary-700/50 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 hover:bg-primary-700/70 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <Users className="mr-3 h-6 w-6" />
              Join Community
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}