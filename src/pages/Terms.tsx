import React, { useState } from 'react';
import { FileText, Users, Shield, Globe, AlertTriangle, CheckCircle, Scale, Phone, Mail, Clock, CreditCard, MapPin } from 'lucide-react';

const Terms: React.FC = () => {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: FileText },
    { id: 'definitions', title: 'Definitions', icon: Users },
    { id: 'services', title: 'Services Offered', icon: Globe },
    { id: 'eligibility', title: 'User Eligibility', icon: CheckCircle },
    { id: 'responsibilities', title: 'User Responsibilities', icon: Shield },
    { id: 'fees', title: 'Fees & Payment', icon: CreditCard },
    { id: 'process', title: 'Job Placement Process', icon: MapPin },
    { id: 'guarantees', title: 'Service Guarantees', icon: Scale },
    { id: 'limitations', title: 'Limitations & Disclaimers', icon: AlertTriangle },
    { id: 'termination', title: 'Account Termination', icon: Clock },
    { id: 'contact', title: 'Contact Information', icon: Phone }
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

  {/* Hero Section */}
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="bg-gradient-to-r from-blue-100 via-white to-blue-200 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <Scale className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h1 className="text-5xl font-bold mb-4 text-blue-900">Terms & Conditions</h1>
              <p className="text-xl text-blue-700 max-w-3xl mx-auto">
                Legal agreement governing your use of ActiveVacancy's international job placement services<br />
                across 25+ countries including Nepal, Poland, UAE, Canada, and Australia.
              </p>
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block shadow">
                <p className="text-sm text-blue-800 font-medium">Effective Date: August 23, 2025 | Version 2.1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation & Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Table of Contents</h3>
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

                {/* Quick Stats */}
                <div className="mt-6 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">25+</div>
                      <div className="text-xs text-blue-700">Countries</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">94%</div>
                      <div className="text-xs text-green-700">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-lg">
                
                {/* Acceptance of Terms */}
                <section id="acceptance" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    1. Acceptance of Terms
                  </h2>
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                      By accessing, using, or registering for ActiveVacancy's services ("Platform"), you ("User", "Candidate", "Client") 
                      agree to be bound by these Terms and Conditions ("Agreement"). This Agreement constitutes a legally binding 
                      contract between you and ActiveVacancy Private Limited ("ActiveVacancy", "Company", "we", "us").
                    </p>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                      <h3 className="font-bold text-yellow-800 mb-2">⚠️ Important Notice</h3>
                      <p className="text-yellow-700">
                        If you do not agree to all terms in this Agreement, you must not access or use our services. 
                        Continued use of the Platform after changes to these terms constitutes acceptance of the modified Agreement.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="font-bold text-blue-800 mb-3">What This Agreement Covers</h4>
                        <ul className="text-blue-700 space-y-2">
                          <li>• International job placement services</li>
                          <li>• Visa and work permit assistance</li>
                          <li>• Document processing and verification</li>
                          <li>• Employer matching and interview coordination</li>
                          <li>• Post-placement support services</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-3">Legal Framework</h4>
                        <ul className="text-green-700 space-y-2">
                          <li>• Governed by Nepal Employment Laws</li>
                          <li>• International employment regulations</li>
                          <li>• Destination country immigration laws</li>
                          <li>• Data protection and privacy standards</li>
                          <li>• Consumer protection guidelines</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Definitions */}
                <section id="definitions" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    2. Definitions
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">"Services"</h4>
                        <p className="text-gray-600 text-sm">Job placement, visa assistance, document processing, interview coordination, and related employment facilitation services.</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">"Candidate"</h4>
                        <p className="text-gray-600 text-sm">Individual seeking international employment opportunities through ActiveVacancy's platform and services.</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">"Employer"</h4>
                        <p className="text-gray-600 text-sm">Verified companies and organizations seeking to hire international workers through our platform.</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">"Placement"</h4>
                        <p className="text-gray-600 text-sm">Successful matching and hiring of a candidate by an employer facilitated through ActiveVacancy.</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">"Documentation"</h4>
                        <p className="text-gray-600 text-sm">All certificates, permits, visas, contracts, and legal papers required for international employment.</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">"Processing Time"</h4>
                        <p className="text-gray-600 text-sm">Standard timeframe of 2-6 months for complete job placement and visa processing, varying by destination country.</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">"Service Fee"</h4>
                        <p className="text-gray-600 text-sm">Payment required for job placement services, typically ranging from $500-2000 depending on destination and job type.</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">"Poland Local Jobs"</h4>
                        <p className="text-gray-600 text-sm">Employment opportunities specifically within Poland offering EU residency pathways and local employment contracts.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Services Offered */}
                <section id="services" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Globe className="w-8 h-8 text-blue-600" />
                    3. Services Offered
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-4">Core Job Placement Services</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <ul className="text-blue-700 space-y-2">
                          <li>• Profile creation and skill assessment</li>
                          <li>• Job matching with verified employers</li>
                          <li>• Interview scheduling and coordination</li>
                          <li>• Salary negotiation assistance</li>
                          <li>• Employment contract review</li>
                        </ul>
                        <ul className="text-blue-700 space-y-2">
                          <li>• Work visa application support</li>
                          <li>• Document authentication and translation</li>
                          <li>• Pre-departure orientation sessions</li>
                          <li>• Airport pickup coordination</li>
                          <li>• 6-month post-arrival support</li>
                        </ul>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-3">Destination Countries</h4>
                        <div className="text-green-700 text-sm space-y-1">
                          <div>🇵🇱 Poland (Local Jobs)</div>
                          <div>🇦🇪 UAE & Gulf States</div>
                          <div>🇨🇦 Canada</div>
                          <div>🇦🇺 Australia</div>
                          <div>🇬🇧 United Kingdom</div>
                          <div>🇶🇦 Qatar</div>
                          <div>+ 19 more countries</div>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-bold text-purple-800 mb-3">Job Categories</h4>
                        <div className="text-purple-700 text-sm space-y-1">
                          <div>• Construction & Manufacturing</div>
                          <div>• Healthcare & Nursing</div>
                          <div>• Hospitality & Tourism</div>
                          <div>• IT & Technology</div>
                          <div>• Agriculture & Farming</div>
                          <div>• Transport & Logistics</div>
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-bold text-orange-800 mb-3">Salary Ranges</h4>
                        <div className="text-orange-700 text-sm space-y-1">
                          <div>Poland: 3,400-5,200 PLN</div>
                          <div>UAE: 1,500-3,500 AED</div>
                          <div>Canada: 15-25 CAD/hr</div>
                          <div>Australia: 22-35 AUD/hr</div>
                          <div>UK: 12-20 GBP/hr</div>
                          <div>Qatar: 1,800-4,000 QAR</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-3">Service Limitations</h3>
                      <p className="text-yellow-700 mb-3">
                        While we strive for excellence, please note the following limitations:
                      </p>
                      <ul className="text-yellow-600 space-y-2">
                        <li>• We cannot guarantee job placement (success rate: 94%)</li>
                        <li>• Visa approval depends on destination country immigration policies</li>
                        <li>• Processing times vary based on documentation completeness</li>
                        <li>• Some positions require specific qualifications or experience levels</li>
                        <li>• Medical fitness and background checks must meet employer standards</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* User Eligibility */}
                <section id="eligibility" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                    4. User Eligibility Requirements
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-4">Basic Eligibility</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-3">Age & Legal Status</h4>
                          <ul className="text-green-600 space-y-1">
                            <li>• Minimum age: 21 years</li>
                            <li>• Maximum age: 45 years (varies by job type)</li>
                            <li>• Valid passport with 2+ years validity</li>
                            <li>• Clear criminal background record</li>
                            <li>• Mentally and physically fit for employment</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-700 mb-3">Education & Skills</h4>
                          <ul className="text-green-600 space-y-1">
                            <li>• Minimum SEE/SLC or equivalent education</li>
                            <li>• Relevant work experience (2+ years preferred)</li>
                            <li>• Basic English communication skills</li>
                            <li>• Technical skills matching job requirements</li>
                            <li>• Willingness to work internationally</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-bold text-blue-800 mb-4">Required Documentation</h3>
                        <ul className="text-blue-700 space-y-2">
                          <li>• Valid passport (original + copies)</li>
                          <li>• Educational certificates (attested)</li>
                          <li>• Work experience letters</li>
                          <li>• Medical fitness certificate</li>
                          <li>• Police clearance certificate</li>
                          <li>• Passport-sized photographs</li>
                          <li>• Bank statements (6 months)</li>
                          <li>• Marriage certificate (if applicable)</li>
                        </ul>
                      </div>
                      <div className="bg-red-50 p-6 rounded-lg">
                        <h3 className="font-bold text-red-800 mb-4">Disqualifying Factors</h3>
                        <ul className="text-red-700 space-y-2">
                          <li>• Criminal history or pending cases</li>
                          <li>• Previous immigration violations</li>
                          <li>• Serious medical conditions</li>
                          <li>• Fake or fraudulent documents</li>
                          <li>• Outstanding loans or legal issues</li>
                          <li>• Blacklisting by any country</li>
                          <li>• Incomplete or false information</li>
                          <li>• Age exceeding job-specific limits</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="font-bold text-purple-800 mb-4">Special Categories</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold text-purple-700 mb-2">Family Visa Candidates</h4>
                          <ul className="text-purple-600 text-sm space-y-1">
                            <li>• Spouse employment opportunities</li>
                            <li>• Children's education arrangements</li>
                            <li>• Family accommodation support</li>
                            <li>• Additional documentation required</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-700 mb-2">Skilled Workers</h4>
                          <ul className="text-purple-600 text-sm space-y-1">
                            <li>• Professional certifications</li>
                            <li>• Higher salary negotiations</li>
                            <li>• Faster processing times</li>
                            <li>• Better accommodation options</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-700 mb-2">First-time Migrants</h4>
                          <ul className="text-purple-600 text-sm space-y-1">
                            <li>• Additional orientation sessions</li>
                            <li>• Cultural adaptation support</li>
                            <li>• Extended post-arrival assistance</li>
                            <li>• Language learning resources</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* User Responsibilities */}
                <section id="responsibilities" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                    5. User Responsibilities & Obligations
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-4">Information Accuracy</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-3">Mandatory Requirements</h4>
                          <ul className="text-blue-600 space-y-2">
                            <li>• Provide complete and accurate personal information</li>
                            <li>• Submit authentic and valid documents only</li>
                            <li>• Update profile information when changes occur</li>
                            <li>• Respond promptly to communication requests</li>
                            <li>• Maintain confidentiality of login credentials</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-3">Prohibited Actions</h4>
                          <ul className="text-blue-600 space-y-2">
                            <li>• Submitting false or misleading information</li>
                            <li>• Using another person's identity or documents</li>
                            <li>• Attempting to manipulate the application process</li>
                            <li>• Sharing account access with unauthorized persons</li>
                            <li>• Engaging in fraudulent payment activities</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-4">Communication & Cooperation</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Response Requirements</h4>
                          <p className="text-yellow-600 mb-2">Candidates must respond to communications within specified timeframes:</p>
                          <ul className="text-yellow-600 space-y-1">
                            <li>• Interview invitations: Within 24 hours</li>
                            <li>• Document requests: Within 3-5 business days</li>
                            <li>• Employer communications: Within 48 hours</li>
                            <li>• Payment confirmations: Within 7 days</li>
                            <li>• Medical appointments: As scheduled</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Professional Conduct</h4>
                          <ul className="text-yellow-600 space-y-1">
                            <li>• Maintain professional behavior in all interactions</li>
                            <li>• Attend scheduled meetings and interviews punctually</li>
                            <li>• Follow guidance provided by our counselors</li>
                            <li>• Respect employer requirements and cultural norms</li>
                            <li>• Honor commitments made during the placement process</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                      <h3 className="font-bold text-red-800 mb-4">Consequences of Non-Compliance</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Account Actions</h4>
                          <ul className="text-red-600 space-y-1">
                            <li>• Warning notices for minor violations</li>
                            <li>• Temporary account suspension</li>
                            <li>• Permanent account termination</li>
                            <li>• Blacklisting from future services</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Financial & Legal</h4>
                          <ul className="text-red-600 space-y-1">
                            <li>• Forfeiture of paid service fees</li>
                            <li>• Legal action for fraud or misrepresentation</li>
                            <li>• Reporting to relevant authorities</li>
                            <li>• Liability for damages incurred</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Fees & Payment */}
                <section id="fees" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                    6. Service Fees & Payment Terms
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-4">Service Fee Structure</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-3">Standard Fees by Destination</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-green-600">
                              <span>Poland (Local Jobs)</span>
                              <span className="font-semibold">$800 - $1,200</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                              <span>UAE & Gulf Countries</span>
                              <span className="font-semibold">$1,000 - $1,500</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                              <span>Canada & Australia</span>
                              <span className="font-semibold">$1,500 - $2,000</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                              <span>UK & Europe</span>
                              <span className="font-semibold">$1,200 - $1,800</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                              <span>Other Countries</span>
                              <span className="font-semibold">$500 - $1,500</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-700 mb-3">What's Included</h4>
                          <ul className="text-green-600 space-y-1">
                            <li>• Complete job placement assistance</li>
                            <li>• Visa application support</li>
                            <li>• Document processing and verification</li>
                            <li>• Interview preparation and coordination</li>
                            <li>• Pre-departure orientation</li>
                            <li>• Airport pickup arrangement</li>
                            <li>• 6-month post-arrival support</li>
                            <li>• Emergency assistance hotline</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-4">Payment Schedule & Methods</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-700 mb-2">Phase 1: Registration</h4>
                          <div className="text-blue-600 text-sm space-y-1">
                            <div>Amount: 30% of total fee</div>
                            <div>When: Profile creation</div>
                            <div>Purpose: Initial processing</div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-700 mb-2">Phase 2: Job Offer</h4>
                          <div className="text-blue-600 text-sm space-y-1">
                            <div>Amount: 50% of total fee</div>
                            <div>When: Job offer received</div>
                            <div>Purpose: Visa processing</div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-700 mb-2">Phase 3: Departure</h4>
                          <div className="text-blue-600 text-sm space-y-1">
                            <div>Amount: 20% of total fee</div>
                            <div>When: Before travel</div>
                            <div>Purpose: Final arrangements</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-semibold text-blue-700 mb-3">Accepted Payment Methods</h4>
                        <div className="grid md:grid-cols-4 gap-3">
                          <div className="bg-white p-3 rounded text-center">
                            <div className="font-semibold text-blue-600">Bank Transfer</div>
                            <div className="text-blue-500 text-sm">Nepal & International</div>
                          </div>
                          <div className="bg-white p-3 rounded text-center">
                            <div className="font-semibold text-blue-600">eSewa/Khalti</div>
                            <div className="text-blue-500 text-sm">Digital Wallets</div>
                          </div>
                          <div className="bg-white p-3 rounded text-center">
                            <div className="font-semibold text-blue-600">Credit/Debit Cards</div>
                            <div className="text-blue-500 text-sm">Visa/Mastercard</div>
                          </div>
                          <div className="bg-white p-3 rounded text-center">
                            <div className="font-semibold text-blue-600">Cash Payment</div>
                            <div className="text-blue-500 text-sm">Office Locations</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-4">Refund Policy</h3>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-yellow-700 mb-2">Eligible for Refund</h4>
                            <ul className="text-yellow-600 space-y-1">
                              <li>• Company unable to provide job offer within 6 months</li>
                              <li>• Visa rejection due to ActiveVacancy's error</li>
                              <li>• Service cancellation within 7 days of registration</li>
                              <li>• Medical unfitness discovered after payment</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-yellow-700 mb-2">Non-Refundable</h4>
                            <ul className="text-yellow-600 space-y-1">
                              <li>• Candidate's change of mind</li>
                              <li>• Document fraud or false information</li>
                              <li>• Visa rejection due to candidate issues</li>
                              <li>• Job rejection by candidate after offer</li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded">
                          <p className="text-yellow-800 text-sm">
                            <strong>Refund Processing:</strong> Approved refunds will be processed within 15-30 business days. 
                            Processing fees (10% of total amount) will be deducted from refunds.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Job Placement Process */}
                <section id="process" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <MapPin className="w-8 h-8 text-blue-600" />
                    7. Job Placement Process & Timeline
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-4">Step-by-Step Process</h3>
                      <div className="grid md:grid-cols-6 gap-4">
                        <div className="text-center">
                          <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="font-bold text-blue-800">1</span>
                          </div>
                          <h4 className="font-semibold text-blue-700 text-sm mb-1">Registration</h4>
                          <p className="text-blue-600 text-xs">Profile creation & document submission</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="font-bold text-blue-800">2</span>
                          </div>
                          <h4 className="font-semibold text-blue-700 text-sm mb-1">Verification</h4>
                          <p className="text-blue-600 text-xs">Document authentication & skills assessment</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="font-bold text-blue-800">3</span>
                          </div>
                          <h4 className="font-semibold text-blue-700 text-sm mb-1">Matching</h4>
                          <p className="text-blue-600 text-xs">Job opportunities identification</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="font-bold text-blue-800">4</span>
                          </div>
                          <h4 className="font-semibold text-blue-700 text-sm mb-1">Interview</h4>
                          <p className="text-blue-600 text-xs">Employer screening & selection</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="font-bold text-blue-800">5</span>
                          </div>
                          <h4 className="font-semibold text-blue-700 text-sm mb-1">Visa Processing</h4>
                          <p className="text-blue-600 text-xs">Work permit & visa application</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="font-bold text-blue-800">6</span>
                          </div>
                          <h4 className="font-semibold text-blue-700 text-sm mb-1">Departure</h4>
                          <p className="text-blue-600 text-xs">Travel arrangements & support</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="font-bold text-green-800 mb-4">Standard Timeline</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-green-600">Registration to Job Matching</span>
                            <span className="font-semibold text-green-700">2-4 weeks</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-600">Interview to Job Offer</span>
                            <span className="font-semibold text-green-700">1-3 weeks</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-600">Visa Processing</span>
                            <span className="font-semibold text-green-700">4-12 weeks</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-600">Pre-departure Preparation</span>
                            <span className="font-semibold text-green-700">1-2 weeks</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-green-700 font-semibold">Total Timeline</span>
                            <span className="font-bold text-green-800">2-6 months</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="font-bold text-purple-800 mb-4">Factors Affecting Timeline</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-purple-700 mb-1">Faster Processing</h4>
                            <ul className="text-purple-600 text-sm space-y-1">
                              <li>• Complete documentation ready</li>
                              <li>• High-demand job categories</li>
                              <li>• Previous international experience</li>
                              <li>• Strong English skills</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-700 mb-1">Potential Delays</h4>
                            <ul className="text-purple-600 text-sm space-y-1">
                              <li>• Incomplete or incorrect documents</li>
                              <li>• Medical examination requirements</li>
                              <li>• Embassy/consulate processing times</li>
                              <li>• Employer-specific requirements</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-4">Candidate Obligations During Process</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Documentation Phase</h4>
                          <ul className="text-yellow-600 text-sm space-y-1">
                            <li>• Submit all required documents promptly</li>
                            <li>• Ensure documents are authentic and valid</li>
                            <li>• Complete medical examinations as scheduled</li>
                            <li>• Obtain police clearance certificates</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Interview Phase</h4>
                          <ul className="text-yellow-600 text-sm space-y-1">
                            <li>• Attend all scheduled interviews</li>
                            <li>• Prepare thoroughly for employer meetings</li>
                            <li>• Maintain professional appearance and conduct</li>
                            <li>• Respond to employer questions honestly</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Visa Phase</h4>
                          <ul className="text-yellow-600 text-sm space-y-1">
                            <li>• Attend embassy appointments punctually</li>
                            <li>• Provide additional documents if requested</li>
                            <li>• Complete biometric enrollment</li>
                            <li>• Keep passport available for visa stamping</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Service Guarantees */}
                <section id="guarantees" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Scale className="w-8 h-8 text-blue-600" />
                    8. Service Guarantees & Quality Assurance
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-4">Our Commitments</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-3">Service Quality</h4>
                          <ul className="text-green-600 space-y-2">
                            <li>• 94% success rate in job placements</li>
                            <li>• Verified employers across 25+ countries</li>
                            <li>• Transparent communication throughout process</li>
                            <li>• Professional counseling and guidance</li>
                            <li>• Regular progress updates and status reports</li>
                            <li>• 24/7 emergency support hotline</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-700 mb-3">Document Security</h4>
                          <ul className="text-green-600 space-y-2">
                            <li>• Secure handling of all personal documents</li>
                            <li>• Professional translation and attestation</li>
                            <li>• Government-approved authentication processes</li>
                            <li>• Return of original documents after visa approval</li>
                            <li>• Digital copies maintained for record-keeping</li>
                            <li>• Compliance with data protection regulations</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-4">Performance Standards</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">2-6</div>
                          <div className="text-blue-700 font-semibold mb-1">Months</div>
                          <div className="text-blue-600 text-sm">Complete placement timeline</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
                          <div className="text-blue-700 font-semibold mb-1">Hours</div>
                          <div className="text-blue-600 text-sm">Response time to queries</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                          <div className="text-blue-700 font-semibold mb-1">Months</div>
                          <div className="text-blue-600 text-sm">Post-arrival support period</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-4">What We Cannot Guarantee</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">External Factors</h4>
                          <ul className="text-yellow-600 space-y-1">
                            <li>• Government policy changes affecting visas</li>
                            <li>• Embassy/consulate processing delays</li>
                            <li>• Employer-specific requirement changes</li>
                            <li>• Economic conditions in destination countries</li>
                            <li>• Natural disasters or force majeure events</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Individual Circumstances</h4>
                          <ul className="text-yellow-600 space-y-1">
                            <li>• Personal health or medical issues</li>
                            <li>• Criminal background discoveries</li>
                            <li>• Educational qualification mismatches</li>
                            <li>• Language proficiency limitations</li>
                            <li>• Family or personal emergencies</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="font-bold text-purple-800 mb-4">Quality Assurance Process</h3>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="bg-purple-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                              <CheckCircle className="w-6 h-6 text-purple-800" />
                            </div>
                            <h4 className="font-semibold text-purple-700 text-sm">Employer Verification</h4>
                            <p className="text-purple-600 text-xs">All employers undergo background checks</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-purple-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Shield className="w-6 h-6 text-purple-800" />
                            </div>
                            <h4 className="font-semibold text-purple-700 text-sm">Document Authentication</h4>
                            <p className="text-purple-600 text-xs">Multi-level verification process</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-purple-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Users className="w-6 h-6 text-purple-800" />
                            </div>
                            <h4 className="font-semibold text-purple-700 text-sm">Regular Follow-ups</h4>
                            <p className="text-purple-600 text-xs">Continuous monitoring and support</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-purple-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Phone className="w-6 h-6 text-purple-800" />
                            </div>
                            <h4 className="font-semibold text-purple-700 text-sm">24/7 Support</h4>
                            <p className="text-purple-600 text-xs">Emergency assistance available</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Limitations & Disclaimers */}
                <section id="limitations" className="p-8 border-b">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-blue-600" />
                    9. Limitations & Disclaimers
                  </h2>
                  
                  <div className="space-y-6">
                      {/* Mediator Disclaimer */}
                      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
                        <h3 className="font-bold text-yellow-800 mb-2">Disclaimer: Mediator Role</h3>
                        <p className="text-yellow-700">
                          ActiveVacancy acts solely as a mediator between job seekers and third-party consultancies or employers. All payments, documentation, and legal matters are handled directly by the respective consultancies or employers. ActiveVacancy does not provide legal advice, guarantee visa approvals, or participate in financial transactions beyond service fees. Users are responsible for verifying all details and making informed decisions before proceeding.
                        </p>
                      </div>
                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                      <h3 className="font-bold text-red-800 mb-4">Service Limitations</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">No Absolute Guarantees</h4>
                          <p className="text-red-600 mb-2">
                            While we maintain a 94% success rate, ActiveVacancy cannot guarantee:
                          </p>
                          <ul className="text-red-600 space-y-1">
                            <li>• 100% job placement for all candidates</li>
                            <li>• Specific salary amounts or employment terms</li>
                            <li>• Visa approval by government authorities</li>
                            <li>• Exact timeline adherence in all cases</li>
                            <li>• Employer satisfaction or job retention</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Third-Party Dependencies</h4>
                          <p className="text-red-600 mb-2">
                            Our services depend on external parties beyond our control:
                          </p>
                          <ul className="text-red-600 space-y-1">
                            <li>• Government immigration policies and procedures</li>
                            <li>• Embassy/consulate processing times and requirements</li>
                            <li>• Employer hiring decisions and criteria changes</li>
                            <li>• Medical examination center availability</li>
                            <li>• Airlines and travel service providers</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-4">Liability Disclaimers</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Financial Liability</h4>
                          <ul className="text-yellow-600 space-y-1">
                            <li>• Maximum liability limited to service fees paid</li>
                            <li>• No compensation for opportunity costs</li>
                            <li>• No coverage for personal travel expenses</li>
                            <li>• No liability for third-party service failures</li>
                            <li>• No responsibility for currency fluctuation losses</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Consequential Damages</h4>
                          <ul className="text-yellow-600 space-y-1">
                            <li>• No liability for emotional distress</li>
                            <li>• No coverage for lost wages or income</li>
                            <li>• No responsibility for family disruption</li>
                            <li>• No liability for accommodation issues</li>
                            <li>• No coverage for medical emergencies abroad</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-4">Information Accuracy</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2">Website Content</h4>
                          <p className="text-blue-600 mb-2">
                            While we strive for accuracy, information on our platform is subject to change:
                          </p>
                          <ul className="text-blue-600 space-y-1">
                            <li>• Job listings may be updated or removed without notice</li>
                            <li>• Salary information is approximate and may vary</li>
                            <li>• Processing times are estimates based on past experience</li>
                            <li>• Country-specific requirements may change</li>
                            <li>• Success stories are individual experiences and may not be typical</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2">User Responsibility</h4>
                          <p className="text-blue-600">
                            Users are responsible for verifying all information independently and making 
                            informed decisions based on their personal circumstances and research.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-gray-800 mb-4">Force Majeure</h3>
                      <p className="text-gray-600 mb-3">
                        ActiveVacancy shall not be liable for delays or failures in performance resulting from circumstances 
                        beyond our reasonable control, including but not limited to:
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <ul className="text-gray-600 space-y-1">
                          <li>• Natural disasters and extreme weather</li>
                          <li>• War, terrorism, or civil unrest</li>
                          <li>• Government actions or policy changes</li>
                        </ul>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Pandemic or health emergencies</li>
                          <li>• Economic sanctions or trade restrictions</li>
                          <li>• Technology failures or cyber attacks</li>
                        </ul>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Labor strikes or industrial action</li>
                          <li>• Infrastructure failures or outages</li>
                          <li>• Other unforeseeable circumstances</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Application Process Section (No Account Creation) */}
                <section id="application-process" className="p-8 border-b">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <Clock className="w-8 h-8 text-blue-600" />
                      10. Application Process
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-bold text-blue-800 mb-4">How It Works</h3>
                        <ul className="text-blue-700 space-y-2">
                          <li>• Browse job and visa+job opportunities listed on ActiveVacancy</li>
                          <li>• Fill out the required details in the application form</li>
                          <li>• Your information is securely forwarded to the relevant consultancies</li>
                          <li>• Consultancies will contact you directly for further process</li>
                        </ul>
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mt-6">
                          <strong className="text-green-800">Note:</strong>
                          <span className="text-green-700"> ActiveVacancy does not charge job seekers directly. All service fees are charged to consultancies, not to applicants. There is no account creation process; we only list jobs and visa+job opportunities, and forward interested applicants' details to consultancies.</span>
                        </div>
                      </div>
                      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg">
                        <h3 className="font-bold text-yellow-800 mb-2">Disclaimer</h3>
                        <p className="text-yellow-700">
                          ActiveVacancy is only a mediator between job seekers and the consultancies that facilitate overseas jobs and visas. All payments, costs, documentation, and legal matters are handled by the respective consultancies, not by ActiveVacancy.
                        </p>
                      </div>
                    </div>
                </section>
                </div> {/* End .bg-white .rounded-lg .shadow-lg (Main Content) */}
              </div> {/* End .lg:w-3/4 */}
            </div> {/* End .flex .lg:flex-row */}
          </div> {/* End .max-w-7xl .mx-auto .px-4 .py-12 */}
        </div> {/* End .min-h-screen .bg-gradient-to-br */}
      </>
  );
}
export default Terms;