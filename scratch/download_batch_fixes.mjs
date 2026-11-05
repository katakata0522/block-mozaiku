import fs from 'fs';
import path from 'path';

const fixes = [
  {
    name: 'niagara.jpg',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Canadian_Niagara_Wonder_at_Horseshoe_Falls_%2C_Ontario_in_2017.jpg/960px-Canadian_Niagara_Wonder_at_Horseshoe_Falls_%2C_Ontario_in_2017.jpg'
  },
  {
    name: 'sushi.jpg',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Sushi_set%2C_Tokyo_Japan_%282010-09-14_by_Songshu888_%40Pixabay_2091357%29.jpg/960px-Sushi_set%2C_Tokyo_Japan_%282010-09-14_by_Songshu888_%40Pixabay_2091357%29.jpg'
  },
  {
    name: 'cake.jpg',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Slice_of_strawberry_shortcake.jpg/960px-Slice_of_strawberry_shortcake.jpg'
  }
];

const outDir = path.resolve('public/photos');

for (const fix of fixes) {
  console.log(`Downloading ${fix.name}...`);
  const res = await fetch(fix.url, {
    headers: { 'User-Agent': 'BlockMozaikuGame/1.0 (educational; contact: test@example.com)' }
  });
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = path.join(outDir, fix.name);
  fs.writeFileSync(dest, buf);
  console.log(`Saved ${fix.name} (${buf.length} bytes)`);
}
