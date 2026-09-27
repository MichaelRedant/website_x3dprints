const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`,
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'en-US' });
  await page.goto('https://wiki.bambulab.com/en/software/bambu-studio/support', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  console.log('frames', page.frames().length);
  for (const [index, frame] of page.frames().entries()) {
    const matches = await frame.locator('text=Reject All').count().catch(() => 0);
    console.log('frame', index, frame.url(), 'matches', matches);
    if (!matches) continue;
    const data = await frame.locator('text=Reject All').first().evaluate((node) => {
      const rows = [];
      let current = node;
      for (let i = 0; current && i < 8; i += 1, current = current.parentElement) {
        rows.push({ tag: current.tagName, id: current.id, cls: current.className, text: (current.textContent || '').slice(0, 120) });
      }
      return rows;
    });
    console.log(JSON.stringify(data, null, 2));
  }
  await browser.close();
})();
