import fs from 'fs';
import path from 'path';

const targets = [
  {
    name: 'ryoma.jpg',
    title: 'File:Sakamoto Ryoma.jpg',
    fallbackQuery: 'Sakamoto Ryoma portrait'
  },
  {
    name: 'shotoku.jpg',
    title: 'File:Prince Shōtoku.jpg',
    fallbackQuery: 'Prince Shotoku'
  },
  {
    name: 'saigo.jpg',
    title: 'File:Saigo Takamori.jpg',
    fallbackQuery: 'Saigo Takamori'
  },
  {
    name: 'hideyoshi.jpg',
    title: 'File:Toyotomi Hideyoshi.jpg',
    fallbackQuery: 'Toyotomi Hideyoshi'
  },
  {
    name: 'mona_lisa.jpg',
    title: 'File:Mona Lisa, by Leonardo da Vinci, from C2RMF retouched.jpg',
    fallbackQuery: 'Mona Lisa Leonardo da Vinci'
  },
  {
    name: 'sunflowers.jpg',
    title: 'File:Vincent van Gogh - Sunflowers - VGM 433.jpg',
    fallbackQuery: 'Van Gogh Sunflowers'
  },
  {
    name: 'the_scream.jpg',
    title: 'File:Edvard Munch, 1893, The Scream, oil, tempera and pastel on cardboard, 91 x 73.5 cm, National Gallery of Norway.jpg',
    fallbackQuery: 'Edvard Munch The Scream'
  },
  {
    name: 'great_wave.jpg',
    title: 'File:Great Wave off Kanagawa2.jpg',
    fallbackQuery: 'Great Wave off Kanagawa Hokusai'
  },
  {
    name: 'pyramids.jpg',
    title: 'File:All Gizah Pyramids.jpg',
    fallbackQuery: 'Giza Pyramids'
  },
  {
    name: 'eiffel_tower.jpg',
    title: 'File:Tour Eiffel Wikimedia Commons.jpg',
    fallbackQuery: 'Eiffel Tower Paris'
  },
  {
    name: 'colosseum.jpg',
    title: 'File:Colosseum in Rome, Italy - April 2007.jpg',
    fallbackQuery: 'Colosseum Rome Italy'
  },
  {
    name: 'kinkakuji.jpg',
    title: 'File:Kinkaku-ji in Kyoto, November 2016 -30.jpg',
    fallbackQuery: 'Kinkaku-ji Kyoto'
  },
  {
    name: 'panda.jpg',
    title: 'File:Giant Panda Eating.jpg',
    fallbackQuery: 'Giant Panda eating bamboo'
  },
  {
    name: 'lion.jpg',
    title: 'File:Lion waiting in Namibia.jpg',
    fallbackQuery: 'Lion male portrait'
  },
  {
    name: 'penguin.jpg',
    title: 'File:Emperor penguin.jpg',
    fallbackQuery: 'Emperor penguin Antarctica'
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
      headers: { 'User-Agent': 'BlockMozaikuGame/1.0 (educational; contact: test@example.com)' }
    });
    const data = await res.json();
    const pages = data.query?.pages;
    const pageId = Object.keys(pages || {})[0];
    let imageUrl = pages?.[pageId]?.imageinfo?.[0]?.thumburl || pages?.[pageId]?.imageinfo?.[0]?.url;

    if (!imageUrl) {
      // 検索APIでフォールバック
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(target.fallbackQuery)}&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
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
console.log('Finished downloading batch of 15 images.');
