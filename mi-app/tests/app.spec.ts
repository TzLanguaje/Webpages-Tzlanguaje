import { test, expect } from '@playwright/test'

test.describe('TzLang Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should load without errors', async ({ page }) => {
    await expect(page).toHaveTitle(/TzLang/)
  })

  test('should have correct hero section', async ({ page }) => {
    const hero = page.locator('#inicio')
    await expect(hero).toBeVisible()
    
    const h1 = hero.locator('h1')
    await expect(h1).toContainText('lenguaje de programación educativo en español')
    
    const badge = hero.locator('.badge')
    await expect(badge.first()).toContainText('CI')
    await expect(badge.nth(1)).toContainText('Versión 0.1.0')
  })

  test('should have navigation with all sections', async ({ page }) => {
    const navLinks = page.locator('.nav-links a')
    await expect(navLinks).toHaveCount(9)
    
    const expectedSections = [
      'Inicio',
      'Qué es TzLang',
      'Sintaxis',
      'Ejemplos',
      'Instalación',
      'Referencia',
      'Arquitectura',
      'Desarrollo',
      'Roadmap'
    ]
    
    for (const section of expectedSections) {
      await expect(navLinks.filter({ hasText: section })).toBeVisible()
    }
  })

  test('should navigate to sections via anchor links', async ({ page }) => {
    await page.click('a[href="#que-es"]')
    await expect(page.locator('#que-es')).toBeInViewport()
    
    await page.click('a[href="#sintaxis"]')
    await expect(page.locator('#sintaxis')).toBeInViewport()
    
    await page.click('a[href="#instalacion"]')
    await expect(page.locator('#instalacion')).toBeInViewport()
  })

  test('should have installation tabs working', async ({ page }) => {
    await page.goto('/#instalacion')
    
    const tabs = page.locator('.tab-btn')
    await expect(tabs).toHaveCount(5)
    
    await tabs.nth(1).click() // Windows
    await expect(page.locator('#tab-windows')).toBeVisible()
    await expect(page.locator('#tab-windows')).not.toBeHidden()
    
    await tabs.nth(2).click() // Gestores
    await expect(page.locator('#tab-packages')).toBeVisible()
    
    await tabs.nth(3).click() // Manual
    await expect(page.locator('#tab-manual')).toBeVisible()
    
    await tabs.nth(4).click() // Compilar
    await expect(page.locator('#tab-build')).toBeVisible()
  })

  test('should have language reference sections', async ({ page }) => {
    await page.goto('/#lenguaje')
    
    const cards = page.locator('.lang-card')
    await expect(cards).toHaveCount(12)
    
    const titles = [
      'Variables',
      'Tipos de datos',
      'Operadores aritméticos',
      'Condicionales',
      'Bucles',
      'Romper y continuar',
      'Funciones',
      'Listas',
      'Diccionarios',
      'Copia profunda',
      'Funciones incorporadas (16)',
      'Errores'
    ]
    
    for (const title of titles) {
      await expect(cards.filter({ hasText: title })).toBeVisible()
    }
  })

  test('should have architecture pipeline', async ({ page }) => {
    await page.goto('/#arquitectura')
    
    const pipeline = page.locator('.pipeline')
    await expect(pipeline).toBeVisible()
    
    const steps = ['archivo .tz', 'Lexer', 'Parser', 'AST', 'Interpreter', 'Runtime', 'salida']
    for (const step of steps) {
      await expect(pipeline.locator(`.step-box:has-text("${step}")`)).toBeVisible()
    }
  })

  test('should have development section with commands', async ({ page }) => {
    await page.goto('/#desarrollo')
    
    const table = page.locator('table')
    await expect(table).toBeVisible()
    
    const commands = ['make', 'make test', 'make test-education', 'make debug', 'make asan', 'make install']
    for (const cmd of commands) {
      await expect(table.locator(`code:has-text("${cmd}")`)).toBeVisible()
    }
  })

  test('should have roadmap with limitations', async ({ page }) => {
    await page.goto('/#roadmap')
    
    await expect(page.locator('text=Limitaciones actuales')).toBeVisible()
    await expect(page.locator('text=Unicode')).toBeVisible()
    await expect(page.locator('text=Ausencias del lenguaje')).toBeVisible()
    await expect(page.locator('text=Plataformas')).toBeVisible()
    
    await expect(page.locator('text=Lo terminado en la 0.1.0')).toBeVisible()
    await expect(page.locator('text=Lexer, parser, AST')).toBeVisible()
    
    await expect(page.locator('text=Lo siguiente')).toBeVisible()
    await expect(page.locator('text=Soporte real de Unicode')).toBeVisible()
  })

  test('should have footer with GitHub link', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    
    const githubLink = footer.locator('a[href*="github.com"]')
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/tzerk-last/TzLanguaje')
  })

  test('should have code examples with syntax highlighting', async ({ page }) => {
    const codeBlocks = page.locator('pre code')
    await expect(codeBlocks.first()).toBeVisible()
    
    const heroCode = page.locator('.hero-code pre code')
    await expect(heroCode).toContainText('imprimir "Hola desde TzLang"')
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    const navToggle = page.locator('.nav-toggle')
    await expect(navToggle).toBeVisible()
    
    await navToggle.click()
    await expect(page.locator('.nav-links')).toHaveClass(/open/)
    
    await page.click('a[href="#ejemplos"]')
    await expect(page.locator('.nav-links')).not.toHaveClass(/open/)
  })

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    expect(errors).toHaveLength(0)
  })
})