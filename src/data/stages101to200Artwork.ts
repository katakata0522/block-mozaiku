// src/data/stages101to200Artwork.ts
// STAGE 101 〜 200 の高精細ベクター・アートワークレンダラー群

export function renderStage101To200Artwork(
  ctx: CanvasRenderingContext2D,
  stageId: number,
  width: number,
  height: number
): void {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  switch (stageId) {
    case 101: renderCastleWhite(ctx, width, height); break;
    case 102: renderRedLantern(ctx, width, height); break;
    case 103: renderBigBuddha(ctx, width, height); break;
    case 104: renderTemplePhoenix(ctx, width, height); break;
    case 105: renderCastleGold(ctx, width, height); break;
    case 106: renderCastleShuri(ctx, width, height); break;
    case 107: renderPagoda(ctx, width, height); break;
    case 108: renderToriiGate(ctx, width, height); break;
    case 109: renderZenGarden(ctx, width, height); break;
    case 110: renderKatana(ctx, width, height); break;
    case 111: renderKoinobori(ctx, width, height); break;
    case 112: renderDaruma(ctx, width, height); break;
    case 113: renderManekineko(ctx, width, height); break;
    case 114: renderSensu(ctx, width, height); break;
    case 115: renderOrizuru(ctx, width, height); break;

    case 116: renderPisaTower(ctx, width, height); break;
    case 117: renderSphinx(ctx, width, height); break;
    case 118: renderParthenon(ctx, width, height); break;
    case 119: renderBigBen(ctx, width, height); break;
    case 120: renderTriomphe(ctx, width, height); break;
    case 121: renderMoai(ctx, width, height); break;
    case 122: renderTowerBridge(ctx, width, height); break;
    case 123: renderFairyCastle(ctx, width, height); break;
    case 124: renderWindmillDutch(ctx, width, height); break;
    case 125: renderGoldenGate(ctx, width, height); break;
    case 126: renderAngkorWat(ctx, width, height); break;
    case 127: renderMayaPyramid(ctx, width, height); break;
    case 128: renderCappadocia(ctx, width, height); break;
    case 129: renderGondola(ctx, width, height); break;
    case 130: renderHollywood(ctx, width, height); break;

    case 131: renderNewtonApple(ctx, width, height); break;
    case 132: renderEdisonBulb(ctx, width, height); break;
    case 133: renderVitruvianMan(ctx, width, height); break;
    case 134: renderNoguchi(ctx, width, height); break;
    case 135: renderFukuzawa(ctx, width, height); break;
    case 136: renderSosekiCat(ctx, width, height); break;
    case 137: renderShakespeare(ctx, width, height); break;
    case 138: renderMozart(ctx, width, height); break;
    case 139: renderBachOrgan(ctx, width, height); break;
    case 140: renderChopinPiano(ctx, width, height); break;
    case 141: renderColumbusShip(ctx, width, height); break;
    case 142: renderMagellanGlobe(ctx, width, height); break;
    case 143: renderDarwinFinch(ctx, width, height); break;
    case 144: renderPythagorasTriangle(ctx, width, height); break;
    case 145: renderArchimedesBath(ctx, width, height); break;

    case 146: renderGuernica(ctx, width, height); break;
    case 147: renderWaterLilies(ctx, width, height); break;
    case 148: renderParasolWoman(ctx, width, height); break;
    case 149: renderPointillism(ctx, width, height); break;
    case 150: renderGoghBedroom(ctx, width, height); break;
    case 151: renderKlimtKiss(ctx, width, height); break;
    case 152: renderMiloVenus(ctx, width, height); break;
    case 153: renderGoldenThrone(ctx, width, height); break;
    case 154: renderRosettaStone(ctx, width, height); break;
    case 155: renderBabelTower(ctx, width, height); break;

    case 156: renderViolin(ctx, width, height); break;
    case 157: renderTrumpet(ctx, width, height); break;
    case 158: renderDrumKit(ctx, width, height); break;
    case 159: renderTelescope(ctx, width, height); break;
    case 160: renderMicroscope(ctx, width, height); break;
    case 161: renderCompass(ctx, width, height); break;
    case 162: renderBalanceScale(ctx, width, height); break;
    case 163: renderRubiksCube(ctx, width, height); break;
    case 164: renderCamera(ctx, width, height); break;
    case 165: renderMagnifyingGlass(ctx, width, height); break;
    case 166: renderGramophone(ctx, width, height); break;
    case 167: renderLightBulb(ctx, width, height); break;
    case 168: renderFountainPen(ctx, width, height); break;
    case 169: renderHourglass(ctx, width, height); break;
    case 170: renderAbacus(ctx, width, height); break;

    case 171: renderWhale(ctx, width, height); break;
    case 172: renderPolarBear(ctx, width, height); break;
    case 173: renderKangaroo(ctx, width, height); break;
    case 174: renderFlamingo(ctx, width, height); break;
    case 175: renderOwl(ctx, width, height); break;
    case 176: renderBeetleRhino(ctx, width, height); break;
    case 177: renderBeetleStag(ctx, width, height); break;
    case 178: renderButterfly(ctx, width, height); break;
    case 179: renderHummingbird(ctx, width, height); break;
    case 180: renderSeaTurtle(ctx, width, height); break;
    case 181: renderOctopus(ctx, width, height); break;
    case 182: renderJellyfish(ctx, width, height); break;
    case 183: renderSeaOtter(ctx, width, height); break;
    case 184: renderRedPanda(ctx, width, height); break;
    case 185: renderBaldEagle(ctx, width, height); break;

    case 186: renderBlackHole(ctx, width, height); break;
    case 187: renderSaturnRings(ctx, width, height); break;
    case 188: renderComet(ctx, width, height); break;
    case 189: renderShootingStar(ctx, width, height); break;
    case 190: renderSolarEclipse(ctx, width, height); break;
    case 191: renderVolcano(ctx, width, height); break;
    case 192: renderRainbow(ctx, width, height); break;
    case 193: renderTornado(ctx, width, height); break;
    case 194: renderIceberg(ctx, width, height); break;
    case 195: renderTyrannosaurus(ctx, width, height); break;
    case 196: renderTriceratops(ctx, width, height); break;
    case 197: renderAmmonite(ctx, width, height); break;
    case 198: renderMammoth(ctx, width, height); break;
    case 199: renderCoelacanth(ctx, width, height); break;
    case 200: renderEarthFinal(ctx, width, height); break;

    default:
      renderEarthFinal(ctx, width, height);
      break;
  }

  ctx.restore();
}

// ----------------------------------------------------------------------
// ヘルパー: 背景グラデーション
// ----------------------------------------------------------------------
function setBg(ctx: CanvasRenderingContext2D, w: number, h: number, c1: string, c2: string) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

// ----------------------------------------------------------------------
// 101: 姫路城（青空・白漆喰天守閣・反りのある重層屋根）
// ----------------------------------------------------------------------
function renderCastleWhite(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#38bdf8', '#bae6fd');
  // 石垣
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.moveTo(w * 0.15, h); ctx.lineTo(w * 0.25, h * 0.72);
  ctx.lineTo(w * 0.75, h * 0.72); ctx.lineTo(w * 0.85, h);
  ctx.fill();
  // 白壁天守閣
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(w * 0.32, h * 0.28, w * 0.36, h * 0.44);
  // 屋根（黒瓦・反り）
  ctx.fillStyle = '#1e293b';
  const drawRoof = (y: number, rw: number) => {
    ctx.beginPath();
    ctx.moveTo(w * 0.5 - rw * 0.5 - 20, y + 18);
    ctx.quadraticCurveTo(w * 0.5, y - 6, w * 0.5 + rw * 0.5 + 20, y + 18);
    ctx.lineTo(w * 0.5 + rw * 0.5, y + 24);
    ctx.lineTo(w * 0.5 - rw * 0.5, y + 24);
    ctx.closePath();
    ctx.fill();
  };
  drawRoof(h * 0.65, w * 0.45);
  drawRoof(h * 0.48, w * 0.38);
  drawRoof(h * 0.32, w * 0.28);
  drawRoof(h * 0.18, w * 0.18);
  // 最上階
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(w * 0.42, h * 0.19, w * 0.16, h * 0.12);
  // 鯱鉾
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(w * 0.38, h * 0.16, 6, 12);
  ctx.fillRect(w * 0.61, h * 0.16, 6, 12);
}

// ----------------------------------------------------------------------
// 102: 雷門（浅草寺の巨大赤提灯・朱塗り山門）
// ----------------------------------------------------------------------
function renderRedLantern(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0f172a', '#1e293b');
  // 朱塗りの柱
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(w * 0.08, 0, w * 0.15, h);
  ctx.fillRect(w * 0.77, 0, w * 0.15, h);
  // 梁
  ctx.fillRect(w * 0.05, h * 0.08, w * 0.9, h * 0.12);
  // 巨大赤提灯
  const cx = w * 0.5, cy = h * 0.52;
  const lGrad = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, w * 0.24);
  lGrad.addColorStop(0, '#f87171');
  lGrad.addColorStop(0.7, '#dc2626');
  lGrad.addColorStop(1, '#991b1b');
  ctx.fillStyle = lGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.22, h * 0.34, 0, 0, Math.PI * 2);
  ctx.fill();
  // 提灯の輪郭線
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 3;
  ctx.stroke();
  // 上下の黒枠
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - w * 0.12, cy - h * 0.34, w * 0.24, 18);
  ctx.fillRect(cx - w * 0.12, cy + h * 0.34 - 18, w * 0.24, 18);
  // 「雷門」の金文字
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 36px "Noto Sans JP", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('雷門', cx, cy);
}

// ----------------------------------------------------------------------
// 103: 東大寺大仏（大仏殿の金色の光背と青銅の廬舎那仏坐像）
// ----------------------------------------------------------------------
function renderBigBuddha(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1c1917', '#292524');
  const cx = w * 0.5, cy = h * 0.52;
  // 黄金の光背（舟形・後光）
  const gGrad = ctx.createRadialGradient(cx, cy * 0.8, 20, cx, cy * 0.8, w * 0.38);
  gGrad.addColorStop(0, '#fef08a');
  gGrad.addColorStop(0.6, '#d97706');
  gGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = gGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy * 0.8, w * 0.36, h * 0.44, 0, 0, Math.PI * 2);
  ctx.fill();
  // 青銅の大仏上半身
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.35, h);
  ctx.quadraticCurveTo(cx - w * 0.25, h * 0.55, cx - w * 0.14, h * 0.42);
  ctx.lineTo(cx + w * 0.14, h * 0.42);
  ctx.quadraticCurveTo(cx + w * 0.25, h * 0.55, cx + w * 0.35, h);
  ctx.closePath();
  ctx.fill();
  // 頭部
  ctx.beginPath();
  ctx.ellipse(cx, cy * 0.58, w * 0.12, h * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  // 螺髪（肉髻）
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(cx, cy * 0.42, w * 0.05, 0, Math.PI * 2);
  ctx.fill();
  // 右手（施無畏印）
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.ellipse(cx + w * 0.16, cy * 0.85, 20, 32, -0.2, 0, Math.PI * 2);
  ctx.fill();
}

// ----------------------------------------------------------------------
// 104: 平等院鳳凰堂（朱塗りの翼廊と阿字池の水鏡）
// ----------------------------------------------------------------------
function renderTemplePhoenix(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#38bdf8');
  // 阿字池（水面）
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(0, h * 0.65, w, h * 0.35);
  // 中島
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.68, w * 0.48, h * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  // 中堂
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(w * 0.38, h * 0.38, w * 0.24, h * 0.28);
  // 翼廊
  ctx.fillRect(w * 0.12, h * 0.46, w * 0.76, h * 0.18);
  // 屋根
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(w * 0.3, h * 0.42); ctx.lineTo(w * 0.5, h * 0.26); ctx.lineTo(w * 0.7, h * 0.42);
  ctx.fill();
  // 黄金の鳳凰
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(w * 0.37, h * 0.24, 8, 12);
  ctx.fillRect(w * 0.62, h * 0.24, 8, 12);
}

