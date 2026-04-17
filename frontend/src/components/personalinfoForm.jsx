import React from 'react'
import { User, Mail, Phone, MapPin, Briefcase, Globe } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'

function PersonalInfoForm({ data, onChange, removeBackground, setRemoveBackground }) {

    const handleChange = (filed, value) => {
        onChange({
            ...data,
            [filed]: value
        })
    }

    const fields = [
        { key: 'full_name', label: 'Full Name', type: 'text', icon: User, placeholder: 'John Doe', required: true },
        { key: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'john.doe@example.com', required: true },
        { key: 'phone', label: 'Phone', type: 'tel', icon: Phone, placeholder: '+1 234 567 890', required: true },
        { key: 'location', label: 'Location', type: 'text', icon: MapPin, placeholder: '123 Main St, Anytown, USA', required: true },
        { key: 'profession', label: 'Profession', type: 'text', icon: Briefcase, placeholder: 'Software Engineer', required: true },
        { key: 'linkedin', label: 'LinkedIn', type: 'url', icon: FaLinkedin, placeholder: 'linkedin.com/in/johndoe' },
        { key: 'website', label: 'Portfolio', type: 'url', icon: Globe, placeholder: 'johndoe.com' },
    ]

    return (
        <div>
            <h3 className='text-xl font-semibold text-slate-800 mb-2'>Personal Information</h3>
            <p className='text-sm text-slate-500 mb-6'>Get Started with the basics</p>

            <div className='flex items-center gap-2'>
                <label>
                    {data.image ? (
                        <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="profile-image" className='w-16 h-16 object-cover rounded-full mt-5 ring ring-emerald-500 hover:opacity-80 transition-opacity' />
                    ) : (
                        <div className='inline-flex items-center gap-2 bg-slate-100 p-2 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors'>
                            <User className='size-10 p-2.5 border border-slate-300 rounded-full' /> Upload Image
                        </div>
                    )}
                    <input type="file" accept="image/*" className='hidden' onChange={(e) => handleChange('image', e.target.files[0])} />
                </label>
                {typeof data.image === 'object' && (
                    <div className='flex flex-col pl-4 gap-2'>
                        <div className='flex items-center gap-1.5'>
                            <p className='text-xs font-semibold text-slate-700 uppercase tracking-wider'>Remove Background</p>
                            <div className='px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md uppercase'>AI</div>
                        </div>
                        <label className='relative inline-flex items-center cursor-pointer group'>
                            <input
                                type="checkbox"
                                id="remove-bg"
                                className='sr-only peer'
                                checked={removeBackground}
                                onChange={() => setRemoveBackground(!removeBackground)}
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            <span className='ml-3 text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors'>
                                {removeBackground ? 'Enabled' : 'Disabled'}
                            </span>
                        </label>
                    </div>
                )}
            </div>
            {fields.map((field) => {
                const Icon = field.icon
                return (
                    <div key={field.key} className='space-y-2 mt-5'>
                        <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-1'>
                            <Icon className='size-4 mr-2' />
                            {field.label}
                            {field.required && <span className='text-red-500 ml-1'>*</span>}
                        </label>
                        <input type={field.type} className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors text-sm' value={data?.[field.key] || ''} onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            required={field.required}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default PersonalInfoForm