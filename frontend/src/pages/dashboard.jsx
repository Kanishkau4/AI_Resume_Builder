import React from 'react'
import { Plus, Upload } from 'lucide-react'
function dashboard() {
    return (
        <div>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <h1 className='text-2xl font-semibold'>Dashboard</h1>
                <p className='text-xl font-medium mb-4 bg-gradient-to-r from-slate-500 to-slate-600 bg-clip-text text-transparent sm:hidden'>Welcome, John Doe</p>
            </div>
            <div className='flex flex-wrap gap-4'>
                <button className='w-full sm:max-w-36 h-48 flex flex-col items-center justify-center border border-dashed border-slate-500 group text-slate-500 px-4 py-2 rounded-lg gap-2 cursor-pointer hover:bg-indigo-600 hover:text-white transition-all duration-300'>
                    <Plus className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full" />
                    <p className='text-lg font-medium'>Create Resume</p>
                </button>
                <button className='w-full sm:max-w-36 h-48 flex flex-col items-center justify-center border border-dashed border-slate-500 group text-slate-500 px-4 py-2 rounded-lg gap-2 cursor-pointer hover:bg-purple-600 hover:text-white transition-all duration-300'>
                    <Upload className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full" />
                    <p className='text-lg font-medium'>Upload Existing Resume</p>
                </button>
            </div>

            <hr className='my-6 border-slate-300 sm:w-full w-1/2 mx-auto' />
        </div>
    )
}

export default dashboard