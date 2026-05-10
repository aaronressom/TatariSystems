import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock3, Headphones, Mic2, Plus, Radio, Upload, UserRound, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import OrbBackground from '../components/OrbBackground'
import FilmGrain from '../components/FilmGrain'
import SectionLabel from '../components/SectionLabel'
import useInView from '../hooks/useInView'

interface PodcastEpisode {
  id: string
  title: string
  description: string
  audioUrl: string
  spotifyEmbedUrl?: string
  externalUrl?: string
  coverImageUrl?: string
  duration?: string
  guest?: string
  publishedAt: string
}

const firstSpotifyEpisode: PodcastEpisode = {
  id: 'spotify-2q9g4GWlX4clqM2cgKnCWY',
  title: 'Episode 1',
  description: 'Check out our first episode with Kevin Powers.',
  audioUrl: '',
  spotifyEmbedUrl: 'https://open.spotify.com/embed/episode/2q9g4GWlX4clqM2cgKnCWY?utm_source=generator',
  externalUrl: 'https://open.spotify.com/episode/2q9g4GWlX4clqM2cgKnCWY?si=l3Cb9am1QYy0DW0_gF_scg',
  publishedAt: new Date().toISOString(),
}

const secondSpotifyEpisode: PodcastEpisode = {
  id: 'spotify-3BLtDsxCvPMTUIWaiywwyy',
  title: 'Episode 2',
  description: 'Check out our second episode with Lawrence Lessig .',
  audioUrl: '',
  spotifyEmbedUrl: 'https://open.spotify.com/embed/episode/3BLtDsxCvPMTUIWaiywwyy?utm_source=generator',
  externalUrl: 'https://open.spotify.com/episode/3BLtDsxCvPMTUIWaiywwyy',
  publishedAt: new Date().toISOString(),
}

const thirdSpotifyEpisode: PodcastEpisode = {
  id: 'spotify-258oApUxjls6TtrSyeCZdv',
  title: 'Episode 3',
  description: 'Check out episode 3 with Philip Larrey.',
  audioUrl: '',
  spotifyEmbedUrl: 'https://open.spotify.com/embed/episode/258oApUxjls6TtrSyeCZdv?utm_source=generator',
  externalUrl: 'https://open.spotify.com/episode/258oApUxjls6TtrSyeCZdv',
  publishedAt: new Date().toISOString(),
}

const staticSpotifyEpisodes: PodcastEpisode[] = [
  thirdSpotifyEpisode,
  secondSpotifyEpisode,
  firstSpotifyEpisode,
]

const getApiBaseUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://tatari-backend.onrender.com'
}

