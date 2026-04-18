import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import api from './config/api'
import { login, setLoading } from './app/features/authSlice'
import { GooeyToaster } from 'goey-toast'
import 'goey-toast/styles.css';

function App() {

  const dispatch = useDispatch()

  const checkAuth = async () => {
    const token = localStorage.getItem("token")
    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch(login({ token, user: data.data }))
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <>
      <GooeyToaster position="top-right" closeButton="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
        <Route path="view/:resumeId" element={<Preview />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App