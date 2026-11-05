import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
let depth = 0;
for (let i = 0; i <= 1035; i++) {
  const line = lines[i];
  if (!line) continue;
  let prev = depth;
  for (const char of line) {
    if (char === '{') depth++;
    if (char === '}') depth--;
  }
  if (depth === 0) {
    console.log(`ZERO at line ${i + 1}: ${line.trim()}`);
  }
}
