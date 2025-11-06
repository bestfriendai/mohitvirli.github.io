const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  await page.goto('http://localhost:3001');
  await page.waitForTimeout(3000); // Wait for 3D scene to load

  console.log('Starting scroll test...');
  await page.screenshot({ path: 'scroll-test-0.png' });

  // Simulate mouse wheel scrolling
  for (let i = 1; i <= 20; i++) {
    console.log(`Scroll step ${i}...`);

    // Wheel down
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(500);

    // Take screenshot every 5 steps
    if (i % 5 === 0) {
      await page.screenshot({ path: `scroll-test-${i}.png` });

      // Check what's visible in the DOM
      const info = await page.evaluate(() => {
        // Look for portfolio sections
        const projects = document.querySelector('h2, h3, [id="projects"]');
        const about = document.querySelector('[id="about"]');
        const contact = document.querySelector('[id="contact"]');

        // Get all visible text
        const allText = document.body.innerText.substring(0, 500);

        return {
          hasProjects: !!projects,
          hasAbout: !!about,
          hasContact: !!contact,
          textPreview: allText.substring(0, 200)
        };
      });

      console.log(`  Step ${i} visibility:`, info);
    }
  }

  console.log('\nTest complete! Check scroll-test-*.png files');
  await page.waitForTimeout(2000);
  await browser.close();
})();
