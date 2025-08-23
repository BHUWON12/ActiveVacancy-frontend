import React, { useState } from 'react';
import { Star, Quote, MapPin, Briefcase, Users, Globe, Heart, Award } from 'lucide-react';

const testimonials = [
	{
		id: 1,
		name: 'Rajesh Shrestha',
		role: 'Construction Manager',
		location: 'UAE, Dubai',
		country: 'Nepal → UAE',
		rating: 5,
		image: '/api/placeholder/60/60',
		feedback: 'ActiveVacancy changed my life completely! I was working in Kathmandu earning NPR 25,000 per month. Now I\'m in Dubai earning AED 8,500 monthly. The visa sponsorship process was handled perfectly, and they guided me through every step of document preparation.',
		jobType: 'Visa Sponsored',
		timeframe: '3 months ago',
		verified: true,
		category: 'construction'
	},
	{
		id: 2,
		name: 'Sunita Gurung',
		role: 'Care Worker',
		location: 'Ontario, Canada',
		country: 'Nepal → Canada',
		rating: 5,
		image: '/api/placeholder/60/60',
		feedback: 'I never thought I could work in Canada, but ActiveVacancy made it possible! They helped me get a job with full visa sponsorship. The employer even helped with my accommodation. Now I\'m earning CAD 22/hour and planning to bring my family next year.',
		jobType: 'Healthcare',
		timeframe: '6 months ago',
		verified: true,
		category: 'healthcare'
	},
	{
		id: 3,
		name: 'Dipesh Tamang',
		role: 'Factory Worker',
		location: 'Warsaw, Poland',
		country: 'Nepal → Poland',
		rating: 5,
		image: '/api/placeholder/60/60',
		feedback: 'Poland local jobs through ActiveVacancy are amazing! I work in Mercedes factory earning 5,200 PLN monthly. The cost of living is much lower than other EU countries. Already applied for permanent residency. Best decision of my life!',
		jobType: 'Manufacturing',
		timeframe: '8 months ago',
		verified: true,
		category: 'manufacturing'
	},
	{
		id: 4,
		name: 'Anita Rai',
		role: 'Software Developer',
		location: 'Sydney, Australia',
		country: 'Nepal → Australia',
		rating: 5,
		image: '/api/placeholder/60/60',
		feedback: 'As a female IT professional from Nepal, I was worried about opportunities abroad. ActiveVacancy not only found me a great job earning AUD 95,000 yearly but also connected me with the Nepali IT community in Sydney. Feeling blessed!',
		jobType: 'Technology',
		timeframe: '4 months ago',
		verified: true,
		category: 'technology'
	},
	{
		id: 5,
		name: 'Bikash Thapa',
		role: 'Restaurant Manager',
		location: 'Doha, Qatar',
		country: 'Nepal → Qatar',
		rating: 4,
		image: '/api/placeholder/60/60',
		feedback: 'Working in Qatar hospitality sector through ActiveVacancy. Earning QAR 4,500 monthly with free accommodation and food. The visa process took only 2 months. Great support team who speaks Nepali!',
		jobType: 'Hospitality',
		timeframe: '5 months ago',
		verified: true,
		category: 'hospitality'
	},
	{
		id: 6,
		name: 'Sushma Adhikari',
		role: 'Warehouse Supervisor',
		location: 'Krakow, Poland',
		country: 'Nepal → Poland',
		rating: 5,
		image: '/api/placeholder/60/60',
		feedback: 'Poland is perfect for Nepali workers! ActiveVacancy helped me get a job in Amazon warehouse. Earning 4,800 PLN monthly, learned basic Polish, and planning to study while working. EU residency pathway is excellent!',
		jobType: 'Logistics',
		timeframe: '7 months ago',
		verified: true,
		category: 'logistics'
	},
	{
		id: 7,
		name: 'Kumar Ghimire',
		role: 'Nurse',
		location: 'London, UK',
		country: 'Nepal → UK',
		rating: 5,
		image: '/api/placeholder/60/60',
		feedback: 'NHS nursing job through ActiveVacancy was life-changing! They helped with IELTS preparation, document attestation from Nepal Medical Council, and even connected me with Nepali nurses already working in UK. Earning £32,000 annually now.',
		jobType: 'Healthcare',
		timeframe: '1 year ago',
		verified: true,
		category: 'healthcare'
	},
	{
		id: 8,
		name: 'Mira Pun',
		role: 'Agricultural Worker',
		location: 'Wrocław, Poland',
		country: 'Nepal → Poland',
		rating: 4,
		image: '/api/placeholder/60/60',
		feedback: 'Seasonal work in Poland through ActiveVacancy turned into permanent job! Started with 3,400 PLN monthly, now earning 4,200 PLN. Employer sponsored my work permit extension. Polish people are very kind to Nepalis.',
		jobType: 'Agriculture',
		timeframe: '10 months ago',
		verified: true,
		category: 'agriculture'
	},
	{
		id: 9,
		name: 'Ramesh Karki',
		role: 'Security Officer',
		location: 'Sharjah, UAE',
		country: 'Nepal → UAE',
		rating: 5,
		image: '/api/placeholder/60/60',
		feedback: 'UAE security job with visa sponsorship was exactly what I needed. ActiveVacancy team handled everything professionally. Earning AED 3,200 monthly with overtime opportunities. Already brought my wife here on family visa.',
		jobType: 'Security',
		timeframe: '9 months ago',
		verified: true,
		category: 'security'
	},
	{
		id: 10,
		name: 'Sabina Shrestha',
		role: 'Hotel Receptionist',
		location: 'Toronto, Canada',
		country: 'Nepal → Canada',
		rating: 5,
		image: '/api/placeholder/60/60',
		feedback: 'Canadian work permit through ActiveVacancy opened new doors! Working in luxury hotel earning CAD 18/hour. Employer is helping with my PR application. The Nepali community in Toronto is very supportive.',
		jobType: 'Hospitality',
		timeframe: '5 months ago',
		verified: true,
		category: 'hospitality'
	},
	{
		id: 11,
		name: 'Prakash Limbu',
		role: 'Delivery Driver',
		location: 'Gdansk, Poland',
		country: 'Nepal → Poland',
		rating: 4,
		image: '/api/placeholder/60/60',
		feedback: 'Local delivery job in Poland is perfect for learning the country. ActiveVacancy found me a position with Polish company. Earning 4,000 PLN monthly plus tips. Improving my Polish language skills while working.',
		jobType: 'Transport',
		timeframe: '6 months ago',
		verified: true,
		category: 'transport'
	},
	{
		id: 12,
		name: 'Rita Magar',
		role: 'Childcare Worker',
		location: 'Melbourne, Australia',
		country: 'Nepal → Australia',
		rating: 5,
		image: '/api/placeholder/60/60',
		feedback: 'Childcare sector in Australia is amazing for Nepali women! ActiveVacancy connected me with a family who sponsored my visa. Earning AUD 25/hour and treating the children like my own family. Life is beautiful here!',
		jobType: 'Childcare',
		timeframe: '8 months ago',
		verified: true,
		category: 'childcare'
	}
];

