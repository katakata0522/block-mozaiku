import fs from 'fs';
import path from 'path';

const targets = [
  {
    name: 'nobunaga.jpg',
    title: 'File:Oda_Nobunaga_portrait_crop.jpg',
    fallbackQuery: 'Oda Nobunaga'
  },
  {
    name: 'pearl_girl.jpg',
    title: 'File:Johannes_Vermeer_(1632-1675)_-_The_Girl_with_a_Pearl_Earring_(1665).jpg',
    fallbackQuery: 'Girl with a pearl earring'
  },
  {
    name: 'statue_of_liberty.jpg',
    title: 'File:Lady_Liberty_under_a_blue_sky_(cropped).jpg',
    fallbackQuery: 'Statue of Liberty'
  },
  {
    name: 'mt_fuji.jpg',
    title: 'File:Mount_Fuji_from_Yamanakako.jpg',
    fallbackQuery: 'Mount Fuji'
  }
];

const outDir = path.resolve('public/photos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function fetchImage(target) {
  try {
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(target.title)}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
    const res = await fetch(apiUrl, {
      headers: { 'User-Agent': 'BlockMozaikuGame/1.0 (contact: test@example.com)' }
    });
    const data = await res.json();
    const pages = data.query?.pages;
    const pageId = Object.keys(pages || {})[0];
    let imageUrl = pages?.[pageId]?.imageinfo?.[0]?.thumburl || pages?.[pageId]?.imageinfo?.[0]?.url;

    if (!imageUrl) {
      // 検索APIでフォールバック
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(target.fallbackQuery)}&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
      const sRes = await fetch(searchUrl, {
        headers: { 'User-Agent': 'BlockMozaikuGame/1.0 (contact: test@example.com)' }
      });
      const sData = await sRes.json();
      const sPages = sData.query?.pages;
      const sPageId = Object.keys(sPages || {})[0];
      imageUrl = sPages?.[sPageId]?.imageinfo?.[0]?.thumburl || sPages?.[sPageId]?.imageinfo?.[0]?.url;
    }

    if (!imageUrl) {
      console.log(`Failed to find image URL for ${target.name}`);
      return;
    }

    console.log(`Downloading ${target.name} from: ${imageUrl}`);
    const imgRes = await fetch(imageUrl, {
      headers: { 'User-Agent': 'BlockMozaikuGame/1.0 (contact: test@example.com)' }
    });
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const dest = path.join(outDir, target.name);
    fs.writeFileSync(dest, buffer);
    console.log(`Saved ${target.name} (${buffer.length} bytes)`);
  } catch (e) {
    console.error(`Error downloading ${target.name}:`, e.message);
  }
}

for (const t of targets) {
  await fetchImage(t);
}
