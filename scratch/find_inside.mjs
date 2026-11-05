import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
let depth = 0;
for (let i = 1038; i < 1487; i++) {
  const line = lines[i];
  if (!line) continue;
  let prev = depth;
  for (const char of line) {
    if (char === '{') depth++;
    if (char === '}') depth--;
  }
  if (depth < 1) {
    console.log(`L${i+1} [${prev} -> ${depth}]: ${line.trim()}`);
    break;
  }
}
