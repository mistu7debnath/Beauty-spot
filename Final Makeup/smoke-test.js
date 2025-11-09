const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');
const path = require('path');

const pages = [
  'index.html',
  'about.html',
  'products.html',
  'gallery.html',
  'team.html',
  'arrivals.html',
  'blogs.html',
  'reviews.html',
  'contact.html'
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const results = [];

  for (const p of pages) {
    const filePath = path.resolve(__dirname, p);
    const url = pathToFileURL(filePath).href;
    const page = await browser.newPage();
    const consoleMessages = [];

    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error' || type === 'warning') {
        consoleMessages.push({ type, text });
      }
    });

    page.on('pageerror', err => {
      consoleMessages.push({ type: 'pageerror', text: err.message });
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      // give any deferred JS a moment
      await page.waitForTimeout(800);
    } catch (err) {
      consoleMessages.push({ type: 'navigation', text: err.message });
    }

    results.push({ page: p, issues: consoleMessages });
    await page.close();
  }

  await browser.close();

  // Summarize
  let totalIssues = 0;
  for (const r of results) {
    if (r.issues.length > 0) {
      console.log(`\nPage: ${r.page} — ${r.issues.length} issue(s)`);
      r.issues.forEach((i, idx) => {
        console.log(`${idx + 1}. [${i.type}] ${i.text}`);
      });
      totalIssues += r.issues.length;
    } else {
      console.log(`\nPage: ${r.page} — OK`);
    }
  }

  if (totalIssues > 0) {
    console.log(`\nSmoke test completed — ${totalIssues} total issue(s) found.`);
    process.exitCode = 1;
  } else {
    console.log('\nSmoke test completed — no console errors/warnings detected.');
    process.exitCode = 0;
  }
})();
