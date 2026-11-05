import fs from 'node:fs';
import path from 'node:path';

const puzzlesFile = path.resolve('src/data/puzzles.ts');
let code = fs.readFileSync(puzzlesFile, 'utf8');

// STAGE 6, 24〜34 の photoUrl と remotePhotoUrl を空文字に置換
const canvasOnlyFiles = [
  'chest.png',
  'sword.png',
  'potion.png',
  'spaceship.png',
  'mushroom.png',
  'heart.png',
  'coffee.png',
  'balloon.png',
  'lighthouse.png',
  'windmill.png',
  'vinyl.png',
  'cactus.png'
];

for (const file of canvasOnlyFiles) {
  const photoUrlTarget = `photoUrl: '/photos/${file}',`;
  const remoteUrlTarget = `remotePhotoUrl: '/photos/${file}',`;
  if (code.includes(photoUrlTarget)) {
    code = code.replace(photoUrlTarget, `photoUrl: '',`);
    console.log(`Replaced photoUrl for ${file}`);
  }
  if (code.includes(remoteUrlTarget)) {
    code = code.replace(remoteUrlTarget, `remotePhotoUrl: '',`);
    console.log(`Replaced remotePhotoUrl for ${file}`);
  }
}

// preloadStagePhotos の最適化: if (!stage.photoUrl) continue;
const preloadLoopOld = `    for (const stage of PUZZLE_STAGES) {
      const img = new Image();`;

const preloadLoopNew = `    for (const stage of PUZZLE_STAGES) {
      if (!stage.photoUrl) continue;
      const img = new Image();`;

if (code.includes(preloadLoopOld)) {
  code = code.replace(preloadLoopOld, preloadLoopNew);
  console.log('Optimized preloadStagePhotos with empty photoUrl check!');
}

fs.writeFileSync(puzzlesFile, code, 'utf8');
console.log('Updated puzzles.ts!');