// ----------------------------------------------------------------------
// 105: 大阪城（緑青の銅瓦と黄金の虎・白壁の巨城）
// ----------------------------------------------------------------------
function renderCastleGold(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#93c5fd');
  // 高石垣
  ctx.fillStyle = '#78716c';
  ctx.fillRect(0, h * 0.75, w, h * 0.25);
  // 天守閣本体
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(w * 0.32, h * 0.25, w * 0.36, h * 0.5);
  // 緑青の屋根
  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.moveTo(w * 0.22, h * 0.65); ctx.lineTo(w * 0.78, h * 0.65);
  ctx.lineTo(w * 0.7, h * 0.52); ctx.lineTo(w * 0.3, h * 0.52);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(w * 0.28, h * 0.48); ctx.lineTo(w * 0.72, h * 0.48);
  ctx.lineTo(w * 0.65, h * 0.35); ctx.lineTo(w * 0.35, h * 0.35);
  ctx.closePath(); ctx.fill();
  // 最上階（黒漆＋金箔虎）
  ctx.fillStyle = '#18181b';
  ctx.fillRect(w * 0.4, h * 0.26, w * 0.2, h * 0.1);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(w * 0.44, h * 0.28, w * 0.12, 10);
}

// ----------------------------------------------------------------------
// 106: 首里城（沖縄の鮮やかな朱塗りの正殿と龍の石柱）
// ----------------------------------------------------------------------
function renderCastleShuri(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#38bdf8', '#bae6fd');
  // 御庭（石畳）
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, h * 0.72, w, h * 0.28);
  // 正殿（朱塗り）
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(w * 0.2, h * 0.34, w * 0.6, h * 0.38);
  // 唐破風（中央の丸い庇）
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.34, w * 0.12, Math.PI, 0, false);
  ctx.fill();
  // 屋根（赤瓦）
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(w * 0.16, h * 0.48, w * 0.68, 16);
  ctx.fillRect(w * 0.12, h * 0.68, w * 0.76, 16);
  // 龍柱（金・白）
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(w * 0.44, h * 0.52, 8, h * 0.2);
  ctx.fillRect(w * 0.55, h * 0.52, 8, h * 0.2);
}

// ----------------------------------------------------------------------
// 107: 五重塔（京都・奈良の木造五層塔と相輪）
// ----------------------------------------------------------------------
function renderPagoda(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#fde68a', '#f59e0b');
  const cx = w * 0.5;
  // 相輪（頂上の金属棒）
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx, h * 0.05); ctx.lineTo(cx, h * 0.22);
  ctx.stroke();
  for (let i = 0; i < 9; i++) {
    ctx.strokeRect(cx - 10, h * 0.08 + i * 12, 20, 2);
  }
  // 5層の屋根
  ctx.fillStyle = '#451a03';
  const widths = [w * 0.24, w * 0.32, w * 0.40, w * 0.48, w * 0.58];
  for (let i = 0; i < 5; i++) {
    const y = h * 0.25 + i * (h * 0.14);
    const rw = widths[i];
    ctx.fillRect(cx - rw * 0.5, y, rw, 14);
    // 塔身
    ctx.fillStyle = '#78350f';
    ctx.fillRect(cx - rw * 0.25, y + 14, rw * 0.5, h * 0.11);
    ctx.fillStyle = '#451a03';
  }
}

// ----------------------------------------------------------------------
// 108: 鳥居（神社の朱塗り大鳥居・緑の杜）
// ----------------------------------------------------------------------
function renderToriiGate(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#065f46', '#047857');
  const cx = w * 0.5;
  // 朱塗りの柱
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(cx - w * 0.26, h * 0.18, w * 0.07, h * 0.82);
  ctx.fillRect(cx + w * 0.19, h * 0.18, w * 0.07, h * 0.82);
  // 笠木・島木（最上段の黒・朱）
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.45, h * 0.18);
  ctx.quadraticCurveTo(cx, h * 0.12, cx + w * 0.45, h * 0.18);
  ctx.lineTo(cx + w * 0.45, h * 0.24);
  ctx.quadraticCurveTo(cx, h * 0.18, cx - w * 0.45, h * 0.24);
  ctx.closePath(); ctx.fill();
  // 貫（2段目の水平木）
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(cx - w * 0.38, h * 0.34, w * 0.76, 22);
  // 額束（中央の看板）
  ctx.fillStyle = '#18181b';
  ctx.fillRect(cx - 14, h * 0.22, 28, 48);
}

// ----------------------------------------------------------------------
// 109: 枯山水（白砂の砂紋と苔岩）
// ----------------------------------------------------------------------
function renderZenGarden(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#e7e5e4', '#d6d3d1');
  // 白砂の同心円砂紋
  ctx.strokeStyle = '#a8a29e';
  ctx.lineWidth = 3;
  const cx = w * 0.45, cy = h * 0.55;
  for (let r = 30; r < w * 0.6; r += 26) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 1.3, r * 0.8, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  // 苔島
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.ellipse(cx, cy, 90, 60, -0.1, 0, Math.PI * 2);
  ctx.fill();
  // 巨石
  ctx.fillStyle = '#44403c';
  ctx.beginPath();
  ctx.moveTo(cx - 40, cy + 20); ctx.lineTo(cx, cy - 50); ctx.lineTo(cx + 45, cy + 15);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 110: 日本刀（玉鋼の輝く刃文と黒漆の鞘）
// ----------------------------------------------------------------------
function renderKatana(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0f172a', '#1e293b');
  ctx.save();
  ctx.translate(w * 0.1, h * 0.8);
  ctx.rotate(-Math.PI * 0.22);
  // 刀身（シルバー・反り）
  const bGrad = ctx.createLinearGradient(0, 0, 0, 24);
  bGrad.addColorStop(0, '#f8fafc');
  bGrad.addColorStop(0.5, '#cbd5e1');
  bGrad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = bGrad;
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.quadraticCurveTo(w * 0.4, -20, w * 0.8, 0);
  ctx.lineTo(w * 0.8, 14); ctx.quadraticCurveTo(w * 0.4, 0, 0, 14);
  ctx.closePath(); ctx.fill();
  // 鍔（円形黒鉄）
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(w * 0.25, -15, 14, 44);
  // 柄（柄巻）
  ctx.fillStyle = '#18181b';
  ctx.fillRect(0, -2, w * 0.25, 18);
  ctx.restore();
}

// ----------------------------------------------------------------------
// 111: こいのぼり（青空に泳ぐ真鯉と緋鯉）
// ----------------------------------------------------------------------
function renderKoinobori(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#38bdf8', '#bae6fd');
  // ポール
  ctx.fillStyle = '#78716c';
  ctx.fillRect(w * 0.1, 0, 10, h);
  // 真鯉（黒）
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.35, w * 0.32, h * 0.12, 0.05, 0, Math.PI * 2);
  ctx.fill();
  // 緋鯉（赤）
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.ellipse(w * 0.55, h * 0.65, w * 0.26, h * 0.10, -0.05, 0, Math.PI * 2);
  ctx.fill();
  // 目玉
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(w * 0.28, h * 0.33, 14, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(w * 0.36, h * 0.63, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.beginPath(); ctx.arc(w * 0.26, h * 0.33, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(w * 0.34, h * 0.63, 6, 0, Math.PI * 2); ctx.fill();
}

// ----------------------------------------------------------------------
// 112: だるま（赤いまん丸フォルムと凛々しい髭）
// ----------------------------------------------------------------------
function renderDaruma(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#fef08a', '#facc15');
  const cx = w * 0.5, cy = h * 0.52;
  // 赤い丸体
  const dGrad = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, w * 0.3);
  dGrad.addColorStop(0, '#ef4444');
  dGrad.addColorStop(1, '#991b1b');
  ctx.fillStyle = dGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, w * 0.28, 0, Math.PI * 2);
  ctx.fill();
  // 白い顔
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(cx, cy - h * 0.05, w * 0.18, h * 0.16, 0, 0, Math.PI * 2);
  ctx.fill();
  // 眉と髭（鶴亀）
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 36, cy - 35, 24, 8);
  ctx.fillRect(cx + 12, cy - 35, 24, 8);
  // 目（願掛けの黒目）
  ctx.beginPath(); ctx.arc(cx - 24, cy - 15, 10, 0, Math.PI * 2); ctx.fill();
  ctx.stroke();
  ctx.beginPath(); ctx.arc(cx + 24, cy - 15, 10, 0, Math.PI * 2); ctx.stroke();
  // 金の福文字
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 32px "Noto Sans JP", sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('福', cx, cy + 50);
}

// ----------------------------------------------------------------------
// 113: 招き猫（白猫・右手を挙げて小判を持つ）
// ----------------------------------------------------------------------
function renderManekineko(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#fee2e2', '#fecaca');
  const cx = w * 0.5, cy = h * 0.55;
  // 体（白）
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.24, h * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();
  // 耳（赤・ピンク）
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(cx - 50, cy - 80); ctx.lineTo(cx - 80, cy - 140); ctx.lineTo(cx - 20, cy - 100);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 50, cy - 80); ctx.lineTo(cx + 80, cy - 140); ctx.lineTo(cx + 20, cy - 100);
  ctx.fill();
  // 挙げた右手（招き手）
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(cx + 70, cy - 60, 26, 40, 0.3, 0, Math.PI * 2);
  ctx.fill();
  // 首輪と鈴
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx - 45, cy - 20, 90, 12);
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath(); ctx.arc(cx, cy - 14, 14, 0, Math.PI * 2); ctx.fill();
  // 小判「千万両」
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 40, 36, 50, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#78350f';
  ctx.font = 'bold 16px "Noto Sans JP", sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('千万両', cx, cy + 45);
}

// ----------------------------------------------------------------------
// 114: 扇子（広げた和紙の扇・骨と扇面）
// ----------------------------------------------------------------------
function renderSensu(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1e293b', '#0f172a');
  const cx = w * 0.5, cy = h * 0.82;
  // 扇面（和紙・金色桜グラデーション）
  const sGrad = ctx.createRadialGradient(cx, cy, 40, cx, cy, w * 0.42);
  sGrad.addColorStop(0, '#fef08a');
  sGrad.addColorStop(0.7, '#f59e0b');
  sGrad.addColorStop(1, '#dc2626');
  ctx.fillStyle = sGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, w * 0.42, Math.PI * 1.15, Math.PI * 1.85, false);
  ctx.arc(cx, cy, w * 0.15, Math.PI * 1.85, Math.PI * 1.15, true);
  ctx.closePath(); ctx.fill();
  // 骨（竹骨）
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2.5;
  for (let a = Math.PI * 1.15; a <= Math.PI * 1.85; a += 0.08) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * w * 0.42, cy + Math.sin(a) * w * 0.42);
    ctx.stroke();
  }
}

// ----------------------------------------------------------------------
// 115: 折り鶴（折り紙の鶴・優美な翼）
// ----------------------------------------------------------------------
function renderOrizuru(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#dbeafe', '#bfdbfe');
  const cx = w * 0.5, cy = h * 0.52;
  // 翼（赤と白のコントラスト）
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.4, cy - 20); ctx.lineTo(cx, cy + 40); ctx.lineTo(cx, cy - 50);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.4, cy - 20); ctx.lineTo(cx, cy + 40); ctx.lineTo(cx, cy - 50);
  ctx.closePath(); ctx.fill();
  // 首と頭
  ctx.fillStyle = '#b91c1c';
  ctx.beginPath();
  ctx.moveTo(cx - 40, cy + 20); ctx.lineTo(cx - 75, cy - 60); ctx.lineTo(cx - 60, cy - 55);
  ctx.closePath(); ctx.fill();
  // 尾羽
  ctx.beginPath();
  ctx.moveTo(cx + 40, cy + 20); ctx.lineTo(cx + 80, cy - 50); ctx.lineTo(cx + 65, cy - 45);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 116: ピサの斜塔（傾いた白大理石の多層アーチ鐘楼）
