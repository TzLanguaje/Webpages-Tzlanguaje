import { VideoPlayer } from '../components/VideoPlayer';
import { TutorialProgress } from '../components/TutorialProgress';
import { StepCard } from '../components/StepCard';

const PRIMEROS_PASOS_STEPS = [
  {
    id: 'instalacion',
    label: 'Instalación',
    title: '01 — Instalación',
    description: 'Instala TzLang en tu sistema. Elige el instalador para tu sistema operativo.',
    code: `# macOS y Linux
curl -fsSL https://raw.githubusercontent.com/TzLanguaje/TzLanguaje/main/install.sh | sh

# Windows (PowerShell)
irm https://raw.githubusercontent.com/TzLanguaje/TzLanguaje/main/install.ps1 | iex

# Verificar instalación
tz --version`
  },
  {
    id: 'hola-mundo',
    label: 'Hola mundo',
    title: '02 — Tu primer programa',
    description: 'Escribe y ejecuta tu primer programa en TzLang.',
    code: `imprimir "Hola desde TzLang"
// Guárdalo como hola.tz y ejecuta:
// tz hola.tz`
  },
  {
    id: 'variables',
    label: 'Variables y tipos',
    title: '03 — Variables y tipos',
    description: 'Aprende a declarar variables y los tipos de datos básicos.',
    code: `variable nombre = "Ana"
variable edad = 20
variable activo = verdadero
variable precio = 19.99

imprimir tipo(edad)      // numero
imprimir tipo(precio)    // decimal
imprimir tipo(nombre)    // texto
imprimir tipo(activo)    // booleano`
  },
  {
    id: 'control-flujo',
    label: 'Control de flujo',
    title: '04 — Control de flujo',
    description: 'Condicionales (si, sino si, sino) y bucles (mientras, para cada).',
    code: `variable edad = 20

si edad es mayor o igual que 18
    imprimir "Mayor de edad"
sino si edad es mayor o igual que 13
    imprimir "Adolescente"
sino
    imprimir "Niño"
fin

variable i = 1
mientras i es menor o igual que 5
    imprimir i
    i = i + 1
fin

variable frutas = ["manzana", "pera", "uva"]
para cada fruta en frutas
    imprimir fruta
fin`
  },
  {
    id: 'funciones',
    label: 'Funciones',
    title: '05 — Funciones',
    description: 'Crea funciones reutilizables con parámetros, retorno y recursión.',
    code: `funcion saludar(nombre)
    imprimir "Hola, " + nombre
fin

funcion factorial(n)
    si n es menor o igual que 1
        retornar 1
    fin
    retornar n * factorial(n - 1)
fin

imprimir factorial(5)  # 120`
  },
  {
    id: 'listas-diccionarios',
    label: 'Listas y diccionarios',
    title: '06 — Listas y diccionarios',
    description: 'Trabaja con colecciones: índices negativos, concatenación, métodos.',
    code: `variable numeros = [1, 2, 3]
imprimir numeros[-1]     // 3 (índice negativo)
agregar(numeros, 4)
imprimir numeros         // [1, 99, 3, 4]

eliminar(numeros, 0)
imprimir numeros         // [99, 3, 4]

// Concatenación de listas
imprimir [1, 2] + [3, 4]  // [1, 2, 3, 4]`
  },
  {
    id: 'entrada',
    label: 'Entrada de usuario',
    title: '07 — Entrada de usuario',
    description: 'Interactúa con el usuario leyendo datos desde teclado.',
    code: `variable nombre = entrada("¿Cómo te llamas? ")
imprimir "Hola, " + nombre

variable edad = numero(entrada("¿Cuántos años tienes? "))
imprimir "El año que viene tendrás " + texto(edad + 1)`
  },
  {
    id: 'builtins',
    label: 'Funciones built-in',
    title: '08 — Funciones incorporadas',
    description: 'Las 17 funciones integradas para manipular datos.',
    code: `imprimir largo("Hola")        # 4
imprimir tipo(3.14)         # decimal
imprimir texto(42)          # "42"
imprimir numero("42")       # 42
imprimir decimal(7)         # 7
imprimir agregar(lista, x)   # Añade elemento
imprimir eliminar(x, k)      # Borra por índice/clave
imprimir contiene(x, v)      # ¿Contiene valor/clave?
imprimir unir(lista, sep)    # Une lista de textos
imprimir separar(txt, sep)   # Parte texto en lista
imprimir mayusculas(txt)     # "HOLA"
imprimir minusculas(txt)     # "hola"
imprimir absoluto(x)         # Valor absoluto
imprimir redondear(x)        # Redondea a numero
imprimir claves(dic)         # Lista de claves
imprimir valores(dic)        # Lista de valores
imprimir entrada("Nombre: ")   # Lee del teclado`
  },
  {
    id: 'proyecto',
    label: 'Proyecto: Agenda',
    title: '09 — Proyecto: Agenda de contactos',
    description: 'Mini-proyecto integrador: una agenda de contactos con búsqueda y listado.',
    code: `funcion mostrar_contacto(contacto)
    imprimir "Nombre: " + contacto["nombre"]
    imprimir "Teléfono: " + contacto["telefono"]
    imprimir "---"
fin

variable agenda = [
    { "nombre": "Ana", "telefono": "555-1234" },
    { "nombre": "Carlos", "telefono": "555-5678" }
]

para cada contacto en agenda
    mostrar_contacto(contacto)
fin

# Agregar nuevo contacto
funcion agregar(nombre, telefono)
    agregar(agenda, { "nombre": nombre, "telefono": telefono })
fin

agregar("Lucía", "555-9999")`
  }
];

export function PrimerosPasosPage() {
  return (
    <>
      <section id="primeros-pasos" className="section" aria-labelledby="primeros-pasos-title">
        <div className="container">
          <header className="page-hero">
            <h1 id="primeros-pasos-title">Primeros pasos</h1>
            <p className="hero-tagline">
              De cero a tu primer programa. Instala TzLang, escribe código y construye algo real.
            </p>
            
            <VideoPlayer
              src="tu-primer-programa-tzlang.mp4"
              poster="tu-primer-programa-tzlang-poster.jpg"
              title="Tu primer programa en TzLang"
              preload="metadata"
            />
          </header>

          <div className="tutorial-layout">
            <TutorialProgress steps={PRIMEROS_PASOS_STEPS} />
            
            <main className="tutorial-content">
              <section className="tutorial-intro">
                <h2>Qué vamos a aprender</h2>
                <p>
                  En esta guía pasarás de no saber nada de TzLang a tener un programa 
                  funcional. Cada paso introduce un concepto nuevo y termina con un 
                  ejercicio práctico.
                </p>
                <p>Tiempo estimado: 20-30 minutos.</p>
              </section>

              {PRIMEROS_PASOS_STEPS.map((step) => (
                <StepCard 
                  key={step.id} 
                  id={step.id}
                  title={step.title}
                  description={step.description}
                  code={step.code}
                />
              ))}

              <section className="tutorial-next">
                <h2>¿Qué sigue?</h2>
                <p>
                  ¡Felicidades! Ya tienes una agenda de contactos funcional. 
                  Para seguir aprendiendo:
                </p>
                <ul>
                  <li><a href="/sintaxis">Referencia completa del lenguaje</a></li>
                  <li><a href="/desarrollo">Cómo contribuir al proyecto</a></li>
                  <li><a href="https://github.com/TzLanguaje/TzLanguaje" target="_blank" rel="noopener noreferrer">Código fuente en GitHub</a></li>
                </ul>
              </section>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrimerosPasosPage;