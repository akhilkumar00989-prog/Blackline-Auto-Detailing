/**
 * BLACKLINE — ProcessWebGL v6 (clean rebuild)
 *
 * ARCHITECTURE:
 *   - Three.js creates the canvas via renderer.domElement and appends it to
 *     a mount div. This means the canvas ONLY exists when WebGL is live.
 *     No canvas element in JSX = no blank white canvas on WebGL failure.
 *   - The mount div has an explicit dark background (#060709) as a CSS fallback.
 *     If WebGL fails, the panel stays dark, not white.
 *   - No external textures, no image assets, no env maps.
 *     Everything is procedural.
 *   - progressRef is read directly in the RAF loop. Zero React re-renders.
 *
 * VISUAL:
 *   - Dark near-black base (metalness ~0.9, no diffuse wash)
 *   - Cylindrical panel geometry (horizontal curvature, like a car door)
 *   - Soft directional key light + sweeping point light
 *   - Clearcoat layer for the glossy top reflection
 *   - Progress 0→1: roughness decreases, reflection tightens, warm accent enters
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Props {
  progressRef: React.MutableRefObject<number>
}

export function ProcessWebGL({ progressRef }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Skip on small screens — the parent section provides a CSS fallback
    if (window.matchMedia('(max-width: 767px)').matches) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // ── Renderer ────────────────────────────────────────────────────────────
    // Three.js creates the canvas. We append it to the mount div.
    // This avoids the "blank white canvas in DOM before WebGL initializes" issue.
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x060709, 1)        // Explicit dark clear color
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const canvas = renderer.domElement
    canvas.style.cssText = 'display:block;width:100%;height:100%;'
    mount.appendChild(canvas)

    // ── Scene ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x060709)

    // ── Camera ───────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0, 4)
    camera.lookAt(0, 0, 0)

    // ── Geometry — cylindrical car-body panel ────────────────────────────────
    // A PlaneGeometry displaced along Z with a cosine curve in the X axis.
    // This simulates the horizontal curvature of a car door or fender.
    // Result: normals fan outward horizontally → the specular highlight
    // appears as a soft elongated HORIZONTAL BAND, not a circular blob.
    const GEO_W = 7
    const GEO_H = 7
    const SEG   = 80
    const geo   = new THREE.PlaneGeometry(GEO_W, GEO_H, SEG, SEG)
    const pos   = geo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      // cos curve peaks at center (x=0), falls off toward edges
      const zX = Math.cos((x / GEO_W) * Math.PI) * 0.5
      // Very subtle vertical arch for depth
      const zY = Math.cos((y / GEO_H) * Math.PI) * 0.08
      pos.setZ(i, zX + zY)
    }
    geo.computeVertexNormals()

    // ── Material — dark metallic clearcoat paint ─────────────────────────────
    // metalness ~0.9: surface has near-zero diffuse response.
    //   Without an env map, the surface reflects the scene background (dark).
    //   Only direct-light specular is visible → dark surface + bright highlights.
    // roughness ~0.16: moderate specular breadth (visible band, not a pinpoint).
    // clearcoat 1.0: always on — second specular layer (the "lacquer" look).
    // clearcoatRoughness: animates downward as scroll progresses (polish stage).
    const mat = new THREE.MeshPhysicalMaterial({
      color:              new THREE.Color(0x0c0e18),
      metalness:          0.90,
      roughness:          0.22,
      clearcoat:          1.0,
      clearcoatRoughness: 0.22,
      reflectivity:       1.0,
    })

    scene.add(new THREE.Mesh(geo, mat))

    // ── Lights ───────────────────────────────────────────────────────────────
    // Extremely dark ambient — just barely lifts the deepest shadows.
    const ambientLight = new THREE.AmbientLight(0x080c12, 2.5)
    scene.add(ambientLight)

    // Primary directional key light — upper-left studio position.
    // This creates the primary specular band on the cylindrical surface.
    const keyLight = new THREE.DirectionalLight(0xfff0e8, 4.0)
    keyLight.position.set(-2.5, 4, 3)
    scene.add(keyLight)

    // Moving softbox — point light that sweeps the panel surface.
    // Its vertical oscillation sweeps the horizontal specular band up/down.
    const softbox = new THREE.PointLight(0xffffff, 5, 20)
    softbox.position.set(0, 1.5, 3.5)
    scene.add(softbox)

    // Subtle warm rim from lower-right for depth
    const rimLight = new THREE.DirectionalLight(0xfff4e0, 0.4)
    rimLight.position.set(3, -2, 2)
    scene.add(rimLight)

    // Amber brand accent — enters quadratically near the end of scroll
    const accentLight = new THREE.PointLight(0xC8A96E, 0, 10)
    accentLight.position.set(-2, 0, 2.5)
    scene.add(accentLight)

    // ── Lerp colours ────────────────────────────────────────────────────────
    const coolKey  = new THREE.Color(0xfff0e8)
    const warmKey  = new THREE.Color(0xfff8f0)

    // ── Resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()   // Run synchronously on mount

    // ── RAF loop ─────────────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    const lp    = THREE.MathUtils.lerp
    let rafId: number

    const tick = () => {
      rafId = requestAnimationFrame(tick)

      const t = clock.getElapsedTime()
      const p = progressRef.current   // 0 → 1, from GSAP ScrollTrigger

      // Material — rougher early stage → polished ceramic at PERFECT
      mat.roughness          = lp(0.22, 0.04, p)
      mat.clearcoatRoughness = lp(0.22, 0.04, p)
      mat.metalness          = lp(0.88, 0.96, p)

      // Key light — sweeps position and warms colour as finish improves
      keyLight.color.lerpColors(coolKey, warmKey, p)
      keyLight.intensity = lp(3.5, 5.5, p)
      keyLight.position.set(lp(-2.5, 1.5, p), lp(4, 2, p), 3)

      // Softbox sweep — vertical oscillation creates horizontal band movement
      if (!prefersReducedMotion) {
        softbox.position.set(
          Math.sin(t * 0.18) * 2.0,           // Slow horizontal drift
          Math.sin(t * 0.27) * 2.5 + 0.5,     // Vertical sweep (main axis)
          lp(3.5, 3.0, p)                      // Comes slightly closer as ceramic
        )
      }
      softbox.intensity = lp(4.5, 7.5, p)

      // Accent amber — enters steeply in the last 25% (PERFECT stage)
      const accentP = Math.max(0, (p - 0.75) * 4)   // 0 before 75%, 0→1 in last 25%
      accentLight.intensity = lp(0, 3.5, accentP * accentP)

      // Camera — very subtle creep forward
      if (!prefersReducedMotion) {
        camera.position.set(
          lp(-0.12, 0.12, p),
          lp( 0.06, -0.04, p),
          lp(4.0, 3.4, p)
        )
        camera.lookAt(0, 0, 0)
      }

      renderer.render(scene, camera)
    }
    tick()

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      // Remove the canvas we appended — avoid DOM leaks on HMR remounts
      if (canvas.parentNode === mount) mount.removeChild(canvas)
    }
  }, [progressRef])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        width:      '100%',
        height:     '100%',
        background: '#060709',   // CSS fallback — always dark even if WebGL fails
        overflow:   'hidden',
      }}
    />
  )
}
