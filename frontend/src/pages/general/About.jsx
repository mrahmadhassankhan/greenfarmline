import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AboutBanner from '../../components/general/about/AboutBanner'
import MissionStatement from '../../components/general/about/MissionStatement'
import FeaturesSection from '../../components/general/about/FeaturesSection'
import TeamSection from '../../components/general/about/TeamSection'
import VisionValuesSection from '../../components/general/about/VisionValuesSection'

function About() {
  return (
    <>
        <Navbar />
        <AboutBanner />
        <MissionStatement />
        <FeaturesSection />
        <TeamSection />
        <VisionValuesSection />
        <Footer />
    </>
  )
}

export default About