import { readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
const content = await readFile(new URL('./content.txt', import.meta.url), 'utf8');
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const lines = content.trim().split(/\r?\n/);
const title = lines.shift() || '我的文字网站';
const paragraphs = lines.join('\n').trim().split(/\n\s*\n/).filter(Boolean);
const out = new URL('./public/', import.meta.url);
await mkdir(out, { recursive: true });
for (const filename of ['9-2.txt', '9-3.txt', '10-1.txt', '10-2.txt', '10-3.txt', 'HK.txt']) {
  await copyFile(new URL('./' + filename, import.meta.url), new URL(filename, out));
}
await writeFile(new URL('content.txt', out), content);
await writeFile(new URL('index.html', out), `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title>
<style>body{margin:0;background:#f7f5ef;color:#26332e;font-family:system-ui,"Microsoft YaHei",sans-serif}main{max-width:760px;margin:0 auto;padding:64px 24px}header{border-bottom:1px solid #d7ddd4;padding-bottom:28px}h1{font-size:clamp(28px,6vw,44px);line-height:1.3}a{color:#356650;text-underline-offset:4px}article{padding:24px 0;font-size:18px;line-height:1.95;overflow-wrap:anywhere}p{white-space:pre-wrap}footer{border-top:1px solid #d7ddd4;padding-top:20px;font-size:14px;color:#647369}</style></head>
<body><main><header><h1>${escape(title)}</h1><a href="content.txt">纯文本</a></header><article>${paragraphs.map(p=>`<p>${escape(p)}</p>`).join('\n')}</article><footer>文字与记录</footer></main></body></html>`);
console.log('Generated public/index.html and public/content.txt');
