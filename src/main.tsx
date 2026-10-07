import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// StrictMode removed: it double-mounts all effects in development, which
// causes GSAP ScrollTrigger to be created, destroyed, and recreated — leaving
// stale scroll positions and incorrect initial state. The GSAP/ScrollTrigger
// setup is incompatible with StrictMode's intentional effect double-firing.
createRoot(document.getElementById('root')!).render(
  <App />
)
