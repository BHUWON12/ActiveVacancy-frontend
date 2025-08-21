"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Globe,
  FileText,
  Users,
  Calendar,
  Download,
  X,
  CheckCircle,
  Award,
  Building,
} from "lucide-react"
import { visaJobsService, visaJobApplicationsService } from "../services/api"
import type { VisaJob } from "../types"
import LoadingSpinner from "../components/UI/LoadingSpinner"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface ApplicationFormData {
  fullName: string
  passportNumber: string
  contactNumber: string
  email: string
  desiredCountry: string
  jobRole: string
  expectedSalary: string
  educationQualification: string
  yearsOfExperience: string
}

export default function VisaJobs() {
  const [visaJobs, setVisaJobs] = useState<VisaJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [locationFilter, setLocationFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJob, setSelectedJob] = useState<VisaJob | null>(null)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const [applicationData, setApplicationData] = useState<ApplicationFormData | null>(null)
  const [referenceId, setReferenceId] = useState("")
  const [appliedDate, setAppliedDate] = useState("")
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: "",
    passportNumber: "",
    contactNumber: "",
    email: "",
    desiredCountry: "",
    jobRole: "",
    expectedSalary: "",
    educationQualification: "",
    yearsOfExperience: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchVisaJobs = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await visaJobsService.getAll()
        if (Array.isArray(response)) {
          const formattedData = response.map((job) => ({
            id: job._id,
            title: job.title,
            country: job.country,
            visaType: job.visa_type,
            salary: job.salary,
            contractDuration: job.contract_duration,
            vacancies: job.vacancies,
            processingTime: job.processing_time,
            includes: job.includes,
            description: job.description,
          }))
          setVisaJobs(formattedData)
        } else {
          console.error("Invalid data format received:", response)
          setError("Invalid data format received from server")
        }
      } catch (err: any) {
        console.error("Error fetching visa jobs:", err)
        setError(err.response?.data?.detail || "Failed to fetch visa jobs")
      } finally {
        setLoading(false)
      }
    }

    fetchVisaJobs()
  }, [])

  const filteredJobs = useMemo(() => {
    return visaJobs.filter((job) => {
      const matchesLocation = !locationFilter || job.country.toLowerCase().includes(locationFilter.toLowerCase())
      const matchesSearch = !searchTerm || job.title.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesLocation && matchesSearch
    })
  }, [visaJobs, locationFilter, searchTerm])

  const generateReferenceId = () => {
    const year = new Date().getFullYear()
    const serial = Math.floor(Math.random() * 9999) + 1
    return `AV-${year}-${serial.toString().padStart(4, "0")}`
  }

  const maskPassportNumber = (passport: string) => {
    if (passport.length <= 4) return passport
    return "X".repeat(passport.length - 4) + passport.slice(-4)
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.fullName.trim()) errors.fullName = "Full name is required"
    if (!formData.passportNumber.trim()) errors.passportNumber = "Passport number is required"
    if (!formData.contactNumber.trim()) errors.contactNumber = "Contact number is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleApply = (job: VisaJob) => {
    setSelectedJob(job)
    setFormData((prev) => ({
      ...prev,
      desiredCountry: job.country,
      jobRole: job.title,
    }))
    setIsApplicationModalOpen(true)
  }

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || !selectedJob) return

    const applicationData = {
      visa_job_id: selectedJob.id,
      full_name: formData.fullName,
      passport_number: formData.passportNumber,
      contact_number: formData.contactNumber,
      email: formData.email,
      desired_country: formData.desiredCountry,
      job_role: formData.jobRole,
      expected_salary: formData.expectedSalary,
      education_qualification: formData.educationQualification,
      years_of_experience: formData.yearsOfExperience,
    }

    try {
      const response = await visaJobApplicationsService.create(applicationData)
      setReferenceId(response.reference_id)
      setAppliedDate(response.applied_date)
      setApplicationData(formData)
      setIsApplicationModalOpen(false)
      setIsReferralModalOpen(true)
    } catch (error) {
      console.error("Error submitting application:", error)
    }
  }

  const handleDownloadReferral = () => {
    const input = document.getElementById("referral-letter")
    if (input) {
      html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: 794, // A4 width at 96 DPI
        height: 1123, // A4 height at 96 DPI
        logging: false,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.8)
        const pdf = new jsPDF("p", "mm", "a4")
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight)
        pdf.save(`ActiveVacancy-Referral-${referenceId}.pdf`)
      })
    }
  }

  const resetForm = () => {
    setFormData({
      fullName: "",
      passportNumber: "",
      contactNumber: "",
      email: "",
      desiredCountry: "",
      jobRole: "",
      expectedSalary: "",
      educationQualification: "",
      yearsOfExperience: "",
    })
    setFormErrors({})
  }

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false)
    resetForm()
  }

  const closeReferralModal = () => {
    setIsReferralModalOpen(false)
    setApplicationData(null)
    setReferenceId("")
    resetForm()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary-600 rounded-xl">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Visa + Job Opportunities</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your gateway to international career opportunities with comprehensive visa support
          </p>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Verified Employers</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Visa Assistance</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-500" />
              <span>Global Opportunities</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Search className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Find Your Perfect Opportunity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="text"
                placeholder="Search job titles, skills, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/80"
              />
            </div>

            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="text"
                placeholder="Filter by country or location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/80"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-lg">
              <span className="font-semibold text-primary-600">{filteredJobs.length}</span> visa job
              {filteredJobs.length !== 1 ? "s" : ""} available
              {locationFilter && <span className="text-gray-500"> in {locationFilter}</span>}
              {searchTerm && <span className="text-gray-500"> matching "{searchTerm}"</span>}
            </p>
          </div>
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="p-4 bg-red-50 rounded-xl inline-block mb-4">
              <X className="w-8 h-8 text-red-500 mx-auto" />
            </div>
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl hover:bg-white/90 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-primary-600 font-semibold text-lg">{job.country}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Visa Type</p>
                          <p className="text-sm font-medium text-gray-900">{job.visaType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Users className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Positions</p>
                          <p className="text-sm font-medium text-gray-900">{job.vacancies}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Processing</p>
                          <p className="text-sm font-medium text-gray-900">{job.processingTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Contract</p>
                          <p className="text-sm font-medium text-gray-900">{job.contractDuration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.includes.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-primary-100 to-blue-100 text-primary-800 text-sm rounded-full font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                        <span className="text-green-800 font-bold text-lg">{job.salary}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:ml-8 flex-shrink-0">
                    <button
                      onClick={() => handleApply(job)}
                      className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="p-6 bg-gray-50 rounded-2xl inline-block mb-6">
              <Search className="w-12 h-12 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              No visa jobs found matching your criteria. Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>

      {isApplicationModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleApplicationSubmit}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Apply for {selectedJob.title}</h3>
                  <p className="text-primary-600 font-semibold">{selectedJob.country}</p>
                </div>
                <button
                  onClick={closeApplicationModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all ${
                      formErrors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-transparent"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Passport Number *</label>
                  <input
                    type="text"
                    value={formData.passportNumber}
                    onChange={(e) => setFormData((prev) => ({ ...prev, passportNumber: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all ${
                      formErrors.passportNumber
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-transparent"
                    }`}
                    placeholder="Enter passport number"
                  />
                  {formErrors.passportNumber && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {formErrors.passportNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactNumber: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all ${
                      formErrors.contactNumber ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-transparent"
                    }`}
                    placeholder="Enter contact number"
                  />
                  {formErrors.contactNumber && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {formErrors.contactNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all ${
                      formErrors.email ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-transparent"
                    }`}
                    placeholder="Enter email address"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Desired Country</label>
                  <input
                    type="text"
                    value={formData.desiredCountry}
                    onChange={(e) => setFormData((prev) => ({ ...prev, desiredCountry: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Preferred country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Role</label>
                  <input
                    type="text"
                    value={formData.jobRole}
                    onChange={(e) => setFormData((prev) => ({ ...prev, jobRole: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Desired job role"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Salary</label>
                  <input
                    type="text"
                    value={formData.expectedSalary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, expectedSalary: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Expected salary range"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Education Qualification</label>
                  <input
                    type="text"
                    value={formData.educationQualification}
                    onChange={(e) => setFormData((prev) => ({ ...prev, educationQualification: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Highest qualification"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                <input
                  type="text"
                  value={formData.yearsOfExperience}
                  onChange={(e) => setFormData((prev) => ({ ...prev, yearsOfExperience: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Total years of experience"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={closeApplicationModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 font-semibold transition-all transform hover:scale-105"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

{isReferralModalOpen && applicationData && selectedJob && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
    <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl flex flex-col">
      
      {/* Header Section */}
      <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Application Successful!</h3>
            <p className="text-gray-600 text-sm sm:text-base">Your referral letter has been generated</p>
          </div>
        </div>
        <button
          onClick={closeReferralModal}
          className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* A4 Referral Letter */}
      <div
        id="referral-letter"
        className="mx-auto bg-white w-full sm:max-w-[794px] p-4 sm:p-8"
        style={{
          minHeight: "1123px",
          fontSize: "14px",
          lineHeight: "1.5",
          fontFamily: "Arial, sans-serif",
          color: "#1f2937",
        }}
      >
        {/* Header with Reference ID */}
        <div className="text-center mb-6 sm:mb-8 pb-4 border-b-2 border-blue-200">
          <h1 className="text-2xl sm:text-4xl font-black text-blue-600 mb-1 tracking-wide">ACTIVEVACANCY</h1>
          <p className="text-gray-600 text-sm sm:text-base font-medium">International Career Solutions</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Connecting Talent with Global Opportunities</p>
          <div className="mt-3 sm:mt-4 border-2 border-blue-300 rounded-lg p-2 sm:p-3 inline-block shadow-sm">
            <p className="text-blue-800 font-bold text-lg sm:text-xl">Reference ID: {referenceId}</p>
          </div>
        </div>

        {/* Candidate & Position Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Candidate Info */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3">Candidate Information</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Full Name:</strong> {applicationData.fullName}</p>
              <p><strong>Passport No:</strong> {maskPassportNumber(applicationData.passportNumber)}</p>
              <p><strong>Contact:</strong> {applicationData.contactNumber}</p>
              <p><strong>Email:</strong> {applicationData.email}</p>
              {applicationData.educationQualification && <p><strong>Education:</strong> {applicationData.educationQualification}</p>}
              {applicationData.yearsOfExperience && <p><strong>Experience:</strong> {applicationData.yearsOfExperience} years</p>}
              {applicationData.expectedSalary && <p><strong>Expected Salary:</strong> {applicationData.expectedSalary}</p>}
            </div>
          </div>

          {/* Position Info */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3">Position Details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Job Title:</strong> {selectedJob.title}</p>
              <p><strong>Country:</strong> {selectedJob.country}</p>
              <p><strong>Visa Type:</strong> {selectedJob.visaType}</p>
              <p><strong>Salary Range:</strong> {selectedJob.salary}</p>
              <p><strong>Contract Period:</strong> {selectedJob.contractDuration}</p>
              <p><strong>Processing Time:</strong> {selectedJob.processingTime}</p>
            </div>
          </div>
        </div>

        {/* Employment Benefits */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-bold mb-3">Employment Package Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {selectedJob.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Confirmation */}
        <div className="mb-6 sm:mb-8 p-4 border border-blue-200 rounded-md bg-blue-50 text-sm">
          <h3 className="font-bold mb-2">Official Placement Confirmation</h3>
          <p>
            This document confirms that <strong>{applicationData.fullName}</strong> has applied for the position of{" "}
            <strong>{selectedJob.title}</strong> in <strong>{selectedJob.country}</strong> via ActiveVacancy.
          </p>
          <p>Application Date: {new Date().toLocaleDateString()}</p>
          <p>Application submitted and under review by partner recruitment agencies.</p>
        </div>

        {/* Disclaimer */}
        <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-md text-sm mb-6 sm:mb-8">
          <h4 className="font-bold mb-1">Important Legal Disclaimer</h4>
          <p>
            ACTIVEVACANCY acts as a referral platform only. Visa processing and legal procedures are handled by certified partners. This letter does not guarantee visa approval or job confirmation.
          </p>
        </div>

        {/* Contact Info */}
        <div className="p-4 border border-gray-200 bg-gray-50 rounded-md text-sm mb-6 sm:mb-8">
          <h4 className="font-bold mb-2">Contact Information</h4>
          <p>Support: support@activevacancy.com</p>
          <p>Website: www.activevacancy.com</p>
          <p>Use Reference ID: {referenceId}</p>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-gray-300 pt-4 text-xs text-gray-500">
          Document generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4 sm:p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-4 bg-gray-50">
        <button
          onClick={handleDownloadReferral}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" /> Download PDF
        </button>
        <button
          onClick={closeReferralModal}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  )
}