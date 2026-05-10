import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import Navbar from '../components/Navbar'
import OrbBackground from '../components/OrbBackground'
import FilmGrain from '../components/FilmGrain'
import SectionLabel from '../components/SectionLabel'
import useInView from '../hooks/useInView'
import { getAssetPath } from '../utils/paths'

type Publication = {
  id: number
  title: string
  fileName: string
  authors: string
  date: string
  category: string
  abstract: string
  tag: string
  featured: boolean
}

type Continent = {
  name: string
  lat: number
  lng: number
}

const PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title:
      "China's Fiber Footprint: How PEACE, DARE, & Huawei Cable Network Are Building Beijing's Intelligence Architecture Across Africa",
    fileName: "China's Fiber Footprint.pdf",
    authors: 'Tatari Institute',
    date: 'March 2026',
    category: 'Research Paper',
    abstract:
      "Beneath the ocean floor, a quiet contest is playing out that will determine who controls the arteries of the global internet for decades. This paper examines the full stack of China's fiber footprint in Africa.",
    tag: 'Geopolitical Risk',
    featured: true,
  },
  {
    id: 2,
    title: 'Institute - CACB',
    fileName: 'Institute - CACB.pdf',
    authors: 'Tatari Institute',
    date: 'March 2026',
    category: 'Policy Brief',
    abstract:
      'A policy and geopolitical brief covering key regional dynamics and infrastructure implications in the CACB context.',
    tag: 'Regional Strategy',
    featured: true,
  },
  {
    id: 3,
    title: 'The Dual-Use Problem: When Commercial Cloud Becomes a Military Asset',
    fileName: 'Institute - Dual Use Problem.pdf',
    authors: 'Tatari Institute',
    date: 'March 2026',
    category: 'Policy Brief',
    abstract:
      "The Pentagon's $9B JWCC contract and JADC2 architecture have permanently collapsed the boundary between civilian and military compute infrastructure.",
    tag: 'Defense & Compute',
    featured: true,
  },
  {
    id: 4,
    title: 'Data Localization Is Coming — Whether Hyperscalers Like It or Not',
    fileName: 'Institute - Data Localization.pdf',
    authors: 'Jaemoon Lee & Amen Amare',
    date: 'March 2026',
    category: 'Policy Brief',
    abstract:
      'Between 2017 and 2025, active data localization controls worldwide more than doubled, rising from 67 to over 140 across 62 jurisdictions.',
    tag: 'Sovereign AI',
    featured: false,
  },
  {
    id: 5,
    title:
      'Infrastructure Under Fire: US–Iran Conflict & the Weaponization of Cloud, Cable, and Compute',
    fileName: 'US-Iran War Impact.pdf',
    authors: 'Winta Brhane & Yael Ehrlich',
    date: 'March 2026',
    category: 'Policy Brief',
    abstract:
      'The first confirmed military strikes on hyperscale cloud data centers. Three AWS facilities struck, 17 Red Sea cables at risk, and $300B in Gulf AI investment exposed.',
    tag: 'Geopolitical Risk',
    featured: false,
  },
  {
    id: 6,
    title: 'Tatari Systems Annual Report 2025',
    fileName: 'Tatari Systems Annual Report 2025-compressed.pdf',
    authors: 'Tatari Systems',
    date: '2025',
    category: 'Annual Report',
    abstract:
      'Comprehensive annual report covering strategy, operations, infrastructure milestones, and forward-looking initiatives for Tatari Systems.',
    tag: 'Annual Report',
    featured: false,
  },
]

const CATEGORIES = ['All', 'Research Paper', 'Policy Brief', 'Annual Report']

const CONTINENTS: Record<string, Continent> = {
  africa: { name: 'Africa', lat: 2, lng: 20 },
  north_america: { name: 'North America', lat: 40, lng: -100 },
  europe: { name: 'Europe', lat: 50, lng: 10 },
  middle_east: { name: 'Middle East', lat: 25, lng: 45 },
  asia_pacific: { name: 'Asia-Pacific', lat: 15, lng: 105 },
  south_america: { name: 'South America', lat: -15, lng: -55 },
}

const DC_POINTS: Array<[number, number, number]> = [
  [39.04, -77.49, 1.0],
  [51.51, -0.13, 0.9],
  [50.11, 8.68, 0.85],
  [1.35, 103.82, 0.9],
  [35.68, 139.65, 0.85],
  [19.08, 72.88, 0.7],
  [25.2, 55.27, 0.6],
  [-23.55, -46.63, 0.6],
  [-26.2, 28.05, 0.45],
  [6.52, 3.38, 0.3],
  [9.02, 38.75, 0.2],
]

const latLngToVec3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

const CONTINENT_OUTLINES: Record<string, Array<[number, number]>> = {
  africa: [[37,10],[36,5],[35,0],[37,-5],[37,-10],[34,-12],[31,-10],[28,-14],[25,-17],[22,-17],[18,-16],[15,-17],[12,-16],[10,-15],[7,-12],[5,-10],[4,-5],[4,-1],[5,1],[4,5],[4,10],[2,10],[0,10],[-2,10],[-5,12],[-8,13],[-10,14],[-13,13],[-15,12],[-18,12],[-20,15],[-23,15],[-25,15],[-27,16],[-28,17],[-30,18],[-32,18],[-34,18],[-34,20],[-34,22],[-33,25],[-33,27],[-31,29],[-30,30],[-28,31],[-25,33],[-22,35],[-20,35],[-17,38],[-15,40],[-12,40],[-10,40],[-7,42],[-5,40],[-2,42],[0,42],[3,40],[5,40],[8,42],[10,42],[12,44],[13,45],[15,45],[18,43],[20,40],[23,38],[25,38],[28,35],[30,33],[32,30],[33,28],[35,28],[36,20],[37,15],[37,10]],
  europe: [[36,-10],[37,-8],[38,-8],[40,-9],[43,-9],[43,-5],[44,0],[46,-2],[48,-5],[50,-5],[52,-5],[53,-3],[55,-3],[56,-5],[58,-5],[60,0],[62,5],[64,10],[65,14],[67,16],[70,20],[70,24],[70,28],[68,28],[65,25],[62,28],[60,30],[58,26],[57,24],[55,20],[54,16],[54,14],[53,10],[51,8],[50,5],[48,4],[46,3],[45,5],[44,8],[43,6],[42,3],[41,2],[40,0],[39,0],[38,-1],[37,0],[36,-5],[36,-10]],
  asia: [[42,28],[44,35],[45,40],[43,42],[42,44],[40,48],[40,50],[42,55],[45,60],[48,58],[50,55],[53,58],[55,60],[58,63],[60,65],[63,68],[65,70],[68,70],[70,72],[72,80],[71,85],[70,90],[69,95],[68,100],[66,103],[65,105],[62,108],[60,110],[57,110],[55,110],[52,115],[50,120],[48,125],[45,130],[43,132],[40,135],[38,140],[36,137],[35,136],[33,132],[30,125],[28,120],[25,117],[22,114],[20,110],[18,108],[15,108],[12,107],[10,106],[8,100],[6,102],[5,103],[3,104],[1,104],[-4,105],[-8,107],[-8,112],[-8,115],[-6,118],[-5,120],[-2,125],[0,128],[3,127],[5,127],[8,122],[10,120],[15,120],[18,120],[22,120],[25,121],[28,122],[30,128],[32,130],[35,132],[36,135],[35,136],[38,140],[40,142],[42,145],[44,143],[46,142],[48,140],[50,140],[52,140],[55,137],[58,139],[60,140],[62,150],[65,170],[68,180],[70,170],[72,155],[72,140],[71,135],[68,120],[65,100],[62,92],[60,90],[57,80],[55,72],[52,62],[50,55],[47,45],[45,40],[42,28]],
  north_america: [[70,-165],[72,-155],[71,-140],[69,-137],[68,-135],[64,-140],[60,-140],[58,-135],[56,-132],[55,-130],[52,-125],[50,-125],[48,-125],[45,-124],[42,-124],[38,-122],[35,-120],[32,-118],[30,-115],[28,-112],[25,-110],[22,-107],[20,-105],[18,-100],[18,-95],[18,-92],[18,-88],[19,-87],[20,-87],[22,-87],[24,-82],[25,-80],[27,-80],[28,-80],[30,-82],[30,-85],[30,-88],[30,-90],[32,-90],[35,-90],[36,-85],[38,-76],[40,-74],[42,-72],[42,-70],[44,-67],[46,-67],[47,-67],[48,-65],[49,-62],[50,-60],[52,-58],[55,-60],[58,-62],[60,-65],[63,-65],[65,-65],[68,-58],[70,-55],[73,-58],[75,-60],[78,-65],[80,-70],[83,-70],[83,-80],[83,-95],[78,-95],[75,-95],[72,-120],[72,-130],[71,-150],[70,-165]],
  south_america: [[12,-72],[11,-74],[10,-75],[9,-76],[8,-77],[6,-77],[5,-77],[3,-79],[2,-80],[0,-80],[-2,-80],[-5,-80],[-8,-79],[-10,-77],[-12,-76],[-15,-75],[-18,-72],[-20,-70],[-22,-70],[-25,-70],[-28,-71],[-30,-72],[-32,-72],[-35,-72],[-38,-73],[-40,-72],[-43,-74],[-45,-75],[-48,-75],[-50,-75],[-53,-72],[-55,-68],[-55,-66],[-55,-65],[-53,-62],[-52,-60],[-50,-62],[-48,-65],[-45,-66],[-42,-65],[-40,-62],[-38,-58],[-36,-56],[-35,-55],[-32,-52],[-30,-50],[-28,-49],[-25,-48],[-23,-42],[-22,-40],[-18,-39],[-15,-39],[-12,-38],[-10,-37],[-7,-35],[-5,-35],[-3,-40],[-2,-45],[0,-50],[1,-51],[2,-52],[4,-55],[5,-60],[7,-60],[8,-62],[10,-68],[10,-72],[12,-72]],
  oceania: [[-10,142],[-11,143],[-12,143],[-14,144],[-15,145],[-18,147],[-20,149],[-23,151],[-25,153],[-27,153],[-28,153],[-30,153],[-33,152],[-35,151],[-37,150],[-38,148],[-38,146],[-37,142],[-37,140],[-36,138],[-35,137],[-34,135],[-33,134],[-32,131],[-32,130],[-28,120],[-25,114],[-22,114],[-20,116],[-20,119],[-19,121],[-18,122],[-16,126],[-15,129],[-14,133],[-14,136],[-12,140],[-12,142],[-10,142]],
  middle_east: [[30,32],[32,34],[33,36],[35,36],[37,40],[38,42],[39,44],[40,44],[40,48],[38,48],[36,50],[34,51],[32,52],[30,50],[28,50],[26,50],[25,55],[24,56],[23,57],[22,55],[20,55],[18,53],[16,50],[15,48],[13,45],[12,44],[15,42],[18,40],[20,38],[22,36],[24,34],[26,33],[28,33],[30,32]],
}

