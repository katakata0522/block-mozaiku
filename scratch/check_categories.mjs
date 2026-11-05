import fs from 'fs';

const code = fs.readFileSync('src/data/puzzles.ts', 'utf8');
const matches = [...code.matchAll(/categoryLabel:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const unique = [...new Set(matches)];
console.log('Unique category labels:');
unique.forEach(u => console.log('-', u));
