import { useEffect } from 'react'
import { SectionTitle, CodeBlock, ComparisonTable } from '../shared'
import { VideoPlayer } from '../components/VideoPlayer'
import { CODE_COMPARISON, CODE_MIXED, CODE_LOGICAL } from '../data/code'

export function QueEsPage() {
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
            description="Lo que distingue a TzLang es que las comparaciones se escriben como se dicen en voz alta. Quien está aprendiendo no necesita traducir mentalmente <code>{'>'}=</code> antes de entender qué hace su programa:"
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

       <section id="video-demo" className="section section-alt" aria-labelledby="video-demo-title">
         <div className="container">
           <SectionTitle 
             id="video-demo-title"
             title="TzLang en acción" 
             description="Mira cómo se ve la sintaxis de TzLang en acción con un ejemplo completo."
           />
           <VideoPlayer
             src="tzlang-codigo-en-espanol.mp4"
             poster="tzlang-codigo-en-espanol-poster.jpg"
             title="TzLang: Código en Español"
             preload="metadata"
           />
         </div>
       </section>
     </>
   )
}
