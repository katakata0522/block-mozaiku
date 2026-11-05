import { PUZZLE_STAGES } from '../src/data/puzzles.ts';

const isHiragana = (str) => /^[\u3041-\u3096ー]+$/.test(str);

const failures = [];
for (const s of PUZZLE_STAGES) {
  // acceptedAnswers の中から最も適切なひらがな文字列を探す
  const hiraganaAns = s.acceptedAnswers.find(a => isHiragana(a));
  if (!hiraganaAns) {
    failures.push({ id: s.id, title: s.title, display: s.displayAnswer, accepted: s.acceptedAnswers });
  }
}

console.log(`Found pure hiragana answers for ${PUZZLE_STAGES.length - failures.length} / ${PUZZLE_STAGES.length}`);
if (failures.length > 0) {
  console.log('Stages without pure hiragana answer in acceptedAnswers:', failures.length);
  failures.slice(0, 10).forEach(f => console.log(`Stage ${f.id} (${f.title}): display="${f.display}", accepted=[${f.accepted.join(', ')}]`));
}
