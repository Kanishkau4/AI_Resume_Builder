import React from 'react'
import Banner from '../components/home/banner'
import Hero from '../components/home/hero'
import Features from '../components/home/features'
import Testimonial from '../components/home/testimonial'
import CallToAction from '../components/home/calltoAction'
import Footer from '../components/home/footer'

function Home() {
    return (
        <div>
            <Banner />
            <Hero />
            <Features />
            <Testimonial />
            <CallToAction />
            <Footer />
        </div>
    )
}

export default Home