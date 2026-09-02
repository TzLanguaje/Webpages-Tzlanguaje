import { SectionTitle, CodeBlock } from '../shared'
import { SyntaxCodeAnimated } from '../components/SyntaxCodeAnimated'
import { CODE_VARIABLES, CODE_TIPOS, CODE_ESCAPES, CODE_OPERADORES, CODE_CONDICIONALES, CODE_BUCLES, CODE_BREAK_CONTINUE, CODE_FUNCIONES, CODE_LISTAS, CODE_DICCIONARIOS, CODE_COPIA, CODE_ENTRADA, CODE_ERRORS, CODE_FULL } from '../data/code'

export function SintaxisPage() {
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
          
          <div className="reference-list">
            <article className="reference-item">
              <header className="reference-header">
                <h3>Variables</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_VARIABLES} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Tipos de datos</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_TIPOS} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Secuencias de escape</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_ESCAPES} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Operadores aritméticos</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_OPERADORES} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Condicionales</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_CONDICIONALES} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Bucles</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_BUCLES} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Romper y continuar</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_BREAK_CONTINUE} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Funciones</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_FUNCIONES} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Listas</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_LISTAS} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Diccionarios</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_DICCIONARIOS} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Copia profunda</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_COPIA} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Entrada del usuario</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_ENTRADA} />
              </div>
            </article>
            <article className="reference-item">
              <header className="reference-header">
                <h3>Errores</h3>
              </header>
              <div className="reference-content">
                <CodeBlock code={CODE_ERRORS} />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Interactive Syntax Terminal */}
      <section id="sintaxis-interactiva" className="section section-alt" aria-labelledby="sintaxis-interactiva-title">
        <div className="container">
          <SectionTitle 
            id="sintaxis-interactiva-title"
            title="Sintaxis interactiva" 
            description="Explora la sintaxis de TzLang con ejemplos interactivos. Selecciona un concepto y navega entre los ejemplos."
          />
          <SyntaxCodeAnimated />
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
