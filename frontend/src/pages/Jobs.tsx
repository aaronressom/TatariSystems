import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

type JobPosting = {
  id: string
  title: string
  summary: string
  applyUrl: string
}

const fadeInProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, amount: 0.2 },
} as const

const JOBS: JobPosting[] = [
  {
    id: 'ai-infra-research-intern-spring-2026',
    title: 'AI Infrastructure Research Intern (Spring 2026)',
    summary: 'Data centers + AI-ready systems.',
    applyUrl: 'https://form.typeform.com/to/ZrvyOmqx',
  },
  {
    id: 'project-finance-intern-spring-2026',
    title: 'Project Finance Intern (Spring 2026)',
    summary: 'Models, capex/opex, investor materials.',
    applyUrl: 'https://form.typeform.com/to/Y4G6JZjH'
,
  },
  {
    id: 'product-strategy-intern-spring-2026',
    title: 'Product & Strategy Intern (Spring 2026)',
    summary: 'Market research + GTM deliverables.',
    applyUrl: 'https://form.typeform.com/to/qsQGZSff?typeform-source=lnkd.in',
  },
  {
    id: 'marketing-intern-spring-2026',
    title: 'Marketing Intern (Spring 2026)',
    summary: 'Content, storytelling, distribution.',
    applyUrl: 'https://form.typeform.com/to/Tl09hLPM?typeform-source=lnkd.in',
  },
]

const Jobs = () => {
  return (
    <div className="min-h-screen bg-black pt-navbar">
      <Navbar />

      <section className="relative pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInProps}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Join Us
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mb-10">
              Tatari Systems is recruiting 4 Spring 2026 internships. Apply using the Typeform links below.
            </p>
          </motion.div>

          <motion.div {...fadeInProps} className="grid grid-cols-1 gap-4">
            {JOBS.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-white font-bold text-xl mb-1">{job.title}</div>
                    <div className="text-gray-300 text-sm">Spring 2026 • Internship</div>
                  </div>

                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold px-5 py-2 rounded-xl shadow-lg transition-all duration-200 whitespace-nowrap"
                  >
                    Apply
                  </a>
                </div>

                <div className="mt-4 text-gray-300">{job.summary}</div>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeInProps} className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-white font-bold text-lg mb-2">Questions?</div>
            <div className="text-gray-300">
              If you run into issues with an application link, reach out at <span className="text-white font-semibold">careers@tatarisystems.com</span>.
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Jobs
