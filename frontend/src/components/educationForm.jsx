import React from 'react'
import { Plus, Trash2, GraduationCap } from 'lucide-react'

function EducationForm({ data, onChange }) {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",
        }
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updatedEducation = data.filter((_, i) => i !== index)
        onChange(updatedEducation)
    }

    const updateEducation = (index, field, value) => {
        const updatedEducation = [...data]
        updatedEducation[index][field] = value
        onChange(updatedEducation)
    }

    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <div className='text-xl font-semibold text-slate-800'>
                    <h3 className='flex items-center text-lg font-semibold text-slate-800'>Education</h3>
                    <p className='text-sm text-slate-500'>Add your education</p>
                </div>
                <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-sm text-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg'>
                    <Plus className='size-4 mr-2' />
                    <p className='text-sm'>Add Education</p>
                </button>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-10 text-slate-500'>
                    <GraduationCap className='size-12 mx-auto mb-2 text-emerald-300' />
                    <p>No education added yet</p>
                    <p className='text-sm text-slate-500'>Click the button above to add your first education</p>
                </div>
            ) : (
                <div className='mt-6'>
                    {data.map((education, index) => (
                        <div key={index} className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-lg font-semibold text-slate-800'>Education {index + 1}</h3>
                                <button onClick={() => removeEducation(index)} className='flex items-center gap-2 px-3 py-1 text-sm text-red-500 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                                    <Trash2 className='size-4 mr-2' />
                                </button>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <input type="text" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={education.institution || ''} onChange={(e) => updateEducation(index, 'institution', e.target.value)} placeholder='Institution Name' />
                                <input type="text" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={education.degree || ''} onChange={(e) => updateEducation(index, 'degree', e.target.value)} placeholder='Degree (e.g., Bachelor, Master, Diploma)' />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <input type="text" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={education.field || ''} onChange={(e) => updateEducation(index, 'field', e.target.value)} placeholder='Field of Study' />
                                <input type="text" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={education.gpa || ''} onChange={(e) => updateEducation(index, 'gpa', e.target.value)} placeholder='GPA (optional)' />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <input type="month" className='w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={education.graduation_date || ''} onChange={(e) => updateEducation(index, 'graduation_date', e.target.value)} placeholder='Graduation Date' />
                            </div>
                            <hr className='border-slate-200 mt-4 mb-4' />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EducationForm