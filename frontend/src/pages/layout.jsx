import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
function layout() {
    return (
        <div>
            <div className='min-h-screen bg-slate-50'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default layout