import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import FlipCard from '../components/FlipCard'
import { Link, useNavigate } from 'react-router-dom'
import { getAssetPath } from '../utils/paths'
import { ArrowRight } from 'lucide-react'
import { getIconSrc } from '../utils/iconMapping'

const executiveTeam = [
  { 
    name: 'Yasha Genkin', 
    role: 'Chief Executive Officer, Co-Founder', 
    img: 'genkin.jpg',
    linkedin: 'https://linkedin.com/in/yasha-genkin',
    bio: '/team/yasha-genkin'
  },
  { 
    name: 'Amen Amare', 
    role: 'Chief Operating Officer, Co-Founder', 
    img: 'amare.jpg',
    linkedin: 'https://linkedin.com/in/amen-amare',
    bio: '/team/amen-amare'
  },
  { 
    name: 'Meba Michael', 
    role: 'Chief Financial Officer, Co-Founder', 
    img: 'michael.jpg',
    linkedin: 'https://linkedin.com/in/meba-michael',
    bio: '/team/meba-michael'
  }
]

const extendedLeadership = [
  { 
    name: 'Glodi Karagi', 
    role: 'Chief of Business Development', 
    img: 'karagi.jpg',
    linkedin: 'https://linkedin.com/in/glodi-karagi',
    bio: '/team/glodi-karagi'
  },
  { 
    name: 'Nathan Banketa', 
    role: 'Chief Research Officer', 
    img: 'banketa.jpg',
    linkedin: 'http://linkedin.com/in/nathanbanketa',
    bio: '/team/nathan-banketa'
  },
  { 
    name: 'Aarash Iqbal', 
    role: 'Chief Product Officer', 
    img: 'iqbal.png',
    linkedin: 'https://linkedin.com/in/aarashiqbal',
    bio: '/team/aarash-iqbal'
  }
]

const Team = () => {
  const navigate = useNavigate()
  const fadeInProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true, amount: 0.2 },
  };
  return (
    <div className="min-h-screen bg-black pt-navbar">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeInProps}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Where Vision Meets Execution:
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              This is the team turning Tatari's mission into reality. Founders and leaders working side-by-side, combining technical mastery with strategic insight to deliver sustainable, high-performance infrastructure.
            </p> 
          </motion.div>

          {/* Executive Team */}
          <motion.section
            {...fadeInProps}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Founding Leadership</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {executiveTeam.map((member, idx) => (
                <FlipCard key={member.name} member={member} index={idx} />
              ))}
            </div>
          </motion.section>

          {/* Extended Leadership */}
          <motion.section
            {...fadeInProps}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Extended Leadership</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {extendedLeadership.map((member, idx) => (
                <FlipCard key={member.name} member={member} index={idx} />
              ))}
            </div>
          </motion.section>

        </div>
      </section>
    </div>
  )
}

export default Team 