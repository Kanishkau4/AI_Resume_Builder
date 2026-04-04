import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/layout'
import Home from './pages/home'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import ResumeBuilder from './pages/resumeBuilder'
import Preview from './pages/preview'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
      </Route>
      <Route path="view/:resumeId" element={<Preview />} />
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

export default App