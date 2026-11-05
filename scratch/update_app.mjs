import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. StageResultDock 呼び出し箇所に totalStagesInCourse={activeStages.length} を追加
code = code.replace(
  '<StageResultDock\n                  currentStage={currentStage}\n                  currentStageIndex={currentStageIndex}',
  '<StageResultDock\n                  currentStage={currentStage}\n                  currentStageIndex={currentStageIndex}\n                  totalStagesInCourse={activeStages.length}'
);

// 2. 誤答時に DOM の elapsedTimerSpanRef を即時 +3秒 加算更新
code = code.replace(
  `        soundEngine.playMiss();
        elapsedMsRef.current += 3000;
        setAnswerFeedback({
          type: 'WRONG',
          message: \`「\${rawText}」は不正解です（タイム+3秒ペナルティ加算）\`,
        });`,
  `        soundEngine.playMiss();
        elapsedMsRef.current += 3000;
        if (elapsedTimerSpanRef.current) {
          const currentTotalSec = totalCourseElapsedSecRef.current + (elapsedMsRef.current / 1000);
          elapsedTimerSpanRef.current.textContent = formatStopwatch(currentTotalSec);
        }
        setAnswerFeedback({
          type: 'WRONG',
          message: \`「\${rawText}」は不正解です（タイム+3秒ペナルティ加算）\`,
        });`
);

// 3. 浮遊テキスト '70%' / '40%' の数字テキストを撤廃
code = code.replace(
  `                const nextPct = hitTile.hp === 2 ? '70%' : '40%';
                soundEngine.playTileBreak(comboRef.current, false);
                floatingFeedbacksRef.current.push({
                  x: tileCenterX,
                  y: tileCenterY,
                  vy: -28,
                  text: nextPct,
                  color: '#e2e8f0',
                  alpha: 0.9,
                });`,
  `                soundEngine.playTileBreak(comboRef.current, false);`
);

// 4. コアゾーンのターゲット印を洗練されたミニマル・ブラケットに刷新
const oldCoreZone = `        // ★コアゾーン（0%にすると周囲4マスも1段階削るボーナス枠）のターゲット印（白背景でも見やすいアンバーゴールド）
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
        }`;

const newCoreZone = `        // コアゾーン（周囲を削るボーナス枠）：写真の邪魔をしない洗練されたゴールドブラケット
        if (tile.isCoreZone) {
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
          ctx.lineWidth = 1.2;
          const bLen = 6;
          const x1 = tile.x + 2;
          const y1 = tile.y + 2;
          const x2 = tile.x + tile.width - 2;
          const y2 = tile.y + tile.height - 2;
          ctx.beginPath();
          // 左上
          ctx.moveTo(x1, y1 + bLen); ctx.lineTo(x1, y1); ctx.lineTo(x1 + bLen, y1);
          // 右上
          ctx.moveTo(x2 - bLen, y1); ctx.lineTo(x2, y1); ctx.lineTo(x2, y1 + bLen);
          // 左下
          ctx.moveTo(x1, y2 - bLen); ctx.lineTo(x1, y2); ctx.lineTo(x1 + bLen, y2);
          // 右下
          ctx.moveTo(x2 - bLen, y2); ctx.lineTo(x2, y2); ctx.lineTo(x2, y2 - bLen);
          ctx.stroke();
        }`;

code = code.replace(oldCoreZone, newCoreZone);

// 5. アリーナ背景の質感向上
const oldArenaGrad = `    // 1. アリーナ全体のクリーンなホワイト背景
    const arenaGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    arenaGrad.addColorStop(0, '#f8fafc');
    arenaGrad.addColorStop(0.5, '#ffffff');
    arenaGrad.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = arenaGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);`;

const newArenaGrad = `    // 1. アリーナ全体のクリーンな背景 ＋ 精密ウォール境界
    const arenaGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    arenaGrad.addColorStop(0, '#f8fafc');
    arenaGrad.addColorStop(0.5, '#ffffff');
    arenaGrad.addColorStop(1, '#f8fafc');
    ctx.fillStyle = arenaGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 精密ウォール境界線
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.7)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, CANVAS_WIDTH - 1, CANVAS_HEIGHT - 1);`;

code = code.replace(oldArenaGrad, newArenaGrad);

// 6. 発射待機ボタンをパドル真上から画面中央のスマートな案内へ移動
const oldLaunchCard = `              {/* 発射待機時の控えめな発射ガイド（パドル上部に上品に配置） */}
              {(phase === 'READY' ||
                (phase === 'PLAYING' && ballRef.current.attachedToPaddle)) &&
                dropPenaltyCountdown === null && (
                  <div className="absolute bottom-16 inset-x-0 flex flex-col items-center pointer-events-none z-10">
                    <div className="px-4 py-1.5 rounded-full bg-zinc-950/80 text-white text-xs font-display font-semibold backdrop-blur-sm shadow-md flex items-center gap-1.5 animate-bounce">
                      <Play className="w-3 h-3 fill-current text-sky-400" />
                      <span>タップ または [Space] で発射</span>
                    </div>
                  </div>
                )}`;

const newLaunchCard = `              {/* 発射待機時のスマートガイド（パドル操作の邪魔をしない中央配置） */}
              {(phase === 'READY' ||
                (phase === 'PLAYING' && ballRef.current.attachedToPaddle)) &&
                dropPenaltyCountdown === null && (
                  <div className="absolute top-[62%] inset-x-0 flex flex-col items-center pointer-events-none z-10">
                    <div className="px-3.5 py-1 rounded-full bg-zinc-900/75 text-white text-[11px] font-display font-medium backdrop-blur-xs shadow-sm flex items-center gap-1.5 opacity-90 transition animate-pulse">
                      <Play className="w-2.5 h-2.5 fill-current text-sky-300" />
                      <span>画面をタップしてスタート</span>
                    </div>
                  </div>
                )}`;

code = code.replace(oldLaunchCard, newLaunchCard);

// 7. ヘッダーから謎の「ホールド」ボタンを撤去
const oldHoldBtn = `              <button
                type="button"
                onClick={() => setCatchAndAimMode((prev) => !prev)}
                className={\`min-h-8 px-2 rounded-lg text-[11px] font-semibold border transition flex items-center gap-1 cursor-pointer whitespace-nowrap keycap-btn \${
                  catchAndAimMode
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-600'
                }\`}
                title="パドルでボールをキャッチして狙い撃ちするモード"
              >
                <Crosshair className="w-3 h-3" />
                <span className="hidden sm:inline">ホールド</span>
              </button>`;

code = code.replace(oldHoldBtn, '');

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Successfully updated App.tsx');
