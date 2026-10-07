/**
 * BLACKLINE AUTO DETAILING - Interactive Automotive Paint Visual (Stage 3A)
 *
 * Approach:
 *   - The real high-quality automotive lacquer photograph (process-detail.jpg)
 *     is the PRIMARY visual content.
 *   - Three.js provides a subtle interactive 2.5D depth, gentle perspective tilt,
 *     mouse parallax, and interactive reflection gleam that sweeps across the
 *     photograph's natural light streaks.
 *   - GSAP ScrollTrigger connects smoothly to the 4 process stages:
 *       01 CLEAN   -> Deep, wet base photograph
 *       02 CORRECT -> Heightened clarity, reflections pop
 *       03 PROTECT -> Ceramic quartz depth and contrast
 *       04 PERFECT -> Maximum optical luster, pristine highlights
 *   - No floating geometric light bars, no flat grey planes, 100% authentic photograph.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const DETAIL_IMAGE = '/images/process-detail.jpg'

// ── Custom Shader: Photo-Primary with Interactive Sheen & Parallax ───────────
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uStage;
  uniform float uContrast;
  uniform float uSheenStrength;
  uniform float uExposure;
  uniform float uScrollY;

  varying vec2 vUv;

  void main() {
    // 1. Precise aspect-cover UV calculation matching object-fit: cover
    float canvasAspect = uResolution.x / uResolution.y;
    float imageAspect = uImageResolution.x / uImageResolution.y;

    vec2 ratio = vec2(
      min(canvasAspect / imageAspect, 1.0),
      min((1.0 / canvasAspect) / (1.0 / imageAspect), 1.0)
    );

    vec2 baseUv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // 2. Subtle 2.5D mouse parallax & scroll displacement
    vec2 parallaxUv = baseUv + uMouse * 0.015 + vec2(0.0, uScrollY * 0.030);

    // Clamp UVs to avoid edge bleed
    parallaxUv = clamp(parallaxUv, vec2(0.001), vec2(0.999));

    // Sample the high-resolution photograph
    vec4 photo = texture2D(uTexture, parallaxUv);

    // 3. Highlight mask: detect the natural reflection streaks in the photograph
    float lum = dot(photo.rgb, vec3(0.299, 0.587, 0.114));
    float streakMask = smoothstep(0.22, 0.78, lum);

    // 4. Subtle interactive sheen sweeping across the natural light streaks
    // The photograph's streaks run at an angle across the frame
    float diag = parallaxUv.x * 0.62 - parallaxUv.y * 0.62;
    float sheenCenter = sin(uTime * 0.28) * 0.10 + (uMouse.x - uMouse.y) * 0.08;
    float sheen = exp(-pow((diag - sheenCenter) / 0.15, 2.0));

    // Refined daylight gleam: only illuminates existing light reflections, leaving black paint pure
    vec3 gleam = vec3(1.0, 0.98, 0.95) * sheen * streakMask * uSheenStrength;

    // 5. Composite photo with interactive light response
    vec3 color = photo.rgb + gleam;

    // 6. Stage-driven contrast & optical exposure
    // Keep black point anchored around 0.12 so lacquer stays deep obsidian
    color = (color - 0.12) * uContrast + 0.12;
    color *= uExposure;

    // Ensure velvety deep blacks never clip upwards
    color = max(color, vec3(0.0));

    gl_FragColor = vec4(color, 1.0);
  }
`

interface AutomotivePaintGLProps {
  scrollTriggerRef?: React.RefObject<HTMLDivElement | null>
}

export function AutomotivePaintGL({ scrollTriggerRef }: AutomotivePaintGLProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── WebGL Renderer ───────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      })
    } catch {
      console.warn('[AutomotivePaintGL] WebGL unavailable, static image active.')
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x060709, 1.0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const canvas = renderer.domElement
    canvas.style.cssText = 'display:block;position:absolute;inset:0;width:100%;height:100%;pointer-events:none;'
    mount.appendChild(canvas)

    // ── Scene & Camera ───────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x060709)

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20)
    camera.position.set(0, 0, 3.2)
    camera.lookAt(0, 0, 0)

    // ── Render Helper (Declared early to ensure availability across all callbacks) ───
    let hasSize = false
    function renderOnce() {
      if (!hasSize || !renderer) return
      renderer.render(scene, camera)
    }

    // ── Texture Loading ──────────────────────────────────────────────────────
    const textureLoader = new THREE.TextureLoader()
    const imageTexture = textureLoader.load(DETAIL_IMAGE, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.generateMipmaps = true
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.magFilter = THREE.LinearFilter
      if (material) {
        material.uniforms.uImageResolution.value.set(tex.image.width, tex.image.height)
      }
      renderOnce()
    })

    // ── Shader Material ──────────────────────────────────────────────────────
    const uniforms = {
      uTexture:         { value: imageTexture },
      uResolution:      { value: new THREE.Vector2(1, 1) },
      uImageResolution: { value: new THREE.Vector2(1264, 848) },
      uMouse:           { value: new THREE.Vector2(0, 0) },
      uTime:            { value: 0 },
      uStage:           { value: 0 },
      uContrast:        { value: 1.02 },
      uSheenStrength:   { value: 0.25 },
      uExposure:        { value: 1.00 },
      uScrollY:         { value: 0 },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })

    // ── Plane Mesh with Subtle Depth Curved Geometry ─────────────────────────
    const geo = new THREE.PlaneGeometry(2.0, 2.0, 48, 48)
    const pos = geo.attributes.position as THREE.BufferAttribute

    // Very subtle cylindrical body curve: edges curve back slightly (-0.08 units)
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const dist = Math.sqrt(x * x + y * y)
      pos.setZ(i, -0.06 * Math.pow(dist / 1.414, 2))
    }
    geo.computeVertexNormals()

    const mesh = new THREE.Mesh(geo, material)
    scene.add(mesh)

    // ── Mouse / Desktop Parallax Tracking ────────────────────────────────────
    let targetPointerX = 0
    let targetPointerY = 0
    let currPointerX = 0
    let currPointerY = 0

    const handlePointerMove = (e: MouseEvent) => {
      targetPointerX = (e.clientX / window.innerWidth) * 2 - 1
      targetPointerY = (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    // ── ScrollTrigger Stage Transitions ──────────────────────────────────────
    let st: ScrollTrigger | null = null
    const triggerElement = scrollTriggerRef?.current || mount

    st = ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress // 0.0 to 1.0

        // Subtly enhance contrast, sheen, and exposure across the 4 stages:
        // CLEAN   (0.00): Base photograph, deep wet lacquer tone
        // CORRECT (0.33): Clarified highlights, swirls vanished
        // PROTECT (0.66): Ceramic quartz depth, higher contrast
        // PERFECT (1.00): Maximum optical clarity, mirror gloss
        const targetContrast   = gsap.utils.interpolate([1.02, 1.08, 1.15, 1.22], p)
        const targetExposure   = gsap.utils.interpolate([1.00, 1.03, 1.06, 1.10], p)
        const targetSheen      = gsap.utils.interpolate([0.22, 0.32, 0.42, 0.55], p)
        const targetScrollY    = gsap.utils.interpolate([-0.3, -0.1, 0.1, 0.3], p)

        uniforms.uStage.value         = p
        uniforms.uContrast.value      = targetContrast
        uniforms.uExposure.value      = targetExposure
        uniforms.uSheenStrength.value = targetSheen
        uniforms.uScrollY.value       = targetScrollY

        if (reduced) renderOnce()
      },
    })

    // ── Resize Observer ──────────────────────────────────────────────────────
    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (w <= 0 || h <= 0) return

      renderer.setSize(w, h, false)
      camera.aspect = w / h

      // Fit the quad in perspective camera view
      const vFovRad = (camera.fov * Math.PI) / 180
      const visibleHeight = 2 * Math.tan(vFovRad / 2) * camera.position.z
      const visibleWidth = visibleHeight * camera.aspect

      // Scale mesh to fully cover visible frustum with margin for parallax
      const scaleX = Math.max(visibleWidth, visibleHeight * (1264 / 848)) * 0.55
      const scaleY = scaleX / camera.aspect
      mesh.scale.set(scaleX, scaleY, 1)

      uniforms.uResolution.value.set(w, h)
      camera.updateProjectionMatrix()
      hasSize = true
      renderOnce()
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

      // Damped pointer follow
      currPointerX += (targetPointerX - currPointerX) * 0.05
      currPointerY += (targetPointerY - currPointerY) * 0.05

      const elapsed = (performance.now() - startTime) / 1000
      uniforms.uTime.value = elapsed

      if (!reduced) {
        uniforms.uMouse.value.set(currPointerX, currPointerY)

        // Subtle 3D perspective rotation of the panel
        mesh.rotation.y = currPointerX * 0.035
        mesh.rotation.x = -currPointerY * 0.025

        // Camera sub-millimeter parallax
        camera.position.x = currPointerX * 0.03
        camera.position.y = -currPointerY * 0.02
        camera.lookAt(0, 0, 0)
      }

      renderer.render(scene, camera)
    }

    if (!reduced) {
      tick()
    } else {
      renderOnce()
    }

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', handlePointerMove)
      ro.disconnect()
      if (st) st.kill()

      geo.dispose()
      material.dispose()
      imageTexture.dispose()
      renderer.dispose()

      if (canvas.parentNode === mount) {
        mount.removeChild(canvas)
      }
    }
  }, [scrollTriggerRef])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#060709]"
    />
  )
}
