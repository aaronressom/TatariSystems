import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Lottie from 'lottie-react';
import Navbar from '../components/Navbar';
import BitcoinPriceTracker from '../components/BitcoinPriceTracker';
import { getIconSrc } from '../utils/iconMapping';

const Mining = () => {
  const navigate = useNavigate();
  const [miningAnimationData, setMiningAnimationData] = useState(null);
  const base = (import.meta as any).env?.PROD ? '/TatariSystems' : '';

  useEffect(() => {
    fetch(`${base}/animations/blockanim.json`)
      .then(response => response.json())
      .then(data => setMiningAnimationData(data))
      .catch(error => console.error('Error loading mining animation:', error));
  }, [base]);

  const features = [
    {
      icon: 'Cpu',
      title: 'High-Performance Mining',
      description: 'Optimized infrastructure for maximum hash rate and efficiency.',
      color: 'bg-brand-blue-1'
    },
    {
      icon: 'Zap',
      title: 'Sustainable Energy',
      description: '100% renewable energy sources with hydroelectric power.',
      color: 'bg-brand-cyan'
    },
    {
      icon: 'Shield',
      title: 'Reliable Operations',
      description: '99.9% uptime guarantee with redundant systems.',
      color: 'bg-brand-blue-3'
    },
    {
      icon: 'Globe',
      title: 'Global Infrastructure',
      description: 'Strategic locations for optimal performance and cost.',
      color: 'bg-brand-blue-2'
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime Guarantee", icon: "Shield" },
    { number: "100%", label: "Renewable Energy", icon: "Activity" },
    { number: "50%", label: "Lower Carbon Footprint", icon: "TrendingUp" },
    { number: "24/7", label: "Monitoring", icon: "Clock" }
  ];

  const sustainabilityMetrics = [
    {
      title: "Traditional Mining",
      carbonFootprint: "820 kg CO₂/MWh",
      energySource: "Fossil Fuels",
      efficiency: "60-70%",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Tatari Mining",
      carbonFootprint: "20 kg CO₂/MWh",
      energySource: "Hydroelectric",
      efficiency: "95%+",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen bg-black text-white pt-navbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Breadcrumb */}
        <motion.nav className="text-sm text-gray-400 py-4 px-4 sm:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Home</span> /
          <span className="hover:underline cursor-pointer ml-1" onClick={() => navigate('/story')}>Story</span> /
          <span className="ml-1 text-white font-semibold">Mining</span>
        </motion.nav>

        {/* Hero Section */}
        <motion.section
          className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-8 py-16 gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Left */}
          <motion.div className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Sustainable Bitcoin Mining Infrastructure</h1>
            <p className="text-xl text-gray-300 mb-8">From the Ethiopian highlands to global scale, we've mastered the art of efficient, sustainable cryptocurrency mining with 95%+ efficiency and 100% renewable energy.</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div
                className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/mining/infrastructure')}
              >
                Explore Infrastructure
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div
                className="group text-white hover:underline font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/contact')}
              >
                Partner With Us
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
              {miningAnimationData ? (
                <Lottie
                  animationData={miningAnimationData}
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: '100%', background: 'none' }}
                />
              ) : (
                <span className="text-6xl text-primary-500">⛏️</span>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Bitcoin Price Tracker */}
        <BitcoinPriceTracker />

        {/* Stats Section */}
        <motion.section className="py-16 px-4 sm:px-8 bg-gray-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex-1 flex flex-col items-center px-0 md:px-8 mb-12 md:mb-0
                  ${index !== 0 ? 'border-l border-gray-400' : ''}
                  ${index !== stats.length - 1 ? 'border-r border-gray-400' : ''}
                `}
              >
                <img src={getIconSrc(stat.icon)} alt={stat.label} className="mb-3 h-8 w-8 object-contain" />
                <div className="text-4xl font-extrabold text-white mb-1 tracking-tight">{stat.number}</div>
                <div className="text-base text-gray-200 font-medium text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section className="py-16 px-4 sm:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-16 text-center">Why Choose Tatari Mining?</h2>
          <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex-1 flex flex-col items-center px-0 md:px-8 mb-12 md:mb-0
                  ${index !== 0 ? 'border-l border-gray-400' : ''}
                  ${index !== features.length - 1 ? 'border-r border-gray-400' : ''}
                `}
              >
                <img src={getIconSrc(feature.icon)} alt={feature.title} className="mb-3 h-8 w-8 object-contain" />
                <h3 className="text-xl font-bold text-white mb-2 text-center">{feature.title}</h3>
                <p className="text-white/80 text-center text-base max-w-xs">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Sustainability Comparison */}
        <motion.section className="py-16 px-4 sm:px-8 bg-gray-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-16 text-center">Sustainability Impact</h2>
          <div className="flex flex-col md:flex-row max-w-4xl mx-auto">
            {sustainabilityMetrics.map((metric, index) => (
              <div
                key={metric.title}
                className={`flex-1 flex flex-col items-start md:items-center px-0 md:px-8 mb-12 md:mb-0
                  ${index !== 0 ? 'border-l border-gray-400' : ''}
                  ${index !== sustainabilityMetrics.length - 1 ? 'border-r border-gray-400' : ''}
                `}
              >
                <h3 className="text-2xl font-bold text-white mb-4">{metric.title}</h3>
                <div className="mb-4">
                  <div className="text-3xl font-extrabold text-white mb-1">{metric.carbonFootprint}</div>
                  <div className="text-white/80 text-sm">Carbon Footprint</div>
                </div>
                <div className="mb-4">
                  <div className="text-xl font-semibold text-white mb-1">{metric.energySource}</div>
                  <div className="text-white/80 text-sm">Energy Source</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-white mb-1">{metric.efficiency}</div>
                  <div className="text-white/80 text-sm">Efficiency</div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Technology Section */}
        <motion.section className="py-16 px-4 sm:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-16 text-center">Advanced Mining Technology</h2>
          <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
            <div className="flex-1 flex flex-col items-center px-0 md:px-8 mb-12 md:mb-0 border-r border-gray-400">
              <img src={getIconSrc("Server")} alt="Custom Firmware" className="mb-3 h-8 w-8 object-contain" />
              <h3 className="text-xl font-bold mb-2 text-white text-center">Custom Firmware</h3>
              <p className="text-gray-300 text-center text-base max-w-xs">Optimized mining software for maximum efficiency and hash rate performance.</p>
            </div>
            <div className="flex-1 flex flex-col items-center px-0 md:px-8 mb-12 md:mb-0 border-l border-gray-400 border-r border-gray-400">
              <img src={getIconSrc("Database")} alt="Smart Pool Management" className="mb-3 h-8 w-8 object-contain" />
              <h3 className="text-xl font-bold mb-2 text-white text-center">Smart Pool Management</h3>
              <p className="text-gray-300 text-center text-base max-w-xs">Intelligent pool selection and failover systems for consistent mining operations.</p>
            </div>
            <div className="flex-1 flex flex-col items-center px-0 md:px-8 mb-12 md:mb-0 border-l border-gray-400">
              <img src={getIconSrc("BarChart")} alt="Real-time Monitoring" className="mb-3 h-8 w-8 object-contain" />
              <h3 className="text-xl font-bold mb-2 text-white text-center">Real-time Monitoring</h3>
              <p className="text-gray-300 text-center text-base max-w-xs">Comprehensive dashboards and alerts for optimal mining performance tracking.</p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section className="py-16 px-4 sm:px-8 bg-gray-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Mine Sustainably?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join us in building the future of sustainable cryptocurrency mining.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div
                  className="group bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
                  onClick={() => navigate('/mining/infrastructure')}
                >
                  Explore Infrastructure
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div
                  className="group text-white hover:underline font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Mining; 