// ----------------------------------------------------------------------
function renderPisaTower(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#38bdf8', '#bae6fd');
  // 緑の芝生
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(0, h * 0.82, w, h * 0.18);
  // 斜塔（傾き 8度）
  ctx.save();
  ctx.translate(w * 0.52, h * 0.82);
  ctx.rotate(0.12);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-45, -h * 0.72, 90, h * 0.72);
  // 8層のアーチ回廊
  ctx.fillStyle = '#cbd5e1';
  for (let i = 0; i < 7; i++) {
    const y = -h * 0.7 + i * 36;
    for (let c = -35; c < 35; c += 16) {
      ctx.fillRect(c, y, 10, 24);
    }
    ctx.fillRect(-50, y + 24, 100, 6);
  }
  ctx.restore();
}

// ----------------------------------------------------------------------
// 117: スフィンクス（砂漠・ライオンの体とファラオの顔）
// ----------------------------------------------------------------------
function renderSphinx(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#38bdf8', '#fef08a');
  // 黄金の砂漠
  ctx.fillStyle = '#d97706';
  ctx.fillRect(0, h * 0.65, w, h * 0.35);
  // ピラミッド（背景）
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.moveTo(w * 0.1, h * 0.65); ctx.lineTo(w * 0.35, h * 0.25); ctx.lineTo(w * 0.6, h * 0.65);
  ctx.fill();
  // スフィンクスの体（前足と横たわる胴体）
  ctx.fillStyle = '#d97706';
  ctx.fillRect(w * 0.35, h * 0.55, w * 0.55, h * 0.25);
  ctx.fillRect(w * 0.22, h * 0.72, w * 0.35, h * 0.12);
  // 頭部・ネメス頭飾り
  ctx.beginPath();
  ctx.ellipse(w * 0.42, h * 0.45, 45, 55, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#92400e';
  ctx.fillRect(w * 0.34, h * 0.48, 16, 45);
  ctx.fillRect(w * 0.46, h * 0.48, 16, 45);
}

// ----------------------------------------------------------------------
// 118: パルテノン神殿（大理石列柱とペディメント三角破風）
// ----------------------------------------------------------------------
function renderParthenon(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#38bdf8');
  // アクロポリスの岩山
  ctx.fillStyle = '#78716c';
  ctx.fillRect(0, h * 0.78, w, h * 0.22);
  const cx = w * 0.5, cy = h * 0.55;
  // 基壇
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(w * 0.12, cy + 50, w * 0.76, 16);
  // 三角破風（ペディメント）
  ctx.beginPath();
  ctx.moveTo(w * 0.1, cy - 30); ctx.lineTo(cx, cy - 90); ctx.lineTo(w * 0.9, cy - 30);
  ctx.closePath(); ctx.fill();
  // ドーリア式円柱（8本）
  ctx.fillStyle = '#e2e8f0';
  for (let i = 0; i < 8; i++) {
    const colX = w * 0.15 + i * (w * 0.7 / 7);
    ctx.fillRect(colX - 8, cy - 30, 16, 80);
  }
}

// ----------------------------------------------------------------------
// 119: ビッグベン（英国国会議事堂の大時計台）
// ----------------------------------------------------------------------
function renderBigBen(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0f172a', '#334155');
  const cx = w * 0.5;
  // 塔身（ゴシック様式）
  ctx.fillStyle = '#d97706';
  ctx.fillRect(cx - 45, h * 0.15, 90, h * 0.85);
  // 尖塔
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(cx - 45, h * 0.15); ctx.lineTo(cx, 0); ctx.lineTo(cx + 45, h * 0.15);
  ctx.closePath(); ctx.fill();
  // 光る文字盤（円形時計）
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(cx, h * 0.32, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 3; ctx.stroke();
  // 時計の針
  ctx.beginPath();
  ctx.moveTo(cx, h * 0.32); ctx.lineTo(cx, h * 0.32 - 18);
  ctx.moveTo(cx, h * 0.32); ctx.lineTo(cx + 12, h * 0.32);
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 120: 凱旋門（パリ・エトワール凱旋門の大アーチ）
// ----------------------------------------------------------------------
function renderTriomphe(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#60a5fa', '#93c5fd');
  const cx = w * 0.5, cy = h * 0.55;
  // 門全体
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(cx - w * 0.28, cy - h * 0.32, w * 0.56, h * 0.64);
  // 中央アーチ開口部
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.arc(cx, cy + h * 0.05, w * 0.14, Math.PI, 0, false);
  ctx.lineTo(cx + w * 0.14, cy + h * 0.32);
  ctx.lineTo(cx - w * 0.14, cy + h * 0.32);
  ctx.closePath(); ctx.fill();
  // 最上部アティック層
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(cx - w * 0.3, cy - h * 0.32, w * 0.6, 26);
}

// ----------------------------------------------------------------------
// 121: モアイ像（イースター島の長い鼻と顎の巨石像）
// ----------------------------------------------------------------------
function renderMoai(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#38bdf8');
  // 草原の丘
  ctx.fillStyle = '#15803d';
  ctx.fillRect(0, h * 0.72, w, h * 0.28);
  const cx = w * 0.5;
  // モアイ像（横顔・正面）
  ctx.fillStyle = '#57534e';
  ctx.beginPath();
  ctx.moveTo(cx - 45, h * 0.85); ctx.lineTo(cx - 35, h * 0.18);
  ctx.lineTo(cx + 35, h * 0.18); ctx.lineTo(cx + 50, h * 0.85);
  ctx.closePath(); ctx.fill();
  // 特徴的な深い眼窩と長い鼻
  ctx.fillStyle = '#292524';
  ctx.fillRect(cx - 30, h * 0.32, 22, 10);
  ctx.fillRect(cx + 8, h * 0.32, 22, 10);
  ctx.fillRect(cx - 10, h * 0.38, 20, 50);
  ctx.fillRect(cx - 24, h * 0.58, 48, 8);
}

// ----------------------------------------------------------------------
// 122: タワーブリッジ（ロンドンの2基の青い跳ね橋塔）
// ----------------------------------------------------------------------
function renderTowerBridge(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#bae6fd', '#e0f2fe');
  // テムズ川
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(0, h * 0.72, w, h * 0.28);
  // 2つの主塔
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(w * 0.22, h * 0.25, 45, h * 0.52);
  ctx.fillRect(w * 0.68, h * 0.25, 45, h * 0.52);
  // 青い吊り橋ケーブルと上部歩道橋
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 6;
  ctx.strokeRect(w * 0.22, h * 0.32, w * 0.52, 10);
  // 跳ね橋ロードウェイ
  ctx.fillStyle = '#334155';
  ctx.fillRect(0, h * 0.7, w, 14);
}

// ----------------------------------------------------------------------
// 123: 白鳥城（ノイシュヴァンシュタイン城・白亜の尖塔）
// ----------------------------------------------------------------------
function renderFairyCastle(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#fbcfe8', '#f472b6');
  // アルプスの岩山
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(0, h); ctx.lineTo(w * 0.3, h * 0.65); ctx.lineTo(w, h);
  ctx.fill();
  // 白亜の城壁と尖塔
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(w * 0.35, h * 0.45, w * 0.45, h * 0.4);
  // 青い屋根の円錐塔
  ctx.fillStyle = '#0284c7';
  const drawTower = (x: number, y: number, tw: number, th: number) => {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x, y, tw, th);
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(x - 4, y); ctx.lineTo(x + tw * 0.5, y - 45); ctx.lineTo(x + tw + 4, y);
    ctx.closePath(); ctx.fill();
  };
  drawTower(w * 0.32, h * 0.38, 30, 80);
  drawTower(w * 0.65, h * 0.30, 36, 120);
}

// ----------------------------------------------------------------------
// 124: 風車（オランダ・4枚の大きな十字羽根）
// ----------------------------------------------------------------------
function renderWindmillDutch(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#67e8f9', '#a5f3fc');
  // チューリップ畑
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(0, h * 0.78, w, h * 0.22);
  const cx = w * 0.5, cy = h * 0.48;
  // 風車本体（八角形石造）
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.moveTo(cx - 45, h * 0.8); ctx.lineTo(cx - 28, cy - 20);
  ctx.lineTo(cx + 28, cy - 20); ctx.lineTo(cx + 45, h * 0.8);
  ctx.closePath(); ctx.fill();
  // 4枚の風車羽根（格子構造）
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 4;
  for (let i = 0; i < 4; i++) {
    const a = (Math.PI / 2) * i + 0.3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * w * 0.36, cy + Math.sin(a) * w * 0.36);
    ctx.stroke();
  }
}

// ----------------------------------------------------------------------
// 125: 金門橋（ゴールデンゲートブリッジ・巨大な赤い主塔）
// ----------------------------------------------------------------------
function renderGoldenGate(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#fdba74');
  // 湾の水面
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(0, h * 0.75, w, h * 0.25);
  // 赤い主塔（インターナショナルオレンジ）
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(w * 0.42, h * 0.1, 38, h * 0.75);
  // メインケーブル（美しい懸垂曲線）
  ctx.strokeStyle = '#c2410c';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.55);
  ctx.quadraticCurveTo(w * 0.25, h * 0.65, w * 0.44, h * 0.12);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.44, h * 0.12);
  ctx.quadraticCurveTo(w * 0.7, h * 0.65, w, h * 0.58);
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 126: アンコールワット（蓮華座の中央塔とクメール寺院）
// ----------------------------------------------------------------------
function renderAngkorWat(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#fdba74', '#f97316');
  // 密林と堀
  ctx.fillStyle = '#064e3b';
  ctx.fillRect(0, h * 0.75, w, h * 0.25);
  // 砂岩の石造寺院
  ctx.fillStyle = '#44403c';
  ctx.fillRect(w * 0.15, h * 0.55, w * 0.7, h * 0.25);
  // 蓮のつぼみ型の中央主塔
  const drawLotusTower = (tx: number, ty: number, tw: number, th: number) => {
    ctx.beginPath();
    ctx.moveTo(tx - tw * 0.5, ty + th);
    ctx.quadraticCurveTo(tx - tw * 0.4, ty + th * 0.3, tx, ty);
    ctx.quadraticCurveTo(tx + tw * 0.4, ty + th * 0.3, tx + tw * 0.5, ty + th);
    ctx.closePath(); ctx.fill();
  };
  drawLotusTower(w * 0.5, h * 0.22, 60, h * 0.45);
  drawLotusTower(w * 0.35, h * 0.32, 45, h * 0.35);
  drawLotusTower(w * 0.65, h * 0.32, 45, h * 0.35);
}

// ----------------------------------------------------------------------
// 127: マヤピラミッド（チチェン・イッツァの階段神殿）
// ----------------------------------------------------------------------
function renderMayaPyramid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#38bdf8');
  // ユカタンの平原
  ctx.fillStyle = '#15803d';
  ctx.fillRect(0, h * 0.8, w, h * 0.2);
  // 9層の階段ピラミッド
  ctx.fillStyle = '#d6d3d1';
  const cx = w * 0.5;
  for (let i = 0; i < 9; i++) {
    const y = h * 0.35 + i * 22;
    const pw = w * 0.25 + i * 36;
    ctx.fillRect(cx - pw * 0.5, y, pw, 18);
  }
  // 中央階段
  ctx.fillStyle = '#a8a29e';
  ctx.beginPath();
  ctx.moveTo(cx - 18, h * 0.35); ctx.lineTo(cx - 36, h * 0.8);
  ctx.lineTo(cx + 36, h * 0.8); ctx.lineTo(cx + 18, h * 0.35);
  ctx.closePath(); ctx.fill();
  // 頂上の神殿
  ctx.fillStyle = '#e7e5e4';
  ctx.fillRect(cx - 24, h * 0.26, 48, 22);
}

// ----------------------------------------------------------------------
// 128: カッパドキア（奇岩の谷と空に浮かぶカラフルな熱気球）
// ----------------------------------------------------------------------
function renderCappadocia(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#fdba74', '#fbcfe8');
  // 奇岩群（キノコ岩）
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.moveTo(0, h); ctx.lineTo(w * 0.2, h * 0.6); ctx.lineTo(w * 0.4, h);
  ctx.lineTo(w * 0.65, h * 0.55); ctx.lineTo(w * 0.85, h); ctx.lineTo(w, h);
  ctx.closePath(); ctx.fill();
  // カラフルな熱気球
  const drawBalloon = (bx: number, by: number, br: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI, true);
    ctx.lineTo(bx + br * 0.3, by + br * 1.2);
    ctx.lineTo(bx - br * 0.3, by + br * 1.2);
    ctx.closePath(); ctx.fill();
  };
  drawBalloon(w * 0.3, h * 0.28, 26, '#ef4444');
  drawBalloon(w * 0.65, h * 0.2, 22, '#3b82f6');
  drawBalloon(w * 0.8, h * 0.38, 18, '#f59e0b');
}

