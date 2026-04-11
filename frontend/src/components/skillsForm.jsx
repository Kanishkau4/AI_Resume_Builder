import React, { useState } from 'react'
import { Plus, X, Lightbulb } from 'lucide-react'

function SkillsForm({ data, onChange }) {

    const [skills, setSkills] = useState("")

    const addSkill = () => {
        if (skills.trim() && !data.includes(skills.trim())) {
            onChange([...data, skills.trim()])
            setSkills("")
        }
    }

    const removeSkill = (index) => {
        const updatedSkills = data.filter((_, i) => i !== index)
        onChange(updatedSkills)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addSkill()
        }
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-semibold text-slate-800'>Skills</h3>
                    <p className='text-sm text-slate-500'>Highlight your top expertise</p>
                </div>
            </div>

            <div className='flex gap-2'>
                <div className='relative flex-1'>
                    <input
                        type="text"
                        className='w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm'
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder='Type a skill (e.g. React, Python)...'
                    />
                    <div className='absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300 border border-slate-200 px-1 rounded'>
                        ↵
                    </div>
                </div>
                <button
                    onClick={addSkill}
                    disabled={!skills.trim() || data.includes(skills.trim())}
                    className='px-4 py-2.5 bg-emerald-700 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 transition-all shadow-sm disabled:opacity-50 disabled:bg-slate-200'
                >
                    Add
                </button>
            </div>

            <div className='min-h-[100px] p-4'>
                {data.length > 0 ? (
                    <div className='flex flex-wrap gap-2'>
                        {data.map((skill, index) => (
                            <div
                                key={index}
                                className='group flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 bg-emerald-100 border border-emerald-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:border-emerald-500 transition-all'
                            >
                                {skill}
                                <button
                                    onClick={() => removeSkill(index)}
                                    className='p-1 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors'
                                >
                                    <X className='size-3' />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center h-full py-4 text-slate-400'>
                        <Lightbulb className='size-12 mb-2 text-emerald-500' />
                        <p>No skills added yet</p>
                    </div>
                )}
            </div>

            <div className='p-4 bg-emerald-50 rounded-xl border border-emerald-100'>
                <p className='text-xs text-emerald-700 leading-relaxed'>
                    <strong className='text-emerald-800 uppercase text-[10px] tracking-wider block mb-1'>💡 Expert Tip</strong>
                    Add 6-10 skills. Mix technical tools (e.g. JavaScript, Photoshop) with core soft skills (e.g. Leadership, Strategy) for a balanced profile.
                </p>
            </div>
            <hr className='border-slate-100 my-2' />
        </div>
    )
}

export default SkillsForm