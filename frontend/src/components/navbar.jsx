import React from 'react'
import { LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/features/authSlice';

function Navbar() {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    return (
        <div className='shadow bg-white print:hidden'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all duration-300'>
                <Link to="/">
                    <img src="/logo.svg" alt="logo" className='w-auto h-11' />
                </Link>
                <div className='flex items-center gap-4'>
                    <p className='text-lg font-semibold'>Hi, {user.name}</p>
                    <button
                        onClick={handleLogout}
                        className='flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-green-600 transition-all duration-300'
                    >
                        Logout <LogOut className="size-4" />
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar