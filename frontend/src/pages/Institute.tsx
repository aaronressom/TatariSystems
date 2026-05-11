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
  africa: [
    // NW coast – Morocco → Algeria → Tunisia
    [35,-5],[35,0],[33,8],[32,12],
    // Libya → Egypt north coast
    [32,20],[32,25],[31,32],
    // Red Sea / NE Africa
    [30,32],[28,34],[25,37],[22,38],[18,40],[15,42],
    // Horn of Africa (crucial – goes east to Cape Guardafui)
    [12,44],[11,48],[11,51],[10,51],
    // Somali coast going SW
    [8,48],[5,41],[2,45],[0,42],
    // East Africa coast going south
    [-4,40],[-10,40],[-15,36],[-20,35],[-25,34],
    [-28,33],[-30,31],
    // Cape of Good Hope / South Africa
    [-34,26],[-34,22],[-34,18],
    // West coast going north
    [-32,18],[-28,16],[-25,15],[-20,13],[-15,12],
    [-10,14],[-5,10],[0,8],[5,1],
    // West Africa bulge
    [5,-5],[7,-12],[10,-15],[12,-16],[15,-17],
    [18,-16],[22,-17],[25,-15],[28,-14],[31,-10],[33,-5],[35,-5],
  ],
  europe: [
    // Portugal SW corner
    [37,-9],[36,-9],[36,-7],
    // Spain south – Gibraltar
    [36,-5],[36,-2],
    // South France / Italian Riviera direction
    [38,0],[43,3],[44,7],
    // North France → Channel coast
    [48,0],[50,-2],[51,-2],[52,-2],
    // North Sea → Scotland
    [54,-1],[56,-3],[58,-5],
    // Norway coast going north
    [60,0],[62,5],[64,10],[66,14],[68,16],[70,22],[71,26],
    // Kola Peninsula / Finland
    [70,30],[68,32],[65,30],[62,30],[60,28],
    // Baltic coast (simplified)
    [57,22],[55,20],[54,16],[54,14],[55,10],[54,8],[53,8],
    // Netherlands / Belgium back to France
    [52,5],[51,4],[50,2],
    // Northern Spain coast
    [44,-2],[43,-8],[42,-9],[40,-9],[38,-9],[37,-9],
  ],
  asia: [
    // Western Turkey / Bosphorus
    [41,26],[42,30],[42,36],[42,42],
    // Caucasus / Caspian
    [40,48],[44,52],
    // Kazakhstan → Siberia
    [50,60],[55,68],[60,68],
    // Northern Siberia coast (simplified)
    [65,80],[68,100],[70,120],[70,140],
    // Russian Far East
    [65,160],[60,163],[56,163],
    // Descend toward Korea
    [52,142],[48,140],
    // Korean Peninsula / Manchuria
    [44,132],[40,128],[38,122],
    // East China coast
    [32,122],[28,122],[24,118],[22,114],[20,110],
    // Vietnam coast
    [16,108],[12,108],[10,104],
    // Malay Peninsula going south
    [6,102],[4,100],[2,104],[1,104],
    // Turn – up Bay of Bengal west side
    [5,100],[8,98],[16,97],
    // Bangladesh
    [22,90],[20,88],
    // India east coast going south
    [18,84],[15,80],[12,80],[9,80],[8,77],
    // India southern tip (Kanyakumari – key recognition feature)
    [6,77],
    // India west coast going north
    [8,76],[12,75],[14,75],[18,72],[20,72],
    // Gujarat / Pakistan coast
    [22,68],[24,68],[26,62],[25,58],
    // Iran south coast (Makran)
    [25,56],[26,54],
    // Persian Gulf north → back to Turkey
    [28,50],[30,48],[32,46],[38,44],[40,42],[42,36],[41,26],
  ],
  north_america: [
    // Alaska south coast
    [60,-140],[56,-133],[55,-130],
    // Pacific coast going south
    [52,-128],[50,-125],[48,-124],[45,-124],
    [42,-124],[38,-122],[35,-120],[32,-118],
    // Baja / Mexico Pacific
    [28,-112],[24,-110],[20,-105],
    // Mexico Gulf coast
    [18,-96],[18,-88],[18,-87],
    // Yucatan tip
    [20,-87],[22,-87],[24,-82],
    // Florida
    [25,-80],[27,-80],[28,-80],[30,-82],
    // US Gulf coast
    [29,-90],[30,-90],[30,-88],
    // US East coast going north
    [32,-80],[34,-78],[36,-76],[38,-75],
    [40,-74],[42,-72],[42,-70],[44,-67],
    // Maritime Canada
    [46,-67],[48,-65],[50,-60],[52,-58],
    [55,-60],[58,-62],[60,-65],[63,-65],[65,-65],
    // Labrador / Arctic coast
    [68,-58],[70,-55],[73,-60],[75,-65],
    [78,-75],[80,-80],[83,-85],[83,-95],
    // Arctic going west
    [78,-100],[72,-120],[70,-135],[68,-160],
    [65,-168],[62,-168],
    // Back to Alaska
    [60,-152],[60,-140],
  ],
  south_america: [
    // Venezuela / Colombia
    [12,-72],[10,-75],[8,-77],[6,-77],[4,-73],
    // Colombia → Ecuador coast
    [2,-77],[0,-80],
    // Peru coast
    [-5,-80],[-10,-77],[-15,-75],[-18,-72],
    // Chile coast going south
    [-20,-70],[-25,-70],[-28,-71],[-30,-72],
    [-35,-72],[-38,-73],[-40,-72],
    [-43,-74],[-48,-75],[-53,-72],
    // Tierra del Fuego
    [-55,-68],[-55,-65],[-55,-63],
    // Patagonia east coast going north
    [-50,-65],[-45,-65],[-42,-63],
    [-40,-62],[-38,-58],[-35,-56],
    [-32,-52],[-30,-50],[-25,-48],
    // Brazil coast
    [-23,-43],[-22,-40],[-18,-39],
    [-15,-39],[-12,-38],[-7,-35],[-5,-35],
    // NE Brazil
    [-3,-41],[0,-50],
    // Guyana coast back to start
    [2,-50],[4,-52],[6,-57],
    [8,-60],[10,-62],[10,-65],[12,-72],
  ],
  oceania: [
    // Cape York NE
    [-10,142],[-12,143],[-14,144],
    // East coast going south
    [-16,146],[-18,147],[-20,149],
    [-22,150],[-24,152],[-26,153],[-28,153],
    [-30,153],[-32,152],
    // Sydney area → SE corner
    [-34,151],[-35,150],[-37,150],
    [-38,147],[-38,146],[-38,144],
    // South coast
    [-37,142],[-36,140],[-35,138],[-35,136],
    [-34,135],[-33,134],[-32,131],[-32,128],
    // SW corner
    [-31,120],[-28,115],[-25,114],[-22,114],
    // NW coast going north
    [-20,116],[-20,118],[-18,122],
    [-16,124],[-15,129],[-14,133],
    [-14,136],[-12,140],[-12,142],[-10,142],
  ],
  middle_east: [
    // Jordan / Levant coast
    [30,32],[32,34],[33,36],[35,36],
    // Turkey border
    [37,40],[38,42],[40,46],
    // Caspian south coast
    [40,48],[38,48],[36,50],
    // Iran Persian coast
    [34,52],[32,52],[30,50],[28,50],
    // Oman coast
    [26,58],[22,59],[20,58],[16,50],[15,48],
    // Yemen south
    [13,46],[12,44],[15,42],
    // Saudi west coast going north
    [18,38],[20,37],[22,36],[24,34],[26,33],[28,33],[30,32],
  ],
}

