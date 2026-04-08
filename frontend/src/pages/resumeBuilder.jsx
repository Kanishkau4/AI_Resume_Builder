import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, FileText, User, Briefcase, GraduationCap, Lightbulb, Folder, ChevronLeft, ChevronRight } from 'lucide-react'

function resumeBuilder() {
    const { resumeId } = useParams()
    const [resumeData, setResumeData] = useState({
        _id: "",
        title: "",
        personalInfo: {},
        professionalSummary: "",
        experience: [],
        education: [],
        skills: [],
        projects: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false,
    })

    const loadExistingResume = async () => {
        const resume = dummyResumeData.find(resume => resume._id === resumeId)
        if (resume) {
            setResumeData(resume)
            document.title = resume.title
        }
    }

    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    const [removeBackground, setRemoveBackground] = useState(false)

    const sections = [
        { id: "personal_info", name: "Personal Information", icon: User },
        { id: "professional_summary", name: "Professional Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "skills", name: "Skills", icon: Lightbulb },
        { id: "projects", name: "Projects", icon: Folder },
    ]

    const handleActiveSection = sections[activeSectionIndex]

    useEffect(() => {
        loadExistingResume()
    }, [])
    return (
        <div>
            <div className='max-w-7xl mx-auto px-4 py-6'>
                <Link to="/app" className='inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all'>
                    <ArrowLeft className='size-4' />Back to Dashboard
                </Link>
            </div>
            <div className='max-w-7xl mx-auto px-4 pb-8'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
                    {/* Left Sidebar - Form */}
                    <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
                        <div className='bg-white rounded-lg shadow-sm border border-slate-200 p-6 pt-1'>
                            {/* Progress Bar*/}
                            <hr className='absolute top-0 left-0 h-1 bg-slate-200 rounded-full border-2' />
                            <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-2000 border-none' style={{ width: `${((activeSectionIndex + 1) / sections.length) * 100}%` }} />
                            {/* Section Navigation */}
                            <div className='flex justify-between items-center mb-6 border-b border-slate-200 py-1'>
                                <div></div>
                                <div className='flex items-center'>
                                    {activeSectionIndex !== 0 && (
                                        <button
                                            onClick={() => setActiveSectionIndex((prevIndex) => Math.max(0, prevIndex - 1, 0))}
                                            className='flex item-center gap-1 p-3 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 transition-all'
                                            disabled={activeSectionIndex === 0}
                                        >
                                            <ChevronLeft className='size-4' />
                                            <span>Back</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setActiveSectionIndex((prevIndex) => Math.min(0, prevIndex + 1, sections.length - 1))}
                                        className={`flex item-center gap-1 p-3 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 transition-all 
                                                ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}
                                        disabled={activeSectionIndex === 0}
                                    >
                                        <span>Next</span>
                                        <ChevronRight className='size-4' />
                                    </button>
                                </div>
                            </div>
                            {/* Form Content */}
                            <div className='space-y-6'>
                                {activeSection.id === 'personal_info' && (
                                    <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} />
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Right Sidebar - Resume Preview */}
                    <div className='md:col-span-8'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default resumeBuilder