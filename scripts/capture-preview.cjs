#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

function loadPlaywright() {
  try {
    return require('playwright');
  } catch (error) {
    try {
      return require('/usr/local/lib/node_modules/playwright');
    } catch {
      throw error;
    }
  }
}

function parseArgs(argv) {
  const options = {
    url: null,
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

  if (!['jpeg', 'png'].includes(options.format)) {
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

function getCandidateUrls(explicitUrl) {
  if (explicitUrl) {
    return [explicitUrl];
  }

  return ['http://localhost:5173', 'http://127.0.0.1:5173'];
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
  --format    jpeg | png (default: jpeg)
  --quality   JPEG quality 0-100 (default: 90)
  --delay     Delay in milliseconds before capture (default: 1200)
  --selector  CSS selector to wait for and capture (default: body)
  --full-page Capture the full page instead of the selector region
`);
}

async function main() {
  if (!process.env.PLAYWRIGHT_BROWSERS_PATH) {
    process.env.PLAYWRIGHT_BROWSERS_PATH = '/opt/playwright';
  }

  const options = parseArgs(process.argv.slice(2));
  const { chromium } = loadPlaywright();

  fs.mkdirSync(path.dirname(options.output), { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewportSize({
      width: options.width,
      height: options.height,
    });
    let resolvedUrl = null;
    let lastError = null;

    for (const candidateUrl of getCandidateUrls(options.url)) {
      try {
        await page.goto(candidateUrl, {
          waitUntil: 'networkidle',
          timeout: 15000,
        });
        resolvedUrl = candidateUrl;
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!resolvedUrl) {
      throw lastError || new Error('Could not connect to the local preview URL.');
    }

    if (options.delayMs > 0) {
      await new Promise((resolve) => {
        setTimeout(resolve, options.delayMs);
      });
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
      const target = page.locator(options.selector).first();
      await target.waitFor({ state: 'visible', timeout: 15000 });
      await target.screenshot(screenshotOptions);
    }

    console.log(
      JSON.stringify({
        ok: true,
        output: options.output,
        url: resolvedUrl,
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
    `${message}\nHint: ensure Chromium is available in the sandbox, PLAYWRIGHT_BROWSERS_PATH is set at the sandbox level, and the dev server is reachable on localhost:5173.`,
  );
  process.exit(1);
});
