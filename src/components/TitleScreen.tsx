import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { preloadStagePhotos, renderStageArtworkToCanvas } from '../data/puzzles';
import { soundEngine } from '../utils/sound';

interface TitleScreenProps {
  isPracticeMode: boolean;
  setIsPracticeMode: (practice: boolean) => void;
  onStartGame: () => void;
}

// 10%段階を廃止し、3回ヒット（100% -> 70% -> 40% -> 0%クリア枠）で気持ちよく割れる4ステップ表示
const DEMO_MOSAIC_STEPS = [
  { percent: 100, blockSize: 44, label: '100%（開始）', hitsText: '残り3回' },
  { percent: 70, blockSize: 24, label: '70%（1回ヒット）', hitsText: '残り2回' },
  { percent: 40, blockSize: 12, label: '40%（2回ヒット）', hitsText: 'あと1回で貫通' },
  { percent: 0, blockSize: 1, label: '0%（3回で割れてクリア枠！）', hitsText: '原画露出・ボール貫通' },
];

export const TitleScreen: React.FC<TitleScreenProps> = ({
  isPracticeMode,
  setIsPracticeMode,
  onStartGame,
}) => {
  const [demoStepIndex, setDemoStepIndex] = useState<number>(0);
  const [photoLoadedTick, setPhotoLoadedTick] = useState<number>(0);
  const demoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const srcCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const tmpCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    return preloadStagePhotos(() => {
      setPhotoLoadedTick((prev) => prev + 1);
    });
  }, []);

  useEffect(() => {
    const canvas = demoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    if (!srcCanvasRef.current) {
      srcCanvasRef.current = document.createElement('canvas');
    }
    const srcCanvas = srcCanvasRef.current;
    srcCanvas.width = w;
    srcCanvas.height = h;
    const srcCtx = srcCanvas.getContext('2d');
    if (!srcCtx) return;

    renderStageArtworkToCanvas(srcCtx, 1, w, h);

    ctx.clearRect(0, 0, w, h);

    const step = DEMO_MOSAIC_STEPS[demoStepIndex] || DEMO_MOSAIC_STEPS[0];
    if (step.percent === 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(srcCanvas, 0, 0, w, h);

      // 0%になった時の「クリア済みウィンドウ枠」の視覚表現デモ
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.92)';
      ctx.lineWidth = 3;
      ctx.strokeRect(4, 4, w - 8, h - 8);

      // 四隅のコーナーブラケット
      const cornerLen = 16;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(4, 4 + cornerLen);
      ctx.lineTo(4, 4);
      ctx.lineTo(4 + cornerLen, 4);
      ctx.moveTo(w - 4 - cornerLen, 4);
      ctx.lineTo(w - 4, 4);
      ctx.lineTo(w - 4, 4 + cornerLen);
      ctx.moveTo(4, h - 4 - cornerLen);
      ctx.lineTo(4, h - 4);
      ctx.lineTo(4 + cornerLen, h - 4);
      ctx.moveTo(w - 4 - cornerLen, h - 4);
      ctx.lineTo(w - 4, h - 4);
      ctx.lineTo(w - 4, h - 4 - cornerLen);
      ctx.stroke();
    } else {
      const smallW = Math.max(4, Math.floor(w / step.blockSize));
      const smallH = Math.max(3, Math.floor(h / step.blockSize));
      if (!tmpCanvasRef.current) {
        tmpCanvasRef.current = document.createElement('canvas');
      }
      const tmp = tmpCanvasRef.current;
      tmp.width = smallW;
      tmp.height = smallH;
      const tCtx = tmp.getContext('2d');
      if (tCtx) {
        tCtx.imageSmoothingEnabled = true;
        tCtx.drawImage(srcCanvas, 0, 0, smallW, smallH);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tmp, 0, 0, smallW, smallH, 0, 0, w, h);
      }
    }
  }, [demoStepIndex, photoLoadedTick]);

  const currentDemo = DEMO_MOSAIC_STEPS[demoStepIndex] || DEMO_MOSAIC_STEPS[0];

  const handleAdvanceDemo = () => {
    const nextIdx = (demoStepIndex + 1) % DEMO_MOSAIC_STEPS.length;
    setDemoStepIndex(nextIdx);
    if (DEMO_MOSAIC_STEPS[nextIdx].percent === 0) {
      soundEngine.playTileBreak(15, true);
    } else {
      soundEngine.playTileBreak(6 + nextIdx * 3, false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-slate-900/90 border border-white/10 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* アプリタイトル ＆ 早押し・クリア条件の明確な案内 */}
      <div className="text-center space-y-1">
        <div className="text-[11px] font-semibold tracking-widest uppercase text-sky-400">
          SPEED PHOTO MOSAIC BREAKOUT
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          モザイクブレイク
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          <strong className="text-sky-300 font-semibold">
            何の写真か分かった瞬間に「回答する」からタイピング正解でクリア！
          </strong>
          <span className="block text-[11px] text-slate-400 mt-0.5">
            クリアタイムの早さ＆残モザイク率でスコアが決まります（かな・カナ・漢字・英語すべて対応）
          </span>
        </p>
      </div>

      {/* 実写モザイク 100% → 70% → 40% → 0%（3回で割れる）ライブプレビュー */}
      <div className="my-auto py-1.5 flex flex-col items-center">
        <div
          onClick={handleAdvanceDemo}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleAdvanceDemo();
            }
          }}
          className="relative w-full max-w-sm aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 shadow-2xl cursor-pointer group select-none"
          title="タップして3回で割れるモザイク変化（100%→70%→40%→0%クリア枠）を確認"
        >
          <canvas
            ref={demoCanvasRef}
            width={400}
            height={225}
            className="w-full h-full object-cover block"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent px-3.5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-200">
              <span className="font-mono font-bold text-sky-300 tabular-nums">
                {currentDemo.label}
              </span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-[11px] text-slate-300">{currentDemo.hitsText}</span>
            </div>
            <span className="text-[11px] text-white font-semibold bg-white/15 px-2 py-0.5 rounded-md">
              タップで変化
            </span>
          </div>
        </div>

        {/* 100% -> 70% -> 40% -> 0% セグメントセレクタ */}
        <div className="mt-2.5 flex items-center gap-1 p-1 bg-slate-950/80 border border-white/10 rounded-xl">
          {DEMO_MOSAIC_STEPS.map((step, idx) => (
            <button
              key={step.percent}
              type="button"
              onClick={() => {
                setDemoStepIndex(idx);
                soundEngine.playBounce(true);
              }}
              className={`min-h-8 px-3 py-1 rounded-lg text-xs font-mono font-semibold tabular-nums transition cursor-pointer whitespace-nowrap ${
                demoStepIndex === idx
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {step.percent === 0 ? '0% CLEAR' : `${step.percent}%`}
            </button>
          ))}
        </div>

        {/* クリアまでの3ステップガイド */}
        <div className="mt-2.5 w-full max-w-md grid grid-cols-3 gap-1.5 text-center">
          <div className="bg-slate-950/70 border border-white/10 rounded-xl p-2">
            <div className="text-[11px] font-bold text-sky-400">1. 3回当てて割る</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              100%→70%→40%→0%でクリア枠が出現
            </div>
          </div>
          <div className="bg-slate-950/70 border border-white/10 rounded-xl p-2">
            <div className="text-[11px] font-bold text-amber-400">2. ★枠で連鎖削り</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              ★マーク枠を0%にすると周囲も一気に削れる
            </div>
          </div>
          <div className="bg-slate-950/70 border border-white/10 rounded-xl p-2">
            <div className="text-[11px] font-bold text-emerald-400">3. 早押しタイピング</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              分かった瞬間に回答！早いほどスピード加点
            </div>
          </div>
        </div>
      </div>

      {/* モード切替 ＆ スタートボタン */}
      <div className="space-y-2.5">
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/90 border border-white/10 rounded-xl">
          <button
            type="button"
            onClick={() => setIsPracticeMode(false)}
            className={`min-h-9 py-1.5 px-3 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              !isPracticeMode
                ? 'bg-slate-800 text-white shadow-sm border border-white/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            タイムアタック（全3ステージ）
          </button>
          <button
            type="button"
            onClick={() => setIsPracticeMode(true)}
            className={`min-h-9 py-1.5 px-3 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              isPracticeMode
                ? 'bg-slate-800 text-white shadow-sm border border-white/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            フリープレイ（時間制限なし）
          </button>
        </div>

        <button
          type="button"
          onClick={onStartGame}
          className="w-full min-h-12 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-[0.99] text-slate-950 font-bold text-base shadow-lg shadow-sky-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>プレイ開始</span>
        </button>
      </div>
    </div>
  );
};
