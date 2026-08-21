import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import './App.css'

// ============================================
// SHARED CONSTANTS & COMPONENTS
// ============================================

const navItems = [
  { path: '/', label: 'Inicio' },
  { path: '/que-es', label: 'Qué es TzLang' },
  { path: '/sintaxis', label: 'Sintaxis' },
  { path: '/desarrollo', label: 'Desarrollo' },
]

const CODE_COMPARISON = `variable edad = 20

si edad es mayor o igual que 18
    imprimir "Mayor de edad"
sino
    imprimir "Menor de edad"
fin
// Mayor de edad`

const CODE_MIXED = `variable edad = 20

imprimir edad es mayor que 18
imprimir edad > 18
// verdadero
// verdadero`

const CODE_LOGICAL = `variable edad = 20
variable tiene_documento = verdadero

si (edad es mayor o igual que 18) y (tiene_documento)
    imprimir "Puede entrar"
fin

si no (edad es igual a 30)
    imprimir "No tiene 30"
fin
// Puede entrar
// No tiene 30`

const CODE_FULL = `// Clasificar estudiantes por su nota

funcion clasificar(nota)
    si nota es mayor o igual que 90
        retornar "Sobresaliente"
    fin
    si nota es mayor o igual que 70
        retornar "Aprobado"
    fin
    si nota es mayor o igual que 50
        retornar "Justo"
    fin
    retornar "Suspenso"
fin

variable estudiantes = [
    {"nombre": "Ana", "nota": 95},
    {"nombre": "Carlos", "nota": 72},
    {"nombre": "Lucia", "nota": 48}
]

variable aprobados = 0

para cada estudiante en estudiantes
    variable nombre = estudiante["nombre"]
    variable nota = estudiante["nota"]
    variable resultado = clasificar(nota)

    imprimir nombre + ": " + resultado

    si nota es mayor o igual que 70
        aprobados = aprobados + 1
    fin
fin

imprimir "Aprobados: " + texto(aprobados) + " de " + texto(largo(estudiantes))
// Ana: Sobresaliente
// Carlos: Aprobado
// Lucia: Suspenso
// Aprobados: 2 de 3`

const CODE_CHECK = `tz --version
# TzLang 0.3.4`

const CODE_VARIABLES = `variable nombre = "Carlos"
variable edad = 20

edad = edad + 1
imprimir edad
// 21`

const CODE_TIPOS = `imprimir tipo(42)        // numero
imprimir tipo(3.14)      // decimal
imprimir tipo("Hola")    // texto
imprimir tipo(verdadero) // booleano
imprimir tipo(nulo)      // nulo
imprimir tipo([1, 2, 3]) // lista
imprimir tipo({"a": 1})  // diccionario`

const CODE_ESCAPES = `imprimir "Dice \"hola\""
imprimir "uno\ndos"
imprimir "columna1\tcolumna2"
imprimir "ruta\\archivo"`

const CODE_OPERADORES = `imprimir 7 + 3    // 10
imprimir 7 - 3    // 4
imprimir 7 * 3    // 21
imprimir 7 / 3    // 2 (trunca hacia cero)
imprimir 7 % 3    // 1 (resto)
imprimir 7.0 / 2  // 3.5
imprimir -5       // -5
imprimir 2 + 3 * 4  // 14
imprimir (2 + 3) * 4 // 20`

const CODE_CONDICIONALES = `variable nota = 85

si nota es mayor o igual que 90
    imprimir "Sobresaliente"
sino si nota es mayor o igual que 70
    imprimir "Aprobado"
sino si nota es mayor o igual que 50
    imprimir "Justo"
sino
    imprimir "Puede mejorar"
fin`

const CODE_BUCLES = `variable i = 1

mientras i es menor o igual que 3
    imprimir i
    i = i + 1
fin
// 1
// 2
// 3

variable frutas = ["manzana", "pera", "uva"]

para cada fruta en frutas
    imprimir fruta
fin
// manzana
// pera
// uva`

const CODE_BREAK_CONTINUE = `variable n = 0

mientras verdadero
    n = n + 1
    si n es igual a 2
        continuar
    fin
    si n es mayor que 4
        romper
    fin
    imprimir n
fin
// 1
// 3
// 4`

const CODE_FUNCIONES = `funcion sumar(a, b)
    retornar a + b
fin

imprimir sumar(10, 20)
// 30

funcion factorial(n)
    si n es menor o igual que 1
        retornar 1
    fin
    retornar n * factorial(n - 1)
fin

imprimir factorial(5)
// 120`

const CODE_LISTAS = `variable numeros = [1, 2, 3]

imprimir numeros[0]      // 1
imprimir numeros[-1]     // 3 (índice negativo)
imprimir largo(numeros)  // 3

numeros[1] = 99
agregar(numeros, 4)
imprimir numeros         // [1, 99, 3, 4]

eliminar(numeros, 0)
imprimir numeros         // [99, 3, 4]

// Concatenación de listas
imprimir [1, 2] + [3, 4]  // [1, 2, 3, 4]`

