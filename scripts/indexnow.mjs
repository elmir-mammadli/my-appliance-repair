// Submits every URL from the live sitemap to IndexNow (Bing, Yandex, etc.).
// The key file public/<key>.txt must be deployed before running this.
// Usage: node scripts/indexnow.mjs

const HOST = 'www.myappliance.us';
const KEY = 'da4c669a1dce42bb9ed9153bbfd4a8fa';

const sitemapRes = await fetch(`https://${HOST}/sitemap.xml`);
if (!sitemapRes.ok) throw new Error(`sitemap fetch failed: ${sitemapRes.status}`);
const xml = await sitemapRes.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error('no URLs found in sitemap');

const keyRes = await fetch(`https://${HOST}/${KEY}.txt`);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  throw new Error(`key file not live yet at https://${HOST}/${KEY}.txt — deploy first`);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, urlList }),
});
console.log(`submitted ${urlList.length} URLs — HTTP ${res.status} ${res.statusText}`);
