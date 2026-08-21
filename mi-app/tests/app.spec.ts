import { test, expect } from '@playwright/test'

test.describe('TzLang Multi-page Site', () => {
  
  test.describe('Home Page (/)', () => {
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
      await expect(h1).toContainText('TzLang')
      
      const badge = hero.locator('.badge')
      await expect(badge.first()).toContainText('CI')
      await expect(badge.nth(1)).toContainText('Versión 0.3.4')
    })

    test('should have animated code examples in hero', async ({ page }) => {
      const heroCode = page.locator('.hero-code-animated')
      await expect(heroCode).toBeVisible()
      
      const badge = heroCode.locator('.code-badge')
      await expect(badge).toBeVisible()
      
      const indicators = heroCode.locator('.indicator-dot')
      await expect(indicators).toHaveCount(8)
    })

    test('should have navigation with all pages', async ({ page }) => {
      const navLinks = page.locator('.nav-links a')
      await expect(navLinks).toHaveCount(4)
      
      const expectedPages = ['Inicio', 'Qué es TzLang', 'Sintaxis', 'Desarrollo']
      
      for (const pageName of expectedPages) {
        await expect(navLinks.filter({ hasText: pageName })).toBeVisible()
      }
    })

    test('should have installation section on home', async ({ page }) => {
      await expect(page.locator('#instalacion')).toBeVisible()
      
      // Check download table with links
      const table = page.locator('.simple-table').first()
      await expect(table).toBeVisible()
      
      // Check Windows link
      const windowsLink = table.locator('a[href*="windows-x86_64-setup.exe"]')
      await expect(windowsLink).toBeVisible()
      await expect(windowsLink).toHaveAttribute('href', 'https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.3.4/TzLang-v0.3.4-windows-x86_64-setup.exe')
      
      // Check Mac link
      const macLink = table.locator('a[href*="macos.pkg"]')
      await expect(macLink).toBeVisible()
await expect(macLink).toHaveAttribute('href', 'https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.3.4/TzLang-v0.3.4-macos.pkg')
      
      // Check Debian link
      const debLink = table.locator('a[href*="amd64.deb"]')
      await expect(debLink).toBeVisible()
      await expect(debLink).toHaveAttribute('href', 'https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.3.4/tzlang_0.3.4_amd64.deb')
      
      // Check RPM link
      const rpmLink = table.locator('a[href*="x86_64.rpm"]')
      await expect(rpmLink).toBeVisible()
      await expect(rpmLink).toHaveAttribute('href', 'https://github.com/TzLanguaje/TzLanguaje/releases/download/v0.3.4/tzlang-0.3.4-1.x86_64.rpm')
    })
    
    test('should have roadmap section on home', async ({ page }) => {
      await expect(page.locator('#roadmap')).toBeVisible()
      await expect(page.locator('text=Limitaciones actuales')).toBeVisible()
      await expect(page.locator('text=Unicode').first()).toBeVisible()
      await expect(page.locator('text=Paso de argumentos').first()).toBeVisible()
      await expect(page.locator('text=Ausencias del lenguaje')).toBeVisible()
      
      await expect(page.locator('text=Lo terminado en la 0.3.4')).toBeVisible()
      await expect(page.locator('li:has-text("Lexer, parser, AST")').first()).toBeVisible()
      
      await expect(page.locator('text=Lo siguiente')).toBeVisible()
      await expect(page.locator('text=Soporte real de Unicode').first()).toBeVisible()
    })

    test('should have footer with GitHub link', async ({ page }) => {
      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
      
      // Check the TzLanguaje GitHub link (the main repo link)
      const githubLink = footer.locator('a[href="https://github.com/TzLanguaje/TzLanguaje"]')
      await expect(githubLink).toBeVisible()
      await expect(githubLink).toHaveAttribute('href', 'https://github.com/TzLanguaje/TzLanguaje')
      
      // Also verify the Mk1-mid link exists
      const mk1Link = footer.locator('a[href="https://github.com/Mk1-mid"]')
      await expect(mk1Link).toBeVisible()
    })
  })

  test.describe('Qué es TzLang Page (/que-es)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/que-es')
      await page.waitForLoadState('networkidle')
    })

    test('should load without errors', async ({ page }) => {
      await expect(page).toHaveTitle(/TzLang/)
    })

    test('should have qué es section with components', async ({ page }) => {
      await expect(page.locator('#que-es')).toBeVisible()
      
      const components = ['Lexer', 'Parser', 'AST', 'Intérprete', 'Runtime', 'Diagnostic']
      for (const comp of components) {
        await expect(page.locator(`.component-card:has-text("${comp}")`).first()).toBeVisible()
      }
    })

    test('should have syntax example section', async ({ page }) => {
      await expect(page.locator('#sintaxis-ejemplo')).toBeVisible()
      await expect(page.locator('.comparison-table')).toBeVisible()
      
      const rows = page.locator('.comparison-table tbody tr')
      await expect(rows).toHaveCount(6)
    })

    test('should NOT have installation section', async ({ page }) => {
      await expect(page.locator('#instalacion')).not.toBeVisible()
    })

    test('should NOT have first program example', async ({ page }) => {
      await expect(page.locator('code:has-text(\'imprimir "Hola desde TzLang"\')')).not.toBeVisible()
    })
  })

  test.describe('Sintaxis Page (/sintaxis)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/sintaxis')
      await page.waitForLoadState('networkidle')
    })

    test('should load without errors', async ({ page }) => {
      await expect(page).toHaveTitle(/TzLang/)
    })

    test('should have language reference with 13 items', async ({ page }) => {
      const items = page.locator('.reference-item')
      await expect(items).toHaveCount(13)
      
      const titles = [
        'Variables', 'Tipos de datos', 'Secuencias de escape', 'Operadores aritméticos',
        'Condicionales', 'Bucles', 'Romper y continuar', 'Funciones',
        'Listas', 'Diccionarios', 'Copia profunda', 'Entrada del usuario',
        'Errores'
      ]
      
      for (const title of titles) {
        await expect(items.filter({ hasText: title }).first()).toBeVisible()
      }
    })

    test('should have builtins section with 17 function cards', async ({ page }) => {
      await expect(page.locator('#builtins')).toBeVisible()
      
      const builtinCards = page.locator('.builtin-card')
      await expect(builtinCards).toHaveCount(17)
      
      // Check first card has proper structure
      const firstCard = builtinCards.first()
      await expect(firstCard.locator('.builtin-name')).toBeVisible()
      await expect(firstCard.locator('.builtin-desc')).toBeVisible()
      await expect(firstCard.locator('.builtin-example')).toBeVisible()
    })

    test('should have examples section with full program', async ({ page }) => {
      await expect(page.locator('#ejemplos')).toBeVisible()
      await expect(page.locator('.code-example pre code').last()).toContainText('Clasificar estudiantes')
    })
  })

  test.describe('Desarrollo Page (/desarrollo)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/desarrollo')
      await page.waitForLoadState('networkidle')
    })

    test('should load without errors', async ({ page }) => {
      await expect(page).toHaveTitle(/TzLang/)
    })

    test('should have architecture pipeline', async ({ page }) => {
      await expect(page.locator('#arquitectura')).toBeVisible()
      const pipeline = page.locator('.pipeline')
      await expect(pipeline).toBeVisible()
      
      const steps = ['archivo .tz', 'Lexer', 'Parser', 'AST', 'Interpreter', 'Runtime', 'salida']
      for (const step of steps) {
        await expect(pipeline.locator(`.step-box:has-text("${step}")`)).toBeVisible()
      }
    })

    test('should have development commands table', async ({ page }) => {
      await expect(page.locator('#desarrollo')).toBeVisible()
      
      const table = page.locator('table').first()
      await expect(table).toBeVisible()
      
      const commands = ['make test', 'make test-education', 'make debug', 'make asan', 'make install']
      for (const cmd of commands) {
        await expect(table.locator(`code:has-text("${cmd}")`).first()).toBeVisible()
      }
    })

    test('should have education suite info', async ({ page }) => {
      await expect(page.locator('h3:has-text("Education")').first()).toBeVisible()
      await expect(page.locator('text=education/').first()).toBeVisible()
    })
  })

  test.describe('Cross-page Navigation', () => {
    test('should navigate between pages via nav links', async ({ page }) => {
      await page.goto('/')
      
      await page.click('a[href="/que-es"]')
      await expect(page).toHaveURL(/\/que-es/)
      await expect(page.locator('#que-es')).toBeVisible()
      
      await page.click('a[href="/sintaxis"]')
      await expect(page).toHaveURL(/\/sintaxis/)
      await expect(page.locator('#lenguaje')).toBeVisible()
      
      await page.click('a[href="/desarrollo"]')
      await expect(page).toHaveURL(/\/desarrollo/)
      await expect(page.locator('#arquitectura')).toBeVisible()
      
      await page.click('a[href="/"]')
      await expect(page).toHaveURL(/\/$/)
      await expect(page.locator('#inicio')).toBeVisible()
    })

    test('should highlight active nav link', async ({ page }) => {
      await page.goto('/que-es')
      await expect(page.locator('.nav-links a.active')).toContainText('Qué es TzLang')
      
      await page.goto('/sintaxis')
      await expect(page.locator('.nav-links a.active')).toContainText('Sintaxis')
      
      await page.goto('/desarrollo')
      await expect(page.locator('.nav-links a.active')).toContainText('Desarrollo')
      
      await page.goto('/')
      await expect(page.locator('.nav-links a.active')).toContainText('Inicio')
    })
  })

  test.describe('Responsive Design', () => {
    test('should show mobile menu toggle on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      await page.waitForTimeout(500)
      
      const navToggle = page.locator('.nav-toggle')
      await expect(navToggle).toBeVisible()
    })
  })

  test.describe('No Console Errors', () => {
    test('should have no console errors on any page', async ({ page }) => {
      const errors: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        }
      })
      
      const pages = ['/', '/que-es', '/sintaxis', '/desarrollo']
      
      for (const path of pages) {
        await page.goto(path)
        await page.waitForLoadState('networkidle')
      }
      
      expect(errors).toHaveLength(0)
    })
  })
})