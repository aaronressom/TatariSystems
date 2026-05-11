import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { Zap, Globe, Cpu, ArrowRight } from 'lucide-react'
import OrbBackground from '../components/OrbBackground'
import FilmGrain from '../components/FilmGrain'
import SectionLabel from '../components/SectionLabel'
import useInView from '../hooks/useInView'

const Home = () => {
  const navigate = useNavigate()

  const [heroRef, heroVisible]   = useInView<HTMLDivElement>(0.08)
  const [statsRef, statsVisible] = useInView<HTMLDivElement>(0.08)
  const [gpuRef, gpuVisible]     = useInView<HTMLDivElement>(0.08)
  const [ctaRef, ctaVisible]     = useInView<HTMLDivElement>(0.08)

  const [heroActiveRef, heroActive]       = useInView<HTMLDivElement>(0.5,  false, '-20% 0px -45% 0px')
  const [statsActiveRef, statsActive]     = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [metricsActiveRef, metricsActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [ctaActiveRef, ctaActive]         = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')

  const tatariEdgeStats = useMemo(() => [
    { number: '$0.02–0.04/kWh', label: 'Ethiopia Power Cost',      Icon: Zap   },
    { number: '4+ Countries',   label: 'Active Target Markets',    Icon: Globe },
    { number: 'Phase 1 Live',   label: 'Mining Operations Active', Icon: Cpu   },
  ], [])

  const homepageMetrics = useMemo(() => [
    { value: '144',        label: 'ASICs Operational',          featured: true  },
    { value: '1+ BTC',     label: 'Mined to Date',             featured: true  },
    { value: '99%+',       label: 'Mining Uptime',             featured: false },
    { value: '5 MW',       label: 'Power Under Contract',      featured: false },
    { value: '4+',         label: 'Target Markets',            featured: false },
    { value: '~70%',       label: 'Cost Advantage vs. US',     featured: false },
    { value: '$0.02–0.04', label: 'Cost per kWh (Ethiopia)',   featured: false },
    { value: '2024',       label: 'Year Operations Began',     featured: false },
  ], [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--inst-bg)', color: 'var(--inst-text)' }}>
      <Navbar />
      <OrbBackground />
      <FilmGrain />

      <main style={{ position: 'relative', zIndex: 2, paddingTop: 88 }}>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '56px 24px 52px',
          }}
        >
          <div
            ref={heroActiveRef}
            style={{
              width: '100%',
              maxWidth: 1040,
              textAlign: 'center',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'all 0.9s var(--inst-ease-out-expo)',
            }}
          >
            {/* Live status badge */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '5px 14px',
                borderRadius: 99,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                fontFamily: 'var(--inst-font-sans)',
                fontSize: 11,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: '#4ade80',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                Phase 1 Active — Bitcoin Mining
              </div>
            </div>

            <SectionLabel number="00" title="Tatari Systems" />

            <h1
              style={{
                margin: '16px 0 0',
                fontFamily: 'var(--inst-font-serif)',
                fontSize: 'clamp(42px, 7vw, 96px)',
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: heroActive ? '#fff' : 'var(--inst-text-70)',
                transition: 'color 0.4s ease-in-out',
              }}
            >
              Where Energy Meets
              <br />
              Opportunity
            </h1>

            <p
              style={{
                maxWidth: 620,
                margin: '22px auto 0',
                fontFamily: 'var(--inst-font-sans)',
                fontSize: 15,
                fontWeight: 300,
                color: heroActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)',
                lineHeight: 1.85,
                transition: 'color 0.4s ease-in-out',
              }}
            >
              Tatari is a Bitcoin mining and compute infrastructure company operating in emerging
              markets. We find stranded renewable energy, put it to work today, and build the
              infrastructure that comes next.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 32 }}>
              <motion.button
                onClick={() => navigate('/compute')}
                whileHover={{ background: 'rgba(255,255,255,0.13)', borderColor: 'rgba(255,255,255,0.22)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  padding: '11px 22px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: 'var(--inst-font-sans)',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  cursor: 'pointer',
                }}
              >
                Our Roadmap <ArrowRight size={13} />
              </motion.button>

              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.14)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--inst-text-60)',
                  padding: '11px 22px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: 'var(--inst-font-sans)',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  cursor: 'pointer',
                }}
              >
                Talk to Us
              </motion.button>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div style={{ maxWidth: 1120, margin: '0 auto 0', height: 1, background: 'rgba(255,255,255,0.04)' }} />

        {/* ── HOW WE BUILD ──────────────────────────────────────── */}
        <section
          ref={statsRef}
          style={{
            padding: '72px 24px 80px',
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'all 0.7s var(--inst-ease-out-expo)',
          }}
        >
          <div ref={statsActiveRef} style={{ maxWidth: 1120, margin: '0 auto' }}>
            <SectionLabel number="01" title="How We Build" active={statsActive} />

            {/* Two-column: editorial text left, stat cards right */}
            <div className="home-how-build">
              <div>
                <p style={{
                  margin: 0,
                  color: statsActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)',
                  fontFamily: 'var(--inst-font-sans)',
                  fontSize: 15,
                  fontWeight: 300,
                  lineHeight: 1.85,
                  transition: 'color 0.4s ease-in-out',
                }}>
                  We don't start with a pitch deck. We start with a power contract.
                </p>
                <p style={{
                  marginTop: 20,
                  color: statsActive ? 'var(--inst-text-60)' : 'var(--inst-text-40)',
                  fontFamily: 'var(--inst-font-sans)',
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.85,
                  transition: 'color 0.4s ease-in-out',
                }}>
                  Every market we enter follows the same playbook: identify stranded or underpriced
                  renewable energy, validate the economics with Bitcoin mining, then build the compute
                  infrastructure that region needs next.
                </p>
                <p style={{
                  marginTop: 20,
                  color: statsActive ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.28)',
                  fontFamily: 'var(--inst-font-sans)',
                  fontSize: 13,
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                  transition: 'color 0.4s ease-in-out',
                }}>
                  This is how Tatari works — prove it cheap, then scale it sovereign.
                </p>
              </div>

              {/* Stat cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {tatariEdgeStats.map((stat, idx) => (
                  <motion.article
                    key={stat.label}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{
                      borderColor: 'rgba(255,255,255,0.13)',
                      background: 'rgba(255,255,255,0.04)',
                      y: -1,
                    }}
                    style={{
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: 12,
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      cursor: 'default',
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <stat.Icon size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--inst-font-serif)',
                        fontSize: 22,
                        lineHeight: 1.1,
                        color: statsActive ? '#fff' : 'var(--inst-text-70)',
                        transition: 'color 0.4s ease-in-out',
                      }}>
                        {stat.number}
                      </div>
                      <div style={{
                        fontFamily: 'var(--inst-font-sans)',
                        fontSize: 10,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: statsActive ? 'var(--inst-text-45)' : 'var(--inst-text-30)',
                        transition: 'color 0.4s ease-in-out',
                        marginTop: 4,
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div style={{ maxWidth: 1120, margin: '0 auto', height: 1, background: 'rgba(255,255,255,0.04)' }} />

        {/* ── OPERATIONAL METRICS — BENTO GRID ──────────────────── */}
        <section
          ref={gpuRef}
          style={{
            padding: '72px 24px 80px',
            opacity: gpuVisible ? 1 : 0,
            transform: gpuVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'all 0.7s var(--inst-ease-out-expo)',
          }}
        >
          <div ref={metricsActiveRef} style={{ maxWidth: 1120, margin: '0 auto' }}>
            <SectionLabel number="02" title="Operational Metrics" active={metricsActive} />

            <div className="home-bento-grid">
              {homepageMetrics.map((metric, idx) => (
                <motion.article
                  key={metric.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{
                    borderColor: metric.featured ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.1)',
                    background: metric.featured ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.035)',
                    y: -2,
                  }}
                  style={{
                    gridColumn: metric.featured ? 'span 2' : 'span 1',
                    border: `1px solid ${metric.featured ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.055)'}`,
                    background: metric.featured ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.015)',
                    borderRadius: 14,
                    padding: metric.featured ? '28px 28px 26px' : '20px 20px 18px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top accent line on featured cards */}
                  {metric.featured && (
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      height: 1,
                      background: 'rgba(255,255,255,0.1)',
                    }} />
                  )}
                  <div style={{
                    fontFamily: 'var(--inst-font-serif)',
                    fontWeight: 400,
                    fontSize: metric.featured ? 46 : 28,
                    lineHeight: 1,
                    color: metricsActive ? '#fff' : 'var(--inst-text-70)',
                    transition: 'color 0.4s ease-in-out',
                  }}>
                    {metric.value}
                  </div>
                  <p style={{
                    margin: `${metric.featured ? 12 : 8}px 0 0`,
                    fontFamily: 'var(--inst-font-sans)',
                    fontSize: metric.featured ? 13 : 11,
                    fontWeight: 300,
                    lineHeight: 1.5,
                    letterSpacing: metric.featured ? '0.01em' : '0.05em',
                    textTransform: metric.featured ? 'none' : 'uppercase',
                    color: metricsActive ? 'var(--inst-text-55)' : 'var(--inst-text-35)',
                    transition: 'color 0.4s ease-in-out',
                  }}>
                    {metric.label}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div style={{ maxWidth: 1120, margin: '0 auto', height: 1, background: 'rgba(255,255,255,0.04)' }} />

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section
          ref={ctaRef}
          style={{
            padding: '72px 24px 104px',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'all 0.7s var(--inst-ease-out-expo)',
          }}
        >
          <div
            ref={ctaActiveRef}
            style={{
              maxWidth: 960,
              margin: '0 auto',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: 20,
              padding: '52px 48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Gradient top accent */}
            <div style={{
              position: 'absolute',
              top: 0, left: '15%', right: '15%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)',
            }} />

            <SectionLabel number="03" title="Build with Tatari" className="justify-center" active={ctaActive} />
            <h2 style={{
              margin: '20px 0 12px',
              fontFamily: 'var(--inst-font-serif)',
              fontWeight: 400,
              fontSize: 'clamp(30px, 4vw, 52px)',
              letterSpacing: '-0.02em',
              color: ctaActive ? '#fff' : 'var(--inst-text-70)',
              transition: 'color 0.4s ease-in-out',
            }}>
              Sovereign Compute, Ground Up
            </h2>
            <p style={{
              margin: '0 auto',
              maxWidth: 520,
              color: ctaActive ? 'var(--inst-text-60)' : 'var(--inst-text-40)',
              fontSize: 14,
              fontFamily: 'var(--inst-font-sans)',
              fontWeight: 300,
              lineHeight: 1.85,
              transition: 'color 0.4s ease-in-out',
            }}>
              See how we move from energy contracts to owned data center infrastructure in emerging markets.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 26 }}>
              <motion.button
                onClick={() => navigate('/compute')}
                whileHover={{ background: 'rgba(235,235,235,1)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: 8,
                  padding: '11px 22px',
                  fontSize: 13,
                  fontFamily: 'var(--inst-font-sans)',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  cursor: 'pointer',
                }}
              >
                View Our Roadmap <ArrowRight size={13} />
              </motion.button>

              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.16)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--inst-text-60)',
                  padding: '11px 22px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: 'var(--inst-font-sans)',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  cursor: 'pointer',
                }}
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default React.memo(Home)
