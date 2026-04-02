#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

function loadPuppeteer() {
  try {
    return require('puppeteer');
  } catch (error) {
    try {
      return require('/usr/local/lib/node_modules/puppeteer');
    } catch {
      throw error;
    }
  }
}

function parseArgs(argv) {
  const options = {
    url: 'http://127.0.0.1:5173',
    output: path.resolve(process.cwd(), 'preview.jpeg'),
    width: 1440,
    height: 1024,
    format: 'jpeg',
    quality: 90,
    delayMs: 1200,
    selector: 'body',
    fullPage: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--url' && next) {
      options.url = next;
      index += 1;
    } else if (arg === '--output' && next) {
      options.output = path.resolve(process.cwd(), next);
      index += 1;
    } else if (arg === '--width' && next) {
      options.width = Number.parseInt(next, 10);
      index += 1;
    } else if (arg === '--height' && next) {
      options.height = Number.parseInt(next, 10);
      index += 1;
    } else if (arg === '--format' && next) {
      options.format = next.toLowerCase();
      index += 1;
    } else if (arg === '--quality' && next) {
      options.quality = Number.parseInt(next, 10);
      index += 1;
    } else if (arg === '--delay' && next) {
      options.delayMs = Number.parseInt(next, 10);
      index += 1;
    } else if (arg === '--selector' && next) {
      options.selector = next;
      index += 1;
    } else if (arg === '--full-page') {
      options.fullPage = true;
    } else if (arg === '--help') {
      printHelp();
      process.exit(0);
    }
  }

  if (!['jpeg', 'png', 'webp'].includes(options.format)) {
    throw new Error(`Unsupported format: ${options.format}`);
  }

  if (!Number.isFinite(options.width) || options.width <= 0) {
    throw new Error(`Invalid width: ${options.width}`);
  }

  if (!Number.isFinite(options.height) || options.height <= 0) {
    throw new Error(`Invalid height: ${options.height}`);
  }

  return options;
}

function printHelp() {
  console.log(`capture-preview

Usage:
  npm run capture:preview -- --output .codly/design-preview.png --width 1200 --height 900 --format png

Options:
  --url       Page URL to capture
  --output    Output file path
  --width     Viewport width
  --height    Viewport height
  --format    jpeg | png | webp (default: jpeg)
  --quality   JPEG/WebP quality 0-100 (default: 90)
  --delay     Delay in milliseconds before capture (default: 1200)
  --selector  CSS selector to wait for and capture (default: body)
  --full-page Capture the full page instead of the selector region
`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const puppeteer = loadPuppeteer();

  fs.mkdirSync(path.dirname(options.output), { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: options.width,
      height: options.height,
      deviceScaleFactor: 1,
    });
    await page.goto(options.url, { waitUntil: 'networkidle0' });

    if (options.delayMs > 0) {
      await new Promise((resolve) => {
        setTimeout(resolve, options.delayMs);
      });
    }

    const target = options.fullPage
      ? page
      : await page.waitForSelector(options.selector, { timeout: 15000 });

    if (!target) {
      throw new Error(`Could not find selector: ${options.selector}`);
    }

    const screenshotOptions = {
      path: options.output,
      type: options.format,
      quality:
        options.format === 'png'
          ? undefined
          : Math.max(0, Math.min(100, options.quality)),
    };

    if (options.fullPage) {
      await page.screenshot({
        ...screenshotOptions,
        fullPage: true,
      });
    } else {
      await target.screenshot(screenshotOptions);
    }

    console.log(
      JSON.stringify({
        ok: true,
        output: options.output,
        url: options.url,
        width: options.width,
        height: options.height,
        format: options.format,
      }),
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(
    `${message}\nHint: ensure Chrome is available and PUPPETEER_CACHE_DIR points to the shared browser cache.`,
  );
  process.exit(1);
});
