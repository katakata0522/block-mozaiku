import { PUZZLE_STAGES } from '../src/data/puzzles.ts';

const isKana = (str) => /^[\u3041-\u3096ーヴ]+$/.test(str);

const mappings = [];
for (const s of PUZZLE_STAGES) {
  // displayAnswer から括弧内のひらがなを優先抽出
  const match = s.displayAnswer.match(/[（(]([\u3041-\u3096ーヴ]+)[）)]/);
  let kana = match ? match[1] : null;

  if (!kana) {
    const kanas = s.acceptedAnswers.filter(a => isKana(a));
    kana = kanas[0];
  }

  // 個別微調整
  if (s.id === 5) kana = 'しんじゅのみみかざりのしょうじょ';
  if (s.id === 14) kana = 'ひまわり';
  if (s.id === 15) kana = 'さけび';
  if (s.id === 16) kana = 'かながわおきなみうら';
  if (s.id === 17) kana = 'ぴらみっど';
  if (s.id === 19) kana = 'ころっせお';
  if (s.id === 28) kana = 'はーとのうつわ';
  if (s.id === 29) kana = 'こーひーかっぷ';
  if (s.id === 32) kana = 'ふうしゃ';
  if (s.id === 33) kana = 'れこーどぷれーやー';
  if (s.id === 64) kana = 'ヴぃーなすのたんじょう';
  if (s.id === 65) kana = 'たーじまはる';
  if (s.id === 67) kana = 'さぐらだふぁみりあ';
  if (s.id === 70) kana = 'すとーんへんじ';
  if (s.id === 88) kana = 'はんばーがー';

  mappings.push({ id: s.id, display: s.displayAnswer, kana });
}

console.log('Sample mappings:');
mappings.slice(25, 36).forEach(m => console.log(`[${m.id}] ${m.display} -> "${m.kana}"`));
