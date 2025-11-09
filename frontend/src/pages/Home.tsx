import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { getAssetPath } from '../utils/paths'
import { getIconSrc } from '../utils/iconMapping'
import ReactMemo from 'react'

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
      const startTime = Date.now()
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = easeOutQuart * end
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(end)
          setIsAnimating(false)
        }
      }
      
      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [end, duration, delay])

  return { count, isAnimating }
}

// CSS for animated hue rotation
const gridHueAnim = `
@keyframes tatariGridHue {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
.tatari-animated-hue {
  animation: tatariGridHue 12s linear infinite;
}
`;
if (typeof document !== 'undefined' && !document.getElementById('tatari-grid-hue-style')) {
  const style = document.createElement('style');
  style.id = 'tatari-grid-hue-style';
  style.innerHTML = gridHueAnim;
  document.head.appendChild(style);
}

// Optimized Animated Grid
const Animated3DGrid = () => {
  const gridRef = useRef(null)

  useEffect(() => {
    let frame = 0
    let rafId
    const animate = () => {
      if (gridRef.current) {
        const rot = Math.sin(frame / 120) * 8
        const scale = 1.08 + Math.sin(frame / 180) * 0.03
        gridRef.current.style.transform = `perspective(900px) rotateX(60deg) rotateZ(${rot}deg) scale(${scale}) translateY(${Math.sin(frame/180)*20}px)`
      }
      frame += 1
      rafId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center" style={{background: 'radial-gradient(ellipse at 50% 60%, #5D90DC33 0%, #000 80%)'}}>
      <svg
        ref={gridRef}
        width="120%"
        height="120%"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block mx-auto tatari-animated-hue"
        style={{ filter: 'blur(0.5px) drop-shadow(0 0 40px #5D90DC88)', willChange: 'transform' }}
      >
        {/* Vertical lines */}
        {[...Array(18)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={80 + i * 60}
            y1={60}
            x2={80 + i * 60}
            y2={740}
            stroke="#5D90DC"
            strokeWidth="1.5"
            opacity={0.18 + 0.12 * Math.abs(i-9)/9}
          />
        ))}
        {/* Horizontal lines */}
        {[...Array(12)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1={80}
            y1={60 + i * 60}
            x2={1160}
            y2={60 + i * 60}
            stroke="#CFE3FF"
            strokeWidth="1.5"
            opacity={0.13 + 0.13 * Math.abs(i-6)/6}
          />
        ))}
        {/* Diagonal lines for 3D effect */}
        {[...Array(8)].map((_, i) => (
          <line
            key={`d1-${i}`}
            x1={80 + i * 120}
            y1={60}
            x2={320 + i * 80}
            y2={740}
            stroke="#4D6EAC"
            strokeWidth="1.2"
            opacity={0.10}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <line
            key={`d2-${i}`}
            x1={1160 - i * 120}
            y1={60}
            x2={920 - i * 80}
            y2={740}
            stroke="#4D6EAC"
            strokeWidth="1.2"
            opacity={0.10}
          />
        ))}
      </svg>
    </div>
  )
}

const fadeInProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.2 },
};

