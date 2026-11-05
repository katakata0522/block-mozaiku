import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

const stack = [];
for (let i = 1034; i <= 1492; i++) {
  const line = lines[i];
  if (!line) continue;
  for (let c = 0; c < line.length; c++) {
    const char = line[c];
    if (char === '{') {
      stack.push({ line: i + 1, text: line.trim() });
    }
    if (char === '}') {
      const open = stack.pop();
      if (stack.length === 0) {
        console.log(`Stack empty at line ${i + 1}: ${line.trim()} (matched open at line ${open ? open.line : 'NONE'})`);
      }
    }
  }
}
