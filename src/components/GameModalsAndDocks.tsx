import React, { useState } from 'react';
import {
  CheckCircle2,
  Eye,
  RotateCcw,
  ArrowRight,
  Award,
  Zap,
} from 'lucide-react';
import { PuzzleStage, PUZZLE_STAGES } from '../data/puzzles';
import { StageScoreRecord } from '../types/game';

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

const CHOICE_STYLES = [
  {
    label: 'A',
    badgeBg: 'bg-rose-500 text-white',
    activeBorder: 'border-rose-500 bg-rose-50',
    hoverBorder: 'hover:border-rose-300',
  },
  {
    label: 'B',
    badgeBg: 'bg-blue-600 text-white',
    activeBorder: 'border-blue-600 bg-blue-50',
    hoverBorder: 'hover:border-blue-300',
  },
  {
    label: 'C',
    badgeBg: 'bg-emerald-600 text-white',
    activeBorder: 'border-emerald-600 bg-emerald-50',
    hoverBorder: 'hover:border-emerald-300',
  },
  {
    label: 'D',
    badgeBg: 'bg-amber-500 text-white',
    activeBorder: 'border-amber-500 bg-amber-50',
    hoverBorder: 'hover:border-amber-300',
  },
];

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
  const [pressedIdx, setPressedIdx] = useState<number | null>(null);

  const triggerChoiceWithVisual = React.useCallback(
    (idx: number, char: string) => {
      setPressedIdx(idx);
      window.setTimeout(() => {
        setPressedIdx((prev) => (prev === idx ? null : prev));
      }, 95);
      onSelectChoice(char);
    },
    [onSelectChoice]
  );

  // キーボード 1, 2, 3, 4 または A, B, C, D での入力対応（視覚的沈み込み連動）
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
          triggerChoiceWithVisual(idx, currentChoices[idx]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChoices, triggerChoiceWithVisual, onReturnFromAnswer]);

  const inputtedChars = Array.from(inputKana);

  return (
    <div className="w-full bg-[#f6f5f1] border-2 border-zinc-300/90 rounded-[24px] p-2.5 sm:p-3.5 shadow-[0_10px_28px_rgba(24,24,27,0.16),inset_0_1.5px_0_#ffffff] space-y-2 text-zinc-900">
      {/* 1段目: アーケード入力ディスプレイ（戻る ＋ 電光文字スロット ＋ 正解を見る） */}
      <div className="flex items-center justify-between gap-2">
        {phase === 'ANSWERING' ? (
          <button
            type="button"
            onClick={onReturnFromAnswer}
            className="min-h-8 px-2.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-bold border border-zinc-300 transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 keycap-btn"
            title="回答を中断してブロック崩しに戻る (Esc)"
          >
            <span>← 戻る</span>
          </button>
        ) : (
          <div className="text-[11px] font-extrabold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 shrink-0">
            最終回答
          </div>
        )}

        {/* 入力中文字列のインセット電光スロット（文字数は完全非公開・1文字ごとにスプリングバウンス！） */}
        <div className="flex-1 min-w-0 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1 min-h-9 shadow-[inset_0_2px_5px_rgba(0,0,0,0.65)] flex items-center justify-center overflow-hidden">
          <div className="flex items-center gap-0.5 font-display font-black text-lg sm:text-xl text-white tracking-wider truncate">
            {inputtedChars.length > 0 ? (
              inputtedChars.map((ch, i) => {
                const isLatest = i === inputtedChars.length - 1;
                return (
                  <span
                    key={`${i}-${ch}`}
                    className={
                      isLatest
                        ? 'animate-char-pop text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'text-white'
                    }
                  >
                    {ch}
                  </span>
                );
              })
            ) : (
              <span className="text-zinc-400 text-xs font-semibold tracking-normal">
                1文字目を選択
              </span>
            )}
            <span className="w-0.5 h-4 sm:h-5 bg-amber-400 ml-0.5 animate-pulse inline-block shrink-0 rounded-full" />
          </div>
        </div>

        <button
          type="button"
          onClick={onGiveUpAndReveal}
          className="min-h-8 px-2 rounded-lg text-[11px] font-medium text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/60 transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
          title="正解を確認して終了（0pt）"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>正解を見る</span>
        </button>
      </div>

      {/* 2段目: みんはや式 特大立体アーケード4択ボタン（2×2グリッド） */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pb-0.5">
        {currentChoices.map((char, idx) => {
          const style = CHOICE_STYLES[idx] || CHOICE_STYLES[0];
          const isPressed = pressedIdx === idx;
          return (
            <button
              key={`${idx}-${char}`}
              type="button"
              onClick={() => triggerChoiceWithVisual(idx, char)}
              className={`arcade-choice-btn relative min-h-[60px] sm:min-h-[72px] rounded-2xl border-2 flex items-center justify-center cursor-pointer select-none group ${
                isPressed
                  ? `is-pressed ${style.activeBorder}`
                  : `bg-white border-zinc-300/90 ${style.hoverBorder} active:border-zinc-400`
              }`}
            >
              <span
                className={`absolute top-2 left-2.5 w-5 h-5 rounded-md text-[10px] font-black font-display flex items-center justify-center shadow-2xs ${style.badgeBg}`}
              >
                {style.label}
              </span>
              <span className="text-2xl sm:text-3xl font-black font-display text-zinc-900 tracking-tight">
                {char}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3段目: ジャンルプレート ＆ 獲得見込みスコア（誤答リスク明示） */}
      <div className="flex items-center justify-between text-[11px] px-1 pt-0.5 border-t border-zinc-200/80">
        <span className="font-bold text-zinc-600 truncate">
          {currentStage.categoryLabel.replace(/[（(][^）)]*[）)]/g, '').trim()}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {phase === 'ANSWERING' && (
            <span className="text-[10px] font-semibold text-rose-600/90">
              ミス +5.0s
            </span>
          )}
          <span className="font-display tabular-nums text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md font-extrabold">
            +{phase === 'LAST_CHANCE' ? 100 : potentialNormalScore}pt
          </span>
        </div>
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

  // Enter または Space キーで即座に次のステージへ進める快適ゲームショートカット
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onNextStageOrSummary();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNextStageOrSummary]);

  return (
    <div className="w-full bg-[#f6f5f1] border-2 border-zinc-300/90 rounded-[24px] p-2.5 sm:p-3 shadow-[0_10px_28px_rgba(24,24,27,0.16),inset_0_1.5px_0_#ffffff] space-y-2 text-zinc-900">
      {/* スコア内訳・進行ステータスバー（Canvas上のギャラリー鑑定銘板と重複しない純粋な内訳情報） */}
      <div className="bg-white border border-zinc-200/90 rounded-xl px-3 py-1.5 flex items-center justify-between gap-2 text-[11px]">
        <div className="text-zinc-700 font-display font-semibold tabular-nums flex items-center gap-1.5 min-w-0 truncate">
          {currentStageRecord.resolutionType === 'NORMAL_CORRECT' ? (
            <>
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
              <span className="truncate">
                内訳: 基本100 + 残モザイク{currentStageRecord.mosaicBonus} + 早押し{currentStageRecord.speedBonus}pt
              </span>
            </>
          ) : isCleared ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>最終回答クリアボーナス: +100pt</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>経過タイム: {currentStageRecord.elapsedSec.toFixed(1)}s</span>
            </>
          )}
        </div>
        <div className="font-display tabular-nums text-zinc-500 font-extrabold shrink-0">
          STAGE {currentStageIndex + 1}/{totalStages}
        </div>
      </div>

      {/* アクションボタン群 */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onNextStageOrSummary}
          className="flex-1 min-h-12 px-4 py-2.5 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 hover:from-zinc-750 hover:to-zinc-900 text-white font-black text-sm flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap keycap-dark"
        >
          <span>{isLastStage ? 'トータルリザルトへ' : '次のステージへ'}</span>
          <ArrowRight className="w-4 h-4 text-amber-300 shrink-0" />
        </button>

        <button
          type="button"
          onClick={onRetrySameStagePractice}
          className="min-h-12 px-3.5 py-2.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 font-bold text-xs border border-zinc-300 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap keycap-btn"
        >
          <RotateCcw className="w-3.5 h-3.5 shrink-0" />
          <span>再挑戦</span>
        </button>

        <button
          type="button"
          onClick={onGoToSummary}
          className="min-h-12 px-3.5 py-2.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 font-bold text-xs border border-zinc-300 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap keycap-btn"
        >
          <Award className="w-3.5 h-3.5 shrink-0" />
          <span>一覧</span>
        </button>
      </div>
    </div>
  );
};
