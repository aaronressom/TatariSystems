import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getIconSrc } from '../utils/iconMapping';

const contactTypes = [
  {
    id: 'sales',
    title: 'Sales',
    desc: 'For enterprise demos, pricing, and partnerships.',
    icon: 'Users',
    color: 'bg-brand-cyan',
  },
  {
    id: 'general',
    title: 'General Inquiry',
    desc: 'Quick questions or other topics.',
    icon: 'MessageSquare',
    color: 'bg-brand-blue-1',
  },
  {
    id: 'support',
    title: 'Support',
    desc: 'Technical or operational issues.',
    icon: 'Shield',
    color: 'bg-brand-purple',
  },
  {
    id: 'investor',
    title: 'Investor Relations',
    desc: 'For investors and funding inquiries.',
    icon: 'DollarSign',
    color: 'bg-brand-green',
  },
];

const initialFormState = {
  email: '',
  message: '',
};

const Contact = () => {
  const [stage, setStage] = useState<'hero' | 'types' | 'form'>('hero');
  const [selectedType, setSelectedType] = useState(null);
  const [form, setForm] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setStage('form');
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setForm(initialFormState);
  };

  return (
    <div className="min-h-screen relative bg-gray-950 overflow-hidden">
      {/* Decorative SVG background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0 w-full h-full" style={{opacity:0.18}}>
          <defs>
            <linearGradient id="bg-gradient-dark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#153e84" />
              <stop offset="100%" stopColor="#507cbb" />
            </linearGradient>
            <pattern id="grid-dark" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#334155" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-gradient-dark)" />
          <rect width="100%" height="100%" fill="url(#grid-dark)" />
        </svg>
      </div>
      {/* Darker Glassmorphic Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="glass-navbar bg-black/90 text-white border-b border-white/20 backdrop-blur-xl shadow-xl">
          <Navbar />
        </div>
      </div>
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16 px-2">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
          <AnimatePresence mode='wait'>
            {stage === 'hero' && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center text-center py-24"
              >
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 drop-shadow-xl">Let's Talk Compute</h1>
                <p className="text-2xl md:text-3xl text-gray-200 mb-14 max-w-3xl mx-auto font-medium">
                  Whether you're planning large-scale training, building with bare-metal infrastructure, or exploring partnerships, start here.<br />
                  <span className="text-brand-cyan font-semibold">Tatari-grade compute with a human touch.</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-button bg-brand-cyan/80 hover:bg-brand-blue-1/80 text-white font-bold text-2xl px-12 py-6 rounded-2xl shadow-2xl transition-all duration-200 flex items-center gap-3 backdrop-blur-xl"
                  onClick={() => setStage('types')}
                >
                  I’m interested in <ArrowRight className="h-7 w-7 text-white" />
                </motion.button>
              </motion.div>
            )}

            {stage === 'types' && (
              <motion.div
                key="types"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center py-16"
              >
                <h2 className="text-3xl font-bold text-white mb-12">How can we help you?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
                  {contactTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      className={`glass-card flex flex-col items-center justify-center p-12 rounded-3xl shadow-2xl border border-white/20 bg-white/10 transition-all duration-200 cursor-pointer group hover:shadow-3xl hover:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 backdrop-blur-xl ${type.color}`}
                      style={{ boxShadow: '0 8px 40px 0 rgba(80,124,187,0.10)' }}
                      onClick={() => handleTypeSelect(type)}
                    >
                      <div className={`mb-6 rounded-full p-6 bg-white/10 group-hover:bg-brand-cyan/20 backdrop-blur-xl transition-all`}>
                        <img src={getIconSrc(type.icon)} alt={type.title} className="h-12 w-12 object-contain" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-3">{type.title}</div>
                      <div className="text-gray-200 text-lg">{type.desc}</div>
                    </motion.button>
                  ))}
                </div>
                <button
                  className="mt-14 text-base text-gray-400 hover:text-brand-cyan underline"
                  onClick={() => setStage('hero')}
                >
                  &larr; Back
                </button>
              </motion.div>
            )}

            {stage === 'form' && selectedType && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl mx-auto py-16"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="rounded-full p-4 bg-brand-cyan/10 backdrop-blur-xl">
                    <img src={getIconSrc(selectedType.icon)} alt={selectedType.title} className="h-10 w-10 object-contain" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{selectedType.title} Contact</div>
                    <div className="text-gray-200 text-lg">{selectedType.desc}</div>
                  </div>
                </div>
                <form onSubmit={handleFormSubmit} className="glass-card bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-12 flex flex-col gap-8 backdrop-blur-xl">
                  <div>
                    <label htmlFor="email" className="block text-lg font-semibold text-white mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      placeholder="Email address"
                      className="w-full px-6 py-4 border border-gray-700 rounded-xl focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-colors text-white bg-white/10 placeholder-gray-400 text-lg backdrop-blur-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-lg font-semibold text-white mb-2">How can we help?</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleFormChange}
                      rows={5}
                      placeholder="Your message"
                      className="w-full px-6 py-4 border border-gray-700 rounded-xl focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-colors text-white bg-white/10 placeholder-gray-400 text-lg backdrop-blur-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="w-full glass-button bg-brand-cyan/80 hover:bg-brand-blue-1/80 text-white font-bold py-4 rounded-xl shadow transition-all duration-200 flex items-center justify-center gap-3 text-2xl backdrop-blur-xl"
                    >
                      Send Message <ArrowRight className="h-7 w-7 text-white" />
                    </button>
                    <button
                      type="button"
                      className="text-base text-gray-400 hover:text-brand-cyan underline mt-2"
                      onClick={() => setStage('types')}
                    >
                      &larr; Back
                    </button>
                  </div>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-green-400 text-center font-semibold mt-2 text-lg"
                    >
                      Message sent! We'll be in touch soon.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Contact; 