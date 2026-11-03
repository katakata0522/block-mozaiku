export interface PuzzleStage {
  id: number;
  title: string;
  displayAnswer: string;
  readingHint: string;
  categoryLabel: string;
  charCountHint: string;
  initialKanaHint: string;
  kanaPad: string[]; // 1文字ずつ打てる16文字かなパッド（選択肢ギャンブルを防ぎつつスマホでも快適に入力可能）
  coreTileIndices: number[];
  rivalTargetSec: number; // 対戦想定のターゲット早押しタイム（秒）
  acceptedAnswers: string[];
  acceptedKeywords: string[]; // 修飾語つき入力（「赤い傘」「白い自転車」「銀のやかん」等）でも許容するコア語幹
  photoUrl: string;
  remotePhotoUrl: string;
  description: string;
  provenance: {
    source: string;
    author: string;
    license: string;
    verificationDate: string;
  };
}

export const PUZZLE_STAGES: PuzzleStage[] = [
  {
    id: 1,
    title: 'STAGE 1',
    displayAnswer: '傘（かさ）',
    readingHint: '雨の日に広げて使う日用品',
    categoryLabel: '日用品・雨具',
    charCountHint: 'ひらがな2文字 / 漢字1文字 / カタカナ・英語も自動判定',
    initialKanaHint: '頭文字：「か」から始まる2文字（漢字「傘」も可）',
    kanaPad: ['か', 'さ', 'あ', 'ま', 'が', 'ひ', 'ぱ', 'ら', 'そ', 'る', 'い', 'き', 'し', 'ん', 'ぶ', 'れ'],
    coreTileIndices: [8, 15, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      '傘',
      'かさ',
      'カサ',
      '雨傘',
      'あまがさ',
      'アマガサ',
      '洋傘',
      'ようがさ',
      'ヨウガサ',
      '日傘',
      'ひがさ',
      '長傘',
      'なががさ',
      '番傘',
      'ばんがさ',
      '和傘',
      'わがさ',
      'ジャンプ傘',
      'じゃんぷがさ',
      'ビニール傘',
      'びにーるがさ',
      '折りたたみ傘',
      'おりたたみがさ',
      '折り畳み傘',
      'こうもり傘',
      'こうもりがさ',
      '蝙蝠傘',
      'パラソル',
      'ぱらそる',
      'アンブレラ',
      'あんぶれら',
      'umbrella',
      'parasol',
      'kasa',
      'amagasa',
      'yougasa',
      'higasa',
    ],
    acceptedKeywords: ['傘', 'かさ', 'がさ', 'あまがさ', 'あんぶれら', 'ぱらそる', 'umbrella', 'parasol', 'kasa', 'gasa'],
    photoUrl: '/photos/umbrella.jpg',
    remotePhotoUrl:
      'https://images.unsplash.com/photo-1723226705389-f478dcc3d7a4?auto=format&fit=crop&w=900&q=82',
    description: '雨粒を弾く鮮やかな4色キャノピーとJ字ハンドルの傘の実写フォトグラフ。',
    provenance: {
      source: 'Wikimedia / Unsplash 実写フリー素材（/photos/umbrella.jpg ローカル同梱＋Canvasフォールバック）',
      author: 'Wikimedia / Unsplash Photographers',
      license: 'Public Domain / Unsplash License',
      verificationDate: '2026-11-03',
    },
  },
  {
    id: 2,
    title: 'STAGE 2',
    displayAnswer: '自転車（じてんしゃ）',
    readingHint: 'ペダルをこいで走る二輪の乗り物',
    categoryLabel: '乗り物・モビリティ',
    charCountHint: 'ひらがな5文字 / 漢字3文字 / カタカナ・略称・英語も自動判定',
    initialKanaHint: '頭文字：「じ」から始まる5文字（漢字「自転車」・略称「チャリ」も可）',
    kanaPad: ['じ', 'て', 'ん', 'し', 'ゃ', 'ち', 'り', 'こ', 'ば', 'い', 'く', 'ろ', 'ー', 'ど', 'す', 'ま'],
    coreTileIndices: [7, 15, 22],
    rivalTargetSec: 19.0,
    acceptedAnswers: [
      '自転車',
      'じてんしゃ',
      'ジテンシャ',
      'ぢてんしゃ',
      'チャリ',
      'ちゃり',
      'チャリンコ',
      'ちゃりんこ',
      'サイクリング車',
      'さいくりんぐしゃ',
      'ロードバイク',
      'ろーどばいく',
      'クロスバイク',
      'くろすばいく',
      'マウンテンバイク',
      'まうんてんばいく',
      'スポーツバイク',
      'すぽーつばいく',
      'スポーツ自転車',
      '電動自転車',
      'でんどうじてんしゃ',
      'ピストバイク',
      'ぴすとばいく',
      'シティサイクル',
      'してぃさいくる',
      'ママチャリ',
      'ままちゃり',
      'バイシクル',
      'ばいしくる',
      'バイク',
      'ばいく',
      'サイクル',
      'さいくる',
      '軽快車',
      'けいかいしゃ',
      '二輪車',
      'にりんしゃ',
      'bicycle',
      'bike',
      'roadbike',
      'crossbike',
      'cycle',
      'jitensha',
      'jitensya',
      'zitensha',
      'zitensya',
      'chari',
      'tyari',
      'charinko',
    ],
    acceptedKeywords: [
      '自転車',
      'じてんしゃ',
      'ちゃり',
      'ちゃりんこ',
      'ばいく',
      'さいくる',
      'ばいしくる',
      'bicycle',
      'bike',
      'jitensha',
      'jitensya',
    ],
    photoUrl: '/photos/bicycle.jpg',
    remotePhotoUrl:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=82',
    description: 'ダークな壁面を背景に佇む、白いフレームと革サドルのスポーツ自転車の実写フォトグラフ。',
    provenance: {
      source: 'Unsplash 実写フリー素材（/photos/bicycle.jpg ローカル同梱＋Canvasフォールバック）',
      author: 'Unsplash Photographers / Mosaic Break App',
      license: 'Unsplash License (Free to use)',
      verificationDate: '2026-11-03',
    },
  },
  {
    id: 3,
    title: 'STAGE 3',
    displayAnswer: 'やかん（薬缶・ケトル）',
    readingHint: 'お湯を沸かすための注ぎ口つきの道具',
    categoryLabel: 'キッチン・調理器具',
    charCountHint: 'ひらがな3文字 / カタカナ「ケトル」 / 漢字「薬缶」・英語も自動判定',
    initialKanaHint: '頭文字：「や」から始まる3文字（または「ケトル」「薬缶」）',
    kanaPad: ['や', 'か', 'ん', 'け', 'と', 'る', 'ゆ', 'わ', 'し', 'き', 'ぽ', 'っ', 'ちゃ', 'が', 'ま', 'ー'],
    coreTileIndices: [8, 14, 21],
    rivalTargetSec: 17.5,
    acceptedAnswers: [
      'やかん',
      'ヤカン',
      '薬缶',
      '薬鑵',
      'ケトル',
      'けとる',
      '電気ケトル',
      'でんきけとる',
      '湯沸かし',
      'ゆわかし',
      'お湯沸かし',
      'おゆわかし',
      'ユワカシ',
      '湯沸かし器',
      'ゆわかしき',
      '湯沸器',
      '湯沸かしケトル',
      'ゆわかしけとる',
      '湯沸かしポット',
      'ゆわかしぽっと',
      'ポット',
      'ぽっと',
      '茶釜',
      'ちゃがま',
      '鉄瓶',
      'てつびん',
      '急須',
      'きゅうす',
      'ティーケトル',
      'てぃーけとる',
      'ティーポット',
      'てぃーぽっと',
      'kettle',
      'teakettle',
      'teapot',
      'yakan',
      'yakann',
      'ketoru',
      'yuwakashi',
    ],
    acceptedKeywords: [
      'やかん',
      '薬缶',
      '薬鑵',
      'けとる',
      'ゆわかし',
      'ゆわかしき',
      'ぽっと',
      'てつびん',
      'きゅうす',
      'ちゃがま',
      'kettle',
      'yakan',
      'ketoru',
    ],
    photoUrl: '/photos/kettle.jpg',
    remotePhotoUrl:
      'https://images.unsplash.com/photo-1594213114663-d94db9b17125?auto=format&fit=crop&w=900&q=82',
    description: 'クラシックな金属の質感と黒いアーチ型ハンドルが特徴的なやかんの実写フォトグラフ。',
    provenance: {
      source: 'Unsplash 実写フリー素材（/photos/kettle.jpg ローカル同梱＋Canvasフォールバック）',
      author: 'Unsplash Photographers / Mosaic Break App',
      license: 'Unsplash License (Free to use)',
      verificationDate: '2026-11-03',
    },
  },
];

