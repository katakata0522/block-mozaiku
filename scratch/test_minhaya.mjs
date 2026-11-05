import { PUZZLE_STAGES } from '../src/data/puzzles.ts';
import { getStageCanonicalKana, generateMinhayaChoices } from '../src/utils/minhayaChoices.ts';

const nobunaga = PUZZLE_STAGES.find(s => s.id === 4);
const kana = getStageCanonicalKana(nobunaga);
console.log('Stage 4 canonical:', kana);
for (let i = 0; i < kana.length; i++) {
  const choices = generateMinhayaChoices(kana, i, nobunaga.kanaPad);
  console.log(`Char ${i} (${kana[i]}): [${choices.join(', ')}] -> Has correct? ${choices.includes(kana[i])}`);
}
