import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Users, Briefcase, Globe, Shield, Headphones, Star, Clock, CheckCircle, MapPin, DollarSign, FileText, AlertCircle, TrendingUp, Award, Calendar, Phone } from 'lucide-react';

const FAQ: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      category: "Getting Started for Nepali Job Seekers",
      icon: <Star className="w-5 h-5" />,
      questions: [
        {
          id: "nepal-start-1",
          question: "How do I create an account on ActiveVacancy as a Nepali citizen?",
          answer: "Creating an account is completely free and designed specifically for Nepali job seekers looking for international opportunities! Click 'Sign Up' on our homepage, fill in your details including your Nepali address, mobile number, and email. You'll receive a verification email - make sure to check your spam folder. Once verified, complete your profile with your education from Nepali institutions, work experience, language skills (Nepali, Hindi, English), and specify your visa status and willingness to relocate. Our platform recognizes Nepali qualifications and helps match you with employers who sponsor visas."
        },
    {
      category: "Poland Local Jobs - Complete Guide",
      icon: <MapPin className="w-5 h-5" />,
      questions: [
        {
          id: "poland-1",
          question: "Why is Poland becoming the top choice for Nepali workers in Europe?",
          answer: "**Economic Advantages**: Poland has one of Europe's fastest-growing economies with 4%+ GDP growth, creating massive job opportunities. **EU Benefits**: As an EU member, work permit holders can eventually apply for EU permanent residency and citizenship, plus freedom to travel within 27 EU countries. **Cost-Effective Living**: Much lower living costs than Western Europe - rent 60% cheaper than Germany, food costs 40% lower than UK. **Cultural Similarity**: Strong Catholic tradition similar to Nepal's religious culture, family-oriented society, welcoming attitude toward foreign workers. **Language Learning**: Polish is easier for Nepalis to learn compared to German or Dutch, with growing English usage in major cities. **Strong Nepali Community**: Established Nepali communities in major cities providing support, cultural programs, and networking opportunities. **Career Growth**: Many international companies use Poland as European headquarters, offering excellent career advancement opportunities. **Geographic Location**: Central Europe location makes travel to other EU countries easy and affordable. **Government Support**: Poland actively welcomes foreign workers due to demographic challenges, with streamlined visa processes for non-EU citizens."
        },
        {
          id: "poland-2",
          question: "What are the most in-demand local jobs in Poland for Nepali workers?",
          answer: "**Manufacturing & Industrial Jobs (Highest Demand)**: **Automotive Industry**: Volkswagen (Poznań), Toyota (Walbrzych), Mercedes (Jawor) - assembly line workers, quality control, machine operators. Salary: 4,000-6,500 PLN/month. **Electronics Manufacturing**: LG Display (Wrocław), Samsung, Foxconn - component assembly, testing technicians, packaging specialists. Salary: 3,800-5,500 PLN/month. **Food Processing**: Animex, Sokołów S.A. - food production, packaging, quality inspection, machine maintenance. Salary: 3,500-5,000 PLN/month. **Construction & Infrastructure**: **Building Construction**: Residential and commercial construction workers, renovation specialists, painters, electricians, plumbers. Salary: 4,000-7,000 PLN/month. **Road Construction**: Highway and infrastructure projects, heavy machinery operators, concrete workers. Salary: 4,500-6,500 PLN/month. **Logistics & Warehousing**: **E-commerce Giants**: Amazon (multiple locations), Allegro warehouses - picking, packing, sorting, forklift operations. Salary: 3,800-5,200 PLN/month. **International Logistics**: DHL, UPS, FedEx - package handling, customs documentation, dispatch coordination. Salary: 4,000-5,500 PLN/month. **Agriculture & Seasonal Work**: **Fruit Harvesting**: Strawberry picking (May-August), apple harvesting (September-October), berry farms. Salary: 3,000-4,500 PLN/month during season. **Greenhouse Operations**: Tomato, cucumber, flower cultivation - planting, maintenance, harvesting. Year-round work available. **IT & Technology**: **Software Development**: Growing demand for English-speaking developers, especially in fintech and gaming industries. Salary: 8,000-15,000+ PLN/month. **Customer Support**: International companies need English/Hindi speaking support staff. Salary: 4,500-6,500 PLN/month."
        },
        {
          id: "poland-3",
          question: "How do I apply for work permits and what's the complete process?",
          answer: "**Types of Work Permits**: **National Work Permit (Type A)**: Most common, valid for specific employer and job, renewable annually, processing time 1-2 months. **EU Blue Card**: For university graduates with job offer paying at least 1.5x average Polish salary (~7,800 PLN/month), valid for 4 years, fast-track to permanent residency. **Seasonal Work Permit**: For agricultural and tourism work up to 9 months per year, simplified application process. **Intra-Corporate Transfer**: For employees transferred from company branches outside EU. **Step-by-Step Application Process**: **Phase 1 - Employer Application (4-6 weeks)**: Polish employer applies to local labor office (Urząd Pracy) for permission to hire foreign worker, must prove no EU citizen available for the job, receives positive labor market test decision. **Phase 2 - Worker Application (4-8 weeks)**: Submit application at Polish consulate in Nepal (or country of residence), required documents: valid passport, completed application form, employer's job offer and work permit approval, proof of accommodation in Poland, health insurance covering Poland, criminal background check from Nepal, educational certificates (translated and apostilled), medical certificate, application fee: ~340 PLN (~$85). **Phase 3 - Visa Processing (2-4 weeks)**: Work permit approval leads to work visa application, single or multiple entry visa options available, collect visa and travel to Poland. **Phase 4 - Arrival in Poland (within 30 days)**: Register at local municipality office, obtain PESEL number (Polish social security number), register with tax office, open Polish bank account. **Common Challenges**: Document translation and apostille requirements, long processing times during peak season (March-June), limited consulate appointments in Kathmandu. **Success Tips**: Apply through verified employers, ensure all documents properly translated, maintain consistent information across all applications, consider using legal assistance for complex cases."
        },
        {
          id: "poland-4",
          question: "What are the living costs and salary expectations in different Polish cities?",
          answer: "**Major Cities Salary & Cost Comparison**: **Warsaw (Capital)**: **Average Salaries**: Entry-level: 4,000-5,500 PLN, Experienced: 6,000-9,000 PLN, Skilled professionals: 8,000-15,000+ PLN. **Living Costs**: Rent (shared apartment): 1,200-1,800 PLN, Food: 800-1,200 PLN, Transportation: 110 PLN (monthly pass), Total monthly cost: 2,500-3,500 PLN. **Advantages**: Highest salaries, most job opportunities, excellent public transport, international environment. **Krakow (Cultural Hub)**: **Average Salaries**: Entry-level: 3,500-5,000 PLN, Experienced: 5,500-8,000 PLN, IT professionals: 7,000-12,000 PLN. **Living Costs**: Rent (shared): 1,000-1,500 PLN, Food: 700-1,000 PLN, Transportation: 106 PLN, Total: 2,200-3,000 PLN. **Advantages**: Lower living costs, beautiful historic city, growing tech scene, strong student population. **Wrocław (Silicon Valley of Poland)**: **Average Salaries**: Entry-level: 3,800-5,200 PLN, Tech workers: 6,500-11,000 PLN, Manufacturing: 4,200-6,000 PLN. **Living Costs**: Rent (shared): 900-1,400 PLN, Food: 650-950 PLN, Transportation: 100 PLN, Total: 2,000-2,800 PLN. **Advantages**: Major tech hub, excellent work-life balance, modern city infrastructure. **Gdansk (Tri-City)**: **Average Salaries**: Entry-level: 3,600-4,800 PLN, Logistics: 4,000-5,800 PLN, IT: 6,000-10,000 PLN. **Living Costs**: Rent (shared): 1,000-1,500 PLN, Food: 700-1,000 PLN, Transportation: 110 PLN, Total: 2,200-3,000 PLN. **Advantages**: Baltic Sea location, major port city, growing tourism industry. **Poznan (Industrial Center)**: **Average Salaries**: Manufacturing: 4,000-6,500 PLN, Logistics: 4,200-5,800 PLN, Services: 3,800-5,500 PLN. **Living Costs**: Rent (shared): 800-1,300 PLN, Food: 600-900 PLN, Transportation: 90 PLN, Total: 1,800-2,500 PLN. **Advantages**: Major automotive industry, lower living costs, central location."
        },
        {
          id: "poland-5",
          question: "How to find accommodation and housing in Poland as a Nepali worker?",
          answer: "**Housing Options**: **Shared Apartments (Most Popular for Newcomers)**: Share 2-3 bedroom apartment with other international workers, cost: 800-1,500 PLN/month including utilities, usually furnished, good way to make friends and learn Polish culture. **Single Room Rental**: Private room in shared apartment, cost: 1,200-2,200 PLN/month, more privacy, often includes kitchen and bathroom access. **Studio Apartments**: Complete independence, cost: 1,800-3,500 PLN/month depending on city and location, suitable for settled workers or those bringing family. **Employer-Provided Housing**: Some employers provide temporary accommodation for first 1-3 months, quality varies but usually basic furnished rooms, gives time to find permanent housing. **Best Websites for Housing**: **OLX.pl**: Largest classified ads site, many housing options, use Google Translate, be cautious of scams. **Otodom.pl**: Professional real estate site, verified listings, higher quality options. **Facebook Groups**: 'Mieszkania Warszawa', 'Rooms for Rent Krakow', active Nepali housing groups in major cities. **Gumtree Poland**: English-friendly site, popular among expats. **Finding Process**: **Online Search**: Use housing websites and Facebook groups, set up alerts for new listings, prepare required documents in advance. **Viewing Appointments**: Schedule multiple viewings in one day, bring ID and bank statements, ask about utilities and deposit requirements. **Application Requirements**: Proof of employment, first month's rent + deposit (usually 1-2 months rent), sometimes guarantor required for long-term leases. **Contracts**: Ensure written agreement, understand notice periods, check what's included in rent. **Areas to Consider**: **Budget-Friendly**: Praga (Warsaw), Nowa Huta (Krakow), suburbs with good transport connections. **Nepali Communities**: Ask existing Nepali workers for recommendations, join community WhatsApp groups for housing tips. **Safety**: Research neighborhood safety, check public transport connections, prefer areas with good lighting and security."
        },
        {
          id: "poland-6",
          question: "What's the process for learning Polish and integrating into local culture?",
          answer: "**Polish Language Learning**: **Government-Funded Courses**: Free Polish lessons for work permit holders, offered by local integration centers, basic to intermediate levels available, evening and weekend classes for working people. **Online Resources**: **Duolingo Polish**: Free basic course, good for starting, 15-20 minutes daily practice. **Babbel**: More comprehensive, paid service but high quality, focus on practical conversations. **iTalki**: One-on-one lessons with Polish tutors, practice conversation skills. **Local Language Schools**: **Berlitz Poland**: Professional courses, multiple cities, business Polish options. **Speak Up**: Chain of language schools, good for beginners, flexible scheduling. **University Extensions**: Many universities offer Polish courses for foreigners, often cheaper than private schools. **Cultural Integration Tips**: **Workplace Culture**: Punctuality is extremely important, direct communication style appreciated, learn basic Polish greetings and workplace phrases, participate in office celebrations and team events. **Social Customs**: **Greetings**: Firm handshakes, maintain eye contact, remove hat/cap indoors. **Dining**: Wait for host to begin eating, keep hands visible on table, learn basic food vocabulary. **Religious Respect**: Poland is 90% Catholic, respect religious holidays and customs, churches welcome all visitors respectfully. **Public Behavior**: Quiet on public transport, give seats to elderly and pregnant women, smoking only in designated areas. **Building Relationships**: **Join Activities**: Sports clubs, hobby groups, language exchange meetups, volunteer work opportunities. **Nepali Community**: Balance integration with maintaining Nepali identity, attend both Polish and Nepali cultural events, teach Polish friends about Nepali culture. **Common Mistakes to Avoid**: Not learning basic Polish (even taxi drivers appreciate effort), being too loud in public spaces, not respecting personal space, comparing everything to Nepal negatively. **Success Strategies**: Be patient with language learning, show genuine interest in Polish culture, ask colleagues for help with local customs, celebrate Polish holidays with local friends."
        },
        {
          id: "poland-7",
          question: "Healthcare system, social benefits, and worker rights in Poland",
          answer: "**Healthcare System (NFZ)**: **Public Healthcare**: Mandatory health insurance (around 9% of salary), covers basic medical services, hospitals, emergency care, prescription medications (partial coverage). **Registration Process**: Automatic enrollment with work permit, receive European Health Insurance Card, choose primary care doctor (family doctor). **Services Covered**: GP visits, specialist consultations (with referral), hospital treatment, emergency care, dental care (basic), pregnancy and childbirth care. **Private Healthcare**: **Additional Insurance**: Many employers offer private medical insurance, faster access to specialists, no waiting times, English-speaking doctors available. **Popular Providers**: Medicover, Luxmed, PZU - comprehensive coverage, modern facilities. **Social Benefits**: **Paid Leave**: Minimum 20 days annually (increases with experience), 14 paid public holidays, sick leave covered by social insurance. **Family Benefits**: Child allowance (500+ program), maternity/paternity leave, family support benefits. **Unemployment Benefits**: Available after minimum contribution period, job search support, retraining programs. **Worker Rights & Protections**: **Working Hours**: Standard 40 hours/week, maximum 48 hours including overtime, rest periods mandated by law. **Minimum Wage**: 3,490 PLN/month (2024), regularly increased by government, applies to all workers including foreigners. **Contract Types**: **Umowa o pracę** (employment contract): Full social benefits, job security, permanent or fixed-term options. **Umowa zlecenie** (contract work): Less security but more flexibility, lower social contributions. **Safety & Discrimination**: Workplace safety regulations strictly enforced, zero tolerance for discrimination, labor inspectorates monitor compliance, workers can report violations anonymously. **Trade Unions**: Right to join trade unions, collective bargaining coverage, legal representation available. **Dispute Resolution**: Labor courts for employment disputes, free legal aid available, mediation services provided. **Important Numbers**: Emergency: 112, Medical emergency: 999, Police: 997, Fire: 998. **Getting Help**: **State Labor Inspectorate**: Workplace violations, safety issues. **Ombudsman Office**: Rights violations, discrimination cases. **Legal Aid Centers**: Free consultation for employment issues."
        },
        {
          id: "poland-8",
          question: "Path to permanent residency and EU citizenship through Poland",
          answer: "**Permanent Residency Process**: **Timeline**: Eligible after 5 years of continuous legal residence, EU Blue Card holders: 5 years (or 2 years with Polish language certificate). **Requirements**: Stable income for 5 years, health insurance coverage, basic Polish language skills (A2 level), clean criminal record, integration course completion (optional but helpful). **Application Process**: Submit to local voivode office, processing time: 3-6 months, required documents: residence history, income statements, language certificate, health insurance proof, application fee: 640 PLN. **Benefits of Permanent Residency**: Unrestricted work rights in Poland, access to social benefits equal to citizens, freedom to travel within EU, ability to sponsor family members, pathway to citizenship. **Polish Citizenship Process**: **Through Residence**: After 3 years of permanent residency (total 8 years in Poland), OR 2 years if married to Polish citizen, OR immediate if parent/grandparent was Polish citizen. **Requirements**: B1 level Polish language proficiency, stable income and accommodation, knowledge of Polish history and constitution, oath of loyalty to Poland, renunciation of previous citizenship (Nepal doesn't allow dual citizenship). **Application Process**: Submit to local voivode office, interview in Polish required, extensive documentation, processing time: 6-24 months, application fee: 219 PLN. **Benefits of EU Citizenship**: **Freedom of Movement**: Live and work in any of 27 EU countries, no visa required for travel within EU, access to EU social security coordination. **Political Rights**: Vote in European Parliament elections, run for local office in any EU country, consular protection from any EU embassy worldwide. **Economic Benefits**: Access to EU job markets, start business anywhere in EU, access to EU education programs, social benefits coordination across EU. **Family Benefits**: Spouse and children can get residence permits, family reunification rights, inheritance rights, access to family social benefits. **Practical Considerations**: **Dual Citizenship**: Nepal doesn't recognize dual citizenship - you would need to renounce Nepali citizenship, consider carefully as this affects property rights in Nepal, travel to Nepal would require visa. **Maintaining Connections**: EU citizens can invest in Nepal as foreign investor, can sponsor family visits to Europe, strong Nepali diaspora community in EU for support. **Alternative Options**: EU permanent residency may be sufficient for most purposes, allows return to Nepal without losing status, maintains Nepali citizenship and property rights."
        }
      ]
        },{
          id: "nepal-start-2",
          question: "Is ActiveVacancy free for Nepali job seekers?",
          answer: "Yes, absolutely! ActiveVacancy is 100% free for all job seekers, including Nepali citizens. You can browse thousands of international jobs, apply to visa-sponsored positions, set up job alerts for specific countries, access our visa guidance resources, and use our resume builder - all without any charges. We understand the financial challenges of job searching internationally from Nepal, so we've made sure our platform is completely accessible to everyone."
        },
        {
          id: "nepal-start-3",
          question: "What makes ActiveVacancy different for Nepali job seekers?",
          answer: "ActiveVacancy specializes in connecting Nepali talent with international employers who actively sponsor work visas. Unlike general job boards, we focus on visa-sponsored opportunities and have partnerships with employers in UAE, Qatar, Malaysia, USA, Canada, Australia, UK, and EU countries. Our platform understands the unique challenges Nepali workers face - from visa requirements to skill recognition - and provides tailored support including document guidance, interview preparation, and visa application assistance."
        },
        {
          id: "nepal-start-4",
          question: "How do I optimize my profile to attract international employers?",
          answer: "To maximize your chances: 1) Complete all profile sections including education (mention if from recognized Nepali universities like TU, KU, PU), work experience, and certifications 2) Upload a professional photo and updated resume 3) Highlight language skills (fluency in English is crucial) 4) Add technical skills and certifications 5) Specify your visa status clearly - whether you need sponsorship or have existing permits 6) Include your availability to relocate and preferred countries 7) Add references from previous employers or professors 8) Keep your profile active by logging in regularly and updating your job preferences."
        },
        {
          id: "nepal-start-5",
          question: "What documents should I prepare before applying for international jobs?",
          answer: "Essential documents for Nepali job seekers: 1) Updated resume/CV in English format 2) Educational certificates with English translations (transcript from your university) 3) Work experience letters from previous employers 4) Passport with at least 2 years validity 5) Recent passport-size photographs 6) English proficiency certificates (IELTS/TOEFL if available) 7) Skill-based certifications 8) Police clearance certificate from Nepal Police 9) Medical fitness certificate 10) Bank statements showing financial stability 11) Reference letters from employers or academic institutions. Keep digital copies ready for quick application submissions."
        }
      ]
    },
    {
      category: "Visa-Sponsored Jobs for Nepali Citizens",
      icon: <Globe className="w-5 h-5" />,
      questions: [
        {
          id: "visa-nepal-1",
          question: "Which countries actively sponsor work visas for Nepali workers?",
          answer: "Based on 2025 data, the most accessible countries for Nepali workers are: **Gulf Countries**: UAE (2-3 weeks processing), Qatar, Saudi Arabia, Kuwait, Bahrain, Oman - these offer the fastest visa processing and highest demand for both skilled and unskilled workers. **Asian Countries**: Malaysia (post-quota approval), Japan (through specific programs), South Korea, Singapore. **Western Countries**: Canada (Express Entry, Provincial Nominee Programs), Australia (skilled migration), New Zealand, USA (H-1B, L-1 visas), UK (Skilled Worker visa). **European Union**: Germany, Netherlands, Poland, Czech Republic, Portugal (particularly for IT and healthcare workers). Each country has different requirements, processing times, and job markets."
        },
        {
          id: "visa-nepal-2",
          question: "What types of jobs are most commonly sponsored for Nepali workers?",
          answer: "**High-Demand Sponsored Jobs**: 1) **Healthcare**: Nurses, caregivers, medical technicians (especially in Gulf countries, UK, Canada) 2) **Information Technology**: Software developers, system administrators, cybersecurity specialists 3) **Construction & Engineering**: Civil engineers, construction workers, electricians, plumbers 4) **Hospitality**: Hotel staff, restaurant workers, chefs, housekeeping 5) **Manufacturing**: Factory workers, machine operators, quality control 6) **Agriculture**: Farm workers, greenhouse technicians (Netherlands, Canada) 7) **Logistics**: Drivers, warehouse operators, delivery personnel 8) **Domestic Services**: Household workers, elderly care (Gulf countries) 9) **Education**: Teachers, especially English teachers 10) **Finance**: Accountants, financial analysts (for experienced professionals). The Gulf countries offer the most opportunities for unskilled and semi-skilled workers, while Western countries prefer skilled professionals."
        },
        {
          id: "visa-nepal-3",
          question: "How do I apply for visa-sponsored positions through ActiveVacancy?",
          answer: "Step-by-step process: 1) **Search & Filter**: Use our advanced search to filter jobs by 'Visa Sponsored' and select your preferred countries 2) **Job Requirements**: Carefully read each job posting - note visa requirements, salary, benefits, and employer support level 3) **Application**: Click 'Apply' and choose between quick apply (using your profile) or custom application with tailored resume and cover letter 4) **Document Upload**: Upload relevant certificates, portfolio, or additional documents requested by the employer 5) **Application Tracking**: Monitor your application status in your dashboard 6) **Employer Contact**: If shortlisted, employers will contact you directly for interviews 7) **Visa Process**: Once hired, the employer will guide you through their specific visa sponsorship process 8) **Pre-departure**: We provide guidance on final document preparation, medical exams, and travel arrangements."
        },
        {
          id: "visa-nepal-4",
          question: "What should I expect from employers regarding visa sponsorship?",
          answer: "**Full Sponsorship Employers Typically Provide**: 1) **Visa Application Support**: Complete guidance and often payment of visa fees 2) **Legal Documentation**: Assistance with work permit applications and government approvals 3) **Pre-approval Letters**: Job offer letters required for visa applications 4) **Accommodation**: Either provided housing or housing allowance 5) **Transportation**: Airport pickup and initial transportation 6) **Insurance**: Health insurance and sometimes life insurance 7) **Contract Terms**: Clear employment contract with salary, benefits, working hours 8) **Renewal Support**: Assistance with visa renewals and extensions. **Red Flags to Avoid**: Employers asking for upfront fees, unclear contract terms, no proper company registration, unrealistic salary promises. Always verify employer legitimacy through our platform's verification system."
        },
        {
          id: "visa-nepal-5",
          question: "What are the visa processing times for different countries?",
          answer: "**Processing Times (2025 data)**: **Fast Processing (2-4 weeks)**: UAE, Qatar, Bahrain, Kuwait, Saudi Arabia, Oman **Medium Processing (1-3 months)**: Malaysia, Japan, South Korea, Singapore, Poland, Czech Republic **Longer Processing (3-6 months)**: Canada, Australia, New Zealand, Germany, Netherlands, UK **Complex Processing (6-12 months)**: USA (H-1B lottery system), some EU countries. **Factors Affecting Timeline**: Document completeness, employer's immigration support, your qualifications, country-specific quotas, seasonal demand, medical examination results. **Tips for Faster Processing**: Submit complete applications, get document translations done early, complete medical exams promptly, maintain communication with employers and immigration lawyers."
        },
        {
          id: "visa-nepal-6",
          question: "Do I need IELTS or other English tests for visa-sponsored jobs?",
          answer: "**English Test Requirements by Country**: **Mandatory IELTS/TOEFL**: Canada (minimum 6.0-7.0 bands), Australia (6.0+), New Zealand (6.5+), UK (varies by visa type), some EU countries for skilled visas. **Optional but Preferred**: USA (helps with visa approval), Germany (for some positions), Netherlands (depending on job level). **Not Required**: Most Gulf countries (UAE, Qatar, Saudi Arabia), Malaysia, Japan (Japanese proficiency more valuable). **Alternative English Proof**: Previous education in English, work experience in English-speaking environment, Skype/phone interviews demonstrating fluency. **IELTS Preparation**: Available in Kathmandu, Pokhara, and other major cities. We recommend taking the test even if not mandatory as it significantly improves your chances. Score validity is 2 years."
        },
        {
          id: "visa-nepal-7",
          question: "What are the salary expectations for Nepali workers in different countries?",
          answer: "**Monthly Salary Ranges (USD equivalent, 2025)**: **Gulf Countries**: UAE ($800-$2500), Qatar ($900-$3000), Saudi Arabia ($700-$2200), Kuwait ($800-$2500) - tax-free income. **Asian Countries**: Malaysia ($500-$1800), Japan ($2000-$4000), Singapore ($1500-$4000), South Korea ($1500-$3000). **Western Countries**: Canada ($3000-$6000), Australia ($3500-$6500), USA ($4000-$8000), UK ($2500-$5000) - before taxes. **European Union**: Germany ($3000-$5500), Netherlands ($2800-$5200), Poland ($1200-$2500) - varies by location and experience. **Additional Benefits**: Free accommodation, food allowance, medical insurance, annual leave tickets to Nepal, overtime pay, end-of-service benefits. **Cost of Living**: Consider local expenses - Gulf countries often provide accommodation, reducing living costs significantly."
        }
      ]
    },
    {
      category: "Popular Destination Countries for Nepali Workers",
      icon: <MapPin className="w-5 h-5" />,
      questions: [
        {
          id: "destinations-1",
          question: "UAE Jobs: Complete Guide for Nepali Workers",
          answer: "**Why UAE is #1 Choice for Nepalis**: Fastest visa processing (2-3 weeks), tax-free income, large Nepali community, diverse job opportunities, easy travel to Nepal. **Popular Jobs**: Construction workers, drivers, security guards, hotel staff, retail assistants, nurses, engineers, IT professionals. **Visa Types**: Employment visa (most common), investor visa, freelancer visa. **Requirements**: Passport, educational certificates, experience letters, medical fitness certificate, police clearance. **Salary Range**: AED 1500-8000+ ($400-2200+) depending on skill level. **Living**: Many employers provide accommodation, food allowance. **Best Practices**: Work only with registered employers, ensure proper contract, maintain valid Emirates ID. Dubai and Abu Dhabi offer highest salaries, while other emirates are more affordable."
        },
        {
          id: "destinations-2",
          question: "Qatar Jobs: World Cup Legacy and Opportunities for Nepalis",
          answer: "**Post-World Cup Qatar (2025)**: Infrastructure development continues, creating ongoing opportunities in construction, hospitality, and services. **High-Demand Sectors**: Construction, hospitality, healthcare, retail, logistics, security. **Visa Process**: Employer sponsorship through Qatar government portal, medical examination in approved centers. **Salary**: QAR 1200-6000+ ($330-1650+) monthly. **Benefits**: Free accommodation, medical insurance, annual leave ticket, end-of-service gratuity. **Key Advantages**: Tax-free income, excellent healthcare system, modern infrastructure, strong labor laws protecting workers. **Application Tips**: Apply through registered recruitment agencies in Nepal or directly through our verified employers. Ensure NOC (No Objection Certificate) from current employer if switching jobs within Qatar."
        },
        {
          id: "destinations-3",
          question: "Canada Immigration: Express Entry and Job Opportunities for Nepalis",
          answer: "**Canada Express Entry System**: Points-based immigration system favoring skilled workers. **Required Score**: Minimum 67 points out of 100, considering age, education, work experience, English proficiency, job offer. **Popular Programs**: Federal Skilled Worker, Canadian Experience Class, Provincial Nominee Programs (PNP). **IELTS Requirement**: Minimum 6.0 in all bands (higher scores increase chances). **Educational Credential Assessment**: Required through WES or other recognized agencies. **Processing Time**: 6-8 months after submission. **Job Market**: Strong demand for healthcare workers, IT professionals, engineers, skilled trades. **Salary**: CAD 45,000-80,000+ annually. **Permanent Residency**: Express Entry leads to PR, then citizenship eligibility. **Family Benefits**: Can include spouse and children in application."
        },
        {
          id: "destinations-4",
          question: "Australia Skilled Migration: Guide for Nepali Professionals",
          answer: "**Australia Points System**: SkillSelect system requiring minimum 65 points. **Skilled Occupation Lists**: Must have occupation on Medium/Long-term Strategic Skills List (MLTSSL) or Short-term Skilled Occupation List (STSOL). **English Requirement**: IELTS 6.0 minimum (8.0 for maximum points). **Age Factor**: Maximum points for 25-32 years old. **Popular Pathways**: Skilled Independent (189), Skilled Nominated (190), Employer Nominated (186). **Skills Assessment**: Required through relevant assessing authority for your occupation. **High-Demand Jobs**: Nurses, engineers, IT professionals, accountants, electricians, chefs. **Salary**: AUD 55,000-95,000+ annually. **PR Benefits**: Medicare, education benefits, path to citizenship. **Processing**: 8-12 months typical processing time."
        },
        {
          id: "destinations-5",
          question: "Malaysia Jobs: Opportunities and Visa Process for Nepalis",
          answer: "**Malaysia Work Opportunities**: Manufacturing, plantation, construction, services, hospitality sectors actively hiring Nepali workers. **Visa Categories**: Work Pass (skilled), Foreign Worker Permit (semi-skilled/unskilled). **Quota System**: Government sets annual quotas for foreign workers from specific countries including Nepal. **Application Process**: Employer applies for MOHA approval, then worker applies for visa at Malaysian embassy in Kathmandu. **Requirements**: Passport, medical examination, police clearance, employment contract, educational certificates. **Salary**: MYR 1200-4000+ ($280-930+) monthly. **Benefits**: Accommodation often provided, medical insurance, overtime pay. **Language**: English widely spoken, Bahasa Malaysia helpful but not always required. **Advantages**: Lower cost of living, cultural similarity, halal food availability, established Nepali community."
        },
        {
          id: "destinations-6",
          question: "USA Work Visas: H-1B, L-1, and Other Options for Nepalis",
          answer: "**H-1B Visa (Most Common)**: For specialty occupations requiring bachelor's degree. Annual lottery system with 65,000 regular cap + 20,000 advanced degree cap. **L-1 Visa**: For intracompany transfers, requires 1 year work experience with company abroad. **O-1 Visa**: For individuals with extraordinary abilities in sciences, arts, business, athletics. **TN Visa**: Not applicable for Nepalis (NAFTA countries only). **EB-5 Investor**: Requires $800,000-$1.05 million investment. **Application Timeline**: H-1B starts October 1st each year, applications due March-April. **Salary Requirements**: Must meet prevailing wage standards (typically $60,000-120,000+ annually). **Temporary Protected Status**: Nepal currently has TPS designation extending through November 2025. **Path to Green Card**: H-1B and L-1 can lead to permanent residency."
        },
        {
          id: "destinations-7",
          question: "Poland Local Jobs: Complete Guide for Nepali Workers",
          answer: "**Why Poland is Perfect for Nepalis**: EU membership with easier visa process, growing economy with labor shortages, competitive salaries with low cost of living, pathway to EU permanent residency, strong Nepali community support, relatively easier language learning compared to other EU countries. **High-Demand Local Jobs**: **Manufacturing & Production**: Automotive industry (Volkswagen, Toyota, Mercedes), electronics manufacturing, textile production, food processing plants. **Construction & Infrastructure**: Building construction workers, road construction, renovation specialists, heavy machinery operators. **Agriculture & Seasonal Work**: Fruit picking (strawberries, apples), vegetable harvesting, greenhouse work, farm maintenance. **Logistics & Warehousing**: Amazon warehouses, DHL facilities, packaging workers, forklift operators, quality control inspectors. **Hospitality & Services**: Hotel housekeeping, restaurant workers, cleaning services, elderly care, childcare services. **IT & Tech**: Software developers, system administrators, data entry, customer support (English-speaking roles). **Healthcare Support**: Hospital assistants, elderly care workers, medical equipment technicians. **Salary Ranges**: Entry-level: 3,000-4,500 PLN/month ($750-1,125), Experienced workers: 4,500-7,000 PLN/month ($1,125-1,750), Skilled professionals: 7,000-12,000+ PLN/month ($1,750-3,000+). **Work Permit Process**: EU Blue Card for skilled workers, National Work Permit for most jobs, Seasonal Work Permit for agriculture, processing time 1-3 months. **Major Cities for Jobs**: **Warsaw** (capital, highest salaries, IT hub), **Krakow** (tech companies, lower living costs), **Wrocław** (manufacturing, growing economy), **Gdansk** (shipping, logistics), **Poznan** (automotive, trade)."
        },
        {
          id: "destinations-8",
          question: "European Union: Germany, Netherlands, and Other EU Opportunities",
          answer: "**Germany**: Blue Card for skilled professionals, requires university degree and job offer paying €56,800+ annually. **Netherlands**: Highly Skilled Migrant visa, employer must be recognized sponsor. **Poland**: Work permit easier to obtain, growing demand for IT and manufacturing workers. **Czech Republic**: Working visa for both skilled and unskilled through approved programs. **Portugal**: Tech Visa for IT professionals, D7 visa for remote workers. **Common Requirements**: University degree recognition, health insurance, criminal background check, sometimes language proficiency. **Processing Time**: 3-6 months typically. **EU Benefits**: Freedom to travel within Schengen area, excellent healthcare, education benefits. **Salary Ranges**: €25,000-70,000+ annually depending on country and role. **Long-term**: Path to permanent residency after 5 years, then EU citizenship."
        },
        {
          id: "destinations-9",
          question: "Japan Work Opportunities: Technical Trainee and Skilled Worker Programs",
          answer: "**Technical Intern Training Program (TITP)**: 3-5 year program for specific industries like construction, agriculture, manufacturing. **Specified Skilled Worker**: New visa category (2019) for 14 sectors including construction, shipbuilding, agriculture. **Requirements**: Basic Japanese language skills (N4 level), relevant work experience or training, medical examination, criminal background check. **Application Process**: Through registered sending organizations in Nepal, then Japanese employers sponsor visa. **Salary**: ¥150,000-300,000+ ($1,100-2,200+) monthly. **Benefits**: Accommodation support, Japanese language training, skill development, cultural experience. **After Program**: Possibility to transition to other work visas or return to Nepal with valuable skills. **Challenges**: Language barrier, cultural adaptation, strict work discipline. **Support**: Regular monitoring, welfare services, dispute resolution mechanisms."
        }
      ]
    },
    {
      category: "Application Process & Requirements",
      icon: <FileText className="w-5 h-5" />,
      questions: [
        {
          id: "application-1",
          question: "How do I track my job applications on ActiveVacancy?",
          answer: "Our comprehensive application tracking system keeps you informed at every step: **Dashboard Overview**: Log into your account and visit 'My Applications' to see all submitted applications with real-time status updates. **Status Categories**: Applied (submitted to employer), Under Review (employer reviewing), Interview Scheduled (employer interested), Offer Pending (final decision stage), Hired (congratulations!), Not Selected (with feedback when available). **Notifications**: Receive email and SMS alerts for status changes, interview requests, employer messages. **Communication Log**: All employer communications stored in one place, including interview schedules, additional document requests, offer letters. **Document Tracking**: See which documents employers have viewed, downloaded, or requested. **Response Analytics**: Track your application success rate and get suggestions for improvement. **Mobile App**: Access your application status on-the-go with our mobile-friendly interface."
        },
        {
          id: "application-2",
          question: "What documents need to be translated and attested for international jobs?",
          answer: "**Documents Requiring Translation (English)**: 1) Educational certificates (SLC/SEE, +2, Bachelor's, Master's degrees) 2) Academic transcripts with grades/marks 3) Professional certificates and training credentials 4) Work experience letters 5) Character certificates 6) Marriage certificate (if applicable) 7) Birth certificate (for some countries). **Translation Process**: Use certified translation services in Kathmandu (Putalisadak, New Baneshwor areas). **Attestation Requirements**: **Nepal Government Attestation**: Ministry of Education (for educational documents), Ministry of Foreign Affairs, Department of Foreign Employment. **Embassy Attestation**: Required by destination country's embassy in Nepal. **Apostille Process**: For countries that accept apostille instead of embassy attestation. **Costs**: Translation: NPR 200-500 per page, Government attestation: NPR 500-2000 per document, Embassy fees vary by country. **Processing Time**: 5-15 working days total. **Tips**: Get multiple copies attested, keep originals safe, digital copies acceptable for initial applications."
        },
        {
          id: "application-3",
          question: "How do I prepare for video interviews with international employers?",
          answer: "**Technical Preparation**: Test internet connection, ensure backup connection (mobile hotspot), test camera and microphone, use laptop/desktop over mobile, choose quiet, well-lit location, download required software (Zoom, Skype, Teams) in advance. **Professional Setup**: Professional background or virtual background, good lighting (face clearly visible), formal attire (dress as you would for in-person interview), remove distractions, inform family members. **Content Preparation**: Research company thoroughly, prepare answers for common questions, have questions ready about the role and company, understand visa process and timeline, know your resume thoroughly, prepare examples of achievements. **Common Interview Questions**: Why do you want to work in [country]? How do you handle cultural differences? Describe your experience with [specific skill]. What are your salary expectations? When can you start? **Cultural Tips**: Learn basic cultural norms of the destination country, understand time zone differences for scheduling, show enthusiasm for relocation and cultural adaptation."
        },
        {
          id: "application-4",
          question: "What are the most common mistakes Nepali job seekers make in applications?",
          answer: "**Document Mistakes**: Expired passport (less than 2 years validity), incomplete educational certificates, poor quality document scans, missing translations, using fake or altered certificates. **Resume Errors**: Overly long resumes (should be 1-2 pages), grammatical errors in English, including irrelevant personal information (religion, caste, political affiliation), unrealistic salary expectations, not tailoring resume to specific job requirements. **Application Mistakes**: Applying to jobs without meeting basic requirements, not reading job descriptions carefully, mass applying without customization, not following up appropriately, providing false information about experience or qualifications. **Communication Issues**: Poor English communication skills, not responding promptly to employer queries, unprofessional email addresses, not maintaining professional tone in messages. **Visa Preparation**: Not understanding visa requirements, delay in document preparation, not maintaining consistent information across documents. **Red Flags to Avoid**: Working with unregistered recruitment agencies, paying excessive fees upfront, accepting jobs without proper contracts."
        },
        {
          id: "application-5",
          question: "How do I negotiate salary and benefits for international positions?",
          answer: "**Research Market Rates**: Use our salary comparison tool, research cost of living in destination country, understand tax implications, check industry standards for your role and experience level. **Negotiation Strategy**: Don't negotiate in first interview, wait for formal offer, express gratitude for offer first, present counter-offer professionally with justification, consider total package not just base salary. **What's Negotiable**: Base salary, housing allowance, transportation benefits, annual leave tickets to Nepal, overtime rates, contract duration, medical insurance coverage, family visa sponsorship. **What's Usually Fixed**: Visa processing fees, government-mandated benefits, company-wide policies, entry-level positions often have fixed packages. **Cultural Considerations**: Gulf countries: Often more flexible on allowances, Western countries: Focus on base salary and benefits package, Asian countries: May have less negotiation room but better work-life balance. **Documentation**: Get all agreements in writing, understand currency of payment, clarify payment schedule (monthly/bi-weekly), ensure contract includes all discussed benefits."
        }
      ]
    },
    {
      category: "Visa Process & Documentation",
      icon: <FileText className="w-5 h-5" />,
      questions: [
        {
          id: "visa-process-1",
          question: "Complete visa application process from Nepal - step by step guide",
          answer: "**Phase 1: Pre-Application (2-4 weeks)**: Secure job offer through ActiveVacancy, gather required documents, get medical examination from approved clinics, obtain police clearance certificate, translate and attest documents, open bank account and maintain minimum balance. **Phase 2: Employer Sponsorship (2-8 weeks)**: Employer files petition/sponsorship with destination country immigration, receive approval notice or reference number, employer sends you official documents and instructions. **Phase 3: Visa Application (1-4 weeks)**: Complete visa application form online or at embassy, pay visa fees, book appointment at embassy/consulate, attend interview if required, submit biometrics (fingerprints, photos). **Phase 4: Processing & Decision (1-12 weeks)**: Embassy processes application, may request additional documents, medical examination results reviewed, background checks completed, visa decision made. **Phase 5: Pre-Departure (1-2 weeks)**: Receive visa in passport, book flights, arrange temporary accommodation, final document check, attend pre-departure orientation if available, travel to destination country."
        },
        {
          id: "visa-process-2",
          question: "Where can I get medical examinations for visa applications in Nepal?",
          answer: "**Kathmandu Valley**: **CIWEC Clinic** (Lazimpat) - US visa medicals, comprehensive services. **Grande International Hospital** (Dhapasi) - Multiple country approvals, modern facilities. **Norvic International Hospital** (Thapathali) - Canada, Australia, UK approved. **Teaching Hospital, Maharajgunj** - Government facility, affordable rates. **B&B Hospital** (Gwarko, Lalitpur) - Gulf countries, Malaysia approved. **Outside Kathmandu**: **Pokhara**: Gandaki Medical College, Western Regional Hospital. **Chitwan**: Chitwan Medical College. **Biratnagar**: Nobel Medical College. **Cost Range**: NPR 8,000-25,000 depending on destination country and tests required. **Tests Usually Include**: General physical examination, chest X-ray, blood tests (HIV, Hepatitis B&C, syphilis), urine test, sometimes additional tests for TB. **Validity**: Medical certificates typically valid for 6-12 months. **Booking**: Call ahead to book appointment, bring passport and visa documents, fast in morning for blood tests."
        },
        {
          id: "visa-process-3",
          question: "Police clearance certificate: How to obtain from Nepal Police",
          answer: "**Application Process**: Visit District Police Office in your permanent address district, fill application form with personal details, submit required documents, pay prescribed fees, get acknowledgment receipt with tracking number. **Required Documents**: Completed application form, copy of citizenship certificate, copy of passport, 2 passport-size photos, copy of permanent address certificate, application fee receipt. **Fees**: NPR 500 for domestic use, NPR 1,000 for foreign use (subject to change). **Processing Time**: 7-15 working days for regular processing, expedited service available for urgent cases. **Collection**: Present original receipt and identity documents, certificate valid for 6 months from issue date. **Online Service**: Nepal Police has introduced online application system - check their official website for current status. **Special Cases**: If you've lived in multiple districts, may need certificates from each location, for residents abroad, apply through nearest Nepali embassy/consulate. **Document Quality**: Ensure certificate is clear, stamped, and signed properly as embassies are strict about authenticity."
        },
        {
          id: "visa-process-4",
          question: "What are the common reasons for visa rejection and how to avoid them?",
          answer: "**Documentation Issues (40% of rejections)**: Incomplete application forms, missing required documents, expired documents, poor quality photocopies, inconsistent information across documents. **Financial Insufficiency (25%)**: Unable to demonstrate financial capability, insufficient bank statements, no proof of income source, high debt-to-income ratio. **Previous Immigration Violations (15%)**: Overstay in any country, previous visa violations, deportation history, false information in previous applications. **Inadequate Job Offer (10%)**: Job offer from unregistered employer, salary below minimum requirements, unclear job responsibilities, no genuine employer sponsorship. **Health/Background Issues (5%)**: Medical examination failure, criminal background, security concerns, communicable diseases. **Other Issues (5%)**: Poor interview performance, inability to demonstrate ties to Nepal, suspicious travel history. **Prevention Strategies**: Submit complete applications, maintain financial records, be honest about history, verify employer legitimacy, prepare thoroughly for interviews, use professional services for document preparation, follow up appropriately, maintain consistent information across all documents."
        },
        {
          id: "visa-process-5",
          question: "Embassy appointment booking and interview preparation for major countries",
          answer: "**US Embassy (Kathmandu)**: Book appointment online at ais.usvisa-info.com, pay MRV fee before booking, interview required for most visa types, arrive 30 minutes early, bring DS-160 confirmation and required documents. **Canadian Embassy**: Applications processed in New Delhi, submit online application first, biometrics at VFS Global Kathmandu, interview may be required. **UK Embassy**: Online application through gov.uk, biometrics at TLS Contact center, supporting documents submission, priority service available for faster processing. **Australian Embassy**: Lodge application online through ImmiAccount, health examinations before interview, character requirements strictly enforced. **Gulf Country Embassies**: UAE: Online visa application system, Qatar: Through employer sponsorship, Saudi Arabia: Enjaz platform. **Interview Tips**: Dress professionally, arrive early with all documents, answer clearly and honestly, bring originals and copies, demonstrate strong ties to Nepal, show genuine intent for temporary stay (unless permanent visa), practice common questions in English. **Common Questions**: Purpose of visit, duration of stay, financial capability, ties to Nepal, previous travel history, employment details."
        }
      ]
    },
    {
      category: "Financial Planning & Preparation",
      icon: <DollarSign className="w-5 h-5" />,
      questions: [
        {
          id: "finance-1",
          question: "How much money do I need to have for visa applications and travel?",
          answer: "**Visa Application Costs**: Document preparation (NPR 20,000-50,000): translations, attestations, medical exams, police clearance. Visa fees vary by country: US ($160-190), Canada ($230-250), Australia ($405+), UK (£610+), Gulf countries ($50-150). **Travel Expenses**: Flight tickets: Gulf countries ($300-600), Western countries ($800-1,500), connecting flights may be cheaper. Airport taxes and fees: $20-100 depending on route. **Initial Living Expenses**: First month accommodation if not provided by employer, food and transportation for first few weeks, mobile connection and basic necessities, emergency fund for unexpected expenses. **Total Budget Estimates**: Gulf countries: $2,000-4,000, Western countries: $5,000-10,000, Asian countries: $1,500-3,000. **Money Transfer**: Maintain bank statements showing consistent balance, avoid large deposits just before application, show legitimate source of funds, keep employment letters and income proof ready."
        },
        {
          id: "finance-2",
          question: "Banking and money transfer options for international workers",
          answer: "**Nepal Banking Options**: **NMB Bank**: International remittance services, dollar accounts available, good online banking. **Standard Chartered**: Global network, premium banking services, forex services. **Nabil Bank**: Established network, good customer service, multiple branches. **Himalayan Bank**: Growing network, competitive rates, online services. **International Banking**: Open account in destination country upon arrival, many banks have special accounts for migrant workers, understand minimum balance requirements. **Money Transfer Services**: **IME**: Extensive Nepal network, competitive rates, reliable service. **Prabhu Money Transfer**: Fast service, good rates, multiple pickup locations. **Western Union**: Global network, instant transfers, higher fees. **MoneyGram**: Wide acceptance, good for emergencies. **Digital Options**: Wise (TransferWise) - low fees, mid-market rates, online transfers. Remitly - good for regular remittances, mobile app available. **Tips**: Compare exchange rates, understand transfer fees, keep transaction records, set up regular remittance schedule, avoid informal money transfer (hundi) systems."
        },
        {
          id: "finance-3",
          question: "What financial documents do I need to show for visa applications?",
          answer: "**Personal Financial Documents**: Bank statements (last 6-12 months showing regular transactions), salary certificates from current employer, tax clearance certificate, property ownership documents (if any), investment certificates (shares, fixed deposits). **Sponsor Financial Documents** (if applicable): Sponsor's bank statements, employment verification letter, tax returns, invitation letter with financial commitment. **Business Owners**: Business registration certificates, profit/loss statements, tax payments, business bank statements, audited financial reports. **Document Standards**: Original bank statements with bank seal, consistent name across all documents, sufficient balance for intended duration, regular income patterns (avoid large one-time deposits), currency conversion calculations if required. **Country-Specific Requirements**: **USA**: I-134/I-864 affidavit of support if sponsored, **Canada**: Settlement funds proof ($13,310 CAD for single person), **Australia**: Evidence of access to funds for stay duration, **Gulf Countries**: Usually employment-based, minimal personal funds required. **Common Mistakes**: Showing borrowed money temporarily, inconsistent financial history, unable to explain source of funds, insufficient funds for proposed stay duration."
        }
      ]
    },
    {
      category: "Pre-Departure Preparation",
      icon: <Calendar className="w-5 h-5" />,
      questions: [
        {
          id: "departure-1",
          question: "Pre-departure checklist: What to do before leaving Nepal?",
          answer: "**Legal & Documentation (4-6 weeks before)**: Ensure passport validity (minimum 2 years), obtain all required visas and permits, complete medical examinations and vaccinations, get travel insurance, register with Department of Foreign Employment if required. **Financial Preparation (2-4 weeks before)**: Open international bank account or forex card, arrange initial funds transfer, set up remittance channels for family, clear any outstanding loans or debts, prepare emergency fund. **Personal Arrangements (2-3 weeks before)**: Inform family and friends of travel plans, arrange care for dependents or elderly parents, settle any pending legal matters, organize important document storage, prepare power of attorney if needed. **Travel Arrangements (1-2 weeks before)**: Book flights with adequate layover time, arrange airport transfers, confirm accommodation for first few days, pack appropriate clothing for destination climate, organize mobile phone international plan. **Final Steps (1 week before)**: Confirm all bookings and appointments, attend pre-departure orientation if available, get final medical check-up, withdraw emergency cash in USD, say proper goodbyes to family and friends."
        },
        {
          id: "departure-2",
          question: "What should I pack when moving abroad for work?",
          answer: "**Essential Documents (Carry-on bag)**: Passport with visa, employment contract, educational certificates, medical records, travel insurance, emergency contact list, bank details, accommodation confirmation, return ticket (if required). **Clothing**: Formal work attire suitable for destination climate, casual clothing, traditional Nepali outfit for cultural events, warm clothing for cold countries, comfortable shoes, undergarments and socks. **Electronics**: Universal power adapter, mobile phone with international plan, laptop/tablet if needed for work, camera for documenting journey, portable charger/power bank. **Personal Items**: Prescription medicines (with doctor's prescription), basic toiletries, favorite Nepali spices and food items (check customs regulations), photos of family, religious items if important to you. **Work-Related**: Professional tools if applicable, reference books, certifications and licenses, business cards from previous employers. **Weight Limits**: Check airline baggage allowance, use lightweight luggage, consider shipping heavy items separately, keep essentials in carry-on in case of luggage delays."
        },
        {
          id: "departure-3",
          question: "Airport procedures and travel tips for first-time international travelers",
          answer: "**Before Airport (3-4 hours early for international flights)**: Complete web check-in if available, print boarding passes, check flight status, arrange transportation to airport, keep all documents easily accessible. **Check-in Process**: Present passport and visa to airline staff, confirm seat selection, declare any restricted items, get baggage tags and boarding pass, note gate number and boarding time. **Immigration Clearance**: Present passport to Nepal immigration officer, may ask about purpose of travel and duration, get exit stamp, proceed to security check. **Security Screening**: Remove electronics larger than phone, liquids in 100ml containers in clear bag, remove shoes and belt if required, cooperate with security personnel. **Departure Lounge**: Locate your gate, note boarding time, use WiFi to inform family of progress, shop for last-minute items (duty-free), stay hydrated and eat light meal. **Boarding**: Listen for announcements, board when your row/zone is called, keep boarding pass and passport handy, settle in and prepare for journey. **In-Flight Tips**: Stay hydrated, move regularly on long flights, be polite to crew, keep important documents accessible for arrival immigration."
        }
      ]
    },
    {
      category: "Living & Working Abroad",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          id: "living-1",
          question: "How to adapt to new culture and work environment abroad?",
          answer: "**Cultural Preparation**: Research destination country's customs, business etiquette, social norms, religious practices, communication styles. Learn basic phrases in local language. Understand concepts of personal space, time management, and work-life balance. **Workplace Integration**: Observe and learn company culture, ask questions when unclear, be punctual and professional, participate in team activities, show willingness to learn, respect hierarchy and reporting structures. **Social Adaptation**: Join Nepali community groups for support, participate in local community activities, be open to making friends from different cultures, learn local customs for holidays and celebrations, maintain connection with Nepal through video calls. **Common Challenges**: Language barriers - take language classes, cultural misunderstandings - ask for clarification, homesickness - stay connected with family, workplace differences - adapt while maintaining your values, financial management - learn local banking and taxation. **Success Tips**: Stay positive and patient, maintain your identity while adapting, build relationships gradually, learn from mistakes, celebrate small victories, seek help when needed from community or employer support services."
        },
        {
          id: "living-2",
          question: "Healthcare systems and insurance in different countries",
          answer: "**Gulf Countries**: **UAE**: Mandatory health insurance, Dubai Health Authority (DHA) system, good private hospitals, employer usually provides coverage. **Qatar**: National Health Insurance Scheme, excellent healthcare facilities, free emergency care for all residents. **Saudi Arabia**: Comprehensive healthcare system, CCHI insurance mandatory, mix of public and private providers. **Western Countries**: **Canada**: Universal healthcare (OHIP in Ontario), covers basic medical, dental and vision separate, wait times for non-emergency procedures. **Australia**: Medicare system, covers basic healthcare, private insurance for extras, reciprocal agreements with some countries. **UK**: NHS provides free healthcare, National Insurance contributions, excellent emergency care, may need private insurance for dental/optical. **USA**: Employer-sponsored insurance crucial, expensive without insurance, understand deductibles and co-pays, emergency care available regardless of ability to pay. **General Tips**: Understand your coverage limits, keep insurance cards accessible, register with local doctor/clinic, maintain vaccination records, learn emergency numbers, understand prescription medicine systems."
        },
        {
          id: "living-3",
          question: "Housing options and accommodation tips for international workers",
          answer: "**Employer-Provided Housing**: **Advantages**: Usually furnished, utilities included, transportation arranged, safe and vetted locations, immediate availability, cost-effective. **Considerations**: Limited privacy, shared facilities, specific rules and regulations, location may be fixed, roommate compatibility. **Independent Housing**: **Apartment Rental**: More privacy and freedom, choose location and amenities, establish local credit history, higher costs including utilities and deposits. **Shared Accommodation**: Cost-effective option, social interaction, shared responsibilities, potential conflicts with roommates. **Housing Search Tips**: **Research Areas**: Safety, proximity to work, public transportation, shopping and services, Nepali community presence. **Budget Planning**: Rent typically 25-30% of income, factor in utilities, internet, transportation costs, security deposits (usually 1-2 months rent). **Viewing Properties**: Check all facilities, test internet speed, understand lease terms, verify landlord legitimacy, take photos for reference. **Legal Considerations**: Read lease agreement carefully, understand tenant rights, know notice periods, document property condition, maintain rental insurance where required."
        }
      ]
    },
    {
      category: "Support & Community Resources",
      icon: <Headphones className="w-5 h-5" />,
      questions: [
        {
          id: "support-1",
          question: "How to find and connect with Nepali communities abroad?",
          answer: "**Online Communities**: **Facebook Groups**: Search '[Country/City] Nepali Community', 'Nepalis in [Location]', country-specific professional groups. **WhatsApp Groups**: Ask existing contacts for group invitations, workplace colleagues may have community connections. **Professional Networks**: LinkedIn groups for Nepali professionals, industry-specific networks. **Physical Communities**: **Cultural Centers**: Nepal Cultural Centers, Hindu/Buddhist temples, community halls hosting Nepali events. **Restaurants**: Nepali/Indian restaurants often serve as community meeting points, staff usually well-connected with local Nepali population. **Sports Clubs**: Cricket, football, volleyball clubs often have strong Nepali participation. **Religious Centers**: Local Hindu temples, Buddhist monasteries, Gurdwaras welcome Nepali devotees. **Events & Festivals**: **Major Celebrations**: Dashain, Tihar, Holi celebrations organized by community groups, New Year celebrations, cultural programs. **Regular Gatherings**: Weekly/monthly community meetups, religious gatherings, sports tournaments, cultural competitions. **Benefits of Community**: Emotional support during homesickness, practical advice for local living, job referrals and networking, shared transportation and group purchases, celebration of festivals and traditions, emergency support system."
        },
        {
          id: "support-2",
          question: "Embassy and consulate services for Nepali citizens abroad",
          answer: "**Consular Services Available**: **Document Services**: Passport renewal, emergency travel documents, citizenship certificates, power of attorney attestation, document verification. **Emergency Assistance**: Help during medical emergencies, legal troubles, natural disasters, lost passport/documents, contact with family in Nepal. **Legal Support**: List of local lawyers, notarial services, assistance with legal documentation, liaison with local authorities in emergencies. **Welfare Services**: Welfare fund for distressed Nepalis, repatriation assistance for those unable to return, mediation in employment disputes. **Registration Process**: Register with nearest embassy/consulate upon arrival, update contact information regularly, inform about change of address, maintain registration for emergency contact. **Major Nepal Embassies**: **USA**: Washington DC (Embassy), New York (Consulate General). **UK**: London (Embassy). **UAE**: Abu Dhabi (Embassy), Dubai (Consulate General). **India**: New Delhi (Embassy), multiple consulates. **Australia**: Canberra (Embassy). **Canada**: Ottawa (Embassy). **Contact Information**: Keep embassy phone numbers saved, know office hours and holiday schedules, understand emergency contact procedures, register for embassy notifications and alerts."
        },
        {
          id: "support-3",
          question: "Legal rights and protections for Nepali workers abroad",
          answer: "**Employment Rights**: **Contract Terms**: Right to written employment contract in language you understand, clear job description and working conditions, agreed salary and benefits, specific working hours and overtime policies. **Workplace Safety**: Safe working environment, proper safety equipment, training on safety procedures, right to refuse unsafe work. **Non-Discrimination**: Equal treatment regardless of nationality, religion, or ethnicity, protection from workplace harassment, fair promotion and training opportunities. **Wage Protection**: Timely salary payment, overtime compensation as per contract, end-of-service benefits, protection against arbitrary salary cuts. **Legal Protections**: **Labor Laws**: Understanding local labor laws and regulations, right to join trade unions where permitted, protection against unfair dismissal, grievance procedures. **Immigration Rights**: Right to legal immigration status, protection against passport confiscation, ability to change employers (where legally permitted), due process in visa matters. **Emergency Protections**: Right to consular assistance, access to legal representation, protection from forced labor or human trafficking, emergency repatriation support. **Seeking Help**: Contact Nepal embassy/consulate for serious issues, local labor departments for workplace disputes, legal aid societies for legal assistance, community organizations for support and guidance. **Red Flags**: Passport confiscation, working without proper permits, salary withholding, unsafe working conditions, threats or intimidation."
        },
        {
          id: "support-4",
          question: "Emergency contacts and crisis support for Nepali workers",
          answer: "**Nepal Government Contacts**: **Ministry of Foreign Affairs**: +977-1-4200190 (24/7 helpline), +977-1-4211499 (general inquiries). **Department of Foreign Employment**: +977-1-5554525, complaint@dofe.gov.np. **Nepal Police**: 100 (emergency), 103 (tourist helpline). **International Emergency Numbers**: Know local emergency numbers: USA (911), UK (999), Australia (000), UAE (999), Canada (911), EU countries (112). **Embassy Emergency Lines**: All Nepal embassies have 24/7 emergency numbers, save these numbers in your phone immediately upon arrival, register your number with embassy for alerts. **Community Support**: **Nepali Community Leaders**: Identify community coordinators and volunteers, join community WhatsApp/Telegram groups, attend community meetings to know support contacts. **Professional Help**: **Legal Aid**: Know local legal aid societies, understand how to find lawyers if needed, keep important legal documents secure. **Medical Emergency**: Know nearest hospital locations, understand health insurance procedures, keep medical history and prescription list updated. **Financial Emergency**: Know how to access emergency funds, understand money transfer procedures, maintain emergency contact with banks in Nepal. **Crisis Situations**: Natural disasters, political unrest, personal emergencies - embassy should be first contact, maintain communication with family in Nepal, follow embassy advisories and instructions."
        }
      ]
    },
    {
      category: "Career Growth & Development",
      icon: <TrendingUp className="w-5 h-5" />,
      questions: [
        {
          id: "career-1",
          question: "How to advance your career and skills while working abroad?",
          answer: "**Skill Development Opportunities**: **On-the-Job Training**: Take advantage of employer training programs, shadow experienced colleagues, volunteer for challenging projects, attend company workshops and seminars. **Professional Certifications**: Research industry-relevant certifications, many countries offer government-funded training, online courses through platforms like Coursera, edX, LinkedIn Learning. **Language Skills**: Improve English proficiency through local classes, learn local language for better integration, join conversation groups and practice clubs. **Networking**: **Professional Associations**: Join industry-specific organizations, attend networking events and conferences, build relationships with colleagues and industry professionals. **Mentorship**: Find mentors in your field, offer to mentor others as you gain experience, participate in formal mentorship programs. **Career Progression**: **Performance Reviews**: Understand evaluation criteria, set clear goals with supervisors, document achievements and contributions, seek feedback regularly. **Internal Opportunities**: Apply for promotions within company, consider lateral moves to gain experience, participate in cross-departmental projects. **Industry Knowledge**: Stay updated with industry trends, read professional publications, attend workshops and seminars, consider pursuing higher education part-time. **Building Reputation**: Deliver quality work consistently, be reliable and punctual, build positive relationships, contribute to team success."
        },
        {
          id: "career-2",
          question: "Starting your own business or becoming self-employed abroad",
          answer: "**Legal Requirements**: **Business Registration**: Understand local business registration requirements, different business structures (LLC, corporation, partnership), licensing requirements for your industry, tax obligations and reporting. **Visa Considerations**: Some countries offer entrepreneur or investor visas, existing work visa may not permit business activities, may need to change visa status, consult immigration lawyer for guidance. **Popular Business Ideas for Nepalis**: **Food & Hospitality**: Nepali/Indian restaurants, catering services, food delivery, authentic spice import/export. **Services**: Translation services, tourism guidance, cultural consultancy, IT services, accounting for Nepali community. **Retail**: Nepali/Indian grocery stores, cultural items import, online marketplaces. **Financial Planning**: **Startup Capital**: Estimate initial investment requirements, consider small business loans or grants, maintain personal finances separately, plan for initial low income period. **Market Research**: Study local market demand, identify target customers, analyze competition, understand pricing strategies. **Support Resources**: **Government Programs**: Many countries offer small business support, immigrant entrepreneur programs, free business counseling services. **Community Support**: Learn from successful Nepali business owners, join small business associations, seek mentorship from established entrepreneurs. **Challenges**: Language barriers, understanding local regulations, building customer base, managing cultural differences in business practices."
        }
      ]
    },
    {
      category: "Family & Personal Life",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          id: "family-1",
          question: "How to bring family members (spouse, children, parents) to your destination country?",
          answer: "**Family Visa Categories**: **Spouse Visa**: Most countries allow spouse to join after worker establishes residency, require marriage certificate, proof of relationship, medical examination, criminal background check. **Dependent Children**: Usually allowed if under 18-21 years, educational opportunities often a major benefit, health insurance coverage important consideration. **Parent Visa**: More difficult in most countries, may require proof of financial support, health insurance, limited to certain visa categories. **Country-Specific Policies**: **Canada**: Family class immigration, spouse and dependent children can accompany, parents through Parent and Grandparent Program (limited spots). **Australia**: Partner visa, dependent child visa, parent visa categories with different requirements and waiting periods. **USA**: Immediate relatives of citizens, family preference categories for permanent residents, significant waiting periods for some categories. **UK**: Family visa for spouse and children, financial requirements, English language requirements. **Gulf Countries**: Family visa available for certain salary levels, accommodation and school considerations important. **Requirements**: **Financial Proof**: Minimum income requirements, accommodation suitable for family, health insurance coverage, educational costs for children. **Documentation**: Relationship proof, medical examinations, police clearances, educational certificates, financial statements. **Timeline**: Processing can take 6 months to several years, plan accordingly for family separation, maintain regular communication during process."
        },
        {
          id: "family-2",
          question: "Maintaining relationships with family and friends in Nepal",
          answer: "**Communication Technology**: **Video Calls**: WhatsApp, Viber, Facebook Messenger for regular family calls, Skype for longer conversations, consider time zone differences for scheduling. **Social Media**: Facebook, Instagram to share daily life updates, create family groups for easy communication, share photos and videos regularly. **Communication Schedule**: **Regular Calls**: Set specific times for family calls, daily brief check-ins with spouse/parents, weekly longer family conversations, special calls during festivals and celebrations. **Time Zone Management**: Use world clock apps, inform family of your schedule, be flexible with timing, prioritize important family events. **Emotional Connection**: **Festival Celebrations**: Celebrate Nepali festivals virtually with family, send money for festival expenses, maintain traditions even while abroad. **Important Events**: Be present virtually for family celebrations, birthdays, anniversaries, graduations, weddings through video calls. **Physical Presence**: **Home Visits**: Plan annual visits if possible, save money specifically for travel, coordinate with work vacation schedules, make visits meaningful and memorable. **Bringing Family**: Invite family members to visit your new country, show them your new life and experiences, help them understand your situation better. **Challenges**: Homesickness during festivals, missing important family events, communication barriers with elderly family members, balancing new life with old relationships."
        }
      ]
    },
    {
      category: "ActiveVacancy Platform Features",
      icon: <Award className="w-5 h-5" />,
      questions: [
        {
          id: "platform-1",
          question: "How does ActiveVacancy verify employers and job postings?",
          answer: "**Employer Verification Process**: **Company Registration Check**: Verify business registration certificates, confirm company legal status in their country, check trade licenses and permits, validate physical business address. **Financial Verification**: Review company financial stability, check payment history with previous employees, verify ability to sponsor visas, assess business longevity and reputation. **Reference Checks**: Contact previous employees who worked through our platform, verify with local business associations, check with relevant government departments, review online reputation and reviews. **Job Posting Validation**: **Realistic Job Requirements**: Ensure qualifications match salary offered, verify job descriptions are accurate and detailed, check that visa sponsorship claims are genuine, validate working conditions and benefits. **Legal Compliance**: Confirm compliance with local labor laws, verify visa sponsorship capabilities, ensure job terms meet minimum wage requirements, check for discriminatory practices. **Ongoing Monitoring**: **Regular Reviews**: Annual reverification of employer credentials, monitoring of employee feedback and ratings, investigation of complaints or concerns, removal of problematic employers. **Red Flag Detection**: Automated systems detect suspicious postings, manual review of high-risk applications, investigation of unusual patterns, protection against fraudulent schemes. **User Protection**: Report suspicious employers easily, 24/7 support for job seeker concerns, refund policies for verified fraud cases, legal assistance referrals when needed."
        },
        {
          id: "platform-2",
          question: "What additional services does ActiveVacancy provide beyond job matching?",
          answer: "**Resume & Profile Services**: **Professional Resume Writing**: Expert resume writers familiar with international standards, industry-specific templates and formats, ATS-optimized resumes for better visibility, translation services for multiple languages. **Profile Optimization**: Professional profile photos, keyword optimization for better search results, skill assessment and certification, portfolio development guidance. **Interview & Career Coaching**: **Mock Interviews**: Practice sessions with experienced interviewers, video interview training and technical setup, cultural coaching for different countries, feedback and improvement recommendations. **Career Guidance**: Career path planning and development, skill gap analysis and training recommendations, salary negotiation coaching, job search strategy development. **Visa & Documentation Support**: **Document Preparation**: Guidance on required documents for each country, templates for cover letters and applications, assistance with document translation and attestation, checklist management for complex applications. **Visa Process Guidance**: Step-by-step visa application support, embassy appointment booking assistance, interview preparation for visa interviews, updates on visa policy changes. **Financial & Legal Services**: **Financial Planning**: Budgeting for international relocation, guidance on banking and money transfer, insurance recommendations, tax planning advice. **Legal Referrals**: Immigration lawyer recommendations, employment law guidance, contract review services, emergency legal support contacts. **Post-Placement Support**: Regular check-ins after job placement, assistance with workplace issues, career development planning, family reunification guidance."
        },
        {
          id: "platform-3",
          question: "How can I provide feedback and help improve ActiveVacancy?",
          answer: "**Feedback Channels**: **Platform Rating System**: Rate employers after application or employment, review job posting accuracy, rate overall platform experience, provide suggestions for improvements. **Direct Communication**: **Support Chat**: Live chat support during business hours, ticket system for detailed issues, phone support for urgent matters, email support for comprehensive feedback. **Community Input**: **User Surveys**: Regular surveys on platform improvements, feedback on new features, suggestions for additional services, market research participation. **Success Stories**: Share your job placement success, provide testimonials for marketing, participate in case studies, mentor other job seekers. **Platform Improvement**: **Feature Requests**: Suggest new platform features, vote on proposed improvements, beta testing of new features, user experience feedback. **Content Contribution**: **Job Market Insights**: Share experience about specific countries or employers, provide tips for other Nepali job seekers, contribute to FAQ and knowledge base, participate in webinars and workshops. **Community Building**: **Mentorship Program**: Become a mentor for new users, share interview experiences, provide career advice, support community discussions. **Rewards Program**: Earn points for platform contributions, get priority access to premium features, receive rewards for referrals, special recognition for helpful community members."
        }
      ]
    },
    {
      category: "Troubleshooting & Technical Support",
      icon: <AlertCircle className="w-5 h-5" />,
      questions: [
        {
          id: "tech-1",
          question: "Common technical issues and how to resolve them",
          answer: "**Login & Account Issues**: **Password Problems**: Use 'Forgot Password' feature, check spam folder for reset emails, ensure email address is correct, contact support if issues persist. **Account Access**: Clear browser cache and cookies, try different browser or incognito mode, check internet connection stability, disable browser extensions temporarily. **Profile & Application Issues**: **Profile Not Saving**: Ensure all required fields completed, check file size limits for uploads, verify email settings in profile, try saving sections individually. **Application Submission Errors**: Check internet connection before submitting, ensure all documents uploaded properly, verify file formats and sizes, keep copies of submitted applications. **Search & Notification Issues**: **Job Search Problems**: Use different keyword combinations, check search filters and location settings, clear search filters and try again, browse by category if search not working. **Missing Notifications**: Check email spam/junk folders, verify email settings in profile, ensure notifications enabled in settings, check phone number for SMS alerts. **Mobile App Issues**: **App Performance**: Update to latest app version, restart phone and app, clear app cache and data, reinstall app if problems continue. **Sync Issues**: Ensure stable internet connection, log out and log back in, manually sync by pulling down on screens, contact support for persistent sync problems. **Browser Compatibility**: **Supported Browsers**: Chrome (recommended), Firefox, Safari, Edge - keep updated to latest versions, JavaScript must be enabled, cookies must be allowed. **Getting Help**: Screenshot error messages, note which device/browser you're using, describe steps that led to problem, try basic troubleshooting before contacting support."
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        (q.question?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
        (q.answer?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <React.Fragment>
      <head>
        <title>Complete FAQ Guide | ActiveVacancy - Nepal's #1 International Job Platform</title>
        <meta name="description" content="Comprehensive guide for Nepali job seekers: visa applications, international jobs, employer verification, and career development abroad. Expert answers to 100+ questions." />
        <meta name="keywords" content="Nepal international jobs, visa sponsorship, Gulf jobs, Canada immigration, Australia jobs, USA work visa, ActiveVacancy FAQ" />
      </head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary-600 rounded-xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Complete Guide to <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">International Jobs</span></h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Everything Nepali professionals need to know about working abroad - from visa applications to career growth.
              <span className="block mt-2 text-primary-600">100+ detailed answers to your most important questions.</span>
            </p>
            {/* Stats */}
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-2xl font-bold">100k+</div>
                <div className="text-sm opacity-80">Nepali Job Seekers</div>
              </div>
              <div className="flex flex-col items-center">
                <Briefcase className="w-8 h-8 text-green-600 mb-2" />
                <div className="text-2xl font-bold">5k+</div>
                <div className="text-sm opacity-80">Visa-Sponsored Jobs</div>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="w-8 h-8 text-purple-600 mb-2" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-80">Countries</div>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-orange-600 mb-2" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-80">Expert Support</div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-8">
          <strong className="text-yellow-800">Disclaimer:</strong> ActiveVacancy is only a mediator between job seekers and the consultancies that facilitate overseas jobs and visas. All payments, costs, documentation, and legal matters are handled by the respective consultancies, not by ActiveVacancy.
        </div>
        {/* Quick Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Jump to Your Area of Interest</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {faqData.map((category) => (
              <button
                key={category.category}
                onClick={() => {
                  const element = document.getElementById(`category-${category.category.replace(/\s+/g, '-').toLowerCase()}`);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm text-center leading-tight">{category.category}</h3>
                <p className="text-xs text-gray-500 mt-2 text-center">{category.questions.length} questions</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-5xl mx-auto px-4 pb-16">
          {filteredFAQ.length === 0 && searchTerm ? (
            <div className="text-center py-20">
              <Search className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No results found for "{searchTerm}"</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Try different keywords or browse all categories below. Our comprehensive guide covers everything from visa applications to career growth.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search & Browse All
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredFAQ.map((category, categoryIndex) => (
                <div 
                  key={category.category} 
                  id={`category-${category.category.replace(/\s+/g, '-').toLowerCase()}`}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                >
                  <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 px-8 py-6 border-b border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg">
                          {category.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                          <p className="text-blue-700 text-sm mt-1">Essential information for your success</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full font-medium">
                          {category.questions.length} questions
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {category.questions.map((faq, index) => (
                      <div key={faq.id ?? `${categoryIndex}-${index}`} className="transition-all duration-300 hover:bg-blue-50/50">
                        <button
                          className="w-full px-8 py-6 text-left flex justify-between items-start focus:outline-none focus:bg-blue-50 transition-colors duration-200 group"
                          onClick={() => toggleSection(faq.id ?? `${categoryIndex}-${index}`)}
                        >
                          <div className="flex items-start space-x-5 flex-1">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mt-1 flex-shrink-0 group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
                              <span className="text-blue-700 font-bold text-sm">
                                {categoryIndex + 1}.{index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 text-left pr-4 mb-2 leading-tight group-hover:text-blue-900">
                                {faq.question ?? "No question provided"}
                              </h3>
                              <p className="text-sm text-gray-600 text-left">
                                {(faq.answer ?? "").substring(0, 120)}...
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              activeSection === faq.id 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                            }`}>
                              {activeSection === faq.id ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </div>
                          </div>
                        </button>
                        
                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          activeSection === faq.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="px-8 pb-8 ml-15">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-6 border-l-4 border-blue-600 shadow-inner">
                              <div className="prose prose-blue max-w-none">
                                <div 
                                  className="text-gray-700 leading-relaxed"
                                  dangerouslySetInnerHTML={{
                                    __html: (faq.answer ?? "").replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
                                  }}
                                />
                              </div>
                              {/* Related links or actions could go here */}
                              <div className="mt-4 pt-4 border-t border-blue-200">
                                <p className="text-xs text-blue-600 font-medium">
                                  💡 Tip: Bookmark this section for quick reference during your job search
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced CTA Section */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full -translate-x-48 translate-y-48"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Start Your International Career?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of successful Nepali professionals who found their dream jobs abroad through ActiveVacancy. 
                Your international career journey starts with a single click.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <a
                  href="/Jobs"
                  className="bg-white text-blue-800 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Briefcase className="w-6 h-6 mr-3" />
                  Browse 5000+ Visa Jobs
                </a>
                <a
                  href="/VisaJobs"
                  className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all duration-300 inline-flex items-center justify-center border-2 border-blue-400 hover:border-blue-300 transform hover:-translate-y-1"
                >
                  <Globe className="w-6 h-6 mr-3" />
                  Find Visa-Sponsored Jobs
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-blue-200" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">100% Verified Employers</h3>
                  <p className="text-blue-200 text-sm">All employers verified through our rigorous screening process</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Expert Nepali Support</h3>
                  <p className="text-blue-200 text-sm">Dedicated support team that understands your unique needs</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-blue-200" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Proven Success</h3>
                  <p className="text-blue-200 text-sm">98% visa approval rate for our placed candidates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Still Have Questions Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our dedicated support team is here to help you succeed in your international career journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                href="/Contact"
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Headphones className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Live Support</h3>
                <p className="text-sm text-gray-600">Chat with our experts</p>
              </a>
              
              <a
                href="tel:+977-1-5554525"
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 group text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-sm text-gray-600">Direct phone support</p>
              </a>
              
              <a
                href="/About"
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 group text-center"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">About Us</h3>
                <p className="text-sm text-gray-600">Learn our mission</p>
              </a>
              
              <a
                href="/PrivacyPolicy"
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 group text-center"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Privacy Policy</h3>
                <p className="text-sm text-gray-600">Your data security</p>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Popular Destinations</h4>
                <div className="space-y-2">
                  <a href="/jobs/uae" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <MapPin className="w-4 h-4 mr-2" />UAE Jobs
                  </a>
                  <a href="/jobs/qatar" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <MapPin className="w-4 h-4 mr-2" />Qatar Jobs
                  </a>
                  <a href="/jobs/canada" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <MapPin className="w-4 h-4 mr-2" />Canada Jobs
                  </a>
                  <a href="/jobs/australia" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <MapPin className="w-4 h-4 mr-2" />Australia Jobs
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Job Categories</h4>
                <div className="space-y-2">
                  <a href="/jobs/healthcare" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />Healthcare
                  </a>
                  <a href="/jobs/it" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />Information Technology
                  </a>
                  <a href="/jobs/construction" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />Construction
                  </a>
                  <a href="/jobs/hospitality" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />Hospitality
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
                <div className="space-y-2">
                  <a href="/VisaJobs" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <Globe className="w-4 h-4 mr-2" />Visa-Sponsored Jobs
                  </a>
                  <a href="/resume-builder" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <FileText className="w-4 h-4 mr-2" />Resume Builder
                  </a>
                  <a href="/interview-tips" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <Star className="w-4 h-4 mr-2" />Interview Tips
                  </a>
                  <a href="/salary-guide" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <DollarSign className="w-4 h-4 mr-2" />Salary Guide
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                <div className="space-y-2">
                  <a href="/Contact" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <Headphones className="w-4 h-4 mr-2" />Contact Support
                  </a>
                  <a href="/help" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <AlertCircle className="w-4 h-4 mr-2" />Help Center
                  </a>
                  <a href="/feedback" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <Star className="w-4 h-4 mr-2" />Give Feedback
                  </a>
                  <a href="/community" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm">
                    <Users className="w-4 h-4 mr-2" />Join Community
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add missing closing tag for main div */}
    </div>
    </React.Fragment>
  );
};

export default FAQ;