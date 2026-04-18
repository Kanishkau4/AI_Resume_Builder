import React, { useEffect, useState } from 'react'
import ResumePreview from '../components/resumePreview';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { ArrowLeft } from 'lucide-react';
import api from '../config/api';
import { gooeyToast } from 'goey-toast';

function Preview() {
    const { resumeId } = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadResume = async () => {
        try {
            setLoading(true);
            const { data: resData } = await api.get(`/api/resumes/public/` + resumeId)
            setResumeData(resData);
        } catch (error) {
            gooeyToast.error(error.response?.data?.message || "Something went wrong", { preset: "bouncy" })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadResume();
    }, [resumeId]);

    if (loading) {
        return <Loader />;
    }

    if (!resumeData) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='text-center text-red-500'>
                    <p className='text-4xl font-bold mb-4'>Resume not found</p>
                    <Link to="/app" className='text-emerald-600 hover:text-emerald-700 font-medium flex items-center justify-center transition-colors'>
                        <ArrowLeft className='inline-block mr-2 size-5' />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-5xl mx-auto'>
                {/* Preview Header */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <Link to="/app" className='p-2 hover:bg-slate-100 rounded-full transition-colors'>
                            <ArrowLeft className='size-6 text-slate-600' />
                        </Link>
                        <div>
                            <h1 className='text-xl sm:text-2xl font-bold text-slate-900'>{resumeData.title || "Resume Preview"}</h1>
                            <p className='text-sm text-slate-500'>Preview and export your professional resume</p>
                        </div>
                    </div>
                </div>

                {/* Resume Canvas */}
                <div className='bg-white shadow-2xl rounded-sm overflow-hidden border border-slate-200 mx-auto'>
                    <div className='bg-white p-4 sm:p-8 md:p-12'>
                        <ResumePreview
                            data={resumeData}
                            template={resumeData.template}
                            accentColor={resumeData.accent_color}
                        />
                    </div>
                </div>

                {/* Help Text */}
                <div className='mt-8 text-center'>
                    <p className='text-slate-400 text-sm'>
                        Looking for changes? <Link to={`/app/builder/${resumeId}`} className='text-emerald-600 hover:underline font-medium'>Back to editor</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Preview;