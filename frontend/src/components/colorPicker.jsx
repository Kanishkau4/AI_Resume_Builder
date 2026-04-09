import { Palette, Check } from 'lucide-react'
import React, { useState } from 'react'

function ColorPicker({ selectedColor, onChange }) {

    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Green", value: "#10B981" },
        { name: "Yellow", value: "#F59E0B" },
        { name: "Red", value: "#EF4444" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Pink", value: "#EC4899" },
        { name: "Orange", value: "#F97316" },
        { name: "Cyan", value: "#06B6D4" },
        { name: "Lime", value: "#84CC16" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Rose", value: "#F43F5E" },
        { name: "Violet", value: "#8B5CF6" },
        { name: "Fuchsia", value: "#D946EF" },
        { name: "Black", value: "#000000" },
        { name: "Navy", value: "#000080" },
        { name: "Gray", value: "#808080" }
    ]

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative z-50'>
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-lg border border-slate-100 transition-all'>
                <Palette className='size-4' />
                <div className='size-4 rounded-full border border-slate-200' style={{ backgroundColor: selectedColor }}></div>
            </button>
            {isOpen && (
                <div className='absolute top-full right-0 mt-2 w-48 p-3 bg-white rounded-xl shadow-xl border border-slate-100 z-50'>
                    <div className='grid grid-cols-4 gap-2'>
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                title={color.name}
                                onClick={() => {
                                    onChange(color.value)
                                    setIsOpen(false)
                                }}
                                className={`size-8 rounded-full border-2 transition-all hover:scale-110 ${selectedColor === color.value ? 'border-emerald-500 shadow-sm' : 'border-transparent'}`}
                                style={{ backgroundColor: color.value }}
                            >
                                {selectedColor === color.value && <Check className='size-4 text-white mx-auto' />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ColorPicker