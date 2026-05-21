const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  // Wait for 3D to render
  await page.waitForTimeout(5000);

  // Take screenshot
  await page.screenshot({ path: 'screenshot.png' });

  // Scroll
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot2.png' });

  await browser.close();

  console.log("Screenshots captured!");
  process.exit(0);
})();
