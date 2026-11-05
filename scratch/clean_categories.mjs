import fs from 'fs';

let code = fs.readFileSync('src/data/puzzles.ts', 'utf8');

// categoryLabel からすべての（...）や (...) の注釈を除去し、重複表記を美しくクリーンに整形
code = code.replace(/categoryLabel:\s*['"]([^'"]+)['"]/g, (match, label) => {
  let cleaned = label
    .replace(/[（(][^）)]*[）)]/g, '') // 括弧内を全削除
    .replace(/・モダンベクターアート/g, '・ベクターアート')
    .trim();
  return `categoryLabel: '${cleaned}'`;
});

fs.writeFileSync('src/data/puzzles.ts', code, 'utf8');
console.log('Successfully cleaned categoryLabels in puzzles.ts');
