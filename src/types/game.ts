export const GRID_COLS = 6;
export const GRID_ROWS = 5;
export const TOTAL_TILES = GRID_COLS * GRID_ROWS; // 30区画
export const STAGE_TIME_LIMIT_SEC = 90;
export const MAX_LIVES = 3;
// 3回ヒット制（100% -> 70% -> 40% -> 0%完全消去）
export const DEFAULT_MAX_HP = 3;

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 640;

export const TILE_AREA_LEFT = 0;
export const TILE_AREA_TOP = 0;
export const TILE_AREA_WIDTH = CANVAS_WIDTH; // 100px × 6列
export const TILE_AREA_HEIGHT = 310; // 62px × 5行 (y: 0 .. 310)

export const PADDLE_Y = 584;
export const PADDLE_WIDTH = 132;
export const PADDLE_HEIGHT = 14;
export const BALL_RADIUS = 8.5;
export const BASE_BALL_SPEED = 415;

export type GamePhase =
  | 'TITLE'
  | 'READY'
  | 'PLAYING'
  | 'PAUSED'
  | 'COUNTDOWN'
  | 'ANSWERING'
  | 'LAST_CHANCE'
  | 'STAGE_RESULT'
  | 'SUMMARY';

export type ResolutionType =
  | 'NORMAL_CORRECT'
  | 'LAST_CHANCE_CORRECT'
  | 'ALL_REVEALED_UNSOLVED'
  | 'GAVE_UP_OR_FAILED';

export type PauseReason = 'MANUAL' | 'TAB_HIDDEN' | 'WINDOW_BLUR' | 'ORIENTATION';

export type SpeedRank = 'S' | 'A' | 'B' | 'C';

export type CourseMode =
  | 'RANDOM_5'
  | 'RANDOM_10'
  | 'HISTORY_HEROES'
  | 'WORLD_MASTERPIECES'
  | 'RETRO_PIXEL_ART'
  | 'WORLD_HERITAGE'
  | 'SPACE_AND_NATURE'
  | 'VEHICLES_AND_FOODS'
  | 'SPACE_VEHICLES'
  | 'FOODS_AND_LIFE'
  | 'ALL_STAGES'
  | 'ANIMALS_AND_ITEMS'
  | 'RANDOM_3'
  | 'HISTORY_ART'
  | 'PIXEL_NATURE';

export interface CourseOption {
  id: CourseMode;
  title: string;
  badge: string;
  description: string;
  stageCount: number;
}

export const COURSE_OPTIONS: CourseOption[] = [
  {
    id: 'RANDOM_5',
    title: '🎲 ランダム5問',
    badge: '手軽に遊ぶ',
    description: '全200問から毎回ランダムに5問選出！スキマ時間に最適',
    stageCount: 5,
  },
  {
    id: 'RANDOM_10',
    title: '⚡ ランダム10問',
    badge: 'おすすめ',
    description: '全200問から厳選10問！多彩なジャンルが次々登場',
    stageCount: 10,
  },
  {
    id: 'HISTORY_HEROES',
    title: '⚔️ 歴史の偉人・英雄',
    badge: '原本肖像画',
    description: '信長・秀吉・家康・龍馬・西郷・聖徳太子・ニュートン・エジソン・ダヴィンチ等（全30問）',
    stageCount: 30,
  },
  {
    id: 'WORLD_MASTERPIECES',
    title: '🎨 世界の傑作名画・至宝',
    badge: '名画原本',
    description: 'モナリザ・星月夜・ひまわり・叫び・波裏・ゲルニカ・睡蓮・接吻・ミロのヴィーナス等（全21問）',
    stageCount: 21,
  },
  {
    id: 'RETRO_PIXEL_ART',
    title: '👾 道具・アート・科学',
    badge: 'レトロ＆道具',
    description: '王冠・盾・聖剣・ギター・バイオリン・天体望遠鏡・顕微鏡・そろばん・ルービックキューブ等（全35問）',
    stageCount: 35,
  },
  {
    id: 'WORLD_HERITAGE',
    title: '🏛️ 世界遺産＆地球の名所',
    badge: '実写原本',
    description: '姫路城・雷門・金閣寺・万里の長城・ピサの斜塔・スフィンクス・パルテノン・モアイ像等（全35問）',
    stageCount: 35,
  },
  {
    id: 'SPACE_AND_NATURE',
    title: '🌌 宇宙・大自然・動物',
    badge: 'NASA/実写',
    description: '地球・月・ブラックホール・土星・彗星・クジラ・恐竜・カブトムシ・キリン・ゾウ等（全35問）',
    stageCount: 35,
  },
  {
    id: 'VEHICLES_AND_FOODS',
    title: '🍔 乗り物＆おいしいグルメ',
    badge: '実写原本',
    description: '新幹線・飛行機・パトカー・ロケット・ゴンドラ・ラーメン・カレー・寿司・ピザ等（全24問）',
    stageCount: 24,
  },
  {
    id: 'ALL_STAGES',
    title: '👑 全200ステージ制覇',
    badge: '究極制覇',
    description: '歴史・名画・世界遺産・道具・自然・宇宙・グルメまで圧巻の全200問完全踏破！',
    stageCount: 200,
  },
];

