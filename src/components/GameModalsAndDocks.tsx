import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  ArrowRight,
  Award,
  Delete,
  Timer,
  Keyboard,
} from 'lucide-react';
import { PuzzleStage, PUZZLE_STAGES } from '../data/puzzles';
import { StageScoreRecord } from '../types/game';
import { soundEngine } from '../utils/sound';

interface AnswerDockProps {
  phase: 'ANSWERING' | 'LAST_CHANCE';
  currentStage: PuzzleStage;
  targetKana: string;
  inputKana: string;
  currentChoices: string[];
  potentialNormalScore: number;
  onSelectChoice: (char: string) => void;
  onReturnFromAnswer: () => void;
  onGiveUpAndReveal: () => void;
}

export const AnswerDock: React.FC<AnswerDockProps> = ({
  phase,
  currentStage,
  inputKana,
  currentChoices,
  potentialNormalScore,
  onSelectChoice,
  onReturnFromAnswer,
  onGiveUpAndReveal,
}) => {
  const choiceLabels = ['A', 'B', 'C', 'D'];

  // キーボード 1, 2, 3, 4 または A, B, C, D での入力対応
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onReturnFromAnswer();
        return;
      }
      const keyMap: Record<string, number> = {
        '1': 0, '2': 1, '3': 2, '4': 3,
        'a': 0, 'b': 1, 'c': 2, 'd': 3,
        'A': 0, 'B': 1, 'C': 2, 'D': 3,
      };
      if (keyMap[e.key] !== undefined) {
        const idx = keyMap[e.key];
        if (currentChoices[idx]) {
          e.preventDefault();
          onSelectChoice(currentChoices[idx]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChoices, onSelectChoice, onReturnFromAnswer]);

  return (
    <div className="w-full bg-white/95 border border-zinc-200 rounded-3xl p-3 sm:p-4 shadow-2xl backdrop-blur-md space-y-2.5 text-zinc-800">
      {/* 1段目: ヘッダー（戻る ＋ 入力中文字 ＋ ギブアップ） */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-2">
        {phase === 'ANSWERING' ? (
          <button
            type="button"
            onClick={onReturnFromAnswer}
            className="min-h-8 px-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold border border-zinc-200 transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 keycap-btn"
            title="回答を中断してブロック崩しに戻る (Esc)"
          >
            <span>← 戻る</span>
          </button>
        ) : (
          <div className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
            最終回答
          </div>
        )}

        {/* 入力中文字列のリアルタイム表示（文字数は完全非公開！） */}
        <div className="flex-1 min-w-0 flex items-center justify-center px-2">
          <div className="flex items-center gap-1 font-display font-black text-xl sm:text-2xl text-zinc-900 tracking-wider">
            {inputKana ? (
              <span>{inputKana}</span>
            ) : (
              <span className="text-zinc-300 text-xs sm:text-sm font-medium tracking-normal">
                1文字目を選択
              </span>
            )}
            <span className="w-0.5 h-5 bg-blue-600 animate-pulse inline-block" />
          </div>
        </div>

        <button
          type="button"
          onClick={onGiveUpAndReveal}
          className="text-[11px] text-zinc-400 hover:text-zinc-700 transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 hover:underline"
          title="正解を確認して終了（0pt）"
        >
          <Eye className="w-3 h-3" />
          <span>正解を見る (0pt)</span>
        </button>
      </div>

      {/* 2段目: みんはや式 特大4択ボタン（2×2グリッド） */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        {currentChoices.map((char, idx) => (
          <button
            key={`${char}-${idx}`}
            type="button"
            onClick={() => onSelectChoice(char)}
            className="relative min-h-16 sm:min-h-20 rounded-2xl bg-white hover:bg-zinc-50 active:bg-blue-600 active:text-white border-2 border-zinc-200 hover:border-zinc-300 active:border-blue-600 shadow-sm keycap-btn flex items-center justify-center cursor-pointer transition select-none group"
          >
            <span className="absolute top-2 left-2.5 text-[10px] font-bold text-zinc-400 group-active:text-blue-200 font-display">
              {choiceLabels[idx]}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 group-active:text-white">
              {char}
            </span>
          </button>
        ))}
      </div>

      {/* 3段目: ステータス＆ジャンル */}
      <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1 pt-0.5 border-t border-zinc-100">
        <span className="font-semibold text-zinc-600 truncate">
          {currentStage.categoryLabel.replace(/[（(][^）)]*[）)]/g, '').trim()}
        </span>
        <span className="font-mono tabular-nums text-blue-600 font-bold">
          +{phase === 'LAST_CHANCE' ? 100 : potentialNormalScore}pt
        </span>
      </div>
    </div>
  );
};

interface StageResultDockProps {
  totalStagesInCourse?: number;
  currentStage: PuzzleStage;
  currentStageIndex: number;
  currentStageRecord: StageScoreRecord;
  onNextStageOrSummary: () => void;
  onRetrySameStagePractice: () => void;
  onGoToSummary: () => void;
}

export const StageResultDock: React.FC<StageResultDockProps> = ({
  currentStage,
  currentStageIndex,
  totalStagesInCourse,
  currentStageRecord,
  onNextStageOrSummary,
  onRetrySameStagePractice,
  onGoToSummary,
}) => {
  const totalStages = totalStagesInCourse || PUZZLE_STAGES.length;
  const isLastStage = currentStageIndex + 1 >= totalStages;
  const isCleared =
    currentStageRecord.resolutionType === 'NORMAL_CORRECT' ||
    currentStageRecord.resolutionType === 'LAST_CHANCE_CORRECT';
  const timeDiffSec = Number(
    (currentStageRecord.rivalTargetSec - currentStageRecord.elapsedSec).toFixed(1)
  );

  return (
    <div className="w-full bg-white/95 border border-zinc-200 rounded-2xl p-3 sm:p-3.5 shadow-2xl backdrop-blur-md space-y-2 text-zinc-800">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {isCleared ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          ) : (
            <Eye className="w-6 h-6 text-blue-500 shrink-0" />
          )}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
              <span className="text-zinc-800 font-semibold">
                {currentStageRecord.resolutionType === 'NORMAL_CORRECT' && '早押しクリア'}
                {currentStageRecord.resolutionType === 'LAST_CHANCE_CORRECT' && '最終回答クリア'}
                {currentStageRecord.resolutionType === 'ALL_REVEALED_UNSOLVED' && 'モザイク0%・未正解'}
                {currentStageRecord.resolutionType === 'GAVE_UP_OR_FAILED' && '正解表示'}
              </span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span className="font-mono tabular-nums text-blue-600 font-semibold">
                タイム {currentStageRecord.elapsedSec.toFixed(1)}s
              </span>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-display font-bold shadow-xs ${
                  currentStageRecord.speedRank === 'S'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                    : currentStageRecord.speedRank === 'A'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                    : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                }`}
              >
                SPEED {currentStageRecord.speedRank}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 truncate">
              正解：{currentStage.displayAnswer}
            </h3>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[10px] text-zinc-500 font-medium">
            {currentStageRecord.isPractice ? 'フリープレイ' : '獲得スコア'}
          </div>
          <div className="text-xl font-extrabold font-display tabular-nums text-blue-600">
            +{currentStageRecord.score} <span className="text-xs font-normal text-zinc-600">pt</span>
          </div>
        </div>
      </div>

      {/* スコア・タイム内訳バー（開発者デバッグ用語を全廃し、純粋な内訳情報に純化） */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="text-zinc-600 font-display tabular-nums">
          {currentStageRecord.resolutionType === 'NORMAL_CORRECT' ? (
            <span>
              内訳: 基本スコア + 早押しボーナス(+{currentStageRecord.speedBonus}pt)
            </span>
          ) : (
            <span>
              ステージクリアタイム: {currentStageRecord.elapsedSec.toFixed(1)}秒
            </span>
          )}
        </div>
        <div className="font-display tabular-nums text-zinc-500 font-medium">
          第{currentStageIndex + 1}問 / 全{totalStages}問
        </div>
      </div>

      <div className="flex items-center gap-2 pt-0.5">
        <button
          type="button"
          onClick={onNextStageOrSummary}
          className="flex-1 min-h-11 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-md keycap-btn"
        >
          <span>
            {isLastStage ? 'トータル結果へ' : '次のステージへ'}
          </span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>

        <button
          type="button"
          onClick={onRetrySameStagePractice}
          className="min-h-11 px-3 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium text-xs border border-zinc-200 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap keycap-btn"
        >
          <RotateCcw className="w-3.5 h-3.5 shrink-0" />
          <span>もう一度プレイ</span>
        </button>

        <button
          type="button"
          onClick={onGoToSummary}
          className="min-h-11 px-3 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium text-xs border border-zinc-200 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap keycap-btn"
        >
          <Award className="w-3.5 h-3.5 shrink-0" />
          <span>スコア一覧</span>
        </button>
      </div>
    </div>
  );
};