const Home = () => {
  const [activeSection, setActiveSection] = useState(0)
  const navigate = useNavigate()
  const [heroCursor, setHeroCursor] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const stats = ReactMemo.useMemo(() => [
    { number: 70000, label: "AI Startups Globally", icon: "Users", suffix: "" },
    { number: 4.4, label: "Price Difference", icon: "DollarSign", suffix: "x" },
    { number: 26, label: "Demand Growth by 2030", icon: "TrendingUp", suffix: "x" },
    { number: 99.9, label: "Uptime Guarantee", icon: "Shield", suffix: "%" }
  ], [])

  const problems = ReactMemo.useMemo(() => [
    {
      title: "No Uptime Guarantees",
      description: "Users rent capacity from independent hosts with no overarching contract ensuring service continuity",
      icon: "AlertTriangle",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Node Instability", 
      description: "Hardware and connection quality vary widely, some community hosts may go offline unexpectedly",
      icon: "AlertTriangle",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Energy Loss",
      description: "Smaller data centers have 50-60% overhead for cooling and lighting instead of powering servers",
      icon: "AlertTriangle",
      color: "from-yellow-500 to-yellow-600"
    }
  ], [])

  const solutions = ReactMemo.useMemo(() => [
    {
      title: "Sourcing",
      description: "Aggregates trusted GPU vendors across marketplaces and private clouds",
      icon: "Globe",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Reliability", 
      description: "Guarantees uptime via SLAs, monitors performance, and places workloads by region",
      icon: "Shield",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Interface",
      description: "Launches with a white-labeled console UI and roadmap to green infrastructure",
      icon: "Cpu",
      color: "from-purple-500 to-purple-600"
    }
  ], [])

  const tatariEdgeStats = ReactMemo.useMemo(() => [
    { number: "30%+", label: "Lower cost vs hyperscalers", icon: "TrendingUp" },
    { number: "<5 min", label: "Repo → running cluster", icon: "Zap" },
    { number: "100%", label: "Reproducible experiments", icon: "Shield" }
  ], [])

  

  const gpuArsenal = ReactMemo.useMemo(() => [
    {
      name: 'NVIDIA B200',
      desc: '192GB HBM3e, 8 TB/s bandwidth, FP4/FP6, next‑gen NVLink.',
      img: getAssetPath('assets/gpus/b200.png')
    },
    {
      name: 'NVIDIA H200',
      desc: '141GB HBM3e at 4.8 TB/s for uninterrupted throughput.',
      img: getAssetPath('assets/gpus/h200.jpg')
    },
    {
      name: 'NVIDIA H100',
      desc: '80GB HBM3, 3 TB/s, 4× faster training with FP8 Tensor Cores.',
      img: getAssetPath('assets/gpus/h100.jpg')
    },
  ], [])

  const competitors = [
    { name: "Vast.ai", price: "$0.89", sla: "No centralized SLA", green: "Host-dependent" },
    { name: "Coreweave", price: "$2.25", sla: "99.9%", green: "Partial clean sourcing" },
    { name: "AWS/GCP", price: "$3.06", sla: "99.9%", green: "Partial REC-backed" },
    { name: "Tatari", price: "$1.80", sla: "99.9%", green: "100% hydroelectric" }
  ]

  return (
    <div className="min-h-screen bg-black pt-navbar">
      <Navbar />
      
      

      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] md:min-h-[90vh] flex flex-col items-center justify-center z-10 overflow-hidden"
        onMouseMove={(e) => setHeroCursor({ x: e.clientX, y: e.clientY })}
      >
        <Animated3DGrid />
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(600px 300px at ${heroCursor.x}px ${heroCursor.y}px, rgba(80,124,187,0.12), transparent 60%)`
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 leading-tight" style={{letterSpacing: '-0.02em'}}>
              The Fastest Path from Idea to AI
            </h1>
            <h2 className="text-gray-200 text-xl md:text-2xl font-medium mb-6 max-w-3xl mx-auto">
              Tatari fully integrates AI Compute and MLOps, so you can focus on building the future while we handle the rest.
            </h2>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform flex items-center justify-center cursor-pointer"
              onClick={() => navigate('/explore-our-tech')}
            >
              Explore Our Tech
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="group text-white hover:underline font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
              onClick={() => navigate('/contact')}
            >
              Contact Sales
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Purpose-Built for the AI Era + Tatari Edge */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Purpose-Built for the AI Era</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Tatari isn’t just another GPU provider, it’s the command center for AI innovation. Every GPU hour is powered by a fully integrated ML stack: experiment tracking, dataset versioning, automated pipelines, model registry, and one-click serving. We cut the friction between idea and deployment, so you move faster, break less, and build more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {tatariEdgeStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center"
              >
                <img src={getIconSrc(stat.icon)} alt={stat.label} className="h-8 w-8 object-contain mx-auto mb-3" loading="lazy" />
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-base text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          
        </div>
      </section>

      {/* Our GPU Arsenal */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Our GPU Arsenal</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">Choose frontier-class GPUs engineered for the most demanding AI workloads.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gpuArsenal.map((gpu, idx) => (
              <motion.div
                key={gpu.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate('/explore-our-tech')}
                className="group cursor-pointer bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-primary-600 transition-all"
              >
                <div className="relative h-48 bg-gray-700">
                  <img src={gpu.img} alt={gpu.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
                <div className="p-6">
                  <div className="text-white font-bold text-xl mb-2">{gpu.name}</div>
                  <div className="text-gray-300 text-sm">{gpu.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tatari’s Non-Negotiables */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Tatari’s Non-Negotiables</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-12">
            {[
              { title: 'Real Support, Real People', desc: '24/7 access to engineers who can actually solve your problem.' },
              { title: 'Sustainability First', desc: 'A clean energy mix and carbon-aware scheduling slash emissions.' },
              { title: 'Radical Transparency', desc: 'Every run tied to a clear receipt so you know where money goes.' },
              { title: 'No Lock-ins. Ever.', desc: 'Your data and models remain yours — always.' },
              { title: 'Security from the Ground Up', desc: 'Private networking, encryption everywhere, enterprise-grade compliance.' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center max-w-sm hover:scale-[1.02] transition-transform"
              >
                <div className="text-lg md:text-xl font-semibold text-white mb-2">{item.title}</div>
                <div className="text-gray-300">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose-Built for Visionaries */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Purpose-Built for Visionaries</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">The future won’t be built on yesterday’s systems. Tatari gives AI teams the speed, control, and integration they need to move ideas into production at unprecedented velocity. We deliver the most advanced GPU compute, coupled with a seamless MLOps stack in one integrated platform — powered sustainably. We don’t just keep up with innovation. We drive it.</p>
          </motion.div>
          <div className="text-center">
            <button onClick={() => navigate('/our-story')} className="text-primary-300 hover:text-primary-200 underline text-lg">Learn About Our Story</button>
          </div>
        </div>
      </section>

      {/* Target Customers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Who Is Tatari For?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tatari is built for teams who need scalable, affordable, and reliable compute—without the headaches of traditional cloud providers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, boxShadow: '0 12px 32px 0 rgba(80,124,187,0.18)' }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-800 p-8 rounded-2xl border border-gray-600"
            >
              <h3 className="text-2xl font-bold text-white mb-4">AI/ML Startups</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <img src={getIconSrc("CheckCircle")} alt="Check" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 object-contain" loading="lazy" />
                  <span className="text-gray-300">Need scalable, cost-effective inference & training compute</span>
                </li>
                <li className="flex items-start">
                  <img src={getIconSrc("CheckCircle")} alt="Check" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 object-contain" loading="lazy" />
                  <span className="text-gray-300">Prefer flexible, low-commitment infrastructure</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, boxShadow: '0 12px 32px 0 rgba(80,124,187,0.18)' }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-800 p-8 rounded-2xl border border-gray-600"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Academic Labs & Research</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <img src={getIconSrc("CheckCircle")} alt="Check" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 object-contain" loading="lazy" />
                  <span className="text-gray-300">Require access to powerful GPUs for experimentation</span>
                </li>
                <li className="flex items-start">
                  <img src={getIconSrc("CheckCircle")} alt="Check" className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 object-contain" loading="lazy" />
                  <span className="text-gray-300">Value latency and geographic proximity</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">The Future Never Waits. Why Should You?</h2>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform flex items-center justify-center cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onClick={() => navigate('/explore-our-tech')}
            >
              Explore Our Tech
            </motion.div>
            <motion.div
              className="group text-white hover:underline font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              onClick={() => navigate('/contact')}
            >
              Contact Sales
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Blurb */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto text-gray-300 leading-relaxed">
          <p>
            Tatari Systems began as a Bitcoin mining venture, operating 144 ASIC miners in Ethiopia powered by clean energy. Leveraging our expertise in scaling compute infrastructure, we now focus on delivering high-performance AI cloud services. Our fully integrated platform combines GPU compute at the most competitive price points possible with MLOps tooling including experiment tracking, dataset versioning, automated pipelines, model registry, and one-click deployment. This streamlines the path from experimentation to production, enabling AI teams to innovate faster while we manage the infrastructure. Our mission is to be the command center for AI startups, supporting the next generation of AI applications with proven large-scale compute expertise.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-700 to-secondary-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Building with Tatari Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get instant access to powerful GPUs. Try for free or schedule a demo—no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: '0 12px 32px 0 rgba(80,124,187,0.25)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/explore-our-tech')}
              >
                Get Started Free
                <motion.span whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.span>
              </motion.div>
              <motion.div
                className="group text-white hover:underline font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}
              >
                Schedule Demo
                <motion.span whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ReactMemo.memo(Home) 