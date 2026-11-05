import fs from 'node:fs';
import path from 'node:path';
import { new50Stages } from './new50_stages.mjs';

const puzzlesFile = path.resolve('src/data/puzzles.ts');
let code = fs.readFileSync(puzzlesFile, 'utf8');

// 1. PUZZLE_STAGES 配列の末尾に STAGE 51〜100 を挿入
const stage50Marker = "verificationDate: '2026-11-05',\n    },\n  },\n];";
if (!code.includes(stage50Marker)) {
  throw new Error('Could not find stage50Marker in puzzles.ts');
}

function stageToTs(s) {
  return `  {
    id: ${s.id},
    title: ${JSON.stringify(s.title)},
    displayAnswer: ${JSON.stringify(s.displayAnswer)},
    readingHint: ${JSON.stringify(s.readingHint)},
    categoryLabel: ${JSON.stringify(s.categoryLabel)},
    charCountHint: ${JSON.stringify(s.charCountHint)},
    initialKanaHint: ${JSON.stringify(s.initialKanaHint)},
    kanaPad: ${JSON.stringify(s.kanaPad)},
    coreTileIndices: ${JSON.stringify(s.coreTileIndices)},
    rivalTargetSec: ${s.rivalTargetSec.toFixed(1)},
    acceptedAnswers: ${JSON.stringify(s.acceptedAnswers, null, 6).replace(/\n/g, '\n    ')},
    acceptedKeywords: ${JSON.stringify(s.acceptedKeywords)},
    photoUrl: ${JSON.stringify(s.photoUrl)},
    remotePhotoUrl: ${JSON.stringify(s.remotePhotoUrl)},
    description: ${JSON.stringify(s.description)},
    provenance: {
      source: ${JSON.stringify(s.provenance.source)},
      author: ${JSON.stringify(s.provenance.author)},
      license: ${JSON.stringify(s.provenance.license)},
      verificationDate: ${JSON.stringify(s.provenance.verificationDate)},
    },
  }`;
}

const newStagesTs = new50Stages.map(stageToTs).join(',\n');
const replacementPuzzles = `verificationDate: '2026-11-05',\n    },\n  },\n${newStagesTs},\n];`;
code = code.replace(stage50Marker, replacementPuzzles);

// 2. focusY の分岐を追加
const tutankhamunFocusMarker = "focusY = 0.25; // ツタンカーメン：黄金のマスクの顔と頭飾り\n    }";
if (!code.includes(tutankhamunFocusMarker)) {
  throw new Error('Could not find tutankhamunFocusMarker');
}

