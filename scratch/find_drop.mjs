import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
let depth = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  let oldDepth = depth;
  for (const char of line) {
    if (char === '{') depth++;
    if (char === '}') depth--;
  }
  if (i > 100 && depth === 1 && oldDepth === 2) {
    console.log(`Dropped to depth 1 at line ${i + 1}: ${line.trim()}`);
  }
}