const CODE_DICCIONARIOS = `variable persona = {
    "nombre": "Carlos",
    "edad": 20
}

imprimir persona["nombre"]  // Carlos

persona["edad"] = 21
persona["pais"] = "Colombia"

imprimir persona                    // {"nombre": "Carlos", "edad": 21, "pais": "Colombia"}
imprimir claves(persona)            // ["nombre", "edad", "pais"]
imprimir valores(persona)           // ["Carlos", 21, "Colombia"]`

const CODE_COPIA = `variable a = {"datos": {"edad": 20}}
variable b = a

b["datos"]["edad"] = 99

imprimir a["datos"]["edad"]  // 20 (no cambió)
imprimir b["datos"]["edad"]  // 99`

const CODE_ENTRADA = `variable nombre = entrada("¿Cómo te llamas? ")
imprimir "Hola, " + nombre

variable edad = numero(entrada("¿Cuántos años tienes? "))
imprimir "El año que viene tendrás " + texto(edad + 1)
// ¿Cómo te llamas? Ana
// Hola, Ana
// ¿Cuántos años tienes? 30
// El año que viene tendrás 31`

const CODE_ERRORS = `imprimir 10 / 0
// Error: división por cero.
// La ejecución falló.

imprimir desconocida
// Error: variable 'desconocida' no existe.
// La ejecución falló.`

const CODE_PROJECT = `TzLang/
│
├── src/
│   ├── lexer/          lexer.c / lexer.h
│   ├── parser/         parser.c / parser.h
│   ├── ast/            ast.c / ast.h
│   ├── interpreter/    interpreter.c / interpreter.h
│   ├── runtime/        value.c / operations.c
│   ├── diagnostic/     notas de diagnóstico por categoría
│   ├── io/             file.c / console.c
│   ├── main.c          punto de entrada y CLI
│   └── version.h       número de versión
│
├── examples/           programas de ejemplo
├── education/          cinco lecciones con salida esperada
│                       y el prompt generador de ejercicios
├── docs/
│   └── language.md     referencia completa del lenguaje
│
├── tests/
│   ├── run_tests.sh              suite principal
│   └── run_education_tests.sh    suite educativa
│
├── .github/workflows/
│   ├── ci.yml          compila y prueba en los tres sistemas
│   └── release.yml     publica los binarios al etiquetar
│
├── packaging/
│   ├── macos/          instalador .pkg con asistente
│   ├── windows/        instalador .exe con asistente (Inno Setup)
│   ├── linux/          paquetes .deb y .rpm
│   ├── npm/            paquetes de npm y su lanzador
│   ├── homebrew/       plantilla de la formula de Homebrew
│   └── scoop/          plantilla del manifiesto de Scoop
│
├── scripts/
│   └── subir-version.sh
│
├── install.sh          instalador para macOS y Linux
├── install.ps1         instalador para Windows
│
├── CMakeLists.txt      build multiplataforma
├── Makefile            build de desarrollo (Unix)
├── LICENSE
└── README.md`

const CODE_TESTS = `make test
========================================
Tests:  163
Passed: 163
Failed: 0
========================================

All tests passed.`

const CODE_EDUCATION = `make test-education
=== TzLang Education Suite ===

[PASS] 01_variables
[PASS] 02_tipos
[PASS] 03_control
[PASS] 04_funciones
[PASS] 05_estructuras

========================================
Tests:  5
Passed: 5
Failed: 0
========================================

All education tests passed.`

const HERO_SNIPPETS = [
  {
    label: 'Variables y tipos',
    lines: [
      'variable nombre = "Ana"',
      'variable edad = 20',
      'variable activo = verdadero',
      'imprimir tipo(edad)  // numero'
    ]
  },
  {
    label: 'Condicionales en español',
    lines: [
      'variable nota = 85',
      '',
      'si nota es mayor o igual que 90',
      '    imprimir "Sobresaliente"',
      'sino si nota es mayor o igual que 70',
      '    imprimir "Aprobado"',
      'sino',
      '    imprimir "Justo"',
      'fin'
    ]
  },
  {
    label: 'Bucles y listas',
    lines: [
      'variable frutas = ["manzana", "pera", "uva"]',
      '',
      'para cada fruta en frutas',
      '    imprimir fruta',
      'fin',
      '',
      '// Índices negativos',
      'imprimir frutas[-1]  // uva'
    ]
  },
  {
    label: 'Funciones y recursión',
    lines: [
      'funcion factorial(n)',
      '    si n es menor o igual que 1',
      '        retornar 1',
      '    fin',
      '    retornar n * factorial(n - 1)',
      'fin',
      '',
      'imprimir factorial(5)  // 120'
    ]
  },
  {
    label: 'Diccionarios anidados',
    lines: [
      'variable estudiante = {',
      '    "nombre": "Carlos",',
      '    "notas": [90, 85, 95]',
      '}',
      '',
      'imprimir estudiante["notas"][0]  // 90'
    ]
  },
  {
    label: 'Operador resto (%)',
    lines: [
      'imprimir 7 % 3    // 1',
      'imprimir 10 % 4   // 2',
      '',
      '// Útil para par/impar',
      'si 7 % 2 es igual a 0',
      '    imprimir "par"',
      'sino',
      '    imprimir "impar"',
      'fin'
    ]
  },
  {
    label: 'Entrada del usuario',
    lines: [
      'variable nombre = entrada("Nombre: ")',
      'imprimir "Hola, " + nombre',
      '',
      'variable edad = numero(entrada("Edad: "))',
      'imprimir "El año que viene: " + texto(edad + 1)'
    ]
  },
  {
    label: 'Escape en textos',
    lines: [
      'imprimir "Dice \"hola\""',
      'imprimir "uno\ndos\ntres"',
      'imprimir "col1\tcol2\tcol3"'
    ]
  }
]

