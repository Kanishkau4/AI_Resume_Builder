import React from 'react'
import { Plus, Trash2, Briefcase, Sparkles } from 'lucide-react'

function ExperienceForm({ data, onChange }) {

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false,
        }
        onChange([...data, newExperience])
    }

    const removeExperience = (index) => {
        const updatedExperience = data.filter((_, i) => i !== index)
        onChange(updatedExperience)
    }

    const updateExperience = (index, field, value) => {
        const updatedExperience = [...data]
        updatedExperience[index][field] = value
        onChange(updatedExperience)
    }


    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <div className='text-xl font-semibold text-slate-800'>
                    <h3 className='flex items-center text-lg font-semibold text-slate-800'>Experience</h3>
                    <p className='text-sm text-slate-500'>Add your work experience</p>
                </div>
                <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-sm text-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg'>
                    <Plus className='size-4 mr-2' />
                    <p className='text-sm'>Add Experience</p>
                </button>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-10 text-slate-500'>
                    <Briefcase className='size-12 mx-auto mb-2 text-emerald-300' />
                    <p>No experience added yet</p>
                    <p className='text-sm text-slate-500'>Click the button above to add your first experience</p>
                </div>
            ) : (
                <div className='mt-6'>
                    {data.map((experience, index) => (
                        <div key={index} className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-lg font-semibold text-slate-800'>Experience {index + 1}</h3>
                                <button onClick={() => removeExperience(index)} className='flex items-center gap-2 px-3 py-1 text-sm text-red-500 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                                    <Trash2 className='size-4 mr-2' />
                                </button>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <input type="text" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={experience.company || ''} onChange={(e) => updateExperience(index, 'company', e.target.value)} placeholder='Company Name' />
                                <input type="text" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={experience.position || ''} onChange={(e) => updateExperience(index, 'position', e.target.value)} placeholder='Job Title' />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <input type="month" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={experience.start_date || ''} onChange={(e) => updateExperience(index, 'start_date', e.target.value)} placeholder='Start Date' />
                                <input type="month" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={experience.end_date || ''} onChange={(e) => updateExperience(index, 'end_date', e.target.value)} placeholder='End Date' disabled={experience.is_current} />
                            </div>
                            <label className='flex items-center gap-2 mt-2'>
                                <input type='checkbox' id={`is_current_${index}`} checked={experience.is_current || false} onChange={(e) => updateExperience(index, 'is_current', e.target.checked)} className='w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500' />
                                <span className='text-sm text-slate-500 font-medium'>I currently work here</span>
                            </label>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-end'>
                                    <button className='flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-100 to-emerald-200 text-sm text-emerald-500 hover:text-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg'>
                                        <Sparkles className='size-4 mr-2' />
                                        AI Generate Description
                                    </button>
                                </div>
                                <textarea className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={experience.description || ''} onChange={(e) => updateExperience(index, 'description', e.target.value)} placeholder='Add a description of your responsibilities and achievements...' rows={5} />
                            </div>
                            <hr className='border-slate-200 mt-4 mb-4' />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExperienceForm