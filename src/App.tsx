/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Heart,
  Clock,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Home,
  CheckCircle2,
  Timer,
} from 'lucide-react';
import {
  PUZZLE_STAGES,
  PuzzleStage,
  judgeStageAnswer,
  preloadStagePhotos,
  renderStageArtworkToCanvas,
} from './data/puzzles';
import {
  GRID_COLS,
  GRID_ROWS,
  TOTAL_TILES,
  STAGE_TIME_LIMIT_SEC,
  MAX_LIVES,
  DEFAULT_MAX_HP,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  TILE_AREA_TOP,
  TILE_AREA_HEIGHT,
  TILE_AREA_LEFT,
  TILE_AREA_WIDTH,
  PADDLE_Y,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_RADIUS,
  BASE_BALL_SPEED,
  GamePhase,
  ResolutionType,
  PauseReason,
  TileState,
  StageScoreRecord,
  HitParticle,
  FloatingFeedback,
  CourseMode,
  COURSE_OPTIONS,
  calculateStageMetrics,
  getSpeedRank,
} from './types/game';
import { TitleScreen } from './components/TitleScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { AnswerDock, StageResultDock } from './components/GameModalsAndDocks';
import { BrandLogo } from './components/BrandLogo';
import { soundEngine } from './utils/sound';

function traceRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }
}

function getStagesForCourse(course: CourseMode): PuzzleStage[] {
  if (course === 'HISTORY_HEROES') {
    // ⚔️ 歴史の偉人・英雄・古代（信長・秀吉・家康・龍馬・西郷・聖徳太子・紫式部・アインシュタイン・ベートーヴェン・ナポレオン等 全15問）
    const targetIds = [4, 12, 51, 9, 11, 10, 55, 52, 53, 56, 57, 58, 54, 49, 50];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'WORLD_MASTERPIECES') {
    // 🎨 世界の傑作名画・至宝（モナリザ・星月夜・最後の晩餐・ひまわり・叫び・真珠の耳飾り・波裏・風神雷神・考える人・ヴィーナス誕生 全11問）
    const targetIds = [13, 60, 59, 14, 15, 5, 16, 61, 62, 63, 64];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'RETRO_PIXEL_ART') {
    // 👾 レトロドット絵＆モダンアート（王冠・盾・コイン・ゴースト・卵・聖剣・ポーション・宇宙船・宝箱・キノコ・ギター・砂時計・地球儀等 全20問）
    const targetIds = [93, 94, 95, 96, 97, 6, 24, 25, 26, 27, 28, 98, 99, 100, 29, 30, 31, 32, 33, 34];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'WORLD_HERITAGE') {
    // 🏛️ 世界遺産＆地球の神秘（万里の長城・タージマハル・サグラダファミリア・マチュピチュ・鳥居・エッフェル塔・金閣寺・ピラミッド・自由の女神等 全16問）
    const targetIds = [66, 65, 67, 71, 69, 70, 68, 8, 7, 17, 18, 20, 19, 37, 38, 39];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'SPACE_AND_NATURE' || course === 'SPACE_VEHICLES') {
    // 🌌 宇宙・大自然・動物（地球・月・木星・土星・太陽・キリン・ゾウ・コアラ・イルカ・トラ・シマウマ・カメレオン・パンダ・ライオン・ペンギン 全16問）
    const targetIds = [79, 36, 80, 35, 82, 81, 72, 73, 74, 75, 76, 78, 77, 21, 22, 23];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'VEHICLES_AND_FOODS' || course === 'FOODS_AND_LIFE') {
    // 🍔 乗り物＆おいしいグルメ（新幹線・飛行機・パトカー・ロケット・ラーメン・カレー・バーガー・寿司・ピザ・ケーキ等 全18問）
    const targetIds = [40, 41, 83, 87, 84, 85, 86, 42, 43, 89, 90, 88, 46, 45, 47, 44, 91, 92];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'ALL_STAGES') {
    return [...PUZZLE_STAGES];
  }
  if (course === 'RANDOM_10') {
    const shuffled = [...PUZZLE_STAGES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }
  if (course === 'RANDOM_3') {
    const shuffled = [...PUZZLE_STAGES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }
  // デフォルト: RANDOM_5（全100問からランダムに5問シャッフル選出）
  const shuffled = [...PUZZLE_STAGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

export default function App() {
  // --- 設定 ---
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
  const [catchAndAimMode, setCatchAndAimMode] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseMode>('RANDOM_5');

  // --- ゲーム進行状態 ---
  const [phase, setPhase] = useState<GamePhase>('TITLE');
  const [activeStages, setActiveStages] = useState<PuzzleStage[]>(() => getStagesForCourse('RANDOM_5'));
  const activeStagesRef = useRef<PuzzleStage[]>(activeStages);
  activeStagesRef.current = activeStages;

  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isStageReplayPractice, setIsStageReplayPractice] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(MAX_LIVES);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(STAGE_TIME_LIMIT_SEC);
  const [stageMetrics, setStageMetrics] = useState<{
    clearedCount: number;
    damagedCount: number;
    unharmedCount: number;
    remainingHp: number;
    maxTotalHp: number;
    mosaicPercent: number;
    exposurePercent: number;
    mosaicBonus: number;
    speedBonus: number;
    elapsedSec: number;
    potentialNormalScore: number;
  }>({
    clearedCount: 0,
    damagedCount: 0,
    unharmedCount: TOTAL_TILES,
    remainingHp: TOTAL_TILES * DEFAULT_MAX_HP,
    maxTotalHp: TOTAL_TILES * DEFAULT_MAX_HP,
    mosaicPercent: 100,
    exposurePercent: 0,
    mosaicBonus: 500,
    speedBonus: 200,
    elapsedSec: 0,
    potentialNormalScore: 800,
  });

  const [pauseReason, setPauseReason] = useState<PauseReason>('MANUAL');
  const [countdownValue, setCountdownValue] = useState<number>(3);
  const [phaseBeforePause, setPhaseBeforePause] = useState<'PLAYING' | 'READY'>('PLAYING');
  const phaseBeforePauseRef = useRef<'PLAYING' | 'READY'>('PLAYING');
  phaseBeforePauseRef.current = phaseBeforePause;

  // --- 回答・結果状態 ---
  const [answerInput, setAnswerInput] = useState<string>('');
  const [answerFeedback, setAnswerFeedback] = useState<{
    type: 'EMPTY' | 'WRONG' | null;
    message: string;
  }>({ type: null, message: '' });
  const [lastChanceReason, setLastChanceReason] = useState<
    'ALL_TILES_CLEARED' | 'OUT_OF_LIVES' | 'TIME_UP'
  >('ALL_TILES_CLEARED');
  const [currentStageRecord, setCurrentStageRecord] = useState<StageScoreRecord | null>(null);
  const [stageRecords, setStageRecords] = useState<Record<number, StageScoreRecord>>({});

  // --- 物理・4段階（3回ヒット制: 100% -> 70% -> 40% -> 0%クリア枠）Canvas用Ref ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // 0% モザイク（原画 100% クリア）
  const offscreenArtworkRef = useRef<HTMLCanvasElement | null>(null);
  // 100% モザイク（hp = 3）
  const offscreenMosaic100Ref = useRef<HTMLCanvasElement | null>(null);
  // 70% モザイク（hp = 2）
  const offscreenMosaic70Ref = useRef<HTMLCanvasElement | null>(null);
  // 40% モザイク（hp = 1、次は0%で割れる！）
  const offscreenMosaic40Ref = useRef<HTMLCanvasElement | null>(null);
  const scratchDownsampleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const tilesRef = useRef<TileState[]>([]);
  const paddleXRef = useRef<number>((CANVAS_WIDTH - PADDLE_WIDTH) / 2);
  const ballRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    attachedToPaddle: boolean;
    attachOffsetX: number;
  }>({
    x: CANVAS_WIDTH / 2,
    y: PADDLE_Y - BALL_RADIUS - 2,
    vx: 0,
    vy: 0,
    attachedToPaddle: true,
    attachOffsetX: 0,
  });
  const particlesRef = useRef<HitParticle[]>([]);
  const floatingFeedbacksRef = useRef<FloatingFeedback[]>([]);
  const comboRef = useRef<number>(0);

  // 画面揺れ（スクリーンシェイク）Ref: 残り時間、振幅、X/Yオフセット
  const screenShakeRef = useRef<{
    durationMs: number;
    remainingMs: number;
    magnitude: number;
    shakeX: number;
    shakeY: number;
  }>({
    durationMs: 0,
    remainingMs: 0,
    magnitude: 0,
    shakeX: 0,
    shakeY: 0,
  });

  // 衝撃波（ショックウェーブリング）＆全画面フラッシュRef
  const shockwavesRef = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      color: string;
    }>
  >([]);
  const flashAlphaRef = useRef<number>(0);

  const triggerScreenShake = useCallback((magnitude: number = 11, durationMs: number = 280) => {
    screenShakeRef.current.durationMs = durationMs;
    screenShakeRef.current.remainingMs = durationMs;
    screenShakeRef.current.magnitude = magnitude;
  }, []);
  const remainingTimeMsRef = useRef<number>(STAGE_TIME_LIMIT_SEC * 1000);
  const lastDisplayedSecRef = useRef<number>(STAGE_TIME_LIMIT_SEC);
  const elapsedMsRef = useRef<number>(0);
  const lastMetricsSecRef = useRef<number>(0);
  const lastDisplayedTenthRef = useRef<number>(0);
  // Reactの再レンダリングを発生させずにヘッダーの0.1秒ストップウォッチを滑らかに更新するDOM Ref
  const elapsedTimerSpanRef = useRef<HTMLSpanElement | null>(null);

  // 入力・ドラッグ状態Ref
  const keysPressedRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const buttonHoldRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const isSubmittingAnswerRef = useRef<boolean>(false);
  const answerInputElementRef = useRef<HTMLInputElement | null>(null);

  // 最新ステート同期用Ref
  const phaseRef = useRef<GamePhase>(phase);
  phaseRef.current = phase;
  const currentStageIndexRef = useRef<number>(currentStageIndex);
  currentStageIndexRef.current = currentStageIndex;
  const livesRef = useRef<number>(lives);
  livesRef.current = lives;
  const isPracticeModeRef = useRef<boolean>(isPracticeMode);
  isPracticeModeRef.current = isPracticeMode;
  const isStageReplayPracticeRef = useRef<boolean>(isStageReplayPractice);
  isStageReplayPracticeRef.current = isStageReplayPractice;
  const catchAndAimModeRef = useRef<boolean>(catchAndAimMode);
  catchAndAimModeRef.current = catchAndAimMode;

  const currentStage: PuzzleStage =
    activeStages[currentStageIndex] || activeStages[0] || PUZZLE_STAGES[0];

  const clearAllMovementInputs = useCallback(() => {
    keysPressedRef.current.left = false;
    keysPressedRef.current.right = false;
    buttonHoldRef.current.left = false;
    buttonHoldRef.current.right = false;
  }, []);

  /**
   * 1枚の実写写真（TILE_AREA_WIDTH × TILE_AREA_HEIGHT = 600×310）から、
   * 3回ヒット制（100% -> 70% -> 40% -> 0%原画）のモザイクレイヤーを生成する
   */
  const prepareOffscreenArtwork = useCallback((stageId: number) => {
    const photoW = TILE_AREA_WIDTH;
    const photoH = TILE_AREA_HEIGHT;

    if (!offscreenArtworkRef.current) {
      offscreenArtworkRef.current = document.createElement('canvas');
    }
    const artCanvas = offscreenArtworkRef.current;
    artCanvas.width = photoW;
    artCanvas.height = photoH;
    const artCtx = artCanvas.getContext('2d');
    if (artCtx) {
      renderStageArtworkToCanvas(artCtx, stageId, photoW, photoH);
    }

    if (!scratchDownsampleCanvasRef.current) {
      scratchDownsampleCanvasRef.current = document.createElement('canvas');
    }
    const scratchCanvas = scratchDownsampleCanvasRef.current;

    const createPixelatedLayer = (
      targetRef: React.MutableRefObject<HTMLCanvasElement | null>,
      blockSizePx: number,
      veilAlpha: number,
      artworkBlendAlpha: number = 0,
      gridLineAlpha: number = 0.2
    ) => {
      if (!targetRef.current) {
        targetRef.current = document.createElement('canvas');
      }
      const pCanvas = targetRef.current;
      pCanvas.width = photoW;
      pCanvas.height = photoH;

      const smallW = Math.max(8, Math.floor(photoW / blockSizePx));
      const smallH = Math.max(5, Math.floor(photoH / blockSizePx));
      scratchCanvas.width = smallW;
      scratchCanvas.height = smallH;

      const sCtx = scratchCanvas.getContext('2d');
      const pCtx = pCanvas.getContext('2d');
      if (sCtx && pCtx) {
        sCtx.imageSmoothingEnabled = true;
        sCtx.clearRect(0, 0, smallW, smallH);
        sCtx.drawImage(artCanvas, 0, 0, smallW, smallH);

        pCtx.clearRect(0, 0, photoW, photoH);
        pCtx.imageSmoothingEnabled = false;
        pCtx.drawImage(scratchCanvas, 0, 0, smallW, smallH, 0, 0, photoW, photoH);

        // スマート露出：原画の輪郭・ディテールをブレンド（1回ヒットでうっすら、2回ヒットでかなり鮮明に）
        if (artworkBlendAlpha > 0) {
          pCtx.save();
          pCtx.globalAlpha = artworkBlendAlpha;
          pCtx.imageSmoothingEnabled = true;
          pCtx.drawImage(artCanvas, 0, 0, photoW, photoH);
          pCtx.restore();
        }

        if (veilAlpha > 0) {
          pCtx.fillStyle = `rgba(9, 13, 22, ${veilAlpha})`;
          pCtx.fillRect(0, 0, photoW, photoH);
        }

        if (gridLineAlpha > 0) {
          pCtx.strokeStyle = `rgba(15, 23, 42, ${gridLineAlpha})`;
          pCtx.lineWidth = 1;
          pCtx.beginPath();
          for (let gx = blockSizePx; gx < photoW; gx += blockSizePx) {
            pCtx.moveTo(gx + 0.5, 0);
            pCtx.lineTo(gx + 0.5, photoH);
          }
          for (let gy = blockSizePx; gy < photoH; gy += blockSizePx) {
            pCtx.moveTo(0, gy + 0.5);
            pCtx.lineTo(photoW, gy + 0.5);
          }
          pCtx.stroke();
        }
      }
    };

    // 100%: 粗い抽象モザイク（原画透け0%）
    createPixelatedLayer(offscreenMosaic100Ref, 44, 0.12, 0.0, 0.22);
    // 70%: 中解像度モザイク ＋ 原画の輪郭がうっすら先行露出（透け28%）
    createPixelatedLayer(offscreenMosaic70Ref, 22, 0.06, 0.28, 0.16);
    // 40%: 高解像度マイクロモザイク ＋ ディテールがかなり鮮明に浮上（透け62%）
    createPixelatedLayer(offscreenMosaic40Ref, 11, 0.02, 0.62, 0.08);
  }, []);

  useEffect(() => {
    return preloadStagePhotos((loadedStageId) => {
      const activeStage =
        activeStagesRef.current[currentStageIndexRef.current] || PUZZLE_STAGES[0];
      if (activeStage.id === loadedStageId) {
        prepareOffscreenArtwork(loadedStageId);
      }
    });
  }, [prepareOffscreenArtwork]);

  // --- 6×5 モザイクゾーン配列の生成（3回ヒット制: 100% -> 70% -> 40% -> 0%クリア枠） ---
  const createInitialTiles = useCallback(
    (stage: PuzzleStage, maxHp: number = DEFAULT_MAX_HP): TileState[] => {
      const tiles: TileState[] = [];
      const tileW = TILE_AREA_WIDTH / GRID_COLS;
      const tileH = TILE_AREA_HEIGHT / GRID_ROWS;
      const coreSet = new Set(stage.coreTileIndices || []);
      let id = 0;
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          const tileId = id++;
          tiles.push({
            id: tileId,
            row,
            col,
            x: TILE_AREA_LEFT + col * tileW,
            y: TILE_AREA_TOP + row * tileH,
            width: tileW,
            height: tileH,
            maxHp,
            hp: maxHp,
            lastHitAt: 0,
            clearedAt: 0,
            isCoreZone: coreSet.has(tileId),
          });
        }
      }
      return tiles;
    },
    []
  );

  const resetBallOnPaddle = useCallback(() => {
    const paddleCenter = paddleXRef.current + PADDLE_WIDTH / 2;
    comboRef.current = 0;
    ballRef.current = {
      x: paddleCenter,
      y: PADDLE_Y - BALL_RADIUS - 2,
      vx: 0,
      vy: 0,
      attachedToPaddle: true,
      attachOffsetX: 0,
    };
  }, []);

  const getLaunchAngleFromPaddle = useCallback(() => {
    const ball = ballRef.current;
    const offsetRatio = Math.max(-0.85, Math.min(0.85, ball.attachOffsetX / (PADDLE_WIDTH / 2)));
    if (Math.abs(offsetRatio) > 0.08) {
      return offsetRatio * ((50 * Math.PI) / 180);
    }
    const paddleCenter = paddleXRef.current + PADDLE_WIDTH / 2;
    const screenRatio = (paddleCenter - CANVAS_WIDTH / 2) / (CANVAS_WIDTH / 2);
    const rawAngle = screenRatio * 0.42;
    if (Math.abs(rawAngle) < 0.22) {
      return rawAngle >= 0 ? 0.24 : -0.24;
    }
    return rawAngle;
  }, []);

  const launchBallFromPaddle = useCallback(() => {
    if (!ballRef.current.attachedToPaddle) return;
    const angle = getLaunchAngleFromPaddle();
    const speed = BASE_BALL_SPEED;
    ballRef.current.vx = Math.sin(angle) * speed;
    ballRef.current.vy = -Math.cos(angle) * speed;
    ballRef.current.attachedToPaddle = false;
    soundEngine.playLaunch();
  }, [getLaunchAngleFromPaddle]);

  const initStage = useCallback(
    (stageIdx: number, asReplayPractice: boolean, stageListOverride?: PuzzleStage[]) => {
      const stageList = stageListOverride || activeStagesRef.current;
      const targetStage = stageList[stageIdx] || stageList[0] || PUZZLE_STAGES[0];

      clearAllMovementInputs();
      prepareOffscreenArtwork(targetStage.id);
      const initialTiles = createInitialTiles(targetStage, DEFAULT_MAX_HP);
      tilesRef.current = initialTiles;
      particlesRef.current = [];
      floatingFeedbacksRef.current = [];
      comboRef.current = 0;

      paddleXRef.current = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
      resetBallOnPaddle();

      remainingTimeMsRef.current = STAGE_TIME_LIMIT_SEC * 1000;
      lastDisplayedSecRef.current = STAGE_TIME_LIMIT_SEC;
      elapsedMsRef.current = 0;
      lastMetricsSecRef.current = 0;
      lastDisplayedTenthRef.current = 0;
      if (elapsedTimerSpanRef.current) {
        elapsedTimerSpanRef.current.textContent = `0.0s / 目標${targetStage.rivalTargetSec.toFixed(1)}s`;
      }
      currentStageIndexRef.current = stageIdx;
      livesRef.current = MAX_LIVES;

      setCurrentStageIndex(stageIdx);
      setIsStageReplayPractice(asReplayPractice);
      setLives(MAX_LIVES);
      setRemainingSeconds(STAGE_TIME_LIMIT_SEC);
      setStageMetrics(calculateStageMetrics(initialTiles, 0));
      setAnswerInput('');
      setAnswerFeedback({ type: null, message: '' });
      setCurrentStageRecord(null);
      setPhase('READY');
    },
    [clearAllMovementInputs, createInitialTiles, prepareOffscreenArtwork, resetBallOnPaddle]
  );

  const startNewGame = useCallback(
    (course: CourseMode = selectedCourse) => {
      const stages = getStagesForCourse(course);
      setActiveStages(stages);
      activeStagesRef.current = stages;
      setStageRecords({});
      initStage(0, false, stages);
    },
    [initStage, selectedCourse]
  );

  const transitionToLastChance = useCallback(
    (reason: 'ALL_TILES_CLEARED' | 'OUT_OF_LIVES' | 'TIME_UP') => {
      clearAllMovementInputs();
      ballRef.current.vx = 0;
      ballRef.current.vy = 0;
      setStageMetrics(calculateStageMetrics(tilesRef.current, elapsedMsRef.current));
      setLastChanceReason(reason);
      setAnswerInput('');
      setAnswerFeedback({ type: null, message: '' });
      setPhase('LAST_CHANCE');
      soundEngine.playAnswerOpen();
    },
    [clearAllMovementInputs]
  );

  const finalizeStageResult = useCallback(
    (resolutionType: ResolutionType) => {
      clearAllMovementInputs();
      const stage =
        activeStagesRef.current[currentStageIndexRef.current] || PUZZLE_STAGES[0];
      const metrics = calculateStageMetrics(tilesRef.current, elapsedMsRef.current);
      setStageMetrics(metrics);
      const isPracticeRun = isPracticeModeRef.current || isStageReplayPracticeRef.current;
      const isCleared =
        resolutionType === 'NORMAL_CORRECT' || resolutionType === 'LAST_CHANCE_CORRECT';

      let calculatedScore = 0;
      if (resolutionType === 'NORMAL_CORRECT') {
        calculatedScore = metrics.potentialNormalScore;
      } else if (resolutionType === 'LAST_CHANCE_CORRECT') {
        calculatedScore = 100;
      } else {
        calculatedScore = 0;
      }

      const record: StageScoreRecord = {
        stageId: stage.id,
        stageTitle: stage.title,
        displayAnswer: stage.displayAnswer,
        resolutionType,
        score: calculatedScore,
        mosaicBonus: resolutionType === 'NORMAL_CORRECT' ? metrics.mosaicBonus : 0,
        speedBonus: resolutionType === 'NORMAL_CORRECT' ? metrics.speedBonus : 0,
        elapsedSec: metrics.elapsedSec,
        rivalTargetSec: stage.rivalTargetSec,
        speedRank: getSpeedRank(metrics.elapsedSec, isCleared),
        clearedTiles: metrics.clearedCount,
        damagedTiles: metrics.damagedCount,
        remainingHiddenTiles: TOTAL_TILES - metrics.clearedCount,
        remainingHp: metrics.remainingHp,
        maxTotalHp: metrics.maxTotalHp,
        mosaicPercent: metrics.mosaicPercent,
        exposurePercent: metrics.exposurePercent,
        isPractice: isPracticeRun,
      };

      setCurrentStageRecord(record);

      if (!isPracticeRun) {
        setStageRecords((prev) => {
          const existing = prev[stage.id];
          if (existing && existing.score > record.score) {
            return prev;
          }
          return { ...prev, [stage.id]: record };
        });
      }

      setPhase('STAGE_RESULT');
    },
    [clearAllMovementInputs]
  );

  const triggerPause = useCallback(
    (reason: PauseReason) => {
      const currentPhase = phaseRef.current;
      // 自動ポーズ（タブ非表示・フォーカス外れ）は実際にボールが動いている PLAYING / COUNTDOWN 時のみ作動させる
      if (reason !== 'MANUAL') {
        if (currentPhase !== 'PLAYING' && currentPhase !== 'COUNTDOWN') {
          return;
        }
      } else {
        if (currentPhase !== 'PLAYING' && currentPhase !== 'READY' && currentPhase !== 'COUNTDOWN') {
          return;
        }
      }

      clearAllMovementInputs();
      if (currentPhase === 'PLAYING' || currentPhase === 'READY') {
        setPhaseBeforePause(currentPhase);
        phaseBeforePauseRef.current = currentPhase;
      }
      setPauseReason(reason);
      setPhase('PAUSED');
    },
    [clearAllMovementInputs]
  );

  const requestResumeFromPause = useCallback(() => {
    clearAllMovementInputs();
    if (phaseBeforePauseRef.current === 'READY') {
      setPhase('READY');
      return;
    }
    setCountdownValue(3);
    setPhase('COUNTDOWN');
    soundEngine.playCountdownTick();
  }, [clearAllMovementInputs]);

  useEffect(() => {
    if (phase !== 'COUNTDOWN') return;

    if (countdownValue <= 0) {
      soundEngine.playLaunch();
      setPhase('PLAYING');
      return;
    }

    const timer = window.setTimeout(() => {
      if (countdownValue > 1) {
        soundEngine.playCountdownTick();
      }
      setCountdownValue((prev) => prev - 1);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [phase, countdownValue]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerPause('TAB_HIDDEN');
      }
    };
    const handleWindowBlur = () => {
      triggerPause('WINDOW_BLUR');
    };
    const handleOrientationChange = () => {
      triggerPause('ORIENTATION');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [triggerPause]);

  const handleOpenAnswerModal = useCallback(() => {
    const cur = phaseRef.current;
    if (cur !== 'PLAYING' && cur !== 'READY') return;
    clearAllMovementInputs();
    setPhaseBeforePause(cur);
    phaseBeforePauseRef.current = cur;
    setStageMetrics(calculateStageMetrics(tilesRef.current, elapsedMsRef.current));
    setAnswerInput('');
    setAnswerFeedback({ type: null, message: '' });
    setPhase('ANSWERING');
    soundEngine.playAnswerOpen();
  }, [clearAllMovementInputs]);

  const handleReturnFromAnswerModal = useCallback(() => {
    if (phaseRef.current !== 'ANSWERING') return;
    clearAllMovementInputs();
    setAnswerFeedback({ type: null, message: '' });
    if (phaseBeforePauseRef.current === 'READY') {
      setPhase('READY');
    } else {
      setPhase('PLAYING');
    }
  }, [clearAllMovementInputs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 日本語IME変換中（漢字変換のEnterやEscape）はゲームショートカットを誤発火させない
      if (e.isComposing || e.keyCode === 229) return;

      if (e.key === 'Escape') {
        if (phaseRef.current === 'ANSWERING') {
          e.preventDefault();
          handleReturnFromAnswerModal();
          return;
        }
      }

      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (phaseRef.current !== 'PLAYING' && phaseRef.current !== 'READY') return;

      if (e.key === 'Enter') {
        e.preventDefault();
        handleOpenAnswerModal();
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressedRef.current.left = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressedRef.current.right = true;
      } else if (e.key === ' ' && ballRef.current.attachedToPaddle) {
        e.preventDefault();
        launchBallFromPaddle();
        setPhase('PLAYING');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressedRef.current.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressedRef.current.right = false;
      }
    };

    const handleGlobalPointerCancel = () => {
      clearAllMovementInputs();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('pointercancel', handleGlobalPointerCancel);
    window.addEventListener('mouseup', handleGlobalPointerCancel);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('pointercancel', handleGlobalPointerCancel);
      window.removeEventListener('mouseup', handleGlobalPointerCancel);
    };
  }, [clearAllMovementInputs, handleOpenAnswerModal, handleReturnFromAnswerModal, launchBallFromPaddle]);

  useEffect(() => {
    if (phase === 'ANSWERING' || phase === 'LAST_CHANCE') {
      const id = window.setTimeout(() => {
        answerInputElementRef.current?.focus();
      }, 45);
      return () => window.clearTimeout(id);
    }
  }, [phase]);

  /**
   * プレイフィールド描画:
   * - 3回ヒット制（100% -> 70% -> 40% -> 0%）
   * - 0%になった四角形には「新しくクリア済みの枠（スカイブルーのウィンドウ枠＋四隅ブラケット）」を描画し、
   *   心理的・視覚的に「ここはもう0%でクリアしていてボールが貫通する」と一目で分かるようにする。
   */
  const renderPlayfield = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // ★コアタイル破壊時の「面白い程度の画面揺れ」を全体座標に適用
    if (screenShakeRef.current.shakeX !== 0 || screenShakeRef.current.shakeY !== 0) {
      ctx.translate(screenShakeRef.current.shakeX, screenShakeRef.current.shakeY);
    }

    // 1. アリーナ全体のクリーンなホワイト背景
    const arenaGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    arenaGrad.addColorStop(0, '#f8fafc');
    arenaGrad.addColorStop(0.5, '#ffffff');
    arenaGrad.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = arenaGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 2. 写真領域の下地（0%原画）描画
    if (offscreenArtworkRef.current) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(
        offscreenArtworkRef.current,
        0,
        0,
        TILE_AREA_WIDTH,
        TILE_AREA_HEIGHT,
        TILE_AREA_LEFT,
        TILE_AREA_TOP,
        TILE_AREA_WIDTH,
        TILE_AREA_HEIGHT
      );
    }

    const isFullRevealPhase = phaseRef.current === 'STAGE_RESULT';

    // 3. 各ゾーンのモザイク（100% / 70% / 40%）と、0%クリア済み枠の描画
    if (!isFullRevealPhase) {
      const now = performance.now();

      for (const tile of tilesRef.current) {
        if (tile.hp <= 0) continue;

        let mosaicLayer: HTMLCanvasElement | null = null;
        if (tile.hp >= 3) {
          mosaicLayer = offscreenMosaic100Ref.current;
        } else if (tile.hp === 2) {
          mosaicLayer = offscreenMosaic70Ref.current;
        } else {
          mosaicLayer = offscreenMosaic40Ref.current;
        }

        const sx = tile.x - TILE_AREA_LEFT;
        const sy = tile.y - TILE_AREA_TOP;

        if (mosaicLayer) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(
            mosaicLayer,
            sx,
            sy,
            tile.width,
            tile.height,
            tile.x,
            tile.y,
            tile.width,
            tile.height
          );
        }

        // 各タイルの繊細なグリッド仕切り線
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1;
        ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);

        // ★コアゾーン（0%にすると周囲4マスも1段階削るボーナス枠）のターゲット印（白背景でも見やすいアンバーゴールド）
        if (tile.isCoreZone) {
          ctx.strokeStyle = 'rgba(217, 119, 6, 0.85)';
          ctx.lineWidth = 1.6;
          ctx.strokeRect(tile.x + 2, tile.y + 2, tile.width - 4, tile.height - 4);
          ctx.fillStyle = 'rgba(254, 243, 199, 0.9)';
          traceRoundedRect(ctx, tile.x + 5, tile.y + 5, 22, 16, 4);
          ctx.fill();
          ctx.fillStyle = '#b45309';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('★', tile.x + 16, tile.y + 13.5);
        }

        // ヒット直後（150ms以内）のホワイトフラッシュ
        const elapsedSinceHit = now - tile.lastHitAt;
        if (tile.lastHitAt > 0 && elapsedSinceHit < 150) {
          const flashAlpha = (1 - elapsedSinceHit / 150) * 0.45;
          ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
          ctx.fillRect(tile.x, tile.y, tile.width, tile.height);
        }
      }

      // 0%（hp === 0）になった四角形を「クリア済みウィンドウ枠」としてくっきり囲む
      for (const tile of tilesRef.current) {
        if (tile.hp > 0) continue;

        const rx = tile.x;
        const ry = tile.y;
        const rw = tile.width;
        const rh = tile.height;

        const elapsedSinceClear = now - tile.clearedAt;
        if (tile.clearedAt > 0 && elapsedSinceClear < 350) {
          const clearGlowAlpha = (1 - elapsedSinceClear / 350) * 0.35;
          ctx.fillStyle = `rgba(14, 165, 233, ${clearGlowAlpha})`;
          ctx.fillRect(rx, ry, rw, rh);
        }

        ctx.strokeStyle = 'rgba(2, 132, 199, 0.85)';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(rx + 1.5, ry + 1.5, rw - 3, rh - 3);

        const cLen = 8;
        const pad = 2.5;
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // 左上
        ctx.moveTo(rx + pad, ry + pad + cLen);
        ctx.lineTo(rx + pad, ry + pad);
        ctx.lineTo(rx + pad + cLen, ry + pad);
        // 右上
        ctx.moveTo(rx + rw - pad - cLen, ry + pad);
        ctx.lineTo(rx + rw - pad, ry + pad);
        ctx.lineTo(rx + rw - pad, ry + pad + cLen);
        // 左下
        ctx.moveTo(rx + pad, ry + rh - pad - cLen);
        ctx.lineTo(rx + pad, ry + rh - pad);
        ctx.lineTo(rx + pad + cLen, ry + rh - pad);
        // 右下
        ctx.moveTo(rx + rw - pad - cLen, ry + rh - pad);
        ctx.lineTo(rx + rw - pad, ry + rh - pad);
        ctx.lineTo(rx + rw - pad, ry + rh - pad - cLen);
        ctx.stroke();
      }
    }

    // 写真領域の下端境界ライン
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, TILE_AREA_TOP + TILE_AREA_HEIGHT + 0.5);
    ctx.lineTo(CANVAS_WIDTH, TILE_AREA_TOP + TILE_AREA_HEIGHT + 0.5);
    ctx.stroke();

    // 4. モザイク破片パーティクル
    if (particlesRef.current.length > 0) {
      for (const p of particlesRef.current) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        if (p.isSquare) {
          ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    // 5. フローティングポップアップ（"0% CLEAR!", "★ CHAIN!" 等）白背景で視認性抜群
    if (floatingFeedbacksRef.current.length > 0) {
      ctx.save();
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const fb of floatingFeedbacksRef.current) {
        ctx.globalAlpha = Math.max(0, Math.min(1, fb.alpha));
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 4;
        ctx.strokeText(fb.text, fb.x, fb.y);
        ctx.fillStyle = fb.color;
        ctx.fillText(fb.text, fb.x, fb.y);
      }
      ctx.restore();
    }

    // 6. 下部の広いプレイフィールド上のパドル・発射ガイド・ボール
    if (!isFullRevealPhase) {
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.9)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(24, PADDLE_Y + PADDLE_HEIGHT / 2);
      ctx.lineTo(CANVAS_WIDTH - 24, PADDLE_Y + PADDLE_HEIGHT / 2);
      ctx.stroke();

      const px = paddleXRef.current;
      const py = PADDLE_Y;
      const pGrad = ctx.createLinearGradient(px, py, px, py + PADDLE_HEIGHT);
      if (catchAndAimModeRef.current) {
        pGrad.addColorStop(0, '#10b981');
        pGrad.addColorStop(1, '#059669');
      } else {
        pGrad.addColorStop(0, '#1e293b');
        pGrad.addColorStop(1, '#0f172a');
      }
      ctx.fillStyle = pGrad;
      traceRoundedRect(ctx, px, py, PADDLE_WIDTH, PADDLE_HEIGHT, 7);
      ctx.fill();

      ctx.strokeStyle = catchAndAimModeRef.current ? '#34d399' : '#475569';
      ctx.lineWidth = 1.2;
      traceRoundedRect(ctx, px, py, PADDLE_WIDTH, PADDLE_HEIGHT, 7);
      ctx.stroke();

      const ball = ballRef.current;

      if (ball.attachedToPaddle) {
        const launchAngle = getLaunchAngleFromPaddle();
        const guideLen = 145;
        const targetX = ball.x + Math.sin(launchAngle) * guideLen;
        const targetY = ball.y - Math.cos(launchAngle) * guideLen;

        ctx.save();
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.85)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y - BALL_RADIUS - 3);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ボール描画（白背景で視認性の高い、質感のあるダークスレート・ボール）
      ctx.save();
      ctx.shadowColor = 'rgba(15, 23, 42, 0.25)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      const bGrad = ctx.createRadialGradient(
        ball.x - 2.5,
        ball.y - 2.5,
        1.5,
        ball.x,
        ball.y,
        BALL_RADIUS
      );
      bGrad.addColorStop(0, '#ffffff');
      bGrad.addColorStop(0.35, '#38bdf8');
      bGrad.addColorStop(1, '#0369a1');
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#0c4a6e';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    // ★コアタイル破壊時の衝撃波（ショックウェーブリング）描画
    if (shockwavesRef.current.length > 0) {
      ctx.save();
      for (const sw of shockwavesRef.current) {
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // ★コアタイル破壊時の全画面ライトフラッシュ
    if (flashAlphaRef.current > 0) {
      ctx.save();
      ctx.fillStyle = `rgba(254, 243, 199, ${Math.min(0.42, flashAlphaRef.current)})`;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.restore();
    }

    ctx.restore();
  }, [getLaunchAngleFromPaddle]);

  // --- メイン物理＆タイマーループ ---
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const step = (now: number) => {
      const rawDt = (now - lastTimestamp) / 1000;
      lastTimestamp = now;
      const dt = Math.min(rawDt, 0.033);

      const currentPhase = phaseRef.current;

      // 画面揺れ（スクリーンシェイク）の更新（2乗減衰で鋭いインパクトと滑らかな収束）
      if (screenShakeRef.current.remainingMs > 0) {
        screenShakeRef.current.remainingMs = Math.max(
          0,
          screenShakeRef.current.remainingMs - dt * 1000
        );
        const progress =
          screenShakeRef.current.remainingMs /
          Math.max(1, screenShakeRef.current.durationMs);
        const currentMag = screenShakeRef.current.magnitude * (progress * progress);
        screenShakeRef.current.shakeX = (Math.random() * 2 - 1) * currentMag;
        screenShakeRef.current.shakeY = (Math.random() * 2 - 1) * currentMag;
      } else {
        screenShakeRef.current.shakeX = 0;
        screenShakeRef.current.shakeY = 0;
      }

      // ショックウェーブ（衝撃波リング）の更新
      if (shockwavesRef.current.length > 0) {
        for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
          const sw = shockwavesRef.current[i];
          sw.radius += dt * 450;
          sw.alpha -= dt * 2.8;
          if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
            shockwavesRef.current.splice(i, 1);
          }
        }
      }

      // 全画面ライトフラッシュの減衰
      if (flashAlphaRef.current > 0) {
        flashAlphaRef.current = Math.max(0, flashAlphaRef.current - dt * 3.2);
      }

      if (currentPhase === 'PLAYING' || currentPhase === 'READY') {
        const moveLeft = keysPressedRef.current.left || buttonHoldRef.current.left;
        const moveRight = keysPressedRef.current.right || buttonHoldRef.current.right;
        const paddleSpeed = 520;
        if (moveLeft && !moveRight) {
          paddleXRef.current = Math.max(12, paddleXRef.current - paddleSpeed * dt);
        } else if (moveRight && !moveLeft) {
          paddleXRef.current = Math.min(
            CANVAS_WIDTH - PADDLE_WIDTH - 12,
            paddleXRef.current + paddleSpeed * dt
          );
        }

        if (ballRef.current.attachedToPaddle) {
          const clampedOffset = Math.max(
            -PADDLE_WIDTH * 0.42,
            Math.min(PADDLE_WIDTH * 0.42, ballRef.current.attachOffsetX)
          );
          ballRef.current.x = paddleXRef.current + PADDLE_WIDTH / 2 + clampedOffset;
          ballRef.current.y = PADDLE_Y - BALL_RADIUS - 2;
        }
      }

      if (currentPhase === 'PLAYING') {
        // 経過タイム計測：0.1秒表示はDOM Refで直接更新し、React stateは1秒ごとまたはタイルヒット時に更新して60fpsを維持
        elapsedMsRef.current += dt * 1000;
        const currentTenth = Math.floor(elapsedMsRef.current / 100);
        if (currentTenth !== lastDisplayedTenthRef.current) {
          lastDisplayedTenthRef.current = currentTenth;
          if (elapsedTimerSpanRef.current) {
            const activeStage =
              activeStagesRef.current[currentStageIndexRef.current] || PUZZLE_STAGES[0];
            const secStr = (currentTenth / 10).toFixed(1);
            elapsedTimerSpanRef.current.textContent = `${secStr}s / 目標${activeStage.rivalTargetSec.toFixed(1)}s`;
          }
        }

        const currentWholeSec = Math.floor(elapsedMsRef.current / 1000);
        if (currentWholeSec !== lastMetricsSecRef.current) {
          lastMetricsSecRef.current = currentWholeSec;
          setStageMetrics(calculateStageMetrics(tilesRef.current, elapsedMsRef.current));
        }

        if (!isPracticeModeRef.current) {
          const nextTime = Math.max(0, remainingTimeMsRef.current - dt * 1000);
          remainingTimeMsRef.current = nextTime;
          const nextSec = Math.ceil(nextTime / 1000);
          if (nextSec !== lastDisplayedSecRef.current) {
            lastDisplayedSecRef.current = nextSec;
            setRemainingSeconds(nextSec);
          }

          if (nextTime <= 0) {
            transitionToLastChance('TIME_UP');
            renderPlayfield();
            animationFrameId = requestAnimationFrame(step);
            return;
          }
        }

        const ball = ballRef.current;
        if (!ball.attachedToPaddle) {
          const subSteps = 3;
          const subDt = dt / subSteps;

          const normalizeAndEnforceMinVy = (applyMicroJitter: boolean = true) => {
            const signX = ball.vx >= 0 ? 1 : -1;
            const signY = ball.vy >= 0 ? 1 : -1;

            // 衝突時に微細なランダム角度オフセット（約±2.5度）を加えて水平・垂直の無限往復ループを防止
            if (applyMicroJitter) {
              const jitterRad = (Math.random() - 0.5) * 0.09;
              const cosJ = Math.cos(jitterRad);
              const sinJ = Math.sin(jitterRad);
              const rx = ball.vx * cosJ - ball.vy * sinJ;
              const ry = ball.vx * sinJ + ball.vy * cosJ;
              ball.vx = Math.sign(rx) === signX ? rx : signX * Math.abs(rx);
              ball.vy = Math.sign(ry) === signY ? ry : signY * Math.abs(ry);
            }

            const minVy = 165;
            const minVx = 42;
            if (Math.abs(ball.vy) < minVy) {
              ball.vy = signY * minVy;
            }
            if (Math.abs(ball.vx) < minVx) {
              ball.vx = signX * (minVx + Math.random() * 18);
            }

            const currentMag = Math.hypot(ball.vx, ball.vy);
            if (currentMag > 0.001) {
              const scale = BASE_BALL_SPEED / currentMag;
              ball.vx *= scale;
              ball.vy *= scale;
            }
          };

          const hasAliveTileAt = (col: number, row: number): boolean => {
            if (col < 0 || col >= GRID_COLS || row < 0 || row >= GRID_ROWS) return false;
            const idx = row * GRID_COLS + col;
            const neighbor = tilesRef.current[idx];
            return Boolean(neighbor && neighbor.hp > 0);
          };

          for (let s = 0; s < subSteps; s++) {
            ball.x += ball.vx * subDt;
            ball.y += ball.vy * subDt;

            // 左右壁反射
            if (ball.x - BALL_RADIUS < 4) {
              ball.x = 4 + BALL_RADIUS;
              ball.vx = Math.abs(ball.vx);
              normalizeAndEnforceMinVy(true);
              soundEngine.playBounce(false);
            } else if (ball.x + BALL_RADIUS > CANVAS_WIDTH - 4) {
              ball.x = CANVAS_WIDTH - 4 - BALL_RADIUS;
              ball.vx = -Math.abs(ball.vx);
              normalizeAndEnforceMinVy(true);
              soundEngine.playBounce(false);
            }

            // 天井反射
            if (ball.y - BALL_RADIUS < 4) {
              ball.y = 4 + BALL_RADIUS;
              ball.vy = Math.abs(ball.vy);
              normalizeAndEnforceMinVy(true);
              soundEngine.playBounce(false);
            }

            // パドル衝突判定
            if (
              ball.vy > 0 &&
              ball.y + BALL_RADIUS >= PADDLE_Y &&
              ball.y - BALL_RADIUS <= PADDLE_Y + PADDLE_HEIGHT &&
              ball.x + BALL_RADIUS >= paddleXRef.current &&
              ball.x - BALL_RADIUS <= paddleXRef.current + PADDLE_WIDTH
            ) {
              const paddleCenter = paddleXRef.current + PADDLE_WIDTH / 2;
              const rawOffset = ball.x - paddleCenter;
              const hitOffset = Math.max(-1, Math.min(1, rawOffset / (PADDLE_WIDTH / 2)));
              comboRef.current = 0;

              if (catchAndAimModeRef.current) {
                ball.attachedToPaddle = true;
                ball.attachOffsetX = Math.max(
                  -PADDLE_WIDTH * 0.4,
                  Math.min(PADDLE_WIDTH * 0.4, rawOffset)
                );
                ball.vx = 0;
                ball.vy = 0;
                ball.y = PADDLE_Y - BALL_RADIUS - 2;
                soundEngine.playBounce(true);
                break;
              } else {
                const maxBounceAngle = (60 * Math.PI) / 180;
                const paddleJitter = (Math.random() - 0.5) * 0.08;
                const bounceAngle = Math.max(
                  -maxBounceAngle,
                  Math.min(maxBounceAngle, hitOffset * maxBounceAngle + paddleJitter)
                );

                ball.vx = Math.sin(bounceAngle) * BASE_BALL_SPEED;
                ball.vy = -Math.cos(bounceAngle) * BASE_BALL_SPEED;
                normalizeAndEnforceMinVy(false);
                ball.y = PADDLE_Y - BALL_RADIUS - 1;
                soundEngine.playBounce(true);
              }
            }

            // モザイクゾーンとの衝突判定
            let hitTile: TileState | null = null;
            let bestDistSq = Infinity;
            let hitClosestX = 0;
            let hitClosestY = 0;

            for (const tile of tilesRef.current) {
              if (tile.hp <= 0) continue;

              const closestX = Math.max(tile.x, Math.min(ball.x, tile.x + tile.width));
              const closestY = Math.max(tile.y, Math.min(ball.y, tile.y + tile.height));
              const distX = ball.x - closestX;
              const distY = ball.y - closestY;
              const distSq = distX * distX + distY * distY;

              if (distSq <= BALL_RADIUS * BALL_RADIUS && distSq < bestDistSq) {
                bestDistSq = distSq;
                hitTile = tile;
                hitClosestX = closestX;
                hitClosestY = closestY;
              }
            }

            if (hitTile) {
              hitTile.hp = Math.max(0, hitTile.hp - 1);
              hitTile.lastHitAt = now;
              comboRef.current += 1;

              const tileCenterX = hitTile.x + hitTile.width / 2;
              const tileCenterY = hitTile.y + hitTile.height / 2;

              if (hitTile.hp === 0) {
                hitTile.clearedAt = now;

                // ★コアゾーンを0%にした場合、面白い程度の画面揺れ＆衝撃波＆重低音＆周囲8マス連鎖削り！
                if (hitTile.isCoreZone) {
                  triggerScreenShake(12, 280);
                  flashAlphaRef.current = 0.38;
                  shockwavesRef.current.push({
                    x: tileCenterX,
                    y: tileCenterY,
                    radius: 12,
                    maxRadius: 190,
                    alpha: 1,
                    color: '#f59e0b',
                  });
                  soundEngine.playCoreBlast();

                  // 周囲8マス（3×3）のモザイクを一気に連鎖削り
                  const neighbors = [
                    { c: hitTile.col - 1, r: hitTile.row - 1 },
                    { c: hitTile.col,     r: hitTile.row - 1 },
                    { c: hitTile.col + 1, r: hitTile.row - 1 },
                    { c: hitTile.col - 1, r: hitTile.row },
                    { c: hitTile.col + 1, r: hitTile.row },
                    { c: hitTile.col - 1, r: hitTile.row + 1 },
                    { c: hitTile.col,     r: hitTile.row + 1 },
                    { c: hitTile.col + 1, r: hitTile.row + 1 },
                  ];
                  for (const nb of neighbors) {
                    if (nb.c >= 0 && nb.c < GRID_COLS && nb.r >= 0 && nb.r < GRID_ROWS) {
                      const nbTile = tilesRef.current[nb.r * GRID_COLS + nb.c];
                      if (nbTile && nbTile.hp > 0) {
                        nbTile.hp = Math.max(0, nbTile.hp - 1);
                        nbTile.lastHitAt = now;
                        if (nbTile.hp === 0) {
                          nbTile.clearedAt = now;
                        }
                        // 連鎖で削られたマスからも破片を吹き飛ばす
                        for (let k = 0; k < 4; k++) {
                          const angle = Math.random() * Math.PI * 2;
                          const spd = 65 + Math.random() * 55;
                          particlesRef.current.push({
                            x: nbTile.x + nbTile.width / 2,
                            y: nbTile.y + nbTile.height / 2,
                            vx: Math.cos(angle) * spd,
                            vy: Math.sin(angle) * spd,
                            color: nbTile.hp === 0 ? '#38bdf8' : '#e2e8f0',
                            alpha: 0.9,
                            size: 2.8,
                            isSquare: true,
                          });
                        }
                      }
                    }
                  }
                  floatingFeedbacksRef.current.push({
                    x: tileCenterX,
                    y: tileCenterY,
                    vy: -48,
                    text: '★ BLAST CHAIN! ★',
                    color: '#fbbf24',
                    alpha: 1,
                  });
                } else {
                  // 通常タイルの0%完全破壊時も、心地よい軽微な揺れ
                  triggerScreenShake(3.5, 120);
                  soundEngine.playTileBreak(comboRef.current, true);
                  floatingFeedbacksRef.current.push({
                    x: tileCenterX,
                    y: tileCenterY,
                    vy: -36,
                    text: '0% CLEAR!',
                    color: '#38bdf8',
                    alpha: 1,
                  });
                }
              } else {
                const nextPct = hitTile.hp === 2 ? '70%' : '40%';
                soundEngine.playTileBreak(comboRef.current, false);
                floatingFeedbacksRef.current.push({
                  x: tileCenterX,
                  y: tileCenterY,
                  vy: -28,
                  text: nextPct,
                  color: '#e2e8f0',
                  alpha: 0.9,
                });
              }

              const overlapX = hitTile.width / 2 + BALL_RADIUS - Math.abs(ball.x - tileCenterX);
              const overlapY = hitTile.height / 2 + BALL_RADIUS - Math.abs(ball.y - tileCenterY);

              const dirX = ball.x < tileCenterX ? -1 : 1;
              const dirY = ball.y < tileCenterY ? -1 : 1;
              const blockedHorizontally = hasAliveTileAt(hitTile.col + dirX, hitTile.row);
              const blockedVertically = hasAliveTileAt(hitTile.col, hitTile.row + dirY);

              const resolveHorizontally =
                (overlapX < overlapY && !blockedHorizontally) || blockedVertically;

              if (resolveHorizontally) {
                if (dirX < 0) {
                  ball.x = hitTile.x - BALL_RADIUS - 0.5;
                  ball.vx = -Math.abs(ball.vx);
                } else {
                  ball.x = hitTile.x + hitTile.width + BALL_RADIUS + 0.5;
                  ball.vx = Math.abs(ball.vx);
                }
              } else {
                if (dirY < 0) {
                  ball.y = hitTile.y - BALL_RADIUS - 0.5;
                  ball.vy = -Math.abs(ball.vy);
                } else {
                  ball.y = hitTile.y + hitTile.height + BALL_RADIUS + 0.5;
                  ball.vy = Math.abs(ball.vy);
                }
              }
              normalizeAndEnforceMinVy(true);

              // モザイク破片エフェクト（★コアタイル破壊時は32個のゴールドスパークが爆散！）
              const isCoreBlast = hitTile.hp === 0 && hitTile.isCoreZone;
              const pCount = isCoreBlast ? 32 : hitTile.hp === 0 ? 12 : 6;
              for (let i = 0; i < pCount; i++) {
                const angle = (Math.PI * 2 * i) / pCount + Math.random() * 0.5;
                const speed = (isCoreBlast ? 120 : hitTile.hp === 0 ? 85 : 50) + Math.random() * (isCoreBlast ? 90 : 55);
                particlesRef.current.push({
                  x: hitClosestX,
                  y: hitClosestY,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  color:
                    hitTile.hp === 0
                      ? hitTile.isCoreZone
                        ? '#fbbf24'
                        : '#38bdf8'
                      : '#e2e8f0',
                  alpha: 0.95,
                  size: (isCoreBlast ? 4.5 : hitTile.hp === 0 ? 4 : 2.8) + Math.random() * 1.5,
                  isSquare: true,
                });
              }

              const nextMetrics = calculateStageMetrics(tilesRef.current, elapsedMsRef.current);
              setStageMetrics(nextMetrics);

              if (hitTile.hp === 0) {
                if (!hitTile.isCoreZone) {
                  soundEngine.playTileBreak(nextMetrics.clearedCount, true);
                }
              } else {
                soundEngine.playTileBreak(
                  nextMetrics.clearedCount + nextMetrics.damagedCount,
                  false
                );
              }

              if (nextMetrics.clearedCount >= TOTAL_TILES) {
                transitionToLastChance('ALL_TILES_CLEARED');
              }
            }

            if (phaseRef.current !== 'PLAYING') break;

            // 落球判定
            if (ball.y - BALL_RADIUS > CANVAS_HEIGHT + 6) {
              const nextLives = livesRef.current - 1;
              livesRef.current = nextLives;
              setLives(nextLives);
              soundEngine.playMiss();

              if (nextLives <= 0) {
                transitionToLastChance('OUT_OF_LIVES');
              } else {
                resetBallOnPaddle();
                setPhase('READY');
              }
              break;
            }
          }
        }
      }

      if (particlesRef.current.length > 0) {
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= dt * 2.6;
          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
          }
        }
      }

      if (floatingFeedbacksRef.current.length > 0) {
        for (let i = floatingFeedbacksRef.current.length - 1; i >= 0; i--) {
          const fb = floatingFeedbacksRef.current[i];
          fb.y += fb.vy * dt;
          fb.alpha -= dt * 1.45;
          if (fb.alpha <= 0) {
            floatingFeedbacksRef.current.splice(i, 1);
          }
        }
      }

      renderPlayfield();
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [renderPlayfield, resetBallOnPaddle, transitionToLastChance]);

  const updatePaddleFromClientX = useCallback((clientX: number, rect: DOMRect) => {
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const targetCenterX = ratio * CANVAS_WIDTH;
    const clampedX = Math.max(
      12,
      Math.min(CANVAS_WIDTH - PADDLE_WIDTH - 12, targetCenterX - PADDLE_WIDTH / 2)
    );
    paddleXRef.current = clampedX;
    if (ballRef.current.attachedToPaddle) {
      const clampedOffset = Math.max(
        -PADDLE_WIDTH * 0.42,
        Math.min(PADDLE_WIDTH * 0.42, ballRef.current.attachOffsetX)
      );
      ballRef.current.x = clampedX + PADDLE_WIDTH / 2 + clampedOffset;
    }
  }, []);

  const evaluateSubmittedText = (rawText: string) => {
    if (isSubmittingAnswerRef.current) return;

    const judgment = judgeStageAnswer(currentStage, rawText);

    if (judgment.isEmpty) {
      setAnswerFeedback({
        type: 'EMPTY',
        message: '回答を入力してください（ひらがな・カタカナ・漢字・英語すべて対応）。',
      });
      return;
    }

    isSubmittingAnswerRef.current = true;
    window.setTimeout(() => {
      isSubmittingAnswerRef.current = false;
    }, 250);

    if (phase === 'ANSWERING') {
      if (judgment.isCorrect) {
        soundEngine.playCorrect();
        finalizeStageResult('NORMAL_CORRECT');
      } else {
        const nextLives = livesRef.current - 1;
        livesRef.current = nextLives;
        setLives(nextLives);
        soundEngine.playMiss();

        if (nextLives <= 0) {
          transitionToLastChance('OUT_OF_LIVES');
        } else {
          setAnswerFeedback({
            type: 'WRONG',
            message: `「${rawText}」は不正解です。ライフが1減少しました（残り ${nextLives}）。`,
          });
          setAnswerInput('');
        }
      }
    } else if (phase === 'LAST_CHANCE') {
      if (judgment.isCorrect) {
        soundEngine.playCorrect();
        finalizeStageResult('LAST_CHANCE_CORRECT');
      } else {
        soundEngine.playMiss();
        finalizeStageResult(
          lastChanceReason === 'ALL_TILES_CLEARED'
            ? 'ALL_REVEALED_UNSOLVED'
            : 'GAVE_UP_OR_FAILED'
        );
      }
    }
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    evaluateSubmittedText(answerInput);
  };

  const handleGiveUpAndReveal = () => {
    soundEngine.playMiss();
    const isAllCleared = tilesRef.current.every((t) => t.hp === 0);
    finalizeStageResult(isAllCleared ? 'ALL_REVEALED_UNSOLVED' : 'GAVE_UP_OR_FAILED');
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  const officialTotalScore = activeStages.reduce((acc, st) => {
    const rec = stageRecords[st.id];
    return acc + (rec && !rec.isPractice ? rec.score : 0);
  }, 0);

  const formatRemainingSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isGameActive = phase !== 'TITLE' && phase !== 'SUMMARY';
  const isDockExpanded =
    phase === 'ANSWERING' || phase === 'LAST_CHANCE' || phase === 'STAGE_RESULT';
  const hasCluesRevealed = stageMetrics.clearedCount > 0 || stageMetrics.mosaicPercent <= 88;

  return (
    <div className="h-dvh w-full bg-zinc-100 text-zinc-900 flex flex-col items-center justify-between select-none overflow-hidden">
      {/* クリーンなトップステータスバー（1行完結・ストアフロント基準） */}
      <header className="w-full max-w-xl h-12 px-3 flex items-center justify-between border-b border-zinc-200/90 bg-white/95 backdrop-blur-md shrink-0 shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
          {isGameActive ? (
            <button
              type="button"
              onClick={() => setPhase('TITLE')}
              className="min-h-8 min-w-8 px-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 flex items-center justify-center transition cursor-pointer keycap-btn"
              title="ホームへ戻る"
              aria-label="ホームへ戻る"
            >
              <Home className="w-3.5 h-3.5" />
            </button>
          ) : (
            <BrandLogo size={20} />
          )}

          {isGameActive ? (
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-700 truncate">
              <span className="font-display font-bold text-zinc-900 bg-zinc-100 border border-zinc-200/90 px-1.5 py-0.5 rounded-md text-[11px] whitespace-nowrap">
                STAGE {currentStageIndex + 1}/{activeStages.length}
              </span>
              <span aria-hidden="true" className="text-zinc-300">
                ·
              </span>
              <div className="flex items-center gap-1 font-display font-bold whitespace-nowrap text-[11px]">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    stageMetrics.mosaicPercent <= 30
                      ? 'bg-emerald-500 animate-pulse'
                      : stageMetrics.mosaicPercent <= 60
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                />
                <span className="text-zinc-500 font-normal">残</span>
                <span className="tabular-nums text-zinc-900">{stageMetrics.mosaicPercent}%</span>
              </div>
              <span aria-hidden="true" className="text-zinc-300 hidden sm:inline">
                ·
              </span>
              <span
                className="font-display tabular-nums text-emerald-700 whitespace-nowrap hidden sm:inline-flex items-center gap-1 font-semibold text-[11px]"
                title={`ライバル目標タイム: ${currentStage.rivalTargetSec.toFixed(1)}s`}
              >
                <Timer className="w-3 h-3" />
                <span ref={elapsedTimerSpanRef}>
                  {stageMetrics.elapsedSec.toFixed(1)}s / 目標{currentStage.rivalTargetSec.toFixed(1)}s
                </span>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-display text-xs sm:text-sm font-extrabold tracking-tight text-zinc-900 truncate">
                MOSAIC BREAK
              </span>
              <span className="text-[11px] text-zinc-400 font-medium hidden sm:inline">
                モザイクブレイク
              </span>
            </div>
          )}
        </div>

        {/* 右側メトリクス＆ユーティリティ */}
        <div className="flex items-center gap-2 shrink-0">
          {isGameActive && (
            <>
              <div className="flex items-center gap-0.5" aria-label={`ライフ ${lives}`}>
                {Array.from({ length: MAX_LIVES }).map((_, idx) => (
                  <Heart
                    key={idx}
                    className={`w-3.5 h-3.5 transition ${
                      idx < lives
                        ? 'text-rose-500 fill-rose-500 drop-shadow-[0_1px_2px_rgba(244,63,94,0.3)]'
                        : 'text-zinc-300 fill-zinc-200'
                    }`}
                  />
                ))}
              </div>

              <span aria-hidden="true" className="text-zinc-300">
                ·
              </span>

              <div
                className={`flex items-center gap-1 text-xs font-display tabular-nums font-bold ${
                  !isPracticeMode && remainingSeconds <= 15
                    ? 'text-rose-600 animate-pulse'
                    : 'text-zinc-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>{isPracticeMode ? 'FREE' : formatRemainingSeconds(remainingSeconds)}</span>
              </div>

              <button
                type="button"
                onClick={() => setCatchAndAimMode((prev) => !prev)}
                className={`min-h-8 px-2 rounded-lg text-[11px] font-semibold border transition flex items-center gap-1 cursor-pointer whitespace-nowrap keycap-btn ${
                  catchAndAimMode
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-600'
                }`}
                title="パドルでボールをキャッチして狙い撃ちするモード"
              >
                <Crosshair className="w-3 h-3" />
                <span className="hidden sm:inline">ホールド</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={toggleMute}
            className="min-h-8 min-w-8 px-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 hover:bg-zinc-200 transition flex items-center justify-center cursor-pointer keycap-btn"
            aria-label={isMuted ? '音声をオンにする' : '音声をミュートする'}
            title={isMuted ? 'ミュート解除' : 'ミュート'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
            )}
          </button>

          {isGameActive && (
            <button
              type="button"
              disabled={phase !== 'PLAYING' && phase !== 'READY'}
              onClick={() => triggerPause('MANUAL')}
              className="min-h-8 min-w-8 px-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 hover:bg-zinc-200 disabled:opacity-40 transition flex items-center justify-center cursor-pointer keycap-btn"
              aria-label="一時停止"
              title="一時停止"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* メインアプリビューポート（スクロールなし・1画面完結） */}
      <main className="w-full max-w-xl flex-1 min-h-0 flex flex-col items-center justify-between px-2.5 sm:px-3 py-2 gap-1.5 overflow-hidden">
        {phase === 'TITLE' && (
          <TitleScreen
            isPracticeMode={isPracticeMode}
            setIsPracticeMode={setIsPracticeMode}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            onStartGame={() => startNewGame(selectedCourse)}
          />
        )}

        {phase === 'SUMMARY' && (
          <SummaryScreen
            activeStages={activeStages}
            stageRecords={stageRecords}
            officialTotalScore={officialTotalScore}
            onPracticeStage={(idx) => initStage(idx, true)}
            onRestartAll={() => startNewGame(selectedCourse)}
            onBackToTitle={() => setPhase('TITLE')}
          />
        )}

        {isGameActive && (
          <>
            {/* プレイ中のみ表示する進行ガイドバー（回答・結果ドロワー表示時は自動で畳んでキャンバス表示領域を最大化） */}
            {!isDockExpanded && (
              <div className="w-full px-3 py-1 rounded-xl bg-white/95 border border-zinc-200/90 flex items-center justify-between gap-2 text-xs shrink-0 shadow-xs">
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      hasCluesRevealed ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'
                    }`}
                  />
                  <span className="text-zinc-700 truncate font-medium">
                    {hasCluesRevealed
                      ? '写真が露出中！ひらめいたら「💡 回答する」または [Enter] でクリア！'
                      : '3打で0%枠を開けて原画露出！何の写真か分かったら「回答する」'}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap shrink-0 hidden sm:inline bg-zinc-100 px-2 py-0.5 rounded-md">
                  {currentStage.categoryLabel}
                </span>
              </div>
            )}

            {/* 中央ゲームキャンバス領域 */}
            <div className="relative w-full flex-1 min-h-0 bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-xl flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                onPointerDown={(e) => {
                  if (phase !== 'PLAYING' && phase !== 'READY') return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  updatePaddleFromClientX(e.clientX, rect);
                }}
                onPointerMove={(e) => {
                  if (phase !== 'PLAYING' && phase !== 'READY') return;
                  if (e.pointerType !== 'mouse' && e.buttons === 0 && e.pressure === 0) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  updatePaddleFromClientX(e.clientX, rect);
                }}
                onClick={() => {
                  if (
                    phase === 'READY' ||
                    (phase === 'PLAYING' && ballRef.current.attachedToPaddle)
                  ) {
                    launchBallFromPaddle();
                    setPhase('PLAYING');
                  }
                }}
                className="w-full h-full object-contain block cursor-pointer touch-none"
              />

              {/* 発射待機時のコンパクトなローンチトリガー */}
              {(phase === 'READY' ||
                (phase === 'PLAYING' && ballRef.current.attachedToPaddle)) && (
                <div className="absolute inset-x-4 bottom-14 pointer-events-none flex flex-col items-center">
                  <div className="bg-white/95 border border-zinc-200/90 rounded-2xl px-4 py-2.5 text-center shadow-xl pointer-events-auto backdrop-blur-md">
                    <div className="text-[11px] text-zinc-600 font-medium">
                      カテゴリ：<span className="text-zinc-900 font-bold">{currentStage.categoryLabel}</span>
                      <span className="mx-1.5 text-zinc-300">·</span>
                      <span className="text-amber-600 font-bold">★枠破壊で連鎖爆縮！</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        launchBallFromPaddle();
                        setPhase('PLAYING');
                      }}
                      className="mt-1.5 min-h-9 px-6 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap keycap-btn"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-sky-400" />
                      <span>タップまたは [Space] で発射</span>
                    </button>
                  </div>
                </div>
              )}

              {/* カウントダウンオーバーレイ */}
              {phase === 'COUNTDOWN' && (
                <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                  <div className="text-xs font-semibold text-blue-600 mb-1">再開まで</div>
                  <div className="text-5xl font-extrabold text-zinc-900 font-display tabular-nums">
                    {countdownValue}
                  </div>
                </div>
              )}

              {/* 一時停止オーバーレイ */}
              {phase === 'PAUSED' && (
                <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-20">
                  <div className="w-full max-w-xs bg-white border border-zinc-200 rounded-2xl p-4 text-center space-y-3 shadow-2xl">
                    <h3 className="text-base font-bold text-zinc-900">一時停止</h3>
                    <p className="text-xs text-zinc-500">
                      {pauseReason === 'TAB_HIDDEN' && 'タブが非表示になったため一時停止しました。'}
                      {pauseReason === 'WINDOW_BLUR' && 'フォーカスが外れたため一時停止しました。'}
                      {pauseReason === 'ORIENTATION' && '画面の向きが変わったため一時停止しました。'}
                      {pauseReason === 'MANUAL' && 'ゲームを一時停止しています。'}
                    </p>
                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        type="button"
                        onClick={requestResumeFromPause}
                        className="w-full min-h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs transition cursor-pointer shadow-sm keycap-btn"
                      >
                        プレイを再開
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhase('TITLE')}
                        className="w-full min-h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium border border-zinc-200 transition cursor-pointer keycap-btn"
                      >
                        ホームへ戻る
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 下部コントロールバー / ドロワー */}
            <div className="w-full shrink-0">
              {(phase === 'ANSWERING' || phase === 'LAST_CHANCE') && (
                <AnswerDock
                  phase={phase}
                  lastChanceReason={lastChanceReason}
                  currentStage={currentStage}
                  potentialNormalScore={stageMetrics.potentialNormalScore}
                  elapsedSec={stageMetrics.elapsedSec}
                  answerInput={answerInput}
                  setAnswerInput={setAnswerInput}
                  answerInputElementRef={answerInputElementRef}
                  answerFeedback={answerFeedback}
                  onSubmitAnswer={handleSubmitAnswer}
                  onReturnFromAnswer={handleReturnFromAnswerModal}
                  onGiveUpAndReveal={handleGiveUpAndReveal}
                />
              )}

              {phase === 'STAGE_RESULT' && currentStageRecord && (
                <StageResultDock
                  currentStage={currentStage}
                  currentStageIndex={currentStageIndex}
                  currentStageRecord={currentStageRecord}
                  onNextStageOrSummary={() => {
                    if (currentStageIndex + 1 < activeStages.length) {
                      initStage(currentStageIndex + 1, false);
                    } else {
                      setPhase('SUMMARY');
                    }
                  }}
                  onRetrySameStagePractice={() => initStage(currentStageIndex, true)}
                  onGoToSummary={() => setPhase('SUMMARY')}
                />
              )}

              {phase !== 'ANSWERING' && phase !== 'LAST_CHANCE' && phase !== 'STAGE_RESULT' && (
                <div className="w-full flex items-center gap-2">
                  {/* 左微調整ボタン */}
                  <button
                    type="button"
                    disabled={phase !== 'PLAYING' && phase !== 'READY'}
                    onPointerDown={(e) => {
                      e.currentTarget.setPointerCapture(e.pointerId);
                      buttonHoldRef.current.left = true;
                    }}
                    onPointerUp={() => {
                      buttonHoldRef.current.left = false;
                    }}
                    onPointerCancel={() => {
                      buttonHoldRef.current.left = false;
                    }}
                    onPointerLeave={() => {
                      buttonHoldRef.current.left = false;
                    }}
                    className="touch-drag-zone min-w-10 min-h-11 px-2.5 rounded-xl bg-white hover:bg-zinc-100 active:bg-zinc-200 border border-zinc-200 text-zinc-700 flex items-center justify-center disabled:opacity-40 transition cursor-pointer shrink-0 shadow-xs keycap-btn"
                    aria-label="左へ移動"
                    title="左へ移動"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* 右微調整ボタン */}
                  <button
                    type="button"
                    disabled={phase !== 'PLAYING' && phase !== 'READY'}
                    onPointerDown={(e) => {
                      e.currentTarget.setPointerCapture(e.pointerId);
                      buttonHoldRef.current.right = true;
                    }}
                    onPointerUp={() => {
                      buttonHoldRef.current.right = false;
                    }}
                    onPointerCancel={() => {
                      buttonHoldRef.current.right = false;
                    }}
                    onPointerLeave={() => {
                      buttonHoldRef.current.right = false;
                    }}
                    className="touch-drag-zone min-w-10 min-h-11 px-2.5 rounded-xl bg-white hover:bg-zinc-100 active:bg-zinc-200 border border-zinc-200 text-zinc-700 flex items-center justify-center disabled:opacity-40 transition cursor-pointer shrink-0 shadow-xs keycap-btn"
                    aria-label="右へ移動"
                    title="右へ移動"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* メイン: クリアへ直結する「回答する」堂々ボタン（画面の主役） */}
                  <button
                    type="button"
                    disabled={phase !== 'PLAYING' && phase !== 'READY'}
                    onClick={handleOpenAnswerModal}
                    className={`flex-1 min-h-11 px-4 rounded-xl active:scale-[0.99] disabled:opacity-40 font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap keycap-btn ${
                      hasCluesRevealed
                        ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30 ring-2 ring-emerald-400/50'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-zinc-900/20'
                    }`}
                    title="何の写真か分かった瞬間にタップ！（Enterキーでも即座に開けます）"
                  >
                    <span className="text-base">💡</span>
                    <span>何の写真か回答する</span>
                    <span className="font-display tabular-nums text-xs font-bold bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      +{stageMetrics.potentialNormalScore} pt
                    </span>
                    <span className="text-[10px] text-zinc-300 font-display font-normal hidden sm:inline">[Enter]</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
