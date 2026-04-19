import React, { useState, useEffect } from 'react'
import { FilePenLineIcon, Pencil, Plus, Trash2Icon, Upload, UploadCloud, X, Search, MoreVertical, LayoutGrid, List } from 'lucide-react'
import pdfToText from 'react-pdftotext'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../config/api'
import { gooeyToast } from 'goey-toast'

function Dashboard() {
    const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b", "#10b981", "#06b6d4"]
    //const colors = ["#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#0d9488", "#0f766e"]
    const [resumes, setResumes] = useState([])
    const [showCreateResume, setShowCreateResume] = useState(false)
    const [showUploadResume, setShowUploadResume] = useState(false)
    const [resumeTitle, setResumeTitle] = useState("")
    const [uploadFile, setUploadFile] = useState(null)
    const [editResumeId, setEditResumeId] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [dragActive, setDragActive] = useState(false)

    const navigate = useNavigate()

    const { user, token } = useSelector((state) => state.auth)

    const loadResumes = async () => {
        try {
            setLoading(true)
            const { data } = await api.get('/api/users/resumes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setResumes(data)
        } catch (error) {
            gooeyToast.error(error.response?.data?.message || "Something went wrong", { preset: "bouncy" })
        } finally {
            setLoading(false)
        }
    }

    const handleCreateResume = async (e) => {
        try {
            e.preventDefault()
            const { data } = await api.post('/api/resumes/create', {
                title: resumeTitle
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setResumes([...resumes, data])
            setShowCreateResume(false)
            setResumeTitle("")
            navigate(`/app/builder/${data._id}`)
        } catch (error) {
            gooeyToast.error(error.response?.data?.message || "Something went wrong", { preset: "bouncy" })
        }
    }

    const handleUploadResume = async (e) => {
        e.preventDefault()
        if (!uploadFile) {
            gooeyToast.error("Please select a PDF file", { preset: "bouncy" })
            return
        }

        const uploadPromise = new Promise(async (resolve, reject) => {
            try {
                // 1. Extract Text
                const extractText = typeof pdfToText === 'function' ? pdfToText : pdfToText.default;
                if (typeof extractText !== 'function') {
                    throw new Error("PDF library error. Please refresh.")
                }

                const resumeText = await extractText(uploadFile)
                if (!resumeText || resumeText.trim().length === 0) {
                    throw new Error("Could not extract text from this PDF.")
                }

                // 2. Upload to AI
                const { data } = await api.post('/api/ai/upload-resume', {
                    title: resumeTitle,
                    resumeText: resumeText
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                // 3. Refresh and navigate
                await loadResumes()
                setShowUploadResume(false)
                setResumeTitle("")
                setUploadFile(null)
                
                resolve(data)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })

        gooeyToast.promise(uploadPromise, {
            loading: 'Analyzing Resume...',
            success: 'Resume Imported!',
            error: (err) => err.message || err.response?.data?.message || "Import failed",
            description: {
                loading: 'Extracting data with AI...',
                success: 'Redirecting to builder...',
                error: 'Please try another PDF file.',
            },
            preset: "bouncy"
        }).then((data) => {
            if (data?.resumeId) {
                navigate(`/app/builder/${data.resumeId}`)
            }
        })
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            if (file.type === "application/pdf") {
                setUploadFile(file)
            } else {
                gooeyToast.error("Please upload a PDF file", { preset: "bouncy" })
            }
        }
    }

    // Edit resume title
    const handleEditResume = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            await api.put(`/api/resumes/update`, {
                resumeId: editResumeId,
                title: resumeTitle
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setResumes(resumes.map(resume => resume._id === editResumeId ? { ...resume, title: resumeTitle } : resume))
            setResumeTitle("")
            setEditResumeId(null)
            gooeyToast.success("Resume title updated successfully", { preset: "bouncy" })
        } catch (error) {
            gooeyToast.error(error.response?.data?.message || "Something went wrong", { preset: "bouncy" })
        } finally {
            setLoading(false)
        }
    }

    // Delete function
    const performDelete = async (resumeId, toastId) => {
        gooeyToast.dismiss(toastId);

        try {
            setLoading(true)
            await api.delete(`/api/resumes/delete/${resumeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setResumes(resumes.filter(resume => resume._id !== resumeId))
            gooeyToast.success("Resume deleted successfully", { preset: "bouncy" })
        } catch (error) {
            gooeyToast.error(error.response?.data?.message || "Something went wrong", { preset: "bouncy" })
        } finally {
            setLoading(false)
        }
    }

    // Delete function with gooey toast
    const handleDeleteResume = (e, resumeId) => {
        e.stopPropagation()

        const toastId = gooeyToast.warning("Delete Resume?", {
            preset: "bouncy",
            duration: 10000,
            description: (
                <div className="flex flex-col gap-3 mt-2">
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete this resume?
                    </p>
                    <div className="flex gap-2">
                        {/* Cancel Button */}
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                gooeyToast.dismiss(toastId);
                            }}
                            className="px-4 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>

                        {/* Confirm (Delete) Button */}
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                performDelete(resumeId, toastId);
                            }}
                            className="px-4 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )
        });
    }

    useEffect(() => {
        loadResumes()
    }, [])

    const filteredResumes = resumes.filter(resume =>
        resume.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className='min-h-screen bg-[#f8fafc] pb-20'>
            {/* Header Section */}
            <div className='bg-white border-b border-slate-200 sticky top-0 z-10 backdrop-blur-md bg-white/80'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                        <div>
                            <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>My Resumes</h1>
                            <p className='text-slate-500 mt-1'>Create, manage and edit your professional resumes</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='relative group'>
                                <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors' />
                                <input
                                    type="text"
                                    placeholder="Search resumes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className='pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500/20 w-full md:w-64 transition-all !border-none rounded-xl'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
                {/* Action Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                    <button
                        onClick={() => setShowCreateResume(true)}
                        className='group relative overflow-hidden bg-white border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10'
                    >
                        <div className='p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500'>
                            <Plus className="size-8" />
                        </div>
                        <div className='text-center'>
                            <h3 className='font-semibold text-slate-800 text-lg'>Create New</h3>
                            <p className='text-sm text-slate-500'>Start from scratch</p>
                        </div>
                        <div className='absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                    </button>

                    <button
                        onClick={() => setShowUploadResume(true)}
                        className='group relative overflow-hidden bg-white border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-teal-500 hover:shadow-xl hover:shadow-teal-500/10'
                    >
                        <div className='p-4 bg-teal-50 text-teal-600 rounded-2xl group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500'>
                            <Upload className="size-8" />
                        </div>
                        <div className='text-center'>
                            <h3 className='font-semibold text-slate-800 text-lg'>Upload Resume</h3>
                            <p className='text-sm text-slate-500'>Import PDF file</p>
                        </div>
                        <div className='absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                    </button>

                    {/* Welcome Display */}
                    <div className='hidden lg:flex col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 items-center justify-between text-white relative overflow-hidden shadow-lg'>
                        <div className='relative z-10'>
                            <h3 className='text-2xl font-bold mb-2'>Welcome, {user?.name}</h3>
                            <p className='text-emerald-50 max-w-[240px]'>You have {resumes.length} resumes active. Keep improving your career score!</p>
                            <button className='mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-sm font-medium transition-colors border border-white/20'>Tips & Tricks</button>
                        </div>
                        <div className='absolute right-[-20px] bottom-[-20px] opacity-20 rotate-12'>
                            <FilePenLineIcon size={180} />
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
                        Recent Documents
                        <span className='px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold'>{filteredResumes.length}</span>
                    </h2>
                </div>

                {/* Resumes Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                    {filteredResumes.length > 0 ? filteredResumes.map((resume, index) => {
                        const baseColor = colors[index % colors.length];
                        return (
                            <div
                                key={resume._id}
                                onClick={() => navigate(`/app/builder/${resume._id}`)}
                                className='group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-100 hover:-translate-y-1 relative'
                            >
                                <div className='aspect-[3/4] p-4 bg-slate-50 flex items-center justify-center relative overflow-hidden'>
                                    <div className='absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-700' style={{ background: `radial-gradient(circle at 10% 20%, ${baseColor} 0%, transparent 80%)` }} />
                                    <FilePenLineIcon className="size-16 transition-all duration-500 group-hover:scale-110 drop-shadow-sm" style={{ color: baseColor }} />

                                    {/* Action buttons on hover */}
                                    <div className='absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300'>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setEditResumeId(resume._id); setResumeTitle(resume.title) }}
                                            className='p-2 bg-white shadow-lg rounded-xl text-slate-600 hover:text-emerald-600 transition-colors'
                                        >
                                            <Pencil className="size-4" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteResume(e, resume._id)}
                                            className='p-2 bg-white shadow-lg rounded-xl text-slate-600 hover:text-red-500 transition-colors'
                                        >
                                            <Trash2Icon className="size-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className='p-4 border-t border-slate-100'>
                                    <h3 className='font-bold text-slate-800 truncate' title={resume.title}>{resume.title}</h3>
                                    <p className='text-xs text-slate-400 mt-1 flex items-center gap-1'>
                                        <span className='size-1.5 rounded-full' style={{ backgroundColor: baseColor }}></span>
                                        Modified {new Date(resume.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )
                    }) : (
                        <div className='col-span-full py-20 flex flex-col items-center justify-center text-slate-400'>
                            <div className='p-6 bg-slate-100 rounded-full mb-4 text-emerald-200'>
                                <Search className='size-10' />
                            </div>
                            <h3 className='text-lg font-medium text-slate-900'>No resumes found</h3>
                            <p>Try a different search term or create a new resume.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {(showCreateResume || showUploadResume || editResumeId) && (
                <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
                    <div
                        className='absolute inset-0 bg-slate-900/60 backdrop-blur-sm'
                        onClick={() => {
                            setShowCreateResume(false);
                            setShowUploadResume(false);
                            setEditResumeId(null);
                            setResumeTitle("");
                            setUploadFile(null);
                        }}
                    />

                    <div className='bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300'>
                        <div className='p-8'>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-2xl font-bold text-slate-900'>
                                    {showCreateResume && "Create New"}
                                    {showUploadResume && "Upload PDF"}
                                    {editResumeId && "Rename"}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowCreateResume(false);
                                        setShowUploadResume(false);
                                        setEditResumeId(null);
                                        setResumeTitle("");
                                        setUploadFile(null);
                                    }}
                                    className='p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors'
                                >
                                    <X className='size-6' />
                                </button>
                            </div>

                            <form
                                onSubmit={
                                    showCreateResume ? handleCreateResume :
                                        showUploadResume ? handleUploadResume :
                                            handleEditResume
                                }
                                className='space-y-6'
                            >
                                <div>
                                    <label className='block text-sm font-semibold text-slate-700 mb-2'>Resume Title</label>
                                    <input
                                        autoFocus
                                        onChange={(e) => setResumeTitle(e.target.value)}
                                        value={resumeTitle}
                                        type="text"
                                        placeholder='e.g. Software Engineer Resume'
                                        className='w-full px-5 py-3 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-900 font-medium'
                                        required
                                    />
                                </div>

                                {showUploadResume && (
                                    <div>
                                        <label className='block text-sm font-semibold text-slate-700 mb-2'>Import File</label>
                                        <div className='relative'>
                                            <input
                                                type="file"
                                                id="resume-input"
                                                accept='.pdf'
                                                hidden
                                                onChange={(e) => setUploadFile(e.target.files[0])}
                                            />
                                             <label
                                                htmlFor="resume-input"
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                                className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl p-8 transition-all group ${dragActive ? 'border-emerald-500 bg-emerald-50/50 scale-[1.02]' : 'border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 cursor-pointer'}`}
                                            >
                                                {uploadFile ? (
                                                    <div className='text-center'>
                                                        <div className='size-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2'>
                                                            <UploadCloud className="size-6" />
                                                        </div>
                                                        <p className='text-sm font-bold text-slate-800'>{uploadFile.name}</p>
                                                        <p className='text-xs text-slate-500 mt-1'>Click or drag to change file</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className={`p-4 rounded-2xl transition-colors ${dragActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600'}`}>
                                                            <UploadCloud className="size-8" />
                                                        </div>
                                                        <div className='text-center'>
                                                            <p className='font-bold text-slate-800 text-sm'>{dragActive ? 'Drop it here!' : 'Choose or Drag PDF'}</p>
                                                            <p className='text-xs text-slate-400 mt-1'>Max size: 5MB</p>
                                                        </div>
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div className='flex gap-4 pt-4'>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCreateResume(false);
                                            setShowUploadResume(false);
                                            setEditResumeId(null);
                                            setResumeTitle("");
                                            setUploadFile(null);
                                        }}
                                        className='flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors'
                                    >
                                        Cancel
                                    </button>
                                    <button

                                        type="submit"
                                        className='flex-1 px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all'
                                    >
                                        {showCreateResume && "Create"}
                                        {showUploadResume && "Upload"}
                                        {editResumeId && "Update"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard

