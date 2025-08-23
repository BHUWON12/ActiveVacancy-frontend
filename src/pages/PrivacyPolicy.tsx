import React, { useState } from 'react';
import { Shield, Eye, Lock, Users, Database, Globe, Phone, Mail, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: Shield },
    { id: 'collection', title: 'Information We Collect', icon: Database },
    { id: 'usage', title: 'How We Use Your Information', icon: Eye },
    { id: 'sharing', title: 'Information Sharing', icon: Users },
    { id: 'security', title: 'Data Security', icon: Lock },
    { id: 'international', title: 'International Transfers', icon: Globe },
    { id: 'retention', title: 'Data Retention', icon: FileText },
    { id: 'rights', title: 'Your Rights', icon: CheckCircle },
    { id: 'cookies', title: 'Cookies & Tracking', icon: AlertCircle },
    { id: 'contact', title: 'Contact Us', icon: Phone }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <head>
        <title>Privacy Policy | ActiveVacancy - Your Data Protection Rights</title>
        <meta name="description" content="ActiveVacancy Privacy Policy - Learn how we protect your personal information, job application data, and visa documentation across 25+ countries." />
        <meta name="keywords" content="privacy policy, data protection, job portal privacy, visa application privacy, international job security" />
      </head>

      {/* Hero Section - Improved Theme */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-blue-200" />
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your privacy is our priority. Learn how ActiveVacancy protects your personal information 
              and job application data across our international job placement services.
            </p>
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-sm">Last Updated: August 23, 2025</p>
            </div>
          </div>
        </div>

        {/* Navigation & Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Quick Navigation</h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                          activeSection === section.id
                            ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-lg">
                
                {/* Overview Section */}
                <section id="overview" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                    Privacy Policy Overview
                  </h2>
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                      ActiveVacancy ("we," "our," or "us") is committed to protecting your privacy and ensuring 
                      the security of your personal information. This Privacy Policy explains how we collect, use, 
                      disclose, and safeguard your information when you use our job placement platform and related services.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
                      <strong className="text-yellow-800">Note:</strong> ActiveVacancy acts solely as a mediator between job seekers and the consultancies that facilitate overseas employment and visa opportunities. All payments, costs, documentation, legal processes, and related matters are handled directly by the respective consultancies. ActiveVacancy does not process or manage any financial transactions, legal documentation, or visa applications on behalf of users. All responsibility for these matters lies with the consultancy you are matched with.
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
                      <h3 className="font-bold text-blue-800 mb-2">What This Policy Covers</h3>
                      <ul className="text-blue-700 space-y-2">
                        <li>• Job application and profile information</li>
                        <li>• Visa and work permit documentation</li>
                        <li>• Communication records with employers and agencies</li>
                        <li>• International job placement services across 25+ countries</li>
                        <li>• Poland local jobs and EU opportunity matching</li>
                        <li>• Salary negotiation and contract processing data</li>
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                        <h4 className="font-bold text-green-800">GDPR Compliant</h4>
                        <p className="text-sm text-green-700">Full compliance with European data protection standards</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <Lock className="w-8 h-8 text-blue-600 mb-2" />
                        <h4 className="font-bold text-blue-800">Secure Storage</h4>
                        <p className="text-sm text-blue-700">256-bit encryption for all sensitive documents</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <Globe className="w-8 h-8 text-purple-600 mb-2" />
                        <h4 className="font-bold text-purple-800">Global Standards</h4>
                        <p className="text-sm text-purple-700">International privacy law compliance</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information Collection */}
                <section id="collection" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Database className="w-8 h-8 text-blue-600" />
                    Information We Collect
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-purple-700 mb-1">Phone Support</h4>
                            <p className="text-purple-600 text-sm">Call our privacy hotline during business hours</p>
                          </div>
                          <div className="text-center">
                            <Shield className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                            <h4 className="font-semibold text-purple-700 mb-1">Online Portal</h4>
                            <p className="text-purple-600 text-sm">Submit requests through your account dashboard</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-purple-700 text-sm">
                          <strong>Response Time:</strong> We will respond to all privacy requests within 30 days. 
                          Complex requests may require up to 60 days with notification.
                        </p>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                      <h3 className="font-bold text-red-800 mb-3">Important Limitations</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Legal Restrictions</h4>
                          <ul className="text-red-600 text-sm space-y-1">
                            <li>• Visa applications in progress cannot be deleted</li>
                            <li>• Financial records must be retained per regulations</li>
                            <li>• Court orders may override deletion requests</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Technical Limitations</h4>
                          <ul className="text-red-600 text-sm space-y-1">
                            <li>• Backup systems may retain data temporarily</li>
                            <li>• Anonymized analytics cannot be reversed</li>
                            <li>• Third-party systems may have separate retention</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Cookies & Tracking */}
                <section id="cookies" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-blue-600" />
                    Cookies & Online Tracking
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-4">Types of Cookies We Use</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-3">Essential Cookies</h4>
                          <ul className="text-blue-600 text-sm space-y-2">
                            <li>• Authentication and session management</li>
                            <li>• Security and fraud prevention</li>
                            <li>• Basic website functionality</li>
                            <li>• Language and region preferences</li>
                            <li><em>These cannot be disabled</em></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-3">Optional Cookies</h4>
                          <ul className="text-blue-600 text-sm space-y-2">
                            <li>• Analytics and performance tracking</li>
                            <li>• Job recommendation improvements</li>
                            <li>• Marketing and advertising personalization</li>
                            <li>• Social media integration</li>
                            <li><em>These can be controlled in settings</em></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-4">Third-Party Services</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-green-700 mb-2">Google Analytics</h4>
                          <p className="text-green-600 text-sm">Website usage statistics and user behavior analysis</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-green-700 mb-2">Facebook Pixel</h4>
                          <p className="text-green-600 text-sm">Social media integration and targeted advertising</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-green-700 mb-2">Hotjar</h4>
                          <p className="text-green-600 text-sm">User experience improvement and heatmap analysis</p>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Manage Cookie Preferences
                        </button>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-4">Mobile App Tracking</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Device Information</h4>
                          <ul className="text-yellow-600 text-sm space-y-1">
                            <li>• Device type, operating system version</li>
                            <li>• App usage patterns and crash reports</li>
                            <li>• Push notification preferences</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Location Services</h4>
                          <ul className="text-yellow-600 text-sm space-y-1">
                            <li>• Job location matching (with permission)</li>
                            <li>• Nearby opportunities alerts</li>
                            <li>• Regional salary comparisons</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section id="contact" className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Phone className="w-8 h-8 text-blue-600" />
                    Contact Us
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-4">Privacy Officer Contact</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="font-semibold text-blue-800">Email</p>
                                <p className="text-blue-600">privacy@activevacancy.com</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="font-semibold text-blue-800">Privacy Hotline</p>
                                <p className="text-blue-600">+977-1-4567890 (Nepal)</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Globe className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="font-semibold text-blue-800">International</p>
                                <p className="text-blue-600">+48-22-123-4567 (Poland)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-3">Office Hours</h4>
                            <div className="space-y-2 text-gray-600">
                              <p><strong>Nepal:</strong> Sunday - Friday, 9:00 AM - 6:00 PM NST</p>
                              <p><strong>Poland:</strong> Monday - Friday, 9:00 AM - 5:00 PM CET</p>
                              <p><strong>UAE:</strong> Sunday - Thursday, 9:00 AM - 6:00 PM GST</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-4">Regulatory Contacts</h3>
                      <p className="text-green-700 mb-4">
                        If you're not satisfied with our response to your privacy concerns, you have the right to 
                        lodge a complaint with the relevant data protection authority:
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-green-700 mb-2">European Users</h4>
                          <p className="text-green-600 text-sm">European Data Protection Board (EDPB)</p>
                          <p className="text-green-600 text-sm">www.edpb.europa.eu</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-green-700 mb-2">Nepal Users</h4>
                          <p className="text-green-600 text-sm">Ministry of Communication and Information Technology</p>
                          <p className="text-green-600 text-sm">www.mocit.gov.np</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-green-700 mb-2">Other Jurisdictions</h4>
                          <p className="text-green-600 text-sm">Contact your local data protection authority</p>
                          <p className="text-green-600 text-sm">We will provide specific contacts upon request</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-4">Policy Updates</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2">Notification Method</h4>
                          <ul className="text-blue-600 text-sm space-y-1">
                            <li>• Email notification to registered users</li>
                            <li>• Prominent website banner for 30 days</li>
                            <li>• SMS alerts for significant changes</li>
                            <li>• In-app notifications for mobile users</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2">Review Schedule</h4>
                          <ul className="text-blue-600 text-sm space-y-1">
                            <li>• Annual comprehensive review</li>
                            <li>• Updates when laws change</li>
                            <li>• Service expansion modifications</li>
                            <li>• User feedback incorporation</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="text-center bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-gray-800 mb-3">Emergency Privacy Contact</h3>
                      <p className="text-gray-600 mb-4">
                        For urgent privacy matters or suspected data breaches affecting your account:
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                          Report Data Breach
                        </button>
                        <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                          Emergency Privacy Request
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Account Security Issue
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm mt-4">
                        Emergency contacts available 24/7 via WhatsApp: +977-98-1234-5678
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
