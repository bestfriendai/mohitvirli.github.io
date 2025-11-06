const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('http://localhost:3001');
  await page.waitForTimeout(3000); // Wait for 3D scene to load

  console.log('Taking initial screenshot...');
  await page.screenshot({ path: 'screenshot-0-start.png', fullPage: false });

  // Find the scroll container (Three.js ScrollControls creates a div with specific styles)
  const scrollContainer = await page.evaluate(() => {
    // ScrollControls creates a div with overflow:auto and position:absolute
    const divs = Array.from(document.querySelectorAll('div'));
    const scrollDiv = divs.find(div => {
      const style = window.getComputedStyle(div);
      return style.overflow === 'auto' && style.position === 'absolute';
    });
    return scrollDiv ? true : false;
  });

  console.log('Found scroll container:', scrollContainer);

  // Scroll down in steps and take screenshots
  for (let i = 1; i <= 10; i++) {
    const scrollPercent = i * 10;
    console.log(`Scrolling to ${scrollPercent}%...`);

    await page.evaluate((percent) => {
      // Find the scroll container
      const divs = Array.from(document.querySelectorAll('div'));
      const scrollDiv = divs.find(div => {
        const style = window.getComputedStyle(div);
        return style.overflow === 'auto' && style.position === 'absolute';
      });

      if (scrollDiv) {
        const scrollAmount = (scrollDiv.scrollHeight - scrollDiv.clientHeight) * (percent / 100);
        scrollDiv.scrollTo(0, scrollAmount);
        console.log(`Scrolled to: ${scrollDiv.scrollTop} of ${scrollDiv.scrollHeight}`);
      } else {
        console.log('Scroll container not found');
      }
    }, scrollPercent);

    await page.waitForTimeout(1500);

    // Check what's visible
    const visibility = await page.evaluate(() => {
      const portfolioContent = document.querySelector('[data-testid="portfolio-content"]');
      const footer = document.querySelector('[data-testid="footer"]');
      return {
        portfolioVisible: portfolioContent ? window.getComputedStyle(portfolioContent).display !== 'none' : false,
        footerVisible: footer ? window.getComputedStyle(footer).display !== 'none' : false,
        scrollY: window.scrollY,
        scrollHeight: document.documentElement.scrollHeight,
        innerHeight: window.innerHeight
      };
    });

    console.log(`  Scroll ${scrollPercent}%:`, visibility);
    await page.screenshot({ path: `screenshot-${i}-${scrollPercent}pct.png`, fullPage: false });
  }

  console.log('\nScreenshots saved!');
  await browser.close();
})();
