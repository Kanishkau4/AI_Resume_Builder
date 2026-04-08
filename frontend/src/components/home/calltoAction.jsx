import React from 'react'
import { Link } from 'react-router-dom'

function CallToAction() {
    return (
        <div id="cta" className="relative w-full py-28 px-4 overflow-hidden bg-[#f8fafc]">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }

                .floating {
                    animation: float 6s ease-in-out infinite;
                }

                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
            `}</style>

            {/* Background Graphics - Right (Concentric Arcs) */}
            <div className="absolute -top-20 -right-20 pointer-events-none opacity-20 md:opacity-100">
                <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="300" cy="100" r="180" stroke="#10b981" strokeWidth="50" />
                    <circle cx="300" cy="100" r="100" stroke="#10b981" strokeWidth="50" />
                </svg>
            </div>

            {/* Background Graphics - Left (Colorful Dots & Mockups) */}
            <div className="absolute inset-0 w-1/2 pointer-events-none hidden md:block">
                {/* Dots */}
                <div className="absolute top-1/4 left-10 w-3 h-3 bg-purple-500 rounded-full opacity-60 floating" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-1/2 left-32 w-5 h-5 bg-green-500 rounded-full opacity-60 floating" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-20 w-2 h-2 bg-red-400 rounded-full opacity-60 floating" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-20 left-60 w-2 h-2 bg-blue-500 rounded-full opacity-60 floating" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-20 left-48 w-4 h-4 bg-yellow-400 rounded-full opacity-60 floating" style={{ animationDelay: '1.5s' }}></div>

                {/* CV Mockups */}
                <div className="absolute top-1/3 left-40 w-28 floating" style={{ animationDelay: '3s' }}>
                    <img
                        src="/resume_mockup_1.png"
                        alt="CV"
                        className="rounded-lg shadow-lg border-2 border-white transform -rotate-12"
                        onError={(e) => { e.target.src = 'https://cdn.dribbble.com/users/256646/screenshots/11545695/resumly-thumbnail.png?compress=1&resize=400x300'; }}
                    />
                </div>
                <div className="absolute bottom-1/4 left-10 w-20 floating" style={{ animationDelay: '4s' }}>
                    <img
                        src="/resume_mockup_2.png"
                        alt="CV"
                        className="rounded-lg shadow-lg border-2 border-white transform rotate-12"
                        onError={(e) => { e.target.src = 'https://cdn.dribbble.com/users/256646/screenshots/17157834/media/64923e3e031c6f4f22f778d940ce9727.png?compress=1&resize=400x300'; }}
                    />
                </div>
            </div>

            <div className="relative max-w-4xl mx-auto text-center z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                    Ready to get started?
                </h2>
                <p className="text-gray-500 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                    Build a professional, AI-powered resume on our online platform.
                    Streamline your career growth with modern templates and expert tips.
                </p>

                <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden group">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 px-6 py-4 bg-white text-slate-800 outline-none border-none text-base placeholder:text-gray-400"
                    />
                    <button className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-4 font-bold text-base transition-all duration-300">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CallToAction