import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// puzzles.ts を読み込んで、PUZZLE_STAGES 部分を取り出すか、
// または node --experimental-strip-types で直接 import する
async function run() {
  const { PUZZLE_STAGES } = await import('../src/data/puzzles.ts');
  console.log('Total stages loaded:', PUZZLE_STAGES.length);

  const errors = [];
  const warnings = [];

  const ids = new Set();
  PUZZLE_STAGES.forEach((st, idx) => {
    if (st.id !== idx + 1) {
      errors.push(`Stage index ${idx} has id ${st.id}, expected ${idx + 1}`);
    }
    if (ids.has(st.id)) {
      errors.push(`Duplicate stage id: ${st.id}`);
    }
    ids.add(st.id);

    // 2. coreTileIndices
    if (!Array.isArray(st.coreTileIndices) || st.coreTileIndices.length === 0) {
      errors.push(`Stage ${st.id}: invalid coreTileIndices`);
    } else {
      for (const c of st.coreTileIndices) {
        if (c < 0 || c >= 30) {
          errors.push(`Stage ${st.id}: coreTileIndex out of range: ${c}`);
        }
      }
    }

    // 3. kanaPad (16 chars)
    if (!Array.isArray(st.kanaPad) || st.kanaPad.length !== 16) {
      errors.push(`Stage ${st.id}: kanaPad length is ${st.kanaPad?.length}, expected 16`);
    }

    // 4. kanaPad coverage for at least one accepted answer
    const padSet = new Set(st.kanaPad);
    const possibleAnswers = st.acceptedAnswers.filter((ans) => {
      const chars = Array.from(ans);
      return chars.every((ch) => padSet.has(ch) || ch === ' ' || ch === '・' || ch === '　' || ch === 'ー');
    });
    if (possibleAnswers.length === 0) {
      warnings.push({
        id: st.id,
        answer: st.displayAnswer,
        kanaPad: st.kanaPad.join(''),
        accepted: st.acceptedAnswers.slice(0, 5)
      });
    }

    // 5. photoUrl check
    if (st.photoUrl && st.photoUrl.startsWith('/photos/')) {
      const localPath = path.join(__dirname, '..', 'public', st.photoUrl.slice(1));
      if (!fs.existsSync(localPath)) {
        errors.push(`Stage ${st.id}: missing local photo file: ${localPath}`);
      }
    }
  });

  console.log('--- AUDIT RESULTS ---');
  console.log('Errors count:', errors.length);
  if (errors.length > 0) {
    console.error('Errors:', errors);
  }
  console.log('KanaPad Warnings count:', warnings.length);
  if (warnings.length > 0) {
    console.log('First 10 warnings (stages where no accepted answer can be typed purely with kanaPad):');
    warnings.slice(0, 10).forEach((w) => {
      console.log(`[STAGE ${w.id}] ${w.answer} | Pad: "${w.kanaPad}" | Accepted: ${JSON.stringify(w.accepted)}`);
    });
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
