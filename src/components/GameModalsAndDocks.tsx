import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  ArrowRight,
  Award,
  Lightbulb,
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
  const [showInitialKanaHint, setShowInitialKanaHint] = useState<boolean>(false);

  useEffect(() => {
    setShowInitialKanaHint(false);
  }, [currentStage.id]);

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
    <div className="w-full bg-slate-900/95 border border-white/15 rounded-2xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-md space-y-1.5">
      {/* 上部ステータス＆ヒント行 */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-200 font-medium">
          <span
            className={
              phase === 'LAST_CHANCE' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'
            }
          >
            {phase === 'LAST_CHANCE'
              ? lastChanceReason === 'ALL_TILES_CLEARED'
                ? 'モザイク0%・最終回答'
                : lastChanceReason === 'OUT_OF_LIVES'
                ? 'ライフ終了・最終回答'
                : 'タイムアップ・最終回答'
              : '早押し回答（タイピング入力）'}
          </span>
          <span aria-hidden="true" className="text-slate-600">
            ·
          </span>
          <span className="font-mono tabular-nums text-sky-300 font-bold">
            +{phase === 'LAST_CHANCE' ? 100 : potentialNormalScore} pt
          </span>
          <span aria-hidden="true" className="text-slate-600">
            ·
          </span>
          <span className="font-mono tabular-nums text-slate-300 flex items-center gap-1">
            <Timer className="w-3 h-3 text-sky-400" />
            {elapsedSec.toFixed(1)}s
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            {currentStage.categoryLabel}
          </span>
          {!showInitialKanaHint ? (
            <button
              type="button"
              onClick={() => setShowInitialKanaHint(true)}
              className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 border border-white/10 flex items-center gap-1 transition cursor-pointer whitespace-nowrap"
            >
              <Lightbulb className="w-3 h-3" />
              <span>頭文字ヒント</span>
            </button>
          ) : (
            <span className="text-[11px] text-sky-300 font-semibold">
              {currentStage.initialKanaHint}
            </span>
          )}
        </div>
      </div>

      <form onSubmit={onSubmitAnswer} className="space-y-1.5">
        {/* 自由タイピング入力欄（ひらがな・カタカナ・漢字・ローマ字・英語すべて自動正規化判定） */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-0.5">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Keyboard className="w-3 h-3 text-sky-400" />
              <span>ひらがな・カタカナ・漢字・ローマ字・英語すべて対応</span>
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">
              Enterで回答送信 / Escで戻る
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
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
              placeholder="答えを打って送信（ひらがな・カナ・漢字・英語OK）"
              className="flex-1 min-h-9 sm:min-h-10 px-3 py-1 rounded-xl bg-slate-950 border border-sky-500/40 text-white placeholder-slate-500 text-xs sm:text-sm font-medium focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50"
              autoComplete="off"
            />
            {answerInput.length > 0 && (
              <button
                type="button"
                onClick={handleBackspace}
                className="min-h-9 sm:min-h-10 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-white/10 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                title="1文字消す"
              >
                <Delete className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">1字消す</span>
              </button>
            )}
            <button
              type="submit"
              className="min-h-9 sm:min-h-10 px-3.5 sm:px-4 py-1 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-[0.99] text-slate-950 font-bold text-xs sm:text-sm transition cursor-pointer whitespace-nowrap shrink-0 shadow-md shadow-sky-500/20"
            >
              回答を送信
            </button>
          </div>
        </div>

        {/* 1文字ずつ打てる16キーかなパッド（選択肢のネタバレを防ぎつつスマホでも片手で1文字ずつ打てる） */}
        <div className="bg-slate-950/80 border border-white/10 rounded-xl p-1.5 space-y-1">
          <div className="flex items-center justify-between px-1 text-[10px] text-slate-400">
            <span>かな文字パッド（1文字ずつタップ入力も可能）：</span>
            {answerInput.length > 0 && (
              <button
                type="button"
                onClick={() => setAnswerInput('')}
                className="text-rose-300 hover:text-rose-200 font-medium cursor-pointer"
              >
                入力クリア
              </button>
            )}
          </div>
          <div className="grid grid-cols-8 gap-1">
            {currentStage.kanaPad.map((kana, idx) => (
              <button
                key={`${currentStage.id}-kana-${idx}`}
                type="button"
                onClick={() => handleAppendKana(kana)}
                className="min-h-7 sm:min-h-8 rounded-lg bg-slate-800/90 hover:bg-slate-700 active:bg-sky-500 active:text-slate-950 text-slate-100 font-bold text-xs border border-white/10 transition cursor-pointer flex items-center justify-center"
              >
                {kana}
              </button>
            ))}
          </div>
        </div>

        {answerFeedback.type && (
          <div
            className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-2 ${
              answerFeedback.type === 'WRONG'
                ? 'bg-rose-950/90 border border-rose-700/80 text-rose-200'
                : 'bg-slate-800 border border-slate-700 text-slate-200'
            }`}
          >
            <XCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{answerFeedback.message}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-0.5">
          {phase === 'ANSWERING' ? (
            <button
              type="button"
              onClick={onReturnFromAnswer}
              className="min-h-8 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-white/10 transition cursor-pointer whitespace-nowrap"
            >
              ボール打ち返しに戻る
            </button>
          ) : (
            <span className="text-[11px] text-slate-400">最終回答は1回のみ送信できます</span>
          )}

          <button
            type="button"
            onClick={onGiveUpAndReveal}
            className="min-h-8 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-medium text-xs border border-white/10 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>正解を見る（0 pt）</span>
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
    <div className="w-full bg-slate-900/95 border border-white/10 rounded-2xl p-3 sm:p-3.5 shadow-2xl backdrop-blur-md space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {isCleared ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          ) : (
            <Eye className="w-6 h-6 text-sky-400 shrink-0" />
          )}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
              <span className="text-slate-200 font-semibold">
                {currentStageRecord.resolutionType === 'NORMAL_CORRECT' && '早押しクリア'}
                {currentStageRecord.resolutionType === 'LAST_CHANCE_CORRECT' && '最終回答クリア'}
                {currentStageRecord.resolutionType === 'ALL_REVEALED_UNSOLVED' && 'モザイク0%・未正解'}
                {currentStageRecord.resolutionType === 'GAVE_UP_OR_FAILED' && '正解表示'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-sky-300 font-semibold">
                タイム {currentStageRecord.elapsedSec.toFixed(1)}s
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  currentStageRecord.speedRank === 'S'
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : currentStageRecord.speedRank === 'A'
                    ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                    : 'bg-slate-800 text-slate-300 border border-white/10'
                }`}
              >
                SPEED {currentStageRecord.speedRank}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white truncate">
              正解：{currentStage.displayAnswer}
            </h3>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[10px] text-slate-400">
            {currentStageRecord.isPractice ? 'フリープレイ' : '獲得スコア'}
          </div>
          <div className="text-xl font-extrabold font-mono tabular-nums text-sky-400">
            +{currentStageRecord.score} <span className="text-xs font-normal">pt</span>
          </div>
        </div>
      </div>

      {/* 対戦・早押し用のスコア内訳＆ターゲットタイム比較バー */}
      <div className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="text-slate-300 font-mono tabular-nums">
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
              <span className="text-emerald-400 font-semibold">
                目標 {currentStageRecord.rivalTargetSec.toFixed(1)}s より {timeDiffSec.toFixed(1)}s 早い！
              </span>
            ) : (
              <span className="text-slate-400">
                目標 {currentStageRecord.rivalTargetSec.toFixed(1)}s（+{Math.abs(timeDiffSec).toFixed(1)}s）
              </span>
            )
          ) : (
            <span className="text-slate-500">
              目標タイム {currentStageRecord.rivalTargetSec.toFixed(1)}s
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-0.5">
        <button
          type="button"
          onClick={onNextStageOrSummary}
          className="min-h-10 px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
        >
          <span>
            {currentStageIndex + 1 < PUZZLE_STAGES.length ? '次のステージへ' : 'トータル結果へ'}
          </span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>

        <button
          type="button"
          onClick={onRetrySameStagePractice}
          className="min-h-10 px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-white/10 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5 shrink-0" />
          <span>もう一度プレイ</span>
        </button>

        <button
          type="button"
          onClick={onGoToSummary}
          className="min-h-10 px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-white/10 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
        >
          <Award className="w-3.5 h-3.5 shrink-0" />
          <span>スコア一覧</span>
        </button>
      </div>
    </div>
  );
};
