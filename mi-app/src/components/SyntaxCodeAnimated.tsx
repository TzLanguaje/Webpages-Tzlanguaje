import { useEffect, useState, useRef, useMemo } from 'react'

const SYNTAX_CONCEPTS = [
  {
    id: 'variables',
    label: 'Variables y tipos',
    examples: [
      {
        label: 'Variables básicas',
        code: `variable nombre = "Ana"
variable edad = 20
variable activo = verdadero

imprimir tipo(edad)  // numero
imprimir tipo(activo)  // booleano`
      },
      {
        label: 'Reasignación',
        code: `variable contador = 0
contador = contador + 1
contador = contador * 2

imprimir contador  // 2`
      },
      {
        label: 'Tipos de datos',
        code: `imprimir tipo(42)        // numero
imprimir tipo(3.14)      // decimal
imprimir tipo("Hola")    // texto
imprimir tipo(verdadero) // booleano
imprimir tipo(nulo)      // nulo
imprimir tipo([1, 2, 3]) // lista
imprimir tipo({"a": 1})  // diccionario`
      }
    ]
  },
  {
    id: 'operadores',
    label: 'Operadores aritméticos',
    examples: [
      {
        label: 'Aritmética básica',
        code: `imprimir 7 + 3    // 10
imprimir 7 - 3    // 4
imprimir 7 * 3    // 21
imprimir 7 / 3    // 2 (trunca)
imprimir 7 % 3    // 1 (resto)
imprimir 7.0 / 2  // 3.5`
      },
      {
        label: 'Precedencia',
        code: `imprimir 2 + 3 * 4  // 14
imprimir (2 + 3) * 4 // 20
imprimir -5          // -5`
      },
      {
        label: 'Concatenación',
        code: `imprimir "Hola " + "mundo"  // Hola mundo
variable a = "Hola"
variable b = a + " mundo"
imprimir b  // Hola mundo`
      }
    ]
  },
  {
    id: 'condicionales',
    label: 'Condicionales',
    examples: [
      {
        label: 'If simple',
        code: `variable edad = 20

si edad es mayor o igual que 18
    imprimir "Mayor de edad"
sino
    imprimir "Menor de edad"
fin`
      },
      {
        label: 'Condicionales encadenadas',
        code: `variable nota = 85

si nota es mayor o igual que 90
    imprimir "Sobresaliente"
sino si nota es mayor o igual que 70
    imprimir "Aprobado"
sino si nota es mayor o igual que 50
    imprimir "Justo"
sino
    imprimir "Puede mejorar"
fin`
      },
      {
        label: 'Operadores lógicos',
        code: `variable edad = 20
variable tiene_doc = verdadero

si (edad es mayor o igual que 18) y (tiene_doc)
    imprimir "Puede entrar"
fin

si no (edad es igual a 30)
    imprimir "No tiene 30"
fin`
      }
    ]
  },
  {
    id: 'bucles',
    label: 'Bucles',
    examples: [
      {
        label: 'Mientras',
        code: `variable i = 1

mientras i es menor o igual que 5
    imprimir i
    i = i + 1
fin`
      },
      {
        label: 'Para cada (listas)',
        code: `variable frutas = ["manzana", "pera", "uva"]

para cada fruta en frutas
    imprimir fruta
fin`
      },
      {
        label: 'Índices negativos y break/continue',
        code: `variable frutas = ["manzana", "pera", "uva", "naranja"]

imprimir frutas[-1]  // naranja

para cada fruta en frutas
    si fruta es igual a "uva"
        continuar
    fin
    si fruta es igual a "naranja"
        romper
    fin
    imprimir fruta
fin`
      }
    ]
  },
  {
    id: 'funciones',
    label: 'Funciones',
    examples: [
      {
        label: 'Función simple',
        code: `funcion sumar(a, b)
    retornar a + b
fin

imprimir sumar(10, 20)  // 30`
      },
      {
        label: 'Recursión',
        code: `funcion factorial(n)
    si n es menor o igual que 1
        retornar 1
    fin
    retornar n * factorial(n - 1)
fin

imprimir factorial(5)  // 120`
      },
      {
        label: 'Scope léxico',
        code: `variable mensaje = "global"

funcion prueba()
    variable mensaje = "local"
    imprimir mensaje
fin

prueba()      // local
imprimir mensaje  // global`
      }
    ]
  },
  {
    id: 'listas',
    label: 'Listas',
    examples: [
      {
        label: 'Operaciones básicas',
        code: `variable numeros = [1, 2, 3]

imprimir numeros[0]      // 1
imprimir numeros[-1]     // 3
imprimir largo(numeros)  // 3

numeros[1] = 99
agregar(numeros, 4)
imprimir numeros         // [1, 99, 3, 4]

eliminar(numeros, 0)
imprimir numeros         // [99, 3, 4]`
      },
      {
        label: 'Concatenación y anidación',
        code: `imprimir [1, 2] + [3, 4]  // [1, 2, 3, 4]

variable mixta = [1, "texto", verdadero, nulo, [2, 3]]
imprimir mixta[4][1]  // 3`
      },
      {
        label: 'Métodos de lista',
        code: `variable nums = [3, 1, 4, 1, 5]

imprimir contiene(nums, 4)   // verdadero
imprimir contiene(nums, 9)   // falso
imprimir unir(nums, "-")     // 3-1-4-1-5`
      }
    ]
  },
  {
    id: 'diccionarios',
    label: 'Diccionarios',
    examples: [
      {
        label: 'Operaciones básicas',
        code: `variable persona = {
    "nombre": "Carlos",
    "edad": 20
}

imprimir persona["nombre"]  // Carlos

persona["edad"] = 21
persona["pais"] = "Colombia"

imprimir persona
// {"nombre": "Carlos", "edad": 21, "pais": "Colombia"}

imprimir claves(persona)   // ["nombre", "edad", "pais"]
imprimir valores(persona)  // ["Carlos", 21, "Colombia"]`
      },
      {
        label: 'Anidación',
        code: `variable usuario = {
    "datos": {"edad": 20},
    "roles": ["admin", "dev"]
}

imprimir usuario["datos"]["edad"]  // 20
imprimir usuario["roles"][0]       // admin`
      },
      {
        label: 'Copia profunda',
        code: `variable a = {"datos": {"edad": 20}}
variable b = a

b["datos"]["edad"] = 99

imprimir a["datos"]["edad"]  // 20
imprimir b["datos"]["edad"]  // 99`
      }
    ]
  },
  {
    id: 'entradas',
    label: 'Entrada de usuario',
    examples: [
      {
        label: 'Entrada básica',
        code: `variable nombre = entrada("¿Cómo te llamas? ")
imprimir "Hola, " + nombre

variable edad = numero(entrada("¿Cuántos años tienes? "))
imprimir "El año que viene tendrás " + texto(edad + 1)`
      },
      {
        label: 'Validación simple',
        code: `variable entrada = entrada("Escribe 'sí' para continuar: ")

si entrada es igual a "sí"
    imprimir "Continuando..."
sino
    imprimir "Cancelado"
fin`
      }
    ]
  }
]


export function SyntaxCodeAnimated() {
  const [conceptIndex, setConceptIndex] = useState(0)
  const [exampleIndex, setExampleIndex] = useState(0)
  const [displayLines, setDisplayLines] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const lineIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentConcept = SYNTAX_CONCEPTS[conceptIndex]
  const currentExample = currentConcept.examples[exampleIndex]
  const codeLines = useMemo(() => currentExample.code.split('\n'), [exampleIndex, conceptIndex])

  // Blinking cursor
  useEffect(() => {
    intervalRef.current = setInterval(() => setShowCursor(prev => !prev), 530)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  // Typing animation logic
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
          timeoutRef.current = window.setTimeout(typeNext, 20)
        } else if (lineIndexRef.current > 0) {
          lineIndexRef.current--
          charIndexRef.current = codeLines[lineIndexRef.current].length
          setDisplayLines(prev => prev.slice(0, -1))
          timeoutRef.current = window.setTimeout(typeNext, 20)
        } else {
          setIsDeleting(false)
          setExampleIndex(prev => (prev + 1) % currentConcept.examples.length)
          lineIndexRef.current = 0
          charIndexRef.current = 0
          setDisplayLines([])
          timeoutRef.current = window.setTimeout(typeNext, 500)
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
            timeoutRef.current = window.setTimeout(typeNext, 25)
          } else {
            lineIndexRef.current++
            charIndexRef.current = 0
            if (lineIndexRef.current < codeLines.length) {
              setDisplayLines(prev => [...prev, ''])
            }
            timeoutRef.current = window.setTimeout(typeNext, 120)
          }
        } else {
          // All lines typed - wait longer (4 seconds) before deleting
          timeoutRef.current = window.setTimeout(() => {
            setIsDeleting(true)
            typeNext()
          }, 3000)
        }
      }
    }
    
    typeNext()

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [conceptIndex, exampleIndex, isDeleting])

  // Handle concept switching
  const switchConcept = (newIndex: number) => {
    if (newIndex === conceptIndex) return
    setIsSwitching(true)
    setIsDeleting(true)
    setConceptIndex(newIndex)
    setExampleIndex(0)
    lineIndexRef.current = 0
    charIndexRef.current = 0
    setDisplayLines([])
    setTimeout(() => {
      setIsSwitching(false)
      setIsDeleting(false)
    }, 100)
  }

  return (
    <div className="syntax-animated-container" role="region" aria-label="Ejemplos de sintaxis TzLang">
      {/* Concept selector tabs */}
      <div className="syntax-concept-tabs" role="group" aria-label="Conceptos de sintaxis">
        {SYNTAX_CONCEPTS.map((concept, i) => (
          <button
            key={concept.id}
            id={`tab-${concept.id}`}
            aria-pressed={i === conceptIndex}
            className={`syntax-tab ${i === conceptIndex ? 'active' : ''}`}
            onClick={() => switchConcept(i)}
            disabled={isSwitching}
          >
            {concept.label}
          </button>
        ))}
      </div>

      {/* Animated terminal */}
      <div className="syntax-animated-terminal" role="region" aria-label={`Ejemplos de ${currentConcept.label}`} aria-live="polite">
        <div className="syntax-terminal-header">
          <div className="terminal-title">
            <span className="concept-badge">{currentConcept.label}</span>
            <span className="example-badge">{exampleIndex + 1} / {currentConcept.examples.length}</span>
          </div>
          <div className="code-dots" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
        </div>
        <pre className="syntax-code-block"><code>
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
        
        {/* Example indicator dots */}
        <div className="syntax-example-indicators" aria-label="Ejemplos disponibles">
          {currentConcept.examples.map((_, i) => (
            <button
              key={i}
              className={`syntax-example-dot ${i === exampleIndex ? 'active' : ''}`}
              onClick={() => {
                setIsDeleting(true)
                setExampleIndex(i)
                lineIndexRef.current = 0
                charIndexRef.current = 0
                setDisplayLines([])
                setIsDeleting(false)
              }}
              aria-label={`Ver ejemplo ${i + 1}: ${currentConcept.examples[i].label}`}
              aria-current={i === exampleIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