const newFocusCode = `focusY = 0.25; // ツタンカーメン：黄金のマスクの顔と頭飾り
    } else if (stageId === 51) {
      focusY = 0.32; // 徳川家康：狩野探幽画の威厳ある顔立ち・髷
    } else if (stageId === 52) {
      focusY = 0.28; // アインシュタイン：白髪と知的な表情
    } else if (stageId === 53) {
      focusY = 0.28; // ベートーヴェン：情熱的な表情と赤いマフラー
    } else if (stageId === 54) {
      focusY = 0.35; // クレオパトラ：古代エジプト女王の胸像
    } else if (stageId === 55) {
      focusY = 0.35; // 紫式部：十二単と石山寺で筆を執る姿
    } else if (stageId === 56) {
      focusY = 0.32; // ナポレオン：アルプス越えの赤いマントと英姿
    } else if (stageId === 57) {
      focusY = 0.28; // ガリレオ：白髭と知的な目元
    } else if (stageId === 58) {
      focusY = 0.25; // リンカーン：特徴的な顎髭と顔立ち
    } else if (stageId === 59) {
      focusY = 0.48; // 最後の晩餐：横長壁画の中央イエスと弟子たち
    } else if (stageId === 60) {
      focusY = 0.45; // 星月夜：渦巻く夜空と三日月
    } else if (stageId === 61) {
      focusY = 0.45; // 落穂拾い：麦畑の3人の農婦
    } else if (stageId === 62) {
      focusY = 0.50; // 風神雷神図：宗達の金箔屏風の二神
    } else if (stageId === 63) {
      focusY = 0.32; // 考える人：ロダンの思索する彫像上半身
    } else if (stageId === 64) {
      focusY = 0.35; // ヴィーナスの誕生：海より現れた女神上半身
    } else if (stageId === 65) {
      focusY = 0.45; // タージマハル：白大理石ドームとシンメトリー
    } else if (stageId === 66) {
      focusY = 0.45; // 万里の長城：尾根に連なる巨大城壁
    } else if (stageId === 67) {
      focusY = 0.35; // サグラダファミリア：生誕のファサード尖塔
    } else if (stageId === 68) {
      focusY = 0.48; // オペラハウス：シドニー港の白い帆
    } else if (stageId === 69) {
      focusY = 0.45; // 厳島神社：海に浮かぶ朱色の大鳥居
    } else if (stageId === 70) {
      focusY = 0.48; // ストーンヘンジ：環状巨石群
    } else if (stageId === 71) {
      focusY = 0.45; // マチュピチュ：アンデスの空中都市遺跡
    } else if (stageId === 72) {
      focusY = 0.25; // キリン：長い首と網目模様の顔
    } else if (stageId === 73) {
      focusY = 0.45; // ゾウ：大きな耳と長い鼻
    } else if (stageId === 74) {
      focusY = 0.35; // コアラ：ユーカリの木につかまる姿
    } else if (stageId === 75) {
      focusY = 0.48; // イルカ：青い海をジャンプする流線型の体
    } else if (stageId === 76) {
      focusY = 0.40; // トラ：勇猛な縞模様の顔立ち
    } else if (stageId === 77) {
      focusY = 0.45; // カメレオン：鮮やかな体色と巻いた尾
    } else if (stageId === 78) {
      focusY = 0.40; // シマウマ：白黒のストライプ模様
    } else if (stageId === 79) {
      focusY = 0.50; // 地球：青い惑星の全体球体
    } else if (stageId === 80) {
      focusY = 0.50; // 木星：大赤斑と縞模様
    } else if (stageId === 81) {
      focusY = 0.50; // 火星：赤褐色の大地
    } else if (stageId === 82) {
      focusY = 0.50; // 太陽：コロナとプロミネンス
    } else if (stageId === 83) {
      focusY = 0.50; // パトカー：白黒ツートンと赤色灯
    } else if (stageId === 84) {
      focusY = 0.48; // ヘリコプター：回転翼と機体
    } else if (stageId === 85) {
      focusY = 0.50; // 潜水艦：海を行く黒い船体
    } else if (stageId === 86) {
      focusY = 0.48; // 客船：白亜のクルーズ客船
    } else if (stageId === 87) {
      focusY = 0.45; // ロケット：打ち上がるロケットと噴煙
    } else if (stageId === 88) {
      focusY = 0.50; // ハンバーガー：バンズとパティ・野菜
    } else if (stageId === 89) {
      focusY = 0.50; // ラーメン：スープと具材のどんぶり
    } else if (stageId === 90) {
      focusY = 0.50; // カレー：ご飯とカレールー
    } else if (stageId === 91) {
      focusY = 0.50; // りんご：真っ赤な完熟りんご
    } else if (stageId === 92) {
      focusY = 0.50; // バナナ：黄色い房のバナナ
    }`;
code = code.replace(tutankhamunFocusMarker, newFocusCode);

// 3. renderStageArtworkToCanvas のフォールバック分岐に STAGE 93〜100 を追記
const cactusSceneMarker = `} else if (stageId === 34) {
    renderCactusScene(ctx, width, height);
  } else {`;
if (!code.includes(cactusSceneMarker)) {
  throw new Error('Could not find cactusSceneMarker');
}

