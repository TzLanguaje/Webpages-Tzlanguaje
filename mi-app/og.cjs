const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const page = await (await b.newContext({ viewport: { width: 1200, height: 630 } })).newPage();
  const html = `<!DOCTYPE html><html><body style="margin:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 30% 20%, #1e1b2e 0%, #0d0d14 70%);font-family:'Courier New',monospace">
    <div style="width:190px;height:190px;background:#a855f7;border-radius:28px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 60px rgba(168,85,247,0.4)">
      <span style="font-size:110px;font-weight:bold;color:#0d0d14">Tz</span>
    </div>
    <h1 style="color:#ffffff;font-size:110px;margin:26px 0 6px;letter-spacing:-2px">TzLang</h1>
    <p style="color:#c084fc;font-size:30px;margin:0">Lenguaje de programación en español</p>
    <p style="color:#9a9ab8;font-size:22px;margin:10px 0 0">Hecho en C11 · Open Source · Multiplataforma</p>
  </body></html>`;
  await page.setContent(html);
  await page.screenshot({ path: 'public/og-image.png' });
  console.log('og-image.png creado');
  await b.close();
})();
