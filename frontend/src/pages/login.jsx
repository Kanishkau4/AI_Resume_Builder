import React from 'react'

function login() {
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get("state")
    const [state, setState] = React.useState(urlState || "login")
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        rememberMe: false
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
    }

    return (
        <div className="flex h-screen w-full font-poppins">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                .font-poppins { font-family: 'Poppins', sans-serif; }
            `}</style>

            <div className="w-screen md:w-1/2 hidden md:inline-block">
                <img className="h-full w-full object-cover" src="../src/assets/resume_mockup_2.png" alt="leftSideImage" />
            </div>

            <div className="w-screen md:w-1/2 flex flex-col items-center justify-center p-6 bg-white">
                <form onSubmit={handleSubmit} className="md:w-96 w-full flex flex-col items-center">
                    <h2 className="text-4xl text-gray-900 font-semibold tracking-tight">
                        {state === "login" ? "Sign in" : state === "signup" ? "Sign up" : "Forgot password"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-3 text-center">
                        {state === "login"
                            ? "Welcome back! Please sign in to continue"
                            : state === "signup"
                                ? "Welcome! Please sign up to continue"
                                : "No worries! Please enter your email to recover your password"}
                    </p>

                    <button type="button" className="w-full mt-8 bg-gray-50 flex items-center justify-center h-12 rounded-full border border-gray-100 hover:bg-gray-100 transition-colors">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" className="w-24" />
                    </button>

                    <div className="flex items-center gap-4 w-full my-6">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <p className="text-xs text-gray-400 font-medium uppercase">or with email</p>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    <div className="space-y-4 w-full">
                        {state === "signup" && (
                            <div className="flex items-center w-full bg-gray-50/50 border border-gray-200 h-12 rounded-full px-6 gap-3 group focus-within:border-green-500 transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-focus-within:text-green-500"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full" required />
                            </div>
                        )}

                        <div className="flex items-center w-full bg-gray-50/50 border border-gray-200 h-12 rounded-full px-6 gap-3 group focus-within:border-green-500 transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-focus-within:text-green-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full" required />
                        </div>

                        {state !== "forgot" && (
                            <div className="flex items-center w-full bg-gray-50/50 border border-gray-200 h-12 rounded-full px-6 gap-3 group focus-within:border-green-500 transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-focus-within:text-green-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full" required />
                            </div>
                        )}
                    </div>

                    <div className="w-full flex items-center justify-between mt-6 text-gray-500">
                        {state === "login" && (
                            <div className="flex items-center gap-2 cursor-pointer">
                                <input name="rememberMe" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer" type="checkbox" id="checkbox" checked={formData.rememberMe} onChange={handleChange} />
                                <label className="text-xs font-medium cursor-pointer" htmlFor="checkbox">Remember me</label>
                            </div>
                        )}
                        {state === "login" && (
                            <button type="button" className="text-xs font-semibold text-green-600 hover:text-green-700" onClick={() => setState("forgot")}>Forgot password?</button>
                        )}
                    </div>

                    <button type="submit" className="mt-8 w-full h-12 rounded-full text-white bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200 font-semibold transition-all active:scale-95">
                        {state === "login" ? "Login" : state === "signup" ? "Get Started" : "Reset Password"}
                    </button>

                    <p className="text-gray-500 text-sm mt-6">
                        {state === "login" ? (
                            <>Don't have an account? <button type="button" className="text-green-600 font-semibold hover:underline" onClick={() => setState("signup")}>Sign up</button></>
                        ) : (
                            <>Already have an account? <button type="button" className="text-green-600 font-semibold hover:underline" onClick={() => setState("login")}>Sign in</button></>
                        )}
                    </p>
                </form>
            </div>
        </div>
    )
}

export default login