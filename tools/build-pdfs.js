// Builds the downloadable guide PDFs into public/downloads using headless Chrome.
// Run: node tools/build-pdfs.js
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const docs = require('./docs-data');

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error('No Chrome or Edge found for PDF generation.');

const OUT = path.join(__dirname, '..', 'public', 'downloads');
fs.mkdirSync(OUT, { recursive: true });
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), '3s-pdf-'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const html = (d) => `<!doctype html><html><head><meta charset="utf-8"><title>${esc(d.title)}</title><style>
@page { size: A4; margin: 18mm 16mm; }
body { font-family: 'Segoe UI', Arial, sans-serif; color: #21272a; line-height: 1.6; font-size: 11.5pt; }
.cover { background: #081226; color: #fff; padding: 28px 30px; border-radius: 14px; margin-bottom: 22px; }
.brand { color: #00b3ff; font-weight: 800; letter-spacing: .12em; font-size: 10pt; text-transform: uppercase; }
h1 { font-size: 26pt; margin: 8px 0 8px; line-height: 1.15; }
.cover p { margin: 0; color: #cfe0f5; }
h2 { color: #046bd2; font-size: 14pt; margin: 20px 0 6px; }
p { margin: 0 0 8px; }
ul { margin: 6px 0 8px 20px; padding: 0; }
.foot { margin-top: 26px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 10pt; color: #5b6770; }
</style></head><body>
<div class="cover"><div class="brand">3S Safe Storage Solutions</div><h1>${esc(d.title)}</h1><p>${esc(d.intro)}</p></div>
${d.sections.map(([h, p, list], i) => `<h2>${i + 1}. ${esc(h)}</h2><p>${esc(p)}</p>${list ? `<ul>${list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}`).join('\n')}
<div class="foot">3S Safe Storage Solutions · Mansarovar Garden Phase 2, Mohkampur Industrial Estate, Delhi Road, Meerut, U.P. · 3ssafestorage@gmail.com · 86574 12969</div>
</body></html>`;

docs.filter((d) => d.kind === 'guide').forEach((d) => {
  const src = path.join(TMP, `${d.slug}.html`);
  const out = path.join(OUT, `${d.slug}.pdf`);
  fs.writeFileSync(src, html(d));
  const r = spawnSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${out}`, 'file:///' + src.replace(/\\/g, '/')], { stdio: 'pipe', timeout: 60000 });
  const ok = fs.existsSync(out) && fs.statSync(out).size > 1000;
  console.log(`${ok ? 'OK ' : 'FAIL'} ${d.slug}.pdf${ok ? ` (${Math.round(fs.statSync(out).size / 1024)} KB)` : '\n' + r.stderr}`);
});
