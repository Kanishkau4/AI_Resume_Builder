import React from 'react'
import { Link } from 'react-router-dom'

function actionSection() {
    return (
        <div id="cta">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <div className="max-w-5xl py-16 md:pl-20 md:w-full max-md:text-center mx-2 md:mx-auto flex flex-col md:flex-row items-center justify-between text-left bg-gradient-to-b from-[#059669] to-[#059669] rounded-2xl p-10 text-white">
                <div>
                    <h1
                        className="text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-white to-[#ffffff] text-transparent bg-clip-text">
                        Ready to build your resume?
                    </h1>
                    <p className="bg-gradient-to-r from-white to-[#ffffff] text-transparent bg-clip-text text-lg">
                        Build a professional resume in minutes with our AI-powered resume builder.
                    </p>
                </div>
                <Link to="/register">
                    <button className="px-12 py-3 text-slate-800 bg-white rounded-full text-sm mt-4 hover:bg-gray-100 transition-all duration-300">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default actionSection