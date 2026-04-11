import React, { useEffect, useState } from 'react'
import { data, Link, useParams } from 'react-router-dom'
import { ArrowLeft, FileText, User, Briefcase, GraduationCap, Lightbulb, Folder, ChevronLeft, ChevronRight } from 'lucide-react'
import PersonalInfoForm from '../components/personalinfoForm'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/resumePreview'
import TemplateSelector from '../components/templateSelector'
import ColorPicker from '../components/colorPicker'
import ProfessionalSummeryForm from '../components/professionalSummeryForm'
import ExperienceForm from '../components/experienceForm'

function resumeBuilder() {
    const { resumeId } = useParams()
    const [resumeData, setResumeData] = useState({
        _id: "",
        title: "",
        personal_info: {},
        professional_summary: "",
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

    const activeSection = sections[activeSectionIndex]

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
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    {/* Left Sidebar - Form */}
                    <div className='relative lg:col-span-5 rounded-lg'>
                        <div className='bg-white rounded-lg shadow-sm border border-slate-200 p-6 pt-1'>
                            {/* Progress Bar*/}
                            <hr className='absolute top-0 left-0 h-1 bg-slate-200 rounded-full border-2' />
                            <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-2000 border-none' style={{ width: `${((activeSectionIndex + 1) / sections.length) * 100}%` }} />
                            {/* Section Navigation */}
                            <div className='flex justify-between items-center mb-6 border-b border-slate-200 py-1'>
                                <div className='flex items-center gap-2'>
                                    <TemplateSelector
                                        selectedTemplate={resumeData.template}
                                        onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                                    />
                                    <ColorPicker
                                        selectedColor={resumeData.accent_color}
                                        onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))}
                                    />
                                </div>

                                <div className='flex items-center'>
                                    <button
                                        onClick={() => setActiveSectionIndex((prevIndex) => Math.max(0, prevIndex - 1))}
                                        className={`flex items-center gap-1 p-2 rounded-lg text-sm font-medium transition-all ${activeSectionIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                                        disabled={activeSectionIndex === 0}
                                    >
                                        <ChevronLeft className='size-4' />
                                        <span>Back</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveSectionIndex((prevIndex) => Math.min(sections.length - 1, prevIndex + 1))}
                                        className={`flex items-center gap-1 p-2 rounded-lg text-sm font-medium transition-all ${activeSectionIndex === sections.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                                        disabled={activeSectionIndex === sections.length - 1}
                                    >
                                        <span>Next</span>
                                        <ChevronRight className='size-4' />
                                    </button>
                                </div>
                            </div>

                            {/* Section Tabs */}
                            <div className='flex overflow-x-auto no-scrollbar gap-2 mb-6 pb-2'>
                                {sections.map((section, index) => {
                                    const Icon = section.icon
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSectionIndex(index)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeSectionIndex === index ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                        >
                                            <Icon className='size-3.5' />
                                            {section.name}
                                        </button>
                                    )
                                })}
                            </div>
                            {/* Form Content */}
                            <div className='space-y-6'>
                                {activeSection.id === 'personal_info' && (
                                    <PersonalInfoForm data={resumeData.personal_info}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                                        removeBackground={removeBackground}
                                        setRemoveBackground={setRemoveBackground}
                                    />
                                )}
                                {activeSection.id === 'professional_summary' && (
                                    <ProfessionalSummeryForm data={resumeData.professional_summary}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                                    />
                                )}
                                {activeSection.id === 'experience' && (
                                    <ExperienceForm data={resumeData.experience}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))}
                                    />
                                )}
                                {/* {activeSection.id === 'education' && (
                                    <EducationForm data={resumeData.education}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}
                                    />
                                )}
                                {activeSection.id === 'skills' && (
                                    <SkillsForm data={resumeData.skills}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                                    />
                                )}
                                {activeSection.id === 'projects' && (
                                    <ProjectsForm data={resumeData.projects}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, projects: data }))}
                                    />
                                )} */}
                            </div>
                        </div>
                    </div>
                    {/* Right Sidebar - Resume Preview */}
                    <div className='lg:col-span-7'>
                        <div className='sticky top-6'>
                            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default resumeBuilder