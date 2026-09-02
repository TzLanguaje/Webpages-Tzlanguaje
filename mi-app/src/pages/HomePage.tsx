import { Link } from 'react-router-dom'
import { SectionTitle, CodeBlock } from '../shared'
import { HeroCodeAnimated } from '../components/HeroCodeAnimated'
import { CODE_CHECK } from '../data/code'

export function HomePage() {
  return (
    <>
      <section id="inicio" className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-content">
            <div className="badges" role="list" aria-label="Información del proyecto">
              <span className="badge" role="listitem">CI</span>
              <span className="badge" role="listitem">Versión 0.5.0</span>
              <span className="badge" role="listitem">C11</span>
              <span className="badge" role="listitem">249 tests</span>
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
<p>Todos los instaladores están en la <a href="https://github.com/TzLanguaje/TzLanguaje/releases/tag/v0.5.0" target="_blank" rel="noopener noreferrer">página de descargas v0.5.0</a>. Baja hasta <strong>Assets</strong> y elige tu archivo:</p>

          <table className="simple-table">
            <thead><tr><th>Si usas…</th><th>Descarga este archivo</th></tr></thead>
            <tbody>
              <tr><td><strong>Windows</strong></td><td><a href="https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.5.0/TzLang-v0.5.0-windows-x86_64-setup.exe" target="_blank" rel="noopener noreferrer"><code>TzLang-v0.5.0-windows-x86_64-setup.exe</code></a></td></tr>
              <tr><td><strong>Mac</strong> (Intel o M1/M2/M3)</td><td><a href="https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.5.0/TzLang-v0.5.0-macos.pkg" target="_blank" rel="noopener noreferrer"><code>TzLang-v0.5.0-macos.pkg</code></a></td></tr>
              <tr><td><strong>Ubuntu, Debian, Mint</strong></td><td><a href="https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.5.0/tzlang_0.5.0_amd64.deb" target="_blank" rel="noopener noreferrer"><code>tzlang_0.5.0_amd64.deb</code></a></td></tr>
              <tr><td><strong>Fedora, RHEL, openSUSE</strong></td><td><a href="https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.5.0/tzlang-0.5.0-1.x86_64.rpm" target="_blank" rel="noopener noreferrer"><code>tzlang-0.5.0-1.x86_64.rpm</code></a></td></tr>
            </tbody>
          </table>
          <p className="note"><strong>ARM / Raspberry Pi:</strong> cambia <code>amd64</code> por <code>arm64</code> (en <code>.deb</code>) o <code>x86_64</code> por <code>aarch64</code> (en <code>.rpm</code>).</p>

          <h3 className="mt-lg">Comprueba que funciona</h3>
          <p>Abre una terminal <strong>nueva</strong> (importante: abierta <em>después</em> de instalar) y escribe:</p>
          <CodeBlock code={CODE_CHECK} />
          <p>Si responde <code>TzLang 0.5.0</code>, ya está instalado. Si dice "orden no encontrada", cierra y abre una terminal nueva, o en Windows vuelve a pasar el instalador con la casilla del PATH marcada.</p>

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
            <li dangerouslySetInnerHTML={{ __html: '<strong>Unicode parcial.</strong> Desde la 0.5.0, <code>largo()</code>, <code>mayusculas()</code> y <code>minusculas()</code> entienden tildes y eñes. Lo que falta: Unicode completo (emojis formados por varios caracteres), normalización de textos y orden alfabético según el idioma.' }} />
            <li dangerouslySetInnerHTML={{ __html: '<strong>Paso de argumentos por copia.</strong> Las funciones reciben <em>copias</em> de listas y diccionarios, no referencias. Modificar una dentro de una función no afecta a la de fuera; hay que devolverla. Es lo contrario de Python/JS.' }} />
            <li dangerouslySetInnerHTML={{ __html: '<strong>Ausencias del lenguaje.</strong> No hay módulos ni importaciones, clases, funciones anónimas, generadores, conjuntos, tuplas, recolector de basura ni enteros de precisión arbitraria.' }} />
          </ul>

          <h3>Lo terminado en la 0.5.0</h3>
          <ul className="checklist">
            <li>Lexer, parser, AST, intérprete y runtime propios en C11</li>
            <li>Variables y los siete tipos (<code>numero</code>, <code>decimal</code>, <code>texto</code>, <code>booleano</code>, <code>nulo</code>, <code>lista</code>, <code>diccionario</code>)</li>
            <li>Operadores aritméticos (+, -, *, /, <strong>%</strong>, <strong>menos unario</strong>), comparación (<code>==</code>, <code>!=</code>, <code>{'<'}(</code>, <code>{'{'>'}'}</code>, <code>{'<'}(=</code>, <code>{'>'}=</code>), lógicos (<code>y</code>, <code>o</code>, <code>no</code>)</li>
            <li>Sintaxis comparativa en español + simbólica (<code>es mayor que</code>, <code>es menor o igual que</code>, etc.)</li>
            <li>Condicionales con <code>si</code>, <code>sino si</code>, <code>sino</code>, <code>fin</code></li>
            <li>Bucles <code>mientras</code> y <code>para cada</code> (listas y diccionarios), <code>romper</code> y <code>continuar</code></li>
            <li>Secuencias de escape en textos (<code>\n</code>, <code>\t</code>, <code>\"</code>, <code>\\</code>)</li>
            <li>Funciones con <code>funcion</code>, <code>retornar</code>, recursión, <strong>scope léxico</strong></li>
            <li>Listas y diccionarios con copia profunda, <strong>índices negativos</strong> y <strong>concatenación (+)</strong></li>
            <li><strong>17 funciones incorporadas</strong>: <code>largo</code>, <code>tipo</code>, <code>texto</code>, <code>numero</code>, <code>decimal</code>, <code>agregar</code>, <code>eliminar</code>, <code>contiene</code>, <code>unir</code>, <code>separar</code>, <code>mayusculas</code>, <code>minusculas</code>, <code>absoluto</code>, <code>redondear</code>, <code>claves</code>, <code>valores</code>, <strong><code>entrada()</code></strong></li>
            <li>CLI con códigos de salida diferenciados (0, 1, 2, 3)</li>
            <li><strong>Notas de diagnóstico</strong> por categoría de error (<code>TZ_NOTAS</code>)</li>
            <li><strong>5 lecciones</strong> en <code>education/</code> con salida esperada</li>
            <li>Suite de <strong>249 pruebas</strong> verde también bajo ASan y UBSan</li>
            <li>CI que compila y prueba en <strong>Linux, macOS y Windows</strong></li>
            <li><strong>Instaladores nativos</strong> (.pkg, .exe, .deb, .rpm) publicados automáticamente</li>
            <li>Homebrew, Scoop, npm publicados en cada versión</li>
            <li>Extensión <strong>VS Code</strong> con icono, snippets y <strong>coloreado de sintaxis</strong></li>
            <li><strong>Icono para archivos .tz</strong> en Windows, Linux, macOS</li>
            <li><strong>Mensajes de error amigables</strong> con sugerencias de corrección</li>
          </ul>

          <h3 className="mt-md">Novedades de la 0.5.0 (agosto 2026)</h3>
          <ul className="checklist">
            <li><strong>Errores con número de línea</strong> en todas las etapas (lexer, parser e intérprete)</li>
            <li><strong>Evaluación en cortocircuito</strong> de los operadores <code>y</code> y <code>o</code></li>
            <li><strong>Orden alfabético de textos</strong></li>
            <li><code>largo()</code>, <code>mayusculas()</code> y <code>minusculas()</code> <strong>conscientes de tildes y eñes</strong></li>
            <li>Errores en rojo y mensajes que dicen qué escribir (0.4.3) y <strong>coloreado de sintaxis</strong> en VS Code (0.4.4)</li>
            <li>Publicada el <strong>25 de agosto de 2026</strong> (v0.4.3 y v0.4.4 el 24 de agosto)</li>
          </ul>

          <h3>Lo siguiente (por prioridad)</h3>
          <ol className="roadmap-list">
            <li><span className="priority">1</span>Orden alfabético según el idioma, para que <code>"año"</code> se ordene donde toca y no detrás de todas las palabras sin tilde</li>
            <li><span className="priority">2</span>Normalización de textos Unicode</li>
            <li><span className="priority">3</span>Seguir ampliando <code>education/</code> con más lecciones y ejercicios</li>
            <li><span className="priority">4</span>Decidir si el paso de argumentos debe seguir siendo por copia</li>
            <li><span className="priority">5</span>Funciones anidadas con ámbito propio, si se demuestra que hacen falta</li>
            <li><span className="priority">6</span>Sistema de módulos</li>
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
