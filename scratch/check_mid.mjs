import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
let depth = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  for (const char of line) {
    if (char === '{') depth++;
    if (char === '}') depth--;
  }
  if (i >= 1034 && i <= 1500 && depth <= 2) {
    console.log(`Line ${i + 1} (depth ${depth}): ${line.trim()}`);
  }
}
