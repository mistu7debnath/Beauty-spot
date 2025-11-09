const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Config
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const ROOT_PAGE = 'file://' + path.resolve(__dirname, '..', 'index.html');
const PRODUCTS = [
  'foundation','concealer','blush','eyeshadow','mascara','eyeliner','lipstick','lipgloss','settingspray','highlighter','brushes','bronzer','eyebrow','primer','blender'
];

// Configurable capture settings (tuned for visual verification / GIF creation)
const WAIT_AFTER_CLICK = 3000; // ms - how long to capture after opening preview
const FRAMES_PER_PRODUCT = 60; // number of screenshots per product (smoother GIF)
const VIEWPORT = { width: 720, height: 1280 }; // higher-res vertical frame
const PUPPETEER_HEADFUL = true; // set to false to run headless

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: !PUPPETEER_HEADFUL, args: ['--disable-infobars'], slowMo: 30 });
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  await page.goto(ROOT_PAGE);

  for (const product of PRODUCTS) {
    console.log('Capturing:', product);

    // make sure any open modals are closed (reset state)
    await page.evaluate(() => {
      document.querySelectorAll('.overlay, .loading-screen, .brand-selection, .makeup-features').forEach(el => el.style.display = 'none');
      // also remove any injected animation children
      const anim = document.getElementById('loading-animation');
      if (anim) anim.innerHTML = '';
    });

    // open makeup features modal
    await page.click('#makeup-box');
    await page.waitForSelector('#makeup-features', { visible: true });

    // find the product card and click it (click the card to trigger click handlers)
    const success = await page.evaluate((p) => {
      const card = [...document.querySelectorAll('.product-card')].find(c => c.dataset.product === p);
      if (!card) return false;
      card.scrollIntoView({behavior:'instant', block:'center'});
      // prefer clicking the card itself so event listeners attached higher catch it
      card.click();
      return true;
    }, product);

    if (!success) {
      console.warn('Product card not found:', product);
      continue;
    }

    // Wait for loading-screen to appear (some previews may be quick)
    await page.waitForSelector('#loading-screen', { visible: true, timeout: 4000 }).catch(() => {});

    const productDir = path.join(OUTPUT_DIR, product);
    if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });

    // capture frames for a short period
    const interval = Math.max(16, Math.floor(WAIT_AFTER_CLICK / FRAMES_PER_PRODUCT));
    for (let i = 0; i < FRAMES_PER_PRODUCT; i++) {
      const filename = path.join(productDir, `frame-${String(i).padStart(3,'0')}.png`);
      await page.screenshot({ path: filename });
      await page.waitForTimeout(interval);
    }

    // Close loading screen and modal (attempt graceful close)
    await page.evaluate(() => {
      const close = document.querySelector('#close-features');
      if (close) close.click();
      document.querySelectorAll('.loading-screen').forEach(s => s.style.display = 'none');
    });

    await page.waitForTimeout(600);
  }

  await browser.close();
  console.log('Capture complete. Frames are in:', OUTPUT_DIR);
})();
