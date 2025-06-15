import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import LoadingSpinner from '../components/UI/LoadingSpinner';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Contact form submitted:', data);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      info: 'contact@activevacancy.com',
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setIsHovered(`info-${index}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className="flex justify-center">
                  <div className={`p-4 rounded-full transition-all duration-300 ${
                    isHovered === `info-${index}` ? 'bg-primary-100 scale-110' : 'bg-gray-50'
                  }`}>
                    <info.icon className={`h-8 w-8 transition-colors duration-300 ${
                      isHovered === `info-${index}` ? 'text-primary-600' : 'text-gray-600'
                    }`} />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">{info.title}</h3>
                <p className="mt-2 text-base text-gray-900 font-medium text-center">{info.info}</p>
                <p className="mt-1 text-sm text-gray-500 text-center">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-primary-100/50">
            <div className="px-6 py-8 sm:p-10">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary-100 rounded-full animate-ping"></div>
                      <CheckCircle className="h-16 w-16 text-primary-600 relative" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-2xl font-medium text-gray-900">Message Sent Successfully!</h3>
                  <p className="mt-2 text-gray-600">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-xl blur"></div>
                        <input
                          type="text"
                          id="name"
                          {...register('name', { 
                            required: 'Name is required',
                            minLength: {
                              value: 2,
                              message: 'Name must be at least 2 characters'
                            }
                          })}
                          className={`block w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-200 ${
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
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-xl blur"></div>
                        <input
                          type="email"
                          id="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                          className={`block w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-200 ${
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
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-xl blur"></div>
                        <input
                          type="text"
                          id="subject"
                          {...register('subject', { 
                            required: 'Subject is required',
                            minLength: {
                              value: 5,
                              message: 'Subject must be at least 5 characters'
                            }
                          })}
                          className={`block w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-200 ${
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
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-xl blur"></div>
                        <textarea
                          id="message"
                          rows={4}
                          {...register('message', { 
                            required: 'Message is required',
                            minLength: {
                              value: 10,
                              message: 'Message must be at least 10 characters'
                            }
                          })}
                          className={`block w-full px-4 py-3 rounded-xl border-2 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-200 ${
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
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
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
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}