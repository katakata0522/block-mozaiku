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
  lastChanceReason: 'ALL_TILES_CLEARED' | 'OUT_OF_LIVES' | 'TIME_UP';
  currentStage: PuzzleStage;
  potentialNormalScore: number;
  elapsedSec: number;
  answerInput: string;
  setAnswerInput: (val: string) => void;
  answerInputElementRef: React.RefObject<HTMLInputElement | null>;
  answerFeedback: { type: 'EMPTY' | 'WRONG' | null; message: string };
  onSubmitAnswer: (e: React.FormEvent) => void;
  onReturnFromAnswer: () => void;
  onGiveUpAndReveal: () => void;
}

export const AnswerDock: React.FC<AnswerDockProps> = ({
  phase,
  lastChanceReason,
  currentStage,
  potentialNormalScore,
  elapsedSec,
  answerInput,
  setAnswerInput,
  answerInputElementRef,
  answerFeedback,
  onSubmitAnswer,
  onReturnFromAnswer,
  onGiveUpAndReveal,
}) => {
  const handleAppendKana = (kana: string) => {
    if (answerInput.length + kana.length <= 40) {
      setAnswerInput(answerInput + kana);
      soundEngine.playBounce(true);
    }
  };

  const handleBackspace = () => {
    if (answerInput.length > 0) {
      setAnswerInput(Array.from(answerInput).slice(0, -1).join(''));
    }
  };

  return (
    <div className="w-full bg-white/95 border border-zinc-200 rounded-2xl p-2 sm:p-2.5 shadow-2xl backdrop-blur-md space-y-1.5 text-zinc-800">
      <form onSubmit={onSubmitAnswer} className="space-y-1.5">
        {/* 1段目: 戻る ＋ 入力フィールド ＋ 消す ＋ 送信ボタン（絵を隠さない1行集約） */}
        <div className="flex items-center gap-1.5">
          {phase === 'ANSWERING' && (
            <button
              type="button"
              onClick={onReturnFromAnswer}
              className="min-h-9 px-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium border border-zinc-200 transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1"
              title="Escキーでも戻れます"
            >
              <span>← 戻る</span>
            </button>
          )}

          <div className="relative flex-1 min-w-0">
            <label htmlFor="mosaic-answer-input" className="sr-only">
              写真の答えを入力
            </label>
            <input
              id="mosaic-answer-input"
              ref={answerInputElementRef}
              type="text"
              maxLength={40}
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing || e.keyCode === 229) {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                  return;
                }
                if (e.key === 'Escape' && phase === 'ANSWERING') {
                  e.preventDefault();
                  onReturnFromAnswer();
                }
              }}
              placeholder="答えを入力（かな・漢字・英字OK）"
              className="w-full min-h-9 px-3 py-1 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              autoComplete="off"
            />
          </div>

          {answerInput.length > 0 && (
            <button
              type="button"
              onClick={handleBackspace}
              className="min-h-9 px-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs border border-zinc-200 flex items-center justify-center cursor-pointer shrink-0"
              title="1文字消す"
            >
              <Delete className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="min-h-9 px-3.5 sm:px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-xs sm:text-sm transition cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
          >
            送信
          </button>
        </div>

        {/* 2段目: 16キーかなパッド（コンパクト＆タップしやすい8列×2行） */}
        <div className="bg-zinc-50/80 border border-zinc-200/90 rounded-xl p-1 sm:p-1.5 space-y-0.5">
          <div className="grid grid-cols-8 gap-1">
            {currentStage.kanaPad.map((kana, idx) => (
              <button
                key={`${currentStage.id}-kana-${idx}`}
                type="button"
                onClick={() => handleAppendKana(kana)}
                className="min-h-7 sm:min-h-8 rounded-lg bg-white hover:bg-blue-50 active:bg-blue-600 active:text-white text-zinc-800 font-bold text-xs border border-zinc-200 shadow-xs transition cursor-pointer flex items-center justify-center select-none"
              >
                {kana}
              </button>
            ))}
          </div>
        </div>

        {/* 不正解フィードバック（エラー時のみコンパクト表示） */}
        {answerFeedback.type && (
          <div
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
              answerFeedback.type === 'WRONG'
                ? 'bg-rose-50 border border-rose-200 text-rose-800'
                : 'bg-zinc-100 border border-zinc-200 text-zinc-700'
            }`}
          >
            <XCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{answerFeedback.message}</span>
          </div>
        )}

        {/* 3段目: ステータス＆正解を見る（下部バー） */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1 pt-0.5">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-zinc-700 truncate">
              {currentStage.categoryLabel}
            </span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span className="font-mono tabular-nums text-blue-600 font-bold">
              +{phase === 'LAST_CHANCE' ? 100 : potentialNormalScore}pt
            </span>
            {answerInput.length > 0 && (
              <>
                <span aria-hidden="true" className="text-zinc-300">·</span>
                <button
                  type="button"
                  onClick={() => setAnswerInput('')}
                  className="text-rose-600 hover:text-rose-700 font-medium cursor-pointer"
                >
                  全消去
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onGiveUpAndReveal}
            className="text-[11px] text-zinc-400 hover:text-zinc-700 transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 hover:underline"
          >
            <Eye className="w-3 h-3" />
            <span>正解を見る（0pt）</span>
          </button>
        </div>
      </form>
    </div>
  );
};

interface StageResultDockProps {
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
  currentStageRecord,
  onNextStageOrSummary,
  onRetrySameStagePractice,
  onGoToSummary,
}) => {
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
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  currentStageRecord.speedRank === 'S'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : currentStageRecord.speedRank === 'A'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
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
          <div className="text-[10px] text-zinc-500">
            {currentStageRecord.isPractice ? 'フリープレイ' : '獲得スコア'}
          </div>
          <div className="text-xl font-extrabold font-mono tabular-nums text-blue-600">
            +{currentStageRecord.score} <span className="text-xs font-normal text-zinc-600">pt</span>
          </div>
        </div>
      </div>

      {/* 対戦・早押し用のスコア内訳＆ターゲットタイム比較バー */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="text-zinc-700 font-mono tabular-nums">
          {currentStageRecord.resolutionType === 'NORMAL_CORRECT' ? (
            <span>
              内訳: 基本100 + 残モザイク({currentStageRecord.mosaicPercent}%) {currentStageRecord.mosaicBonus} + 早押し {currentStageRecord.speedBonus}
            </span>
          ) : (
            <span>
              残モザイク {currentStageRecord.mosaicPercent}%（0%枠 {currentStageRecord.clearedTiles}箇所）
            </span>
          )}
        </div>
        <div className="font-mono tabular-nums">
          {isCleared ? (
            timeDiffSec >= 0 ? (
              <span className="text-emerald-700 font-semibold">
                目標 {currentStageRecord.rivalTargetSec.toFixed(1)}s より {timeDiffSec.toFixed(1)}s 早い！
              </span>
            ) : (
              <span className="text-zinc-500">
                目標 {currentStageRecord.rivalTargetSec.toFixed(1)}s（+{Math.abs(timeDiffSec).toFixed(1)}s）
              </span>
            )
          ) : (
            <span className="text-zinc-400">
              目標タイム {currentStageRecord.rivalTargetSec.toFixed(1)}s
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-0.5">
        <button
          type="button"
          onClick={onNextStageOrSummary}
          className="min-h-10 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap shadow-xs"
        >
          <span>
            {currentStageIndex + 1 < PUZZLE_STAGES.length ? '次のステージへ' : 'トータル結果へ'}
          </span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>

        <button
          type="button"
          onClick={onRetrySameStagePractice}
          className="min-h-10 px-2.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium text-xs border border-zinc-200 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5 shrink-0" />
          <span>もう一度プレイ</span>
        </button>

        <button
          type="button"
          onClick={onGoToSummary}
          className="min-h-10 px-2.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium text-xs border border-zinc-200 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
        >
          <Award className="w-3.5 h-3.5 shrink-0" />
          <span>スコア一覧</span>
        </button>
      </div>
    </div>
  );
};
