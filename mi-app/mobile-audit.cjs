const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');

(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
  const p = await c.newPage();
  await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  const r = await new AxeBuilder({ page: p }).withTags(['wcag2a','wcag2aa']).analyze();
  r.violations.forEach(x => {
    console.log(x.id, x.impact);
    x.nodes.slice(0,3).forEach(n => console.log(' ', n.target.join(' > ')));
  });
  await b.close();
})();