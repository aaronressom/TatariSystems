import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { getAssetPath } from '../utils/paths'

const Research = () => {
  const paperPath = getAssetPath('research/Tatari Systems Annual Report 2025-compressed.pdf')
  const paperUrl = encodeURI(paperPath)

  return (
    <div className="min-h-screen bg-black pt-navbar">
      <Navbar />
      <section className="relative min-h-screen z-10 overflow-hidden pt-16 pb-16">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight text-center"
          >
            Research
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-base md:text-lg max-w-3xl mx-auto text-center mb-8"
          >
            Explore our latest publications directly on here. You can also open the full reports and publications in a new tab or download it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-3 sm:p-4 lg:p-5 shadow-2xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
              <h2 className="text-white text-base md:text-lg font-semibold">
                Tatari Systems Annual Report 2025
              </h2>
              <div className="flex items-center gap-2">
                <a
                  href={paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-white text-black text-sm hover:bg-white/90 transition-colors"
                >
                  Open in new tab
                </a>
                <a
                  href={paperUrl}
                  download
                  className="px-3 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  Download PDF
                </a>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <iframe
                title="Tatari Systems Annual Report 2025 PDF"
                src={`${paperUrl}#view=FitH`}
                className="w-full h-[70vh] min-h-[500px]"
              />

              <noscript>
                <div className="p-4 text-white/80 text-sm">
                  PDF preview requires JavaScript.
                  {' '}
                  <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="underline text-white">
                    Open the report here.
                  </a>
                </div>
              </noscript>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  )
}

export default Research