const InteractiveGlobe: React.FC<{
  activeContinent: string | null
  onContinentClick: (key: string) => void
}> = ({ activeContinent, onContinentClick }) => {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const groupRef = useRef<THREE.Group | null>(null)

  // Mutable animation state as refs so they persist across renders
  const targetRef = useRef({ x: 0.2, y: 0 })
  const velRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const activeContinentRef = useRef<string | null>(null)

  // Refs to live-update materials without tearing down the scene
  const outlineMatRef = useRef<Record<string, {
    glow: THREE.LineBasicMaterial
    main: THREE.LineBasicMaterial
    core: THREE.LineBasicMaterial
  }>>({})
  const hotspotMeshRef = useRef<Record<string, { outer: THREE.Mesh; core: THREE.Mesh }>>({})

  // Effect 1 – build the Three.js scene ONCE
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
    groupRef.current = group
    scene.add(group)

    // Base wireframe sphere
    group.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.018 }),
      ),
    )

    // Latitude grid lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const c = new THREE.EllipseCurve(
        0, 0,
        Math.cos((lat * Math.PI) / 180),
        Math.cos((lat * Math.PI) / 180),
        0, 2 * Math.PI, false, 0,
      )
      const pts = c.getPoints(100).map((p) => new THREE.Vector3(p.x, Math.sin((lat * Math.PI) / 180), p.y))
      group.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.025 }),
      ))
    }

    // Continent outlines – store materials in ref for live updates
    outlineMatRef.current = {}
    Object.entries(CONTINENT_OUTLINES).forEach(([key, coords]) => {
      const smoothed: Array<[number, number]> = []
      for (let i = 0; i < coords.length; i++) {
        const [lat1, lng1] = coords[i]
        const [lat2, lng2] = coords[(i + 1) % coords.length]
        for (let s = 0; s < 4; s++) {
          const t = s / 4
          smoothed.push([lat1 + (lat2 - lat1) * t, lng1 + (lng2 - lng1) * t])
        }
      }
      smoothed.push(smoothed[0])

      const glowMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 })
      group.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(smoothed.map(([a, b]) => latLngToVec3(a, b, 1.001))),
        glowMat,
      ))

      const mainMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 })
      group.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(smoothed.map(([a, b]) => latLngToVec3(a, b, 1.003))),
        mainMat,
      ))

      const coreMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
      group.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(smoothed.map(([a, b]) => latLngToVec3(a, b, 1.005))),
        coreMat,
      ))

      outlineMatRef.current[key] = { glow: glowMat, main: mainMat, core: coreMat }
    })

    // Data-center marker dots
    DC_POINTS.forEach(([lat, lng, intensity]) => {
      const pos = latLngToVec3(lat, lng, 1.005)
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.006 + intensity * 0.008, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 + intensity * 0.4 }),
      )
      dot.position.copy(pos)
      group.add(dot)
    })

    // Continent hotspot markers
    hotspotMeshRef.current = {}
    const hotspotPulseList: Array<{ outer: THREE.Mesh; core: THREE.Mesh; key: string }> = []

    Object.entries(CONTINENTS).forEach(([key, c]) => {
      const pos = latLngToVec3(c.lat, c.lng, 1.04)

      const hitTarget = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 14, 14),
        new THREE.MeshBasicMaterial({ visible: false }),
      )
      hitTarget.position.copy(pos)
      hitTarget.userData = { continentKey: key }
      group.add(hitTarget)

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.055, 0.075, 48),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      )
      ring.position.copy(pos)
      ring.lookAt(0, 0, 0)
      group.add(ring)

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 }),
      )
      core.position.copy(pos)
      core.userData = { continentKey: key }
      group.add(core)

      hotspotMeshRef.current[key] = { outer: ring, core }
      hotspotPulseList.push({ outer: ring, core, key })
    })

    // Atmosphere glow
    group.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: 'varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
        fragmentShader: 'varying vec3 vN;void main(){float i=pow(0.6-dot(vN,vec3(0,0,1)),3.0);gl_FragColor=vec4(1,1,1,i*0.12);}',
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      }),
    ))

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const el = renderer.domElement

    let prevX = 0, prevY = 0

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true
      const cx = (e as MouseEvent).clientX ?? (e as TouchEvent).touches?.[0]?.clientX ?? 0
      const cy = (e as MouseEvent).clientY ?? (e as TouchEvent).touches?.[0]?.clientY ?? 0
      prevX = cx; prevY = cy
      velRef.current = { x: 0, y: 0 }
      dragStartRef.current = { x: cx, y: cy }
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return
      const x = (e as MouseEvent).clientX ?? (e as TouchEvent).touches?.[0]?.clientX ?? 0
      const y = (e as MouseEvent).clientY ?? (e as TouchEvent).touches?.[0]?.clientY ?? 0
      velRef.current.x = (y - prevY) * 0.003
      velRef.current.y = (x - prevX) * 0.003
      targetRef.current.x += velRef.current.x
      targetRef.current.y += velRef.current.y
      prevX = x; prevY = y
    }

    const onUp = () => { isDraggingRef.current = false }

    const onClick = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y
      if (Math.sqrt(dx * dx + dy * dy) > 8) return
      const rect = el.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const hit = raycaster.intersectObjects(group.children, false).find((i) => i.object.userData?.continentKey)
      if (hit?.object?.userData?.continentKey) onContinentClick(hit.object.userData.continentKey)
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

      if (!isDraggingRef.current) {
        targetRef.current.y += 0.001
        velRef.current.x *= 0.95
        velRef.current.y *= 0.95
        targetRef.current.x += velRef.current.x
        targetRef.current.y += velRef.current.y
      }

      targetRef.current.x = Math.max(-1.2, Math.min(1.2, targetRef.current.x))
      group.rotation.x += (targetRef.current.x - group.rotation.x) * 0.05
      group.rotation.y += (targetRef.current.y - group.rotation.y) * 0.05

      hotspotPulseList.forEach((h, i) => {
        const isActive = activeContinentRef.current === h.key
        const pulse = Math.sin(time + i * 1.2) * 0.5 + 0.5
        const outerMat = h.outer.material as THREE.MeshBasicMaterial
        outerMat.opacity = (isActive ? 0.3 : 0.12) + pulse * (isActive ? 0.3 : 0.15)
        const s = 1 + pulse * (isActive ? 0.25 : 0.12)
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
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseup', onUp)
      el.removeEventListener('mouseleave', onUp)
      el.removeEventListener('touchstart', onDown)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onUp)
      el.removeEventListener('click', onClick)
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      renderer.dispose()
      outlineMatRef.current = {}
      hotspotMeshRef.current = {}
      groupRef.current = null
    }
  }, [onContinentClick]) // scene is built once; onContinentClick is memoized so this never re-fires

  // Effect 2 – update materials + pan camera whenever activeContinent changes (no scene rebuild)
  useEffect(() => {
    activeContinentRef.current = activeContinent

    // Update continent outline material opacities
    Object.entries(outlineMatRef.current).forEach(([key, mats]) => {
      const isActive =
        activeContinent === key ||
        (key === 'oceania' && activeContinent === 'asia_pacific') ||
        (key === 'asia' && activeContinent === 'asia_pacific')
      mats.glow.opacity = isActive ? 0.22 : 0.06
      mats.main.opacity = isActive ? 0.9 : 0.4
      mats.core.opacity = isActive ? 0.65 : 0.25
    })

    // Update hotspot ring base opacities (pulse animation reads activeContinentRef live)
    Object.entries(hotspotMeshRef.current).forEach(([key, meshes]) => {
      const isActive = activeContinent === key
      ;(meshes.outer.material as THREE.MeshBasicMaterial).opacity = isActive ? 0.7 : 0.25
      ;(meshes.core.material as THREE.MeshBasicMaterial).opacity = isActive ? 1 : 0.55
    })

    // Pan globe to center on selected continent
    if (activeContinent && CONTINENTS[activeContinent]) {
      const c = CONTINENTS[activeContinent]
      // Target rotation to bring lat/lng to face the camera
      const newTargetX = c.lat * Math.PI / 180
      const rawTargetY = -(c.lng + 90) * Math.PI / 180

      // Shortest angular path from current globe rotation (avoids spinning multiple laps)
      const currentY = groupRef.current?.rotation.y ?? targetRef.current.y
      let diff = rawTargetY - currentY
      while (diff > Math.PI) diff -= 2 * Math.PI
      while (diff < -Math.PI) diff += 2 * Math.PI

      targetRef.current.x = newTargetX
      targetRef.current.y = currentY + diff
      velRef.current = { x: 0, y: 0 }
    }
  }, [activeContinent])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', cursor: 'grab' }}
      onMouseDown={(e) => { e.currentTarget.style.cursor = 'grabbing' }}
      onMouseUp={(e) => { e.currentTarget.style.cursor = 'grab' }}
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
