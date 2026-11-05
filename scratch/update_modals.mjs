import fs from 'fs';

let code = fs.readFileSync('src/components/GameModalsAndDocks.tsx', 'utf8');

// 1. StageResultDockProps interface
code = code.replace(
  'interface StageResultDockProps {',
  'interface StageResultDockProps {\n  totalStagesInCourse?: number;'
);

// 2. StageResultDock component arguments
code = code.replace(
  /export const StageResultDock: React\.FC<StageResultDockProps> = \(\{[\s\S]*?\}\) => \{/,
  `export const StageResultDock: React.FC<StageResultDockProps> = ({
  currentStage,
  currentStageIndex,
  totalStagesInCourse,
  currentStageRecord,
  onNextStageOrSummary,
  onRetrySameStagePractice,
  onGoToSummary,
}) => {
  const totalStages = totalStagesInCourse || PUZZLE_STAGES.length;
  const isLastStage = currentStageIndex + 1 >= totalStages;`
);

// 3. Button label
code = code.replace(
  /\{currentStageIndex \+ 1 < PUZZLE_STAGES\.length \? '次のステージへ' : 'トータル結果へ'\}/,
  "{isLastStage ? 'トータル結果へ' : '次のステージへ'}"
);

// 4. Clean up debug info bar
const debugBarRegex = /\{\/\* 対戦・早押し用のスコア内訳＆ターゲットタイム比較バー \*\/\}[\s\S]*?<div className="grid grid-cols-3 gap-2 pt-0.5">/;

const newBar = `{/* スコア・タイム内訳バー（開発者デバッグ用語を全廃し、純粋な内訳情報に純化） */}
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

      <div className="flex items-center gap-2 pt-0.5">`;

code = code.replace(debugBarRegex, newBar);

// 5. Button hierarchy
code = code.replace(
  'className="min-h-10 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap shadow-xs keycap-btn"',
  'className="flex-1 min-h-11 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-md keycap-btn"'
);
code = code.replace(
  /className="min-h-10 px-2\.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium text-xs border border-zinc-200 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap keycap-btn"/g,
  'className="min-h-11 px-3 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium text-xs border border-zinc-200 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap keycap-btn"'
);

fs.writeFileSync('src/components/GameModalsAndDocks.tsx', code, 'utf8');
console.log('Successfully updated GameModalsAndDocks.tsx');
