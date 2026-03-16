const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://revistacorpomontaa.lovable.app/', { waitUntil: 'networkidle0' });
    
    const data = await page.evaluate(() => {
      const texts = Array.from(document.querySelectorAll('h1, h2, h3, p, a, button, span')).map(el => {
        return { tag: el.tagName, text: el.innerText.trim(), className: el.className };
      }).filter(t => t.text.length > 0);
      return texts;
    });
    
    console.log(JSON.stringify(data, null, 2));
    await browser.close();
  } catch (error) {
    console.error('Error fetching page:', error);
  }
})();
