import { useEffect } from 'react'
import './App.css'

const CODE_HERO = `imprimir "Hola desde TzLang"
// Hola desde TzLang`

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

const CODE_INSTALL_MACOS = `curl -fsSL https://raw.githubusercontent.com/tzerk-last/TzLanguaje/main/install.sh | sh`

const CODE_INSTALL_MACOS_OPTS = `# Para todo el sistema (necesita sudo)
TZ_PREFIX=/usr/local sh install.sh

# Una version concreta
TZ_VERSION=v0.1.0 sh install.sh`

const CODE_INSTALL_WINDOWS = `irm https://raw.githubusercontent.com/tzerk-last/TzLanguaje/main/install.ps1 | iex`

const CODE_INSTALL_PACKAGES = `# Homebrew (macOS/Linux)
brew install tzerk-last/tzlang/tzlang

# Scoop (Windows)
scoop bucket add tzlang https://github.com/tzerk-last/scoop-tzlang
scoop install tzlang`

const CODE_BUILD_CMAKE = `git clone https://github.com/tzerk-last/TzLanguaje.git
cd TzLanguaje
cmake -B build-cmake -DCMAKE_BUILD_TYPE=Release
cmake --build build-cmake`

const CODE_BUILD_MAKE = `make
./build/tzc examples/hola.tz

# Instalar
sudo make install
# o sin sudo:
make PREFIX=$HOME/.local install`

const CODE_CHECK = `tz --version
# TzLang 0.1.0`

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

const CODE_OPERADORES = `imprimir 7 + 3    // 10
imprimir 7 - 3    // 4
imprimir 7 * 3    // 21
imprimir 7 / 3    // 2 (trunca hacia cero)
imprimir 7.0 / 2  // 3.5
imprimir -5       // -5
imprimir 2 + 3 * 4  // 14
imprimir (2 + 3) * 4 // 20`

const CODE_CONDICIONALES = `variable nota = 85

si nota es mayor o igual que 90
    imprimir "Sobresaliente"
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
imprimir largo(numeros)  // 3

numeros[1] = 99
agregar(numeros, 4)
imprimir numeros         // [1, 99, 3, 4]

eliminar(numeros, 0)
imprimir numeros         // [99, 3, 4]

variable mixta = [1, "texto", verdadero, nulo, [2, 3]]
imprimir mixta[4][1]  // 3`

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

imprimir a["datos"]["edad"]  // 20
imprimir b["datos"]["edad"]  // 99`

const CODE_ERRORS = `imprimir 10 / 0
// Error: division por cero.
// La ejecucion fallo.

imprimir desconocida
// Error: variable 'desconocida' no existe.
// La ejecucion fallo.`

const CODE_PROJECT = `TzLang/
├── src/
│   ├── lexer/          lexer.c / lexer.h
│   ├── parser/         parser.c / parser.h
│   ├── ast/            ast.c / ast.h
│   ├── interpreter/    interpreter.c / interpreter.h
│   ├── runtime/        value.c / operations.c
│   ├── io/             file.c / file.h
│   ├── main.c          punto de entrada y CLI
│   └── version.h       numero de version
│
├── examples/           programas de ejemplo
├── education/          lecciones con salida esperada
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
│   ├── homebrew/       plantilla de la formula de Homebrew
│   └── scoop/          plantilla del manifiesto de Scoop
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
Tests:  138
Passed: 138
Failed: 0
========================================

All tests passed.`

const CODE_EDUCATION = `make test-education
=== TzLang Education Suite ===

[PASS] 01_variables

========================================
Tests:  1
Passed: 1
Failed: 0
========================================

All education tests passed.`

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'que-es', label: 'Qué es TzLang' },
  { id: 'sintaxis', label: 'Sintaxis' },
  { id: 'ejemplos', label: 'Ejemplos' },
  { id: 'instalacion', label: 'Instalación' },
  { id: 'lenguaje', label: 'Referencia' },
  { id: 'arquitectura', label: 'Arquitectura' },
  { id: 'desarrollo', label: 'Desarrollo' },
  { id: 'roadmap', label: 'Roadmap' },
]