// ----------------------------------------------------------------------
// 129: ゴンドラ（ベネチアの運河と黒い手漕ぎ船）
// ----------------------------------------------------------------------
function renderGondola(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#67e8f9', '#a5f3fc');
  // 運河の水面
  ctx.fillStyle = '#0891b2';
  ctx.fillRect(0, h * 0.65, w, h * 0.35);
  // ゴンドラ（黒い三日月型ボート）
  ctx.fillStyle = '#09090b';
  ctx.beginPath();
  ctx.moveTo(w * 0.1, h * 0.62);
  ctx.quadraticCurveTo(w * 0.5, h * 0.85, w * 0.9, h * 0.65);
  ctx.quadraticCurveTo(w * 0.5, h * 0.72, w * 0.1, h * 0.62);
  ctx.closePath(); ctx.fill();
  // 船首の鉄飾り（フェッロ）
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(w * 0.88, h * 0.55, 6, 26);
}

// ----------------------------------------------------------------------
// 130: ハリウッドサイン（ロサンゼルスの丘と白文字）
// ----------------------------------------------------------------------
function renderHollywood(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#bae6fd');
  // マウント・リーの緑の丘
  ctx.fillStyle = '#65a30d';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.8);
  ctx.quadraticCurveTo(w * 0.5, h * 0.45, w, h * 0.7);
  ctx.lineTo(w, h); ctx.lineTo(0, h);
  ctx.closePath(); ctx.fill();
  // 「HOLLYWOOD」白文字
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 38px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('HOLLYWOOD', w * 0.5, h * 0.58);
}

// ----------------------------------------------------------------------
// 131: ニュートン（リンゴの木・落下する赤いリンゴと万有引力）
// ----------------------------------------------------------------------
function renderNewtonApple(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#60a5fa', '#bfdbfe');
  // リンゴの木の葉
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.arc(w * 0.5, 0, w * 0.45, 0, Math.PI * 2);
  ctx.fill();
  // 落下する真っ赤なリンゴ
  const ax = w * 0.5, ay = h * 0.52;
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(ax, ay, 32, 0, Math.PI * 2);
  ctx.fill();
  // リンゴのヘタと葉
  ctx.fillStyle = '#78350f';
  ctx.fillRect(ax - 3, ay - 42, 6, 14);
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.ellipse(ax + 10, ay - 38, 12, 6, -0.4, 0, Math.PI * 2);
  ctx.fill();
  // 落下軌跡の破線
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3; ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(ax, h * 0.2); ctx.lineTo(ax, ay - 35);
  ctx.stroke(); ctx.setLineDash([]);
}

// ----------------------------------------------------------------------
// 132: エジソン（暗闇に灯る白熱電球・フィラメント）
// ----------------------------------------------------------------------
function renderEdisonBulb(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#09090b', '#18181b');
  const cx = w * 0.5, cy = h * 0.45;
  // 電球の光芒グロー
  const bGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, w * 0.38);
  bGrad.addColorStop(0, 'rgba(251, 191, 36, 0.95)');
  bGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.45)');
  bGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = bGrad;
  ctx.beginPath(); ctx.arc(cx, cy, w * 0.38, 0, Math.PI * 2); ctx.fill();
  // ガラス球
  ctx.fillStyle = '#fef08a';
  ctx.beginPath(); ctx.arc(cx, cy, 48, 0, Math.PI * 2); ctx.fill();
  // フィラメント（発光線）
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy + 20); ctx.lineTo(cx, cy - 15); ctx.lineTo(cx + 15, cy + 20);
  ctx.stroke();
  // ソケット口金
  ctx.fillStyle = '#78716c';
  ctx.fillRect(cx - 20, cy + 45, 40, 24);
}

// ----------------------------------------------------------------------
// 133: ダ・ヴィンチ（ウィトルウィウス的人体図の円と正方形）
// ----------------------------------------------------------------------
function renderVitruvianMan(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#fef3c7', '#fde68a');
  const cx = w * 0.5, cy = h * 0.5;
  // 古文書セピア枠
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 3;
  // 円
  ctx.beginPath(); ctx.arc(cx, cy, h * 0.38, 0, Math.PI * 2); ctx.stroke();
  // 正方形
  ctx.strokeRect(cx - h * 0.35, cy - h * 0.35, h * 0.7, h * 0.7);
  // 人体シルエット（両手両足を広げた姿）
  ctx.fillStyle = '#78350f';
  ctx.beginPath(); ctx.arc(cx, cy - h * 0.22, 16, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(cx - 6, cy - h * 0.15, 12, h * 0.28);
  // 腕
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx - h * 0.3, cy - 20); ctx.lineTo(cx + h * 0.3, cy - 20);
  ctx.moveTo(cx - h * 0.28, cy - h * 0.18); ctx.lineTo(cx + h * 0.28, cy - h * 0.18);
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 134: 野口英世（顕微鏡を見つめる学者・千円札の肖像）
// ----------------------------------------------------------------------
function renderNoguchi(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1e293b', '#334155');
  const cx = w * 0.5, cy = h * 0.5;
  // 肖像シルエット
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath(); ctx.ellipse(cx, cy - 20, 48, 60, 0, 0, Math.PI * 2); ctx.fill();
  // 特徴的な縮れ髪・口髭
  ctx.fillStyle = '#18181b';
  ctx.beginPath(); ctx.arc(cx, cy - 50, 52, Math.PI, 0, false); ctx.fill();
  ctx.fillRect(cx - 18, cy + 5, 36, 10);
  // スーツと蝶ネクタイ
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 60, cy + 35, 120, h * 0.4);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx - 15, cy + 35, 30, 14);
}

// ----------------------------------------------------------------------
// 135: 福沢諭吉（一万円札・着物と鋭い眼光）
// ----------------------------------------------------------------------
function renderFukuzawa(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#ecfccb', '#d9f99d');
  const cx = w * 0.5, cy = h * 0.5;
  // 一万円札の鳳凰・枠線
  ctx.strokeStyle = '#65a30d';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, w - 40, h - 40);
  // 肖像
  ctx.fillStyle = '#3f6212';
  ctx.beginPath(); ctx.ellipse(cx, cy - 15, 45, 55, 0, 0, Math.PI * 2); ctx.fill();
  // 羽織袴
  ctx.fillStyle = '#1e3a1e';
  ctx.beginPath();
  ctx.moveTo(cx - 80, h); ctx.lineTo(cx, cy + 30); ctx.lineTo(cx + 80, h);
  ctx.fill();
}

// ----------------------------------------------------------------------
// 136: 夏目漱石（黒猫・「吾輩は猫である」）
// ----------------------------------------------------------------------
function renderSosekiCat(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#fef3c7', '#fed7aa');
  const cx = w * 0.5, cy = h * 0.55;
  // 黒猫のシルエット
  ctx.fillStyle = '#09090b';
  ctx.beginPath(); ctx.ellipse(cx, cy + 20, 55, 45, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy - 35, 36, 0, Math.PI * 2); ctx.fill();
  // 耳
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy - 50); ctx.lineTo(cx - 45, cy - 85); ctx.lineTo(cx - 10, cy - 65);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 30, cy - 50); ctx.lineTo(cx + 45, cy - 85); ctx.lineTo(cx + 10, cy - 65);
  ctx.fill();
  // 黄色く光る目
  ctx.fillStyle = '#facc15';
  ctx.beginPath(); ctx.ellipse(cx - 15, cy - 35, 8, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx + 15, cy - 35, 8, 12, 0, 0, Math.PI * 2); ctx.fill();
}

// ----------------------------------------------------------------------
// 137: シェイクスピア（羽根ペンと羊皮紙・頭蓋骨）
// ----------------------------------------------------------------------
function renderShakespeare(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#451a03', '#78350f');
  const cx = w * 0.5, cy = h * 0.5;
  // 白い羽根ペン
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(cx + 40, cy - 80);
  ctx.quadraticCurveTo(cx + 10, cy, cx - 40, cy + 60);
  ctx.lineTo(cx - 30, cy + 50);
  ctx.quadraticCurveTo(cx + 30, cy, cx + 55, cy - 75);
  ctx.closePath(); ctx.fill();
  // インク壺
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 55, cy + 45, 30, 30);
}

// ----------------------------------------------------------------------
// 138: モーツァルト（赤ジャケット・白い巻き毛カツラ・ト音記号）
// ----------------------------------------------------------------------
function renderMozart(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#7f1d1d', '#991b1b');
  const cx = w * 0.5, cy = h * 0.5;
  // 白い巻き毛カツラ（パウダーウィッグ）
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath(); ctx.arc(cx - 35, cy - 20, 26, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx + 35, cy - 20, 26, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy - 40, 36, 0, Math.PI * 2); ctx.fill();
  // 金ボタンの赤い宮廷服
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(cx - 45, cy + 20, 90, h * 0.5);
  ctx.fillStyle = '#f59e0b';
  for (let i = 0; i < 4; i++) {
    ctx.beginPath(); ctx.arc(cx, cy + 35 + i * 18, 5, 0, Math.PI * 2); ctx.fill();
  }
}

// ----------------------------------------------------------------------
// 139: バッハ（教会のパイプオルガン・幾重の金属管）
// ----------------------------------------------------------------------
function renderBachOrgan(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1c1917', '#44403c');
  // パイプオルガンの銀色・真鍮パイプ群
  const cx = w * 0.5;
  for (let i = -7; i <= 7; i++) {
    const ph = h * 0.65 - Math.abs(i) * 16;
    const px = cx + i * 22;
    ctx.fillStyle = i % 2 === 0 ? '#d97706' : '#cbd5e1';
    ctx.fillRect(px - 9, h * 0.75 - ph, 18, ph);
  }
}

// ----------------------------------------------------------------------
// 140: ショパン（グランドピアノの鍵盤・黒漆）
// ----------------------------------------------------------------------
function renderChopinPiano(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#09090b', '#18181b');
  // ピアノ鍵盤（白鍵と黒鍵）
  const kw = w / 14;
  for (let i = 0; i < 14; i++) {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(i * kw + 1, h * 0.35, kw - 2, h * 0.55);
  }
  // 黒鍵
  ctx.fillStyle = '#09090b';
  const blackKeys = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
  for (const b of blackKeys) {
    ctx.fillRect(b * kw + kw * 0.65, h * 0.35, kw * 0.7, h * 0.35);
  }
}

// ----------------------------------------------------------------------
// 141: コロンブス（サンタ・マリア号・赤い十字の白い帆）
// ----------------------------------------------------------------------
function renderColumbusShip(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#38bdf8');
  // 海原
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(0, h * 0.7, w, h * 0.3);
  const cx = w * 0.5;
  // 船体（木造キャラック船）
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.moveTo(cx - 90, h * 0.68); ctx.lineTo(cx + 90, h * 0.68);
  ctx.lineTo(cx + 60, h * 0.78); ctx.lineTo(cx - 70, h * 0.78);
  ctx.closePath(); ctx.fill();
  // 白い大帆
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 45, h * 0.22, 90, 80);
  // 赤い十字紋章
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx - 30, h * 0.34, 60, 16);
  ctx.fillRect(cx - 8, h * 0.22, 16, 80);
}

// ----------------------------------------------------------------------
// 142: マゼラン（世界一周航路・地球儀）
// ----------------------------------------------------------------------
function renderMagellanGlobe(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0f172a', '#1e293b');
  const cx = w * 0.5, cy = h * 0.5, r = h * 0.36;
  // 海の青
  ctx.fillStyle = '#0284c7';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  // 大陸
  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.arc(cx - 30, cy, 40, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + 35, cy - 20, 35, 0, Math.PI * 2); ctx.fill();
  // 赤い世界一周航路
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 4; ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.ellipse(cx, cy, r * 1.15, r * 0.45, -0.3, 0, Math.PI * 2);
  ctx.stroke(); ctx.setLineDash([]);
}

