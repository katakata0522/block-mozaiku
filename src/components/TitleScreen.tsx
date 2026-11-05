import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { preloadStagePhotos, renderStageArtworkToCanvas } from '../data/puzzles';
import { CourseMode, COURSE_OPTIONS } from '../types/game';
import { soundEngine } from '../utils/sound';

interface TitleScreenProps {
  isPracticeMode: boolean;
  setIsPracticeMode: (practice: boolean) => void;
  selectedCourse: CourseMode;
  setSelectedCourse: (course: CourseMode) => void;
  onStartGame: () => void;
}

// スマート露出（100% -> 70%輪郭先行浮上 -> 40%ディテール浮上 -> 0%クリア枠）の4ステップ表示
const DEMO_MOSAIC_STEPS = [
  { percent: 100, blockSize: 44, label: '100%（開始）', hitsText: '純粋モザイク（残り3回）' },
  { percent: 70, blockSize: 22, label: '70%（1回ヒット）', hitsText: '輪郭が先行浮上（残り2回）' },
  { percent: 40, blockSize: 11, label: '40%（2回ヒット）', hitsText: 'パーツ鮮明化（あと1回で貫通！）' },
  { percent: 0, blockSize: 1, label: '0%（3回で割れてクリア枠！）', hitsText: '原画100%露出・ボール貫通' },
];

