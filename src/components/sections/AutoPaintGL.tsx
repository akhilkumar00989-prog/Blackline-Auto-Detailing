/**
 * BLACKLINE — AutoPaintGL (Step 2: Realistic Automotive Paint Visual)
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Procedural studio strip softbox texture: elongated diffused light bank
function createSoftboxTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Smooth studio light bank: bright core in center, feathered edges
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
  grad.addColorStop(0.0, 'rgba(0, 0, 0, 0)')
  grad.addColorStop(0.18, 'rgba(245, 242, 235, 0.12)')
  grad.addColorStop(0.38, 'rgba(255, 252, 245, 0.75)')
  grad.addColorStop(0.50, 'rgba(255, 255, 255, 1.0)')
  grad.addColorStop(0.62, 'rgba(255, 252, 245, 0.75)')
  grad.addColorStop(0.82, 'rgba(245, 242, 235, 0.12)')
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Feather the horizontal ends so it looks like a refined rectangular softbox
  const hGrad = ctx.createLinearGradient(0, 0, canvas.width, 0)
  hGrad.addColorStop(0.0, 'rgba(0, 0, 0, 1.0)')
  hGrad.addColorStop(0.06, 'rgba(0, 0, 0, 0.0)')
  hGrad.addColorStop(0.94, 'rgba(0, 0, 0, 0.0)')
  hGrad.addColorStop(1.0, 'rgba(0, 0, 0, 1.0)')

  ctx.globalCompositeOperation = 'destination-out'
  ctx.fillStyle = hGrad
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

// Geometry: Sculpted luxury automotive bodywork (hood / front shoulder section)
function buildAutomotivePanelGeometry(): THREE.BufferGeometry {
  const WIDTH = 8.0
  const HEIGHT = 5.2
  const SEG_X = 220
  const SEG_Y = 180

  const geo = new THREE.PlaneGeometry(WIDTH, HEIGHT, SEG_X, SEG_Y)
  const pos = geo.attributes.position as THREE.BufferAttribute

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) // -4.0 to +4.0
    const y = pos.getY(i) // -2.6 to +2.6

    const u = x / (WIDTH * 0.5)  // -1 to +1
    const v = y / (HEIGHT * 0.5) // -1 to +1

    // 1. Long horizontal crown (fender curve)
    const bow = 0.35 * Math.cos(u * Math.PI * 0.42)

    // 2. Pronounced vertical crown peaking around v = 0.08
    // Above this crest, the surface curves away over the hood into the dark ceiling.
    // Below this crest, the surface drops down the body flank into the dark ground.
    const crestY = 0.08 + u * 0.05
    const dy = v - crestY
    const crown = 0.42 * Math.cos(dy * Math.PI * 0.48)

    // 3. Crisp automotive character line (shoulder crease)
    const swage = 0.028 * Math.exp(-((dy / 0.08) ** 2))

    // 4. Smooth roll-off at outer boundaries
    const edgeDist = Math.max(Math.abs(u), Math.abs(v))
    const edgeRoll = -0.32 * Math.pow(Math.max(0, edgeDist - 0.72) / 0.28, 2)

    pos.setZ(i, bow + crown + swage + edgeRoll)
  }

  geo.computeVertexNormals()
  return geo
}

// Procedural studio environment map with softbox light banks
function buildStudioEnvironment(renderer: THREE.WebGLRenderer): {
  envTexture: THREE.Texture
  dispose: () => void
} {
  const envScene = new THREE.Scene()
  envScene.background = new THREE.Color(0x000000) // Pure black background

  const disposables: { dispose: () => void }[] = []
  const softboxTexture = createSoftboxTexture()
  disposables.push(softboxTexture)

  // 1. Primary studio softbox bank
  // Placed at the reflection angle of the crest: Y=1.8, Z=5.6
  // This causes the reflection band to sit cleanly across the center/upper-third,
  // leaving pitch black paint both above and below it!
  const sbGeo = new THREE.PlaneGeometry(16.0, 2.2)
  const sbMat = new THREE.MeshBasicMaterial({
    map: softboxTexture,
    color: new THREE.Color(20.0, 19.5, 18.8), // High HDR luminance
    side: THREE.DoubleSide,
    transparent: true,
  })
  const sbMesh = new THREE.Mesh(sbGeo, sbMat)
  sbMesh.position.set(0.0, 1.8, 5.6)
  sbMesh.lookAt(0, 0, 0)
  sbMesh.rotateZ(0.04) // Slight angle echoing the bodywork crease
  envScene.add(sbMesh)
  disposables.push(sbGeo, sbMat)

  // 2. Very subtle ambient horizon kick (barely lifts bottom flank)
  const kickGeo = new THREE.PlaneGeometry(12.0, 1.2)
  const kickMat = new THREE.MeshBasicMaterial({
    map: softboxTexture,
    color: new THREE.Color(1.2, 1.15, 1.1),
    side: THREE.DoubleSide,
    transparent: true,
  })
  const kickMesh = new THREE.Mesh(kickGeo, kickMat)
  kickMesh.position.set(0.0, -2.8, 5.2)
  kickMesh.lookAt(0, 0, 0)
  envScene.add(kickMesh)
  disposables.push(kickGeo, kickMat)

  const pmrem = new THREE.PMREMGenerator(renderer)
  const envRT = pmrem.fromScene(envScene, 0.04)
  pmrem.dispose()

  return {
    envTexture: envRT.texture,
    dispose: () => {
      envRT.dispose()
      disposables.forEach((d) => d.dispose())
    },
  }
}

export function AutoPaintGL() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Renderer ─────────────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      })
    } catch {
      console.warn('[AutoPaintGL] WebGL context initialization failed, CSS fallback active.')
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x060709, 1) // Seamless with site background
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const canvas = renderer.domElement
    canvas.style.cssText = 'display:block;position:absolute;inset:0;width:100%;height:100%;'
    mount.appendChild(canvas)

    // ── Scene ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x060709)

    // Procedural HDR studio environment
    const { envTexture, dispose: disposeEnv } = buildStudioEnvironment(renderer)
    scene.environment = envTexture

    // Very subtle non-directional ambient
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.015)
    scene.add(ambientLight)

    // ── Camera ───────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40)
    const baseCamPos = new THREE.Vector3(0.0, 0.1, 4.8)
    const targetPos = new THREE.Vector3(0.0, 0.0, 0.0)
    camera.position.copy(baseCamPos)
    camera.lookAt(targetPos)

    // ── Material: Deep Gloss Automotive Clearcoat Paint ──────────────────────
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x040507), // Inky obsidian black
      metalness: 0.92,                  // Authentic metallic paint base
      roughness: 0.12,                  // Satin metallic flake under clearcoat
      clearcoat: 1.0,                   // 100% thick glossy lacquer coat
      clearcoatRoughness: 0.07,         // Restrained, velvety studio reflection band
      reflectivity: 1.0,
      envMapIntensity: 1.0,
    })

    // ── Mesh ─────────────────────────────────────────────────────────────────
    const geo = buildAutomotivePanelGeometry()
    const mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.set(-0.06, 0.04, -0.01)
    mesh.position.set(0.0, 0.0, 0)
    scene.add(mesh)

    // ── Mouse / Pointer Parallax Interaction ─────────────────────────────────
    let targetPointerX = 0
    let targetPointerY = 0
    let currPointerX = 0
    let currPointerY = 0

    const handlePointerMove = (e: MouseEvent) => {
      // Normalize to -1 to +1
      targetPointerX = (e.clientX / window.innerWidth) * 2 - 1
      targetPointerY = (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    // ── Resize ───────────────────────────────────────────────────────────────
    let hasSize = false
    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (w <= 0 || h <= 0) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h

      // Keep panel framing comfortable across all screen aspect ratios
      const fit = Math.max(1, 1.45 / camera.aspect)
      camera.position.set(
        baseCamPos.x * fit,
        baseCamPos.y * fit,
        baseCamPos.z * fit
      )
      camera.lookAt(targetPos)
      camera.updateProjectionMatrix()
      hasSize = true
    }

    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()

    // ── Animation Loop ───────────────────────────────────────────────────────
    const startTime = performance.now()
    let rafId = 0

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      if (!hasSize) return

      // Smooth dampening towards pointer position
      currPointerX += (targetPointerX - currPointerX) * 0.04
      currPointerY += (targetPointerY - currPointerY) * 0.04

      if (!reduced) {
        const elapsed = (performance.now() - startTime) / 1000

        // Gentle autonomous studio light drift
        const autoShiftX = Math.sin(elapsed * 0.10) * 0.12
        const autoShiftY = Math.cos(elapsed * 0.07) * 0.05

        // Pointer movement subtly shifts the reflected highlight across the paint
        const pointerShiftX = currPointerX * 0.16
        const pointerShiftY = -currPointerY * 0.10

        scene.environmentRotation.y = autoShiftX + pointerShiftX
        scene.environmentRotation.x = autoShiftY + pointerShiftY

        // Sub-millimeter parallax
        camera.position.x = baseCamPos.x + currPointerX * 0.04
        camera.position.y = baseCamPos.y + -currPointerY * 0.03
        camera.lookAt(targetPos)
      }

      renderer.render(scene, camera)
    }

    tick()

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', handlePointerMove)
      ro.disconnect()
      geo.dispose()
      mat.dispose()
      disposeEnv()
      renderer.dispose()
      if (canvas.parentNode === mount) {
        mount.removeChild(canvas)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background: '#060709',
        overflow: 'hidden',
      }}
    />
  )
}