function Header() {
  return (
    <header className="header">
      <nav className="nav container" role="navigation" aria-label="Navegación principal">
        <a href="#inicio" className="logo" aria-label="TzLang - Inicio">
          <span className="logo-icon" aria-hidden="true">Tz</span>
          <span className="logo-text">TzLang</span>
        </a>
        <button className="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <ul className="nav-links" id="nav-menu" role="menubar">
          {navItems.map(item => (
            <li key={item.id} role="none">
              <a href={'#' + item.id} role="menuitem">{item.label}</a>
            </li>
          ))}
        </ul>
        <a href="https://github.com/tzerk-last/TzLanguaje" target="_blank" rel="noopener noreferrer" className="btn btn-github" aria-label="Ver en GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-content">
          <div className="badges" role="list" aria-label="Información del proyecto">
            <span className="badge" role="listitem">CI</span>
            <span className="badge" role="listitem">Versión 0.1.0</span>
            <span className="badge" role="listitem">C11</span>
            <span className="badge" role="listitem">138 tests</span>
            <span className="badge" role="listitem">Licencia MIT</span>
            <span className="badge" role="listitem">Multiplataforma</span>
          </div>
          <h1 id="hero-title">Un lenguaje de programación educativo en español, construido desde cero en C11</h1>
          <p className="hero-description">
            TzLang es un lenguaje interpretado con sintaxis en español, pensado para aprender 
            los conceptos fundamentales de la programación sin la barrera del inglés.
          </p>
          <div className="hero-actions">
            <a href="#instalacion" className="btn btn-primary">Empezar ahora</a>
            <a href="#ejemplos" className="btn btn-secondary">Ver ejemplos</a>
          </div>
          <div className="hero-code">
            <pre><code>{CODE_HERO}</code></pre>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatIs() {
  const components = [
    { name: 'Lexer', desc: 'Convierte el texto fuente en tokens' },
    { name: 'Parser', desc: 'Analiza los tokens y construye el árbol sintáctico' },
    { name: 'AST', desc: 'Representa la estructura del programa' },
    { name: 'Intérprete', desc: 'Recorre el AST y ejecuta el programa' },
    { name: 'Runtime', desc: 'Gestiona valores, operaciones y memoria' },
  ]

  return (
    <section id="que-es" className="section" aria-labelledby="que-es-title">
      <div className="container">
        <h2 id="que-es-title">Qué es TzLang</h2>
        <p className="section-lead">
          TzLang es un lenguaje de programación interpretado con sintaxis en español, 
          pensado para aprender los conceptos fundamentales de la programación sin la barrera del inglés.
        </p>
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
  )
}

function SpanishSyntax() {
  const comparisons = [
    { español: 'es mayor que', simbolo: '>' },
    { español: 'es menor que', simbolo: '<' },
    { español: 'es mayor o igual que', simbolo: '>=' },
    { español: 'es menor o igual que', simbolo: '<=' },
    { español: 'es igual a', simbolo: '==' },
    { español: 'es diferente de', simbolo: '!=' },
  ]

  return (
    <section id="sintaxis" className="section section-alt" aria-labelledby="sintaxis-title">
      <div className="container">
        <h2 id="sintaxis-title">La sintaxis en español es el punto de partida</h2>
        <p>
          Lo que distingue a TzLang de un intérprete de juguete cualquiera es que las comparaciones 
          se escriben como se dicen en voz alta. Quien está aprendiendo no necesita traducir mentalmente 
          {'<code>>=</code>'} antes de entender qué hace su programa:
        </p>
        <div className="code-example">
          <pre><code>{CODE_COMPARISON}</code></pre>
        </div>
        <p>Las seis formas comparativas son parte del lenguaje, no azúcar sintáctico añadido después:</p>
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
        <p>Ambas notaciones son intercambiables y se pueden mezclar:</p>
        <div className="code-example">
          <pre><code>{CODE_MIXED}</code></pre>
        </div>
        <p>Los operadores lógicos siguen la misma idea: <code>y</code>, <code>o</code> y <code>no</code>.</p>
        <div className="code-example">
          <pre><code>{CODE_LOGICAL}</code></pre>
        </div>
      </div>
    </section>
  )
}

function Examples() {
  return (
    <section id="ejemplos" className="section" aria-labelledby="ejemplos-title">
      <div className="container">
        <h2 id="ejemplos-title">Un programa completo</h2>
        <p>Este ejemplo reúne funciones, diccionarios, listas, bucles y condicionales:</p>
        <div className="code-example">
          <pre><code>{CODE_FULL}</code></pre>
        </div>
      </div>
    </section>
  )
}

function Installation() {
  return (
    <section id="instalacion" className="section section-alt" aria-labelledby="instalacion-title">
      <div className="container">
        <h2 id="instalacion-title">Instalación</h2>
        <p>TzLang se distribuye como un binario único sin dependencias. Funciona en macOS, Linux y Windows.</p>
        
        <div className="install-tabs">
          <div className="tab-buttons" role="tablist" aria-label="Métodos de instalación">
            <button className="tab-btn active" data-tab="macos" role="tab" aria-selected="true" aria-controls="tab-macos" id="btn-macos">macOS y Linux</button>
            <button className="tab-btn" data-tab="windows" role="tab" aria-selected="false" aria-controls="tab-windows" id="btn-windows">Windows</button>
            <button className="tab-btn" data-tab="packages" role="tab" aria-selected="false" aria-controls="tab-packages" id="btn-packages">Gestores</button>
            <button className="tab-btn" data-tab="manual" role="tab" aria-selected="false" aria-controls="tab-manual" id="btn-manual">Descarga manual</button>
            <button className="tab-btn" data-tab="build" role="tab" aria-selected="false" aria-controls="tab-build" id="btn-build">Compilar</button>
          </div>
          
          <div className="tab-panel active" id="tab-macos" role="tabpanel" aria-labelledby="btn-macos">
            <pre><code>{CODE_INSTALL_MACOS}</code></pre>
            <p>Descarga el binario de la última versión, verifica su checksum SHA-256 y lo instala en <code>~/.local/bin/tz</code>. No requiere permisos de administrador.</p>
            <h4>Opciones:</h4>
            <pre><code>{CODE_INSTALL_MACOS_OPTS}</code></pre>
          </div>
          
          <div className="tab-panel" id="tab-windows" role="tabpanel" aria-labelledby="btn-windows" hidden>
            <pre><code>{CODE_INSTALL_WINDOWS}</code></pre>
            <p>Instala en <code>%LOCALAPPDATA%\Programs\TzLang\bin</code> y añade esa carpeta al PATH del usuario. Tampoco necesita administrador. Abre una terminal nueva al terminar.</p>
          </div>
          
          <div className="tab-panel" id="tab-packages" role="tabpanel" aria-labelledby="btn-packages" hidden>
            <pre><code>{CODE_INSTALL_PACKAGES}</code></pre>
          </div>
          
          <div className="tab-panel" id="tab-manual" role="tabpanel" aria-labelledby="btn-manual" hidden>
            <table className="simple-table">
              <thead><tr><th>Sistema</th><th>Archivo</th></tr></thead>
              <tbody>
                <tr><td>macOS (Intel y Apple Silicon)</td><td><code>tzlang-vX.Y.Z-macos-universal.tar.gz</code></td></tr>
                <tr><td>Linux x86-64</td><td><code>tzlang-vX.Y.Z-linux-x86_64.tar.gz</code></td></tr>
                <tr><td>Linux ARM64</td><td><code>tzlang-vX.Y.Z-linux-aarch64.tar.gz</code></td></tr>
                <tr><td>Windows x86-64</td><td><code>tzlang-vX.Y.Z-windows-x86_64.zip</code></td></tr>
              </tbody>
            </table>
            <p>Binarios en la <a href="https://github.com/tzerk-last/TzLanguaje/releases" target="_blank" rel="noopener noreferrer">página de releases</a> con <code>SHA256SUMS.txt</code> para verificación. Los binarios de Linux están enlazados estáticamente.</p>
          </div>
          
          <div className="tab-panel" id="tab-build" role="tabpanel" aria-labelledby="btn-build" hidden>
            <h4>Con CMake (los tres sistemas - recomendado)</h4>
            <pre><code>{CODE_BUILD_CMAKE}</code></pre>
            <p>Ejecutable en <code>build-cmake/tz</code> (<code>build-cmake\Release\tz.exe</code> en Windows).</p>
            
            <h4>Con Make (macOS y Linux - desarrollo)</h4>
            <pre><code>{CODE_BUILD_MAKE}</code></pre>
          </div>
        </div>

        <h3 className="mt-lg">Comprobar que funciona</h3>
        <pre><code>{CODE_CHECK}</code></pre>
      </div>
    </section>
  )
}

function LanguageReference() {
  const sections = [
    {
      id: 'variables',
      title: 'Variables',
      content: CODE_VARIABLES
    },
    {
      id: 'tipos',
      title: 'Tipos de datos',
      content: CODE_TIPOS
    },
    {
      id: 'operadores',
      title: 'Operadores aritméticos',
      content: CODE_OPERADORES
    },
    {
      id: 'condicionales',
      title: 'Condicionales',
      content: CODE_CONDICIONALES
    },
    {
      id: 'bucles',
      title: 'Bucles',
      content: CODE_BUCLES
    },
    {
      id: 'break-continue',
      title: 'Romper y continuar',
      content: CODE_BREAK_CONTINUE
    },
    {
      id: 'funciones',
      title: 'Funciones',
      content: CODE_FUNCIONES
    },
    {
      id: 'listas',
      title: 'Listas',
      content: CODE_LISTAS
    },
    {
      id: 'diccionarios',
      title: 'Diccionarios',
      content: CODE_DICCIONARIOS
    },
    {
      id: 'copia-profunda',
      title: 'Copia profunda',
      content: CODE_COPIA
    },
    {
      id: 'builtins',
      title: 'Funciones incorporadas (16)',
      content: 'TzLang incluye 16 funciones integradas:',
      table: [
        ['Función', 'Descripción', 'Ejemplo', 'Resultado'],
        ['largo(x)', 'Longitud de texto, lista o diccionario', 'largo("Hola")', '4'],
        ['tipo(x)', 'Nombre del tipo', 'tipo(3.14)', 'decimal'],
        ['texto(x)', 'Convierte a texto', 'texto(42)', '"42"'],
        ['numero(x)', 'Convierte a número entero', 'numero("42")', '42'],
        ['decimal(x)', 'Convierte a decimal', 'decimal(7)', '7'],
        ['agregar(lista, x)', 'Añade un elemento al final', 'agregar(l, 4)', '—'],
        ['eliminar(x, k)', 'Borra por índice o por clave', 'eliminar(l, 0)', '—'],
        ['contiene(x, v)', '¿Contiene el valor o la clave?', 'contiene(l, 99)', 'verdadero'],
        ['unir(lista, sep)', 'Une una lista de textos', 'unir(["a","b"], "-")', '"a-b"'],
        ['separar(txt, sep)', 'Parte un texto en lista', 'separar("a,b", ",")', '["a", "b"]'],
        ['mayusculas(txt)', 'Pasa a mayúsculas', 'mayusculas("hola")', '"HOLA"'],
        ['minusculas(txt)', 'Pasa a minúsculas', 'minusculas("HOLA")', '"hola"'],
        ['absoluto(x)', 'Valor absoluto', 'absoluto(-7)', '7'],
        ['redondear(x)', 'Redondea a número', 'redondear(3.7)', '4'],
        ['claves(dic)', 'Lista de claves', 'claves(p)', '["nombre"]'],
        ['valores(dic)', 'Lista de valores', 'valores(p)', '["Carlos"]'],
      ],
      note: '<code>agregar</code> y <code>eliminar</code> modifican la estructura que reciben; el resto devuelven un valor nuevo.'
    },
    {
      id: 'errores',
      title: 'Errores',
      content: CODE_ERRORS
    },
  ]

  return (
    <section id="lenguaje" className="section" aria-labelledby="lenguaje-title">
      <div className="container">
        <h2 id="lenguaje-title">Referencia del lenguaje</h2>
        <div className="language-grid">
          {sections.map((section, i) => (
            <div key={section.id} className="lang-card">
              <h3>{section.title}</h3>
              <div className="lang-content">
                {section.table ? (
                  <>
                    <p>{section.content}</p>
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>{section.table[0].map((h, j) => <th key={j}>{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {section.table.slice(1).map((row, j) => (
                            <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {section.note && <p className="note" dangerouslySetInnerHTML={{ __html: section.note }} />}
                  </>
                ) : (
                  <pre><code>{section.content}</code></pre>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  return (
    <section id="arquitectura" className="section section-alt" aria-labelledby="arquitectura-title">
      <div className="container">
        <h2 id="arquitectura-title">Arquitectura</h2>
        <p>El intérprete procesa cada programa en una tubería de etapas bien separadas, cada una en su propio directorio dentro de <code>src/</code>:</p>
        
        <div className="pipeline" role="img" aria-label="Pipeline del intérprete: archivo .tz → Lexer → Parser → AST → Interpreter → Runtime → salida">
          <div className="pipeline-step">
            <div className="step-box">archivo .tz</div>
            <div className="arrow" aria-hidden="true">▼</div>
          </div>
          <div className="pipeline-step">
            <div className="step-box highlighted">Lexer</div>
            <div className="step-desc">texto → tokens</div>
            <div className="arrow" aria-hidden="true">▼</div>
          </div>
          <div className="pipeline-step">
            <div className="step-box highlighted">Parser</div>
            <div className="step-desc">tokens → AST</div>
            <div className="arrow" aria-hidden="true">▼</div>
          </div>
          <div className="pipeline-step">
            <div className="step-box highlighted">AST</div>
            <div className="step-desc">estructura del programa</div>
            <div className="arrow" aria-hidden="true">▼</div>
          </div>
          <div className="pipeline-step">
            <div className="step-box highlighted">Interpreter</div>
            <div className="step-desc">recorre y ejecuta</div>
            <div className="arrow" aria-hidden="true">▼</div>
          </div>
          <div className="pipeline-step">
            <div className="step-box highlighted">Runtime</div>
            <div className="step-desc">valores, operaciones, memoria</div>
            <div className="arrow" aria-hidden="true">▼</div>
          </div>
          <div className="pipeline-step">
            <div className="step-box">salida</div>
          </div>
        </div>

        <h3 className="mt-lg">Estructura del proyecto</h3>
        <pre><code>{CODE_PROJECT}</code></pre>
      </div>
    </section>
  )
}

function Development() {
  return (
    <section id="desarrollo" className="section" aria-labelledby="desarrollo-title">
      <div className="container">
        <h2 id="desarrollo-title">Desarrollo y Pruebas</h2>
        
        <h3>Comandos principales (Makefile)</h3>
        <table>
          <thead>
            <tr><th>Orden</th><th>Qué hace</th></tr>
          </thead>
          <tbody>
            <tr><td><code>make</code></td><td>Compila <code>build/tzc</code></td></tr>
            <tr><td><code>make test</code></td><td>Compila y ejecuta la suite principal</td></tr>
            <tr><td><code>make test-education</code></td><td>Valida el material de <code>education/</code></td></tr>
            <tr><td><code>make debug</code></td><td>Genera <code>build/tzc-debug</code> con <code>-g -O0</code></td></tr>
            <tr><td><code>make asan</code></td><td>Genera <code>build/tzc-asan</code> y pasa la suite con sanitizers</td></tr>
            <tr><td><code>make install</code></td><td>Instala el comando <code>tz</code></td></tr>
            <tr><td><code>make uninstall</code></td><td>Desinstala el comando <code>tz</code></td></tr>
            <tr><td><code>make clean</code></td><td>Borra todo lo generado en <code>build/</code></td></tr>
          </tbody>
        </table>

        <p>El compilador se puede elegir pasando la variable <code>CC</code>, por ejemplo <code>make CC=clang</code>.</p>

        <h3>Pruebas</h3>
        <p>La suite principal ejecuta el binario real sobre archivos <code>.tz</code> y compara la salida y el código de salida con lo esperado. No enlaza contra funciones internas de C: prueba el lenguaje tal y como lo ve un usuario.</p>
        <pre><code>{CODE_TESTS}</code></pre>
        <p>Las 138 pruebas cubren aritmética, desbordamiento de enteros, conversiones, textos, listas, diccionarios, indexación anidada, control de flujo, funciones, recursión, scope, errores de lexer, parser e intérprete, y el comportamiento de la CLI (BOM UTF-8, CRLF, archivos vacíos, extensiones y argumentos inválidos).</p>

        <h3>Sanitizers</h3>
        <p><code>make asan</code> compila un binario aparte con AddressSanitizer y UndefinedBehaviorSanitizer, y pasa por él la misma suite completa. Sirve para detectar use-after-free, dobles liberaciones, desbordamientos de búfer y comportamiento indefinido.</p>
        <p>Los tres binarios conviven sin pisarse: <code>build/tzc</code>, <code>build/tzc-debug</code> y <code>build/tzc-asan</code>.</p>

        <h3>Education</h3>
        <p>El directorio <code>education/</code> contiene lecciones progresivas. Cada una es un programa <code>.tz</code> acompañado de un archivo <code>.expected</code> con su salida exacta, de modo que el material didáctico se verifica automáticamente y no puede quedar desactualizado respecto al lenguaje:</p>
        <pre><code>{CODE_EDUCATION}</code></pre>
        <p>Esta suite es independiente de la principal y es más estricta: exige código de salida 0, stderr vacío y coincidencia exacta de stdout. Ahora mismo hay una lección; ampliar el temario es una de las prioridades del proyecto.</p>
      </div>
    </section>
  )
}

function Roadmap() {
  const limitations = [
    'Unicode: Los textos se tratan como bytes, no como caracteres. <code>largo("año")</code> devuelve 4 en lugar de 3, y <code>mayusculas("año")</code> deja intacta la ñ.',
    'Ausencias del lenguaje: No hay módulos ni importaciones, clases, funciones anónimas, generadores, conjuntos, tuplas, recolector de basura ni enteros de precisión arbitraria. Tampoco existe el operador de módulo (<code>%</code>).',
    'Plataformas: Solo se ha validado sobre macOS con Apple Clang.',
  ]

  const roadmap = [
    { priority: 1, title: 'Soporte real de Unicode en textos y funciones de cadena' },
    { priority: 2, title: 'Ampliar el temario de education/ con más lecciones' },
    { priority: 3, title: 'Mensajes de error con número de línea y contexto en todas las etapas' },
    { priority: 4, title: 'Validar de verdad la compilación en Linux y con GCC' },
    { priority: 5, title: 'Unificar el nombre del comando en la ayuda integrada' },
    { priority: 6, title: 'Sistema de módulos' },
  ]

  const done = [
    'Lexer, parser, AST, intérprete y runtime propios',
    'Variables y los siete tipos',
    'Operadores aritméticos, de comparación y lógicos',
    'Sintaxis comparativa en español',
    'Condicionales, bucles, romper y continuar',
    'Funciones con parámetros, retorno, recursión y scope léxico',
    'Listas y diccionarios anidados con copia profunda',
    '16 funciones incorporadas',
    'CLI con códigos de salida diferenciados',
    'Suite de 138 pruebas',
    'Compilación con sanitizers e instalación mediante make install',
  ]

  return (
    <section id="roadmap" className="section section-alt" aria-labelledby="roadmap-title">
      <div className="container">
        <h2 id="roadmap-title">Roadmap y Limitaciones</h2>
        
        <h3>Limitaciones actuales</h3>
        <ul className="limitations-list">
          {limitations.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>

        <h3>Lo terminado en la 0.1.0</h3>
        <ul className="checklist">
          {done.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3>Lo siguiente (por prioridad)</h3>
        <ol className="roadmap-list">
          {roadmap.map(item => (
            <li key={item.priority}>
              <span className="priority">{item.priority}</span>
              {item.title}
            </li>
          ))}
        </ol>
        <p className="note mt-md">No hay fechas comprometidas: es un proyecto en desarrollo.</p>

        <h3 className="mt-lg">Documentación</h3>
        <p>La referencia completa del lenguaje, sección por sección, está en <code>docs/language.md</code>.</p>

        <h3>Licencia</h3>
        <p>TzLang se distribuye bajo la licencia MIT. Consulta el archivo <code>LICENSE</code> para el texto completo.</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <p>TzLang • Lenguaje de programación educativo en español</p>
        <p>Construido en C11 • Licencia MIT</p>
        <a href="https://github.com/tzerk-last/TzLanguaje" target="_blank" rel="noopener noreferrer">
          Ver en GitHub
        </a>
      </div>
    </footer>
  )
}

function App() {
  useEffect(() => {
    // Tab handling
    const tabButtons = document.querySelectorAll('.tab-btn')
    const tabPanels = document.querySelectorAll('.tab-panel')
    
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
        const panel = document.getElementById('tab-' + target)
        panel?.classList.add('active')
        if (panel) panel.hidden = false
      })
    })

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle')
    const navMenu = document.getElementById('nav-menu')
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open')
        navToggle.setAttribute('aria-expanded', isOpen.toString())
      })

      // Close menu when clicking a link
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open')
          navToggle.setAttribute('aria-expanded', 'false')
        })
      })
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatIs />
        <SpanishSyntax />
        <Examples />
        <Installation />
        <LanguageReference />
        <Architecture />
        <Development />
        <Roadmap />
      </main>
      <Footer />
    </>
  )
}

export default App