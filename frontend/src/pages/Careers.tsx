import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import { ArrowRight } from 'lucide-react'
import { getAssetPath } from '../utils/paths'
import { getIconSrc } from '../utils/iconMapping'

const careerImages = [
  getAssetPath('/assets/career1.jpg'),
  getAssetPath('/assets/career2.JPEG'),
  getAssetPath('/assets/career3.JPEG'),
  getAssetPath('/assets/career4.JPEG'),
]

const Careers = () => {
  const whyTatari = [
    {
      icon: 'Wrench',
      title: 'High-Impact Work',
      description: "We're not here to maintain the status quo — we're here to reinvent how infrastructure is accessed and deployed. You'll be building real systems for real customers from day one."
    },
    {
      icon: 'Globe',
      title: 'Global Mission',
      description: 'Our goal is to democratize access to advanced compute. Whether it\'s an AI startup in Nairobi or a lab in Berlin, we exist to empower builders everywhere.'
    },
    {
      icon: 'Brain',
      title: 'Learn Fast. Build Faster.',
      description: "This isn't a place to wait for permission. You'll have autonomy, fast feedback loops, and the support to scale your ideas."
    },
    {
      icon: 'Users',
      title: 'Small Team, Big Vision',
      description: 'Work directly with the founding team and own entire domains. Your voice shapes our roadmap.'
    }
  ]

  const roles = [
    'Systems & infrastructure engineers',
    'Cloud & GPU orchestration experts',
    'Growth operators & GTM strategists',
    'Brand and community builders'
  ]

  const tatariWay = [
    'Build like owners',
    'Move with urgency',
    'Obsess over clarity',
    'Never stop learning'
  ]

  const slides = [...careerImages, null]
  const [current, setCurrent] = useState(0)
  const [currentTatariWay, setCurrentTatariWay] = useState(0)

  useEffect(() => {
    const delay = slides[current] ? 3000 : 500
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, delay)
    return () => clearTimeout(timer)
  }, [current, slides])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTatariWay((prev) => (prev + 1) % tatariWay.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [tatariWay.length])

  return (
    <div className="min-h-screen bg-black pt-navbar">
      <Navbar />
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Join the Team Building Next-Gen AI Infrastructure
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-400 mb-10">
              Build the Infrastructure Powering Tomorrow's Intelligence
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
              At Tatari Systems, we're laying the foundation for the future of AI. From high-performance GPU clusters to seamless bare-metal provisioning, we help innovators access the compute they need — when they need it.
            </p>
          </motion.div>

          {/* Hero Section - 4 Alternating Rows */}
          <div className="w-full max-w-6xl mx-auto mb-24 flex flex-col gap-16">
            {whyTatari.map((item, idx) => (
              <div
                key={item.title}
                className={`flex flex-col md:flex-row items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-0 md:gap-12`}
                style={{ minHeight: '340px' }}
              >
                {/* Image */}
                <img
                  src={careerImages[idx]}
                  alt={`Tatari Careers ${idx + 1}`}
                  className="w-full md:w-1/2 h-[340px] object-cover"
                  style={{ borderRadius: 0 }}
                />
                {/* Writing Section */}
                <div className="w-full md:w-1/2 h-full flex items-center">
                  <div className="border-l-8 border-brand-blue-1 pl-8 py-8 bg-black/80 h-full flex flex-col justify-center">
                    <img src={getIconSrc(item.icon)} alt={item.title} className="h-8 w-8 object-contain mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              Democratize access to advanced compute for builders everywhere.
            </p>
            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
              {whyTatari.map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex-1 flex flex-col items-center px-0 lg:px-8 mb-12 lg:mb-0
                    ${idx !== 0 ? 'border-l border-gray-400' : ''}
                    ${idx !== whyTatari.length - 1 ? 'border-r border-gray-400' : ''}
                  `}
                >
                  <img src={getIconSrc(item.icon)} alt={item.title} className="h-8 w-8 object-contain mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Remove the Open Roles Section */}

          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">The Tatari Way</h2>
            {/* Animated subheadline */}
            <div className="h-12 mb-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTatariWay}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl text-primary-400 max-w-2xl mx-auto italic"
                >
                  {tatariWay[currentTatariWay]}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="text-center text-gray-300 mt-12 italic">
              We take our mission seriously — but never take ourselves too seriously.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Careers
