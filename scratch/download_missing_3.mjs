import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const photosDir = path.join(__dirname, '..', 'public', 'photos');

const targets = [
  {
    name: 'fujin_raijin.jpg',
    title: 'File:Wind-God-Fujin-and-Thunder-God-Raijin-by-Tawaraya-Sotatsu.png'
  },
  {
    name: 'jupiter.jpg',
    title: 'File:PIA22946-Jupiter-RedSpot-JunoSpacecraft-20190212.jpg'
  },
  {
    name: 'ramen.jpg',
    title: 'File:A bowl of ramen in Osaka, Japan.jpg'
  }
];

async function getImageUrl(fileTitle) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
  const res = await fetch(apiUrl, { headers: { 'User-Agent': 'BlockMosaic/2.0' } });
  const data = await res.json();
  const pages = data.query.pages;
  const page = Object.values(pages)[0];
  if (page && page.imageinfo && page.imageinfo[0]) {
    return page.imageinfo[0].thumburl || page.imageinfo[0].url;
  }
  return null;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': 'BlockMosaic/2.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error(`File too small: ${buf.length} bytes`);
  fs.writeFileSync(dest, buf);
  console.log(`Saved ${path.basename(dest)} (${buf.length} bytes)`);
}

(async () => {
  for (const t of targets) {
    try {
      console.log(`Getting URL for ${t.title}...`);
      const imgUrl = await getImageUrl(t.title);
      if (!imgUrl) {
        console.error(`No URL found for ${t.name}`);
        continue;
      }
      console.log(`Downloading ${t.name} from ${imgUrl}...`);
      await download(imgUrl, path.join(photosDir, t.name));
    } catch (e) {
      console.error(`Failed ${t.name}:`, e.message);
    }
  }
})();
