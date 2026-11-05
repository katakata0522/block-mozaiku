import React, { useEffect, useRef, useState } from 'react';
import { Play, Check, Sparkles } from 'lucide-react';
import { preloadStagePhotos, renderStageArtworkToCanvas } from '../data/puzzles';
import { CourseMode, COURSE_OPTIONS } from '../types/game';
import { soundEngine } from '../utils/sound';
import { BrandLogo } from './BrandLogo';

interface TitleScreenProps {
  isPracticeMode: boolean;
  setIsPracticeMode: (practice: boolean) => void;
  selectedCourse: CourseMode;
  setSelectedCourse: (course: CourseMode) => void;
  onStartGame: () => void;
}

// スマート露出（100% -> 70%輪郭先行浮上 -> 40%ディテール浮上 -> 0%クリア枠）の4ステップ表示
const DEMO_MOSAIC_STEPS = [
  { percent: 100, blockSize: 44, label: '100%', hitsText: '純粋モザイク（残り3打）' },
  { percent: 70, blockSize: 22, label: '70%', hitsText: '輪郭が先行浮上（残り2打）' },
  { percent: 40, blockSize: 11, label: '40%', hitsText: 'パーツ鮮明化（あと1打！）' },
  { percent: 0, blockSize: 1, label: '0% CLEAR', hitsText: 'クリア枠完成！原画露出' },
];

const COURSE_THEMES: Record<
  string,
  {
    hoverBorder: string;
    selectedBg: string;
    selectedBorder: string;
    selectedText: string;
    badgeBg: string;
    badgeText: string;
    dotColor: string;
  }
