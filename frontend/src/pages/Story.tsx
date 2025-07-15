import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom'
import { getIconSrc } from '../utils/iconMapping'
import ReactMemo from 'react'
// Animation will be loaded dynamically
const aiAnimation = null

const Story = () => {
  const [currentSubhead, setCurrentSubhead] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [aiAnimationData, setAiAnimationData] = useState(null)
  const [bitcoinAnimationData, setBitcoinAnimationData] = useState(null)
  const [infrastructureAnimationData, setInfrastructureAnimationData] = useState(null)
  const aiImageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Get the base path for GitHub Pages deployment
  const base = (import.meta as any).env?.PROD ? '/TatariSystems' : ''

  // Lazy-load Lottie animations only when the relevant slide is active
  useEffect(() => {
    if (currentSlide === 0 && !bitcoinAnimationData) {
      fetch(`${base}/animations/sec1.json`)
        .then(response => response.json())
        .then(data => setBitcoinAnimationData(data))
        .catch(error => console.error('Error loading Section 1 animation:', error))
    } else if (currentSlide === 1 && !aiAnimationData) {
      fetch(`${base}/animations/sec2.json`)
        .then(response => response.json())
        .then(data => setAiAnimationData(data))
        .catch(error => console.error('Error loading Section 2 animation:', error))
    } else if (currentSlide === 2 && !infrastructureAnimationData) {
      fetch(`${base}/animations/sec3.json`)
        .then(response => response.json())
        .then(data => setInfrastructureAnimationData(data))
        .catch(error => console.error('Error loading Section 3 animation:', error))
    }
  }, [base, currentSlide, bitcoinAnimationData, aiAnimationData, infrastructureAnimationData])

  const subheads = [
    "AI is accelerating everything.",
    "But acceleration isn't always clean.",
    "Most clouds chase scale at any cost. We don't.",
    "Compute that's Faster, Leaner, and Less wasteful to build a future without burning it.",
    "So you can build the future without burning it."
  ]

  const originSlides = [
    {
      title: "Act I: Origins",
      subtitle: "From heat and metal",
      content: "We cut our teeth in the Ethiopian highlands. Hundreds of machines. Mining BTC. Debugging firmware. Fighting heat. Running lean. We didn't just manage compute. We learned how to master it — when uptime meant survival.",
      color: "from-blue-500 to-blue-600",
      animation: "Bitcoin Mining Animation"
    },
    {
      title: "Act II: Inflection", 
      subtitle: "The world needed compute",
      content: "Then the GPU crunch hit. AI exploded. Pricing spiked. So did the carbon footprint. We knew the momentum was unstoppable. So we built a way forward — one that could scale without waste.",
      color: "from-green-500 to-green-600",
      animation: "AI Technology Animation"
    },
    {
      title: "Act III: Tatari Now",
      subtitle: "Now we run hot, fast, and clean", 
      content: "Today, Tatari delivers bare-metal access to H100s and A100s — no VMs, no lock-ins. Launch in seconds. Scale without waste. Our infrastructure thinks like a racer: tuned, minimal, built to win.",
      color: "from-purple-500 to-purple-600",
      animation: "Infrastructure Animation"
    }
  ]

  const values = ReactMemo.useMemo(() => [
    {
      number: "01",
      title: "Lean by Design",
      description: "We strip layers, waste, and overhead. Performance comes from subtraction.",
      icon: "Zap"
    },
    {
      number: "02", 
      title: "No Lock-ins",
      description: "You own your model, your data, your exit path. Always.",
      icon: "Lock"
    },
    {
      number: "03",
      title: "Every Watt Counts", 
      description: "Efficiency isn't marketing. It's engineering. From Ethiopia to Oregon.",
      icon: "Activity"
    },
    {
      number: "04",
      title: "Transparency First",
      description: "No surprise bills. No hidden throttling. Just clean compute.",
      icon: "Shield"
    },
    {
      number: "05",
      title: "Support That Shows Up",
      description: "Real humans. Real help. 3AM included.",
      icon: "Users"
    },
    {
      number: "06",
      title: "Built for Builders",
      description: "We think like you: test, tune, scale, repeat.",
      icon: "Cpu"
    }
  ], [])

  const partners = ReactMemo.useMemo(() => [
    { name: "OpenAI", logo: "🔵" },
    { name: "Anthropic", logo: "🟣" },
    { name: "Google", logo: "🔴" },
    { name: "Microsoft", logo: "🟦" },
    { name: "Meta", logo: "🔵" },
    { name: "NVIDIA", logo: "🟢" }
  ], [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubhead((prev) => (prev + 1) % subheads.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (aiImageRef.current) {
      const rect = aiImageRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const rotateX = (mousePosition.y - centerY) / 20
      const rotateY = (mousePosition.x - centerX) / 20
      
      aiImageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
  }, [mousePosition])

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
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <div 
                className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/how-we-run')}
              >
                How We Run
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div 
                className="group text-white hover:underline font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/launch-job')}
              >
                Launch a Job
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
              className="w-[500px] h-[500px] rounded-2xl flex items-center justify-center transition-transform duration-300 ease-out"
              style={{ perspective: '1000px' }}
            >
              <img 
                src={`${base}/assets/ai.png`}
                alt="AI Technology"
                className="w-full h-full object-contain rounded-xl"
                loading="lazy"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="text-center hidden">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-6xl">🤖</span>
                </div>
                <p className="text-white/80 text-lg">AI Technology</p>
                <p className="text-white/60 text-sm mt-2">Loading Animation...</p>
              </div>
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From frustration to innovation. Here's how Tatari Systems came to be.
            </p>
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
                    <div className={`hidden md:block w-full max-w-[240px] lg:max-w-[280px] h-auto aspect-square bg-gradient-to-br ${originSlides[currentSlide].color} rounded-2xl border border-gray-600 flex items-center justify-center shadow-xl`}>
                      <div className="text-center">
                        <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-3xl sm:text-4xl">
                            {currentSlide === 0 ? '⛏️' : currentSlide === 1 ? '🚀' : '⚡'}
                          </span>
                        </div>
                        <p className="text-white/80 text-base sm:text-lg">{originSlides[currentSlide].animation}</p>
                        <p className="text-white/60 text-xs sm:text-sm mt-2">
                          {currentSlide === 0 ? 'Loading Section 1 Animation...' : currentSlide === 1 ? 'Loading Section 2 Animation...' : 'Loading Section 3 Animation...'}
                        </p>
                      </div>
                    </div>
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
                <div
                  key={value.number}
                  className={`flex-1 flex flex-col items-center px-0 lg:px-8 mb-12 lg:mb-0
                    ${idx !== 0 ? 'border-l border-gray-400' : ''}
                    ${idx !== 2 ? 'border-r border-gray-400' : ''}
                  `}
                >
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mb-4">
                      <span className="text-2xl font-bold text-white">{value.number}</span>
                    </div>
                    <img src={getIconSrc(value.icon)} alt={value.title} className="h-8 w-8 text-primary-500" loading="lazy" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-center">{value.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col lg:flex-row mt-32 mb-20">
              {values.slice(3, 6).map((value, idx) => (
                <div
                  key={value.number}
                  className={`flex-1 flex flex-col items-center px-0 lg:px-8 mb-12 lg:mb-0
                    ${idx !== 0 ? 'border-l border-gray-400' : ''}
                    ${idx !== 2 ? 'border-r border-gray-400' : ''}
                  `}
                >
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mb-4">
                      <span className="text-2xl font-bold text-white">{value.number}</span>
                    </div>
                    <img src={getIconSrc(value.icon)} alt={value.title} className="h-8 w-8 text-primary-500" loading="lazy" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-center">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We work with the companies shaping the future of AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="bg-gray-700 rounded-2xl p-6 text-center hover:bg-gray-600 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{partner.logo}</div>
                <div className="text-white font-semibold">{partner.name}</div>
              </motion.div>
            ))}
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
              <div className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center cursor-pointer">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="group text-white hover:underline font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer">
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

export default ReactMemo.memo(Story) 