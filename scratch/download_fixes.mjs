import fs from 'fs';
import path from 'path';

const fixes = [
  {
    name: 'shotoku.jpg',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Portrait_of_Prince_Sh%C5%8Dtoku_and_Two_Princes.jpg/960px-Portrait_of_Prince_Sh%C5%8Dtoku_and_Two_Princes.jpg'
  },
  {
    name: 'hideyoshi.jpg',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Toyotomi_Hideyoshi_c1598_Kodai-ji_Temple.png/960px-Toyotomi_Hideyoshi_c1598_Kodai-ji_Temple.png'
  },
  {
    name: 'the_scream.jpg',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/960px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg'
  },
  {
    name: 'penguin.jpg',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/2007_Snow-Hill-Island_Luyten-De-Hauwere-Emperor-Penguin-50.jpg/960px-2007_Snow-Hill-Island_Luyten-De-Hauwere-Emperor-Penguin-50.jpg'
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
