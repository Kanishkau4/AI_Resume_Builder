import React from 'react'
import Banner from '../components/home/banner'
import Hero from '../components/home/hero'
import Features from '../components/home/features'
import Testimonial from '../components/home/testimonial'
import ActionSection from '../components/home/actionSection'
import Footer from '../components/home/footer'

function Home() {
    return (
        <div>
            <Banner />
            <Hero />
            <Features />
            <Testimonial />
            <ActionSection />
            <Footer />
        </div>
    )
}

export default Home