> = {
  RANDOM_5: {
    hoverBorder: 'hover:border-blue-300',
    selectedBg: 'bg-blue-50/90',
    selectedBorder: 'border-blue-500',
    selectedText: 'text-blue-950',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    dotColor: 'bg-blue-500',
  },
  RANDOM_10: {
    hoverBorder: 'hover:border-amber-300',
    selectedBg: 'bg-amber-50/90',
    selectedBorder: 'border-amber-500',
    selectedText: 'text-amber-950',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    dotColor: 'bg-amber-500',
  },
  HISTORY_HEROES: {
    hoverBorder: 'hover:border-amber-400',
    selectedBg: 'bg-amber-50/90',
    selectedBorder: 'border-amber-600',
    selectedText: 'text-amber-950',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    dotColor: 'bg-amber-600',
  },
  WORLD_MASTERPIECES: {
    hoverBorder: 'hover:border-indigo-300',
    selectedBg: 'bg-indigo-50/90',
    selectedBorder: 'border-indigo-500',
    selectedText: 'text-indigo-950',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    dotColor: 'bg-indigo-500',
  },
  RETRO_PIXEL_ART: {
    hoverBorder: 'hover:border-emerald-300',
    selectedBg: 'bg-emerald-50/90',
    selectedBorder: 'border-emerald-500',
    selectedText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    dotColor: 'bg-emerald-500',
  },
  WORLD_HERITAGE: {
    hoverBorder: 'hover:border-rose-300',
    selectedBg: 'bg-rose-50/90',
    selectedBorder: 'border-rose-500',
    selectedText: 'text-rose-950',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-800',
    dotColor: 'bg-rose-500',
  },
  SPACE_AND_NATURE: {
    hoverBorder: 'hover:border-sky-300',
    selectedBg: 'bg-sky-50/90',
    selectedBorder: 'border-sky-500',
    selectedText: 'text-sky-950',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-800',
    dotColor: 'bg-sky-500',
  },
  VEHICLES_AND_FOODS: {
    hoverBorder: 'hover:border-orange-300',
    selectedBg: 'bg-orange-50/90',
    selectedBorder: 'border-orange-500',
    selectedText: 'text-orange-950',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-800',
    dotColor: 'bg-orange-500',
  },
  ALL_STAGES: {
    hoverBorder: 'hover:border-amber-400',
    selectedBg: 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50',
    selectedBorder: 'border-amber-500',
    selectedText: 'text-amber-950',
    badgeBg: 'bg-amber-200',
    badgeText: 'text-amber-950',
    dotColor: 'bg-amber-500',
  },
};

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

  // 初見プレイヤーでも直感理解できるよう、3.5秒ごとに自動サイクル展示
  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStepIndex((prev) => (prev + 1) % DEMO_MOSAIC_STEPS.length);
    }, 3400);
    return () => clearInterval(timer);
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
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.95)';
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

  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200/90 rounded-3xl p-3 sm:p-5 shadow-xl backdrop-blur-md overflow-hidden text-zinc-900">
      {/* 売り物クオリティの洗練されたブランドヘッダー */}
      <div className="text-center shrink-0 pb-1.5 pt-0.5">
        <div className="flex items-center justify-center gap-2 mb-1">
          <BrandLogo size={24} />
          <span className="font-display text-[11px] font-extrabold tracking-widest uppercase text-blue-600">
            MOSAIC BREAK
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
            <Sparkles className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
            <span>全100問</span>
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight leading-snug">
          モザイクブレイク
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5 max-w-sm mx-auto leading-relaxed text-balance">
          壊すほど原画が晴れていく。何の写真かひらめいた瞬間に答えてハイスコア！
        </p>
      </div>

      {/* 3回で割れるモザイク変化（100%→70%→40%→0%）のインタラクティブ・ショーケース */}
      <div className="py-1 flex flex-col items-center shrink-0 border-y border-zinc-100 my-1">
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
          className="relative w-full max-w-[260px] sm:max-w-[280px] aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200 shadow-sm cursor-pointer group select-none transition hover:shadow-md"
          title="タップでモザイクの3段階露出（100%→70%→40%→0%クリア枠）を体験"
        >
          <canvas
            ref={demoCanvasRef}
            width={400}
            height={225}
            className="w-full h-full object-cover block"
          />

          {/* デモステータスバー */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/60 to-transparent px-2.5 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-white">
              <span className="font-display font-bold text-sky-300 tabular-nums text-[11px]">
                {currentDemo.label}
              </span>
              <span aria-hidden="true" className="text-zinc-400 text-xs">·</span>
              <span className="text-[10px] text-zinc-200 truncate">{currentDemo.hitsText}</span>
            </div>
            <span className="text-[9px] text-white font-medium bg-white/20 backdrop-blur-xs px-1.5 py-0.5 rounded shrink-0">
              タップで切替
            </span>
          </div>
        </div>

        {/* ステップ進行インジケーター */}
        <div className="mt-1.5 flex items-center gap-1 p-0.5 bg-zinc-100 border border-zinc-200/80 rounded-lg">
          {DEMO_MOSAIC_STEPS.map((step, idx) => (
            <button
              key={step.percent}
              type="button"
              onClick={() => {
                setDemoStepIndex(idx);
                soundEngine.playBounce(true);
              }}
              className={`min-h-6 px-2 py-0.5 rounded-md text-[10px] font-display font-bold tabular-nums transition cursor-pointer whitespace-nowrap ${
                demoStepIndex === idx
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {step.percent === 0 ? '0% CLEAR' : `${step.percent}%`}
            </button>
          ))}
        </div>
      </div>

      {/* ゆったりスクロール可能なコース選択カードリスト（売り物基準のワールド選択） */}
      <div className="flex-1 min-h-0 overflow-y-auto py-1.5 pr-1 space-y-1.5 custom-scrollbar">
        <div className="flex items-center justify-between px-1">
          <span className="font-display text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            コース選択（全9コース・100問）
          </span>
          <span className="text-[10px] text-zinc-400">
            スクロールして選択
          </span>
        </div>

        <div className="space-y-1.5">
          {COURSE_OPTIONS.map((course) => {
            const isSelected = selectedCourse === course.id;
            const isAll100 = course.id === 'ALL_STAGES';
            const theme = COURSE_THEMES[course.id] || COURSE_THEMES.RANDOM_5;

            return (
              <button
                key={course.id}
                type="button"
                onClick={() => {
                  setSelectedCourse(course.id);
                  soundEngine.playBounce(true);
                }}
                className={`w-full p-2.5 rounded-2xl text-left border transition cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? `${theme.selectedBg} ${theme.selectedBorder} ${theme.selectedText} shadow-sm ring-2 ring-blue-500/20`
                    : isAll100
                    ? 'bg-amber-50/40 hover:bg-amber-50/70 border-amber-200/80 text-amber-900'
                    : `bg-zinc-50 hover:bg-zinc-100/80 border-zinc-200/80 text-zinc-800 ${theme.hoverBorder}`
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold truncate">
                      {course.title}
                    </span>
                    <span className="font-display text-[10px] text-zinc-500 font-semibold tabular-nums">
                      {course.stageCount}問
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1 leading-normal">
                    {course.description}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${theme.badgeBg} ${theme.badgeText}`}
                >
                  {course.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* モード切替 ＆ スタートボタン（下部固定） */}
      <div className="pt-2 border-t border-zinc-100 space-y-1.5 shrink-0">
        <div className="grid grid-cols-2 gap-1 p-0.5 bg-zinc-100 border border-zinc-200/80 rounded-xl">
          <button
            type="button"
            onClick={() => setIsPracticeMode(false)}
            className={`min-h-7 py-1 px-2 rounded-lg text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
              !isPracticeMode
                ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200 font-bold'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            ⏱️ タイムアタック（制限時間あり）
          </button>
          <button
            type="button"
            onClick={() => setIsPracticeMode(true)}
            className={`min-h-7 py-1 px-2 rounded-lg text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
              isPracticeMode
                ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200 font-bold'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            ☕ フリープレイ（時間無制限）
          </button>
        </div>

        <button
          type="button"
          onClick={onStartGame}
          className="w-full min-h-12 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-md transition flex items-center justify-center gap-2 cursor-pointer keycap-btn"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>ゲームスタート</span>
          <span className="text-[11px] font-normal text-zinc-400 font-display hidden sm:inline">[Space]</span>
        </button>
      </div>
    </div>
  );
};