// ----------------------------------------------------------------------
// 143: ダーウィン（進化論・ガラパゴスフィンチの嘴）
// ----------------------------------------------------------------------
function renderDarwinFinch(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#fef3c7', '#fde68a');
  const cx = w * 0.5, cy = h * 0.5;
  // フィンチ小鳥のシルエット
  ctx.fillStyle = '#44403c';
  ctx.beginPath(); ctx.ellipse(cx, cy, 60, 45, -0.2, 0, Math.PI * 2); ctx.fill();
  // 頭と大きなくちばし
  ctx.beginPath(); ctx.arc(cx + 45, cy - 20, 32, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(cx + 60, cy - 30); ctx.lineTo(cx + 120, cy - 10); ctx.lineTo(cx + 60, cy);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 144: ピタゴラス（直角三角形と3つの正方形 a^2 + b^2 = c^2）
// ----------------------------------------------------------------------
function renderPythagorasTriangle(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0f172a', '#1e293b');
  const ox = w * 0.45, oy = h * 0.65;
  // 直角三角形（3:4:5）
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(ox, oy); ctx.lineTo(ox + 90, oy); ctx.lineTo(ox, oy - 120);
  ctx.closePath(); ctx.fill();
  // 底辺の正方形 a^2
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(ox, oy, 90, 90);
  // 高さの正方形 b^2
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(ox - 120, oy - 120, 120, 120);
}

// ----------------------------------------------------------------------
// 145: アルキメデス（木製風呂桶から溢れる水と王冠）
// ----------------------------------------------------------------------
function renderArchimedesBath(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#bae6fd', '#7dd3fc');
  const cx = w * 0.5, cy = h * 0.65;
  // 木のバスタブ
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.32, h * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();
  // 溢れる水（エウレカ！）
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 10, w * 0.28, h * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  // 黄金の王冠
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy - 30); ctx.lineTo(cx - 30, cy - 65);
  ctx.lineTo(cx - 15, cy - 45); ctx.lineTo(cx, cy - 75);
  ctx.lineTo(cx + 15, cy - 45); ctx.lineTo(cx + 30, cy - 65);
  ctx.lineTo(cx + 30, cy - 30);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 146: ゲルニカ（ピカソの叫ぶ馬・電球・モノトーンのキュビスム）
// ----------------------------------------------------------------------
function renderGuernica(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#18181b', '#27272a');
  // モノトーンの幾何学多角形
  ctx.fillStyle = '#e4e4e7';
  ctx.beginPath();
  ctx.moveTo(w * 0.2, h * 0.3); ctx.lineTo(w * 0.45, h * 0.15); ctx.lineTo(w * 0.35, h * 0.7);
  ctx.fill();
  ctx.fillStyle = '#a1a1aa';
  ctx.beginPath();
  ctx.moveTo(w * 0.6, h * 0.25); ctx.lineTo(w * 0.85, h * 0.5); ctx.lineTo(w * 0.5, h * 0.8);
  ctx.fill();
  // 天井の目型ランプ
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.25, 36, 18, 0, 0, Math.PI * 2);
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 147: 睡蓮（モネ・睡蓮の丸い浮き葉とピンクの花・水面の光）
// ----------------------------------------------------------------------
function renderWaterLilies(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#065f46', '#0f766e');
  // 睡蓮の丸い浮き葉（緑）
  const drawPad = (px: number, py: number, rx: number, ry: number) => {
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.ellipse(px, py, rx, ry, 0.2, 0.3, Math.PI * 1.9);
    ctx.fill();
  };
  drawPad(w * 0.25, h * 0.4, 50, 30);
  drawPad(w * 0.7, h * 0.35, 65, 38);
  drawPad(w * 0.45, h * 0.7, 80, 45);
  // ピンクの睡蓮の花
  const drawFlower = (fx: number, fy: number) => {
    ctx.fillStyle = '#f472b6';
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.ellipse(fx, fy, 16, 8, (Math.PI / 3) * i, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#fef08a';
    ctx.beginPath(); ctx.arc(fx, fy, 6, 0, Math.PI * 2); ctx.fill();
  };
  drawFlower(w * 0.28, h * 0.38);
  drawFlower(w * 0.68, h * 0.33);
}

// ----------------------------------------------------------------------
// 148: 日傘をさす女性（モネ・緑の丘・白いドレスと日傘）
// ----------------------------------------------------------------------
function renderParasolWoman(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#60a5fa', '#bae6fd');
  // 草原の丘
  ctx.fillStyle = '#65a30d';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.65);
  ctx.quadraticCurveTo(w * 0.5, h * 0.55, w, h * 0.7);
  ctx.lineTo(w, h); ctx.lineTo(0, h);
  ctx.closePath(); ctx.fill();
  const cx = w * 0.55, cy = h * 0.48;
  // 緑の日傘
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.arc(cx - 20, cy - 60, 42, Math.PI, 0, false);
  ctx.closePath(); ctx.fill();
  // 白いドレスの女性シルエット
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(cx - 25, cy + 60); ctx.lineTo(cx, cy - 25); ctx.lineTo(cx + 25, cy + 60);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 149: 点描画（スーラ・無数の色点で描かれた公園の木と水辺）
// ----------------------------------------------------------------------
function renderPointillism(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#dcfce7', '#bbf7d0');
  // 点描パーティクルパターン
  const colors = ['#15803d', '#16a34a', '#84cc16', '#0284c7', '#f59e0b', '#dc2626'];
  for (let i = 0; i < 450; i++) {
    const px = ((i * 137) % w);
    const py = ((i * 211) % h);
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath(); ctx.arc(px, py, 4 + (i % 3), 0, Math.PI * 2); ctx.fill();
  }
}

// ----------------------------------------------------------------------
// 150: アルルの寝室（ゴッホ・黄色い木製ベッド・椅子・青い壁）
// ----------------------------------------------------------------------
function renderGoghBedroom(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#38bdf8', '#0284c7');
  // 赤い床
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(0, h * 0.68, w, h * 0.32);
  // 黄色いベッド
  ctx.fillStyle = '#facc15';
  ctx.fillRect(w * 0.35, h * 0.4, w * 0.55, h * 0.38);
  ctx.fillStyle = '#eab308';
  ctx.fillRect(w * 0.35, h * 0.3, 16, h * 0.48);
  // 黄色い椅子
  ctx.fillStyle = '#fde047';
  ctx.fillRect(w * 0.12, h * 0.52, 45, 45);
}

// ----------------------------------------------------------------------
// 151: 接吻（クリムト・黄金のローブと幾何学模様）
// ----------------------------------------------------------------------
function renderKlimtKiss(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#451a03', '#78350f');
  const cx = w * 0.5, cy = h * 0.5;
  // 黄金のオーラ
  const kGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, w * 0.35);
  kGrad.addColorStop(0, '#fef08a');
  kGrad.addColorStop(0.7, '#f59e0b');
  kGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = kGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.22, h * 0.38, -0.1, 0, Math.PI * 2);
  ctx.fill();
  // 黒と金の矩形装飾（男性の服）
  ctx.fillStyle = '#09090b';
  for (let i = 0; i < 8; i++) {
    ctx.fillRect(cx - 35 + (i % 3) * 24, cy - 60 + i * 16, 18, 10);
  }
}

// ----------------------------------------------------------------------
// 152: ミロのヴィーナス（白大理石の女神彫像上半身）
// ----------------------------------------------------------------------
function renderMiloVenus(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1e293b', '#0f172a');
  const cx = w * 0.5, cy = h * 0.52;
  // 大理石の美しいS字トルソ
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 20, 42, 70, 0.1, 0, Math.PI * 2);
  ctx.fill();
  // 頭部
  ctx.beginPath();
  ctx.ellipse(cx + 8, cy - 80, 26, 34, 0.15, 0, Math.PI * 2);
  ctx.fill();
  // ドレープ布（下半身）
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(cx - 48, cy + 50, 96, h * 0.4);
}

// ----------------------------------------------------------------------
// 153: 黄金の玉座（ツタンカーメンの黄金の椅子）
// ----------------------------------------------------------------------
function renderGoldenThrone(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#18181b', '#27272a');
  const cx = w * 0.5, cy = h * 0.55;
  // 黄金の椅子枠
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 55, cy - 70, 110, 140);
  // 背もたれのレリーフ（青・赤のガラス装飾）
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(cx - 40, cy - 55, 80, 60);
  ctx.fillStyle = '#dc2626';
  ctx.beginPath(); ctx.arc(cx, cy - 25, 20, 0, Math.PI * 2); ctx.fill();
  // ライオンの脚
  ctx.fillStyle = '#d97706';
  ctx.fillRect(cx - 50, cy + 70, 18, 45);
  ctx.fillRect(cx + 32, cy + 70, 18, 45);
}

// ----------------------------------------------------------------------
// 154: ロゼッタストーン（3種の古代文字が刻まれた黒い石碑）
// ----------------------------------------------------------------------
function renderRosettaStone(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#09090b', '#18181b');
  const cx = w * 0.5, cy = h * 0.52;
  // 黒い玄武岩・花崗岩石碑（上部が欠けた形状）
  ctx.fillStyle = '#3f3f46';
  ctx.beginPath();
  ctx.moveTo(cx - 70, cy + 110); ctx.lineTo(cx - 65, cy - 80);
  ctx.lineTo(cx + 30, cy - 105); ctx.lineTo(cx + 70, cy - 65);
  ctx.lineTo(cx + 65, cy + 110);
  ctx.closePath(); ctx.fill();
  // 3段の文字線（ヒエログリフ、デモティック、ギリシャ）
  ctx.strokeStyle = '#e4e4e7';
  ctx.lineWidth = 1.5;
  for (let y = cy - 70; y < cy + 95; y += 12) {
    ctx.beginPath(); ctx.moveTo(cx - 50, y); ctx.lineTo(cx + 50, y); ctx.stroke();
  }
}

// ----------------------------------------------------------------------
// 155: バベルの塔（天にそびえる巨大な螺旋円塔）
// ----------------------------------------------------------------------
function renderBabelTower(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#93c5fd', '#bfdbfe');
  const cx = w * 0.5;
  // 螺旋の巨塔
  ctx.fillStyle = '#b45309';
  for (let i = 0; i < 7; i++) {
    const y = h * 0.2 + i * 26;
    const tw = w * 0.22 + i * 36;
    ctx.fillRect(cx - tw * 0.5, y, tw, 22);
    // アーチ回廊
    ctx.fillStyle = '#78350f';
    for (let a = -tw * 0.45; a < tw * 0.45; a += 16) {
      ctx.fillRect(cx + a, y + 6, 8, 14);
    }
    ctx.fillStyle = '#b45309';
  }
}

// ----------------------------------------------------------------------
// 156: バイオリン（木製ボディ・弦・f字孔）
// ----------------------------------------------------------------------
function renderViolin(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1e293b', '#0f172a');
  const cx = w * 0.5, cy = h * 0.5;
  // 木製ニス塗りボディ
  const vGrad = ctx.createLinearGradient(cx - 40, 0, cx + 40, 0);
  vGrad.addColorStop(0, '#78350f'); vGrad.addColorStop(0.5, '#d97706'); vGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = vGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 35, 55, 65, 0, 0, Math.PI * 2);
  ctx.ellipse(cx, cy - 35, 45, 50, 0, 0, Math.PI * 2);
  ctx.fill();
  // 指板とネック
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 8, cy - h * 0.4, 16, h * 0.6);
  // f字孔
  ctx.strokeStyle = '#09090b'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(cx - 24, cy, 14, 0.5, 2.5); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx + 24, cy, 14, 3.6, 5.6); ctx.stroke();
}

// ----------------------------------------------------------------------
// 157: トランペット（真鍮ゴールドの管と朝顔ベル）
// ----------------------------------------------------------------------
function renderTrumpet(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0f172a', '#1e293b');
  const cy = h * 0.5;
  // 真鍮の管
  ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(w * 0.1, cy); ctx.lineTo(w * 0.75, cy);
  ctx.stroke();
  // ベル（朝顔）
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(w * 0.72, cy - 8); ctx.lineTo(w * 0.9, cy - 45); ctx.lineTo(w * 0.9, cy + 45);
  ctx.closePath(); ctx.fill();
  // 3つのピストン
  ctx.fillStyle = '#fef08a';
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(w * 0.38 + i * 16, cy - 28, 10, 36);
  }
}

