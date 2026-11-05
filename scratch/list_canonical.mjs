import { PUZZLE_STAGES } from '../src/data/puzzles.ts';

const isHiragana = (str) => /^[\u3041-\u3096ー]+$/.test(str);

for (const s of PUZZLE_STAGES) {
  // 複数ひらがながある場合、最も標準的なもの（短いまたはdisplayAnswerと合致するもの）を選ぶ
  const hiras = s.acceptedAnswers.filter(a => isHiragana(a));
  console.log(`[${s.id}] ${s.displayAnswer} -> canonical: "${hiras[0]}" (options: ${hiras.join(', ')})`);
}
