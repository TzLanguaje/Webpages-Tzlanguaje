import { SectionTitle, CodeBlock, Pipeline, CommandTable } from '../shared'
import { CODE_PROJECT, CODE_TESTS, CODE_EDUCATION } from '../data/code'

export function DesarrolloPage() {
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
          <p>Las <strong>244 pruebas</strong> cubren aritmética, desbordamiento de enteros, conversiones, textos, listas, diccionarios, indexación anidada, control de flujo, funciones, recursión, scope, errores de lexer, parser e intérprete, y el comportamiento de la CLI (BOM UTF-8, CRLF, archivos vacíos, extensiones y argumentos inválidos).</p>

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
                <h3>v0.5.0</h3>
                <time>25 de agosto de 2026</time>
              </header>
              <ul className="changes-list">
                <li><strong>Errores con número de línea</strong> en todas las etapas: lexer, parser e intérprete.</li>
                <li><strong>Evaluación en cortocircuito</strong> de los operadores lógicos <code>y</code> y <code>o</code>.</li>
                <li><strong>Orden alfabético de textos</strong>.</li>
                <li><strong>Unicode parcial</strong>: <code>largo()</code>, <code>mayusculas()</code> y <code>minusculas()</code> entienden tildes y eñes.</li>
                <li>Suite de <strong>249 pruebas</strong> (244 principales + 5 educativas) verde bajo ASan y UBSan.</li>
              </ul>
            </article>

            <article className="version-entry">
              <header className="version-header">
                <h3>v0.4.x</h3>
                <time>21 – 24 de agosto de 2026</time>
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
                <li><strong>Extensión de VS Code</strong> incluida en cada release, con icono, snippets y <strong>coloreado de sintaxis</strong> (0.4.4).</li>
                <li><strong>Mensajes de error amigables</strong> en rojo, que explican el error y sugieren la corrección (0.4.3).</li>
                <li><strong>Notas de diagnóstico</strong> (<code>TZ_NOTAS</code>): frases explicativas bajo cada error técnico.</li>
                <li><strong>5 lecciones en <code>education/</code></strong> con salida esperada verificada automáticamente.</li>
              </ul>
            </article>

            <article className="version-entry">
              <header className="version-header">
                <h3>v0.3.0</h3>
                <time>20 de agosto de 2026</time>
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
                <time>19 de agosto de 2026</time>
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
