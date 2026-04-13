import React from 'react'

function Loader() {
    return (
        <div className='flex items-center justify-center h-screen bg-white/50 backdrop-blur-sm fixed inset-0 z-[100]'>
            <div className='relative flex items-center justify-center'>
                <div className='animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-emerald-500'></div>
                <div className='absolute animate-ping rounded-full h-16 w-16 bg-emerald-500/20'></div>
            </div>
        </div>
    )
}

export default Loader