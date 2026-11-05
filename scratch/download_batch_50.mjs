import fs from 'fs';
import path from 'path';

const targets = [
  {
    name: 'saturn.jpg',
    title: 'File:Saturn during Equinox.jpg',
    fallbackQuery: 'Saturn Cassini'
  },
  {
    name: 'moon.jpg',
    title: 'File:FullMoon2010.jpg',
    fallbackQuery: 'Full Moon telescope'
  },
  {
    name: 'aurora.jpg',
    title: 'File:Aurora Borealis (10959828876).jpg',
    fallbackQuery: 'Aurora Borealis Northern Lights'
  },
  {
    name: 'niagara.jpg',
    title: 'File:Niagara Falls (34912953250).jpg',
    fallbackQuery: 'Horseshoe Falls Niagara Falls'
  },
  {
    name: 'cherry_blossom.jpg',
    title: 'File:Cherry blossom at Hirosaki Castle Park, Aomori.jpg',
    fallbackQuery: 'Sakura cherry blossoms Japan'
  },
  {
    name: 'shinkansen.jpg',
    title: 'File:Shinkansen N700-4000.jpg',
    fallbackQuery: 'Shinkansen N700'
  },
  {
    name: 'airplane.jpg',
    title: 'File:Boeing 787-8 Dreamliner N787BA (7916173004).jpg',
    fallbackQuery: 'Boeing 787 flight blue sky'
  },
  {
    name: 'steam_locomotive.jpg',
    title: 'File:D51 498 SL Minakami (14115162463).jpg',
    fallbackQuery: 'Steam locomotive D51 Japan'
  },
  {
    name: 'fire_engine.jpg',
    title: 'File:Tokyo Fire Department ladder truck.jpg',
    fallbackQuery: 'Fire engine ladder truck'
  },
  {
    name: 'strawberry.jpg',
    title: 'File:Strawberries (8470438171).jpg',
    fallbackQuery: 'Ripe strawberries close up'
  },
  {
    name: 'pizza.jpg',
    title: 'File:Pizza Margherita - crude.jpg',
    fallbackQuery: 'Pizza Margherita fresh'
  },
  {
    name: 'sushi.jpg',
    title: 'File:Maguro nigiri sushi.jpg',
    fallbackQuery: 'Nigiri sushi tuna'
  },
  {
    name: 'cake.jpg',
    title: 'File:Strawberry shortcake with tea.jpg',
    fallbackQuery: 'Japanese strawberry shortcake slice'
  },
  {
    name: 'piano.jpg',
    title: 'File:Grand piano (Yamaha) in concert hall.jpg',
    fallbackQuery: 'Grand piano keyboard black'
  },
  {
    name: 'dogu.jpg',
    title: 'File:Shakoki-dogu.jpg',
    fallbackQuery: 'Shakoki dogu Tokyo National Museum'
  },
  {
    name: 'tutankhamun.jpg',
    title: 'File:Tutankhamun mask.jpg',
    fallbackQuery: 'Tutankhamun mask Cairo Egyptian Museum'
  }
];

const outDir = path.resolve('public/photos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function fetchImage(target) {
  try {
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(target.title)}&prop=imageinfo&iiprop=url&iiurlwidth=960&format=json`;
    const res = await fetch(apiUrl, {
      headers: { 'User-Agent': 'BlockMozaikuGame/1.0 (educational; contact: test@example.com)' }
    });
    const data = await res.json();
    const pages = data.query?.pages;
    const pageId = Object.keys(pages || {})[0];
    let imageUrl = pages?.[pageId]?.imageinfo?.[0]?.thumburl || pages?.[pageId]?.imageinfo?.[0]?.url;

    if (!imageUrl) {
      // 検索APIでフォールバック
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(target.fallbackQuery)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&iiurlwidth=960&format=json`;
      const sRes = await fetch(searchUrl, {
        headers: { 'User-Agent': 'BlockMozaikuGame/1.0 (educational; contact: test@example.com)' }
      });
      const sData = await sRes.json();
      const sPages = sData.query?.pages;
      const sPageId = Object.keys(sPages || {})[0];
      imageUrl = sPages?.[sPageId]?.imageinfo?.[0]?.thumburl || sPages?.[sPageId]?.imageinfo?.[0]?.url;
    }

    if (!imageUrl) {
      console.log(`Failed to find image URL for ${target.name}`);
      return false;
    }

    console.log(`Downloading ${target.name} from: ${imageUrl}`);
    const imgRes = await fetch(imageUrl, {
      headers: { 'User-Agent': 'BlockMozaikuGame/1.0 (educational; contact: test@example.com)' }
    });
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    if (buffer.length < 500) {
      console.log(`Image too small for ${target.name} (${buffer.length} bytes), fallback will be needed`);
      return false;
    }
    const dest = path.join(outDir, target.name);
    fs.writeFileSync(dest, buffer);
    console.log(`Saved ${target.name} (${buffer.length} bytes)`);
    return true;
  } catch (e) {
    console.error(`Error downloading ${target.name}:`, e.message);
    return false;
  }
}

for (const t of targets) {
  await fetchImage(t);
  await new Promise(r => setTimeout(r, 200));
}
console.log('Batch download completed.');
