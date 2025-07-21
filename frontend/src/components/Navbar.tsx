import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { getAssetPath } from '../utils/paths'
import { getIconSrc } from '../utils/iconMapping'
import { Menu, X } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null)
  const isActive = (path: string) => location.pathname === path
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setOpenDropdown(label)
  }
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 100)
  }

  const useCases = [
    { title: 'Model Training', color: 'bg-brand-blue-1' },
    { title: 'AI & ML Inference', color: 'bg-brand-cyan' },
    { title: 'AI Development', color: 'bg-brand-blue-3' },
    { title: 'Model Fine-Tuning', color: 'bg-brand-blue-2' },
  ];
  const industries = [
    'Telco', 'Software & Technology', 'Finance & Insurance', 'Manufacturing',
    'Education', 'Government', 'Legal', 'Healthcare',
  ];

  const productDropdown = [
    {
      title: 'Omni Stack',
      description: 'All-in-one platform to build, train, and deploy AI at scale.',
      color: 'bg-brand-blue-1',
      cta: 'Explore Omni Stack',
      ctaHref: '/omni-stack',
      subsections: [
        {
          label: 'Launch AI Apps',
          desc: 'Spin up and manage AI applications in minutes.',
          icon: 'Zap',
          href: '/omni-stack#launch',
        },
        {
          label: 'Full GPU Access',
          desc: 'Bare-metal performance, no virtualization.',
          icon: 'Cpu',
          href: '/omni-stack#gpu',
        },
        {
          label: 'Global Regions',
          desc: 'Deploy close to your data sources worldwide.',
          icon: 'Globe',
          href: '/omni-stack#regions',
        },
      ],
    },
    {
      title: 'Training Stack',
      description: 'Purpose-built GPU clusters for large-scale training.',
      color: 'bg-brand-blue-1',
      cta: 'Join Early Access',
      ctaHref: '/training-stack',
      subsections: [
        {
          label: 'H100/A100 Clusters',
          desc: 'Deploy the latest NVIDIA GPUs for training.',
          icon: 'Server',
          href: '/training-stack#clusters',
        },
        {
          label: 'Custom Environments',
          desc: 'Run your own containers or frameworks.',
          icon: 'Cloud',
          href: '/training-stack#custom',
        },
        {
          label: 'Early Access',
          desc: 'Be the first to try new features and hardware.',
          icon: 'Zap',
          href: '/training-stack/early-access',
        },
      ],
    },
    {
      title: 'Inference Stack',
      description: 'Fast, scalable inference for production AI workloads.',
      color: 'bg-brand-blue-1',
      cta: 'Explore Inference',
      ctaHref: '/inference-stack',
      subsections: [
        {
          label: 'Serverless Endpoints',
          desc: 'Deploy APIs for instant inference at scale.',
          icon: 'Cloud',
          href: '/inference-stack#serverless',
        },
        {
          label: 'Autoscaling',
          desc: 'Scale up or down automatically based on demand.',
          icon: 'Sliders',
          href: '/inference-stack#autoscaling',
        },
        {
          label: 'API Integration',
          desc: 'Easily connect to your apps and services.',
          icon: 'BookOpen',
          href: '/inference-stack#api',
        },
      ],
    },
  ];

  const companyDropdown = [
    {
      title: 'Story',
      description: 'Our founding story, vision, and mission to change AI.',
      color: 'bg-brand-blue-1',
      cta: 'Read Our Story',
      ctaHref: '/our-story',
      subsections: [
        {
          label: 'Our Mission',
          desc: 'Building the future of sustainable AI computing.',
          icon: 'Globe',
          href: '/our-story#mission',
        },
        {
          label: 'The Team',
          desc: 'Meet the founders and leadership team.',
          icon: 'Users',
          href: '/our-story#team',
        },
        {
          label: 'Our Values',
          desc: 'Sustainability, innovation, and customer success.',
          icon: 'Shield',
          href: '/our-story#values',
        },
      ],
    },
    {
      title: 'Team',
      description: 'Meet the talented individuals building Tatari.',
      color: 'bg-brand-blue-1',
      cta: 'Meet the Team',
      ctaHref: '/team',
      subsections: [
        {
          label: 'Leadership',
          desc: 'Our executive team and board of directors.',
          icon: 'Users',
          href: '/team#leadership',
        },
        {
          label: 'Engineering',
          desc: 'The technical experts behind our platform.',
          icon: 'Cpu',
          href: '/team#engineering',
        },
        {
          label: 'Join Us',
          desc: 'Open positions and career opportunities.',
          icon: 'BookOpen',
          href: '/careers',
        },
      ],
    },
    {
      title: 'Careers',
      description: 'Join our fast-growing, mission-driven team.',
      color: 'bg-brand-blue-1',
      cta: 'View Openings',
      ctaHref: '/careers',
      subsections: [
        {
          label: 'Engineering Roles',
          desc: 'Software, infrastructure, and ML engineering positions.',
          icon: 'Cpu',
          href: '/careers#engineering',
        },
        {
          label: 'Sales & Marketing',
          desc: 'Help us grow and serve customers worldwide.',
          icon: 'Globe',
          href: '/careers#sales',
        },
        {
          label: 'Operations',
          desc: 'Support our global infrastructure and customers.',
          icon: 'Server',
          href: '/careers#operations',
        },
      ],
    },
    {
      title: 'Contact',
      description: 'Get in touch with our team for partnerships or support.',
      color: 'bg-brand-blue-1',
      cta: 'Contact Us',
      ctaHref: '/contact',
      subsections: [
        {
          label: 'Sales Inquiries',
          desc: 'Learn about our enterprise solutions and pricing.',
          icon: 'DollarSign',
          href: '/contact#sales',
        },
        {
          label: 'Support',
          desc: 'Technical support and documentation access.',
          icon: 'Shield',
          href: '/contact#support',
        },
        {
          label: 'Partnerships',
          desc: 'Strategic partnerships and integrations.',
          icon: 'Globe',
          href: '/contact#partnerships',
        },
      ],
    },
  ];

  const learnMoreDropdown = [
    {
      title: 'Blog',
      description: 'Insights, news, and updates from Tatari Systems.',
      color: 'bg-brand-blue-1',
      cta: 'Read Blog',
      ctaHref: '/blog',
      subsections: [
        {
          label: 'Technical Insights',
          desc: 'Deep dives into AI infrastructure and best practices.',
          icon: 'Cpu',
          href: '/blog#technical',
        },
        {
          label: 'Industry News',
          desc: 'Latest developments in AI and cloud computing.',
          icon: 'Globe',
          href: '/blog#news',
        },
        {
          label: 'Company Updates',
          desc: 'Product launches, team news, and milestones.',
          icon: 'BookOpen',
          href: '/blog#updates',
        },
      ],
    },
    {
      title: 'Press Releases',
      description: 'Official announcements and media coverage.',
      color: 'bg-brand-blue-1',
      cta: 'View Press',
      ctaHref: '/press-releases',
      subsections: [
        {
          label: 'Product Launches',
          desc: 'New features, products, and platform updates.',
          icon: 'Zap',
          href: '/press-releases#launches',
        },
        {
          label: 'Company News',
          desc: 'Funding, partnerships, and strategic announcements.',
          icon: 'Globe',
          href: '/press-releases#news',
        },
        {
          label: 'Media Coverage',
          desc: 'Press mentions, interviews, and thought leadership.',
          icon: 'BookOpen',
          href: '/press-releases#coverage',
        },
      ],
    },
    {
      title: 'Case Studies',
      description: 'See how customers use Tatari Systems in production.',
      color: 'bg-brand-blue-1',
      cta: 'Explore Cases',
      ctaHref: '/case-studies',
      subsections: [
        {
          label: 'AI Training',
          desc: 'Large-scale model training and fine-tuning success stories.',
          icon: 'Cpu',
          href: '/case-studies#training',
        },
        {
          label: 'Inference Deployments',
          desc: 'Production AI applications and API deployments.',
          icon: 'Server',
          href: '/case-studies#inference',
        },
        {
          label: 'Enterprise Solutions',
          desc: 'Custom infrastructure for Fortune 500 companies.',
          icon: 'Shield',
          href: '/case-studies#enterprise',
        },
      ],
    },
  ];

  const megaMenus = [
    {
      label: 'Products',
      mainTo: '#',
      content: (
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-black/85 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          {productDropdown.map((product) => (
            <div className="flex flex-col h-full min-w-0" key={product.title}>
              {/* Main Card */}
              <div className={`rounded-xl p-4 mb-3 ${product.color} flex flex-col justify-between min-w-0`}>
                <div>
                  <div className="text-white font-bold text-base mb-1">{product.title}</div>
                  <div className="text-white/80 mb-3 text-sm">{product.description}</div>
                </div>
                <div 
                  onClick={() => navigate(product.ctaHref)} 
                  className="inline-block mt-auto bg-white text-brand-blue-2 font-semibold px-3 py-2 rounded-lg hover:bg-primary-800 hover:text-white transition text-sm cursor-pointer"
                >
                  {product.cta} &rarr;
                </div>
              </div>
              {/* Subsections */}
              <div className="flex flex-col gap-2">
                {product.subsections.map((sub) => (
                  <a href={sub.href} className="flex items-start gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition min-w-0" key={sub.label}>
                    <img src={getIconSrc(sub.icon)} alt={sub.label} className="h-5 w-5 flex-shrink-0 object-contain" />
                    <div>
                      <div className="font-semibold text-white text-sm">{sub.label}</div>
                      <div className="text-xs text-white/70">{sub.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Company',
      mainTo: '/about',
      content: (
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-black/85 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          {companyDropdown.map((company) => (
            <div className="flex flex-col h-full min-w-0" key={company.title}>
              {/* Main Card */}
              <div className={`rounded-xl p-4 mb-3 ${company.color} flex flex-col justify-between min-w-0`}>
                <div>
                  <div className="text-white font-bold text-base mb-1">{company.title}</div>
                  <div className="text-white/80 mb-3 text-sm">{company.description}</div>
                </div>
                <div 
                  onClick={() => navigate(company.ctaHref)} 
                  className="inline-block mt-auto bg-white text-brand-blue-2 font-semibold px-3 py-2 rounded-lg hover:bg-primary-800 hover:text-white transition text-sm cursor-pointer"
                >
                  {company.cta} &rarr;
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Learn More',
      mainTo: '#',
      content: (
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-black/85 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          {learnMoreDropdown.map((learn) => (
            <div className="flex flex-col h-full min-w-0" key={learn.title}>
              {/* Main Card */}
              <div className={`rounded-xl p-4 mb-3 ${learn.color} flex flex-col justify-between min-w-0`}>
                <div>
                  <div className="text-white font-bold text-base mb-1">{learn.title}</div>
                  <div className="text-white/80 mb-3 text-sm">{learn.description}</div>
                </div>
                <div 
                  onClick={() => navigate(learn.ctaHref)} 
                  className="inline-block mt-auto bg-white text-brand-blue-2 font-semibold px-3 py-2 rounded-lg hover:bg-primary-800 hover:text-white transition text-sm cursor-pointer"
                >
                  {learn.cta} &rarr;
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative w-full glass-navbar">
          {/* Logo */}
          <div className="flex items-center h-full z-10">
            <Link
              to="/"
              style={{ textDecoration: 'none' }}
              className="no-underline hover:no-underline focus:outline-none flex items-center space-x-3 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.img
                src={getAssetPath('/assets/tatarilogo.png')}
                alt="Tatari Systems Logo"
                className="h-8 w-auto transition-all duration-300 group-hover:scale-105"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              />
              <span className="text-lg font-bold text-white tracking-tight">Tatari</span>
            </Link>
          </div>

          {/* Hamburger menu button (mobile only) */}
          <button
            className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X className="h-7 w-7 text-white" /> : <Menu className="h-7 w-7 text-white" />}
          </button>

          {/* Centered Dropdown Tabs (desktop only) */}
          <div className="flex-1 flex justify-center">
            <div className="hidden sm:flex items-center space-x-8">
              {megaMenus.map((dropdown) => (
                <div
                  key={dropdown.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(dropdown.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span
                    className={`text-base font-medium transition-colors duration-200 cursor-pointer ${
                      openDropdown === dropdown.label
                        ? 'text-primary-500 underline underline-offset-4'
                        : 'text-white/80 hover:text-primary-500'
                    }`}
                  >
                    {dropdown.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Us Button (desktop only) */}
          <div className="hidden sm:flex items-center ml-auto">
            <button
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition-all duration-200 text-base"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </button>
          </div>

          {/* Invisible right spacer to balance logo (desktop only) */}
          <div className="absolute right-0 top-0 h-full items-center hidden sm:flex" style={{ visibility: 'hidden' }}>
            <Link
              to="/"
              style={{ textDecoration: 'none' }}
              className="no-underline hover:no-underline focus:outline-none flex items-center space-x-3 group"
            >
              <motion.img
                src={getAssetPath('/assets/tatarilogo.png')}
                alt="Tatari Systems Logo"
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold">Tatari</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[60] bg-black !bg-opacity-100 flex flex-col sm:hidden" 
            style={{ backgroundColor: '#000000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <Link
                to="/"
                className="flex items-center space-x-3 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src={getAssetPath('/assets/tatarilogo.png')} alt="Tatari Systems Logo" className="h-8 w-auto" />
                <span className="text-lg font-bold text-white tracking-tight">Tatari</span>
              </Link>
              <button
                className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-7 w-7 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-2 px-6 py-6">
              {megaMenus.map((dropdown) => (
                <div key={dropdown.label} className="flex flex-col">
                  <span className="text-base font-semibold text-white/80 mt-4 mb-2">{dropdown.label}</span>
                  {/* Render dropdown content as flat links for mobile */}
                  {dropdown.label === 'Products' && productDropdown.map((item) => (
                    <button
                      key={item.title}
                      className="text-white/80 hover:text-primary-500 text-left py-2 pl-4"
                      onClick={() => { navigate(item.ctaHref); setMobileMenuOpen(false); }}
                    >
                      {item.title}
                    </button>
                  ))}
                  {dropdown.label === 'Company' && companyDropdown.map((item) => (
                    <button
                      key={item.title}
                      className="text-white/80 hover:text-primary-500 text-left py-2 pl-4"
                      onClick={() => { navigate(item.ctaHref); setMobileMenuOpen(false); }}
                    >
                      {item.title}
                    </button>
                  ))}
                  {dropdown.label === 'Learn More' && learnMoreDropdown.map((item) => (
                    <button
                      key={item.title}
                      className="text-white/80 hover:text-primary-500 text-left py-2 pl-4"
                      onClick={() => { navigate(item.ctaHref); setMobileMenuOpen(false); }}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              ))}
              {/* Contact Us Button (mobile only) */}
              <button
                className="mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-200 text-base"
                onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }}
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdowns (desktop only) */}
      {megaMenus.map((dropdown) => (
        <motion.div
          key={dropdown.label}
          initial={{ opacity: 0, y: -16, scale: 0.98 }}
          animate={{
            opacity: openDropdown === dropdown.label ? 1 : 0,
            y: openDropdown === dropdown.label ? 0 : -16,
            scale: openDropdown === dropdown.label ? 1 : 0.98,
          }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.22, type: 'spring', stiffness: 260, damping: 22 }}
          className={`fixed top-20 left-0 right-0 justify-center z-50 hidden sm:flex ${
            openDropdown === dropdown.label ? '' : 'pointer-events-none hidden'
          }`}
          onMouseEnter={() => handleMouseEnter(dropdown.label)}
          onMouseLeave={handleMouseLeave}
        >
          {openDropdown === dropdown.label && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18 }}
              className="navbar-dropdown [&_a]:!no-underline [&_a:hover]:!no-underline [&_a:focus]:!no-underline [&_a:visited]:!no-underline [&_a:active]:!no-underline [&_*]:!no-underline"
            >
              {dropdown.content}
            </motion.div>
          )}
        </motion.div>
      ))}
    </nav>
  )
}

export default Navbar
