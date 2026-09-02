import { useEffect, useState, useRef } from 'react'

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

export function HeroCodeAnimated() {
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
            <span className="line-number" aria-hidden="true">&nbsp;</span>
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
