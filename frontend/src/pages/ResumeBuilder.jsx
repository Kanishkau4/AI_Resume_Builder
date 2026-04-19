import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, User, Briefcase, GraduationCap, Lightbulb, Folder, ChevronLeft, ChevronRight, Save, Eye, EyeClosed, Download } from 'lucide-react'
import PersonalInfoForm from '../components/personalinfoForm'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/resumePreview'
import TemplateSelector from '../components/templateSelector'
import ColorPicker from '../components/colorPicker'
import ProfessionalSummaryForm from '../components/professionalSummaryForm'
import ExperienceForm from '../components/experienceForm'
import EducationForm from '../components/educationForm'
import ProjectsForm from '../components/projectsForm'
import SkillsForm from '../components/skillsForm'
import { FaShare } from 'react-icons/fa'
import api from '../config/api'
import { useSelector } from 'react-redux'
import { gooeyToast } from 'goey-toast'

function ResumeBuilder() {
    const { resumeId } = useParams()
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
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
        try {
            const { data } = await api.get(`/api/resumes/get/` + resumeId, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data && data._id) {
                setResumeData(data)
                document.title = data.title || "Resume Builder"
            } else {
                gooeyToast.error("Resume not found", { preset: "bouncy" })
                navigate('/app')
            }
        } catch (error) {
            gooeyToast.error(error.response?.data?.message || "Something went wrong", { preset: "bouncy" })
            navigate('/app')
        }
    }

    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    const [removeBackground, setRemoveBackground] = useState(false)

    const handleRemoveBackgroundChange = (value) => {
        setRemoveBackground(value)
        // If enabling background removal and we have a local file selected, trigger the save immediately
        if (value && resumeData.personal_info.image instanceof File) {
            gooeyToast.promise(saveData(value), {
                loading: 'Removing background...',
                success: 'Background removed!',
                error: 'Failed to remove background',
                description: {
                    success: 'Your image has been processed.',
                    error: 'Please try again later.',
                }
            })
        }
    }

    const sections = [
        { id: "personal_info", name: "Personal Information", icon: User },
        { id: "professional_summary", name: "Professional Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "projects", name: "Projects", icon: Folder },
        { id: "skills", name: "Skills", icon: Lightbulb },
    ]

    const activeSection = sections[activeSectionIndex]

    useEffect(() => {
        loadExistingResume()
    }, [])

    const changeResumeVisibility = async () => {
        try {
            const formData = new FormData()
            formData.append("resumeId", resumeId)
            const updatedResumeData = { ...resumeData, public: !resumeData.public }
            formData.append("resumeData", JSON.stringify(updatedResumeData))
            const { data } = await api.put(`/api/resumes/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            setResumeData(updatedResumeData)
            gooeyToast.success("Resume visibility changed successfully", { preset: "bouncy" })
        } catch (error) {
            gooeyToast.error(error.response?.data?.message || "Something went wrong", { preset: "bouncy" })
        }
    }

    const handleShare = () => {
        const shareUrl = window.location.href.split('/app')[0]
        const shareLink = shareUrl + '/view/' + resumeId
        if (navigator.share) {
            navigator.share({
                title: resumeData.title,
                text: 'Check out my resume',
                url: shareLink,
            })
        } else {
            navigator.clipboard.writeText(shareLink)
            gooeyToast.success("Link copied to clipboard", { preset: "bouncy" })
        }
    }

    const downloadResume = () => {
        const originalTitle = document.title
        document.title = resumeData.title || "Resume"
        window.print()
        document.title = originalTitle
    }

    const saveData = async (removeBGOverride = null) => {
        const isRemoveBG = removeBGOverride !== null ? removeBGOverride : removeBackground;
        let uploadresumeData = structuredClone(resumeData)

        // remove image from uploadresumeData
        const isNewImage = uploadresumeData.personal_info && resumeData.personal_info.image instanceof File;
        if (isNewImage) {
            delete uploadresumeData.personal_info.image
        }

        const formData = new FormData()
        formData.append("resumeId", resumeId)
        formData.append("resumeData", JSON.stringify(uploadresumeData))
        if(isRemoveBG) formData.append("removeBackground", "true")
        if (isNewImage) formData.append("image", resumeData.personal_info.image)

        const { data } = await api.put(`/api/resumes/update`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        setResumeData(data)
        return data
    }
    return (
        <div>
            <div className='max-w-7xl mx-auto px-4 py-6 print:hidden'>
                <Link to="/app" className='inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all'>
                    <ArrowLeft className='size-4' />Back to Dashboard
                </Link>
            </div>
            <div className='max-w-7xl mx-auto px-4 pb-8 print:p-0 print:m-0 print:max-w-none print:w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:gap-0'>
                    {/* Left Sidebar - Form */}
                    <div className='relative lg:col-span-5 rounded-lg print:hidden'>
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
                                        setRemoveBackground={handleRemoveBackgroundChange}
                                    />
                                )}
                                {activeSection.id === 'professional_summary' && (
                                    <ProfessionalSummaryForm data={resumeData.professional_summary}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                                    />
                                )}
                                {activeSection.id === 'experience' && (
                                    <ExperienceForm data={resumeData.experience}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))}
                                    />
                                )}
                                {activeSection.id === 'education' && (
                                    <EducationForm data={resumeData.education}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}
                                    />
                                )}
                                {activeSection.id === 'projects' && (
                                    <ProjectsForm data={resumeData.projects}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, projects: data }))}
                                    />
                                )}
                                {activeSection.id === 'skills' && (
                                    <SkillsForm data={resumeData.skills}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                                    />
                                )}
                            </div>
                            <div className='flex justify-between mt-6'>
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
                            <div className='flex justify-between mt-6'>
                                <button
                                    onClick={() => gooeyToast.promise(saveData(), {
                                        loading: 'Saving...',
                                        success: 'Changes saved',
                                        error: 'Something went wrong',
                                        description: {
                                            success: 'All changes have been synced.',
                                            error: 'Please try again later.',
                                        },
                                        action: {
                                            error: {
                                                label: 'Retry',
                                                onClick: () => saveData(),
                                            },
                                        },
                                    })}
                                    className={`flex items-center gap-1 p-2 rounded-lg text-sm font-medium transition-all bg-green-500 text-white hover:bg-green-600`}
                                >
                                    <Save className='size-4' />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Right Sidebar - Resume Preview */}
                    <div className='lg:col-span-7 print:w-full print:block'>
                        <div className='relative w-full print:hidden'>
                            {/* --- Buttons --- */}
                            <div className='absolute bottom-3 left-0 right-0 z-10 flex justify-end gap-2'>
                                {resumeData.public && (
                                    <button onClick={handleShare} className='flex items-center gap-2 p-2 px-4 rounded-lg bg-white shadow-sm hover:bg-slate-50 hover:text-emerald-500 transition-colors'>
                                        <FaShare className='size-4' />
                                        <span>Share</span>
                                    </button>
                                )}
                                <button onClick={changeResumeVisibility} className='flex items-center gap-2 p-2 px-4 rounded-lg bg-white shadow-sm hover:bg-slate-50 hover:text-emerald-500 transition-colors'>
                                    {resumeData.public ? <Eye className='size-4' /> : <EyeClosed className='size-4' />}
                                    <span>{resumeData.public ? 'Public' : 'Private'}</span>
                                </button>
                                <button onClick={downloadResume} className='flex items-center gap-2 p-2 px-4 rounded-lg bg-white shadow-sm hover:bg-slate-50 hover:text-emerald-500 transition-colors'>
                                    <Download className='size-4' />
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>
                        <div className='sticky top-6 print:static print:w-full print:block'>
                            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeBuilder
