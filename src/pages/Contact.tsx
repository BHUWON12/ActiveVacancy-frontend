import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Sparkles, ChevronDown } from 'lucide-react';

// Simple LoadingSpinner component since it's imported
const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };
  
  return (
    <div className={`${sizeClasses[size]} ${className} animate-spin rounded-full border-2 border-gray-300 border-t-white`}></div>
  );
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject || formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }
    
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Contact form submitted:', formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      info: 'activevacancy.root@gmail.com',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm PST',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: '123 Innovation Drive, San Francisco, CA 94105',
      description: 'Come say hello at our office',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      info: 'Monday - Friday: 8am - 6pm PST',
      description: 'We respond within 24 hours',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
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
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-hover:hover {
          transform: translateY(-15px) scale(1.05);
          box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1);
        }
        .input-glow {
          transition: all 0.3s ease;
        }
        .input-glow:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.2);
          transform: scale(1.02);
        }
        .form-float {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.95);
        }
      `}</style>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated background shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-100 opacity-30 animate-float"
            style={{
              width: `${40 + Math.random() * 80}px`,
              height: `${40 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
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
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-400/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center">
            {/* Animated hero icon */}
            <div className="inline-flex items-center justify-center mb-8 animate-scale-in">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center animate-pulse-glow">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="absolute inset-0 w-16 h-16 rounded-full bg-blue-400 animate-ping opacity-20"></div>
              </div>
            </div>

            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl animate-slide-up relative">
              Get in Touch
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-30 animate-shimmer"></div>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-slide-up leading-relaxed" style={{animationDelay: '0.2s'}}>
              Have questions? We're here to help. Reach out to us and we'll respond as 
              <span className="text-blue-600 font-semibold"> soon as possible</span>.
            </p>

            {/* Animated scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 card-hover group relative overflow-hidden animate-scale-in"
                style={{animationDelay: `${index * 0.1}s`}}
                onMouseEnter={() => setIsHovered(`info-${index}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center">
                    <div className={`p-4 rounded-full transition-all duration-300 animate-pulse-glow ${
                      isHovered === `info-${index}` ? 'bg-blue-100 scale-110' : 'bg-gray-50'
                    }`}>
                      <info.icon className={`h-8 w-8 transition-colors duration-300 ${
                        isHovered === `info-${index}` ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors duration-300">
                    {info.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-900 font-medium text-center">
                    {info.info}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 text-center group-hover:text-gray-600 transition-colors duration-300">
                    {info.description}
                  </p>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>

                {/* Floating accent dot */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-12 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="form-float rounded-3xl shadow-2xl overflow-hidden card-hover border border-white/20">
            <div className="px-6 py-8 sm:p-10">
              {isSuccess ? (
                <div className="text-center py-12 animate-scale-in">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
                      <CheckCircle className="h-16 w-16 text-blue-600 relative animate-pulse-glow" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`block w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm input-glow transition-all duration-200 ${
                            errors.name ? 'border-red-300' : 'border-gray-200'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600 flex items-center animate-slide-up">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`block w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm input-glow transition-all duration-200 ${
                            errors.email ? 'border-red-300' : 'border-gray-200'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center animate-slide-up">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className={`block w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm input-glow transition-all duration-200 ${
                            errors.subject ? 'border-red-300' : 'border-gray-200'
                          }`}
                          placeholder="How can we help you?"
                        />
                        {errors.subject && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                      {errors.subject && (
                        <p className="mt-2 text-sm text-red-600 flex items-center animate-slide-up">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={`block w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm input-glow transition-all duration-200 resize-none ${
                            errors.message ? 'border-red-300' : 'border-gray-200'
                          }`}
                          placeholder="Tell us more about your inquiry..."
                        />
                        {errors.message && (
                          <div className="absolute top-3 right-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                      {errors.message && (
                        <p className="mt-2 text-sm text-red-600 flex items-center animate-slide-up">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="animate-slide-up" style={{animationDelay: '0.5s'}}>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg animate-pulse-glow"
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}