// ----------------------------------------------------------------------
// 158: ドラムセット（スネア・シンバル・バスドラム）
// ----------------------------------------------------------------------
function renderDrumKit(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#18181b', '#27272a');
  const cx = w * 0.5, cy = h * 0.58;
  // バスドラム（大太鼓）
  ctx.fillStyle = '#dc2626';
  ctx.beginPath(); ctx.arc(cx, cy, 65, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI * 2); ctx.fill();
  // スネアドラム
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(cx - 95, cy - 45, 55, 30);
  // シンバル（ゴールド）
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(cx + 80, cy - 70, 48, 12, -0.2, 0, Math.PI * 2);
  ctx.fill();
}

// ----------------------------------------------------------------------
// 159: 望遠鏡（夜空を見上げる三脚付き天体望遠鏡）
// ----------------------------------------------------------------------
function renderTelescope(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#020617', '#0f172a');
  // 星々
  ctx.fillStyle = '#fef08a';
  for (let i = 0; i < 20; i++) {
    ctx.fillRect((i * 73) % w, (i * 97) % (h * 0.5), 2, 2);
  }
  // 望遠鏡筒（斜め）
  ctx.save();
  ctx.translate(w * 0.5, h * 0.45);
  ctx.rotate(-0.55);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-80, -14, 160, 28);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(60, -18, 25, 36);
  ctx.restore();
  // 三脚
  ctx.strokeStyle = '#78716c'; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, h * 0.48); ctx.lineTo(w * 0.25, h);
  ctx.moveTo(w * 0.5, h * 0.48); ctx.lineTo(w * 0.5, h);
  ctx.moveTo(w * 0.5, h * 0.48); ctx.lineTo(w * 0.75, h);
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 160: 顕微鏡（対物レンズ・ステージ・プレパラート）
// ----------------------------------------------------------------------
function renderMicroscope(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1e293b', '#334155');
  const cx = w * 0.5;
  // 台座
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 60, h * 0.82, 120, 24);
  // アーム（C型）
  ctx.strokeStyle = '#09090b'; ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.arc(cx - 30, h * 0.55, 55, Math.PI * 0.5, Math.PI * 1.5, false);
  ctx.stroke();
  // 鏡筒（接眼レンズと対物レンズ）
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx + 10, h * 0.22, 28, 80);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx + 8, h * 0.48, 32, 16);
  // ステージ
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 10, h * 0.62, 70, 10);
}

// ----------------------------------------------------------------------
// 161: コンパス（方位磁針・赤と青の磁針・N極）
// ----------------------------------------------------------------------
function renderCompass(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0f172a', '#1e293b');
  const cx = w * 0.5, cy = h * 0.5, r = h * 0.36;
  // 真鍮ケース
  ctx.fillStyle = '#d97706';
  ctx.beginPath(); ctx.arc(cx, cy, r + 10, 0, Math.PI * 2); ctx.fill();
  // 文字盤（白）
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  // 磁針（北: 赤、南: 青）
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(cx, cy); ctx.lineTo(cx - 12, cy); ctx.lineTo(cx, cy - r * 0.8);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.moveTo(cx, cy); ctx.lineTo(cx + 12, cy); ctx.lineTo(cx, cy + r * 0.8);
  ctx.closePath(); ctx.fill();
  // N/S文字
  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('N', cx, cy - r * 0.85);
}

// ----------------------------------------------------------------------
// 162: 天秤（左右の皿がつりあう黄金のはかり）
// ----------------------------------------------------------------------
function renderBalanceScale(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1c1917', '#292524');
  const cx = w * 0.5;
  // 支柱
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 6, h * 0.2, 12, h * 0.65);
  ctx.fillRect(cx - 45, h * 0.82, 90, 16);
  // 水平梁
  ctx.fillRect(cx - w * 0.35, h * 0.25, w * 0.7, 10);
  // 左右の皿
  const drawPan = (px: number) => {
    ctx.strokeStyle = '#d97706'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, h * 0.26); ctx.lineTo(px - 35, h * 0.55);
    ctx.moveTo(px, h * 0.26); ctx.lineTo(px + 35, h * 0.55);
    ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(px, h * 0.55, 38, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  drawPan(cx - w * 0.3);
  drawPan(cx + w * 0.3);
}

// ----------------------------------------------------------------------
// 163: ルービックキューブ（カラフルな6面の3Dキューブ）
// ----------------------------------------------------------------------
function renderRubiksCube(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1e293b', '#0f172a');
  const cx = w * 0.5, cy = h * 0.52;
  // 立体キューブの各面（赤・青・黄）
  const colors = ['#ef4444', '#3b82f6', '#facc15', '#22c55e', '#f97316', '#ffffff'];
  // 簡易3Dブロック描画
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 75, cy - 75, 150, 150);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      ctx.fillStyle = colors[(r * 3 + c) % colors.length];
      ctx.fillRect(cx - 70 + c * 48, cy - 70 + r * 48, 44, 44);
    }
  }
}

// ----------------------------------------------------------------------
// 164: カメラ（一眼レフカメラの丸い大口径レンズ）
// ----------------------------------------------------------------------
function renderCamera(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#334155', '#1e293b');
  const cx = w * 0.5, cy = h * 0.55;
  // 黒いボディ
  ctx.fillStyle = '#18181b';
  ctx.fillRect(cx - w * 0.32, cy - h * 0.25, w * 0.64, h * 0.5);
  // 軍艦部（ペンタプリズム）
  ctx.beginPath();
  ctx.moveTo(cx - 40, cy - h * 0.25); ctx.lineTo(cx, cy - h * 0.38); ctx.lineTo(cx + 40, cy - h * 0.25);
  ctx.closePath(); ctx.fill();
  // 大口径レンズ（青いコーティングの反射円）
  ctx.fillStyle = '#3f3f46';
  ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2); ctx.fill();
  const lGrad = ctx.createRadialGradient(cx - 15, cy - 15, 10, cx, cy, 50);
  lGrad.addColorStop(0, '#38bdf8'); lGrad.addColorStop(0.7, '#1e1b4b'); lGrad.addColorStop(1, '#09090b');
  ctx.fillStyle = lGrad;
  ctx.beginPath(); ctx.arc(cx, cy, 48, 0, Math.PI * 2); ctx.fill();
}

// ----------------------------------------------------------------------
// 165: 虫眼鏡（丸い拡大レンズと柄）
// ----------------------------------------------------------------------
function renderMagnifyingGlass(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#f8fafc', '#e2e8f0');
  const cx = w * 0.45, cy = h * 0.42;
  // 丸いレンズ（ガラス反射）
  ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.beginPath(); ctx.arc(cx, cy, 75, 0, Math.PI * 2); ctx.fill();
  // 金属リム
  ctx.strokeStyle = '#d97706'; ctx.lineWidth = 10;
  ctx.beginPath(); ctx.arc(cx, cy, 75, 0, Math.PI * 2); ctx.stroke();
  // 木製の柄
  ctx.save();
  ctx.translate(cx + 55, cy + 55);
  ctx.rotate(Math.PI * 0.25);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(-10, 0, 20, 110);
  ctx.restore();
}

// ----------------------------------------------------------------------
// 166: 蓄音機（グラモフォン・真鍮の花びらラッパ）
// ----------------------------------------------------------------------
function renderGramophone(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1c1917', '#292524');
  const cx = w * 0.45, cy = h * 0.65;
  // 木箱
  ctx.fillStyle = '#78350f';
  ctx.fillRect(cx - 65, cy, 130, 60);
  // 黒いレコード盤
  ctx.fillStyle = '#09090b';
  ctx.beginPath(); ctx.ellipse(cx, cy, 60, 16, 0, 0, Math.PI * 2); ctx.fill();
  // 黄金の花びらラッパホーン
  const hGrad = ctx.createRadialGradient(cx + 70, cy - 90, 10, cx + 70, cy - 90, 75);
  hGrad.addColorStop(0, '#fef08a'); hGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = hGrad;
  ctx.beginPath();
  ctx.moveTo(cx - 10, cy - 20);
  ctx.quadraticCurveTo(cx + 20, cy - 60, cx + 60, cy - 130);
  ctx.lineTo(cx + 120, cy - 70);
  ctx.quadraticCurveTo(cx + 40, cy - 40, cx, cy - 15);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 167: 電球（白熱電球・透明ガラスと真鍮ソケット）
// ----------------------------------------------------------------------
function renderLightBulb(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#020617', '#0f172a');
  const cx = w * 0.5, cy = h * 0.42;
  // ガラス球
  ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
  ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI * 2); ctx.fill();
  // フィラメント
  ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 16, cy + 25); ctx.lineTo(cx, cy - 20); ctx.lineTo(cx + 16, cy + 25);
  ctx.stroke();
  // 口金
  ctx.fillStyle = '#78716c';
  ctx.fillRect(cx - 24, cy + 52, 48, 30);
}

// ----------------------------------------------------------------------
// 168: 万年筆（金色のペン先と流線型の軸）
// ----------------------------------------------------------------------
function renderFountainPen(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#09090b', '#18181b');
  ctx.save();
  ctx.translate(w * 0.5, h * 0.5);
  ctx.rotate(-Math.PI * 0.25);
  // ペン軸（黒漆）
  ctx.fillStyle = '#18181b';
  ctx.fillRect(-18, -140, 36, 120);
  // 金リング
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(-18, -20, 36, 12);
  // 金ペン先
  ctx.beginPath();
  ctx.moveTo(-16, -8); ctx.lineTo(0, 55); ctx.lineTo(16, -8);
  ctx.closePath(); ctx.fill();
  // ペン先の切れ込み線
  ctx.strokeStyle = '#18181b'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 55); ctx.stroke();
  ctx.restore();
}

// ----------------------------------------------------------------------
// 169: 砂時計（ガラスのくびれと落ちる黄金の砂）
// ----------------------------------------------------------------------
function renderHourglass(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1e293b', '#0f172a');
  const cx = w * 0.5, cy = h * 0.5;
  // 上下の木製プレート
  ctx.fillStyle = '#78350f';
  ctx.fillRect(cx - 65, cy - 100, 130, 16);
  ctx.fillRect(cx - 65, cy + 84, 130, 16);
  // ガラス球（くびれ構造）
  ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 45, cy - 84); ctx.quadraticCurveTo(cx - 45, cy - 10, cx - 6, cy);
  ctx.quadraticCurveTo(cx - 45, cy + 10, cx - 45, cy + 84);
  ctx.lineTo(cx + 45, cy + 84);
  ctx.quadraticCurveTo(cx + 45, cy + 10, cx + 6, cy);
  ctx.quadraticCurveTo(cx + 45, cy - 10, cx + 45, cy - 84);
  ctx.closePath(); ctx.stroke();
  // 黄金の砂
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(cx - 35, cy + 84); ctx.lineTo(cx, cy + 40); ctx.lineTo(cx + 35, cy + 84);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 170: そろばん（木枠・梁・五玉と一玉の軸）
// ----------------------------------------------------------------------
function renderAbacus(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#fef3c7', '#fed7aa');
  const cx = w * 0.5, cy = h * 0.5;
  // 外枠（黒漆）
  ctx.fillStyle = '#18181b';
  ctx.fillRect(cx - w * 0.42, cy - 65, w * 0.84, 130);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(cx - w * 0.4, cy - 60, w * 0.8, 120);
  // 中梁
  ctx.fillStyle = '#18181b';
  ctx.fillRect(cx - w * 0.4, cy - 25, w * 0.8, 8);
  // 珠（茶色）
  ctx.fillStyle = '#78350f';
  for (let c = -5; c <= 5; c++) {
    const x = cx + c * 32;
    // 五玉
    ctx.fillRect(x - 10, cy - 50, 20, 14);
    // 一玉（4つ）
    for (let r = 0; r < 4; r++) {
      ctx.fillRect(x - 10, cy - 10 + r * 16, 20, 12);
    }
  }
}