// ============================================
// ANIMATED HERO CODE COMPONENT (Terminal Style)
// ============================================

function HeroCodeAnimated() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayLines, setDisplayLines] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const lineIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentSnippet = HERO_SNIPPETS[currentIndex]
  const codeLines = currentSnippet.lines

  // Blinking cursor
  useEffect(() => {
    intervalRef.current = setInterval(() => setShowCursor(prev => !prev), 530)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  // Typing animation logic - slower for readability
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    const typeNext = () => {
      if (isDeleting) {
        if (charIndexRef.current > 0) {
          charIndexRef.current--
          setDisplayLines(prev => {
            const newLines = [...prev]
            const currentLine = lineIndexRef.current
            newLines[currentLine] = codeLines[currentLine].slice(0, charIndexRef.current)
            return newLines
          })
          timeoutRef.current = window.setTimeout(typeNext, 25)
        } else if (lineIndexRef.current > 0) {
          lineIndexRef.current--
          charIndexRef.current = codeLines[lineIndexRef.current].length
          setDisplayLines(prev => prev.slice(0, -1))
          timeoutRef.current = window.setTimeout(typeNext, 25)
        } else {
          setIsDeleting(false)
          setCurrentIndex(prev => (prev + 1) % HERO_SNIPPETS.length)
          lineIndexRef.current = 0
          charIndexRef.current = 0
          setDisplayLines([])
          timeoutRef.current = window.setTimeout(typeNext, 800)
        }
      } else {
        if (lineIndexRef.current < codeLines.length) {
          const currentLine = codeLines[lineIndexRef.current]
          if (charIndexRef.current < currentLine.length) {
            charIndexRef.current++
            setDisplayLines(prev => {
              const newLines = [...prev]
              newLines[lineIndexRef.current] = currentLine.slice(0, charIndexRef.current)
              return newLines
            })
            timeoutRef.current = window.setTimeout(typeNext, 35)
          } else {
            lineIndexRef.current++
            charIndexRef.current = 0
            if (lineIndexRef.current < codeLines.length) {
              setDisplayLines(prev => [...prev, ''])
            }
            timeoutRef.current = window.setTimeout(typeNext, 200)
          }
        } else {
          // All lines typed - wait longer (5 seconds) before deleting
          timeoutRef.current = window.setTimeout(() => {
            setIsDeleting(true)
            typeNext()
          }, 5000)
        }
      }
    }
    
    typeNext()

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, codeLines, isDeleting])

  return (
    <div className="hero-code-animated" role="region" aria-label="Ejemplos de código TzLang">
      <div className="animated-code-header">
        <span className="code-badge">{currentSnippet.label}</span>
        <div className="code-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </div>
      <pre className="animated-code-block"><code>
        {displayLines.map((line, i) => (
          <div key={i} className="code-line">
            <span className="line-number">{i + 1}</span>
            <span className="line-content">{line || ' '}</span>
          </div>
        ))}
        {!isDeleting && displayLines.length > 0 && (
          <div className="code-line cursor-line">
            <span className="line-number">{displayLines.length}</span>
            <span className="line-content">
              {showCursor && <span className="cursor" aria-hidden="true">▋</span>}
            </span>
          </div>
        )}
      </code></pre>
      <div className="examples-indicator" aria-label="Ejemplo {currentIndex + 1} de {HERO_SNIPPETS.length}">
        {HERO_SNIPPETS.map((_, i) => (
          <button
            key={i}
            className={`indicator-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setCurrentIndex(i)
              lineIndexRef.current = 0
              charIndexRef.current = 0
              setDisplayLines([])
              setIsDeleting(false)
            }}
            aria-label={`Ver ejemplo ${i + 1}: ${HERO_SNIPPETS[i].label}`}
            aria-current={i === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  )
}

// ============================================
// LAYOUT COMPONENTS
// ============================================

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
        <a href="https://github.com/TzLanguaje/TzLanguaje" target="_blank" rel="noopener noreferrer">
          Ver en GitHub
        </a>
      </div>
    </footer>
  )
}

// ============================================
// SHARED UI COMPONENTS
// ============================================

function SectionTitle({ title, description, id }: { title: string; description?: string; id?: string }) {
  return (
    <div className="section-header">
      <h2 id={id}>{title}</h2>
      {description && <p className="section-lead">{description}</p>}
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="code-example">
      <pre><code>{code}</code></pre>
    </div>
  )
}

function ComparisonTable() {
  const comparisons = [
    { español: 'es mayor que', simbolo: '>' },
    { español: 'es menor que', simbolo: '<' },
    { español: 'es mayor o igual que', simbolo: '>=' },
    { español: 'es menor o igual que', simbolo: '<=' },
    { español: 'es igual a', simbolo: '==' },
    { español: 'es diferente de', simbolo: '!=' },
  ]

  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th>Forma en español</th>
          <th>Equivalente simbólico</th>
        </tr>
      </thead>
      <tbody>
        {comparisons.map((c, i) => (
          <tr key={i}>
            <td><code>{c.español}</code></td>
            <td><code>{c.simbolo}</code></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function LangCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="lang-card">
      <h3>{title}</h3>
      <div className="lang-content">{children}</div>
    </div>
  )
}

function Pipeline() {
  const steps = [
    { name: 'archivo .tz', highlighted: false, desc: null },
    { name: 'Lexer', highlighted: true, desc: 'texto → tokens' },
    { name: 'Parser', highlighted: true, desc: 'tokens → AST' },
    { name: 'AST', highlighted: true, desc: 'estructura del programa' },
    { name: 'Interpreter', highlighted: true, desc: 'recorre y ejecuta' },
    { name: 'Runtime', highlighted: true, desc: 'valores, operaciones, memoria' },
    { name: 'salida', highlighted: false, desc: null },
  ]

  return (
    <div className="pipeline" role="img" aria-label="Pipeline del intérprete">
      {steps.map((step, i) => (
        <div key={step.name} className="pipeline-step">
          <div className={`step-box ${step.highlighted ? 'highlighted' : ''}`}>{step.name}</div>
          {step.desc && <div className="step-desc">{step.desc}</div>}
          {i < steps.length - 1 && <div className="arrow" aria-hidden="true">▼</div>}
        </div>
      ))}
    </div>
  )
}

function CommandTable() {
  const commands = [
    { cmd: 'make', desc: 'Compila <code>build/tzc</code>' },
    { cmd: 'make test', desc: 'Compila y ejecuta la suite principal (171 tests)' },
    { cmd: 'make test-education', desc: 'Valida el material de <code>education/</code> (5 lecciones)' },
    { cmd: 'make debug', desc: 'Genera <code>build/tzc-debug</code> con <code>-g -O0</code>' },
    { cmd: 'make asan', desc: 'Genera <code>build/tzc-asan</code> y pasa la suite con sanitizers' },
    { cmd: 'make install', desc: 'Instala el comando <code>tz</code>' },
    { cmd: 'make uninstall', desc: 'Desinstala el comando <code>tz</code>' },
    { cmd: 'make clean', desc: 'Borra todo lo generado en <code>build/</code>' },
  ]

  return (
    <table>
      <thead>
        <tr><th>Orden</th><th>Qué hace</th></tr>
      </thead>
      <tbody>
        {commands.map((c, i) => (
          <tr key={i}>
            <td><code>{c.cmd}</code></td>
            <td dangerouslySetInnerHTML={{ __html: c.desc }} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ============================================
// PAGE COMPONENTS
// ============================================

function HomePage() {
  return (
    <>
      <section id="inicio" className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-content">
            <div className="badges" role="list" aria-label="Información del proyecto">
              <span className="badge" role="listitem">CI</span>
              <span className="badge" role="listitem">Versión 0.3.4</span>
              <span className="badge" role="listitem">C11</span>
              <span className="badge" role="listitem">171 tests</span>
              <span className="badge" role="listitem">Licencia MIT</span>
              <span className="badge" role="listitem">Multiplataforma</span>
            </div>
            <h1 id="hero-title">TzLang</h1>
            <p className="hero-tagline">Lenguaje de programación en español • Hecho en C11 • Open source</p>
            <div className="hero-actions">
              <Link to="/que-es" className="btn btn-primary">Explorar el lenguaje</Link>
              <Link to="/sintaxis" className="btn btn-secondary">Ver sintaxis</Link>
            </div>
            <HeroCodeAnimated />
          </div>
        </div>
      </section>

      <section id="instalacion" className="section section-alt" aria-labelledby="instalacion-title">
        <div className="container">
          <SectionTitle 
            id="instalacion-title"
            title="Instalación" 
            description="No hace falta compilar nada ni instalar dependencias. Descargas un archivo, lo abres, y listo."
          />
          
          <h3>Descarga directa (recomendado)</h3>
<p>Todos los instaladores están en la <a href="https://github.com/TzLanguaje/TzLanguaje/releases/tag/v0.3.4" target="_blank" rel="noopener noreferrer">página de descargas v0.3.4</a>. Baja hasta <strong>Assets</strong> y elige tu archivo:</p>

          <table className="simple-table">
            <thead><tr><th>Si usas…</th><th>Descarga este archivo</th></tr></thead>
            <tbody>
              <tr><td><strong>Windows</strong></td><td><a href="https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.3.4/TzLang-v0.3.4-windows-x86_64-setup.exe" target="_blank" rel="noopener noreferrer"><code>TzLang-v0.3.4-windows-x86_64-setup.exe</code></a></td></tr>
              <tr><td><strong>Mac</strong> (Intel o M1/M2/M3)</td><td><a href="https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.3.4/TzLang-v0.3.4-macos.pkg" target="_blank" rel="noopener noreferrer"><code>TzLang-v0.3.4-macos.pkg</code></a></td></tr>
              <tr><td><strong>Ubuntu, Debian, Mint</strong></td><td><a href="https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.3.4/tzlang_0.3.4_amd64.deb" target="_blank" rel="noopener noreferrer"><code>tzlang_0.3.4_amd64.deb</code></a></td></tr>
              <tr><td><strong>Fedora, RHEL, openSUSE</strong></td><td><a href="https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.3.4/tzlang-0.3.4-1.x86_64.rpm" target="_blank" rel="noopener noreferrer"><code>tzlang-0.3.4-1.x86_64.rpm</code></a></td></tr>
            </tbody>
          </table>
          <p className="note"><strong>ARM / Raspberry Pi:</strong> cambia <code>amd64</code> por <code>arm64</code> (en <code>.deb</code>) o <code>x86_64</code> por <code>aarch64</code> (en <code>.rpm</code>).</p>

          <h3 className="mt-lg">Comprueba que funciona</h3>
          <p>Abre una terminal <strong>nueva</strong> (importante: abierta <em>después</em> de instalar) y escribe:</p>
          <CodeBlock code={CODE_CHECK} />
          <p>Si responde <code>TzLang 0.3.4</code>, ya está instalado. Si dice "orden no encontrada", cierra y abre una terminal nueva, o en Windows vuelve a pasar el instalador con la casilla del PATH marcada.</p>

          <h3 className="mt-md">Tu primer programa</h3>
          <p>Crea <code>hola.tz</code> con:</p>
          <CodeBlock code={`imprimir "Hola desde TzLang"`} />
          <p>Y ejecútalo:</p>
          <CodeBlock code={`tz hola.tz`} />
        </div>
      </section>

      <section id="roadmap" className="section" aria-labelledby="roadmap-title">
        <div className="container">
          <SectionTitle title="Roadmap y Limitaciones" />
          
          <h3>Limitaciones actuales</h3>
          <ul className="limitations-list">
            <li dangerouslySetInnerHTML={{ __html: '<strong>Unicode.</strong> Los textos se tratan como bytes, no como caracteres. <code>largo("año")</code> devuelve <code>4</code> en lugar de <code>3</code>, y <code>mayusculas("año")</code> devuelve <code>AñO</code>. Es la limitación más visible para un lenguaje en español.' }} />
            <li dangerouslySetInnerHTML={{ __html: '<strong>Paso de argumentos por copia.</strong> Las funciones reciben <em>copias</em> de listas y diccionarios, no referencias. Modificar una dentro de una función no afecta a la de fuera; hay que devolverla. Es lo contrario de Python/JS.' }} />
            <li dangerouslySetInnerHTML={{ __html: '<strong>Ausencias del lenguaje.</strong> No hay módulos ni importaciones, clases, funciones anónimas, generadores, conjuntos, tuplas, recolector de basura ni enteros de precisión arbitraria.' }} />
          </ul>

          <h3>Lo terminado en la 0.3.4</h3>
          <ul className="checklist">
            <li>Lexer, parser, AST, intérprete y runtime propios</li>
            <li>Variables y los siete tipos</li>
            <li>Operadores aritméticos (+, -, *, /, <strong>%</strong>), comparación, lógicos</li>
            <li>Sintaxis comparativa en español + simbólica</li>
            <li>Condicionales con <code>sino si</code>, bucles, <code>romper</code> y <code>continuar</code></li>
            <li>Secuencias de escape en textos (<code>\n</code>, <code>\t</code>, <code>\"</code>, <code>\\</code>)</li>
            <li>Funciones con parámetros, retorno, recursión y scope léxico</li>
            <li>Listas y diccionarios anidados con copia profunda, <strong>índices negativos</strong> y <strong>concatenación (+)</strong></li>
            <li><strong>17 funciones incorporadas</strong>, incluyendo <code>entrada()</code> para teclado</li>
            <li>CLI con códigos de salida diferenciados (0, 1, 2, 3)</li>
            <li><strong>Notas de diagnóstico</strong> por categoría de error (<code>TZ_NOTAS</code>)</li>
            <li><strong>5 lecciones</strong> en <code>education/</code> con salida esperada</li>
            <li>Suite de <strong>171 pruebas</strong> verde también bajo ASan y UBSan</li>
            <li>CI que compila y prueba en <strong>Linux, macOS y Windows</strong></li>
            <li><strong>Instaladores nativos</strong> (.pkg, .exe, .deb, .rpm) publicados automáticamente</li>
            <li>Homebrew, Scoop, npm publicados en cada versión</li>
          </ul>

          <h3>Lo siguiente (por prioridad)</h3>
          <ol className="roadmap-list">
            <li><span className="priority">1</span>Soporte real de Unicode en textos y funciones de cadena</li>
            <li><span className="priority">2</span>Seguir ampliando <code>education/</code> con más lecciones y ejercicios</li>
            <li><span className="priority">3</span>Mensajes de error con número de línea y contexto en todas las etapas</li>
            <li><span className="priority">4</span>Decidir si el paso de argumentos debe seguir siendo por copia</li>
            <li><span className="priority">5</span>Sistema de módulos</li>
          </ol>
          <p className="note mt-md">No hay fechas comprometidas: es un proyecto en desarrollo.</p>

          <h3 className="mt-lg">Documentación</h3>
          <p>La referencia completa del lenguaje, sección por sección, está en <a href="https://github.com/TzLanguaje/TzLanguaje/blob/main/docs/language.md" target="_blank" rel="noopener noreferrer"><code>docs/language.md</code></a>.</p>

          <h3>Licencia</h3>
          <p>TzLang se distribuye bajo la licencia <strong>MIT</strong>. Consulta el archivo <a href="https://github.com/TzLanguaje/TzLanguaje/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><code>LICENSE</code></a> para el texto completo.</p>
        </div>
      </section>
    </>
  )
}

function QueEsPage() {
  useEffect(() => {
    const tabButtons = document.querySelectorAll('.tab-btn') as NodeListOf<HTMLElement>
    const tabPanels = document.querySelectorAll('.tab-panel') as NodeListOf<HTMLElement>
    
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab
        
        tabButtons.forEach(b => {
          b.classList.remove('active')
          b.setAttribute('aria-selected', 'false')
        })
        tabPanels.forEach(p => {
          p.classList.remove('active')
          p.hidden = true
        })
        
        btn.classList.add('active')
        btn.setAttribute('aria-selected', 'true')
        const panel = document.getElementById('tab-' + target) as HTMLElement | null
        panel?.classList.add('active')
        if (panel) panel.hidden = false
      })
    })
  }, [])

  const components = [
    { name: 'Lexer', desc: 'Convierte el texto fuente en tokens' },
    { name: 'Parser', desc: 'Analiza los tokens y construye el árbol sintáctico' },
    { name: 'AST', desc: 'Representa la estructura del programa' },
    { name: 'Intérprete', desc: 'Recorre el AST y ejecuta el programa' },
    { name: 'Runtime', desc: 'Gestiona valores, operaciones y memoria' },
    { name: 'Diagnostic', desc: 'Notas de diagnóstico por categoría de error' },
  ]

  return (
    <>
      <section id="que-es" className="section" aria-labelledby="que-es-title">
        <div className="container">
          <SectionTitle 
            id="que-es-title"
            title="Qué es TzLang" 
            description="TzLang es un lenguaje de programación interpretado con sintaxis en español, pensado para aprender los conceptos fundamentales de la programación sin la barrera del inglés."
          />
          <p>
            Está construido desde cero en C11, sin dependencias externas ni generadores de parsers. 
            Todas las piezas son propias:
          </p>
          <div className="components-grid">
            {components.map((comp, i) => (
              <div key={comp.name} className="component-card">
                <div className="component-number">{i + 1}</div>
                <h3>{comp.name}</h3>
                <p>{comp.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-lg">
            Los programas se escriben en archivos con extensión <code>.tz</code> y se ejecutan con el comando <code>tz</code>.
          </p>
        </div>
      </section>

      <section id="sintaxis-ejemplo" className="section section-alt" aria-labelledby="sintaxis-ejemplo-title">
        <div className="container">
          <SectionTitle 
            id="sintaxis-ejemplo-title"
            title="La sintaxis en español es el punto de partida" 
            description="Lo que distingue a TzLang es que las comparaciones se escriben como se dicen en voz alta. Quien está aprendiendo no necesita traducir mentalmente <code>>=</code> antes de entender qué hace su programa:"
          />
          
          <CodeBlock code={CODE_COMPARISON} />
          
          <p>Las seis formas comparativas son parte del lenguaje, no azúcar sintáctico añadido después:</p>
          <ComparisonTable />
          
          <p>Ambas notaciones son intercambiables y se pueden mezclar. La forma simbólica sigue disponible para quien ya la conoce:</p>
          <CodeBlock code={CODE_MIXED} />
          
          <p>Los operadores lógicos siguen la misma idea: <code>y</code>, <code>o</code> y <code>no</code>.</p>
          <CodeBlock code={CODE_LOGICAL} />
        </div>
      </section>
    </>
  )
}

function SintaxisPage() {
  // Built-in functions data for detailed section
  const builtinFunctions = [
    { name: 'largo(x)', desc: 'Longitud de texto, lista o diccionario', example: 'largo("Hola")', result: '4' },
    { name: 'tipo(x)', desc: 'Nombre del tipo', example: 'tipo(3.14)', result: 'decimal' },
    { name: 'texto(x)', desc: 'Convierte a texto', example: 'texto(42)', result: '"42"' },
    { name: 'numero(x)', desc: 'Convierte a número entero', example: 'numero("42")', result: '42' },
    { name: 'decimal(x)', desc: 'Convierte a decimal', example: 'decimal(7)', result: '7' },
    { name: 'agregar(lista, x)', desc: 'Añade un elemento al final (modifica la lista)', example: 'agregar(l, 4)', result: '—' },
    { name: 'eliminar(x, k)', desc: 'Borra por índice o por clave (modifica la estructura)', example: 'eliminar(l, 0)', result: '—' },
    { name: 'contiene(x, v)', desc: '¿Contiene el valor o la clave?', example: 'contiene(l, 99)', result: 'verdadero' },
    { name: 'unir(lista, sep)', desc: 'Une una lista de textos', example: 'unir(["a","b"], "-")', result: '"a-b"' },
    { name: 'separar(txt, sep)', desc: 'Parte un texto en lista', example: 'separar("a,b", ",")', result: '["a", "b"]' },
    { name: 'mayusculas(txt)', desc: 'Pasa a mayúsculas', example: 'mayusculas("hola")', result: '"HOLA"' },
    { name: 'minusculas(txt)', desc: 'Pasa a minúsculas', example: 'minusculas("HOLA")', result: '"hola"' },
    { name: 'absoluto(x)', desc: 'Valor absoluto', example: 'absoluto(-7)', result: '7' },
    { name: 'redondear(x)', desc: 'Redondea a numero', example: 'redondear(3.7)', result: '4' },
    { name: 'claves(dic)', desc: 'Lista de claves', example: 'claves(p)', result: '["nombre"]' },
    { name: 'valores(dic)', desc: 'Lista de valores', example: 'valores(p)', result: '["Carlos"]' },
    { name: 'entrada(msg)', desc: 'Pide un dato por teclado (devuelve texto)', example: 'entrada("Nombre: ")', result: '"Ana"' },
  ]

  return (
    <>
      <section id="lenguaje" className="section" aria-labelledby="lenguaje-title">
        <div className="container">
          <SectionTitle id="lenguaje-title" title="Referencia del lenguaje" />
          
          <div className="language-grid">
            <LangCard title="Variables">
              <CodeBlock code={CODE_VARIABLES} />
            </LangCard>
            <LangCard title="Tipos de datos">
              <CodeBlock code={CODE_TIPOS} />
            </LangCard>
            <LangCard title="Secuencias de escape">
              <CodeBlock code={CODE_ESCAPES} />
            </LangCard>
            <LangCard title="Operadores aritméticos">
              <CodeBlock code={CODE_OPERADORES} />
            </LangCard>
            <LangCard title="Condicionales">
              <CodeBlock code={CODE_CONDICIONALES} />
            </LangCard>
            <LangCard title="Bucles">
              <CodeBlock code={CODE_BUCLES} />
            </LangCard>
            <LangCard title="Romper y continuar">
              <CodeBlock code={CODE_BREAK_CONTINUE} />
            </LangCard>
            <LangCard title="Funciones">
              <CodeBlock code={CODE_FUNCIONES} />
            </LangCard>
            <LangCard title="Listas">
              <CodeBlock code={CODE_LISTAS} />
            </LangCard>
            <LangCard title="Diccionarios">
              <CodeBlock code={CODE_DICCIONARIOS} />
            </LangCard>
            <LangCard title="Copia profunda">
              <CodeBlock code={CODE_COPIA} />
            </LangCard>
            <LangCard title="Entrada del usuario">
              <CodeBlock code={CODE_ENTRADA} />
            </LangCard>
            <LangCard title="Errores">
              <CodeBlock code={CODE_ERRORS} />
            </LangCard>
          </div>
        </div>
      </section>

      <section id="builtins" className="section section-alt" aria-labelledby="builtins-title">
        <div className="container">
          <SectionTitle 
            id="builtins-title"
            title="Funciones incorporadas (17)" 
            description="TzLang incluye 17 funciones integradas. <code>agregar</code>, <code>eliminar</code> y <code>entrada</code> modifican/leen estado; el resto devuelven un valor nuevo."
          />
          
          <div className="builtins-grid">
            {builtinFunctions.map((fn) => (
              <article key={fn.name} className="builtin-card">
                <header className="builtin-header">
                  <code className="builtin-name">{fn.name}</code>
                  <span className="builtin-result">{fn.result}</span>
                </header>
                <p className="builtin-desc">{fn.desc}</p>
                <div className="builtin-example">
                  <code>{fn.example}</code>
                  <span className="example-arrow">→</span>
                  <code className="example-result">{fn.result}</code>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ejemplos" className="section section-alt" aria-labelledby="ejemplos-title">
        <div className="container">
          <SectionTitle 
            id="ejemplos-title"
            title="Un programa completo" 
            description="Este ejemplo reúne funciones, diccionarios, listas, bucles y condicionales con <code>sino si</code>."
          />
          <CodeBlock code={CODE_FULL} />
        </div>
      </section>
    </>
  )
}

function DesarrolloPage() {
  return (
    <>
      <section id="arquitectura" className="section" aria-labelledby="arquitectura-title">
        <div className="container">
          <SectionTitle 
            id="arquitectura-title"
            title="Arquitectura" 
            description="El intérprete procesa cada programa en una tubería de etapas bien separadas, cada una en su propio directorio dentro de <code>src/</code>:"
          />
          
          <Pipeline />
          
          <h3 className="mt-lg">Estructura del proyecto</h3>
          <CodeBlock code={CODE_PROJECT} />
        </div>
      </section>

      <section id="desarrollo" className="section section-alt" aria-labelledby="desarrollo-title">
        <div className="container">
          <SectionTitle id="desarrollo-title" title="Desarrollo y Pruebas" />
          
          <h3>Comandos principales (Makefile)</h3>
          <CommandTable />
          
          <p className="mt-md">El compilador se puede elegir pasando la variable <code>CC</code>, por ejemplo <code>make CC=clang</code>.</p>

          <h3>Pruebas</h3>
          <p>La suite principal ejecuta el binario real sobre archivos <code>.tz</code> y compara la salida y el código de salida con lo esperado. No enlaza contra funciones internas de C: prueba el lenguaje tal y como lo ve un usuario.</p>
          <CodeBlock code={CODE_TESTS} />
          <p>Las <strong>171 pruebas</strong> cubren aritmética, desbordamiento de enteros, conversiones, textos, listas, diccionarios, indexación anidada, control de flujo, funciones, recursión, scope, errores de lexer, parser e intérprete, y el comportamiento de la CLI (BOM UTF-8, CRLF, archivos vacíos, extensiones y argumentos inválidos).</p>

          <h3>Sanitizers</h3>
          <p><code>make asan</code> compila un binario aparte con <strong>AddressSanitizer</strong> y <strong>UndefinedBehaviorSanitizer</strong>, y pasa por él la misma suite completa. Sirve para detectar use-after-free, dobles liberaciones, desbordamientos de búfer y comportamiento indefinido.</p>
          <p>Los tres binarios conviven sin pisarse: <code>build/tzc</code>, <code>build/tzc-debug</code> y <code>build/tzc-asan</code>.</p>

          <h3>Education</h3>
          <p>El directorio <code>education/</code> contiene <strong>5 lecciones</strong> progresivas. Cada una es un programa <code>.tz</code> acompañado de un archivo <code>.expected</code> con su salida exacta, de modo que el material didáctico se verifica automáticamente:</p>
          <CodeBlock code={CODE_EDUCATION} />
          <p>Esta suite es independiente de la principal y es más estricta: exige código de salida 0, stderr vacío y coincidencia exacta de stdout.</p>
        </div>
      </section>

      <section id="novedades" className="section" aria-labelledby="novedades-title">
        <div className="container">
          <SectionTitle id="novedades-title" title="Novedades por versión" />
          
          <div className="changelog">
            <article className="version-entry">
              <header className="version-header">
                <h3>v0.3.4</h3>
                <time>2024</time>
              </header>
              <ul className="changes-list">
                <li><strong>Nuevo operador módulo <code>%</code></strong> para resto de división entera.</li>
                <li><strong>Índices negativos en listas</strong>: <code>lista[-1]</code> accede al último elemento.</li>
                <li><strong>Concatenación de listas con <code>+</code></strong>: <code>[1,2] + [3,4]</code> → <code>[1,2,3,4]</code>.</li>
                <li><strong>Secuencias de escape en textos</strong>: <code>\n</code> (salto), <code>\t</code> (tab), <code>\"</code> (comillas), <code>\\</code> (barra).</li>
                <li><strong>Condicionales encadenadas con <code>sino si</code></strong>: permite múltiples ramas con un solo <code>fin</code>.</li>
                <li><strong>Palabras reservadas</strong>: <code>y</code>, <code>o</code>, <code>no</code>, <code>si</code>, <code>mientras</code> ya no pueden usarse como nombres de variable.</li>
                <li><strong>Límites de seguridad</strong>: máximo 2000 llamadas de función anidadas y 500 niveles de expresión para evitar desbordamiento de pila.</li>
                <li><strong>Función <code>entrada()</code></strong> para leer entrada del usuario por teclado.</li>
                <li><strong>Icono para archivos <code>.tz</code></strong> registrado en Windows, Linux y macOS.</li>
                <li><strong>Mensajes de error amigables</strong>: explican el error y sugieren la corrección (ej. comillas simples → dobles).</li>
                <li><strong>Notas de diagnóstico</strong> (<code>TZ_NOTAS</code>): frases explicativas bajo cada error técnico.</li>
                <li><strong>5 lecciones en <code>education/</code></strong> con salida esperada verificada automáticamente.</li>
              </ul>
            </article>

            <article className="version-entry">
              <header className="version-header">
                <h3>v0.3.0</h3>
                <time>2024</time>
              </header>
              <ul className="changes-list">
                <li>Sintaxis comparativa en español (<code>es mayor que</code>, <code>es menor o igual que</code>, etc.).</li>
                <li>Operadores lógicos en español: <code>y</code>, <code>o</code>, <code>no</code>.</li>
                <li>Condicionales con <code>si</code>, <code>sino</code>, <code>fin</code>.</li>
                <li>Bucles <code>mientras</code> y <code>para cada</code>.</li>
                <li>Funciones con <code>funcion</code>, <code>retornar</code>, recursión y scope léxico.</li>
                <li>Listas y diccionarios con copia profunda.</li>
                <li>16 funciones incorporadas.</li>
                <li>CLI con códigos de salida diferenciados (0, 1, 2, 3).</li>
                <li>Suite de 138 pruebas.</li>
                <li>CI en Linux, macOS y Windows.</li>
              </ul>
            </article>

            <article className="version-entry">
              <header className="version-header">
                <h3>v0.1.0</h3>
                <time>2024</time>
              </header>
              <ul className="changes-list">
                <li>Léxico, parser, AST, intérprete y runtime propios en C11.</li>
                <li>Variables y 7 tipos de datos.</li>
                <li>Operadores aritméticos, comparación y lógicos.</li>
                <li>Estructuras de control básicas.</li>
                <li>Primera suite de pruebas.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

// ============================================
// MAIN APP WITH ROUTING
// ============================================

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
      <Header />
      <main>{children}</main>
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
      </Routes>
    </BrowserRouter>
  )
}

export default App