import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { getAssetPath } from '../utils/paths'

const team = [
  { name: 'Alex Dalban', role: 'CEO, COO', img: 'dalban.jpg' },
  { name: 'Marcel Boucheseiche', role: 'Head of Growth', img: 'boucheseiche.jpg' },
  { name: 'Yasha Genkin', role: 'Head of Marketing', img: 'genkin.jpg' },
  { name: 'Al-Amin Mumuney', role: 'Head of Innovation', img: 'mumuney.jpg' },
  { name: 'Nathan Banketa', role: 'Research Lead', img: 'banketa.png' },
  { name: 'Kayla Sadraie', role: 'Chief Legal Counsel', img: 'sadraie.jpg' },
  { name: 'Amen Amare', role: 'Operating Partner, Founder', img: 'amare.jpg' },
  { name: 'Meba Michael', role: 'Head of Finance', img: 'michael.jpg' },
  { name: 'Glodi Karagi', role: 'Head of Business Development', img: 'karagi.jpg' },
  { name: 'Jimi Oso', role: 'Head of Phase II + Engineering', img: 'oso.jpg' },
  { name: 'Paul Kolomeyer', role: 'Investor Relations Specialist', img: 'kolomeyer.jpg' },
  { name: 'Mario Bustillos', role: 'Strategic Growth Intern', img: 'bustillos.jpg' },
]

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('')
}

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-navbar">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Our Story */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h1 className="text-4xl font-extrabold text-secondary-900 mb-6">Our Story</h1>
            <p className="text-lg text-secondary-700 leading-relaxed">
              Founded by industry veterans frustrated by the mismatch between AI demand and traditional cloud pricing models, Tatari's core mission is to democratize access to high-performance, low-carbon compute.
            </p>
          </motion.section>

          {/* Our Values */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Our Values</h2>
            <ul className="space-y-4">
              <li>
                <span className="font-semibold text-primary-600">Reliability:</span> We stand by our SLAs.
              </li>
              <li>
                <span className="font-semibold text-primary-600">Transparency:</span> No hidden fees or opaque marketplaces.
              </li>
              <li>
                <span className="font-semibold text-primary-600">Sustainability:</span> Every job scheduled with the planet in mind.
              </li>
            </ul>
          </motion.section>

          {/* Meet the Team */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Meet the Team</h2>
            <p className="text-secondary-700 mb-8">Meet the visionaries behind Tatari Systems, leading the way in cryptocurrency mining innovation. Their expertise and dedication drive our success.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #5D90DC33' }}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all cursor-pointer"
                >
                  {member.img ? (
                    <img
                      src={getAssetPath(`/headshots/${member.img}`)}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary-100 shadow"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=5D90DC&color=fff&size=128`;
                      }}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary-600 mb-4">
                      {getInitials(member.name)}
                    </div>
                  )}
                  <div className="font-bold text-lg text-secondary-900 mb-1">{member.name}</div>
                  <div className="text-primary-600 font-medium text-sm">{member.role}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact / CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-primary-50 rounded-2xl p-8 shadow-lg text-center"
          >
            <h3 className="text-xl font-bold text-primary-700 mb-2">Ready to get started?</h3>
            <p className="text-secondary-700 mb-4">Sign up for a free trial or schedule a demo.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="mailto:support@tatari.ai" className="btn-primary">Contact Us</a>
              <a href="tel:+18005551234" className="btn-secondary">+1 (800) 555-1234</a>
            </div>
            <div className="mt-6 flex justify-center gap-6 text-primary-600">
              <a href="https://twitter.com/tatari" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com/company/tatari" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/tatari" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default About 