// ----------------------------------------------------------------------
// 171: クジラ（深い青の海・吹き上がる白い潮）
// ----------------------------------------------------------------------
function renderWhale(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#0f172a');
  const cx = w * 0.5, cy = h * 0.62;
  // 吹き上がる潮（ブロー）
  ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 50, cy - 35); ctx.quadraticCurveTo(cx - 70, h * 0.2, cx - 90, h * 0.15);
  ctx.moveTo(cx - 50, cy - 35); ctx.quadraticCurveTo(cx - 40, h * 0.18, cx - 30, h * 0.12);
  ctx.stroke();
  // クジラの巨大な体（群青色）
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.35, h * 0.18, -0.05, 0, Math.PI * 2);
  ctx.fill();
  // 尾ビレ
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.32, cy); ctx.lineTo(cx + w * 0.44, cy - 40); ctx.lineTo(cx + w * 0.44, cy + 40);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 172: 白くま（北極の氷原と真っ白なホッキョクグマ）
// ----------------------------------------------------------------------
function renderPolarBear(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#38bdf8', '#bae6fd');
  // 氷山
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, h * 0.65, w, h * 0.35);
  const cx = w * 0.5, cy = h * 0.6;
  // 白くまの体
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.ellipse(cx, cy, 80, 55, 0, 0, Math.PI * 2); ctx.fill();
  // 頭と丸い耳
  ctx.beginPath(); ctx.ellipse(cx - 70, cy - 25, 40, 30, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx - 80, cy - 50, 10, 0, Math.PI * 2); ctx.fill();
  // 黒い鼻と目
  ctx.fillStyle = '#09090b';
  ctx.beginPath(); ctx.arc(cx - 105, cy - 25, 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx - 75, cy - 35, 4, 0, Math.PI * 2); ctx.fill();
}

// ----------------------------------------------------------------------
// 173: カンガルー（夕日のオーストラリア・大ジャンプ）
// ----------------------------------------------------------------------
function renderKangaroo(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#ea580c', '#f59e0b');
  // カンガルーの黒いシルエット
  ctx.fillStyle = '#18181b';
  const cx = w * 0.5, cy = h * 0.5;
  // 胴体と頭
  ctx.beginPath(); ctx.ellipse(cx, cy, 35, 60, 0.4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx + 30, cy - 65, 20, 30, 0.5, 0, Math.PI * 2); ctx.fill();
  // 長い耳
  ctx.fillRect(cx + 35, cy - 100, 6, 25);
  // 太い尾
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy + 30); ctx.quadraticCurveTo(cx - 70, cy + 60, cx - 110, cy + 70);
  ctx.lineWidth = 14; ctx.strokeStyle = '#18181b'; ctx.stroke();
}

// ----------------------------------------------------------------------
// 174: フラミンゴ（鮮やかなピンク色の羽と細い一本足）
// ----------------------------------------------------------------------
function renderFlamingo(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#67e8f9', '#a5f3fc');
  const cx = w * 0.5, cy = h * 0.45;
  // ピンクの体
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath(); ctx.ellipse(cx, cy, 48, 36, -0.2, 0, Math.PI * 2); ctx.fill();
  // S字の首
  ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy - 15);
  ctx.bezierCurveTo(cx - 50, cy - 80, cx - 10, cy - 110, cx - 25, cy - 130);
  ctx.stroke();
  // くちばし（先が黒）
  ctx.fillStyle = '#09090b';
  ctx.beginPath(); ctx.arc(cx - 35, cy - 130, 10, 0, Math.PI * 2); ctx.fill();
  // 細い足
  ctx.strokeStyle = '#fb7185'; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx, cy + 30); ctx.lineTo(cx, h * 0.88);
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 175: フクロウ（夜の森・大きな金色の丸い目）
// ----------------------------------------------------------------------
function renderOwl(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0f172a', '#1e293b');
  const cx = w * 0.5, cy = h * 0.5;
  // フクロウの体
  ctx.fillStyle = '#78350f';
  ctx.beginPath(); ctx.ellipse(cx, cy + 20, 55, 75, 0, 0, Math.PI * 2); ctx.fill();
  // 大きな金色の目
  ctx.fillStyle = '#facc15';
  ctx.beginPath(); ctx.arc(cx - 25, cy - 20, 22, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx + 25, cy - 20, 22, 0, Math.PI * 2); ctx.fill();
  // 黒い瞳
  ctx.fillStyle = '#09090b';
  ctx.beginPath(); ctx.arc(cx - 25, cy - 20, 11, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx + 25, cy - 20, 11, 0, Math.PI * 2); ctx.fill();
}

// ----------------------------------------------------------------------
// 176: カブトムシ（黒光りする甲虫と立派な二股角）
// ----------------------------------------------------------------------
function renderBeetleRhino(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#14532d', '#166534');
  const cx = w * 0.5, cy = h * 0.55;
  // 漆黒の丸い背中
  ctx.fillStyle = '#1c1917';
  ctx.beginPath(); ctx.ellipse(cx, cy + 20, 48, 65, 0, 0, Math.PI * 2); ctx.fill();
  // 頭と立派な角
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 8, cy - 120, 16, 80);
  // 角の二股先端
  ctx.beginPath();
  ctx.moveTo(cx - 24, cy - 130); ctx.lineTo(cx, cy - 100); ctx.lineTo(cx + 24, cy - 130);
  ctx.lineWidth = 8; ctx.strokeStyle = '#09090b'; ctx.stroke();
}

// ----------------------------------------------------------------------
// 177: クワガタ（大きな大顎ハサミを持つ黒いクワガタ）
// ----------------------------------------------------------------------
function renderBeetleStag(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1e293b', '#0f172a');
  const cx = w * 0.5, cy = h * 0.55;
  // 体
  ctx.fillStyle = '#18181b';
  ctx.beginPath(); ctx.ellipse(cx, cy + 20, 42, 60, 0, 0, Math.PI * 2); ctx.fill();
  // 左右の大顎（ハサミ）
  ctx.strokeStyle = '#09090b'; ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx - 30, cy - 65, 45, Math.PI * 0.2, Math.PI * 1.3, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + 30, cy - 65, 45, Math.PI * 1.7, Math.PI * 0.8, false);
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 178: チョウ（鮮やかなアゲハチョウの黄色と黒の羽）
// ----------------------------------------------------------------------
function renderButterfly(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#064e3b', '#065f46');
  const cx = w * 0.5, cy = h * 0.5;
  // 鮮やかな黄色い翅
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.ellipse(cx - 55, cy - 35, 55, 45, -0.4, 0, Math.PI * 2);
  ctx.ellipse(cx + 55, cy - 35, 55, 45, 0.4, 0, Math.PI * 2);
  ctx.fill();
  // 黒い翅脈と胴体
  ctx.fillStyle = '#09090b';
  ctx.fillRect(cx - 6, cy - 50, 12, 100);
}

// ----------------------------------------------------------------------
// 179: ハチドリ（ホバリングするエメラルドの小鳥）
// ----------------------------------------------------------------------
function renderHummingbird(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#e0f2fe', '#bae6fd');
  const cx = w * 0.5, cy = h * 0.5;
  // エメラルドグリーンの体
  ctx.fillStyle = '#059669';
  ctx.beginPath(); ctx.ellipse(cx, cy, 38, 24, -0.3, 0, Math.PI * 2); ctx.fill();
  // 細長いくちばし
  ctx.strokeStyle = '#09090b'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx + 30, cy - 10); ctx.lineTo(cx + 90, cy - 25); ctx.stroke();
  // 高速羽ばたきの羽
  ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
  ctx.beginPath(); ctx.ellipse(cx - 10, cy - 35, 38, 14, -0.8, 0, Math.PI * 2); ctx.fill();
}

// ----------------------------------------------------------------------
// 180: ウミガメ（サンゴ礁の海を泳ぐウミガメ）
// ----------------------------------------------------------------------
function renderSeaTurtle(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#0369a1');
  const cx = w * 0.5, cy = h * 0.5;
  // 甲羅（緑・茶）
  ctx.fillStyle = '#15803d';
  ctx.beginPath(); ctx.ellipse(cx, cy, 65, 80, 0, 0, Math.PI * 2); ctx.fill();
  // 前ヒレ（大きな翼状）
  ctx.beginPath();
  ctx.ellipse(cx - 80, cy - 40, 50, 22, -0.6, 0, Math.PI * 2);
  ctx.ellipse(cx + 80, cy - 40, 50, 22, 0.6, 0, Math.PI * 2);
  ctx.fill();
  // 頭
  ctx.beginPath(); ctx.ellipse(cx, cy - 95, 22, 28, 0, 0, Math.PI * 2); ctx.fill();
}

// ----------------------------------------------------------------------
// 181: タコ（赤い丸い頭と8本のうねる触手）
// ----------------------------------------------------------------------
function renderOctopus(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0369a1', '#082f49');
  const cx = w * 0.5, cy = h * 0.42;
  // 丸い頭
  ctx.fillStyle = '#dc2626';
  ctx.beginPath(); ctx.ellipse(cx, cy, 55, 65, 0, 0, Math.PI * 2); ctx.fill();
  // 8本の触手
  ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 14;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 14, cy + 50);
    ctx.quadraticCurveTo(cx + i * 35, h * 0.75, cx + i * 45, h * 0.88);
    ctx.stroke();
  }
}

// ----------------------------------------------------------------------
// 182: クラゲ（半透明のドーム傘と光る触手）
// ----------------------------------------------------------------------
function renderJellyfish(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#020617', '#0f172a');
  const cx = w * 0.5, cy = h * 0.38;
  // 半透明の傘
  const jGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 70);
  jGrad.addColorStop(0, 'rgba(56, 189, 248, 0.85)');
  jGrad.addColorStop(1, 'rgba(236, 72, 153, 0.35)');
  ctx.fillStyle = jGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 65, Math.PI, 0, false);
  ctx.closePath(); ctx.fill();
  // 揺らめく触手
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)'; ctx.lineWidth = 3;
  for (let i = -4; i <= 4; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 12, cy);
    ctx.quadraticCurveTo(cx + i * 18 + 10, h * 0.65, cx + i * 14, h * 0.88);
    ctx.stroke();
  }
}

// ----------------------------------------------------------------------
// 183: ラッコ（お腹の上に貝を乗せて浮かぶ姿）
// ----------------------------------------------------------------------
function renderSeaOtter(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0284c7', '#0369a1');
  const cx = w * 0.5, cy = h * 0.52;
  // 水面に仰向けに浮かぶ茶色い体
  ctx.fillStyle = '#78350f';
  ctx.beginPath(); ctx.ellipse(cx, cy, 45, 90, 0, 0, Math.PI * 2); ctx.fill();
  // 丸い顔
  ctx.fillStyle = '#fde68a';
  ctx.beginPath(); ctx.arc(cx, cy - 80, 32, 0, Math.PI * 2); ctx.fill();
  // お腹の上の二枚貝
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath(); ctx.ellipse(cx, cy - 10, 22, 16, 0, 0, Math.PI * 2); ctx.fill();
}

// ----------------------------------------------------------------------
// 184: レッサーパンダ（赤茶色の毛とシマシマ尻尾）
// ----------------------------------------------------------------------
function renderRedPanda(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#15803d', '#166534');
  const cx = w * 0.5, cy = h * 0.5;
  // 顔（赤茶）
  ctx.fillStyle = '#c2410c';
  ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI * 2); ctx.fill();
  // 白い耳と眉斑
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 45, cy - 25, 20, 14);
  ctx.fillRect(cx + 25, cy - 25, 20, 14);
  // シマシマの長い尻尾
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#9a3412' : '#fef08a';
    ctx.fillRect(cx + 45 + i * 16, cy + 35, 16, 32);
  }
}