// 実写写真のプリロードキャッシュ
const LOADED_STAGE_IMAGES = new Map<number, HTMLImageElement>();
const PHOTO_LISTENERS = new Set<(stageId: number) => void>();
let preloadInitiated = false;

export function preloadStagePhotos(onLoaded?: (stageId: number) => void): () => void {
  if (onLoaded) {
    PHOTO_LISTENERS.add(onLoaded);
  }

  if (!preloadInitiated && typeof window !== 'undefined') {
    preloadInitiated = true;
    for (const stage of PUZZLE_STAGES) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          LOADED_STAGE_IMAGES.set(stage.id, img);
          PHOTO_LISTENERS.forEach((cb) => cb(stage.id));
        }
      };
      img.onerror = () => {
        if (img.src !== stage.remotePhotoUrl) {
          img.src = stage.remotePhotoUrl;
        }
      };
      img.src = stage.photoUrl;
    }
  } else if (onLoaded) {
    LOADED_STAGE_IMAGES.forEach((_, stageId) => onLoaded(stageId));
  }

  return () => {
    if (onLoaded) {
      PHOTO_LISTENERS.delete(onLoaded);
    }
  };
}

/**
 * 入力文字列を正規化する（ひらがな・カタカナ・漢字・ローマ字・句読点・前置き/語尾の揺れを吸収）:
 * 1. 40文字上限に切り詰め & 制御文字・句読点・記号（！、？、。、「」等）の除去
 * 2. Unicode NFKC 正規化（全角英数・半角カナ等を統一）
 * 3. 前後および内部の空白除去
 * 4. カタカナ（ァ〜ヶ）をひらがなへ変換
 * 5. 英字を小文字へ統一
 * 6. 「答えは〜」「〜です」「〜だ」「〜かな」等の前置き・語尾を除去
 */
