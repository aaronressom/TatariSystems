import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Lottie from 'lottie-react';
import Navbar from '../components/Navbar';
import { getIconSrc } from '../utils/iconMapping';
import ReactMemo from 'react';

const TrainingStack = () => {
  const [gpuAnimationData, setGpuAnimationData] = useState(null);
  const navigate = useNavigate();
  const base = (import.meta as any).env?.PROD ? '/TatariSystems' : '';

  // Lazy-load Lottie animation only when visible
  useEffect(() => {
    if (!gpuAnimationData) {
      fetch(`${base}/animations/gpu.json`)
        .then(response => response.json())
        .then(data => setGpuAnimationData(data))
        .catch(error => console.error('Error loading GPU animation:', error));
    }
  }, [base, gpuAnimationData]);

  const features = ReactMemo.useMemo(() => [
    { icon: "Cpu", title: 'Full GPU Access', desc: 'No virtualization, direct bare-metal performance' },
    { icon: "Zap", title: 'Built for Deep Learning', desc: 'Optimized for PyTorch, JAX, and TensorFlow' },
    { icon: "Globe", title: 'Global Footprint', desc: 'Serve models close to your data sources' },
    { icon: "DollarSign", title: 'Lower TCO', desc: 'Save up to 30% vs. traditional cloud solutions' }
  ], []);

  const useCases = ReactMemo.useMemo(() => [
    { icon: "Zap", title: 'LLM Training', desc: 'Scale transformer models with predictable GPU performance' },
    { icon: "Sliders", title: 'Fine-Tuning & RLHF', desc: 'Customize foundation models with full environment control' },
    { icon: "BookOpen", title: 'Academic & Scientific Research', desc: 'Run repeatable experiments at institutional scale' }
  ], []);

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen bg-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Breadcrumb */}
        <motion.nav className="text-sm text-gray-400 py-4 px-4 sm:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <span className="hover:underline cursor-pointer">Home</span> /
          <span className="hover:underline cursor-pointer ml-1">Products</span> /
          <span className="ml-1 text-white font-semibold">Training Stack (Coming Soon)</span>
        </motion.nav>

        {/* Hero Section */}
        <motion.section
          className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 py-16 gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Left */}
          <motion.div className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Purpose-Built GPU Infrastructure for AI Training Workloads</h1>
            <p className="text-xl text-gray-300 mb-8">Launch large-scale model training in minutes with full control, bare-metal performance, and global scale.</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div
                className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/training-stack/early-access')}
              >
                Join Early Access
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div
                className="group text-white hover:underline font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/company/contact')}
              >
                Talk to Sales
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
          {/* Right: Lottie Animation */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="w-80 h-80 flex items-center justify-center">
              {gpuAnimationData ? (
                <Lottie
                  animationData={gpuAnimationData}
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: '100%', background: 'none' }}
                />
              ) : (
                <span className="text-6xl text-primary-500">[Loading Animation]</span>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* How It Works */}
        <motion.section className="py-24 px-4 sm:px-8 bg-gray-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-16 text-center">How It Works</h2>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row mt-20 mb-20">
              {[{icon: "Cpu", title: 'Spin Up in Minutes', desc: 'Deploy H100, A100, or H200 training clusters at scale — no queue, no waiting.'}, {icon: "Sliders", title: 'Scale Efficiently', desc: 'Add or remove GPU nodes instantly to match your training cycles.'}, {icon: "BookOpen", title: 'Customize Your Stack', desc: 'Run your own containers, frameworks, or pre-configured environments.'}].map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex-1 flex flex-col items-center px-0 md:px-8 mb-12 md:mb-0
                    ${idx !== 0 ? 'border-l border-gray-400' : ''}
                    ${idx !== 2 ? 'border-r border-gray-400' : ''}
                  `}
                >
                  <img src={getIconSrc(item.icon)} alt={item.title} className="mb-4 h-10 w-10 text-primary-500" loading="lazy" />
                  <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>
                  <p className="text-gray-300 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why Tatari? */}
        <motion.section className="py-24 px-4 sm:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-16 text-center">The Tatari Training Advantage</h2>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row mt-20 mb-32">
              {features.slice(0, 2).map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex-1 flex flex-col items-center px-0 md:px-8 mb-12 md:mb-0
                    ${idx !== 0 ? 'border-l border-gray-400' : ''}
                    ${idx !== 1 ? 'border-r border-gray-400' : ''}
                  `}
                >
                  <img src={getIconSrc(item.icon)} alt={item.title} className="h-10 w-10 text-primary-500 mb-3" loading="lazy" />
                  <div className="font-bold mb-1 text-center">{item.title}</div>
                  <div className="text-gray-300 text-sm text-center">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row mt-32 mb-20">
              {features.slice(2, 4).map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex-1 flex flex-col items-center px-0 md:px-8 mb-12 md:mb-0
                    ${idx !== 0 ? 'border-l border-gray-400' : ''}
                    ${idx !== 1 ? 'border-r border-gray-400' : ''}
                  `}
                >
                  <img src={getIconSrc(item.icon)} alt={item.title} className="h-10 w-10 text-primary-500 mb-3" loading="lazy" />
                  <div className="font-bold mb-1 text-center">{item.title}</div>
                  <div className="text-gray-300 text-sm text-center">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Use Cases */}
        <motion.section className="py-24 px-4 sm:px-8 bg-gray-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-16 text-center">Built for Real Workloads</h2>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row mt-20 mb-20">
              {useCases.map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex-1 flex flex-col items-center px-0 md:px-8 mb-12 md:mb-0
                    ${idx !== 0 ? 'border-l border-gray-400' : ''}
                    ${idx !== 2 ? 'border-r border-gray-400' : ''}
                  `}
                >
                  <img src={getIconSrc(item.icon)} alt={item.title} className="mx-auto mb-4 h-10 w-10 text-primary-500" loading="lazy" />
                  <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>
                  <p className="text-gray-300 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Where We're Launching (Interactive Map) */}
        <motion.section className="py-16 px-4 sm:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Launching Soon — Globally</h2>
          <div className="flex flex-col items-center">
            {/* World Animation */}
            <WorldAnimation />
          </div>
        </motion.section>

        {/* Testimonial Section */}
        <motion.section className="py-16 px-4 sm:px-8 bg-gray-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4">
                {/* Placeholder for logo or name */}
                <img src={getIconSrc('Users')} alt="User" className="h-10 w-10 text-primary-500" loading="lazy" />
              </div>
              <blockquote className="text-xl text-white italic mb-4">
                “We wanted a partner who actually understood model training — Tatari delivered infrastructure that scaled with our ambition.”
              </blockquote>
              <div className="text-gray-400 text-sm mb-2">— Future Customer / AI Researcher</div>
              {/* Option to rotate testimonials in a slider or scroll (placeholder) */}
              <div className="text-gray-500 text-xs">[Testimonial slider coming soon]</div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default ReactMemo.memo(TrainingStack);

const WorldAnimation = () => {
  const [worldData, setWorldData] = useState<any>(null);
  const base = (import.meta as any).env?.PROD ? '/TatariSystems' : '';

  useEffect(() => {
    fetch(`${base}/animations/world.json`)
      .then(response => response.json())
      .then(data => setWorldData(data))
      .catch(error => console.error('Error loading world animation:', error));
  }, [base]);

  return (
    <div className="w-[400px] h-[400px] flex items-center justify-center">
      {worldData ? (
        <Lottie
          animationData={worldData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%', background: 'none' }}
        />
      ) : (
        <span className="text-4xl text-primary-500">[Loading World]</span>
      )}
    </div>
  );
}; 