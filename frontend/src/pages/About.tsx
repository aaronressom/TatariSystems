import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { getAssetPath } from '../utils/paths'
import OrbBackground from '../components/OrbBackground'
import FilmGrain from '../components/FilmGrain'
import SectionLabel from '../components/SectionLabel'
import useInView from '../hooks/useInView'

const team = [
  { name: 'Yasha Genkin', role: 'Chief Executive Officer, Co-Founder', img: 'genkin.jpg' },
  { name: 'Amen Amare', role: 'Chief Operating Officer, Co-Founder', img: 'amare.jpg' },
  { name: 'Meba Michael', role: 'Chief Financial Officer, Co-Founder', img: 'michael.jpg' },
  { name: 'Glodi Karagi', role: 'Chief of Business Development', img: 'karagi.jpg' },
  { name: 'Nathan Banketa', role: 'Chief Research Officer', img: 'banketa.jpg' },
  { name: 'Aarash Iqbal', role: 'Chief Product Officer', img: 'iqbal.png' },
]

const teamTopRow = team.slice(0, 4)
const teamBottomRow = team.slice(4)

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('')
}

const About = () => {
  const [storyRef, storyVisible] = useInView<HTMLDivElement>(0.08)
  const [valuesRef, valuesVisible] = useInView<HTMLDivElement>(0.08)
  const [teamRef, teamVisible] = useInView<HTMLDivElement>(0.08)
  const [ctaRef, ctaVisible] = useInView<HTMLDivElement>(0.08)

  const [storyActiveRef, storyActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [valuesActiveRef, valuesActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [teamActiveRef, teamActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [ctaActiveRef, ctaActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--inst-bg)', color: 'var(--inst-text)' }}>
      <Navbar />
      <OrbBackground />
      <FilmGrain />

      <div style={{ position: 'relative', zIndex: 2, padding: '112px 24px 80px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          {/* Our Story */}
          <motion.section
            ref={storyRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: storyVisible ? 1 : 0, y: storyVisible ? 0 : 30 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: 52 }}
          >
            <div ref={storyActiveRef}>
              <SectionLabel number="01" title="Our Story" active={storyActive} />
              <h1 style={{ margin: '16px 0 12px', fontFamily: 'var(--inst-font-serif)', fontWeight: 400, fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '-0.03em', color: storyActive ? '#fff' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>
                Building the infrastructure layer emerging markets never had.
              </h1>
              <p style={{ margin: 0, fontSize: 14, color: storyActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)', lineHeight: 1.8, maxWidth: 760, transition: 'color 0.4s ease-in-out' }}>
                Tatari was founded on a simple observation: the world's cheapest and most abundant renewable energy is concentrated in places with the least compute infrastructure. We started in Ethiopia — not because it was easy, but because it was right. Our first operation runs on hydroelectric power at a fraction of what data centers pay in the United States. That cost advantage is the thesis. Bitcoin mining is how we prove it. Compute infrastructure is where it leads.
              </p>
            </div>
          </motion.section>

          {/* Meet the Team */}
          <motion.section
            ref={teamRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: teamVisible ? 1 : 0, y: teamVisible ? 0 : 30 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ marginBottom: 52 }}
          >
            <div ref={teamActiveRef}>
              <SectionLabel number="03" title="Team" active={teamActive} />
              <p style={{ color: teamActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)', marginTop: 16, marginBottom: 24, maxWidth: 860, fontSize: 14, lineHeight: 1.75, transition: 'color 0.4s ease-in-out' }}>
                Tatari is built by a team passionate about emerging market development and the role infrastructure plays in economic growth. We come from strong academic and professional backgrounds, with experience and incoming roles spanning finance, technology, and global markets. We're not career insiders — we're the generation building the systems the next era will run on.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {teamTopRow.map((member, idx) => (
                <motion.div
                  key={member.name}

                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  viewport={{ once: true }}
                  style={{
                    background: 'var(--inst-surface-2)',
                    border: '1px solid var(--inst-border-6)',
                    borderRadius: 14,
                    padding: 22,
                    textAlign: 'center',
                  }}
                >

                  {member.img ? (
                    <img
                      src={getAssetPath(`/headshots/${member.img}`)}
                      alt={member.name}
                      className="w-28 h-28 rounded-full object-cover mb-4"
                      style={{ display: 'block', margin: '0 auto 16px' }}

                      onError={e => {
                        const target = e.target as HTMLImageElement;

                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=5D90DC&color=fff&size=160`;
                      }}
                    />
                  ) : (
                    <div style={{ width: 112, height: 112, borderRadius: 9999, background: 'var(--inst-surface-8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--inst-font-serif)', fontSize: 34, margin: '0 auto 16px', color: 'var(--inst-text-70)' }}>
                      {getInitials(member.name)}
                    </div>
                  )}
                  <div style={{ fontFamily: 'var(--inst-font-serif)', fontSize: 24, color: 'var(--inst-text-90)', marginBottom: 8 }}>{member.name}</div>
                  <div style={{ color: 'var(--inst-text-35)', fontSize: 13 }}>{member.role}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-5">
              {teamBottomRow.map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (idx + 4) * 0.07 }}
                  viewport={{ once: true }}
                  style={{
                    background: 'var(--inst-surface-2)',
                    border: '1px solid var(--inst-border-6)',
                    borderRadius: 14,
                    padding: 22,
                    textAlign: 'center',
                    flex: '1 1 260px',
                    maxWidth: 300,
                  }}
                >
                  {member.img ? (
                    <img
                      src={getAssetPath(`/headshots/${member.img}`)}
                      alt={member.name}
                      className="w-28 h-28 rounded-full object-cover mb-4"
                      style={{ display: 'block', margin: '0 auto 16px' }}
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=5D90DC&color=fff&size=160`;
                      }}
                    />
                  ) : (
                    <div style={{ width: 112, height: 112, borderRadius: 9999, background: 'var(--inst-surface-8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--inst-font-serif)', fontSize: 34, margin: '0 auto 16px', color: 'var(--inst-text-70)' }}>
                      {getInitials(member.name)}
                    </div>
                  )}
                  <div style={{ fontFamily: 'var(--inst-font-serif)', fontSize: 24, color: 'var(--inst-text-90)', marginBottom: 8 }}>{member.name}</div>
                  <div style={{ color: 'var(--inst-text-35)', fontSize: 13 }}>{member.role}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Our Values */}
          <motion.section
            ref={valuesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: valuesVisible ? 1 : 0, y: valuesVisible ? 0 : 30 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            style={{ marginBottom: 52 }}
          >
            <div ref={valuesActiveRef}>
              <SectionLabel number="02" title="Our Values" active={valuesActive} />
              <ul style={{ marginTop: 16, display: 'grid', gap: 10, maxWidth: 860, padding: 0, listStyle: 'none' }}>
                <li>
                  <span style={{ fontWeight: 500, color: valuesActive ? '#fff' : 'var(--inst-text-60)', transition: 'color 0.4s ease-in-out' }}>Sovereignty:</span>
                  {' '}
                  <span style={{ color: valuesActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)', transition: 'color 0.4s ease-in-out' }}>We build in markets that need infrastructure on their own terms — not dependent on hyperscalers or foreign platforms.</span>
                </li>
                <li>
                  <span style={{ fontWeight: 500, color: valuesActive ? '#fff' : 'var(--inst-text-60)', transition: 'color 0.4s ease-in-out' }}>Transparency:</span>
                  {' '}
                  <span style={{ color: valuesActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)', transition: 'color 0.4s ease-in-out' }}>We say what we're doing and what we're not yet doing. Our roadmap is honest about where we are.</span>
                </li>
                <li>
                  <span style={{ fontWeight: 500, color: valuesActive ? '#fff' : 'var(--inst-text-60)', transition: 'color 0.4s ease-in-out' }}>Energy First:</span>
                  {' '}
                  <span style={{ color: valuesActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)', transition: 'color 0.4s ease-in-out' }}>Every location decision starts with power cost. Cheap, clean energy is the foundation everything else is built on.</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Contact / CTA */}
          <motion.section
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: ctaVisible ? 1 : 0, y: ctaVisible ? 0 : 30 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{
              border: '1px solid var(--inst-border-8)',
              borderRadius: 14,
              padding: 22,
              background: 'var(--inst-surface-2)',
              textAlign: 'center',
            }}
          >
            <div ref={ctaActiveRef}>
              <SectionLabel number="04" title="Contact" className="justify-center" active={ctaActive} />
              <h3 style={{ margin: '12px 0 6px', fontFamily: 'var(--inst-font-serif)', fontWeight: 400, fontSize: 36, color: ctaActive ? '#fff' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>Work With Us</h3>
              <p style={{ margin: 0, color: ctaActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)', transition: 'color 0.4s ease-in-out' }}>Whether you're an energy partner, a prospective team member, or an investor — we want to hear from you.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 16 }}>
              <a href="mailto:support@tatari.ai" style={{ textDecoration: 'none', color: '#fff', border: '1px solid var(--inst-border-12)', borderRadius: 8, padding: '10px 16px', background: 'var(--inst-surface-8)' }}>Contact Us</a>
            </div>
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 14 }}>
              <a href="https://twitter.com/tatarisystems" target="_blank" rel="noopener noreferrer" style={{ color: ctaActive ? 'var(--inst-text-60)' : 'var(--inst-text-40)', transition: 'color 0.4s ease-in-out' }}>Twitter</a>
              <a href="https://linkedin.com/company/tatari" target="_blank" rel="noopener noreferrer" style={{ color: ctaActive ? 'var(--inst-text-60)' : 'var(--inst-text-40)', transition: 'color 0.4s ease-in-out' }}>LinkedIn</a>
              <a href="https://github.com/tatari" target="_blank" rel="noopener noreferrer" style={{ color: ctaActive ? 'var(--inst-text-60)' : 'var(--inst-text-40)', transition: 'color 0.4s ease-in-out' }}>GitHub</a>
            </div>
          </motion.section>
        </div>

      </div>
    </div>
  )
}

export default About