import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'

function TemplateSelector({ selectedTemplate, onChange }) {

    const [isOpen, setIsOpen] = useState(false)

    const templates = [
        {
            id: 'modern',
            name: 'Modern',
            preview: 'Sleek design with strategic use of color and modern typography',
        },
        {
            id: 'classic',
            name: 'Classic',
            preview: 'Timeless and professional layout with clean typography',
        },
        {
            id: 'minimal',
            name: 'Minimal',
            preview: 'Clean, simple, and elegant design with a focus on readability',
        },
        {
            id: 'minimal-image',
            name: 'Minimal Image',
            preview: 'Minimal design with a dedicated space for your profile picture',
        },
        {
            id: 'executive',
            name: 'Executive',
            preview: 'Premium two-column layout with a rich sidebar and serif elegance',
        },
        {
            id: 'creative',
            name: 'Creative',
            preview: 'Bold geometric header with a vibrant accent-driven two-column grid',
        },
        {
            id: 'elegance',
            name: 'Elegance',
            preview: 'Premium design with circular profile photo and gradient header',
        },
        {
            id: 'modern-sidebar',
            name: 'Modern Sidebar',
            preview: 'Striking colored shape layout overlapping a circular profile photo',
        },
    ]

    return (
        <div className='relative z-50'>
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 p-2 rounded-lg border border-emerald-100 transition-all whitespace-nowrap'>
                <Layout className='size-4' />
                <span className='max-sm:hidden'>Select Template</span>
            </button>

            {isOpen && (
                <div className='absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 grid gap-2 z-50'>
                    {templates.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => {
                                onChange(template.id)
                                setIsOpen(false)
                            }}
                            className={`flex flex-col text-left p-3 rounded-lg transition-all ${selectedTemplate === template.id ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-slate-50 border border-transparent'}`}
                        >
                            <div className='flex items-center justify-between mb-1'>
                                <span className={`text-sm font-semibold ${selectedTemplate === template.id ? 'text-emerald-700' : 'text-slate-700'}`}>{template.name}</span>
                                {selectedTemplate === template.id && <Check className='size-4 text-emerald-600' />}
                            </div>
                            <span className='text-[10px] text-slate-500 leading-tight'>{template.preview}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TemplateSelector