// ----------------------------------------------------------------------
// 185: 白頭ワシ（白い頭と黄色い鋭い嘴）
// ----------------------------------------------------------------------
function renderBaldEagle(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#1e293b', '#0f172a');
  const cx = w * 0.5, cy = h * 0.52;
  // 焦茶の胴体
  ctx.fillStyle = '#292524';
  ctx.fillRect(cx - 50, cy + 10, 100, h * 0.4);
  // 真っ白な頭部
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath(); ctx.ellipse(cx, cy - 40, 48, 55, 0, 0, Math.PI * 2); ctx.fill();
  // 黄色く曲がった鋭い嘴
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(cx + 25, cy - 45); ctx.lineTo(cx + 80, cy - 35); ctx.lineTo(cx + 25, cy - 20);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 186: ブラックホール（漆黒の中心と歪む黄金の降着円盤）
// ----------------------------------------------------------------------
function renderBlackHole(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#020617', '#000000');
  const cx = w * 0.5, cy = h * 0.5;
  // 輝く降着円盤（アクリエーションディスク）
  const dGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, w * 0.42);
  dGrad.addColorStop(0, '#fef08a');
  dGrad.addColorStop(0.3, '#f59e0b');
  dGrad.addColorStop(0.7, '#ea580c');
  dGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = dGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.42, h * 0.16, -0.2, 0, Math.PI * 2);
  ctx.fill();
  // 事象の地平面（漆黒の特異点穴）
  ctx.fillStyle = '#000000';
  ctx.beginPath(); ctx.arc(cx, cy, 48, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#fef08a'; ctx.lineWidth = 3; ctx.stroke();
}

// ----------------------------------------------------------------------
// 187: 土星（氷の輪リングと縞模様）
// ----------------------------------------------------------------------
function renderSaturnRings(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#020617', '#0f172a');
  const cx = w * 0.5, cy = h * 0.5, r = h * 0.28;
  // 輪の後ろ側
  ctx.strokeStyle = '#d97706'; ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.ellipse(cx, cy, r * 2.1, r * 0.65, -0.3, Math.PI, 0, false);
  ctx.stroke();
  // 土星本体（球体）
  const sGrad = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, r);
  sGrad.addColorStop(0, '#fde68a'); sGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = sGrad;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  // 輪の手前側
  ctx.beginPath();
  ctx.ellipse(cx, cy, r * 2.1, r * 0.65, -0.3, 0, Math.PI, false);
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 188: 彗星（長く伸びる青い光の尾・ほうき星）
// ----------------------------------------------------------------------
function renderComet(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#020617', '#0f172a');
  const cx = w * 0.75, cy = h * 0.35;
  // 輝く青いイオンテール
  const tGrad = ctx.createLinearGradient(cx, cy, 0, h);
  tGrad.addColorStop(0, '#38bdf8'); tGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = tGrad;
  ctx.beginPath();
  ctx.moveTo(cx, cy); ctx.lineTo(0, h * 0.6); ctx.lineTo(w * 0.2, h);
  ctx.closePath(); ctx.fill();
  // 彗星核（真っ白な光球）
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(cx, cy, 24, 0, Math.PI * 2); ctx.fill();
}

// ----------------------------------------------------------------------
// 189: 流れ星（夜空を一瞬で走る白い閃光線）
// ----------------------------------------------------------------------
function renderShootingStar(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#020617', '#0f172a');
  // 満天の星
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 40; i++) {
    ctx.fillRect((i * 123) % w, (i * 179) % h, 2, 2);
  }
  // 流れ星の閃光
  ctx.strokeStyle = '#fef08a'; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(w * 0.85, h * 0.15); ctx.lineTo(w * 0.2, h * 0.75);
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 190: 日食（皆既日食・黒い太陽と輝くコロナ・ダイヤモンドリング）
// ----------------------------------------------------------------------
function renderSolarEclipse(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#000000', '#09090b');
  const cx = w * 0.5, cy = h * 0.5, r = h * 0.32;
  // 白銀のコロナ光芒
  const cGrad = ctx.createRadialGradient(cx, cy, r, cx, cy, r * 1.8);
  cGrad.addColorStop(0, '#ffffff'); cGrad.addColorStop(0.4, '#38bdf8'); cGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = cGrad;
  ctx.beginPath(); ctx.arc(cx, cy, r * 1.8, 0, Math.PI * 2); ctx.fill();
  // 月の影（漆黒の円）
  ctx.fillStyle = '#000000';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  // ダイヤモンドリング（一粒の輝く光点）
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(cx + r * 0.7, cy - r * 0.7, 12, 0, Math.PI * 2); ctx.fill();
}

// ----------------------------------------------------------------------
// 191: 火山（赤熱したマグマと噴煙）
// ----------------------------------------------------------------------
function renderVolcano(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#18181b', '#09090b');
  const cx = w * 0.5;
  // 黒い火山灰噴煙
  ctx.fillStyle = '#52525b';
  ctx.beginPath();
  ctx.ellipse(cx, h * 0.25, w * 0.35, h * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  // 赤い溶岩の噴出
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 15, h * 0.35, 30, h * 0.2);
  // 火山山体
  ctx.fillStyle = '#27272a';
  ctx.beginPath();
  ctx.moveTo(0, h); ctx.lineTo(cx - 35, h * 0.45); ctx.lineTo(cx + 35, h * 0.45); ctx.lineTo(w, h);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 192: 虹（七色の鮮やかなアーチ）
// ----------------------------------------------------------------------
function renderRainbow(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#60a5fa', '#93c5fd');
  const cx = w * 0.5, cy = h * 0.95;
  // 7色のアーチ
  const rainbowColors = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#4338ca', '#7e22ce'];
  for (let i = 0; i < rainbowColors.length; i++) {
    ctx.strokeStyle = rainbowColors[i];
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, w * 0.42 - i * 10, Math.PI, 0, false);
    ctx.stroke();
  }
}

// ----------------------------------------------------------------------
// 193: 竜巻（黒い渦巻きトルネード）
// ----------------------------------------------------------------------
function renderTornado(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#334155', '#1e293b');
  const cx = w * 0.5;
  // 漏斗雲の渦
  ctx.fillStyle = '#64748b';
  for (let i = 0; i < 9; i++) {
    const y = h * 0.15 + i * 28;
    const tw = w * 0.45 - i * 22;
    const shift = Math.sin(i * 0.8) * 18;
    ctx.beginPath();
    ctx.ellipse(cx + shift, y, tw * 0.5, 14, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ----------------------------------------------------------------------
// 194: 氷山（海面に浮かぶ青白い巨大氷塊）
// ----------------------------------------------------------------------
function renderIceberg(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#bae6fd', '#38bdf8');
  // 海面
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(0, h * 0.48, w, h * 0.52);
  const cx = w * 0.5;
  // 海上の氷山（白）
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(cx - 80, h * 0.48); ctx.lineTo(cx, h * 0.18); ctx.lineTo(cx + 70, h * 0.48);
  ctx.closePath(); ctx.fill();
  // 水面下の巨大な氷塊（ディープシアン）
  ctx.fillStyle = 'rgba(14, 165, 233, 0.75)';
  ctx.beginPath();
  ctx.moveTo(cx - 80, h * 0.48); ctx.lineTo(cx - 140, h * 0.88);
  ctx.lineTo(cx + 140, h * 0.88); ctx.lineTo(cx + 70, h * 0.48);
  ctx.closePath(); ctx.fill();
}

// ----------------------------------------------------------------------
// 195: 恐竜（ティラノサウルス・巨大な頭部と鋭い牙）
// ----------------------------------------------------------------------
function renderTyrannosaurus(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#b45309', '#78350f');
  const cx = w * 0.45, cy = h * 0.5;
  // 恐竜の頭部シルエット
  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.moveTo(cx - 80, cy + 50); ctx.lineTo(cx - 50, cy - 60);
  ctx.lineTo(cx + 80, cy - 40); ctx.lineTo(cx + 100, cy + 10);
  ctx.lineTo(cx + 20, cy + 20); ctx.lineTo(cx + 90, cy + 45);
  ctx.closePath(); ctx.fill();
  // 白い鋭い牙
  ctx.fillStyle = '#f8fafc';
  for (let x = cx + 20; x < cx + 90; x += 14) {
    ctx.beginPath();
    ctx.moveTo(x, cy + 10); ctx.lineTo(x + 6, cy + 26); ctx.lineTo(x + 12, cy + 10);
    ctx.fill();
  }
}

// ----------------------------------------------------------------------
// 196: トリケラトプス（3本の角と大きなフリル襟飾り）
// ----------------------------------------------------------------------
function renderTriceratops(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#14532d', '#15803d');
  const cx = w * 0.52, cy = h * 0.52;
  // フリル襟飾り
  ctx.fillStyle = '#44403c';
  ctx.beginPath(); ctx.arc(cx - 30, cy - 20, 65, 0, Math.PI * 2); ctx.fill();
  // 頭と嘴
  ctx.fillStyle = '#292524';
  ctx.fillRect(cx - 40, cy - 20, 90, 60);
  // 3本の角（白）
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(cx + 20, cy - 40); ctx.lineTo(cx + 95, cy - 90); ctx.lineTo(cx + 35, cy - 35);
  ctx.fill();
}

// ----------------------------------------------------------------------
// 197: アンモナイト（渦巻き状の化石）
// ----------------------------------------------------------------------
function renderAmmonite(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#292524', '#1c1917');
  const cx = w * 0.5, cy = h * 0.5;
  // 黄金・琥珀色の渦巻き化石
  ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 8;
  ctx.beginPath();
  for (let a = 0; a < Math.PI * 8; a += 0.1) {
    const r = 8 + a * 4.5;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 198: マンモス（長い毛と巨大な湾曲した牙）
// ----------------------------------------------------------------------
function renderMammoth(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#0f172a', '#334155');
  const cx = w * 0.45, cy = h * 0.52;
  // 毛深い巨体
  ctx.fillStyle = '#451a03';
  ctx.beginPath(); ctx.ellipse(cx, cy, 75, 60, 0, 0, Math.PI * 2); ctx.fill();
  // 長く湾曲した白い牙
  ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(cx - 50, cy, 65, Math.PI * 0.8, Math.PI * 1.8, false);
  ctx.stroke();
}

// ----------------------------------------------------------------------
// 199: シーラカンス（深海の生きた化石・肉厚のヒレ）
// ----------------------------------------------------------------------
function renderCoelacanth(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#020617', '#0369a1');
  const cx = w * 0.5, cy = h * 0.5;
  // 濃紺の魚体
  ctx.fillStyle = '#1e3a8a';
  ctx.beginPath(); ctx.ellipse(cx, cy, 95, 45, 0, 0, Math.PI * 2); ctx.fill();
  // 尾ビレ（3葉の形状）
  ctx.beginPath();
  ctx.moveTo(cx + 90, cy); ctx.lineTo(cx + 140, cy - 35); ctx.lineTo(cx + 140, cy + 35);
  ctx.closePath(); ctx.fill();
  // 白い斑点
  ctx.fillStyle = '#93c5fd';
  for (let i = 0; i < 15; i++) {
    ctx.fillRect(cx - 60 + (i * 12), cy - 15 + ((i % 3) * 10), 4, 4);
  }
}

// ----------------------------------------------------------------------
// 200: 地球（全200ステージ制覇フィナーレ・青く輝く母なる星）
// ----------------------------------------------------------------------
function renderEarthFinal(ctx: CanvasRenderingContext2D, w: number, h: number) {
  setBg(ctx, w, h, '#020617', '#000000');
  const cx = w * 0.5, cy = h * 0.5, r = h * 0.38;
  // 宇宙の星々
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 50; i++) {
    ctx.fillRect((i * 109) % w, (i * 163) % h, 2, 2);
  }
  // 大気の青い光芒（大気グロー）
  const aGrad = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.25);
  aGrad.addColorStop(0, 'rgba(56, 189, 248, 0.85)');
  aGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = aGrad;
  ctx.beginPath(); ctx.arc(cx, cy, r * 1.25, 0, Math.PI * 2); ctx.fill();
  // 海洋（ディープブルー）
  ctx.fillStyle = '#0284c7';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  // 大陸（エメラルドグリーン）
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = '#16a34a';
  ctx.beginPath(); ctx.ellipse(cx + 25, cy - 20, 50, 40, 0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx - 35, cy + 20, 45, 55, -0.2, 0, Math.PI * 2); ctx.fill();
  // 白い渦巻く雲
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.beginPath(); ctx.ellipse(cx - 20, cy - 40, 70, 20, 0.4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx + 30, cy + 40, 60, 18, -0.3, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
