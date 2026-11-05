import fs from 'fs';
import path from 'path';

const puzzlesFile = path.resolve('src/data/puzzles.ts');
let content = fs.readFileSync(puzzlesFile, 'utf-8');

const graphicsCode = `
/**
 * STAGE 24: 勇者の剣（16bit風の輝く銀の刀身と金・青の柄、伝説の聖剣ドット絵）
 */
function renderPixelSwordScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // ダンジョン奥深くの神聖な台座と青い光のグラデーション
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(0.5, '#0f172a');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.48;
  const px = Math.max(5, Math.floor(w / 80));

  // 背後の光輪（神聖なオーラ）
  const auraGrad = ctx.createRadialGradient(cx, cy, px * 2, cx, cy, px * 22);
  auraGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  auraGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
  auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = auraGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, px * 22, 0, Math.PI * 2);
  ctx.fill();

  // 聖剣のドット絵（斜め45度）
  const swordPixels = [
    // 刀身の先端
    [0, -10, '#ffffff'], [1, -9, '#e0f2fe'], [-1, -9, '#bae6fd'],
    [0, -8, '#ffffff'], [1, -7, '#e0f2fe'], [-1, -7, '#bae6fd'],
    [0, -6, '#ffffff'], [1, -5, '#e0f2fe'], [-1, -5, '#bae6fd'],
    [0, -4, '#ffffff'], [1, -3, '#e0f2fe'], [-1, -3, '#bae6fd'],
    [0, -2, '#ffffff'], [1, -1, '#e0f2fe'], [-1, -1, '#bae6fd'],
    [0, 0, '#ffffff'], [1, 1, '#e0f2fe'], [-1, 1, '#bae6fd'],
    // 鍔（ゴールド＆ウィング）
    [-4, 3, '#fbbf24'], [-3, 3, '#f59e0b'], [-2, 3, '#f59e0b'], [-1, 3, '#d97706'],
    [0, 3, '#ef4444'], // 中央の赤い宝玉ルビー
    [1, 3, '#d97706'], [2, 3, '#f59e0b'], [3, 3, '#f59e0b'], [4, 3, '#fbbf24'],
    [-3, 2, '#fbbf24'], [3, 2, '#fbbf24'],
    // 柄（ロイヤルブルー）
    [0, 4, '#1d4ed8'], [0, 5, '#2563eb'], [0, 6, '#1d4ed8'], [0, 7, '#1e40af'],
    // 柄頭（ポンメル・金）
    [-1, 8, '#f59e0b'], [0, 8, '#fbbf24'], [1, 8, '#f59e0b'],
    [0, 9, '#d97706'],
  ];

  for (const [dx, dy, color] of swordPixels) {
    ctx.fillStyle = color as string;
    ctx.fillRect(cx + (dx as number) * px * 1.5, cy + (dy as number) * px * 1.5, px * 1.5, px * 1.5);
  }

  // キラキラ光るパーティクル
  const sparkles = [
    { x: cx - px * 10, y: cy - px * 8, s: px },
    { x: cx + px * 12, y: cy - px * 5, s: px * 1.2 },
    { x: cx - px * 7, y: cy + px * 6, s: px * 0.8 },
    { x: cx + px * 8, y: cy + px * 9, s: px },
  ];
  ctx.fillStyle = '#fef08a';
  for (const sp of sparkles) {
    ctx.fillRect(sp.x, sp.y - sp.s, sp.s, sp.s * 3);
    ctx.fillRect(sp.x - sp.s, sp.y, sp.s * 3, sp.s);
  }
}

/**
 * STAGE 25: ポーション（赤い回復薬・レトロドット絵）
 */
function renderPixelPotionScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;
  const px = Math.max(6, Math.floor(w / 70));

  // 瓶の光
  const glow = ctx.createRadialGradient(cx, cy, px * 2, cx, cy, px * 16);
  glow.addColorStop(0, 'rgba(239, 68, 68, 0.35)');
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, px * 16, 0, Math.PI * 2);
  ctx.fill();

  const potionPixels = [
    // コルク栓
    [-1, -6, '#b45309'], [0, -6, '#d97706'], [1, -6, '#92400e'],
    [-1, -5, '#b45309'], [0, -5, '#d97706'], [1, -5, '#92400e'],
    // ガラスの首
    [-1, -4, '#94a3b8'], [0, -4, '#f8fafc'], [1, -4, '#64748b'],
    [-1, -3, '#94a3b8'], [0, -3, '#f8fafc'], [1, -3, '#64748b'],
    // フラスコ肩部
    [-3, -2, '#94a3b8'], [-2, -2, '#f8fafc'], [-1, -2, '#ef4444'], [0, -2, '#dc2626'], [1, -2, '#dc2626'], [2, -2, '#f8fafc'], [3, -2, '#64748b'],
    // 胴体・赤い液体
    [-4, -1, '#94a3b8'], [-3, -1, '#ef4444'], [-2, -1, '#f87171'], [-1, -1, '#ef4444'], [0, -1, '#dc2626'], [1, -1, '#b91c1c'], [2, -1, '#ef4444'], [3, -1, '#b91c1c'], [4, -1, '#64748b'],
    [-5, 0, '#94a3b8'], [-4, 0, '#ef4444'], [-3, 0, '#ffffff'], [-2, 0, '#f87171'], [-1, 0, '#ef4444'], [0, 0, '#dc2626'], [1, 0, '#b91c1c'], [2, 0, '#b91c1c'], [3, 0, '#991b1b'], [4, 0, '#ef4444'], [5, 0, '#64748b'],
    [-5, 1, '#94a3b8'], [-4, 1, '#ef4444'], [-3, 1, '#f87171'], [-2, 1, '#ef4444'], [-1, 1, '#ef4444'], [0, 1, '#dc2626'], [1, 1, '#b91c1c'], [2, 1, '#b91c1c'], [3, 1, '#991b1b'], [4, 1, '#ef4444'], [5, 1, '#64748b'],
    [-5, 2, '#94a3b8'], [-4, 2, '#ef4444'], [-3, 2, '#ef4444'], [-2, 2, '#ef4444'], [-1, 2, '#dc2626'], [0, 2, '#dc2626'], [1, 2, '#b91c1c'], [2, 2, '#b91c1c'], [3, 2, '#991b1b'], [4, 2, '#ef4444'], [5, 2, '#64748b'],
    [-4, 3, '#94a3b8'], [-3, 3, '#ef4444'], [-2, 3, '#dc2626'], [-1, 3, '#dc2626'], [0, 3, '#b91c1c'], [1, 3, '#b91c1c'], [2, 3, '#991b1b'], [3, 3, '#7f1d1d'], [4, 3, '#64748b'],
    [-3, 4, '#64748b'], [-2, 4, '#94a3b8'], [-1, 4, '#94a3b8'], [0, 4, '#94a3b8'], [1, 4, '#64748b'], [2, 4, '#64748b'], [3, 4, '#475569'],
  ];

  for (const [dx, dy, color] of potionPixels) {
    ctx.fillStyle = color as string;
    ctx.fillRect(cx + (dx as number) * px, cy + (dy as number) * px, px, px);
  }
}

/**
 * STAGE 26: 宇宙船（8bitスペースシップ・ドット絵）
 */
function renderPixelShipScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, w, h);

  // 星々
  for (let i = 0; i < 40; i++) {
    const sx = ((i * 127 + 19) % 100) * 0.01 * w;
    const sy = ((i * 79 + 31) % 100) * 0.01 * h;
    ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#ffffff';
    ctx.fillRect(sx, sy, 2, 2);
  }

  const cx = w * 0.5;
  const cy = h * 0.46;
  const px = Math.max(5, Math.floor(w / 75));

  const shipPixels = [
    // 機首
    [0, -5, '#ffffff'],
    [-1, -4, '#e2e8f0'], [0, -4, '#ffffff'], [1, -4, '#cbd5e1'],
    [-1, -3, '#e2e8f0'], [0, -3, '#38bdf8'], [1, -3, '#cbd5e1'], // キャノピー
    [-1, -2, '#e2e8f0'], [0, -2, '#0284c7'], [1, -2, '#cbd5e1'],
    // 胴体＆主翼展開
    [-3, -1, '#ef4444'], [-2, -1, '#e2e8f0'], [-1, -1, '#ffffff'], [0, -1, '#e2e8f0'], [1, -1, '#ffffff'], [2, -1, '#cbd5e1'], [3, -1, '#ef4444'],
    [-4, 0, '#ef4444'], [-3, 0, '#e2e8f0'], [-2, 0, '#e2e8f0'], [-1, 0, '#ffffff'], [0, 0, '#e2e8f0'], [1, 0, '#ffffff'], [2, 0, '#cbd5e1'], [3, 0, '#cbd5e1'], [4, 0, '#ef4444'],
    [-5, 1, '#ef4444'], [-4, 1, '#e2e8f0'], [-3, 1, '#e2e8f0'], [-2, 1, '#64748b'], [-1, 1, '#3b82f6'], [0, 1, '#60a5fa'], [1, 1, '#3b82f6'], [2, 1, '#64748b'], [3, 1, '#cbd5e1'], [4, 1, '#cbd5e1'], [5, 1, '#ef4444'],
    [-4, 2, '#475569'], [-3, 2, '#475569'], [-1, 2, '#1d4ed8'], [0, 2, '#2563eb'], [1, 2, '#1d4ed8'], [3, 2, '#334155'], [4, 2, '#334155'],
    // エンジン噴射プラズマ
    [-1, 3, '#38bdf8'], [0, 3, '#67e8f9'], [1, 3, '#38bdf8'],
    [-1, 4, '#0284c7'], [0, 4, '#38bdf8'], [1, 4, '#0284c7'],
    [0, 5, '#0284c7'],
  ];

  for (const [dx, dy, color] of shipPixels) {
    ctx.fillStyle = color as string;
    ctx.fillRect(cx + (dx as number) * px, cy + (dy as number) * px, px, px);
  }
}

/**
 * STAGE 27: キノコ（スーパーマッシュルーム・ドット絵）
 */
function renderPixelMushroomScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;
  const px = Math.max(7, Math.floor(w / 65));

  const mushroomPixels = [
    // 傘の天辺
    [-3, -4, '#ef4444'], [-2, -4, '#ef4444'], [-1, -4, '#ffffff'], [0, -4, '#ffffff'], [1, -4, '#ef4444'], [2, -4, '#ef4444'],
    [-5, -3, '#ef4444'], [-4, -3, '#ffffff'], [-3, -3, '#ffffff'], [-2, -3, '#ef4444'], [-1, -3, '#ffffff'], [0, -3, '#ffffff'], [1, -3, '#ef4444'], [2, -3, '#ffffff'], [3, -3, '#ffffff'], [4, -3, '#ef4444'],
    [-6, -2, '#ef4444'], [-5, -2, '#ffffff'], [-4, -2, '#ffffff'], [-3, -2, '#ef4444'], [-2, -2, '#ef4444'], [-1, -2, '#ef4444'], [0, -2, '#ef4444'], [1, -2, '#ef4444'], [2, -2, '#ef4444'], [3, -2, '#ffffff'], [4, -2, '#ffffff'], [5, -2, '#ef4444'],
    [-6, -1, '#ef4444'], [-5, -1, '#ef4444'], [-4, -1, '#ef4444'], [-3, -1, '#ef4444'], [-2, -1, '#ef4444'], [-1, -1, '#ef4444'], [0, -1, '#ef4444'], [1, -1, '#ef4444'], [2, -1, '#ef4444'], [3, -1, '#ef4444'], [4, -1, '#ef4444'], [5, -1, '#ef4444'],
    [-5, 0, '#dc2626'], [-4, 0, '#dc2626'], [-3, 0, '#dc2626'], [-2, 0, '#dc2626'], [-1, 0, '#dc2626'], [0, 0, '#dc2626'], [1, 0, '#dc2626'], [2, 0, '#dc2626'], [3, 0, '#dc2626'], [4, 0, '#dc2626'],
    // 軸と目
    [-3, 1, '#fef3c7'], [-2, 1, '#1e293b'], [-1, 1, '#fef3c7'], [0, 1, '#fef3c7'], [1, 1, '#1e293b'], [2, 1, '#fef3c7'],
    [-3, 2, '#fef3c7'], [-2, 2, '#1e293b'], [-1, 2, '#fef3c7'], [0, 2, '#fef3c7'], [1, 2, '#1e293b'], [2, 2, '#fef3c7'],
    [-3, 3, '#fde68a'], [-2, 3, '#fde68a'], [-1, 3, '#fde68a'], [0, 3, '#fde68a'], [1, 3, '#fde68a'], [2, 3, '#fde68a'],
  ];

  for (const [dx, dy, color] of mushroomPixels) {
    ctx.fillStyle = color as string;
    ctx.fillRect(cx + (dx as number) * px, cy + (dy as number) * px, px, px);
  }
}

/**
 * STAGE 28: ハートの器（8bit赤いハート・ドット絵）
 */
function renderPixelHeartScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.48;
  const px = Math.max(7, Math.floor(w / 65));

  const heartPixels = [
    // 2つの山
    [-3, -3, '#ef4444'], [-2, -3, '#ef4444'], [2, -3, '#ef4444'], [3, -3, '#ef4444'],
    [-4, -2, '#ef4444'], [-3, -2, '#ffffff'], [-2, -2, '#f87171'], [-1, -2, '#ef4444'], [1, -2, '#ef4444'], [2, -2, '#ef4444'], [3, -2, '#ef4444'], [4, -2, '#ef4444'],
    [-4, -1, '#ef4444'], [-3, -1, '#ffffff'], [-2, -1, '#ef4444'], [-1, -1, '#ef4444'], [0, -1, '#ef4444'], [1, -1, '#ef4444'], [2, -1, '#ef4444'], [3, -1, '#ef4444'], [4, -1, '#ef4444'],
    [-4, 0, '#ef4444'], [-3, 0, '#ef4444'], [-2, 0, '#ef4444'], [-1, 0, '#ef4444'], [0, 0, '#dc2626'], [1, 0, '#dc2626'], [2, 0, '#dc2626'], [3, 0, '#dc2626'], [4, 0, '#dc2626'],
    [-3, 1, '#dc2626'], [-2, 1, '#dc2626'], [-1, 1, '#dc2626'], [0, 1, '#dc2626'], [1, 1, '#b91c1c'], [2, 1, '#b91c1c'], [3, 1, '#b91c1c'],
    [-2, 2, '#dc2626'], [-1, 2, '#dc2626'], [0, 2, '#b91c1c'], [1, 2, '#b91c1c'], [2, 2, '#b91c1c'],
    [-1, 3, '#b91c1c'], [0, 3, '#b91c1c'], [1, 3, '#b91c1c'],
    [0, 4, '#991b1b'],
  ];

  for (const [dx, dy, color] of heartPixels) {
    ctx.fillStyle = color as string;
    ctx.fillRect(cx + (dx as number) * px, cy + (dy as number) * px, px, px);
  }
}

/**
 * STAGE 29: コーヒーカップ（ホットコーヒー・モダンベクターアート）
 */
function renderCoffeeScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // カフェの落ち着いた木目背景
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#292524');
  bgGrad.addColorStop(1, '#1c1917');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.58;

  // ソーサー（皿）
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 30, w * 0.28, h * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();

  // カップの取っ手
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx + w * 0.16, cy, 28, -Math.PI * 0.4, Math.PI * 0.4);
  ctx.stroke();

  // マグカップ本体
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(cx - w * 0.16, cy - 40, w * 0.32, 70, [0, 0, 24, 24]);
  ctx.fill();

  // カップ内のコーヒー液面
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 40, w * 0.16, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // 立ちのぼる繊細な白い湯気
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy - 60);
  ctx.bezierCurveTo(cx - 35, cy - 90, cx - 10, cy - 120, cx - 25, cy - 150);
  ctx.moveTo(cx + 15, cy - 60);
  ctx.bezierCurveTo(cx + 30, cy - 95, cx + 5, cy - 125, cx + 20, cy - 155);
  ctx.stroke();
}

/**
 * STAGE 30: 気球（熱気球・バルーン・モダンベクターアート）
 */
function renderHotAirBalloonScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 青空と雲
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.6, '#38bdf8');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // 白い雲
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.beginPath();
  ctx.ellipse(w * 0.2, h * 0.3, 60, 25, 0, 0, Math.PI * 2);
  ctx.ellipse(w * 0.8, h * 0.65, 80, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  const cx = w * 0.5;
  const cy = h * 0.42;
  const r = Math.min(w * 0.22, h * 0.32);

  // 気球の球体（カラフルなストライプ）
  const stripes = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];
  for (let i = 0; i < stripes.length; i++) {
    ctx.fillStyle = stripes[i];
    ctx.beginPath();
    const sx = cx - r + (r * 2 / stripes.length) * i;
    const ex = sx + (r * 2 / stripes.length);
    ctx.ellipse(cx, cy, r * (1 - i * 0.12), r, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 気球の下部台形
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy + r * 0.8);
  ctx.lineTo(cx + 30, cy + r * 0.8);
  ctx.lineTo(cx + 12, cy + r + 20);
  ctx.lineTo(cx - 12, cy + r + 20);
  ctx.closePath();
  ctx.fill();

  // バスケット（カゴ）
  ctx.fillStyle = '#78350f';
  ctx.fillRect(cx - 15, cy + r + 26, 30, 20);
}

/**
 * STAGE 31: 灯台（海の光・モダンベクターアート）
 */
function renderLighthouseScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 深夜の海
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#020617');
  skyGrad.addColorStop(0.7, '#0f172a');
  skyGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const topY = h * 0.18;
  const baseY = h * 0.82;

  // サーチライトの光芒
  const beamGrad = ctx.createRadialGradient(cx, topY + 20, 5, cx - w * 0.35, topY - 30, w * 0.6);
  beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.7)');
  beamGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.2)');
  beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = beamGrad;
  ctx.beginPath();
  ctx.moveTo(cx, topY + 20);
  ctx.lineTo(cx - w * 0.45, topY - 60);
  ctx.lineTo(cx - w * 0.45, topY + 90);
  ctx.closePath();
  ctx.fill();

  // 灯台の塔本体（赤白ストライプ）
  const stripeH = (baseY - topY) / 5;
  const colors = ['#dc2626', '#f8fafc', '#dc2626', '#f8fafc', '#dc2626'];
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    const y1 = topY + stripeH * i;
    const y2 = y1 + stripeH;
    const w1 = 20 + i * 8;
    const w2 = 20 + (i + 1) * 8;
    ctx.moveTo(cx - w1, y1);
    ctx.lineTo(cx + w1, y1);
    ctx.lineTo(cx + w2, y2);
    ctx.lineTo(cx - w2, y2);
    ctx.closePath();
    ctx.fill();
  }

  // ランタンルーム屋根
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx, topY, 16, Math.PI, 0);
  ctx.fill();
}

/**
 * STAGE 32: 風車（オランダ風車・モダンベクターアート）
 */
function renderWindmillScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 青空とチューリップ畑
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(0, 0, w, h * 0.7);
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(0, h * 0.7, w, h * 0.3);

  const cx = w * 0.5;
  const cy = h * 0.45;

  // 風車の塔本体
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy - 40);
  ctx.lineTo(cx + 30, cy - 40);
  ctx.lineTo(cx + 50, h * 0.75);
  ctx.lineTo(cx - 50, h * 0.75);
  ctx.closePath();
  ctx.fill();

  // 風車の十字羽根
  ctx.save();
  ctx.translate(cx, cy - 40);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 6;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2);
    ctx.strokeRect(0, -6, 90, 12);
    ctx.fillRect(0, -6, 90, 12);
  }
  ctx.restore();
}

/**
 * STAGE 33: レコードプレーヤー（モダンベクターアート）
 */
function renderVinylRecordScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.46;
  const cy = h * 0.5;
  const r = Math.min(w * 0.32, h * 0.42);

  // 黒いレコード盤
  ctx.fillStyle = '#09090b';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // レコードの溝の光沢
  ctx.strokeStyle = '#27272a';
  ctx.lineWidth = 1.5;
  for (let i = 1; i <= 6; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, r * (0.35 + i * 0.1), 0, Math.PI * 2);
    ctx.stroke();
  }

  // 赤い中央レーベル
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.32, 0, Math.PI * 2);
  ctx.fill();

  // センタースピンドル
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fill();

  // トーンアーム
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(w * 0.85, h * 0.2);
  ctx.lineTo(w * 0.78, h * 0.65);
  ctx.lineTo(cx + r * 0.5, cy + r * 0.3);
  ctx.stroke();
}

/**
 * STAGE 34: サボテン（砂漠のサボテン・モダンベクターアート）
 */
function renderCactusScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 夕焼けの砂漠
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#c026d3');
  skyGrad.addColorStop(0.5, '#f97316');
  skyGrad.addColorStop(1, '#fde047');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // 砂丘
  ctx.fillStyle = '#7c2d12';
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.9, w * 0.6, h * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  const cx = w * 0.5;
  const cy = h * 0.55;

  // サボテン（緑の太い幹）
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.roundRect(cx - 16, cy - 80, 32, 130, 16);
  ctx.fill();

  // 左の腕
  ctx.beginPath();
  ctx.roundRect(cx - 50, cy - 40, 40, 18, [10, 0, 0, 10]);
  ctx.roundRect(cx - 50, cy - 70, 18, 40, [10, 10, 0, 0]);
  ctx.fill();

  // 右の腕
  ctx.beginPath();
  ctx.roundRect(cx + 10, cy - 25, 40, 18, [0, 10, 10, 0]);
  ctx.roundRect(cx + 32, cy - 55, 18, 40, [10, 10, 0, 0]);
  ctx.fill();
}
`;

fs.writeFileSync(puzzlesFile, content + graphicsCode);
console.log('Successfully appended all 11 graphics scenes to puzzles.ts!');
