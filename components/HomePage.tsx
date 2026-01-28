
import HeroSection from '@/components/HeroSection'
import HowItWork from '@/components/HowItWork'
// import FeaturesAndBenefit from '@/components/FeaturesAndBenefit'
import React from 'react'
import OurMission from '@/components/OurMission'
import Faq from '@/components/Faq'
import Navbar from './Navbar'


const HomePage = () => {
  return (
    <div>
        <Navbar/>
      <HeroSection/>
      <OurMission/>
      <HowItWork/>
      <Faq/>
      {/* <FeaturesAndBenefit/> */}
    </div>
  )
}

export default HomePage