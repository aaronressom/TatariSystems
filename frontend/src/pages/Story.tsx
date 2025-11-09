import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom'
import { getIconSrc } from '../utils/iconMapping'
import ReactMemo from 'react'
import { getAssetPath } from '../utils/paths'

// Animation will be loaded dynamically
const aiAnimation = null

const OurStory = () => {
  const [currentSubhead, setCurrentSubhead] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [aiAnimationData, setAiAnimationData] = useState(null)
  const [bitcoinAnimationData, setBitcoinAnimationData] = useState(null)
  const [infrastructureAnimationData, setInfrastructureAnimationData] = useState(null)
  const [storyAnimationData, setStoryAnimationData] = useState(null)
  const aiImageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Eagerly load all Lottie animations for origin story
  useEffect(() => {
    if (!bitcoinAnimationData) {
      fetch(getAssetPath('animations/sec1.json'))
        .then(response => response.json())
        .then(data => setBitcoinAnimationData(data))
        .catch(error => console.error('Error loading Section 1 animation:', error))
    }
    if (!aiAnimationData) {
      fetch(getAssetPath('animations/sec2.json'))
        .then(response => response.json())
        .then(data => setAiAnimationData(data))
        .catch(error => console.error('Error loading Section 2 animation:', error))
    }
    if (!infrastructureAnimationData) {
      fetch(getAssetPath('animations/sec3.json'))
        .then(response => response.json())
        .then(data => setInfrastructureAnimationData(data))
        .catch(error => console.error('Error loading Section 3 animation:', error))
    }
    if (!storyAnimationData) {
      fetch(getAssetPath('animations/story.json'))
        .then(response => response.json())
        .then(data => setStoryAnimationData(data))
        .catch(error => console.error('Error loading Story animation:', error))
    }
  }, [])

  const subheads = [
    "The world is racing to AI.",
    "The easy path burns power and budget.",
    "We chose a different route.",
    "Performance that respects energy, cost, and climate.",
    "Scale boldly, without burning the future."
  ]

  const originSlides = [
    {
      title: "Act I: Origins",
      subtitle: "Forged in the highlands",
      content: "Our story begins in the thin air of the Ethiopian highlands. Hundreds of machines, humming day and night, mining Bitcoin. Heat pressing in, firmware breaking at the worst moments, uptime hanging by a thread. We learned to push hardware to its limits with every watt and every cycle because survival demanded it.",
      color: "from-blue-500 to-blue-600",
      animation: "Bitcoin Mining Animation"
    },
    {
      title: "Act II: Inflection", 
      subtitle: "The acceleration age",
      content: "When AI hit escape velocity, GPUs became gold. Prices rose, waste piled up, and the planet bore the cost. We knew acceleration didn't have to mean excess.",
      color: "from-green-500 to-green-600",
      animation: "AI Technology Animation"
    },
    {
      title: "Act III: Tatari Now",
      subtitle: "From vision to velocity", 
      content: "Today, Tatari delivers a full Compute and MLOps stack: built to take models from training to deployment to global scale, fast. No wasted cycles. No wasted energy. Just the infrastructure to turn ambition into impact.",
      color: "from-purple-500 to-purple-600",
      animation: "Infrastructure Animation"
    }
  ]

  const values = ReactMemo.useMemo(() => [
    {
      number: "01",
      title: "Lean by Design",
      description: "We engineer for speed and clarity. No bloat, no busywork—just the parts that make you faster."
    },
    {
      number: "02", 
      title: "Freedom Over Lock-In",
      description: "Your models. Your data. Your runway. You can leave anytime, and take everything with you."
    },
    {
      number: "03",
      title: "Every Watt Works", 
      description: "From hydropower in Ethiopia to optimized cooling in Oregon, efficiency is baked into every decision."
    },
    {
      number: "04",
      title: "Radical Transparency",
      description: "Clear pricing. Honest performance. If we can't back it with data, we don't say it."
    },
    {
      number: "05",
      title: "Support Without Gaps",
      description: "When you need us, we're there—whether it's midday or 3 a.m. No scripts, just solutions."
    },
    {
      number: "06",
      title: "Built for Relentless Builders",
      description: "We share your rhythm: launch fast, iterate hard, scale with confidence."
    }
  ], [])



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubhead((prev) => (prev + 1) % subheads.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])



  // Add a helper for fade-in-on-scroll
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
      <section className="relative min-h-screen flex flex-col items-center justify-center z-10 overflow-hidden pt-16">
        {/* Removed background for cleaner look */}
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 text-center lg:text-left mb-12 lg:mb-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                The world is changing fast<span className="text-primary-500">.</span>
                <br />
                We power what's next<span className="text-primary-500">.</span>
              </h1>
              
              <div className="h-20 mb-8 flex items-center justify-center lg:justify-start">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSubhead}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 italic"
                  >
                    {subheads[currentSubhead]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

                         <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3, delay: 0.2 }}
               className="flex justify-center lg:justify-start"
             >
               <div 
                 className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
                 onClick={() => navigate('/explore-our-tech')}
               >
                 Explore Products
                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
               </div>
             </motion.div>
          </motion.div>

          {/* Right Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
                         <div 
               ref={aiImageRef}
               className="w-[500px] h-[500px] rounded-2xl flex items-center justify-center"
             >
              {storyAnimationData ? (
                <Lottie
                  animationData={storyAnimationData}
                  className="w-full h-full object-contain rounded-xl"
                  loop={true}
                  autoplay={true}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white/50 text-lg">Loading animation...</div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Origin Story</h2>
          </motion.div>

          <div className="space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              >
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {originSlides[currentSlide].title}
                  </h3>
                  {originSlides[currentSlide].subtitle && (
                    <p className="text-base sm:text-lg text-gray-400 mb-6 italic">
                      {originSlides[currentSlide].subtitle}
                    </p>
                  )}
                  <p className="text-base sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6">
                    {originSlides[currentSlide].content}
                  </p>
                  {currentSlide === 0 && (
                    <div className="flex justify-center lg:justify-start">
                      <div 
                        onClick={() => navigate('/mining')}
                        className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
                      >
                        Mining
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Animation Content */}
                <div className="flex-1 flex justify-center lg:justify-end">
                  {currentSlide === 0 && bitcoinAnimationData ? (
                    <div className="hidden md:block w-full max-w-[240px] lg:max-w-[280px] h-auto aspect-square rounded-2xl flex items-center justify-center">
                      <Lottie
                        animationData={bitcoinAnimationData}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  ) : currentSlide === 1 && aiAnimationData ? (
                    <div className="hidden md:block w-full max-w-[240px] lg:max-w-[280px] h-auto aspect-square rounded-2xl flex items-center justify-center">
                      <Lottie
                        animationData={aiAnimationData}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  ) : currentSlide === 2 && infrastructureAnimationData ? (
                    <div className="hidden md:block w-full max-w-[240px] lg:max-w-[280px] h-auto aspect-square rounded-2xl flex items-center justify-center">
                      <Lottie
                        animationData={infrastructureAnimationData}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  ) : (
                    <div className="hidden md:block w-full max-w-[240px] lg:max-w-[280px] h-auto aspect-square rounded-2xl flex items-center justify-center" />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + originSlides.length) % originSlides.length)}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <div className="flex space-x-2">
              {originSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-primary-500 scale-125' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % originSlides.length)}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row mt-20 mb-32">
              {values.slice(0, 3).map((value, idx) => (
                <motion.div
                  key={value.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: idx * 0.08 }}
                  className={`flex-1 flex flex-col items-center px-0 lg:px-8 mb-12 lg:mb-0
                    ${idx !== 0 ? 'border-l border-gray-400' : ''}
                    ${idx !== 2 ? 'border-r border-gray-400' : ''}
                  `}
                >
                  <div className="text-center mb-6">
                    <span className="text-2xl font-bold text-primary-400">| {value.number} |</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-center">{value.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col lg:flex-row mt-32 mb-20">
              {values.slice(3, 6).map((value, idx) => (
                <motion.div
                  key={value.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: idx * 0.08 }}
                  className={`flex-1 flex flex-col items-center px-0 lg:px-8 mb-12 lg:mb-0
                    ${idx !== 0 ? 'border-l border-gray-400' : ''}
                    ${idx !== 2 ? 'border-r border-gray-400' : ''}
                  `}
                >
                  <div className="text-center mb-6">
                    <span className="text-2xl font-bold text-primary-400">| {value.number} |</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-center">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Build the Future?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join us in powering the next generation of AI innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div 
                className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/explore-our-tech')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div 
                className="group text-white hover:underline font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/team')}
              >
                Meet the Team
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ReactMemo.memo(OurStory) 