export interface TileState {
  id: number;
  row: number;
  col: number;
  x: number;
  y: number;
  width: number;
  height: number;
  maxHp: number;
  hp: number; // 3(100%) -> 2(70%) -> 1(40%) -> 0(0% 原画クリア＆クリア枠表示)
  lastHitAt: number;
  clearedAt: number;
  isCoreZone?: boolean;
}

export interface StageScoreRecord {
  stageId: number;
  stageTitle: string;
  displayAnswer: string;
  resolutionType: ResolutionType;
  score: number;
  mosaicBonus: number;
  speedBonus: number;
  elapsedSec: number;
  rivalTargetSec: number;
  speedRank: SpeedRank;
  clearedTiles: number;
  damagedTiles: number;
  remainingHiddenTiles: number;
  remainingHp: number;
  maxTotalHp: number;
  mosaicPercent: number;
  exposurePercent: number;
  isPractice: boolean;
}

export interface HitParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
  isSquare?: boolean;
  gravity?: number;
  rotation?: number;
  vRot?: number;
  aspectRatio?: number;
  decayRate?: number;
}

export interface FloatingFeedback {
  x: number;
  y: number;
  vy: number;
  text: string;
  color: string;
  alpha: number;
}

/**
 * ゾーンの残HPからモザイク強度（100% / 70% / 40% / 0%）を返す
 */
export function getTileMosaicPercent(hp: number, maxHp: number = DEFAULT_MAX_HP): number {
  if (hp <= 0) return 0;
  if (maxHp === 3) {
    if (hp >= 3) return 100;
    if (hp === 2) return 70;
    return 40;
  }
  return Math.round((hp / Math.max(1, maxHp)) * 100);
}

/**
 * クリアタイム（秒）からスピードランク（S/A/B/C）を判定する
 */
export function getSpeedRank(elapsedSec: number, isCleared: boolean = true): SpeedRank {
  if (!isCleared) return 'C';
  if (elapsedSec <= 12) return 'S';
  if (elapsedSec <= 22) return 'A';
  if (elapsedSec <= 40) return 'B';
  return 'C';
}

/**
 * 総残存HP・最大総HP・経過ミリ秒から、
 * 残モザイク率（100%→0%）・残モザイクボーナス（最大500点）・早押しスピードボーナス（最大200点）・総合見込みスコア（100〜800点）を算出する
 */
export function calculateStageMetrics(
  tiles: TileState[],
  elapsedMs: number = 0
): {
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
} {
  let clearedCount = 0;
  let damagedCount = 0;
  let unharmedCount = 0;
  let remainingHp = 0;
  let maxTotalHp = 0;
  let sumTileMosaicPercent = 0;

  for (const t of tiles) {
    maxTotalHp += t.maxHp;
    remainingHp += t.hp;
    sumTileMosaicPercent += getTileMosaicPercent(t.hp, t.maxHp);
    if (t.hp <= 0) {
      clearedCount++;
    } else if (t.hp < t.maxHp) {
      damagedCount++;
    } else {
      unharmedCount++;
    }
  }

  const maxTimeMs = STAGE_TIME_LIMIT_SEC * 1000;
  const clampedElapsedMs = Math.max(0, Math.min(maxTimeMs, elapsedMs));
  const elapsedSec = Number((clampedElapsedMs / 1000).toFixed(1));
  // 早く答えるほど高いスピードボーナス（開始直後200点 -> 60秒経過で0点）
  const speedRatio = Math.max(0, 1 - clampedElapsedMs / 60000);
  const speedBonus = Math.round(speedRatio * 200);

  if (maxTotalHp <= 0 || tiles.length === 0) {
    return {
      clearedCount: 0,
      damagedCount: 0,
      unharmedCount: TOTAL_TILES,
      remainingHp: TOTAL_TILES * DEFAULT_MAX_HP,
      maxTotalHp: TOTAL_TILES * DEFAULT_MAX_HP,
      mosaicPercent: 100,
      exposurePercent: 0,
      mosaicBonus: 500,
      speedBonus,
      elapsedSec,
      potentialNormalScore: 100 + 500 + speedBonus,
    };
  }

  const mosaicPercent = Math.round(sumTileMosaicPercent / tiles.length);
  const exposurePercent = 100 - mosaicPercent;
  const mosaicBonus = Math.round((remainingHp / maxTotalHp) * 500);
  const potentialNormalScore = 100 + mosaicBonus + speedBonus;

  return {
    clearedCount,
    damagedCount,
    unharmedCount,
    remainingHp,
    maxTotalHp,
    mosaicPercent,
    exposurePercent,
    mosaicBonus,
    speedBonus,
    elapsedSec,
    potentialNormalScore,
  };
}