const InteractiveGlobe: React.FC<{
  activeContinent: string | null
  onContinentClick: (key: string) => void
}> = ({ activeContinent, onContinentClick }) => {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 3.0

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    group.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.018,
        }),
      ),
    )

    for (let lat = -60; lat <= 60; lat += 30) {
      const c = new THREE.EllipseCurve(
        0,
        0,
        Math.cos((lat * Math.PI) / 180),
        Math.cos((lat * Math.PI) / 180),
        0,
        2 * Math.PI,
        false,
        0,
      )
      const points = c
        .getPoints(100)
        .map((p) => new THREE.Vector3(p.x, Math.sin((lat * Math.PI) / 180), p.y))
      group.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.025 }),
        ),
      )
    }

    Object.entries(CONTINENT_OUTLINES).forEach(([key, coords]) => {
      const isActive =
        activeContinent === key ||
        (key === 'oceania' && activeContinent === 'asia_pacific') ||
        (key === 'asia' && activeContinent === 'asia_pacific') ||
        (key === 'middle_east' && activeContinent === 'middle_east')

      const smoothed: Array<[number, number]> = []
      for (let i = 0; i < coords.length; i++) {
        const [lat1, lng1] = coords[i]
        const [lat2, lng2] = coords[(i + 1) % coords.length]
        const steps = 4
        for (let s = 0; s < steps; s++) {
          const t = s / steps
          smoothed.push([lat1 + (lat2 - lat1) * t, lng1 + (lng2 - lng1) * t])
        }
      }
      smoothed.push(smoothed[0])

      const points = smoothed.map(([lat, lng]) => latLngToVec3(lat, lng, 1.003))
      const geo = new THREE.BufferGeometry().setFromPoints(points)

      const glowMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: isActive ? 0.2 : 0.06,
      })
      const glowPoints = smoothed.map(([lat, lng]) => latLngToVec3(lat, lng, 1.001))
      glowPoints.push(glowPoints[0])
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(glowPoints), glowMat))

      const mainMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: isActive ? 0.85 : 0.4,
      })
      group.add(new THREE.Line(geo.clone(), mainMat))

      const corePoints = smoothed.map(([lat, lng]) => latLngToVec3(lat, lng, 1.005))
      corePoints.push(corePoints[0])
      const coreMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: isActive ? 0.6 : 0.25,
      })
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(corePoints), coreMat))

      if (isActive && smoothed.length > 3) {
        const fillPoints = smoothed.map(([lat, lng]) => latLngToVec3(lat, lng, 1.002))
        const fillGeo = new THREE.BufferGeometry().setFromPoints(fillPoints)
        const fillMat = new THREE.PointsMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.08,
          size: 0.008,
        })
        group.add(new THREE.Points(fillGeo, fillMat))
      }
    })

    DC_POINTS.forEach(([lat, lng, intensity]) => {
      const pos = latLngToVec3(lat, lng, 1.005)
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.006 + intensity * 0.008, 10, 10),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.3 + intensity * 0.4,
        }),
      )
      dot.position.copy(pos)
      group.add(dot)
    })

    const hotspotMeshes: Array<{ outer: THREE.Mesh; core: THREE.Mesh }> = []

    Object.entries(CONTINENTS).forEach(([key, c]) => {
      const pos = latLngToVec3(c.lat, c.lng, 1.04)
      const isActive = activeContinent === key

      const hitTarget = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 14, 14),
        new THREE.MeshBasicMaterial({ visible: false }),
      )
      hitTarget.position.copy(pos)
      hitTarget.userData = { continentKey: key }
      group.add(hitTarget)

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.055, 0.075, 48),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: isActive ? 0.7 : 0.25,
          side: THREE.DoubleSide,
        }),
      )
      ring.position.copy(pos)
      ring.lookAt(0, 0, 0)
      group.add(ring)

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 20, 20),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: isActive ? 1 : 0.55,
        }),
      )
      core.position.copy(pos)
      core.userData = { continentKey: key }
      group.add(core)

      hotspotMeshes.push({ outer: ring, core })
    })

    const atmosMat = new THREE.ShaderMaterial({
      vertexShader:
        'varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader:
        'varying vec3 vN;void main(){float i=pow(0.6-dot(vN,vec3(0,0,1)),3.0);gl_FragColor=vec4(1,1,1,i*0.12);}',
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })
    group.add(new THREE.Mesh(new THREE.SphereGeometry(1.12, 64, 64), atmosMat))

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    let isDragging = false
    let prev = { x: 0, y: 0 }
    let vel = { x: 0, y: 0 }
    let target = { x: 0.2, y: 0 }
    let dragStart = { x: 0, y: 0 }
    const el = renderer.domElement

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true
      const cx = (e as MouseEvent).clientX || (e as TouchEvent).touches?.[0]?.clientX || 0
      const cy = (e as MouseEvent).clientY || (e as TouchEvent).touches?.[0]?.clientY || 0
      prev = { x: cx, y: cy }
      vel = { x: 0, y: 0 }
      dragStart = { x: cx, y: cy }
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return
      const x = (e as MouseEvent).clientX || (e as TouchEvent).touches?.[0]?.clientX || 0
      const y = (e as MouseEvent).clientY || (e as TouchEvent).touches?.[0]?.clientY || 0
      vel.x = (y - prev.y) * 0.003
      vel.y = (x - prev.x) * 0.003
      target.x += vel.x
      target.y += vel.y
      prev = { x, y }
    }

    const onUp = () => {
      isDragging = false
    }

    const onClick = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y
      if (Math.sqrt(dx * dx + dy * dy) > 8) return

      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(group.children, false)
      const hit = intersects.find((i) => i.object.userData?.continentKey)
      if (hit?.object?.userData?.continentKey) {
        onContinentClick(hit.object.userData.continentKey)
      }
    }

    el.addEventListener('mousedown', onDown)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseup', onUp)
    el.addEventListener('mouseleave', onUp)
    el.addEventListener('touchstart', onDown, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: true })
    el.addEventListener('touchend', onUp)
    el.addEventListener('click', onClick)

    let time = 0

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      time += 0.02

      if (!isDragging) {
        target.y += 0.001
        vel.x *= 0.95
        vel.y *= 0.95
        target.x += vel.x
        target.y += vel.y
      }

      target.x = Math.max(-1.2, Math.min(1.2, target.x))
      group.rotation.x += (target.x - group.rotation.x) * 0.05
      group.rotation.y += (target.y - group.rotation.y) * 0.05

      hotspotMeshes.forEach((h, i) => {
        const pulse = Math.sin(time + i * 1.2) * 0.5 + 0.5
        const outerMat = h.outer.material as THREE.MeshBasicMaterial
        outerMat.opacity = 0.12 + pulse * 0.2
        const s = 1 + pulse * 0.15
        h.core.scale.set(s, s, s)
      })

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', handleResize)
      el.removeEventListener('click', onClick)
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseup', onUp)
      el.removeEventListener('mouseleave', onUp)
      el.removeEventListener('touchstart', onDown)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onUp)
      container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [activeContinent, onContinentClick])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', cursor: 'grab' }}
      onMouseDown={(e) => {
        e.currentTarget.style.cursor = 'grabbing'
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.cursor = 'grab'
      }}
    />
  )
}

