import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Globe, Cpu, Cloud, Bitcoin, ExternalLink, Twitter, Linkedin, Github, Youtube, Facebook, Instagram, ArrowRight, CheckCircle } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Solutions',
      links: [
        { name: 'AI Infrastructure', path: '/solutions/ai', icon: Cpu },
        { name: 'Cloud Solutions', path: '/solutions/cloud', icon: Cloud },
        { name: 'Cryptocurrency Mining', path: '/solutions/mining', icon: Bitcoin },
        { name: 'Emerging Markets', path: '/solutions/emerging', icon: Globe }
      ]
    },
    {
      title: 'Products',
      links: [
        { name: 'GPU Clusters', path: '/products/gpu-clusters', icon: Cpu },
        { name: 'Cloud Platform', path: '/products/cloud-platform', icon: Cloud },
        { name: 'Mining Facilities', path: '/products/mining-facilities', icon: Bitcoin },
        { name: 'Edge Computing', path: '/products/edge-computing', icon: Globe }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about', icon: undefined },
        { name: 'Our Team', path: '/team', icon: undefined },
        { name: 'Careers', path: '/careers', icon: undefined },
        { name: 'Press Kit', path: '/press', icon: undefined }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '/docs', icon: undefined },
        { name: 'Research', path: '/research', icon: undefined },
        { name: 'Podcast', path: '/podcast', icon: undefined },
        { name: 'Support Center', path: '/support', icon: undefined }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy', icon: undefined },
        { name: 'Terms of Service', path: '/terms', icon: undefined },
        { name: 'Cookie Policy', path: '/cookies', icon: undefined },
        { name: 'GDPR Compliance', path: '/gdpr', icon: undefined }
      ]
    }
  ]

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@tatarisystems.com',
      href: 'mailto:info@tatarisystems.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Headquarters',
      value: 'Boston, MA',
      href: '#'
    }
  ]

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/tatarisystems' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/tatarisystems' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/tatarisystems' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@tatarisystems' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/tatarisystems' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/tatarisystems' }
  ]

  const trustSignals = [
    { text: '99.9% Uptime Guarantee', icon: CheckCircle },
    { text: '100% Renewable Energy', icon: CheckCircle },
    { text: '24/7 Support', icon: CheckCircle },
    { text: 'SOC 2 Type II Certified', icon: CheckCircle }
  ]

  return (
    <footer className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="font-bold text-2xl">Tatari Systems</span>
              </motion.div>
              
              <motion.p 
                className="text-white/80 mb-8 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Powering the future with sustainable high-performance computing solutions. 
                From AI training to cryptocurrency mining, we deliver scalable infrastructure 
                powered by renewable energy.
              </motion.p>
              
              {/* Trust Signals */}
              <motion.div 
                className="space-y-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {trustSignals.map((signal, index) => (
                  <motion.div 
                    key={signal.text}
                    className="flex items-center space-x-3 text-white/70"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <signal.icon className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium">{signal.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                      <info.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{info.label}</div>
                      <div className="text-sm">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg font-semibold mb-6 text-white"
                >
                  {section.title}
                </motion.h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={link.path}
                        className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors duration-300 group"
                      >
                        {link.icon && (
                          <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                            <link.icon className="h-3 w-3" />
                          </div>
                        )}
                        <span className="text-sm font-medium">{link.name}</span>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div 
          className="py-12 border-t border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-white/70 mb-6">
              Get the latest insights on sustainable computing infrastructure and industry trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <motion.button
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-white/70 text-sm"
            >
              © {currentYear} Tatari Systems. All rights reserved.
            </motion.div>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="h-5 w-5 text-white group-hover:text-white" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  )
}

export default Footer 