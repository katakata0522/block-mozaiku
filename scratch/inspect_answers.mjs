import { PUZZLE_STAGES } from '../src/data/puzzles.ts';

console.log(`Loaded ${PUZZLE_STAGES.length} stages`);
for (let i = 0; i < 15; i++) {
  const s = PUZZLE_STAGES[i];
  console.log(`Stage ${s.id} (${s.title}): display="${s.displayAnswer}", accepted=[${s.acceptedAnswers.slice(0, 4).join(', ')}]`);
}
