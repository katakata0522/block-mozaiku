import React, { useEffect, useRef } from 'react';
import { RotateCcw, Timer, Trophy, Home } from 'lucide-react';
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
    <div className="w-14 h-11 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/90 shrink-0 shadow-xs">
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

  const clearPercent = Math.round((clearedStagesCount / Math.max(1, activeStages.length)) * 100);

  return (
    <div className="w-full h-full flex flex-col bg-[#f6f5f1] border-2 border-zinc-300/90 rounded-[26px] p-3.5 sm:p-5 shadow-[0_12px_32px_rgba(24,24,27,0.14),inset_0_1.5px_0_#ffffff] overflow-hidden text-zinc-900">
      {/* アーケード・トータルリザルト計器ヘッダー */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200/90 pb-3 shrink-0">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-display font-black uppercase tracking-widest text-amber-700">
            <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>TOTAL RESULT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight mt-0.5">
            トータルリザルト
          </h2>
          <div className="flex items-center gap-2 text-xs text-zinc-600 mt-1 font-display tabular-nums">
            <span className="inline-flex items-center gap-1 bg-zinc-900 text-amber-300 px-2.5 py-0.5 rounded-lg font-black text-xs shadow-inner">
              <Timer className="w-3.5 h-3.5" />
              {totalElapsedSec.toFixed(1)}s
            </span>
            <span className="font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg text-[11px]">
              {clearedStagesCount === activeStages.length ? '全問完全クリア！' : `クリア ${clearedStagesCount}/${activeStages.length}`}
            </span>
          </div>
        </div>

        <div className="bg-zinc-900 text-white border border-zinc-800 rounded-2xl px-3.5 py-2 text-right shadow-inner shrink-0">
          <div className="text-[9px] text-zinc-400 font-display font-bold uppercase tracking-wider">
            TOTAL SCORE
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-display tabular-nums tracking-tight leading-tight">
            {officialTotalScore}
            <span className="text-xs font-semibold text-zinc-400 ml-1">pt</span>
          </div>
        </div>
      </div>

      {/* ステージ別成績一覧 */}
      <div className="flex-1 min-h-0 overflow-y-auto py-2 pr-1 space-y-2 custom-scrollbar">
        {activeStages.map((st, idx) => {
          const rec = stageRecords[st.id];
          const isCleared =
            rec &&
            (rec.resolutionType === 'NORMAL_CORRECT' ||
              rec.resolutionType === 'LAST_CHANCE_CORRECT');
          return (
            <div
              key={st.id}
              className="bg-zinc-50/80 hover:bg-zinc-100/70 border border-zinc-200/80 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-xs transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <StageThumbnail stage={st} />
                <div className="min-w-0 flex-1">
                  {(() => {
                    const match = st.displayAnswer.match(/^([^(（]+)([（(][^）)]+[）)])?$/);
                    const mainName = match ? match[1].trim() : st.displayAnswer;
                    const subName = match && match[2] ? match[2].trim() : '';
                    return (
                      <div className="space-y-0.5">
                        {/* 1段目: 答えを主役に最大幅確保 ＋ スピードランク */}
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                            {mainName}
                          </span>
                          {subName && (
                            <span className="text-[10px] text-zinc-400 font-normal truncate hidden sm:inline">
                              {subName}
                            </span>
                          )}
                          {rec && (
                            <span
                              className={`shrink-0 px-1.5 py-0.2 rounded text-[10px] font-display font-bold shadow-xs ${
                                rec.speedRank === 'S'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                                  : rec.speedRank === 'A'
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                                  : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                              }`}
                            >
                              {rec.speedRank}
                            </span>
                          )}
                        </div>
                        {/* 2段目: ステージ番号 ＋ タイム/ステータス（文字切れゼロの明快表記） */}
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-display tabular-nums truncate">
                          <span className="font-semibold text-zinc-600 whitespace-nowrap">
                            {st.title}
                          </span>
                          <span aria-hidden="true" className="text-zinc-300">·</span>
                          <span className="font-semibold text-zinc-700 whitespace-nowrap">
                            {rec
                              ? isCleared
                                ? `${rec.elapsedSec.toFixed(1)}s`
                                : '未正解'
                              : '未プレイ'}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="text-right">
                  <div className="text-sm font-bold font-display tabular-nums text-blue-600">
                    {rec ? `${rec.score} pt` : '—'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onPracticeStage(idx)}
                  className="min-h-8 px-3 rounded-xl bg-white hover:bg-zinc-100 text-xs font-semibold text-zinc-700 border border-zinc-200/90 transition cursor-pointer whitespace-nowrap keycap-btn"
                >
                  再挑戦
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* フッターアクションバー */}
      <div className="flex gap-2 pt-2 border-t border-zinc-200/90 shrink-0 pb-0.5">
        <button
          type="button"
          onClick={onRestartAll}
          className="flex-1 min-h-11 py-2 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 hover:from-zinc-750 hover:to-zinc-900 text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap keycap-dark"
        >
          <RotateCcw className="w-4 h-4 text-amber-300" />
          <span>最初からタイムアタック</span>
        </button>
        <button
          type="button"
          onClick={onBackToTitle}
          className="min-h-11 px-4 py-2 rounded-2xl bg-white hover:bg-zinc-50 text-zinc-700 font-bold text-sm border border-zinc-300 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap keycap-btn"
        >
          <Home className="w-4 h-4" />
          <span>ホームへ</span>
        </button>
      </div>
    </div>
  );
};
