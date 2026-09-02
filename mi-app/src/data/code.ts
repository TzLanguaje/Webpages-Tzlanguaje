// Constantes de codigo de ejemplo compartidas entre paginas
export const CODE_COMPARISON = `variable edad = 20

si edad es mayor o igual que 18
    imprimir "Mayor de edad"
sino
    imprimir "Menor de edad"
fin
// Mayor de edad`

export const CODE_MIXED = `variable edad = 20

imprimir edad es mayor que 18
imprimir edad > 18
// verdadero
// verdadero`

export const CODE_LOGICAL = `variable edad = 20
variable tiene_documento = verdadero

si (edad es mayor o igual que 18) y (tiene_documento)
    imprimir "Puede entrar"
fin

si no (edad es igual a 30)
    imprimir "No tiene 30"
fin
// Puede entrar
// No tiene 30`

export const CODE_FULL = `// Clasificar estudiantes por su nota

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

export const CODE_CHECK = `tz --version
# TzLang 0.5.0`

export const CODE_VARIABLES = `variable nombre = "Carlos"
variable edad = 20

edad = edad + 1
imprimir edad
// 21`

export const CODE_TIPOS = `imprimir tipo(42)        // numero
imprimir tipo(3.14)      // decimal
imprimir tipo("Hola")    // texto
imprimir tipo(verdadero) // booleano
imprimir tipo(nulo)      // nulo
imprimir tipo([1, 2, 3]) // lista
imprimir tipo({"a": 1})  // diccionario`

export const CODE_ESCAPES = `imprimir "Dice \"hola\""
imprimir "uno\ndos"
imprimir "columna1\tcolumna2"
imprimir "ruta\\archivo"`

export const CODE_OPERADORES = `imprimir 7 + 3    // 10
imprimir 7 - 3    // 4
imprimir 7 * 3    // 21
imprimir 7 / 3    // 2 (trunca hacia cero)
imprimir 7 % 3    // 1 (resto)
imprimir 7.0 / 2  // 3.5
imprimir -5       // -5
imprimir 2 + 3 * 4  // 14
imprimir (2 + 3) * 4 // 20`

export const CODE_CONDICIONALES = `variable nota = 85

si nota es mayor o igual que 90
    imprimir "Sobresaliente"
sino si nota es mayor o igual que 70
    imprimir "Aprobado"
sino si nota es mayor o igual que 50
    imprimir "Justo"
sino
    imprimir "Puede mejorar"
fin`

export const CODE_BUCLES = `variable i = 1

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

export const CODE_BREAK_CONTINUE = `variable n = 0

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

export const CODE_FUNCIONES = `funcion sumar(a, b)
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

export const CODE_LISTAS = `variable numeros = [1, 2, 3]

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

export const CODE_DICCIONARIOS = `variable persona = {
    "nombre": "Carlos",
    "edad": 20
}

imprimir persona["nombre"]  // Carlos

persona["edad"] = 21
persona["pais"] = "Colombia"

imprimir persona                    // {"nombre": "Carlos", "edad": 21, "pais": "Colombia"}
imprimir claves(persona)            // ["nombre", "edad", "pais"]
imprimir valores(persona)           // ["Carlos", 21, "Colombia"]`

export const CODE_COPIA = `variable a = {"datos": {"edad": 20}}
variable b = a

b["datos"]["edad"] = 99

imprimir a["datos"]["edad"]  // 20 (no cambió)
imprimir b["datos"]["edad"]  // 99`

export const CODE_ENTRADA = `variable nombre = entrada("¿Cómo te llamas? ")
imprimir "Hola, " + nombre

variable edad = numero(entrada("¿Cuántos años tienes? "))
imprimir "El año que viene tendrás " + texto(edad + 1)
// ¿Cómo te llamas? Ana
// Hola, Ana
// ¿Cuántos años tienes? 30
// El año que viene tendrás 31`

export const CODE_ERRORS = `imprimir 10 / 0
// Error en linea 1: división por cero.
// La ejecución falló.

imprimir desconocida
// Error en linea 1: variable 'desconocida' no existe.
// La ejecución falló.`

export const CODE_PROJECT = `TzLang/
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

export const CODE_TESTS = `make test
========================================
Tests:  244
Passed: 244
Failed: 0
========================================

All tests passed.`

export const CODE_EDUCATION = `make test-education
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
