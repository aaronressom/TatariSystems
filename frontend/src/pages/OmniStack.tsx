import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const ExploreOurTech = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Explore Our Tech | Tatari'
  }, [])

  const techCards = [
    {
      title: 'Sustainable Mining',
      description: 'Our mining operations are a proving ground for efficient, renewable-powered compute.',
      link: '/mining',
    },
    {
      title: 'AI Compute',
      description: "We're building elastic GPU capacity for training and batch inference, with future integrations to decentralized networks.",
      link: '/ai-compute',
    },
    {
      title: 'Infrastructure',
      description: "Modular, efficient, and connectivity-driven—Tatari's infrastructure vision starts in Ethiopia.",
      link: '/infrastructure',
    },
  ]

  return (
    <div className="min-h-screen bg-black pt-navbar">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Explore Our Tech
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Discover how Tatari integrates sustainable energy, high-performance infrastructure, and scalable compute to power AI and blockchain.
          </motion.p>
        </div>
      </section>

      {/* Tech Cards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-primary-600 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer flex flex-col"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">{card.description}</p>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => navigate(card.link)}
                  className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 font-semibold text-base self-start transition-colors"
                >
                  Learn More
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl font-bold text-white mb-8">
              Sustainable energy meets next-generation compute.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ExploreOurTech
