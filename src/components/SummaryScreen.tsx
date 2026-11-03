import React from 'react';
import { RotateCcw, Timer } from 'lucide-react';
import { PUZZLE_STAGES } from '../data/puzzles';
import { StageScoreRecord } from '../types/game';

interface SummaryScreenProps {
  stageRecords: Record<number, StageScoreRecord>;
  officialTotalScore: number;
  onPracticeStage: (stageIdx: number) => void;
  onRestartAll: () => void;
  onBackToTitle: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  stageRecords,
  officialTotalScore,
  onPracticeStage,
  onRestartAll,
  onBackToTitle,
}) => {
  const totalElapsedSec = PUZZLE_STAGES.reduce((acc, st) => {
    const rec = stageRecords[st.id];
    return acc + (rec ? rec.elapsedSec : 0);
  }, 0);

  const totalRivalTargetSec = PUZZLE_STAGES.reduce((acc, st) => acc + st.rivalTargetSec, 0);
  const clearedStagesCount = PUZZLE_STAGES.filter((st) => {
    const rec = stageRecords[st.id];
    return (
      rec &&
      (rec.resolutionType === 'NORMAL_CORRECT' || rec.resolutionType === 'LAST_CHANCE_CORRECT')
    );
  }).length;

  return (
    <div className="w-full h-full flex flex-col justify-between bg-slate-900/90 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-sky-400">
            SPEED &amp; SCORE RESULT
          </div>
          <h2 className="text-xl font-bold text-white mt-0.5">トータルリザルト</h2>
          <div className="flex items-center gap-2 text-xs text-slate-300 mt-1 font-mono tabular-nums">
            <span className="flex items-center gap-1 text-sky-300 font-semibold">
              <Timer className="w-3.5 h-3.5" />
              合計タイム {totalElapsedSec.toFixed(1)}s
            </span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span className="text-slate-400">
              目標合計 {totalRivalTargetSec.toFixed(1)}s（クリア {clearedStagesCount}/3）
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-slate-400">全3ステージ合計</div>
          <div className="text-2xl font-extrabold text-sky-400 font-mono tabular-nums">
            {officialTotalScore} <span className="text-sm font-normal">pt</span>
          </div>
        </div>
      </div>

      <div className="my-auto py-2 space-y-2.5">
        {PUZZLE_STAGES.map((st, idx) => {
          const rec = stageRecords[st.id];
          const isCleared =
            rec &&
            (rec.resolutionType === 'NORMAL_CORRECT' ||
              rec.resolutionType === 'LAST_CHANCE_CORRECT');
          return (
            <div
              key={st.id}
              className="bg-slate-950/80 border border-white/10 rounded-2xl p-3 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-11 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shrink-0">
                  <img
                    src={st.photoUrl}
                    alt={st.displayAnswer}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono font-semibold text-slate-300">{st.title}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-sm font-bold text-white truncate">
                      {st.displayAnswer}
                    </span>
                    {rec && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                          rec.speedRank === 'S'
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                            : rec.speedRank === 'A'
                            ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                            : 'bg-slate-800 text-slate-300 border border-white/10'
                        }`}
                      >
                        {rec.speedRank}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 truncate font-mono tabular-nums">
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
                  <div className="text-sm font-bold font-mono tabular-nums text-sky-400">
                    {rec ? `${rec.score} pt` : '—'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onPracticeStage(idx)}
                  className="min-h-9 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-white/10 transition cursor-pointer whitespace-nowrap"
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
          className="flex-1 min-h-12 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-4 h-4" />
          <span>最初からタイムアタック</span>
        </button>
        <button
          type="button"
          onClick={onBackToTitle}
          className="min-h-12 px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-white/10 transition cursor-pointer whitespace-nowrap"
        >
          ホームへ
        </button>
      </div>
    </div>
  );
};