export function normalizeAnswerText(raw: string): string {
  const truncated = raw.slice(0, 40).replace(/[\u0000-\u001F\u007F]/g, '');
  const nfkc = truncated
    .normalize('NFKC')
    .trim()
    .replace(/[\s!！?？。、.,・:：;；/／「」『』()（）【】[\]〜~-]+/g, '');

  let result = '';
  for (let i = 0; i < nfkc.length; i++) {
    const code = nfkc.charCodeAt(i);
    if (code >= 0x30a1 && code <= 0x30f6) {
      result += String.fromCharCode(code - 0x60);
    } else {
      result += nfkc[i];
    }
  }

  let lowered = result.toLowerCase();
  // 前置き表現（「こたえは」「正解は」「これは」等）を吸収
  lowered = lowered.replace(/^(こたえは|答えは|せいかいは|正解は|これは|しゃしんは|写真は|たぶん|きっと)/, '');
  // 語尾の丁寧語・助詞（「かさです」「自転車だ」等）を自然に吸収
  lowered = lowered.replace(/(です|ます|だよ|だな|かな|かも|だとおもう|とおもう|のしゃしん|の写真|のえ|のがぞう|の画像|だ)$/, '');
  return lowered;
}

const NORMALIZED_ANSWERS_BY_STAGE: Map<number, Set<string>> = new Map(
  PUZZLE_STAGES.map((stage) => [
    stage.id,
    new Set(stage.acceptedAnswers.map((ans) => normalizeAnswerText(ans))),
  ])
);

export function judgeStageAnswer(
  stage: PuzzleStage,
  rawInput: string
): { isEmpty: boolean; isCorrect: boolean; normalizedInput: string } {
  const normalizedInput = normalizeAnswerText(rawInput);
  if (!normalizedInput) {
    return { isEmpty: true, isCorrect: false, normalizedInput: '' };
  }
  const normalizedSet = NORMALIZED_ANSWERS_BY_STAGE.get(stage.id);
  let isCorrect = normalizedSet
    ? normalizedSet.has(normalizedInput)
    : stage.acceptedAnswers.some((ans) => normalizeAnswerText(ans) === normalizedInput);

  // 「赤い傘」「カラフルなかさ」「白い自転車」「銀色のやかん」等の修飾語付き回答も許容（14文字以内の妥当な入力に限る）
  if (!isCorrect && normalizedInput.length <= 14) {
    for (const kw of stage.acceptedKeywords) {
      const normKw = normalizeAnswerText(kw);
      if (normKw && normalizedInput.endsWith(normKw)) {
        isCorrect = true;
        break;
      }
    }
  }

  return {
    isEmpty: false,
    isCorrect,
    normalizedInput,
  };
}

// Stage 1 の白背景実写傘写真を透過キャッシュするためのオフスクリーンCanvas
let cachedCutoutUmbrellaCanvas: HTMLCanvasElement | null = null;

function getCutoutUmbrellaCanvas(img: HTMLImageElement): HTMLCanvasElement {
  if (cachedCutoutUmbrellaCanvas) return cachedCutoutUmbrellaCanvas;
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const cCtx = c.getContext('2d');
  if (cCtx) {
    cCtx.drawImage(img, 0, 0);
    try {
      const imgData = cCtx.getImageData(0, 0, c.width, c.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // スタジオ白背景（#fafafa〜#ffffff）を滑らかに透過
        if (r > 240 && g > 240 && b > 240) {
          const whiteness = Math.min(r, g, b);
          const alpha = Math.max(0, Math.min(255, (252 - whiteness) * 20));
          data[i + 3] = alpha;
        }
      }
      cCtx.putImageData(imgData, 0, 0);
    } catch {
      // 万一getImageDataが制限された場合はそのまま使用
    }
  }
  cachedCutoutUmbrellaCanvas = c;
  return c;
}

/**
 * 指定された (0, 0, width, height) 領域に「1枚の実写写真」を、
 * どのゾーンのモザイクを削っても被写体が明確に判別できる最適フレーミングで描画する。
 */
