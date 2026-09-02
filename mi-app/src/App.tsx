import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import PrimerosPasosPage from './pages/PrimerosPasosPage'
import { HomePage } from './pages/HomePage'
import { QueEsPage } from './pages/QueEsPage'
import { SintaxisPage } from './pages/SintaxisPage'
import { DesarrolloPage } from './pages/DesarrolloPage'

const navItems = [
  { path: '/', label: 'Inicio' },
  { path: '/que-es', label: 'Qué es TzLang' },
  { path: '/sintaxis', label: 'Sintaxis' },
  { path: '/primeros-pasos', label: 'Primeros pasos' },
  { path: '/desarrollo', label: 'Desarrollo' },
]

function Header() {
  const location = useLocation()
  
  return (
    <header className="header">
      <nav className="nav container" role="navigation" aria-label="Navegación principal">
        <Link to="/" className="logo" aria-label="TzLang - Inicio">
          <span className="logo-icon" aria-hidden="true">Tz</span>
          <span className="logo-text">TzLang</span>
        </Link>
        <button className="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <ul className="nav-links" id="nav-menu" role="menubar">
          {navItems.map(item => (
            <li key={item.path} role="none">
              <Link 
                to={item.path} 
                role="menuitem"
                className={location.pathname === item.path ? 'active' : ''}
                onClick={() => closeMobileMenu()}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <a href="https://github.com/TzLanguaje/TzLanguaje" target="_blank" rel="noopener noreferrer" className="btn btn-github" aria-label="Ver en GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </nav>
    </header>
  )
}

function closeMobileMenu() {
  const navMenu = document.getElementById('nav-menu')
  const navToggle = document.querySelector('.nav-toggle')
  if (navMenu && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open')
    navToggle?.setAttribute('aria-expanded', 'false')
  }
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <p>TzLang • Lenguaje de programación educativo en español</p>
        <p>Construido en C11 • Licencia MIT</p>
        <p className="footer-signature"><a href="https://github.com/Mk1-mid" target="_blank" rel="noopener noreferrer">Mk1-mid</a></p>
        <a href="https://github.com/TzLanguaje/TzLanguaje" target="_blank" rel="noopener noreferrer">
          Ver en GitHub
        </a>
      </div>
    </footer>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Matrix pixel rain effect
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.className = 'matrix-bg'
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '0'
    canvas.style.opacity = '0.35'
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let columns = 0
    let drops: number[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      const fontSize = 5
      columns = Math.floor(width / fontSize)
      drops = Array(columns).fill(0).map(() => Math.random() * -height)
    }

    resize()
    window.addEventListener('resize', resize)

    const colors = [
      'rgba(168, 85, 247, 0.9)',   // purple - bright
      'rgba(192, 132, 252, 0.9)',  // purple-400 - brighter
      'rgba(221, 214, 254, 0.85)', // purple-200 - very bright
      'rgba(245, 243, 255, 0.8)',  // purple-100 - almost white
      'rgba(232, 232, 240, 0.8)',  // light
    ]

    const draw = () => {
      if (!ctx) return
      
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(13, 13, 20, 0.1)'
      ctx.fillRect(0, 0, width, height)

      const fontSize = 5
      
      for (let i = 0; i < columns; i++) {
        // Random pixel color
        const color = colors[Math.floor(Math.random() * colors.length)]
        ctx.fillStyle = color
        
        // Draw a small square (pixel)
        const x = i * fontSize
        const y = drops[i] * fontSize
        
        // Draw 1-3 pixel blocks
        const blockHeight = fontSize * (Math.random() * 2 + 1)
        ctx.fillRect(x, y, fontSize, blockHeight)

        // Move drop down
        if (y > height) {
          drops[i] = 0
        } else {
          drops[i]++
        }
        
        // Random reset
        if (Math.random() > 0.995) {
          drops[i] = 0
        }
      }
    }

    const interval = setInterval(draw, 50)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
      document.body.removeChild(canvas)
    }
  }, [])

  useEffect(() => {
    const navToggle = document.querySelector('.nav-toggle')
    const navMenu = document.getElementById('nav-menu')
    
    const handleToggle = () => {
      const isOpen = !mobileMenuOpen
      setMobileMenuOpen(isOpen)
      navToggle?.setAttribute('aria-expanded', isOpen.toString())
      navMenu?.classList.toggle('open', isOpen)
    }

    navToggle?.addEventListener('click', handleToggle)
    
    navMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        setMobileMenuOpen(false)
        navToggle?.setAttribute('aria-expanded', 'false')
        navMenu?.classList.remove('open')
      })
    })

    return () => {
      navToggle?.removeEventListener('click', handleToggle)
    }
  }, [mobileMenuOpen])

  return (
    <>
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/que-es" element={
          <Layout>
            <QueEsPage />
          </Layout>
        } />
        <Route path="/sintaxis" element={
          <Layout>
            <SintaxisPage />
          </Layout>
        } />
        <Route path="/desarrollo" element={
          <Layout>
            <DesarrolloPage />
          </Layout>
        } />
        <Route path="/primeros-pasos" element={
          <Layout>
            <PrimerosPasosPage />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
