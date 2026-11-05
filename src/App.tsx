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
  Zap,
  Trophy,
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
import { getStageCanonicalKana, generateMinhayaChoices } from './utils/minhayaChoices';
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
    // ⚔️ 歴史の偉人・英雄・古代（信長・秀吉・家康・龍馬・西郷・聖徳太子・ニュートン・エジソン・ダヴィンチ等 全30問）
    const targetIds = [
      4, 12, 51, 9, 11, 10, 55, 52, 53, 56, 57, 58, 54, 49, 50,
      131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145,
    ];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'WORLD_MASTERPIECES') {
    // 🎨 世界の傑作名画・至宝（モナリザ・星月夜・最後の晩餐・ひまわり・叫び・波裏・ゲルニカ・睡蓮・接吻等 全21問）
    const targetIds = [
      13, 60, 59, 14, 15, 5, 16, 61, 62, 63, 64,
      146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
    ];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'RETRO_PIXEL_ART') {
    // 👾 道具・アート・科学（王冠・盾・コイン・聖剣・ギター・バイオリン・天体望遠鏡・顕微鏡・そろばん等 全35問）
    const targetIds = [
      93, 94, 95, 96, 97, 6, 24, 25, 26, 27, 28, 98, 99, 100, 29, 30, 31, 32, 33, 34,
      156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
    ];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'WORLD_HERITAGE') {
    // 🏛️ 世界遺産＆地球の名所（姫路城・雷門・金閣寺・万里の長城・ピサの斜塔・スフィンクス・パルテノン・モアイ像等 全35問）
    const targetIds = [
      66, 65, 67, 71, 69, 70, 68, 8, 7, 17, 18, 20, 19, 37, 38, 39,
      101, 102, 103, 104, 105, 106, 107, 108, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126,
    ];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'SPACE_AND_NATURE' || course === 'SPACE_VEHICLES') {
    // 🌌 宇宙・大自然・動物（地球・月・木星・土星・太陽・クジラ・恐竜・カブトムシ・キリン・ゾウ等 全35問）
    const targetIds = [
      79, 36, 80, 35, 82, 81, 72, 73, 74, 75, 76, 78, 77, 21, 22, 23,
      186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 171, 172, 173, 174, 175, 176, 177, 178,
    ];
    return targetIds
      .map((id) => PUZZLE_STAGES.find((st) => st.id === id))
      .filter((st): st is PuzzleStage => Boolean(st));
  }
  if (course === 'VEHICLES_AND_FOODS' || course === 'FOODS_AND_LIFE') {
    // 🍔 乗り物＆おいしいグルメ（新幹線・飛行機・パトカー・ロケット・ゴンドラ・ラーメン・カレー・寿司・ピザ等 全24問）
    const targetIds = [
      40, 41, 83, 87, 84, 85, 86, 42, 43, 89, 90, 88, 46, 45, 47, 44, 91, 92,
      129, 111, 112, 113, 114, 115,
    ];
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
  // デフォルト: RANDOM_5（全200問からランダムに5問シャッフル選出）
  const shuffled = [...PUZZLE_STAGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

function formatStopwatch(totalSec: number): string {
  const totalTenths = Math.round(Math.max(0, totalSec) * 10);
  const mins = Math.floor(totalTenths / 600);
  const secs = Math.floor((totalTenths % 600) / 10);
  const tenths = totalTenths % 10;
  if (mins > 0) {
    return `${mins}:${secs.toString().padStart(2, '0')}.${tenths}`;
  }
  return `${secs}.${tenths}s`;
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

  // --- 純粋タイムアタック・演出用状態 ---
  const [stageIntroBanner, setStageIntroBanner] = useState<string | null>(null);
  const [dropPenaltyCountdown, setDropPenaltyCountdown] = useState<number | null>(null);
  const dropIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalCourseElapsedSecRef = useRef<number>(0);

  // --- 回答・結果状態 ---
  const [inputKana, setInputKana] = useState<string>('');
  const [currentChoices, setCurrentChoices] = useState<string[]>([]);
  const [wrongPenaltyBanner, setWrongPenaltyBanner] = useState<string | null>(null);
  const [penaltyShakeKey, setPenaltyShakeKey] = useState<number>(0);
  const penaltyBannerTimerRef = useRef<number | null>(null);
  const [answerInput, setAnswerInput] = useState<string>('');
  const [answerFeedback, setAnswerFeedback] = useState<{
    type: 'EMPTY' | 'WRONG' | null;
    message: string;
  }>({ type: null, message: '' });
  const [lastChanceReason, setLastChanceReason] = useState<
    'ALL_TILES_CLEARED' | 'OUT_OF_LIVES' | 'TIME_UP'
  >('ALL_TILES_CLEARED');
  const [currentStageRecord, setCurrentStageRecord] = useState<StageScoreRecord | null>(null);
  const currentStageRecordRef = useRef<StageScoreRecord | null>(null);
  currentStageRecordRef.current = currentStageRecord;
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
  const paddleVxRef = useRef<number>(0);
  const lastPaddleXRef = useRef<number>((CANVAS_WIDTH - PADDLE_WIDTH) / 2);
  const lastPaddleTimeRef = useRef<number>(performance.now());
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
  const ballTrailRef = useRef<Array<{ x: number; y: number }>>([]);
  const paddleRecoilRef = useRef<number>(0);
  const sliceBoostTimerRef = useRef<number>(0);

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

  useEffect(() => {
    (window as any).__CURRENT_STAGE__ = currentStage;
  }, [currentStage]);

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
    ballTrailRef.current = [];
    sliceBoostTimerRef.current = 0;
    paddleRecoilRef.current = 0;
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
      totalCourseElapsedSecRef.current = stageList.slice(0, stageIdx).reduce((acc: number, st: PuzzleStage) => {
        const rec = stageRecords[st.id];
        return acc + (rec ? rec.elapsedSec : 0);
      }, 0);

      if (elapsedTimerSpanRef.current) {
        elapsedTimerSpanRef.current.textContent = formatStopwatch(totalCourseElapsedSecRef.current);
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
      setWrongPenaltyBanner(null);
      setCurrentStageRecord(null);
      setStageIntroBanner(`STAGE ${stageIdx + 1}`);
      setTimeout(() => {
        setStageIntroBanner(null);
      }, 1100);
      setPhase('READY');
    },
    [clearAllMovementInputs, createInitialTiles, prepareOffscreenArtwork, resetBallOnPaddle, stageRecords]
  );

  const triggerDropRestart = useCallback(() => {
    if (dropIntervalRef.current) clearInterval(dropIntervalRef.current);
    setDropPenaltyCountdown(3);
    soundEngine.playCountdownTick();
    setPhase('COUNTDOWN');

    let count = 3;
    dropIntervalRef.current = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setDropPenaltyCountdown(count);
        soundEngine.playCountdownTick();
      } else {
        if (dropIntervalRef.current) clearInterval(dropIntervalRef.current);
        dropIntervalRef.current = null;
        setDropPenaltyCountdown(null);
        setPhase('READY');
        soundEngine.playLaunch();
      }
    }, 450);
  }, []);

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

  // URLパラメータ（?stage=101等）による特定ステージ直接検証サポート（初回マウント時1回のみ実行）
  const initialUrlStageParsedRef = useRef<boolean>(false);
  useEffect(() => {
    if (initialUrlStageParsedRef.current) return;
    initialUrlStageParsedRef.current = true;
    const params = new URLSearchParams(window.location.search);
    const stageParam = params.get('stage');
    if (stageParam) {
      const sId = parseInt(stageParam, 10);
      const targetStage = PUZZLE_STAGES.find((s) => s.id === sId);
      if (targetStage) {
        setActiveStages([targetStage]);
        activeStagesRef.current = [targetStage];
        setStageRecords({});
        initStage(0, false, [targetStage]);
      }
    }
  }, [initStage]);

  const transitionToLastChance = useCallback(
    (reason: 'ALL_TILES_CLEARED' | 'OUT_OF_LIVES' | 'TIME_UP') => {
      clearAllMovementInputs();
      ballRef.current.vx = 0;
      ballRef.current.vy = 0;
      ballTrailRef.current = [];
      setStageMetrics(calculateStageMetrics(tilesRef.current, elapsedMsRef.current));
      setLastChanceReason(reason);
      setAnswerInput('');
      setAnswerFeedback({ type: null, message: '' });
      const st = activeStagesRef.current[currentStageIndexRef.current] || PUZZLE_STAGES[0];
      const canonical = getStageCanonicalKana(st);
      setInputKana('');
      setCurrentChoices(generateMinhayaChoices(canonical, 0, st.kanaPad));
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

      // ステージ正解クリア時は祝祭の紙吹雪コンフェッティ＆ライトフラッシュ演出を発動！
      if (isCleared) {
        flashAlphaRef.current = 0.35;
        const confettiPalette = ['#fbbf24', '#10b981', '#38bdf8', '#f43f5e', '#f59e0b'];
        for (let i = 0; i < 38; i++) {
          const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.1;
          const speed = 130 + Math.random() * 210;
          particlesRef.current.push({
            x: CANVAS_WIDTH * (0.18 + Math.random() * 0.64),
            y: TILE_AREA_HEIGHT * (0.25 + Math.random() * 0.5),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 60,
            color: confettiPalette[i % confettiPalette.length],
            alpha: 1,
            size: 4.2 + Math.random() * 2.4,
            isSquare: true,
            gravity: 240,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 11,
            aspectRatio: 0.55,
            decayRate: 0.72,
          });
        }
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
    
    // みんはや式 1文字目の4択生成
    const canonical = getStageCanonicalKana(currentStage);
    setInputKana('');
    const initialChoices = generateMinhayaChoices(canonical, 0, currentStage.kanaPad);
    setCurrentChoices(initialChoices);
    
    setPhase('ANSWERING');
    soundEngine.playAnswerOpen();
  }, [clearAllMovementInputs, currentStage]);

  const handleSelectChoice = useCallback((selectedChar: string) => {
    const canonical = getStageCanonicalKana(currentStage);
    const currentLen = inputKana.length;
    const expectedChar = canonical[currentLen];

    if (selectedChar === expectedChar) {
      // 正解文字タップ！
      const newInput = inputKana + selectedChar;
      setInputKana(newInput);
      soundEngine.playTileBreak(comboRef.current + currentLen, false);

      if (newInput.length === canonical.length) {
        // 全文字完成！大正解！！
        soundEngine.playCorrect();
        finalizeStageResult(phase === 'LAST_CHANCE' ? 'LAST_CHANCE_CORRECT' : 'NORMAL_CORRECT');
      } else {
        // 次の文字の4択を生成
        const nextChoices = generateMinhayaChoices(canonical, newInput.length, currentStage.kanaPad);
        setCurrentChoices(nextChoices);
      }
    } else {
      // 誤答文字タップ！案A：即座に+5秒加算 ＆ ブロック崩しへ強制復帰！
      soundEngine.playMiss();
      elapsedMsRef.current += 5000;
      setStageMetrics(calculateStageMetrics(tilesRef.current, elapsedMsRef.current));
      if (elapsedTimerSpanRef.current) {
        const currentTotalSec = totalCourseElapsedSecRef.current + (elapsedMsRef.current / 1000);
        elapsedTimerSpanRef.current.textContent = formatStopwatch(currentTotalSec);
      }

      setPenaltyShakeKey((prev) => prev + 1);
      triggerScreenShake(7, 220);
      setWrongPenaltyBanner('不正解！ タイム +5.0s');
      if (penaltyBannerTimerRef.current) {
        window.clearTimeout(penaltyBannerTimerRef.current);
      }
      penaltyBannerTimerRef.current = window.setTimeout(() => {
        setWrongPenaltyBanner(null);
      }, 2200);

      setInputKana('');
      setCurrentChoices([]);

      if (phase === 'LAST_CHANCE') {
        finalizeStageResult(
          lastChanceReason === 'ALL_TILES_CLEARED'
            ? 'ALL_REVEALED_UNSOLVED'
            : 'GAVE_UP_OR_FAILED'
        );
      } else {
        // ブロック崩しへ強制復帰（3, 2, 1 カウントダウン）
        setCountdownValue(3);
        setPhase('COUNTDOWN');
        soundEngine.playCountdownTick();
      }
    }
  }, [currentStage, inputKana, phase, lastChanceReason, finalizeStageResult]);

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

    // ★コアタイル破壊時やペナルティ時のスクリーンシェイク適用
    if (screenShakeRef.current.shakeX !== 0 || screenShakeRef.current.shakeY !== 0) {
      ctx.translate(screenShakeRef.current.shakeX, screenShakeRef.current.shakeY);
    }

    const isFullRevealPhase = phaseRef.current === 'STAGE_RESULT';
    const now = performance.now();

    if (isFullRevealPhase) {
      // ====================================================================
      // ★ STAGE_RESULT 専用：ミュージアム・額装ギャラリー＆クリア刻印ショーケース
      // （従来の「下半分が真っ白な余白」を根絶し、名画の額装展示＋鑑定プレートへ昇華！）
      // ====================================================================
      const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      bgGrad.addColorStop(0, '#1c1917');
      bgGrad.addColorStop(0.55, '#27272a');
      bgGrad.addColorStop(1, '#18181b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // ギャラリー外周の繊細なゴールドトリム
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.28)';
      ctx.lineWidth = 1.5;
      traceRoundedRect(ctx, 12, 12, CANVAS_WIDTH - 24, CANVAS_HEIGHT - 24, 14);
      ctx.stroke();

      // 1. 額装マット台紙（アイボリーマット＋立体ドロップシャドウ）
      const frameX = 24;
      const frameY = 26;
      const frameW = CANVAS_WIDTH - 48; // 552
      const frameH = 304;
      const matPad = 10;

      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 10;
      ctx.fillStyle = '#f5f4ef';
      traceRoundedRect(ctx, frameX, frameY, frameW, frameH, 10);
      ctx.fill();
      ctx.restore();

      // マット外縁のブラスゴールド細枠
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      traceRoundedRect(ctx, frameX, frameY, frameW, frameH, 10);
      ctx.stroke();

      // 原画の描画（額装内いっぱいに高精細描画）
      const artX = frameX + matPad;
      const artY = frameY + matPad;
      const artW = frameW - matPad * 2;
      const artH = frameH - matPad * 2;
      if (offscreenArtworkRef.current) {
        ctx.save();
        traceRoundedRect(ctx, artX, artY, artW, artH, 5);
        ctx.clip();
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(
          offscreenArtworkRef.current,
          0,
          0,
          TILE_AREA_WIDTH,
          TILE_AREA_HEIGHT,
          artX,
          artY,
          artW,
          artH
        );
        ctx.restore();

        // 絵画内側のインセットシャドウ縁
        ctx.strokeStyle = 'rgba(24, 24, 27, 0.22)';
        ctx.lineWidth = 1;
        traceRoundedRect(ctx, artX, artY, artW, artH, 5);
        ctx.stroke();
      }

      // 2. 下部ギャラリー鑑定銘板 ＆ クリアランクエンブレム（y: 350..612）
      const rec = currentStageRecordRef.current;
      const st = activeStagesRef.current[currentStageIndexRef.current] || PUZZLE_STAGES[0];
      const isSolved =
        rec &&
        (rec.resolutionType === 'NORMAL_CORRECT' || rec.resolutionType === 'LAST_CHANCE_CORRECT');

      // 鑑定プレート台座
      const plaqueX = 36;
      const plaqueY = 354;
      const plaqueW = CANVAS_WIDTH - 72;
      const plaqueH = 250;

      const pBg = ctx.createLinearGradient(0, plaqueY, 0, plaqueY + plaqueH);
      pBg.addColorStop(0, 'rgba(39, 39, 42, 0.92)');
      pBg.addColorStop(1, 'rgba(24, 24, 27, 0.96)');
      ctx.fillStyle = pBg;
      traceRoundedRect(ctx, plaqueX, plaqueY, plaqueW, plaqueH, 16);
      ctx.fill();

      ctx.strokeStyle = isSolved ? 'rgba(251, 191, 36, 0.45)' : 'rgba(148, 163, 184, 0.3)';
      ctx.lineWidth = 1.5;
      traceRoundedRect(ctx, plaqueX, plaqueY, plaqueW, plaqueH, 16);
      ctx.stroke();

      // 四隅の真鍮リベット装飾
      const rivets = [
        [plaqueX + 12, plaqueY + 12],
        [plaqueX + plaqueW - 12, plaqueY + 12],
        [plaqueX + 12, plaqueY + plaqueH - 12],
        [plaqueX + plaqueW - 12, plaqueY + plaqueH - 12],
      ];
      ctx.fillStyle = isSolved ? '#f59e0b' : '#64748b';
      for (const [rx, ry] of rivets) {
        ctx.beginPath();
        ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // ステータスヘッダーピル
      const pillW = 210;
      const pillH = 28;
      const pillX = CANVAS_WIDTH / 2 - pillW / 2;
      const pillY = plaqueY + 22;
      if (isSolved) {
        const badgeGrad = ctx.createLinearGradient(pillX, pillY, pillX + pillW, pillY + pillH);
        if (rec?.speedRank === 'S') {
          badgeGrad.addColorStop(0, '#f59e0b');
          badgeGrad.addColorStop(0.5, '#fde047');
          badgeGrad.addColorStop(1, '#d97706');
        } else {
          badgeGrad.addColorStop(0, '#10b981');
          badgeGrad.addColorStop(1, '#059669');
        }
        ctx.fillStyle = badgeGrad;
        traceRoundedRect(ctx, pillX, pillY, pillW, pillH, 14);
        ctx.fill();

        ctx.font = '900 13px "Plus Jakarta Sans", system-ui, sans-serif';
        ctx.fillStyle = rec?.speedRank === 'S' ? '#451a03' : '#ffffff';
        ctx.fillText(
          rec?.speedRank === 'S' ? '★ PERFECT CLEAR · RANK S ★' : `STAGE CLEAR · RANK ${rec?.speedRank}`,
          CANVAS_WIDTH / 2,
          pillY + pillH / 2 + 0.5
        );
      } else {
        ctx.fillStyle = 'rgba(71, 85, 105, 0.55)';
        traceRoundedRect(ctx, pillX, pillY, pillW, pillH, 14);
        ctx.fill();
        ctx.font = '700 12px "Plus Jakarta Sans", system-ui, sans-serif';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText('ARCHIVE REVEALED', CANVAS_WIDTH / 2, pillY + pillH / 2 + 0.5);
      }

      // カテゴリラベル
      const cleanCat = st.categoryLabel.replace(/[（(][^）)]*[）)]/g, '').trim();
      ctx.font = '600 13px "Noto Sans JP", sans-serif';
      ctx.fillStyle = '#a1a1aa';
      ctx.fillText(cleanCat, CANVAS_WIDTH / 2, plaqueY + 76);

      // メイン作品名・正解タイトル（主役）
      const answerMatch = st.displayAnswer.match(/^([^(（]+)([（(][^）)]+[）)])?$/);
      const mainTitle = answerMatch ? answerMatch[1].trim() : st.displayAnswer;
      const subReading = answerMatch && answerMatch[2] ? answerMatch[2].trim() : '';

      ctx.font = '900 30px "Plus Jakarta Sans", "Noto Sans JP", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(mainTitle, CANVAS_WIDTH / 2, plaqueY + 118, plaqueW - 44);

      if (subReading) {
        ctx.font = '600 15px "Noto Sans JP", sans-serif';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText(subReading, CANVAS_WIDTH / 2, plaqueY + 152, plaqueW - 44);
      }

      // 区切り装飾ライン
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(plaqueX + 48, plaqueY + 180);
      ctx.lineTo(plaqueX + plaqueW - 48, plaqueY + 180);
      ctx.stroke();

      // タイム＆獲得スコア刻印
      if (rec) {
        ctx.font = '800 16px "Plus Jakarta Sans", monospace';
        ctx.fillStyle = '#e4e4e7';
        const statText = isSolved
          ? `TIME  ${rec.elapsedSec.toFixed(1)}s     ·     SCORE  +${rec.score} pt`
          : `TIME  ${rec.elapsedSec.toFixed(1)}s     ·     SCORE  0 pt`;
        ctx.fillText(statText, CANVAS_WIDTH / 2, plaqueY + 212);
      }
      ctx.restore();
    } else {
      // ====================================================================
      // ★ 通常プレイ空間：上質なマットストーン盤面 ＆ 立体モザイクガラス ＆ 精密自機
      // ====================================================================
      const arenaGrad = ctx.createLinearGradient(0, TILE_AREA_HEIGHT, 0, CANVAS_HEIGHT);
      arenaGrad.addColorStop(0, '#eeece6');
      arenaGrad.addColorStop(0.35, '#f6f5f0');
      arenaGrad.addColorStop(1, '#eae7df');
      ctx.fillStyle = arenaGrad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // プレイコートの幾何学計器マーキング（ピンボール/アーケード盤面の品格）
      ctx.save();
      ctx.strokeStyle = 'rgba(120, 113, 108, 0.13)';
      ctx.lineWidth = 1.2;
      // センターサークルアーク
      ctx.beginPath();
      ctx.arc(CANVAS_WIDTH / 2, PADDLE_Y + 8, 150, Math.PI * 1.12, Math.PI * 1.88);
      ctx.stroke();
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(CANVAS_WIDTH / 2, PADDLE_Y + 8, 95, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.setLineDash([]);

      // 左右のサイドバンパーガイドライン（壁の反射面が直感的に視認できる）
      ctx.strokeStyle = 'rgba(120, 113, 108, 0.22)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(4, TILE_AREA_HEIGHT + 6);
      ctx.lineTo(4, CANVAS_HEIGHT - 16);
      ctx.moveTo(CANVAS_WIDTH - 4, TILE_AREA_HEIGHT + 6);
      ctx.lineTo(CANVAS_WIDTH - 4, CANVAS_HEIGHT - 16);
      ctx.stroke();
      ctx.restore();

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

      // 3. 各ゾーンのモザイク（100% / 70% / 40%）＋ 立体ガラスベベル ＋ ダメージひび割れクラック
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
        const tx = tile.x;
        const ty = tile.y;
        const tw = tile.width;
        const th = tile.height;

        if (mosaicLayer) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(mosaicLayer, sx, sy, tw, th, tx, ty, tw, th);
        }

        // 立体ガラス・セラミックタイルのベベル（上・左ハイライト、下・右シェード）
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.58)';
        ctx.beginPath();
        ctx.moveTo(tx + 0.75, ty + th - 0.75);
        ctx.lineTo(tx + 0.75, ty + 0.75);
        ctx.lineTo(tx + tw - 0.75, ty + 0.75);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(15, 23, 42, 0.34)';
        ctx.beginPath();
        ctx.moveTo(tx + tw - 0.75, ty + 0.75);
        ctx.lineTo(tx + tw - 0.75, ty + th - 0.75);
        ctx.lineTo(tx + 0.75, ty + th - 0.75);
        ctx.stroke();

        // ★ ダメージ段階に応じたガラスクラック（ひび割れ）表現（削っている手応え！）
        if (tile.hp < tile.maxHp) {
          const seed = (tile.id * 37) % 17;
          const cx = tx + tw * (0.42 + (seed % 5) * 0.04);
          const cy = ty + th * (0.44 + (seed % 3) * 0.06);

          ctx.save();
          // クラックの影（視認性担保）
          ctx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
          ctx.lineWidth = tile.hp === 1 ? 2.2 : 1.6;
          ctx.beginPath();
          if (seed % 2 === 0) {
            ctx.moveTo(tx + 6, ty + 5);
            ctx.lineTo(cx - 5, cy - 2);
            ctx.lineTo(cx + 4, cy + 5);
          } else {
            ctx.moveTo(tx + tw - 7, ty + 6);
            ctx.lineTo(cx + 4, cy - 3);
            ctx.lineTo(cx - 3, cy + 4);
          }
          if (tile.hp === 1) {
            // あと1打で割れる状態（40%）：深い放射状ひび割れ！
            ctx.moveTo(cx, cy);
            ctx.lineTo(tx + tw - 8, ty + th - 6);
            ctx.moveTo(cx - 3, cy + 2);
            ctx.lineTo(tx + 9, ty + th - 5);
          }
          ctx.stroke();

          // クラックの白いエッジ反射光
          ctx.strokeStyle = tile.hp === 1 ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.75)';
          ctx.lineWidth = tile.hp === 1 ? 1.3 : 0.9;
          ctx.stroke();

          // hp === 1 のときは「次の一撃で砕け散る」スカイブルーのインナーテンション枠
          if (tile.hp === 1) {
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
            ctx.lineWidth = 1.4;
            ctx.strokeRect(tx + 1.5, ty + 1.5, tw - 3, th - 3);
          }
          ctx.restore();
        }

        // コアゾーン（周囲8マスを一気に連鎖削りする真鍮ゴールド枠）
        if (tile.isCoreZone) {
          const pulse = 0.68 + Math.sin(now * 0.005) * 0.2;
          ctx.save();
          ctx.strokeStyle = `rgba(245, 158, 11, ${pulse})`;
          ctx.lineWidth = 2;
          ctx.strokeRect(tx + 2.5, ty + 2.5, tw - 5, th - 5);

          const bLen = 8;
          const x1 = tx + 2.5;
          const y1 = ty + 2.5;
          const x2 = tx + tw - 2.5;
          const y2 = ty + th - 2.5;
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(x1, y1 + bLen); ctx.lineTo(x1, y1); ctx.lineTo(x1 + bLen, y1);
          ctx.moveTo(x2 - bLen, y1); ctx.lineTo(x2, y1); ctx.lineTo(x2, y1 + bLen);
          ctx.moveTo(x1, y2 - bLen); ctx.lineTo(x1, y2); ctx.lineTo(x1 + bLen, y2);
          ctx.moveTo(x2 - bLen, y2); ctx.lineTo(x2, y2); ctx.lineTo(x2, y2 - bLen);
          ctx.stroke();
          ctx.restore();
        }

        // ヒット直後（160ms以内）のクリスタルフラッシュ
        const elapsedSinceHit = now - tile.lastHitAt;
        if (tile.lastHitAt > 0 && elapsedSinceHit < 160) {
          const flashAlpha = (1 - elapsedSinceHit / 160) * 0.55;
          ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
          ctx.fillRect(tx, ty, tw, th);
        }
      }

      // 0%（hp === 0）になったクリア済みウィンドウ枠（洗練されたカメラファインダー型ブラケット）
      for (const tile of tilesRef.current) {
        if (tile.hp > 0) continue;

        const rx = tile.x;
        const ry = tile.y;
        const rw = tile.width;
        const rh = tile.height;

        const elapsedSinceClear = now - tile.clearedAt;
        if (tile.clearedAt > 0 && elapsedSinceClear < 380) {
          const clearGlowAlpha = (1 - elapsedSinceClear / 380) * 0.42;
          ctx.fillStyle = `rgba(56, 189, 248, ${clearGlowAlpha})`;
          ctx.fillRect(rx, ry, rw, rh);
        }

        ctx.strokeStyle = 'rgba(14, 165, 233, 0.35)';
        ctx.lineWidth = 1;
        ctx.strokeRect(rx + 1, ry + 1, rw - 2, rh - 2);

        const cLen = 7;
        const pad = 2;
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rx + pad, ry + pad + cLen); ctx.lineTo(rx + pad, ry + pad); ctx.lineTo(rx + pad + cLen, ry + pad);
        ctx.moveTo(rx + rw - pad - cLen, ry + pad); ctx.lineTo(rx + rw - pad, ry + pad); ctx.lineTo(rx + rw - pad, ry + pad + cLen);
        ctx.moveTo(rx + pad, ry + rh - pad - cLen); ctx.lineTo(rx + pad, ry + rh - pad); ctx.lineTo(rx + pad + cLen, ry + rh - pad);
        ctx.moveTo(rx + rw - pad - cLen, ry + rh - pad); ctx.lineTo(rx + rw - pad, ry + rh - pad); ctx.lineTo(rx + rw - pad, ry + rh - pad - cLen);
        ctx.stroke();
      }

      // 写真ステージ下端の立体額装ドロップシャドウ ＆ 真鍮/スレート仕切りトリム
      const trimY = TILE_AREA_TOP + TILE_AREA_HEIGHT;
      const stageShadow = ctx.createLinearGradient(0, trimY, 0, trimY + 14);
      stageShadow.addColorStop(0, 'rgba(24, 24, 27, 0.22)');
      stageShadow.addColorStop(1, 'rgba(24, 24, 27, 0)');
      ctx.fillStyle = stageShadow;
      ctx.fillRect(0, trimY, CANVAS_WIDTH, 14);

      ctx.fillStyle = '#27272a';
      ctx.fillRect(0, trimY - 1, CANVAS_WIDTH, 2.5);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillRect(0, trimY + 1.5, CANVAS_WIDTH, 1);

      // 6. パドル走行レール ＆ 精密リフレクター自機 ＆ 発射ガイド ＆ コメットボール
      const railY = PADDLE_Y + PADDLE_HEIGHT / 2;
      ctx.strokeStyle = 'rgba(168, 162, 158, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(18, railY);
      ctx.lineTo(CANVAS_WIDTH - 18, railY);
      ctx.stroke();
      // レール両端のストッパーピン
      ctx.fillStyle = '#a8a29e';
      ctx.fillRect(15, railY - 4, 3, 8);
      ctx.fillRect(CANVAS_WIDTH - 18, railY - 4, 3, 8);

      // パドル描画（衝突時のスプリング沈み込み recoil ＆ エッジバンパー機能美）
      const px = paddleXRef.current;
      const py = PADDLE_Y + paddleRecoilRef.current;
      const isSliceActive = sliceBoostTimerRef.current > 0;

      ctx.save();
      ctx.shadowColor = 'rgba(24, 24, 27, 0.28)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;

      const pGrad = ctx.createLinearGradient(px, py, px, py + PADDLE_HEIGHT);
      if (catchAndAimModeRef.current) {
        pGrad.addColorStop(0, '#10b981');
        pGrad.addColorStop(1, '#047857');
      } else {
        pGrad.addColorStop(0, '#3f3f46');
        pGrad.addColorStop(0.45, '#18181b');
        pGrad.addColorStop(1, '#09090b');
      }
      ctx.fillStyle = pGrad;
      traceRoundedRect(ctx, px, py, PADDLE_WIDTH, PADDLE_HEIGHT, 7);
      ctx.fill();
      ctx.restore();

      // パドル両端の「アングル・エッジバンパー」（端で鋭角68度に切れるゾーンを視覚化！）
      ctx.save();
      traceRoundedRect(ctx, px, py, PADDLE_WIDTH, PADDLE_HEIGHT, 7);
      ctx.clip();
      const capW = 20;
      ctx.fillStyle = catchAndAimModeRef.current
        ? '#34d399'
        : isSliceActive
        ? '#f59e0b'
        : '#0ea5e9';
      ctx.fillRect(px, py, capW, PADDLE_HEIGHT);
      ctx.fillRect(px + PADDLE_WIDTH - capW, py, capW, PADDLE_HEIGHT);
      // バンパー区切りスリット
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(px + capW, py, 1.5, PADDLE_HEIGHT);
      ctx.fillRect(px + PADDLE_WIDTH - capW - 1.5, py, 1.5, PADDLE_HEIGHT);
      // 上部エッジのメタリック鏡面ハイライト
      ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
      ctx.fillRect(px + 4, py + 1.2, PADDLE_WIDTH - 8, 2);
      // センター照準マーカー
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.beginPath();
      ctx.arc(px + PADDLE_WIDTH / 2, py + PADDLE_HEIGHT / 2, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = catchAndAimModeRef.current ? '#059669' : '#27272a';
      ctx.lineWidth = 1.2;
      traceRoundedRect(ctx, px, py, PADDLE_WIDTH, PADDLE_HEIGHT, 7);
      ctx.stroke();

      const ball = ballRef.current;

      // 発射待機中の精密レーザーサイトガイド
      if (ball.attachedToPaddle) {
        const launchAngle = getLaunchAngleFromPaddle();
        const guideLen = 152;
        const targetX = ball.x + Math.sin(launchAngle) * guideLen;
        const targetY = ball.y - Math.cos(launchAngle) * guideLen;

        ctx.save();
        const gLine = ctx.createLinearGradient(ball.x, ball.y, targetX, targetY);
        gLine.addColorStop(0, 'rgba(2, 132, 199, 0.9)');
        gLine.addColorStop(1, 'rgba(2, 132, 199, 0.15)');
        ctx.strokeStyle = gLine;
        ctx.lineWidth = 2.2;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y - BALL_RADIUS - 3);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      } else if (ballTrailRef.current.length > 1) {
        // ★ 飛行中のボール・コメットテイル（流星の尾：スピード感と視認性が劇的向上！）
        ctx.save();
        const trail = ballTrailRef.current;
        for (let i = 0; i < trail.length; i++) {
          const pt = trail[i];
          const ratio = (i + 1) / (trail.length + 1);
          const r = BALL_RADIUS * (0.28 + ratio * 0.62);
          ctx.globalAlpha = ratio * (isSliceActive ? 0.46 : 0.32);
          ctx.fillStyle = isSliceActive ? '#f59e0b' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // ボール本体（高コントラスト金属ガラス球体）
      ctx.save();
      ctx.shadowColor = isSliceActive ? 'rgba(245, 158, 11, 0.45)' : 'rgba(15, 23, 42, 0.32)';
      ctx.shadowBlur = isSliceActive ? 12 : 8;
      ctx.shadowOffsetY = 2.5;
      const bGrad = ctx.createRadialGradient(
        ball.x - 2.8,
        ball.y - 2.8,
        1.2,
        ball.x,
        ball.y,
        BALL_RADIUS
      );
      if (isSliceActive) {
        bGrad.addColorStop(0, '#ffffff');
        bGrad.addColorStop(0.4, '#fcd34d');
        bGrad.addColorStop(1, '#d97706');
      } else {
        bGrad.addColorStop(0, '#ffffff');
        bGrad.addColorStop(0.38, '#38bdf8');
        bGrad.addColorStop(1, '#0369a1');
      }
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = isSliceActive ? '#78350f' : '#082f49';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();
    }

    // 4. モザイク破片 ＆ 祝祭コンフェッティ（回転＆重力対応パーティクル）
    if (particlesRef.current.length > 0) {
      ctx.save();
      for (const p of particlesRef.current) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        if (p.isSquare) {
          ctx.save();
          ctx.translate(p.x, p.y);
          if (p.rotation) {
            ctx.rotate(p.rotation);
          }
          const w = p.size * 2;
          const h = p.size * 2 * (p.aspectRatio || 1);
          ctx.fillRect(-w / 2, -h / 2, w, h);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // 5. フローティングポップアップ（"0% CLEAR!", "★ BLAST CHAIN! ★" 等）
    if (floatingFeedbacksRef.current.length > 0) {
      ctx.save();
      ctx.font = '900 13px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const fb of floatingFeedbacksRef.current) {
        ctx.globalAlpha = Math.max(0, Math.min(1, fb.alpha));
        ctx.strokeStyle = 'rgba(24, 24, 27, 0.9)';
        ctx.lineWidth = 4;
        ctx.strokeText(fb.text, fb.x, fb.y);
        ctx.fillStyle = fb.color;
        ctx.fillText(fb.text, fb.x, fb.y);
      }
      ctx.restore();
    }

    // 6. 衝撃波（ショックウェーブリング ＆ バウンスリップル）描画
    if (shockwavesRef.current.length > 0) {
      ctx.save();
      for (const sw of shockwavesRef.current) {
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.lineWidth = sw.maxRadius > 80 ? 3.5 : 2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 7. 全画面ライトフラッシュ
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

      // パドルヒット反動 ＆ スライスブースト演出タイマーの減衰
      if (paddleRecoilRef.current > 0) {
        paddleRecoilRef.current = Math.max(0, paddleRecoilRef.current - dt * 30);
      }
      if (sliceBoostTimerRef.current > 0) {
        sliceBoostTimerRef.current = Math.max(0, sliceBoostTimerRef.current - dt);
      }

      if (currentPhase === 'PLAYING' || currentPhase === 'READY') {
        const moveLeft = keysPressedRef.current.left || buttonHoldRef.current.left;
        const moveRight = keysPressedRef.current.right || buttonHoldRef.current.right;
        const paddleSpeed = 540;
        if (moveLeft && !moveRight) {
          paddleXRef.current = Math.max(12, paddleXRef.current - paddleSpeed * dt);
          paddleVxRef.current = -paddleSpeed;
        } else if (moveRight && !moveLeft) {
          paddleXRef.current = Math.min(
            CANVAS_WIDTH - PADDLE_WIDTH - 12,
            paddleXRef.current + paddleSpeed * dt
          );
          paddleVxRef.current = paddleSpeed;
        } else {
          paddleVxRef.current *= 0.85;
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
            const currentTotalSec = totalCourseElapsedSecRef.current + (currentTenth / 10);
            elapsedTimerSpanRef.current.textContent = formatStopwatch(currentTotalSec);
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

            // 左右壁反射（バウンスリップル付き）
            if (ball.x - BALL_RADIUS < 4) {
              ball.x = 4 + BALL_RADIUS;
              ball.vx = Math.abs(ball.vx);
              normalizeAndEnforceMinVy(true);
              soundEngine.playBounce(false);
              shockwavesRef.current.push({
                x: 6,
                y: ball.y,
                radius: 4,
                maxRadius: 28,
                alpha: 0.65,
                color: '#38bdf8',
              });
            } else if (ball.x + BALL_RADIUS > CANVAS_WIDTH - 4) {
              ball.x = CANVAS_WIDTH - 4 - BALL_RADIUS;
              ball.vx = -Math.abs(ball.vx);
              normalizeAndEnforceMinVy(true);
              soundEngine.playBounce(false);
              shockwavesRef.current.push({
                x: CANVAS_WIDTH - 6,
                y: ball.y,
                radius: 4,
                maxRadius: 28,
                alpha: 0.65,
                color: '#38bdf8',
              });
            }

            // 天井反射
            if (ball.y - BALL_RADIUS < 4) {
              ball.y = 4 + BALL_RADIUS;
              ball.vy = Math.abs(ball.vy);
              normalizeAndEnforceMinVy(true);
              soundEngine.playBounce(false);
              shockwavesRef.current.push({
                x: ball.x,
                y: 6,
                radius: 4,
                maxRadius: 28,
                alpha: 0.65,
                color: '#38bdf8',
              });
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
              paddleRecoilRef.current = 4.2;

              if (catchAndAimModeRef.current) {
                ball.attachedToPaddle = true;
                ball.attachOffsetX = Math.max(
                  -PADDLE_WIDTH * 0.4,
                  Math.min(PADDLE_WIDTH * 0.4, rawOffset)
                );
                ball.vx = 0;
                ball.vy = 0;
                ball.y = PADDLE_Y - BALL_RADIUS - 2;
                ballTrailRef.current = [];
                soundEngine.playBounce(true);
                break;
              } else {
                // 本格ブロック崩し（アルカノイド仕様）角度コントロール：
                // 1. パドルの接触位置（hitOffset: -1.0〜+1.0）に応じた非線形アングルカーブ（最大68度）
                const sign = hitOffset >= 0 ? 1 : -1;
                const absOffset = Math.abs(hitOffset);
                const maxBounceAngle = (68 * Math.PI) / 180;
                const curveRatio = Math.pow(absOffset, 1.18);
                let bounceAngle = sign * curveRatio * maxBounceAngle;

                // 2. パドルのスイング速度（スライステクニック）の反映
                const sliceImpulse = Math.max(-0.22, Math.min(0.22, (paddleVxRef.current / 750) * 0.22));
                bounceAngle = Math.max(-maxBounceAngle, Math.min(maxBounceAngle, bounceAngle + sliceImpulse));

                ball.vx = Math.sin(bounceAngle) * BASE_BALL_SPEED;
                ball.vy = -Math.cos(bounceAngle) * BASE_BALL_SPEED;
                normalizeAndEnforceMinVy(false);
                ball.y = PADDLE_Y - BALL_RADIUS - 1;

                const isSharpSlice = absOffset > 0.65 || Math.abs(sliceImpulse) > 0.12;
                if (isSharpSlice) {
                  sliceBoostTimerRef.current = 0.52;
                }

                // パドルヒット波紋 ＆ スパーク粒子（打球の手応え！）
                shockwavesRef.current.push({
                  x: ball.x,
                  y: PADDLE_Y,
                  radius: 5,
                  maxRadius: isSharpSlice ? 44 : 30,
                  alpha: 0.8,
                  color: isSharpSlice ? '#f59e0b' : '#0ea5e9',
                });
                for (let k = 0; k < (isSharpSlice ? 7 : 4); k++) {
                  const spAng = -Math.PI * (0.15 + Math.random() * 0.7);
                  const spSpd = 65 + Math.random() * 75;
                  particlesRef.current.push({
                    x: ball.x,
                    y: PADDLE_Y,
                    vx: Math.cos(spAng) * spSpd,
                    vy: Math.sin(spAng) * spSpd,
                    color: isSharpSlice ? '#fbbf24' : '#38bdf8',
                    alpha: 0.95,
                    size: isSharpSlice ? 2.8 : 2.2,
                    isSquare: false,
                    gravity: 220,
                  });
                }

                // エッジスライス時は高音の軽快なヒット音
                soundEngine.playBounce(isSharpSlice);
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
                  floatingFeedbacksRef.current.push({
                    x: tileCenterX,
                    y: tileCenterY,
                    vy: -36,
                    text: '0% CLEAR!',
                    color: '#38bdf8',
                    alpha: 1,
                  });
                }
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

              // モザイク破片エフェクト（重力落下＆回転するリアルなガラスモザイク片！）
              const isCoreBlast = hitTile.hp === 0 && hitTile.isCoreZone;
              const pCount = isCoreBlast ? 32 : hitTile.hp === 0 ? 14 : 7;
              for (let i = 0; i < pCount; i++) {
                const angle = (Math.PI * 2 * i) / pCount + Math.random() * 0.5;
                const speed = (isCoreBlast ? 130 : hitTile.hp === 0 ? 95 : 58) + Math.random() * (isCoreBlast ? 95 : 60);
                particlesRef.current.push({
                  x: hitClosestX,
                  y: hitClosestY,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed - 35,
                  color:
                    hitTile.hp === 0
                      ? hitTile.isCoreZone
                        ? '#fbbf24'
                        : '#38bdf8'
                      : '#f8fafc',
                  alpha: 0.98,
                  size: (isCoreBlast ? 4.6 : hitTile.hp === 0 ? 4.2 : 3.0) + Math.random() * 1.5,
                  isSquare: true,
                  gravity: 340,
                  rotation: Math.random() * Math.PI * 2,
                  vRot: (Math.random() - 0.5) * 14,
                  decayRate: isCoreBlast ? 1.8 : 2.3,
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

              // 落球判定: ライフ廃止・タイムロス＆3, 2, 1クイックリスタート
            if (ball.y - BALL_RADIUS > CANVAS_HEIGHT + 6) {
              soundEngine.playMiss();
              resetBallOnPaddle();
              triggerDropRestart();
              break;
            }
          }

          // 飛行中のコメットテイル座標を記録（最大9フレーム保持）
          if (!ball.attachedToPaddle && phaseRef.current === 'PLAYING') {
            ballTrailRef.current.push({ x: ball.x, y: ball.y });
            if (ballTrailRef.current.length > 9) {
              ballTrailRef.current.shift();
            }
          }
        }
      }

      if (particlesRef.current.length > 0) {
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          if (p.gravity) {
            p.vy += p.gravity * dt;
          }
          if (p.vRot !== undefined) {
            p.rotation = (p.rotation || 0) + p.vRot * dt;
          }
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= dt * (p.decayRate || 2.6);
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
    const now = performance.now();
    const dtSec = Math.max(0.008, (now - lastPaddleTimeRef.current) / 1000);
    const rawVx = (clampedX - lastPaddleXRef.current) / dtSec;
    paddleVxRef.current = paddleVxRef.current * 0.35 + rawVx * 0.65;
    lastPaddleXRef.current = clampedX;
    lastPaddleTimeRef.current = now;
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
        soundEngine.playMiss();
        elapsedMsRef.current += 3000;
        if (elapsedTimerSpanRef.current) {
          const currentTotalSec = totalCourseElapsedSecRef.current + (elapsedMsRef.current / 1000);
          elapsedTimerSpanRef.current.textContent = formatStopwatch(currentTotalSec);
        }
        setAnswerFeedback({
          type: 'WRONG',
          message: `「${rawText}」は不正解です（タイム+3秒ペナルティ加算）`,
        });
        setAnswerInput('');
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

  const priorStagesElapsedSec = activeStages.slice(0, currentStageIndex).reduce((acc, st) => {
    const rec = stageRecords[st.id];
    return acc + (rec ? rec.elapsedSec : 0);
  }, 0);

  const formatRemainingSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isGameActive = phase !== 'TITLE' && phase !== 'SUMMARY';
  const isDockExpanded =
    phase === 'ANSWERING' || phase === 'LAST_CHANCE' || phase === 'STAGE_RESULT';
  const hasCluesRevealed = stageMetrics.clearedCount > 0 || stageMetrics.damagedCount > 0;

  return (
    <div className="h-dvh w-full text-zinc-900 flex flex-col items-center justify-between select-none overflow-hidden">
      {/* アーケード計器盤（HUD）トップコンソール（1行完結・純粋タイムアタック） */}
      <header className="w-full max-w-xl h-12 px-2.5 sm:px-3 flex items-center justify-between border-b-2 border-zinc-300/90 bg-[#f6f5f1]/95 backdrop-blur-md shrink-0 shadow-[0_2px_10px_rgba(24,24,27,0.06)] z-30">
        {/* 左側: ホームタクタイルボタン または ブランドロゴ */}
        <div className="flex items-center gap-2 shrink-0">
          {isGameActive ? (
            <button
              type="button"
              onClick={() => setPhase('TITLE')}
              className="min-h-8 min-w-8 px-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 flex items-center justify-center transition cursor-pointer keycap-btn"
              title="ホームへ戻る"
              aria-label="ホームへ戻る"
            >
              <Home className="w-3.5 h-3.5" />
            </button>
          ) : (
            <BrandLogo size={20} />
          )}

          {!isGameActive && (
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-display text-xs sm:text-sm font-black tracking-tight text-zinc-900 truncate">
                MOSAIC BREAK
              </span>
              <span className="text-[11px] text-zinc-500 font-semibold hidden sm:inline">
                モザイクブレイク
              </span>
            </div>
          )}
        </div>

        {/* 中央: アーケード・ステージ進行ランプゲージ */}
        {isGameActive && (
          <div className="flex items-center gap-1.5">
            {activeStages.length <= 10 ? (
              <div className="flex items-center gap-2 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-xl shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.6)]">
                <span className="font-display text-[10px] font-black text-zinc-400 tracking-wider">
                  STG
                </span>
                <div className="flex items-center gap-1.5">
                  {activeStages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-2 rounded-xs transition-all duration-300 ${
                        idx < currentStageIndex
                          ? 'w-2.5 bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]'
                          : idx === currentStageIndex
                          ? 'w-3.5 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.85)]'
                          : 'w-2 bg-zinc-700'
                      }`}
                      title={`STAGE ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-xl font-display text-[11px] font-bold text-white shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.6)]">
                <span className="text-amber-400 font-black">STAGE {currentStageIndex + 1}</span>
                <span className="text-zinc-400 font-semibold">/ {activeStages.length}</span>
              </div>
            )}
          </div>
        )}

        {/* 右側: デジタル・ストップウォッチ計器（ペナルティ時は真紅激震シェイク！） ＆ サウンド・ポーズ */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {isGameActive && (
            <div className="relative">
              <div
                key={penaltyShakeKey}
                className={`flex items-center gap-1.5 text-xs sm:text-[13px] font-display tabular-nums font-black px-2.5 py-1 rounded-xl border transition-colors ${
                  wrongPenaltyBanner
                    ? 'bg-rose-600 border-rose-400 text-white shadow-[0_0_14px_rgba(225,29,72,0.55)] animate-penalty-shake'
                    : 'bg-zinc-900 border-zinc-800 text-white shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.65)]'
                }`}
                title="コース合計経過タイム（タイムアタック）"
              >
                <Timer
                  className={`w-3.5 h-3.5 shrink-0 ${
                    wrongPenaltyBanner ? 'text-rose-200' : 'text-amber-400'
                  }`}
                />
                <span ref={elapsedTimerSpanRef}>
                  {formatStopwatch(priorStagesElapsedSec + stageMetrics.elapsedSec)}
                </span>
              </div>

              {/* +5.0s ペナルティ加算時の赤色フローティングポップアップ */}
              {penaltyShakeKey > 0 && wrongPenaltyBanner && (
                <div
                  key={`pop-${penaltyShakeKey}`}
                  className="absolute -bottom-6 right-0 px-2 py-0.5 rounded-md bg-rose-600 text-white font-display font-black text-[11px] tabular-nums shadow-lg whitespace-nowrap pointer-events-none animate-penalty-pop z-50"
                >
                  +5.0s
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={toggleMute}
            className="min-h-8 min-w-8 px-2 rounded-xl bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition flex items-center justify-center cursor-pointer keycap-btn"
            aria-label={isMuted ? '音声をオンにする' : '音声をミュートする'}
            title={isMuted ? 'ミュート解除' : 'ミュート'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-zinc-800" />
            )}
          </button>

          {isGameActive && (
            <button
              type="button"
              disabled={phase !== 'PLAYING' && phase !== 'READY'}
              onClick={() => triggerPause('MANUAL')}
              className="min-h-8 min-w-8 px-2 rounded-xl bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 transition flex items-center justify-center cursor-pointer keycap-btn"
              aria-label="一時停止"
              title="一時停止"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* メインアプリビューポート（スクロールなし・1画面完結） */}
      <main className="w-full max-w-xl flex-1 min-h-0 flex flex-col items-center justify-between px-2.5 sm:px-3 py-2 gap-2 overflow-hidden">
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
            {/* 中央ゲーム筐体フィールド（Container Queryにより15:16でダークベゼル額縁が完全密着！） */}
            <div className="arena-viewport w-full flex-1 min-h-0 flex items-center justify-center">
              <div className="arena-bezel-box relative bg-zinc-900 p-1.5 sm:p-2 rounded-[22px] border border-zinc-800 shadow-[0_14px_32px_-8px_rgba(24,24,27,0.34),inset_0_1px_0_rgba(255,255,255,0.18)] flex items-center justify-center">
                <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-[#18181b] shadow-inner">
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
                    className="w-full h-full block cursor-pointer touch-none"
                  />

                  {/* ステージ開始コール（アーケード演出） */}
                  {stageIntroBanner && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="px-7 py-2.5 rounded-2xl bg-zinc-950/90 border-2 border-amber-400/70 text-white font-display font-black text-2xl sm:text-3xl tracking-widest shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
                        <span className="text-amber-300">{stageIntroBanner}</span>
                      </div>
                    </div>
                  )}

                  {/* ステージ正解クリア時の極印スタンプ（原画右上コーナーにドンッと刻印！） */}
                  {phase === 'STAGE_RESULT' &&
                    currentStageRecord &&
                    (currentStageRecord.resolutionType === 'NORMAL_CORRECT' ||
                      currentStageRecord.resolutionType === 'LAST_CHANCE_CORRECT') && (
                      <div className="absolute top-3.5 right-3.5 pointer-events-none z-20 animate-stamp-slam">
                        <div
                          className={`px-3 py-1 rounded-xl border-2 font-display font-black text-xs sm:text-sm tracking-wider shadow-xl flex items-center gap-1 ${
                            currentStageRecord.speedRank === 'S'
                              ? 'bg-amber-400/95 border-amber-950 text-amber-950'
                              : 'bg-emerald-500/95 border-white text-white'
                          }`}
                        >
                          <Trophy className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {currentStageRecord.speedRank === 'S' ? 'EXCELLENT!' : 'CLEAR!'}
                          </span>
                        </div>
                      </div>
                    )}

                  {/* 落球時の3, 2, 1クイックリスタートオーバーレイ */}
                  {dropPenaltyCountdown !== null && (
                    <div className="absolute inset-0 bg-zinc-950/65 backdrop-blur-xs flex flex-col items-center justify-center z-20 pointer-events-none">
                      <div className="px-3 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/50 text-[11px] font-display font-black text-rose-300 uppercase tracking-widest mb-2">
                        BALL OUT · RESTART IN
                      </div>
                      <div className="text-6xl font-black text-white font-display tabular-nums drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] animate-in zoom-in-75 duration-150">
                        {dropPenaltyCountdown}
                      </div>
                    </div>
                  )}

                  {/* 発射待機時のスマートガイド */}
                  {(phase === 'READY' ||
                    (phase === 'PLAYING' && ballRef.current.attachedToPaddle)) &&
                    dropPenaltyCountdown === null && (
                      <div className="absolute top-[63%] inset-x-0 flex flex-col items-center pointer-events-none z-10">
                        <div className="px-4 py-1.5 rounded-full bg-zinc-900/85 border border-white/15 text-white text-xs font-display font-bold backdrop-blur-xs shadow-lg flex items-center gap-1.5 animate-pulse">
                          <Play className="w-3 h-3 fill-current text-amber-300" />
                          <span>画面をタップして発射</span>
                        </div>
                      </div>
                    )}

                  {/* 再開カウントダウン ＆ 誤答+5秒ペナルティ強制送還オーバーレイ */}
                  {phase === 'COUNTDOWN' && dropPenaltyCountdown === null && (
                    <div className="absolute inset-0 bg-zinc-950/65 backdrop-blur-xs flex flex-col items-center justify-center z-20 p-4 pointer-events-none">
                      {wrongPenaltyBanner && (
                        <div className="mb-3 px-4 py-1.5 rounded-xl bg-rose-600 border-2 border-rose-300 text-white font-display font-black text-xs sm:text-sm tracking-wide shadow-[0_8px_24px_rgba(225,29,72,0.55)] animate-penalty-shake">
                          ✕ {wrongPenaltyBanner}
                        </div>
                      )}
                      <div className="text-[11px] font-display font-extrabold text-amber-300 uppercase tracking-widest mb-1">
                        再開まで
                      </div>
                      <div className="text-6xl font-black text-white font-display tabular-nums drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                        {countdownValue}
                      </div>
                    </div>
                  )}

                  {/* 一時停止オーバーレイ */}
                  {phase === 'PAUSED' && (
                    <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-20">
                      <div className="w-full max-w-xs bg-[#f6f5f1] border-2 border-zinc-300 rounded-3xl p-4 text-center space-y-3 shadow-2xl">
                        <h3 className="text-base font-black text-zinc-900">PAUSE</h3>
                        <p className="text-xs text-zinc-600 font-medium">
                          {pauseReason === 'TAB_HIDDEN' && 'タブが非表示になったため一時停止しました。'}
                          {pauseReason === 'WINDOW_BLUR' && 'フォーカスが外れたため一時停止しました。'}
                          {pauseReason === 'ORIENTATION' && '画面の向きが変わったため一時停止しました。'}
                          {pauseReason === 'MANUAL' && 'ゲームを一時停止しています。'}
                        </p>
                        <div className="flex flex-col gap-2 pt-1">
                          <button
                            type="button"
                            onClick={requestResumeFromPause}
                            className="w-full min-h-11 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs cursor-pointer keycap-dark"
                          >
                            プレイを再開
                          </button>
                          <button
                            type="button"
                            onClick={() => setPhase('TITLE')}
                            className="w-full min-h-10 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-bold border border-zinc-300 transition cursor-pointer keycap-btn"
                          >
                            ホームへ戻る
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 下部コントロールバー / アーケード回答ドック / 早押しブザーボタン */}
            <div className="w-full shrink-0 pb-0.5">
              {(phase === 'ANSWERING' || phase === 'LAST_CHANCE') && (
                <AnswerDock
                  phase={phase}
                  currentStage={currentStage}
                  targetKana={getStageCanonicalKana(currentStage)}
                  inputKana={inputKana}
                  currentChoices={currentChoices}
                  potentialNormalScore={stageMetrics.potentialNormalScore}
                  onSelectChoice={handleSelectChoice}
                  onReturnFromAnswer={handleReturnFromAnswerModal}
                  onGiveUpAndReveal={handleGiveUpAndReveal}
                />
              )}

              {phase === 'STAGE_RESULT' && currentStageRecord && (
                <StageResultDock
                  currentStage={currentStage}
                  currentStageIndex={currentStageIndex}
                  totalStagesInCourse={activeStages.length}
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
                <button
                  type="button"
                  disabled={phase !== 'PLAYING' && phase !== 'READY'}
                  onClick={handleOpenAnswerModal}
                  className={`w-full min-h-13 px-5 rounded-2xl disabled:opacity-40 font-black text-sm sm:text-base flex items-center justify-between gap-2 cursor-pointer select-none ${
                    hasCluesRevealed
                      ? 'buzzer-ready bg-gradient-to-b from-rose-500 to-rose-600 text-white border border-rose-400/60'
                      : 'buzzer-standby bg-gradient-to-b from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-850 text-white border border-zinc-700'
                  }`}
                  title="何の写真か分かった瞬間に早押し！（Enterキーでも即座に開けます）"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-inner ${
                        hasCluesRevealed
                          ? 'bg-white text-rose-600'
                          : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      }`}
                    >
                      <Zap className="w-4 h-4 fill-current" />
                    </span>
                    <span className="tracking-tight">何の写真か回答する</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-display tabular-nums text-xs sm:text-sm font-black bg-black/25 border border-white/15 px-2.5 py-0.5 rounded-lg">
                      +{stageMetrics.potentialNormalScore}pt
                    </span>
                    <span className="text-[10px] text-white/70 font-display font-bold hidden sm:inline">
                      [Enter]
                    </span>
                  </div>
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