const Podcast = () => {
  const [heroActiveRef, heroActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [contentActiveRef, contentActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')

  const [episodes, setEpisodes] = useState<PodcastEpisode[]>(staticSpotifyEpisodes)
  const [featuredEpisodeId, setFeaturedEpisodeId] = useState<string>(staticSpotifyEpisodes[0].id)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [newEpisode, setNewEpisode] = useState({
    title: '',
    description: '',
    guest: '',
    duration: '',
    audioFile: null as File | null,
    coverImageFile: null as File | null,
  })

  const featuredEpisode = useMemo(
    () => episodes.find((episode) => episode.id === featuredEpisodeId) || episodes[0],
    [episodes, featuredEpisodeId],
  )

  useEffect(() => {
    const token = localStorage.getItem('employee_token')
    const email = localStorage.getItem('employee_email')
    setIsLoggedIn(!!(token && email))
  }, [])

  useEffect(() => {
    loadEpisodes()
  }, [])

  const loadEpisodes = async () => {
    const apiBaseUrl = getApiBaseUrl()

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/podcasts/episodes`)
      if (!response.ok) {
        setStatusMessage('Podcast API is not live yet. Add episodes with the admin uploader to preview audio on site.')
        return
      }

      const data = await response.json()
      const mappedEpisodes: PodcastEpisode[] = (Array.isArray(data) ? data : []).map((episode: any) => ({
        id: (() => {
          const mappedSpotifyEmbed = episode.spotifyEmbedUrl || episode.spotify_embed_url || ''
          const mappedExternalUrl = episode.externalUrl || episode.external_url || ''
          const mappedTitle = episode.title || ''
          const isFirstSpotifyEpisode =
            mappedSpotifyEmbed.includes('2q9g4GWlX4clqM2cgKnCWY') ||
            mappedExternalUrl.includes('2q9g4GWlX4clqM2cgKnCWY') ||
            mappedTitle === firstSpotifyEpisode.title

          return isFirstSpotifyEpisode ? firstSpotifyEpisode.id : String(episode.id)
        })(),
        title: episode.title || 'Untitled Episode',
        description: (() => {
          const mappedSpotifyEmbed = episode.spotifyEmbedUrl || episode.spotify_embed_url || ''
          const mappedExternalUrl = episode.externalUrl || episode.external_url || ''
          const mappedTitle = episode.title || ''
          const isFirstSpotifyEpisode =
            mappedSpotifyEmbed.includes('2q9g4GWlX4clqM2cgKnCWY') ||
            mappedExternalUrl.includes('2q9g4GWlX4clqM2cgKnCWY') ||
            mappedTitle === firstSpotifyEpisode.title

          return isFirstSpotifyEpisode
            ? firstSpotifyEpisode.description
            : (episode.description || 'No episode description provided yet.')
        })(),
        audioUrl: episode.audioUrl || episode.audio_url || '',
        spotifyEmbedUrl: (() => {
          const mappedSpotifyEmbed = episode.spotifyEmbedUrl || episode.spotify_embed_url || ''
          const mappedExternalUrl = episode.externalUrl || episode.external_url || ''
          const mappedTitle = episode.title || ''
          const isFirstSpotifyEpisode =
            mappedSpotifyEmbed.includes('2q9g4GWlX4clqM2cgKnCWY') ||
            mappedExternalUrl.includes('2q9g4GWlX4clqM2cgKnCWY') ||
            mappedTitle === firstSpotifyEpisode.title

          return isFirstSpotifyEpisode ? firstSpotifyEpisode.spotifyEmbedUrl : mappedSpotifyEmbed
        })(),
        externalUrl: (() => {
          const mappedSpotifyEmbed = episode.spotifyEmbedUrl || episode.spotify_embed_url || ''
          const mappedExternalUrl = episode.externalUrl || episode.external_url || ''
          const mappedTitle = episode.title || ''
          const isFirstSpotifyEpisode =
            mappedSpotifyEmbed.includes('2q9g4GWlX4clqM2cgKnCWY') ||
            mappedExternalUrl.includes('2q9g4GWlX4clqM2cgKnCWY') ||
            mappedTitle === firstSpotifyEpisode.title

          return isFirstSpotifyEpisode ? firstSpotifyEpisode.externalUrl : mappedExternalUrl
        })(),
        coverImageUrl: episode.coverImageUrl || episode.cover_image_url || '',
        duration: episode.duration || '',
        guest: episode.guest || '',
        publishedAt: episode.publishedAt || episode.published_at || new Date().toISOString(),
      })).filter((episode) => episode.audioUrl || episode.spotifyEmbedUrl)

      const staticSpotifyIds = new Set(staticSpotifyEpisodes.map((episode) => episode.id))
      const staticSpotifyEpisodeKeys = [
        '2q9g4GWlX4clqM2cgKnCWY',
        '3BLtDsxCvPMTUIWaiywwyy',
        '258oApUxjls6TtrSyeCZdv',
      ]

      const mergedEpisodes = [
        ...staticSpotifyEpisodes,
        ...mappedEpisodes.filter((episode) => {
          if (staticSpotifyIds.has(episode.id)) {
            return false
          }

          const embed = episode.spotifyEmbedUrl || ''
          const external = episode.externalUrl || ''
          return !staticSpotifyEpisodeKeys.some((key) => embed.includes(key) || external.includes(key))
        }),
      ]

      setEpisodes(mergedEpisodes)
      if (mergedEpisodes[0]) {
        setFeaturedEpisodeId(mergedEpisodes[0].id)
      }
      setStatusMessage(mergedEpisodes.length === 0 ? 'No episodes published yet.' : '')
    } catch (error) {
      console.error('Error loading podcast episodes:', error)
      setStatusMessage('No episodes available yet')
    }
  }

  const handleUploadEpisode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newEpisode.audioFile) {
      setStatusMessage('Please upload an audio file to publish an episode.')
      return
    }

    setIsUploading(true)
    const apiBaseUrl = getApiBaseUrl()
    const token = localStorage.getItem('employee_token')

    try {
      const formData = new FormData()
      formData.append('title', newEpisode.title)
      formData.append('description', newEpisode.description)
      formData.append('guest', newEpisode.guest)
      formData.append('duration', newEpisode.duration)
      formData.append('audio', newEpisode.audioFile)
      if (newEpisode.coverImageFile) {
        formData.append('cover_image', newEpisode.coverImageFile)
      }

      const response = await fetch(`${apiBaseUrl}/api/v1/podcasts/episodes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        const savedEpisode: PodcastEpisode = {
          id: String(data.id),
          title: data.title || newEpisode.title,
          description: data.description || newEpisode.description,
          audioUrl: data.audioUrl || data.audio_url || '',
          coverImageUrl: data.coverImageUrl || data.cover_image_url || '',
          duration: data.duration || newEpisode.duration,
          guest: data.guest || newEpisode.guest,
          publishedAt: data.publishedAt || data.published_at || new Date().toISOString(),
        }

        if (savedEpisode.audioUrl) {
          setEpisodes((prev) => [savedEpisode, ...prev])
          setFeaturedEpisodeId(savedEpisode.id)
        }
        setStatusMessage('Episode uploaded successfully.')
      } else {
        const localEpisode: PodcastEpisode = {
          id: `local-${Date.now()}`,
          title: newEpisode.title,
          description: newEpisode.description,
          audioUrl: URL.createObjectURL(newEpisode.audioFile),
          coverImageUrl: newEpisode.coverImageFile ? URL.createObjectURL(newEpisode.coverImageFile) : '',
          duration: newEpisode.duration,
          guest: newEpisode.guest,
          publishedAt: new Date().toISOString(),
        }

        setEpisodes((prev) => [localEpisode, ...prev])
        setFeaturedEpisodeId(localEpisode.id)
        setStatusMessage('Backend upload endpoint is not active yet. Episode is previewed locally for this session.')
      }

      setNewEpisode({
        title: '',
        description: '',
        guest: '',
        duration: '',
        audioFile: null,
        coverImageFile: null,
      })
      setShowUploadForm(false)
    } catch (error) {
      console.error('Error uploading podcast episode:', error)
      setStatusMessage('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--inst-bg)', color: 'var(--inst-text)' }}>
      <Navbar />
      <OrbBackground />
      <FilmGrain />
      <section className="relative min-h-screen z-10 overflow-hidden pt-24 pb-16">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={heroActiveRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <SectionLabel number="01" title="Podcasts" active={heroActive} />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white/80 text-sm mb-4">
              <Radio className="h-4 w-4 text-primary-400" />
              Tatari Podcast
            </div>
            <h1 style={{ margin: '0 0 10px', fontFamily: 'var(--inst-font-serif)', fontWeight: 400, fontSize: 'clamp(42px, 8vw, 86px)', letterSpacing: '-0.03em', lineHeight: 0.95, color: heroActive ? '#fff' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>Podcast</h1>
            <p style={{ color: heroActive ? 'var(--inst-text-70)' : 'var(--inst-text-50)', fontSize: 14, lineHeight: 1.8, maxWidth: 760, margin: '0 auto', transition: 'color 0.4s ease-in-out' }}>
              Deep dives on AI infrastructure, distributed systems, and the teams building modern compute at scale.
            </p>
          </motion.div>

          {isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 flex justify-center"
            >
              <button
                onClick={() => setShowUploadForm(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white text-black font-semibold px-5 py-3 hover:bg-white/90 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Upload New Episode
              </button>
            </motion.div>
          )}

          {showUploadForm && isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold text-lg">Upload Podcast Episode</h2>
                <button onClick={() => setShowUploadForm(false)} className="text-white/70 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleUploadEpisode} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newEpisode.title}
                  onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
                  placeholder="Episode title"
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <input
                  type="text"
                  value={newEpisode.guest}
                  onChange={(e) => setNewEpisode({ ...newEpisode, guest: e.target.value })}
                  placeholder="Guest name"
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="text"
                  value={newEpisode.duration}
                  onChange={(e) => setNewEpisode({ ...newEpisode, duration: e.target.value })}
                  placeholder="Duration (e.g. 42m)"
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <label className="rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white/80 cursor-pointer hover:border-primary-400 transition-colors">
                  <span className="inline-flex items-center gap-2 text-sm">
                    <Upload className="h-4 w-4" />
                    {newEpisode.coverImageFile ? newEpisode.coverImageFile.name : 'Upload cover image (optional)'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      setNewEpisode({ ...newEpisode, coverImageFile: file })
                    }}
                  />
                </label>
                <label className="md:col-span-2 rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white/80 cursor-pointer hover:border-primary-400 transition-colors">
                  <span className="inline-flex items-center gap-2 text-sm">
                    <Headphones className="h-4 w-4" />
                    {newEpisode.audioFile ? newEpisode.audioFile.name : 'Upload audio file (mp3, wav, m4a)'}
                  </span>
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      setNewEpisode({ ...newEpisode, audioFile: file })
                    }}
                    required
                  />
                </label>
                <textarea
                  value={newEpisode.description}
                  onChange={(e) => setNewEpisode({ ...newEpisode, description: e.target.value })}
                  placeholder="Episode summary"
                  rows={4}
                  className="md:col-span-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="rounded-xl bg-primary-500 px-5 py-3 text-white font-semibold hover:bg-primary-600 disabled:opacity-60 transition-colors"
                  >
                    {isUploading ? 'Uploading...' : 'Publish Episode'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="rounded-xl border border-white/20 px-5 py-3 text-white hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <motion.div
              ref={contentActiveRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="lg:col-span-3"
              style={{
                borderRadius: 16,
                border: '1px solid var(--inst-border-8)',
                background: 'var(--inst-surface-2)',
                backdropFilter: 'blur(12px)',
                padding: 22,
              }}
            >
              {featuredEpisode ? (
                <>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2
                        style={{
                          margin: '0 0 10px',
                          fontFamily: 'var(--inst-font-serif)',
                          fontWeight: 400,
                          fontSize: 'clamp(24px, 3vw, 34px)',
                          lineHeight: 1.2,
                          color: contentActive ? '#fff' : 'var(--inst-text-80)',
                          transition: 'color 0.4s ease-in-out',
                        }}
                      >
                        {featuredEpisode.title}
                      </h2>
                      <div className="flex flex-wrap gap-2" style={{ fontFamily: 'var(--inst-font-mono)' }}>
                        {featuredEpisode.guest && (
                          <span
                            className="inline-flex items-center gap-1"
                            style={{
                              fontSize: 10,
                              color: 'var(--inst-text-35)',
                              background: 'var(--inst-surface-3)',
                              border: '1px solid var(--inst-border-8)',
                              borderRadius: 5,
                              padding: '4px 8px',
                              letterSpacing: '0.04em',
                            }}
                          >
                            <UserRound className="h-3.5 w-3.5" />
                            {featuredEpisode.guest}
                          </span>
                        )}
                        {featuredEpisode.duration && (
                          <span
                            className="inline-flex items-center gap-1"
                            style={{
                              fontSize: 10,
                              color: 'var(--inst-text-35)',
                              background: 'var(--inst-surface-3)',
                              border: '1px solid var(--inst-border-8)',
                              borderRadius: 5,
                              padding: '4px 8px',
                              letterSpacing: '0.04em',
                            }}
                          >
                            <Clock3 className="h-3.5 w-3.5" />
                            {featuredEpisode.duration}
                          </span>
                        )}
                        <span
                          style={{
                            fontSize: 10,
                            color: 'var(--inst-text-30)',
                            background: 'var(--inst-surface-3)',
                            border: '1px solid var(--inst-border-8)',
                            borderRadius: 5,
                            padding: '4px 8px',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {new Date(featuredEpisode.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div
                      className="h-16 w-16 flex items-center justify-center"
                      style={{
                        borderRadius: 12,
                        background: 'var(--inst-surface-4)',
                        border: '1px solid var(--inst-border-10)',
                      }}
                    >
                      <Mic2 className="h-7 w-7" style={{ color: 'var(--inst-text-60)' }} />
                    </div>
                  </div>

                  <p
                    style={{
                      margin: '0 0 20px',
                      fontFamily: 'var(--inst-font-sans)',
                      fontSize: 13,
                      fontWeight: 300,
                      color: contentActive ? 'var(--inst-text-70)' : 'var(--inst-text-50)',
                      lineHeight: 1.75,
                      transition: 'color 0.4s ease-in-out',
                    }}
                  >
                    {featuredEpisode.description}
                  </p>

                  {featuredEpisode.externalUrl && (
                    <a
                      href={featuredEpisode.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex mb-4"
                      style={{
                        fontFamily: 'var(--inst-font-sans)',
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        background: 'var(--inst-surface-6)',
                        border: '1px solid var(--inst-border-12)',
                        borderRadius: 8,
                        padding: '9px 12px',
                        textDecoration: 'none',
                      }}
                    >
                      Open on Spotify
                    </a>
                  )}

                  {featuredEpisode.spotifyEmbedUrl ? (
                    <iframe
                      title={`${featuredEpisode.title} Spotify Embed`}
                      src={featuredEpisode.spotifyEmbedUrl}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      style={{ borderRadius: '12px' }}
                    />
                  ) : (
                    <audio key={featuredEpisode.id} controls preload="metadata" className="w-full">
                      <source src={featuredEpisode.audioUrl} />
                      Your browser does not support audio playback.
                    </audio>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-white/70 text-lg">No podcast episodes available yet.</p>
                  <p className="text-white/50 mt-2 text-sm">Upload your first episode to enable in-site playback.</p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="lg:col-span-2"
              style={{
                borderRadius: 16,
                border: '1px solid var(--inst-border-8)',
                background: 'var(--inst-surface-2)',
                backdropFilter: 'blur(12px)',
                padding: 20,
              }}
            >
              <h3
                style={{
                  margin: '0 0 14px',
                  fontFamily: 'var(--inst-font-serif)',
                  fontSize: 24,
                  fontWeight: 400,
                  color: contentActive ? '#fff' : 'var(--inst-text-80)',
                  transition: 'color 0.4s ease-in-out',
                }}
              >
                Episodes
              </h3>
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {episodes.map((episode) => {
                  const isActive = episode.id === featuredEpisode?.id
                  return (
                    <button
                      key={episode.id}
                      onClick={() => setFeaturedEpisodeId(episode.id)}
                      className="w-full text-left rounded-xl border px-4 py-3 transition-all duration-300"
                      style={{
                        borderColor: isActive ? 'var(--inst-border-15)' : 'var(--inst-border-6)',
                        background: isActive ? 'var(--inst-surface-5)' : 'var(--inst-surface-1)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div
                          style={{
                            fontFamily: 'var(--inst-font-serif)',
                            fontSize: 18,
                            lineHeight: 1.3,
                            color: isActive ? '#ffffff' : 'var(--inst-text-70)',
                          }}
                        >
                          {episode.title}
                        </div>
                        <span
                          className="inline-flex items-center justify-center"
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            border: '1px solid var(--inst-border-8)',
                            background: 'var(--inst-surface-4)',
                          }}
                        >
                          <Radio className="h-3.5 w-3.5" style={{ color: 'var(--inst-text-60)' }} />
                        </span>
                      </div>
                      <div
                        className="line-clamp-2"
                        style={{
                          fontFamily: 'var(--inst-font-sans)',
                          fontSize: 12,
                          fontWeight: 300,
                          lineHeight: 1.7,
                          color: 'var(--inst-text-35)',
                        }}
                      >
                        {episode.description}
                      </div>
                      <div
                        className="mt-2 inline-flex items-center gap-2"
                        style={{
                          fontFamily: 'var(--inst-font-mono)',
                          fontSize: 10,
                          color: 'var(--inst-text-30)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {episode.duration && <span>{episode.duration}</span>}
                        <span>{new Date(episode.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {statusMessage && <p className="text-center text-sm text-white/60 mt-6">{statusMessage}</p>}
        </div>

      </section>
    </div>
  )
}

export default Podcast