export const TitleScreen: React.FC<TitleScreenProps> = ({
  isPracticeMode,
  setIsPracticeMode,
  selectedCourse,
  setSelectedCourse,
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

        // スマート露出：70%で原画の輪郭を28%ブレンド、40%でディテールを62%ブレンド先行露出！
        const blendAlpha = step.percent === 70 ? 0.28 : step.percent === 40 ? 0.62 : 0;
        if (blendAlpha > 0) {
          ctx.save();
          ctx.globalAlpha = blendAlpha;
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(srcCanvas, 0, 0, w, h);
          ctx.restore();
        }
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

  const selectedCourseObj = COURSE_OPTIONS.find((c) => c.id === selectedCourse);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white/95 border border-zinc-200 rounded-3xl p-3 sm:p-5 shadow-2xl backdrop-blur-md overflow-y-auto text-zinc-900">
      {/* アプリタイトル ＆ 早押し・クリア条件の明確な案内 */}
      <div className="text-center space-y-0.5 shrink-0">
        <div className="text-[10px] font-bold tracking-widest uppercase text-blue-600">
          SPEED PHOTO MOSAIC BREAKOUT
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
          モザイクブレイク
        </h2>
        <p className="text-xs text-zinc-600 max-w-md mx-auto">
          <strong className="text-blue-600 font-semibold">
            何の写真か分かった瞬間に「回答する」からタイピング正解でクリア！
          </strong>
          <span className="block text-[10px] text-zinc-500">
            クリアタイムの早さ＆残モザイク率でスコアが決まります（かな・カナ・漢字・英語すべて対応）
          </span>
        </p>
      </div>

      {/* 実写モザイク 100% → 70% → 40% → 0%（3回で割れる）ライブプレビュー */}
      <div className="py-1 flex flex-col items-center shrink-0">
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
          className="relative w-full max-w-[280px] sm:max-w-xs aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200 shadow-md cursor-pointer group select-none"
          title="タップして3回で割れるモザイク変化（100%→70%→40%→0%クリア枠）を確認"
        >
          <canvas
            ref={demoCanvasRef}
            width={400}
            height={225}
            className="w-full h-full object-cover block"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/60 to-transparent px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-white">
              <span className="font-mono font-bold text-sky-300 tabular-nums text-[11px]">
                {currentDemo.label}
              </span>
              <span aria-hidden="true" className="text-zinc-400">
                ·
              </span>
              <span className="text-[10px] text-zinc-200">{currentDemo.hitsText}</span>
            </div>
            <span className="text-[10px] text-white font-semibold bg-white/20 px-1.5 py-0.5 rounded">
              タップで変化
            </span>
          </div>
        </div>

        {/* 100% -> 70% -> 40% -> 0% セグメントセレクタ */}
        <div className="mt-1.5 flex items-center gap-1 p-0.5 bg-zinc-100 border border-zinc-200 rounded-lg">
          {DEMO_MOSAIC_STEPS.map((step, idx) => (
            <button
              key={step.percent}
              type="button"
              onClick={() => {
                setDemoStepIndex(idx);
                soundEngine.playBounce(true);
              }}
              className={`min-h-7 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold tabular-nums transition cursor-pointer whitespace-nowrap ${
                demoStepIndex === idx
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {step.percent === 0 ? '0% CLEAR' : `${step.percent}%`}
            </button>
          ))}
        </div>

        {/* クリアまでの3ステップガイド */}
        <div className="mt-1.5 w-full max-w-md grid grid-cols-3 gap-1 text-center">
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-1.5">
            <div className="text-[10px] font-bold text-blue-600">1. 3回当てて割る</div>
            <div className="text-[9px] text-zinc-500 leading-tight mt-0.5">
              100%→70%→40%→0%で貫通
            </div>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-1.5">
            <div className="text-[10px] font-bold text-amber-600">2. ★枠で連鎖削り</div>
            <div className="text-[9px] text-zinc-500 leading-tight mt-0.5">
              ★マーク枠を壊すと周囲一掃
            </div>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-1.5">
            <div className="text-[10px] font-bold text-emerald-600">3. 早押し回答</div>
            <div className="text-[9px] text-zinc-500 leading-tight mt-0.5">
              分かった瞬間に回答して高得点
            </div>
          </div>
        </div>
      </div>

      {/* コース選択 ＆ モード切替 ＆ スタートボタン */}
      <div className="space-y-1.5 shrink-0 pt-1">
        {/* コースセレクター */}
        <div>
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              出題コース選択
            </span>
            <span className="text-[10px] text-blue-600 font-medium truncate max-w-[200px]">
              {selectedCourseObj?.description}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {COURSE_OPTIONS.map((course) => {
              const isSelected = selectedCourse === course.id;
              const isAll100 = course.id === 'ALL_STAGES';
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => {
                    setSelectedCourse(course.id);
                    soundEngine.playBounce(true);
                  }}
                  className={`min-h-10 px-2.5 py-1 rounded-xl text-left border transition cursor-pointer flex items-center justify-between gap-1.5 ${
                    isAll100 ? 'col-span-2' : ''
                  } ${
                    isSelected
                      ? isAll100
                        ? 'bg-amber-50/90 border-amber-500 text-amber-950 shadow-xs ring-1 ring-amber-500/30'
                        : 'bg-blue-50/80 border-blue-500 text-blue-950 shadow-xs ring-1 ring-blue-500/30'
                      : isAll100
                        ? 'bg-amber-50/40 hover:bg-amber-50/70 border-amber-200 text-amber-900 font-bold'
                        : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700'
                  }`}
                >
                  <span className="text-xs font-bold leading-tight truncate">
                    {course.title}
                  </span>
                  <span
                    className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${
                      isSelected
                        ? isAll100
                          ? 'bg-amber-200/90 text-amber-900 font-bold'
                          : 'bg-blue-200/80 text-blue-800'
                        : isAll100
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-zinc-200/70 text-zinc-600'
                    }`}
                  >
                    {course.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 p-0.5 bg-zinc-100 border border-zinc-200 rounded-lg">
          <button
            type="button"
            onClick={() => setIsPracticeMode(false)}
            className={`min-h-7 py-1 px-2 rounded-md text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
              !isPracticeMode
                ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            タイムアタック（制限時間あり）
          </button>
          <button
            type="button"
            onClick={() => setIsPracticeMode(true)}
            className={`min-h-7 py-1 px-2 rounded-md text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
              isPracticeMode
                ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            フリープレイ（時間無制限）
          </button>
        </div>

        <button
          type="button"
          onClick={onStartGame}
          className="w-full min-h-11 py-2 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>ゲームスタート</span>
        </button>
      </div>
    </div>
  );
};
