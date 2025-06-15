import React from 'react';
import { Users, Target, Award, Heart, BookOpen } from 'lucide-react';

export default function About() {
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About Us
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We are dedicated to making the job search process faster and more efficient for both job seekers and employers.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full">
              <BookOpen className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Story
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-8 sm:p-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">The Beginning</h3>
                <p className="text-gray-600">
                  activevacancy was born from a simple yet powerful observation: the job search process was broken. Too many talented individuals were struggling to find their dream jobs, while companies were missing out on exceptional candidates due to inefficient hiring processes.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-8 sm:p-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">The Revolution</h3>
                <p className="text-gray-600">
                  In 2023, we set out to revolutionize the job search experience. Our platform was built on the belief that finding the right job shouldn't be a full-time job itself. We combined cutting-edge technology with human-centered design to create a seamless, efficient, and enjoyable job search experience.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-8 sm:p-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Today's Impact</h3>
                <p className="text-gray-600">
                  Today, we're proud to have helped thousands of job seekers find their perfect roles and enabled hundreds of companies to build their dream teams. Our platform continues to evolve, incorporating the latest advancements in AI and machine learning to make job matching more accurate and efficient than ever.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-8 sm:p-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Looking Forward</h3>
                <p className="text-gray-600">
                  As we look to the future, our commitment remains unwavering: to eliminate barriers between talented individuals and their dream careers, one successful match at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center">
                  <div className="p-3 bg-primary-100 rounded-full">
                    <value.icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">{value.title}</h3>
                <p className="mt-2 text-base text-gray-500 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}