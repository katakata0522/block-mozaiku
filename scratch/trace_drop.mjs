import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
let depth = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  let prev = depth;
  for (const char of line) {
    if (char === '{') depth++;
    if (char === '}') depth--;
  }
  if (i >= 1455 && i <= 1492) {
    console.log(`L${i+1} [${prev} -> ${depth}]: ${line.trim()}`);
  }
}
