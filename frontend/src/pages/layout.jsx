import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import { useSelector } from 'react-redux'
import Loader from '../components/loader'

function Layout() {

    const { user, loading } = useSelector((state) => state.auth)

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {user ? (
                <div className='min-h-screen bg-slate-50'>
                    <Navbar />
                    <Outlet />
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </div>
    )
}

export default Layout