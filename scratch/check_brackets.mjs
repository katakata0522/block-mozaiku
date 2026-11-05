import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
let depth = 0;
for (let i = 1030; i <= 1495; i++) {
  const line = lines[i];
  if (!line) continue;
  for (const char of line) {
    if (char === '{') depth++;
    if (char === '}') depth--;
  }
  if (depth <= 2) {
    console.log(`Line ${i + 1} (depth ${depth}): ${line.trim()}`);
  }
}