const newCanvasScenes = `} else if (stageId === 34) {
    renderCactusScene(ctx, width, height);
  } else if (stageId === 93) {
    renderPixelCrownScene(ctx, width, height);
  } else if (stageId === 94) {
    renderPixelShieldScene(ctx, width, height);
  } else if (stageId === 95) {
    renderPixelCoinScene(ctx, width, height);
  } else if (stageId === 96) {
    renderPixelGhostScene(ctx, width, height);
  } else if (stageId === 97) {
    renderPixelEggScene(ctx, width, height);
  } else if (stageId === 98) {
    renderGuitarScene(ctx, width, height);
  } else if (stageId === 99) {
    renderHourglassScene(ctx, width, height);
  } else if (stageId === 100) {
    renderGlobeScene(ctx, width, height);
  } else {`;
code = code.replace(cactusSceneMarker, newCanvasScenes);

// 4. ファイル末尾に STAGE 93〜100 の描画関数を追記
const newFunctionsCode = `
/**
 * STAGE 93: 王冠（レトロRPG風ピクセルアート）
 */
function renderPixelCrownScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#2e1065');
  bgGrad.addColorStop(1, '#0f051d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.54;
  const p = Math.max(7, Math.floor(w / 40));

  const map = [
    [0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0],
    [5,0,0,0,0,0,1,2,2,1,0,0,0,0,0,5],
    [1,1,0,0,6,0,1,3,2,1,0,6,0,0,1,1],
    [1,2,1,0,1,1,1,2,2,1,1,1,0,1,2,1],
    [1,3,2,1,1,2,1,7,7,1,2,1,1,2,3,1],
    [1,2,2,1,7,7,7,7,7,7,7,7,1,2,2,1],
    [1,2,7,7,7,7,7,7,7,7,7,7,7,7,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,3,2,2,1,5,1,4,4,1,6,1,2,2,3,1],
    [1,2,2,2,1,1,1,4,4,1,1,1,2,2,2,1],
    [8,8,1,8,8,1,8,8,8,8,1,8,8,1,8,8],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];

  const cols = 16;
  const rows = map.length;
  const startX = cx - (cols * p) / 2;
  const startY = cy - (rows * p) / 2;

  const colorPalette: Record<number, string> = {
    1: '#92400e',
    2: '#f59e0b',
    3: '#fef08a',
    4: '#ef4444',
    5: '#3b82f6',
    6: '#10b981',
    7: '#881337',
    8: '#f8fafc'
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = map[r][c];
      if (val > 0 && colorPalette[val]) {
        ctx.fillStyle = colorPalette[val];
        ctx.fillRect(startX + c * p, startY + r * p, p, p);
      }
    }
  }

  const sparkles = [
    { x: cx - w * 0.28, y: cy - h * 0.22, s: p },
    { x: cx + w * 0.30, y: cy - h * 0.18, s: p * 1.2 },
    { x: cx + w * 0.22, y: cy + h * 0.25, s: p * 0.8 }
  ];
  ctx.fillStyle = '#fef08a';
  for (const s of sparkles) {
    ctx.fillRect(s.x, s.y - s.s, s.s, s.s * 3);
    ctx.fillRect(s.x - s.s, s.y, s.s * 3, s.s);
  }
}

/**
 * STAGE 94: 盾（勇者のカイトシールド・ピクセルアート）
 */
function renderPixelShieldScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#0f172a');
  bgGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.52;
  const p = Math.max(7, Math.floor(w / 40));

  const map = [
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,3,3,2,2,2,2,2,2,3,3,1,0],
    [1,3,2,4,4,4,6,6,5,5,2,2,3,1],
    [1,2,4,4,4,4,6,6,5,5,5,2,2,1],
    [1,2,4,4,3,3,6,6,3,3,5,2,2,1],
    [1,2,4,4,3,6,6,6,6,3,5,2,2,1],
    [1,2,4,4,4,6,6,6,6,5,5,2,2,1],
    [1,2,4,4,4,4,6,6,5,5,5,2,2,1],
    [1,2,4,4,4,4,6,6,5,5,5,2,2,1],
    [0,1,2,4,4,4,6,6,5,5,2,2,1,0],
    [0,1,2,4,4,4,6,6,5,5,2,2,1,0],
    [0,0,1,2,4,4,6,6,5,2,2,1,0,0],
    [0,0,1,2,4,4,6,6,5,2,2,1,0,0],
    [0,0,0,1,2,4,6,6,2,2,1,0,0,0],
    [0,0,0,0,1,2,6,6,2,1,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0,0,0]
  ];

  const cols = 14;
  const rows = map.length;
  const startX = cx - (cols * p) / 2;
  const startY = cy - (rows * p) / 2;

  const colorPalette: Record<number, string> = {
    1: '#090d16',
    2: '#d97706',
    3: '#fbbf24',
    4: '#1d4ed8',
    5: '#3b82f6',
    6: '#f8fafc',
    7: '#dc2626'
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = map[r][c];
      if (val > 0 && colorPalette[val]) {
        ctx.fillStyle = colorPalette[val];
        ctx.fillRect(startX + c * p, startY + r * p, p, p);
      }
    }
  }
}

/**
 * STAGE 95: コイン（ゴールドコイン・ピクセルアート）
 */
function renderPixelCoinScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#18181b';
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;
  const p = Math.max(8, Math.floor(w / 36));

  const map = [
    [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,4,4,4,4,4,3,1,1,0,0],
    [0,1,4,4,4,4,4,4,3,3,3,2,1,0],
    [0,1,4,4,3,3,3,3,3,3,2,2,1,0],
    [1,4,4,3,3,0,0,5,0,0,3,2,2,1],
    [1,4,3,3,0,5,5,5,5,5,0,2,2,1],
    [1,4,3,3,0,0,5,5,5,0,0,2,2,1],
    [1,4,3,3,0,5,5,5,5,5,0,2,2,1],
    [1,4,3,3,5,0,5,0,5,0,5,2,2,1],
    [1,4,3,3,0,0,0,0,0,0,0,2,2,1],
    [0,1,4,3,3,3,2,2,2,2,2,2,1,0],
    [0,1,3,3,2,2,2,2,2,2,2,2,1,0],
    [0,0,1,1,2,2,2,2,2,2,1,1,0,0],
    [0,0,0,0,1,1,1,1,1,1,0,0,0,0]
  ];

  const cols = 14;
  const rows = map.length;
  const startX = cx - (cols * p) / 2;
  const startY = cy - (rows * p) / 2;

  const colorPalette: Record<number, string> = {
    1: '#451a03',
    2: '#b45309',
    3: '#f59e0b',
    4: '#fde047',
    5: '#ffffff'
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = map[r][c];
      if (val > 0 && colorPalette[val]) {
        ctx.fillStyle = colorPalette[val];
        ctx.fillRect(startX + c * p, startY + r * p, p, p);
      }
    }
  }

  ctx.fillStyle = '#fef08a';
  const sp = [
    { x: cx + w * 0.28, y: cy - h * 0.25, s: p },
    { x: cx - w * 0.26, y: cy + h * 0.22, s: p * 0.8 }
  ];
  for (const s of sp) {
    ctx.fillRect(s.x, s.y - s.s, s.s, s.s * 3);
    ctx.fillRect(s.x - s.s, s.y, s.s * 3, s.s);
  }
}

/**
 * STAGE 96: おばけ（アーケード風ゴースト・ピクセルアート）
 */
function renderPixelGhostScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#1e1b4b');
  bgGrad.addColorStop(1, '#09090b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;
  const p = Math.max(8, Math.floor(w / 34));

  const map = [
    [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,2,2,2,2,2,2,1,1,0,0],
    [0,1,2,2,2,2,2,2,2,2,2,2,1,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,5,5,4,2,2,2,5,5,4,2,2,1],
    [1,2,5,4,4,2,2,2,5,4,4,2,2,1],
    [1,2,4,4,4,2,2,2,4,4,4,2,2,1],
    [1,2,6,6,2,2,4,4,2,2,6,6,2,1],
    [1,2,2,2,2,4,4,4,4,2,2,2,2,1],
    [1,2,2,2,2,2,4,4,2,2,2,2,3,1],
    [1,2,2,2,2,2,2,2,2,2,2,3,3,1],
    [1,2,2,3,2,2,3,2,2,3,2,2,3,1],
    [1,2,3,1,2,3,1,2,3,1,2,3,1,1],
    [0,1,1,0,1,1,0,1,1,0,1,1,0,0]
  ];

  const cols = 14;
  const rows = map.length;
  const startX = cx - (cols * p) / 2;
  const startY = cy - (rows * p) / 2;

  const colorPalette: Record<number, string> = {
    1: '#090d16',
    2: '#f8fafc',
    3: '#94a3b8',
    4: '#0f172a',
    5: '#ffffff',
    6: '#f472b6'
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = map[r][c];
      if (val > 0 && colorPalette[val]) {
        ctx.fillStyle = colorPalette[val];
        ctx.fillRect(startX + c * p, startY + r * p, p, p);
      }
    }
  }

  ctx.fillStyle = 'rgba(165, 243, 252, 0.4)';
  ctx.beginPath();
  ctx.arc(cx - w * 0.3, cy - h * 0.15, p * 1.5, 0, Math.PI * 2);
  ctx.arc(cx + w * 0.32, cy + h * 0.18, p, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * STAGE 97: ドラゴンのたまご（ピクセルアート）
 */
function renderPixelEggScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#1c1917');
  bgGrad.addColorStop(1, '#450a0a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.48;
  const p = Math.max(8, Math.floor(w / 34));

  const map = [
    [0,0,0,0,1,1,1,1,0,0,0,0],
    [0,0,1,1,4,4,3,3,1,1,0,0],
    [0,1,4,4,3,3,3,2,2,2,1,0],
    [1,4,4,3,3,5,5,3,2,2,2,1],
    [1,4,3,3,5,5,3,3,2,2,2,1],
    [1,4,3,3,3,5,2,2,2,2,2,1],
    [1,4,3,3,2,5,5,2,2,2,2,1],
    [1,3,3,2,2,2,5,5,2,2,2,1],
    [1,3,3,2,2,2,2,5,2,2,2,1],
    [1,3,2,2,2,2,2,2,2,2,2,1],
    [0,1,3,2,2,2,2,2,2,2,1,0],
    [0,1,2,2,2,2,2,2,2,2,1,0],
    [6,6,1,1,2,2,2,2,1,1,6,6],
    [6,6,6,6,1,1,1,1,6,6,6,6],
    [0,6,6,6,6,6,6,6,6,6,6,0]
  ];

  const cols = 12;
  const rows = map.length;
  const startX = cx - (cols * p) / 2;
  const startY = cy - (rows * p) / 2;

  const colorPalette: Record<number, string> = {
    1: '#022c22',
    2: '#064e3b',
    3: '#059669',
    4: '#34d399',
    5: '#fde047',
    6: '#78350f'
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = map[r][c];
      if (val > 0 && colorPalette[val]) {
        ctx.fillStyle = colorPalette[val];
        ctx.fillRect(startX + c * p, startY + r * p, p, p);
      }
    }
  }
}

/**
 * STAGE 98: ギター（モダンベクターアート）
 */
function renderGuitarScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#1e293b');
  bgGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.58;

  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.arc(cx, cy + 30, 75, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy - 65, 55, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx - 55, cy - 65);
  ctx.bezierCurveTo(cx - 35, cy - 10, cx - 45, cy + 10, cx - 75, cy + 30);
  ctx.lineTo(cx + 75, cy + 30);
  ctx.bezierCurveTo(cx + 45, cy + 10, cx + 35, cy - 10, cx + 55, cy - 65);
  ctx.closePath();
  ctx.fillStyle = '#d97706';
  ctx.fill();

  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.arc(cx, cy - 30, 26, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy - 30, 31, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#451a03';
  ctx.fillRect(cx - 32, cy + 50, 64, 16);

  ctx.fillStyle = '#292524';
  ctx.fillRect(cx - 10, h * 0.08, 20, cy - 30 - h * 0.08);

  ctx.strokeStyle = '#d6d3d1';
  ctx.lineWidth = 1.5;
  for (let y = h * 0.12; y < cy - 40; y += 18) {
    ctx.beginPath();
    ctx.moveTo(cx - 10, y);
    ctx.lineTo(cx + 10, y);
    ctx.stroke();
  }

  ctx.fillStyle = '#78350f';
  ctx.fillRect(cx - 14, h * 0.02, 28, h * 0.07);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 1;
  for (let i = -6; i <= 6; i += 2.4) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 0.8, h * 0.02);
    ctx.lineTo(cx + i * 1.4, cy + 50);
    ctx.stroke();
  }
}

/**
 * STAGE 99: 砂時計（モダンベクターアート）
 */
function renderHourglassScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#0f172a');
  bgGrad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;

  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.roundRect(cx - 65, cy - 110, 130, 16, 6);
  ctx.roundRect(cx - 65, cy + 94, 130, 16, 6);
  ctx.fill();

  ctx.fillStyle = '#92400e';
  ctx.fillRect(cx - 55, cy - 94, 8, 188);
  ctx.fillRect(cx + 47, cy - 94, 8, 188);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(cx - 45, cy - 94);
  ctx.bezierCurveTo(cx - 45, cy - 20, cx - 10, cy - 10, cx - 6, cy);
  ctx.bezierCurveTo(cx - 10, cy + 10, cx - 45, cy + 20, cx - 45, cy + 94);
  ctx.lineTo(cx + 45, cy + 94);
  ctx.bezierCurveTo(cx + 45, cy + 20, cx + 10, cy + 10, cx + 6, cy);
  ctx.bezierCurveTo(cx + 10, cy - 10, cx + 45, cy - 20, cx + 45, cy - 94);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(cx - 40, cy - 60);
  ctx.bezierCurveTo(cx - 30, cy - 20, cx - 6, cy - 5, cx, cy);
  ctx.bezierCurveTo(cx + 6, cy - 5, cx + 30, cy - 20, cx + 40, cy - 60);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy + 60);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - 38, cy + 94);
  ctx.lineTo(cx, cy + 60);
  ctx.lineTo(cx + 38, cy + 94);
  ctx.closePath();
  ctx.fill();
}

/**
 * STAGE 100: 地球儀（モダンベクターアート・記念すべき第100問）
 */
function renderGlobeScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#111827');
  bgGrad.addColorStop(1, '#1f2937');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.46;
  const r = Math.min(w * 0.28, h * 0.28);

  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.ellipse(cx, cy + r * 1.55, 60, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#92400e';
  ctx.fillRect(cx - 8, cy + r * 1.15, 16, r * 0.4);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.18, Math.PI * 0.35, Math.PI * 1.45, false);
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = '#0284c7';
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.ellipse(cx + r * 0.25, cy - r * 0.25, r * 0.45, r * 0.35, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx + r * 0.1, cy + r * 0.25, r * 0.28, r * 0.4, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.55, cy - r * 0.15, r * 0.28, r * 0.45, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - r, cy);
  ctx.lineTo(cx + r, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.75, 0, Math.PI * 2);
  ctx.stroke();

  const sphereGrad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
  sphereGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
  sphereGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
  sphereGrad.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
  ctx.fillStyle = sphereGrad;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  ctx.restore();
}
`;

code += newFunctionsCode;

fs.writeFileSync(puzzlesFile, code, 'utf8');
console.log('Successfully updated puzzles.ts with STAGE 51-100!');
