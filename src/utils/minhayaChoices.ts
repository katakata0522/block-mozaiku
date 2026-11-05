import { PuzzleStage } from '../data/puzzles';

const isKana = (str: string) => /^[\u3041-\u3096ーヴ]+$/.test(str);

// 個別微調整マップ（作品名や代表的な呼び名）
const CANONICAL_OVERRIDES: Record<number, string> = {
  5: 'しんじゅのみみかざりのしょうじょ',
  14: 'ひまわり',
  15: 'さけび',
  16: 'かながわおきなみうら',
  17: 'ぴらみっど',
  19: 'ころっせお',
  28: 'はーとのうつわ',
  29: 'こーひーかっぷ',
  32: 'ふうしゃ',
  33: 'れこーどぷれーやー',
  64: 'ヴぃーなすのたんじょう',
  65: 'たーじまはる',
  67: 'さぐらだふぁみりあ',
  70: 'すとーんへんじ',
  88: 'はんばーがー',
};

/**
 * ステージの「みんはや式」正解かな文字列を取得する
 */
export function getStageCanonicalKana(stage: PuzzleStage): string {
  if (CANONICAL_OVERRIDES[stage.id]) {
    return CANONICAL_OVERRIDES[stage.id];
  }

  // displayAnswer から括弧内のかなを抽出（例: "織田信長（おだのぶなが）" -> "おだのぶなが"）
  const match = stage.displayAnswer.match(/[（(]([\u3041-\u3096ーヴ]+)[）)]/);
  if (match && match[1]) {
    return match[1];
  }

  // acceptedAnswers から最初の純粋かな文字列を採用
  const kana = stage.acceptedAnswers.find((a) => isKana(a));
  return kana || stage.displayAnswer;
}

const COMMON_DUMMY_KANAS = [
  'あ', 'い', 'う', 'え', 'お',
  'か', 'き', 'く', 'け', 'こ',
  'さ', 'し', 'す', 'せ', 'そ',
  'た', 'ち', 'つ', 'て', 'と',
  'な', 'に', 'ぬ', 'ね', 'の',
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  'ま', 'み', 'む', 'め', 'も',
  'や', 'ゆ', 'よ',
  'ら', 'り', 'る', 'れ', 'ろ',
  'わ', 'ん', 'ー',
  'が', 'ぎ', 'ぐ', 'げ', 'ご',
  'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
  'だ', 'で', 'ど',
  'ば', 'び', 'ぶ', 'べ', 'ぼ',
  'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
  'っ', 'ゃ', 'ゅ', 'ょ',
];

/**
 * 指定インデックスにおける「みんはや式 4択（正解1文字 + ダミー3文字）」を生成する
 */
export function generateMinhayaChoices(
  targetKana: string,
  charIndex: number,
  kanaPool: string[] = []
): string[] {
  const correctChar = targetKana[charIndex] || '';
  if (!correctChar) return ['？', '？', '？', '？'];

  // ダミー候補プール
  const candidateSet = new Set<string>();

  // 1. そのステージの kanaPad から候補を追加
  for (const k of kanaPool) {
    if (k && k !== correctChar) {
      candidateSet.add(k);
    }
  }

  // 2. targetKana 自体の他の文字も紛らわしいダミーとして追加
  for (const c of targetKana) {
    if (c !== correctChar) {
      candidateSet.add(c);
    }
  }

  // 3. 候補が足りない場合に汎用かなを追加
  for (const c of COMMON_DUMMY_KANAS) {
    if (candidateSet.size >= 20) break;
    if (c !== correctChar) {
      candidateSet.add(c);
    }
  }

  const candidateArray = Array.from(candidateSet);

  // シャッフルしてダミーを3つ選出
  for (let i = candidateArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidateArray[i], candidateArray[j]] = [candidateArray[j], candidateArray[i]];
  }

  const dummyChoices = candidateArray.slice(0, 3);
  const choices = [correctChar, ...dummyChoices];

  // 4択の位置をシャッフル
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return choices;
}
