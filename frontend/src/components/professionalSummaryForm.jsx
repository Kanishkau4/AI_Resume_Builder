import { Sparkles, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../config/api'
import { gooeyToast } from 'goey-toast'

function ProfessionalSummaryForm({ data, onChange }) {

    const { token } = useSelector((state) => state.auth)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerateSummary = async () => {
        try {
            setIsGenerating(true)
            const prompt = `Enhance this professional summary "${data}".`
            const { data: resData } = await api.post('/api/ai/enhance-summary', {
                userContent: prompt
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            onChange(resData.enhancedSummary)
        } catch (error) {
            gooeyToast.error(error.response?.data?.message || "Something went wrong", { preset: "bouncy" })
        } finally {
            setIsGenerating(false)
        }
    }
    return (
        <div className='space-y-2'>
            <div className='flex items-center justify-between'>
                <div className='text-xl font-semibold text-slate-800'>
                    <h3 className='flex items-center text-lg font-semibold text-slate-800'>Professional Summary</h3>
                    <p className='text-sm text-slate-500'>Add a summary of your skills and experience</p>
                </div>
                <button onClick={handleGenerateSummary} disabled={isGenerating} className='flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-sm text-slate-500 hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-xl'>
                    {isGenerating ? (
                        <>
                            <Sparkles className='size-4 mr-2 text-green-500 animate-pulse' />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className='size-4 mr-2 text-green-500' />
                            Enhance with AI
                        </>
                    )}
                </button>
            </div>
            <div className='mt-6'>
                <textarea className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={data || ''} onChange={(e) => onChange(e.target.value)} placeholder='Add a summary of your skills and experience...' rows={7} />
                <p className='text-xs text-slate-500 mt-2 text-center'>Tip: Use 2-3 sentences to highlight your key skills and experience.</p>
            </div>
        </div>
    )
}

export default ProfessionalSummaryForm;