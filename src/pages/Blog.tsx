import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const Blog: React.FC = () => {
  return (
    <>
      {/*
      <title>Blog - Latest Articles & News | ActiveVacancy</title>
      <meta name="description" content="Stay updated with the latest job market trends, career advice, and industry insights from ActiveVacancy's expert blog." />
      */}
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Blog: Insights, Advice, and Trends</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive articles on job searching, career development, industry news, and much more.
            Empower your career journey with expert advice from ActiveVacancy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Blog Post 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/400x250" alt="Blog Post Image" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <Link to="#" className="hover:text-primary-600 transition-colors duration-200">
                    The Future of Remote Work: What to Expect
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  <span className="font-medium">Date:</span> August 23, 2025 | <span className="font-medium">Category:</span> Industry Trends
                </p>
                <p className="text-gray-700 mb-4">
                  Dive into the evolving landscape of remote work and discover key trends shaping the future of employment.
                </p>
                <Link to="#" className="text-primary-600 hover:underline font-medium">Read More &rarr;</Link>
              </div>
            </div>

            {/* Placeholder Blog Post 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/400x250" alt="Blog Post Image" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <Link to="#" className="hover:text-primary-600 transition-colors duration-200">
                    5 Tips for Nailing Your Next Virtual Interview
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  <span className="font-medium">Date:</span> August 15, 2025 | <span className="font-medium">Category:</span> Career Advice
                </p>
                <p className="text-gray-700 mb-4">
                  Master the art of virtual interviews with these essential tips to make a lasting impression.
                </p>
                <Link to="#" className="text-primary-600 hover:underline font-medium">Read More &rarr;</Link>
              </div>
            </div>

            {/* Placeholder Blog Post 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/400x250" alt="Blog Post Image" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <Link to="#" className="hover:text-primary-600 transition-colors duration-200">
                    Understanding Visa Sponsorship: A Guide for Job Seekers
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  <span className="font-medium">Date:</span> August 10, 2025 | <span className="font-medium">Category:</span> Visa Jobs
                </p>
                <p className="text-gray-700 mb-4">
                  Navigate the complexities of visa-sponsored jobs with our comprehensive guide for international talent.
                </p>
                <Link to="#" className="text-primary-600 hover:underline font-medium">Read More &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">Career Development</h2>
          <p className="text-gray-700">
            (Placeholder for more career development articles)
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">Industry News</h2>
          <p className="text-gray-700">
            (Placeholder for more industry news articles)
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