export function renderStageArtworkToCanvas(
  ctx: CanvasRenderingContext2D,
  stageId: number,
  width: number,
  height: number
): void {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  const loadedImg = LOADED_STAGE_IMAGES.get(stageId);
  if (loadedImg && loadedImg.complete && loadedImg.naturalWidth > 0) {
    if (stageId === 1) {
      // STAGE 1（傘）：雨空と雨粒の背景の上に、実写の4色傘（ドーム＋中棒＋J字ハンドル）を大きく配置
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.55, '#1e293b');
      bgGrad.addColorStop(1, '#334155');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 雨粒のストリーク（外周ゾーンを削ったときの手掛かり）
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.35)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      for (let i = 0; i < 42; i++) {
        const rx = ((i * 97 + 23) % 100) * 0.01 * width;
        const ry = ((i * 61 + 11) % 100) * 0.01 * height;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - width * 0.018, ry + height * 0.085);
        ctx.stroke();
      }

      const umbrellaCanvas = getCutoutUmbrellaCanvas(loadedImg);
      const scale = Math.min((width * 0.56) / umbrellaCanvas.width, (height * 0.92) / umbrellaCanvas.height);
      const drawW = umbrellaCanvas.width * scale;
      const drawH = umbrellaCanvas.height * scale;
      const drawX = width * 0.46 - drawW * 0.5;
      const drawY = height * 0.5 - drawH * 0.5;

      // 実写の傘の中棒の先に木製J字ハンドルを描画して「傘」のシルエットを100%明確化
      const tipX = drawX + drawW * 0.945;
      const tipY = drawY + drawH * 0.945;
      ctx.save();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = Math.max(8, width * 0.022);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tipX - drawW * 0.06, tipY - drawH * 0.06);
      ctx.lineTo(tipX + drawW * 0.04, tipY + drawH * 0.03);
      ctx.arc(
        tipX + drawW * 0.01,
        tipY + drawH * 0.06,
        Math.max(12, width * 0.032),
        -Math.PI * 0.2,
        Math.PI * 0.85,
        false
      );
      ctx.stroke();
      ctx.restore();

      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(umbrellaCanvas, drawX, drawY, drawW, drawH);
      ctx.restore();
      return;
    }

    const imgW = loadedImg.naturalWidth;
    const imgH = loadedImg.naturalHeight;
    const targetRatio = width / height;
    const imgRatio = imgW / imgH;

    let sx = 0;
    let sy = 0;
    let sw = imgW;
    let sh = imgH;

    // STAGE 2（自転車）は写真の下寄りに自転車全体があるため focusY = 0.78 でフレームいっぱいに収める
    const focusY = stageId === 2 ? 0.78 : 0.54;

    if (imgRatio > targetRatio) {
      sw = imgH * targetRatio;
      sx = (imgW - sw) * 0.5;
    } else {
      sh = imgW / targetRatio;
      sy = (imgH - sh) * focusY;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(loadedImg, sx, sy, sw, sh, 0, 0, width, height);
    ctx.restore();
    return;
  }

  if (stageId === 1) {
    renderUmbrellaScene(ctx, width, height);
  } else if (stageId === 2) {
    renderBicycleScene(ctx, width, height);
  } else {
    renderKettleScene(ctx, width, height);
  }

  ctx.restore();
}

/**
 * 第1問: 傘（画面いっぱいに広がる雨傘・雨筋・街灯ボケ・水たまりの波紋）
 */
function renderUmbrellaScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#1e293b');
  bgGrad.addColorStop(0.6, '#334155');
  bgGrad.addColorStop(0.76, '#475569');
  bgGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 街灯の玉ボケ
  const bokehList = [
    { x: w * 0.13, y: h * 0.14, r: w * 0.075, color: 'rgba(251, 191, 36, 0.30)' },
    { x: w * 0.86, y: h * 0.16, r: w * 0.085, color: 'rgba(56, 189, 248, 0.28)' },
    { x: w * 0.16, y: h * 0.54, r: w * 0.065, color: 'rgba(244, 114, 182, 0.24)' },
    { x: w * 0.85, y: h * 0.52, r: w * 0.07, color: 'rgba(250, 204, 21, 0.26)' },
  ];
  for (const b of bokehList) {
    const rad = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, b.r);
    rad.addColorStop(0, b.color);
    rad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 濡れた石畳の路面と水たまりの波紋（y: 300..480）
  const floorY = h * 0.64;
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, '#334155');
  floorGrad.addColorStop(0.45, '#1e293b');
  floorGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  const ripples = [
    { x: w * 0.18, y: h * 0.70, rx: w * 0.10, ry: h * 0.025 },
    { x: w * 0.80, y: h * 0.68, rx: w * 0.11, ry: h * 0.026 },
    { x: w * 0.50, y: h * 0.75, rx: w * 0.26, ry: h * 0.042 },
  ];
  ctx.strokeStyle = 'rgba(186, 230, 253, 0.45)';
  ctx.lineWidth = 2;
  for (const rp of ripples) {
    ctx.beginPath();
    ctx.ellipse(rp.x, rp.y, rp.rx, rp.ry, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(rp.x, rp.y, rp.rx * 0.55, rp.ry * 0.55, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 斜めに降り注ぐ雨筋
  ctx.save();
  ctx.strokeStyle = 'rgba(224, 242, 254, 0.48)';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  const rainSeeds = [
    [0.08, 0.06], [0.16, 0.18], [0.24, 0.08], [0.76, 0.07], [0.88, 0.15],
    [0.92, 0.28], [0.10, 0.40], [0.86, 0.42], [0.14, 0.60], [0.90, 0.58],
    [0.35, 0.05], [0.64, 0.06],
  ];
  for (const [rx, ry] of rainSeeds) {
    const sx = w * rx;
    const sy = h * ry;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - w * 0.026, sy + h * 0.08);
    ctx.stroke();
  }
  ctx.restore();

  // 傘本体（y: 35..370 に石突からJ字ハンドルまで大きく配置）
  const cx = w * 0.5;
  const topY = h * 0.09;
  const canopyBottomY = h * 0.48;
  const canopyRadiusX = w * 0.44;

  // 石突（先端）
  const ferruleGrad = ctx.createLinearGradient(cx - 10, topY - 28, cx + 10, topY);
  ferruleGrad.addColorStop(0, '#fef08a');
  ferruleGrad.addColorStop(0.5, '#eab308');
  ferruleGrad.addColorStop(1, '#713f12');
  ctx.fillStyle = ferruleGrad;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.016, topY + 4);
  ctx.lineTo(cx - w * 0.005, topY - h * 0.055);
  ctx.arc(cx, topY - h * 0.055, w * 0.005, Math.PI, 0);
  ctx.lineTo(cx + w * 0.016, topY + 4);
  ctx.closePath();
  ctx.fill();

  // 中棒（クロームシャフト）
  const shaftGrad = ctx.createLinearGradient(cx - 7, 0, cx + 7, 0);
  shaftGrad.addColorStop(0, '#475569');
  shaftGrad.addColorStop(0.4, '#f8fafc');
  shaftGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = shaftGrad;
  ctx.fillRect(cx - w * 0.01, canopyBottomY - h * 0.05, w * 0.02, h * 0.25);

  // 内側の暗い裏地と骨組み
  ctx.fillStyle = '#31102f';
  ctx.beginPath();
  ctx.ellipse(cx, canopyBottomY - h * 0.01, canopyRadiusX * 0.94, h * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(226, 232, 240, 0.48)';
  ctx.lineWidth = 1.8;
  for (const dir of [-0.65, -0.3, 0.3, 0.65]) {
    ctx.beginPath();
    ctx.moveTo(cx, canopyBottomY + h * 0.045);
    ctx.lineTo(cx + canopyRadiusX * dir, canopyBottomY - h * 0.01);
    ctx.stroke();
  }

  // 木製J字ハンドル（y: 300..375 にしっかり収まる）
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineWidth = w * 0.042;
  const woodGrad = ctx.createLinearGradient(cx - 25, h * 0.62, cx + 85, h * 0.76);
  woodGrad.addColorStop(0, '#92400e');
  woodGrad.addColorStop(0.45, '#d97706');
  woodGrad.addColorStop(0.8, '#78350f');
  woodGrad.addColorStop(1, '#451a03');
  ctx.strokeStyle = woodGrad;
  ctx.beginPath();
  ctx.moveTo(cx, h * 0.63);
  ctx.lineTo(cx, h * 0.70);
  ctx.arc(cx + w * 0.06, h * 0.70, w * 0.06, Math.PI, 0, true);
  ctx.stroke();

  ctx.lineWidth = w * 0.01;
  ctx.strokeStyle = 'rgba(254, 243, 199, 0.55)';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.008, h * 0.635);
  ctx.lineTo(cx - w * 0.008, h * 0.70);
  ctx.arc(cx + w * 0.06, h * 0.70, w * 0.068, Math.PI, Math.PI * 0.15, true);
  ctx.stroke();
  ctx.restore();

  // キャノピー（ワインレッド×ネイビー×ゴールド縁の6パネル）
  const panelStops = [-1, -0.66, -0.22, 0.22, 0.66, 1];
  const panelColors = [
    ['#991b1b', '#dc2626', '#7f1d1d'],
    ['#1e3a8a', '#2563eb', '#172554'],
    ['#dc2626', '#f87171', '#991b1b'],
    ['#1e3a8a', '#3b82f6', '#172554'],
    ['#7f1d1d', '#b91c1c', '#450a0a'],
  ];

  for (let i = 0; i < panelStops.length - 1; i++) {
    const xStart = cx + panelStops[i] * canopyRadiusX;
    const xEnd = cx + panelStops[i + 1] * canopyRadiusX;
    const xMid = (xStart + xEnd) / 2;

    const pGrad = ctx.createLinearGradient(xStart, topY, xEnd, canopyBottomY);
    pGrad.addColorStop(0, panelColors[i][0]);
    pGrad.addColorStop(0.48, panelColors[i][1]);
    pGrad.addColorStop(1, panelColors[i][2]);
    ctx.fillStyle = pGrad;

    ctx.beginPath();
    ctx.moveTo(cx, topY);
    ctx.quadraticCurveTo(
      cx + (xStart - cx) * 0.88,
      topY + (canopyBottomY - topY) * 0.34,
      xStart,
      canopyBottomY
    );
    ctx.quadraticCurveTo(xMid, canopyBottomY - h * 0.052, xEnd, canopyBottomY);
    ctx.quadraticCurveTo(
      cx + (xEnd - cx) * 0.88,
      topY + (canopyBottomY - topY) * 0.34,
      cx,
      topY
    );
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(253, 224, 71, 0.78)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(xStart, canopyBottomY - h * 0.008);
    ctx.quadraticCurveTo(xMid, canopyBottomY - h * 0.058, xEnd, canopyBottomY - h * 0.008);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, topY);
    ctx.quadraticCurveTo(
      cx + (xStart - cx) * 0.88,
      topY + (canopyBottomY - topY) * 0.34,
      xStart,
      canopyBottomY
    );
    ctx.stroke();

    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(xStart, canopyBottomY + h * 0.005, w * 0.008, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(cx + canopyRadiusX, canopyBottomY + h * 0.005, w * 0.008, 0, Math.PI * 2);
  ctx.fill();

  const drops = [
    { x: cx - w * 0.22, y: topY + h * 0.16, r: 5 },
    { x: cx - w * 0.08, y: topY + h * 0.22, r: 6 },
    { x: cx + w * 0.1, y: topY + h * 0.17, r: 5 },
    { x: cx + w * 0.25, y: topY + h * 0.24, r: 5.5 },
  ];
  for (const d of drops) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * 第2問: 自転車（並木道・白線サイクリングレーン・スポーク反射板付きのスポーツ自転車）
 */
function renderBicycleScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.58);
  skyGrad.addColorStop(0, '#bae6fd');
  skyGrad.addColorStop(0.65, '#e0f2fe');
  skyGrad.addColorStop(1, '#fef9c3');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h * 0.58);

  // 上部コーナーの並木シルエット
  const trees = [
    { x: w * 0.1, y: h * 0.14, r: w * 0.12, color: 'rgba(34, 197, 94, 0.30)' },
    { x: w * 0.23, y: h * 0.09, r: w * 0.095, color: 'rgba(16, 185, 129, 0.25)' },
    { x: w * 0.88, y: h * 0.12, r: w * 0.125, color: 'rgba(34, 197, 94, 0.30)' },
    { x: w * 0.75, y: h * 0.08, r: w * 0.085, color: 'rgba(5, 150, 105, 0.24)' },
  ];
  for (const tr of trees) {
    ctx.fillStyle = tr.color;
    ctx.beginPath();
    ctx.arc(tr.x, tr.y, tr.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // アスファルト路面（y: 270..480）
  const roadTopY = h * 0.56;
  const roadGrad = ctx.createLinearGradient(0, roadTopY, 0, h);
  roadGrad.addColorStop(0, '#475569');
  roadGrad.addColorStop(0.4, '#334155');
  roadGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = roadGrad;
  ctx.fillRect(0, roadTopY, w, h - roadTopY);

  // 白い破線レーン（y: 340付近＝モザイク最下段にもしっかり映る）
  ctx.fillStyle = 'rgba(248, 250, 252, 0.78)';
  for (let lx = w * 0.05; lx < w * 0.95; lx += w * 0.18) {
    ctx.fillRect(lx, h * 0.70, w * 0.1, h * 0.02);
  }

  const rearX = w * 0.24;
  const frontX = w * 0.76;
  const wheelY = h * 0.54; // 259px
  const wheelR = w * 0.185; // 111px -> タイヤ下端 370px（モザイク下端385pxの内側に完璧収まる）

  ctx.fillStyle = 'rgba(15, 23, 42, 0.38)';
  ctx.beginPath();
  ctx.ellipse(w * 0.5, wheelY + wheelR + 4, w * 0.43, h * 0.035, 0, 0, Math.PI * 2);
  ctx.fill();

  const drawWheel = (cx: number, cy: number, r: number) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.85)';
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * (r * 0.88), cy + Math.sin(angle) * (r * 0.88));
      ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(cx + r * 0.52, cy - r * 0.22, w * 0.017, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = w * 0.016;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.88, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = w * 0.035;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = w * 0.008;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.93, 0, Math.PI * 2);
    ctx.stroke();
  };

  drawWheel(rearX, wheelY, wheelR);
  drawWheel(frontX, wheelY, wheelR);

  const bbX = w * 0.46;
  const bbY = wheelY + h * 0.015;
  const seatClusterX = w * 0.36;
  const seatClusterY = h * 0.27;
  const headTopX = w * 0.66;
  const headTopY = h * 0.25;
  const headBotX = w * 0.68;
  const headBotY = h * 0.34;

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(rearX, wheelY - 10);
  ctx.lineTo(bbX, bbY - 24);
  ctx.moveTo(rearX, wheelY + 10);
  ctx.lineTo(bbX, bbY + 24);
  ctx.stroke();

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = w * 0.018;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(seatClusterX, seatClusterY);
  ctx.lineTo(seatClusterX - w * 0.025, h * 0.16);
  ctx.moveTo(headTopX, headTopY);
  ctx.lineTo(headTopX - w * 0.015, h * 0.14);
  ctx.lineTo(headTopX + w * 0.04, h * 0.14);
  ctx.stroke();

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const frameGrad = ctx.createLinearGradient(rearX, h * 0.2, frontX, wheelY);
  frameGrad.addColorStop(0, '#059669');
  frameGrad.addColorStop(0.5, '#34d399');
  frameGrad.addColorStop(1, '#047857');
  ctx.strokeStyle = frameGrad;
  ctx.lineWidth = w * 0.028;

  ctx.beginPath();
  ctx.moveTo(rearX, wheelY);
  ctx.lineTo(bbX, bbY);
  ctx.lineTo(seatClusterX, seatClusterY);
  ctx.lineTo(rearX, wheelY);
  ctx.moveTo(seatClusterX, seatClusterY);
  ctx.lineTo(headTopX, headTopY);
  ctx.lineTo(headBotX, headBotY);
  ctx.lineTo(bbX, bbY);
  ctx.moveTo(headBotX, headBotY);
  ctx.lineTo(frontX, wheelY);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(209, 250, 229, 0.75)';
  ctx.lineWidth = w * 0.007;
  ctx.beginPath();
  ctx.moveTo(seatClusterX + 6, seatClusterY - 2);
  ctx.lineTo(headTopX - 6, headTopY - 2);
  ctx.moveTo(headBotX - 6, headBotY);
  ctx.lineTo(bbX + 6, bbY - 5);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(bbX, bbY, w * 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = w * 0.014;
  ctx.beginPath();
  ctx.moveTo(bbX, bbY);
  ctx.lineTo(bbX + w * 0.035, bbY + h * 0.08);
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(bbX + w * 0.012, bbY + h * 0.075, w * 0.05, h * 0.022);

  // 革サドル
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.moveTo(seatClusterX - w * 0.09, h * 0.155);
  ctx.quadraticCurveTo(seatClusterX - w * 0.02, h * 0.125, seatClusterX + w * 0.06, h * 0.165);
  ctx.quadraticCurveTo(seatClusterX - w * 0.02, h * 0.195, seatClusterX - w * 0.09, h * 0.155);
  ctx.closePath();
  ctx.fill();

  // ハンドル
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = w * 0.024;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(headTopX + w * 0.01, h * 0.14);
  ctx.quadraticCurveTo(headTopX + w * 0.095, h * 0.13, headTopX + w * 0.09, h * 0.215);
  ctx.quadraticCurveTo(headTopX + w * 0.085, h * 0.265, headTopX + w * 0.035, h * 0.255);
  ctx.stroke();

  for (const hx of [rearX, frontX]) {
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(hx, wheelY, w * 0.019, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * 第3問: やかん（キッチンタイル・五徳と青いガス炎・白い湯気・銅真鍮ケトル）
 */
function renderKettleScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const wallGrad = ctx.createLinearGradient(0, 0, 0, h * 0.66);
  wallGrad.addColorStop(0, '#1e293b');
  wallGrad.addColorStop(1, '#334155');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, w, h);

  // キッチン壁のサブウェイタイル目地
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.24)';
  ctx.lineWidth = 1.5;
  const tileRowH = 44;
  const tileColW = 86;
  for (let row = 0; row < 8; row++) {
    const y = row * tileRowH;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
    const offset = (row % 2) * (tileColW / 2);
    for (let x = offset; x < w; x += tileColW) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + tileRowH);
      ctx.stroke();
    }
  }

  // コンロ天板（y: 315..480）
  const counterY = h * 0.66;
  const counterGrad = ctx.createLinearGradient(0, counterY, 0, h);
  counterGrad.addColorStop(0, '#475569');
  counterGrad.addColorStop(0.28, '#1e293b');
  counterGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = counterGrad;
  ctx.fillRect(0, counterY, w, h - counterY);

  const cx = w * 0.46;
  const bodyCy = h * 0.50; // 240px
  const bodyRx = w * 0.30; // 180px
  const bodyRy = h * 0.22; // 105px

  // コンロの青いガス炎（y: 335..365 付近＝モザイク最下段で鮮やかに見える）
  const flameY = bodyCy + bodyRy * 0.92;
  for (let i = -4; i <= 4; i++) {
    const fx = cx + i * (w * 0.044);
    const fGrad = ctx.createRadialGradient(fx, flameY, 2, fx, flameY, 24);
    fGrad.addColorStop(0, '#ffffff');
    fGrad.addColorStop(0.4, '#38bdf8');
    fGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = fGrad;
    ctx.beginPath();
    ctx.arc(fx, flameY, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  // 五徳
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - bodyRx * 0.95, flameY + 8);
  ctx.lineTo(cx + bodyRx * 0.95, flameY + 8);
  ctx.stroke();

  // 立ち上る白い湯気
  ctx.save();
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.80)';
  ctx.lineWidth = w * 0.034;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.35, h * 0.29);
  ctx.bezierCurveTo(cx + w * 0.43, h * 0.20, cx + w * 0.31, h * 0.12, cx + w * 0.41, h * 0.05);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(224, 242, 254, 0.55)';
  ctx.lineWidth = w * 0.024;
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.40, h * 0.32);
  ctx.bezierCurveTo(cx + w * 0.48, h * 0.24, cx + w * 0.39, h * 0.15, cx + w * 0.47, h * 0.07);
  ctx.stroke();
  ctx.restore();

  // アーチ型の持ち手
  ctx.save();
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = w * 0.026;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cx, bodyCy - h * 0.15, w * 0.22, Math.PI * 0.92, Math.PI * 0.08, false);
  ctx.stroke();

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = w * 0.048;
  ctx.beginPath();
  ctx.arc(cx, bodyCy - h * 0.15, w * 0.22, Math.PI * 1.2, Math.PI * 1.8, false);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(226, 232, 240, 0.52)';
  ctx.lineWidth = w * 0.01;
  ctx.beginPath();
  ctx.arc(cx, bodyCy - h * 0.15, w * 0.232, Math.PI * 1.24, Math.PI * 1.76, false);
  ctx.stroke();
  ctx.restore();

  // 注ぎ口
  const spoutGrad = ctx.createLinearGradient(cx + w * 0.16, h * 0.27, cx + w * 0.39, h * 0.48);
  spoutGrad.addColorStop(0, '#f59e0b');
  spoutGrad.addColorStop(0.45, '#fef3c7');
  spoutGrad.addColorStop(0.8, '#b45309');
  spoutGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = spoutGrad;
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.2, bodyCy - h * 0.04);
  ctx.quadraticCurveTo(cx + w * 0.32, bodyCy - h * 0.06, cx + w * 0.35, h * 0.30);
  ctx.lineTo(cx + w * 0.40, h * 0.33);
  ctx.quadraticCurveTo(cx + w * 0.35, bodyCy + h * 0.06, cx + w * 0.21, bodyCy + h * 0.09);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.ellipse(cx + w * 0.375, h * 0.315, w * 0.026, h * 0.015, Math.PI * 0.2, 0, Math.PI * 2);
  ctx.fill();

  // やかん本体
  const bodyGrad = ctx.createRadialGradient(
    cx - w * 0.1,
    bodyCy - h * 0.06,
    w * 0.03,
    cx,
    bodyCy,
    bodyRx * 1.15
  );
  bodyGrad.addColorStop(0, '#fef3c7');
  bodyGrad.addColorStop(0.28, '#f59e0b');
  bodyGrad.addColorStop(0.68, '#b45309');
  bodyGrad.addColorStop(1, '#451a03');

  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(cx, bodyCy, bodyRx, bodyRy, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(cx - bodyRx * 0.78, bodyCy + bodyRy * 0.72, bodyRx * 1.56, h * 0.038, 8);
  } else {
    ctx.rect(cx - bodyRx * 0.78, bodyCy + bodyRy * 0.72, bodyRx * 1.56, h * 0.038);
  }
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.58)';
  ctx.beginPath();
  ctx.ellipse(cx - w * 0.12, bodyCy - h * 0.04, w * 0.065, h * 0.08, -0.35, 0, Math.PI * 2);
  ctx.fill();

  // フタ
  const lidGrad = ctx.createLinearGradient(cx - w * 0.14, 0, cx + w * 0.14, 0);
  lidGrad.addColorStop(0, '#92400e');
  lidGrad.addColorStop(0.4, '#fde68a');
  lidGrad.addColorStop(0.8, '#b45309');
  lidGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = lidGrad;
  ctx.beginPath();
  ctx.ellipse(cx, bodyCy - bodyRy * 0.88, w * 0.14, h * 0.04, 0, 0, Math.PI * 2);
  ctx.fill();

  // つまみ
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx, bodyCy - bodyRy * 1.08, w * 0.042, h * 0.028, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.arc(cx - w * 0.012, bodyCy - bodyRy * 1.1, w * 0.009, 0, Math.PI * 2);
  ctx.fill();
}
