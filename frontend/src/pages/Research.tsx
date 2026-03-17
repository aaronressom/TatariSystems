import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { getAssetPath } from '../utils/paths'

const papers = [
  {
    id: 'us-iran-war-impact',
    title: 'US-Iran War Impact',
    fileName: 'US-Iran War Impact.pdf',
  },
  {
    id: 'annual-report-2025',
    title: 'Tatari Systems Annual Report 2025',
    fileName: 'Tatari Systems Annual Report 2025-compressed.pdf',
  },
]

const Research = () => {
  const [selectedPaperId, setSelectedPaperId] = useState(papers[0].id)

  const selectedPaper = useMemo(
    () => papers.find((paper) => paper.id === selectedPaperId) || papers[0],
    [selectedPaperId],
  )

  const paperPath = getAssetPath(`research/${selectedPaper.fileName}`)
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
            Explore our latest publications directly on here. Select a paper below to preview, then open in a new tab or download it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-3 sm:p-4 lg:p-5 shadow-2xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
              <div className="flex items-center gap-3">
                <h2 className="text-white text-base md:text-lg font-semibold">{selectedPaper.title}</h2>
                <span className="text-xs text-white/60 bg-white/10 border border-white/10 px-2 py-1 rounded-md">
                  {papers.length} papers
                </span>
              </div>

              <div className="w-full order-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {papers.map((paper) => {
                    const isActive = paper.id === selectedPaperId
                    return (
                      <button
                        key={paper.id}
                        type="button"
                        onClick={() => setSelectedPaperId(paper.id)}
                        className={`w-full text-left rounded-lg border px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? 'border-primary-400 bg-primary-500/15 text-white'
                            : 'border-white/15 bg-black/40 text-white/80 hover:border-white/30 hover:bg-white/5'
                        }`}
                      >
                        {paper.title}
                      </button>
                    )
                  })}
                </div>
              </div>

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
                title={`${selectedPaper.title} PDF`}
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


