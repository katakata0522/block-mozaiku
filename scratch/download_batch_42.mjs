import fs from 'fs';
import path from 'path';

const targets = [
  // 歴史・偉人 (8)
  { name: 'ieyasu.jpg', title: 'File:Tokugawa Ieyasu.jpg', fallbackQuery: 'Tokugawa Ieyasu portrait' },
  { name: 'einstein.jpg', title: 'File:Albert Einstein Head.jpg', fallbackQuery: 'Albert Einstein portrait 1921' },
  { name: 'beethoven.jpg', title: 'File:Beethoven.jpg', fallbackQuery: 'Ludwig van Beethoven Stieler' },
  { name: 'cleopatra.jpg', title: 'File:Cleopatra VII bust in the Altes Museum, Berlin.jpg', fallbackQuery: 'Cleopatra bust Altes Museum' },
  { name: 'murasaki.jpg', title: 'File:Murasaki Shikibu by Tosa Mitsuoki.jpg', fallbackQuery: 'Murasaki Shikibu Tosa Mitsuoki' },
  { name: 'napoleon.jpg', title: 'File:Napoleon at the Great St. Bernard - Jacques-Louis David - Google Cultural Institute.jpg', fallbackQuery: 'Napoleon crossing the Alps David' },
  { name: 'galileo.jpg', title: 'File:Galileo Galilei by Justus Sustermans.jpg', fallbackQuery: 'Galileo Galilei Sustermans' },
  { name: 'lincoln.jpg', title: 'File:Abraham Lincoln head on shoulders photo portrait.jpg', fallbackQuery: 'Abraham Lincoln head on shoulders' },

  // 名画 (6)
  { name: 'last_supper.jpg', title: 'File:The Last Supper - Leonardo Da Vinci - High Resolution_32x16.jpg', fallbackQuery: 'The Last Supper Leonardo da Vinci' },
  { name: 'starry_night.jpg', title: 'File:Van Gogh - Starry Night - Google Art Project.jpg', fallbackQuery: 'Van Gogh Starry Night' },
  { name: 'gleaners.jpg', title: 'File:Jean-François Millet - Des glaneuses (1857).jpg', fallbackQuery: 'Jean-Francois Millet Des glaneuses' },
  { name: 'fujin_raijin.jpg', title: 'File:Wind God and Thunder God by Ogata Korin (Tokyo National Museum).jpg', fallbackQuery: 'Fujin Raijin-zu Ogata Korin' },
  { name: 'thinker.jpg', title: 'File:The Thinker, Rodin.jpg', fallbackQuery: 'The Thinker Rodin bronze' },
  { name: 'birth_of_venus.jpg', title: 'File:Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg', fallbackQuery: 'Birth of Venus Botticelli' },

  // 世界遺産 (7)
  { name: 'taj_mahal.jpg', title: 'File:Taj Mahal (Edited).jpeg', fallbackQuery: 'Taj Mahal Agra India' },
  { name: 'great_wall.jpg', title: 'File:Great Wall of China July 2006.JPG', fallbackQuery: 'Great Wall of China Jinshanling' },
  { name: 'sagrada_familia.jpg', title: 'File:Basílica de la Sagrada Família (Barcelona) - 2.jpg', fallbackQuery: 'Sagrada Familia Barcelona facade' },
  { name: 'opera_house.jpg', title: 'File:Sydney Opera House - Dec 2008.jpg', fallbackQuery: 'Sydney Opera House harbor' },
  { name: 'itsukushima.jpg', title: 'File:Miyajima Torii at high tide.jpg', fallbackQuery: 'Itsukushima Shrine Torii Miyajima' },
  { name: 'stonehenge.jpg', title: 'File:Stonehenge, Condado de Wiltshire, Inglaterra, 2014-08-12, DD 09.JPG', fallbackQuery: 'Stonehenge Wiltshire England' },
  { name: 'machu_picchu.jpg', title: 'File:80 - Machu Picchu - Juin 2009 - edit.jpg', fallbackQuery: 'Machu Picchu panoramic view' },

  // 動物 (7)
  { name: 'giraffe.jpg', title: 'File:Giraffa camelopardalis angolensis.jpg', fallbackQuery: 'Giraffe standing savanna portrait' },
  { name: 'elephant.jpg', title: 'File:African Bush Elephant.jpg', fallbackQuery: 'African Bush Elephant Amboseli' },
  { name: 'koala.jpg', title: 'File:Koala climbing tree.jpg', fallbackQuery: 'Koala in eucalyptus tree Australia' },
  { name: 'dolphin.jpg', title: 'File:Bottlenose Dolphin jumping.jpg', fallbackQuery: 'Bottlenose Dolphin jumping ocean' },
  { name: 'tiger.jpg', title: 'File:Bengal tiger (Panthera tigris tigris) female 3.jpg', fallbackQuery: 'Bengal tiger portrait' },
  { name: 'chameleon.jpg', title: 'File:Panther chameleon (Furcifer pardalis) male Nosy Be.jpg', fallbackQuery: 'Chameleon branch green colorful' },
  { name: 'zebra.jpg', title: 'File:Plains Zebra Equus quagga.jpg', fallbackQuery: 'Plains Zebra savanna stripes' },

  // 宇宙・天体 (4)
  { name: 'earth.jpg', title: 'File:The Earth seen from Apollo 17.jpg', fallbackQuery: 'Blue Marble Earth Apollo 17' },
  { name: 'jupiter.jpg', title: 'File:Jupiter and its shrunken Great Red Spot.jpg', fallbackQuery: 'Jupiter Great Red Spot Hubble' },
  { name: 'mars.jpg', title: 'File:OSIRIS Mars true color.jpg', fallbackQuery: 'Mars planet true color Rosetta' },
  { name: 'sun.jpg', title: 'File:The Sun by the Atmospheric Imaging Assembly of NASA SDO.jpg', fallbackQuery: 'Sun NASA SDO prominence' },

  // 乗り物 (5)
  { name: 'patrol_car.jpg', title: 'File:Toyota Crown Royal (GRS200) police car of Aomori Prefecture Police.jpg', fallbackQuery: 'Japanese police car Toyota Crown' },
  { name: 'helicopter.jpg', title: 'File:Mil Mi-8T, Poland - Air Force AN0779836.jpg', fallbackQuery: 'Helicopter flight blue sky' },
  { name: 'submarine.jpg', title: 'File:USS Los Angeles (SSN-668) underway.jpg', fallbackQuery: 'Submarine underway ocean surface' },
  { name: 'cruise_ship.jpg', title: 'File:Queen Mary 2 at pier in Boston.jpg', fallbackQuery: 'Cruise ship ocean luxury' },
  { name: 'rocket.jpg', title: 'File:Apollo 11 Launch - GPN-2000-000627.jpg', fallbackQuery: 'Saturn V Apollo launch smoke' },

  // 食べ物 (5)
  { name: 'hamburger.jpg', title: 'File:NCI Visuals Food Hamburger.jpg', fallbackQuery: 'Delicious cheeseburger hamburger close up' },
  { name: 'ramen.jpg', title: 'File:Shoyu ramen, at Kairikiya.jpg', fallbackQuery: 'Shoyu ramen bowl Tokyo' },
  { name: 'curry.jpg', title: 'File:Japanese Curry Rice by jetalone in Tokyo.jpg', fallbackQuery: 'Japanese Curry Rice' },
  { name: 'apple.jpg', title: 'File:Red Apple.jpg', fallbackQuery: 'Red delicious apple on white' },
  { name: 'banana.jpg', title: 'File:Bananas (white background).jpg', fallbackQuery: 'Bunch of bananas isolated' },
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
      console.log(`Failed to find URL for ${target.name}`);
      return false;
    }

    const imgRes = await fetch(imageUrl, {
      headers: { 'User-Agent': 'BlockMozaikuGame/1.0 (educational; contact: test@example.com)' }
    });
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    if (buffer.length < 500) {
      console.log(`Too small: ${target.name} (${buffer.length} bytes)`);
      return false;
    }
    const dest = path.join(outDir, target.name);
    fs.writeFileSync(dest, buffer);
    console.log(`Saved ${target.name} (${buffer.length} bytes)`);
    return true;
  } catch (e) {
    console.error(`Error ${target.name}:`, e.message);
    return false;
  }
}

console.log(`Starting download of ${targets.length} images...`);
for (let i = 0; i < targets.length; i++) {
  const t = targets[i];
  console.log(`[${i+1}/${targets.length}] Downloading ${t.name}...`);
  await fetchImage(t);
  await new Promise(r => setTimeout(r, 150));
}
console.log('Finished downloading batch of 42 images.');
