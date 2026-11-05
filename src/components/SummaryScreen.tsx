import React, { useEffect, useRef } from 'react';
import { RotateCcw, Timer } from 'lucide-react';
import { PuzzleStage, renderStageArtworkToCanvas, preloadStagePhotos } from '../data/puzzles';
import { StageScoreRecord } from '../types/game';

interface SummaryScreenProps {
  activeStages: PuzzleStage[];
  stageRecords: Record<number, StageScoreRecord>;
  officialTotalScore: number;
  onPracticeStage: (stageIdx: number) => void;
  onRestartAll: () => void;
  onBackToTitle: () => void;
}

const StageThumbnail: React.FC<{ stage: PuzzleStage }> = ({ stage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const redraw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      renderStageArtworkToCanvas(ctx, stage.id, canvas.width, canvas.height);
    };

    redraw();
    const cleanup = preloadStagePhotos((loadedStageId) => {
      if (loadedStageId === stage.id) {
        redraw();
      }
    });
    return cleanup;
  }, [stage.id]);

  return (
    <div className="w-14 h-11 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
      <canvas
        ref={canvasRef}
        width={112}
        height={88}
        className="w-full h-full object-cover block"
      />
    </div>
  );
};

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  activeStages,
  stageRecords,
  officialTotalScore,
  onPracticeStage,
  onRestartAll,
  onBackToTitle,
}) => {
  const totalElapsedSec = activeStages.reduce((acc, st) => {
    const rec = stageRecords[st.id];
    return acc + (rec ? rec.elapsedSec : 0);
  }, 0);

  const totalRivalTargetSec = activeStages.reduce((acc, st) => acc + st.rivalTargetSec, 0);
  const clearedStagesCount = activeStages.filter((st) => {
    const rec = stageRecords[st.id];
    return (
      rec &&
      (rec.resolutionType === 'NORMAL_CORRECT' || rec.resolutionType === 'LAST_CHANCE_CORRECT')
    );
  }).length;

  return (
    <div className="w-full h-full flex flex-col bg-white/95 border border-zinc-200 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden text-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-blue-600">
            SPEED &amp; SCORE RESULT
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mt-0.5">トータルリザルト</h2>
          <div className="flex items-center gap-2 text-xs text-zinc-600 mt-1 font-mono tabular-nums">
            <span className="flex items-center gap-1 text-blue-600 font-semibold">
              <Timer className="w-3.5 h-3.5" />
              合計タイム {totalElapsedSec.toFixed(1)}s
            </span>
            <span aria-hidden="true" className="text-zinc-300">
              ·
            </span>
            <span className="text-zinc-500">
              目標合計 {totalRivalTargetSec.toFixed(1)}s（クリア {clearedStagesCount}/{activeStages.length}）
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-zinc-500">全{activeStages.length}ステージ合計</div>
          <div className="text-2xl font-extrabold text-blue-600 font-mono tabular-nums">
            {officialTotalScore} <span className="text-sm font-normal text-zinc-600">pt</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto py-2 pr-1 space-y-2.5">
        {activeStages.map((st, idx) => {
          const rec = stageRecords[st.id];
          const isCleared =
            rec &&
            (rec.resolutionType === 'NORMAL_CORRECT' ||
              rec.resolutionType === 'LAST_CHANCE_CORRECT');
          return (
            <div
              key={st.id}
              className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <StageThumbnail stage={st} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="font-mono font-semibold text-zinc-700">{st.title}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-sm font-bold text-zinc-900 truncate">
                      {st.displayAnswer}
                    </span>
                    {rec && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                          rec.speedRank === 'S'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : rec.speedRank === 'A'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                        }`}
                      >
                        {rec.speedRank}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate font-mono tabular-nums">
                    {rec
                      ? isCleared
                        ? `タイム ${rec.elapsedSec.toFixed(1)}s（目標 ${st.rivalTargetSec.toFixed(1)}s） · 残モザイク ${rec.mosaicPercent}%`
                        : `未クリア · 残モザイク ${rec.mosaicPercent}%`
                      : `目標タイム ${st.rivalTargetSec.toFixed(1)}s`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="text-right">
                  <div className="text-sm font-bold font-mono tabular-nums text-blue-600">
                    {rec ? `${rec.score} pt` : '—'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onPracticeStage(idx)}
                  className="min-h-9 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-medium text-zinc-700 border border-zinc-200 transition cursor-pointer whitespace-nowrap"
                >
                  再挑戦
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2.5 pt-2">
        <button
          type="button"
          onClick={onRestartAll}
          className="flex-1 min-h-12 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>最初からタイムアタック</span>
        </button>
        <button
          type="button"
          onClick={onBackToTitle}
          className="min-h-12 px-5 py-2.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium text-sm border border-zinc-200 transition cursor-pointer whitespace-nowrap"
        >
          ホームへ
        </button>
      </div>
    </div>
  );
};
