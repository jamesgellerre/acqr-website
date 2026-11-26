import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'dist', 'index.html'), 'utf8');

const HOME_TITLE = 'Sell Your Land Fast for Cash | ACQR Investments';
const HOME_DESC =
  'Get a no-commission cash offer for your vacant or infill lot. ACQR Investments handles the paperwork and also sources lots for home builders.';
const HOME_URL = 'https://www.acqrinvestments.com/';

const routes = [
  {
    dir: 'privacy',
    title: 'Privacy Policy | ACQR Investments',
    description:
      'Privacy Policy for ACQR Investments: how we collect, use, and protect information you submit on acqrinvestments.com.',
    url: 'https://www.acqrinvestments.com/privacy',
  },
  {
    dir: 'terms',
    title: 'Terms of Service | ACQR Investments',
    description:
      'Terms of Service for ACQR Investments, including SMS messaging terms for property inquiries.',
    url: 'https://www.acqrinvestments.com/terms',
  },
  {
    dir: 'thank-you',
    title: 'Thank You | ACQR Investments',
    description: 'Your land offer request was received. Someone from ACQR Investments will be in touch.',
    url: 'https://www.acqrinvestments.com/thank-you',
    noindex: true,
  },
];

for (const route of routes) {
  let page = html
    .replaceAll(HOME_TITLE, route.title)
    .replaceAll(HOME_DESC, route.description)
    .replaceAll(`href="${HOME_URL}"`, `href="${route.url}"`)
    .replaceAll(`content="${HOME_URL}"`, `content="${route.url}"`);

  if (route.noindex) {
    page = page.replace('</title>', '</title>\n    <meta name="robots" content="noindex" />');
  }

  const dir = join(root, 'dist', route.dir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page);
}