const Institute: React.FC = () => {
  const [activeContinent, setActiveContinent] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const [heroRef, heroVisible] = useInView<HTMLDivElement>(0.08)
  const [featuredRef, featuredVisible] = useInView<HTMLDivElement>(0.08)
  const [archiveRef, archiveVisible] = useInView<HTMLDivElement>(0.08)

  const [heroActiveRef, heroActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [featuredActiveRef, featuredActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [archiveActiveRef, archiveActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')

  const featured = useMemo(() => PUBLICATIONS.filter((p) => p.featured), [])
  const archive = useMemo(
    () =>
      PUBLICATIONS.filter((p) => {
        if (activeCategory === 'All') return true
        return p.category === activeCategory
      }),
    [activeCategory],
  )

  const handleContinentClick = useCallback((key: string) => {
    setActiveContinent((prev) => (prev === key ? null : key))
  }, [])

  const getPublicationUrl = useCallback((fileName: string) => {
    return encodeURI(getAssetPath(`research/${fileName}`))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--inst-bg)', color: 'var(--inst-text)' }}>
      <Navbar />
      <OrbBackground />
      <FilmGrain />

      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '120px 48px 40px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 20, flexWrap: 'wrap' }}>
          <div
            ref={heroActiveRef}
            style={{
              flex: '1 1 420px',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s var(--inst-ease-out-expo)',
            }}
          >
            <SectionLabel number="00" title="Institute" active={heroActive} />
            <h1
              style={{
                fontFamily: 'var(--inst-font-serif)',
                fontSize: 'clamp(34px, 5vw, 68px)',
                fontWeight: 400,
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                margin: '18px 0 12px',
                color: heroActive ? '#fff' : 'var(--inst-text-70)',
                transition: 'color 0.4s ease-in-out',
              }}
            >
              Research at the
              <br />
              frontier of AI
            </h1>
            <p
              style={{
                fontFamily: 'var(--inst-font-sans)',
                fontSize: 14,
                fontWeight: 300,
                color: heroActive ? 'var(--inst-text-70)' : 'var(--inst-text-50)',
                lineHeight: 1.75,
                maxWidth: 500,
                margin: 0,
                transition: 'color 0.4s ease-in-out',
              }}
            >
              Institutional-grade analysis on sovereign AI systems, compute geopolitics,
              and digital infrastructure economics.
            </p>
            <a
              href="https://tatari.institute"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 18,
                padding: '10px 18px',
                borderRadius: 8,
                border: '1px solid var(--inst-border-15)',
                background: 'var(--inst-surface-8)',
                color: '#fff',
                fontFamily: 'var(--inst-font-sans)',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
            >
              View the Institute
            </a>
          </div>

          <div style={{ flex: '1 1 500px', height: 'min(65vh, 560px)', position: 'relative' }}>
            <InteractiveGlobe activeContinent={activeContinent} onContinentClick={handleContinentClick} />
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.entries(CONTINENTS).map(([key, c]) => (
            <button
              key={key}
              onClick={() => handleContinentClick(key)}
              style={{
                fontFamily: 'var(--inst-font-sans)',
                fontSize: 11,
                fontWeight: activeContinent === key ? 500 : 300,
                color: activeContinent === key ? '#fff' : 'var(--inst-text-35)',
                background: activeContinent === key ? 'var(--inst-surface-8)' : 'transparent',
                border: `1px solid ${
                  activeContinent === key ? 'var(--inst-border-15)' : 'var(--inst-border-5)'
                }`,
                padding: '8px 16px',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      <section
        ref={featuredRef}
        style={{
          padding: '80px 48px 24px',
          position: 'relative',
          zIndex: 2,
          opacity: featuredVisible ? 1 : 0,
          transform: featuredVisible ? 'translateY(0)' : 'translateY(22px)',
          transition: 'all 0.75s var(--inst-ease-out-expo)',
        }}
      >
        <div ref={featuredActiveRef}>
          <SectionLabel number="01" title="Featured Research" active={featuredActive} />
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 28 }}>
            {featured.map((pub) => (
              <article
                key={pub.id}
                style={{
                  flex: '1 1 280px',
                  minWidth: 260,
                  minHeight: 360,
                  padding: 28,
                  background: 'var(--inst-surface-1)',
                  border: '1px solid var(--inst-border-5)',
                  borderRadius: 16,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--inst-font-mono)',
                    fontSize: 10,
                    color: 'var(--inst-text-60)',
                    background: 'var(--inst-surface-6)',
                    border: '1px solid var(--inst-border-6)',
                    padding: '4px 10px',
                    borderRadius: 4,
                  }}
                >
                  {pub.tag}
                </span>
                <h3 style={{ fontFamily: 'var(--inst-font-serif)', fontSize: 20, fontWeight: 400, margin: '14px 0 10px', color: featuredActive ? '#fff' : 'var(--inst-text-80)', transition: 'color 0.4s ease-in-out' }}>
                  {pub.title}
                </h3>
                <p style={{ margin: 0, fontSize: 12, color: featuredActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', lineHeight: 1.65, transition: 'color 0.4s ease-in-out' }}>
                  {pub.abstract}
                </p>
                <a
                  href={getPublicationUrl(pub.fileName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: 'auto',
                    alignSelf: 'flex-start',
                    transform: 'translateY(12px)',
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--inst-text-60)',
                    border: '1px solid var(--inst-border-10)',
                    borderRadius: 6,
                    padding: '6px 10px',
                    textDecoration: 'none',
                  }}
                >
                  Read More
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={archiveRef}
        style={{
          padding: '20px 48px 100px',
          position: 'relative',
          zIndex: 2,
          opacity: archiveVisible ? 1 : 0,
          transform: archiveVisible ? 'translateY(0)' : 'translateY(22px)',
          transition: 'all 0.75s var(--inst-ease-out-expo)',
        }}
      >
        <div ref={archiveActiveRef}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <SectionLabel number="02" title="All Publications" active={archiveActive} />
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: 'var(--inst-font-sans)',
                    fontSize: 11,
                    fontWeight: activeCategory === cat ? 500 : 300,
                    color: activeCategory === cat ? '#fff' : archiveActive ? 'var(--inst-text-60)' : 'var(--inst-text-40)',
                    background: activeCategory === cat ? 'var(--inst-surface-8)' : 'transparent',
                    border: `1px solid ${
                      activeCategory === cat ? 'var(--inst-border-12)' : 'var(--inst-border-5)'
                    }`,
                    padding: '6px 14px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    transition: 'color 0.4s ease-in-out',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18, borderTop: '1px solid var(--inst-border-4)' }}>
            {archive.map((pub) => (
              <article
                key={pub.id}
                style={{
                  padding: '24px 8px',
                  borderBottom: '1px solid var(--inst-border-4)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 20,
                }}
              >
                <span style={{ fontFamily: 'var(--inst-font-mono)', fontSize: 11, color: 'var(--inst-text-20)', minWidth: 24 }}>
                  0{pub.id}
                </span>
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      fontFamily: 'var(--inst-font-serif)',
                      fontSize: 17,
                      fontWeight: 400,
                      color: archiveActive ? '#fff' : 'var(--inst-text-70)',
                      margin: '0 0 6px',
                      transition: 'color 0.4s ease-in-out',
                    }}
                  >
                    {pub.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: 12, color: archiveActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', lineHeight: 1.65, maxWidth: 780, transition: 'color 0.4s ease-in-out' }}>
                    {pub.abstract}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span style={{ fontSize: 11, color: 'var(--inst-text-20)', whiteSpace: 'nowrap' }}>{pub.date}</span>
                  <a
                    href={getPublicationUrl(pub.fileName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--inst-text-60)',
                      border: '1px solid var(--inst-border-10)',
                      borderRadius: 6,
                      padding: '6px 9px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Institute