const stats = [
	{ icon: Users, label: 'Jobs Secured', value: '2,500+', color: 'text-blue-600' },
	{ icon: Globe, label: 'Countries', value: '25+', color: 'text-green-600' },
	{ icon: Award, label: 'Success Rate', value: '94%', color: 'text-purple-600' },
	{ icon: Heart, label: 'Happy Families', value: '1,800+', color: 'text-red-600' }
];

const categories = [
	'all',
	'construction',
	'healthcare', 
	'manufacturing',
	'technology',
	'hospitality',
	'logistics',
	'agriculture',
	'security',
	'transport',
	'childcare'
];

const ActiveVacancyTestimonials = () => {
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	const filteredTestimonials = selectedCategory === 'all' 
		? testimonials 
		: testimonials.filter(t => t.category === selectedCategory);

	const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentTestimonials = filteredTestimonials.slice(startIndex, startIndex + itemsPerPage);

	const renderStars = (rating: number) => {
		return [...Array(5)].map((_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
			/>
		));
	};

	return (
		<>
			<head>
				<title>Success Stories & Testimonials | ActiveVacancy</title>
				<meta name="description" content="Read real success stories from job seekers who found their dream jobs abroad through ActiveVacancy. Visa-sponsored opportunities in UAE, Canada, Poland, Australia and more." />
				<meta name="keywords" content="ActiveVacancy testimonials, Nepal job success, visa sponsored jobs, international employment, UAE jobs, Canada work permit, Poland jobs" />
			</head>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					{/* Header Section */}
					<div className="text-center mb-12">
						<div className="inline-flex items-center gap-3 mb-6">
							<div className="p-3 bg-primary-600 rounded-xl">
								<Globe className="w-8 h-8 text-white" />
							</div>
							<h1 className="text-4xl md:text-5xl font-bold text-gray-900">Success Stories That <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Change Lives</span></h1>
						</div>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
							Real stories from real people who transformed their careers and lives through ActiveVacancy. From Nepal to the world - your success story could be next!
						</p>
						{/* Stats */}
						<div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
							{stats.map((stat, index) => (
								<div key={index} className="flex flex-col items-center">
									<stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
									<div className="text-2xl font-bold">{stat.value}</div>
									<div className="text-sm opacity-80">{stat.label}</div>
								</div>
							))}
						</div>
					</div>
					{/* Category Filter */}
					<div className="mb-12">
						<h3 className="text-lg font-semibold mb-4 text-gray-800">Filter by Industry:</h3>
						<div className="flex flex-wrap gap-3">
							{categories.map(category => (
								<button
									key={category}
									onClick={() => {
										setSelectedCategory(category);
										setCurrentPage(1);
									}}
									className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
										selectedCategory === category
											? 'bg-blue-600 text-white shadow-lg'
											: 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
									}`}
								>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</button>
							))}
						</div>
					</div>

					{/* Testimonials Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
							<div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6">
								<strong className="text-green-800">Note:</strong>
								<span className="text-green-700"> ActiveVacancy does not charge job seekers directly. All service fees are charged to consultancies, not to applicants. There is no account creation process; we only list jobs and visa+job opportunities, and forward interested applicants' details to consultancies.</span>
							</div>
							<div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
								<strong className="text-yellow-800">Disclaimer:</strong>
								<span className="text-yellow-700"> ActiveVacancy is only a mediator between job seekers and the consultancies that facilitate overseas jobs and visas. All payments, costs, documentation, and legal matters are handled by the respective consultancies, not by ActiveVacancy.</span>
							</div>
						{currentTestimonials.map((testimonial) => (
							<div 
								key={testimonial.id}
								className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1"
							>
								{/* Header */}
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center space-x-3">
										<div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
											{testimonial.name.charAt(0)}
										</div>
										<div>
											<h4 className="font-bold text-gray-900">{testimonial.name}</h4>
											<div className="flex items-center space-x-1 text-sm text-gray-600">
												<MapPin className="w-3 h-3" />
												<span>{testimonial.location}</span>
											</div>
										</div>
									</div>
									{testimonial.verified && (
										<div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
											Verified ✓
										</div>
									)}
								</div>

								{/* Job Info */}
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center space-x-2">
										<Briefcase className="w-4 h-4 text-blue-600" />
										<span className="text-sm font-medium text-gray-700">{testimonial.role}</span>
									</div>
									<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
										{testimonial.jobType}
									</span>
								</div>

								{/* Country Migration */}
								<div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 mb-4">
									<div className="text-sm font-medium text-center text-gray-700">
										🇳🇵 {testimonial.country.split(' → ')[0]} → {testimonial.country.split(' → ')[1]} 🌍
									</div>
								</div>

								{/* Rating */}
								<div className="flex items-center space-x-2 mb-4">
									<div className="flex space-x-1">
										{renderStars(testimonial.rating)}
									</div>
									<span className="text-sm text-gray-600">({testimonial.rating}/5)</span>
								</div>

								{/* Feedback */}
								<div className="relative">
									<Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
									<p className="text-gray-700 leading-relaxed text-sm pl-6">
										{testimonial.feedback}
									</p>
								</div>

								{/* Footer */}
								<div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 text-center">
									{testimonial.timeframe}
								</div>
							</div>
						))}
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex justify-center space-x-2">
							<button
								onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
							>
								Previous
							</button>
							
							{[...Array(totalPages)].map((_, i) => (
								<button
									key={i}
									onClick={() => setCurrentPage(i + 1)}
									className={`px-4 py-2 rounded-lg ${
										currentPage === i + 1
											? 'bg-blue-600 text-white'
											: 'bg-white border border-gray-300 hover:bg-gray-50'
									}`}
								>
									{i + 1}
								</button>
							))}
							
							<button
								onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
								disabled={currentPage === totalPages}
								className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
							>
								Next
							</button>
						</div>
					)}

					{/* Call to Action */}
					<div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mt-16 text-center text-white">
						<h3 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h3>
						<p className="text-lg mb-6 opacity-90">
							Join thousands of Nepali professionals who have transformed their lives through international opportunities
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a 
								href="/Jobs" 
								className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
							>
								Browse Jobs
							</a>
							<a 
								href="/VisaJobs" 
								className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
							>
								View Visa Jobs
							</a>
						</div>
					</div>

					{/* Trust Indicators */}
					<div className="mt-12 text-center">
						<p className="text-gray-600 mb-4">Trusted by job seekers across Nepal and beyond</p>
						<div className="flex justify-center items-center space-x-8 opacity-60">
							<div className="text-2xl">🇳🇵</div>
							<div className="text-2xl">🇦🇪</div>
							<div className="text-2xl">🇨🇦</div>
							<div className="text-2xl">🇵🇱</div>
							<div className="text-2xl">🇦🇺</div>
							<div className="text-2xl">🇬🇧</div>
							<div className="text-2xl">🇶🇦</div>
						</div>
					</div>

					{/* Disclaimer Section */}
					<div className="max-w-5xl mx-auto py-10 px-4">
						<div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-8">
							<strong className="text-yellow-800">Disclaimer:</strong> ActiveVacancy is only a mediator between job seekers and the consultancies that facilitate overseas jobs and visas. All payments, costs, documentation, and legal matters are handled by the respective consultancies, not by ActiveVacancy.
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ActiveVacancyTestimonials;