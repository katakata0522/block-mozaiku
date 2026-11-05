import fs from 'fs';

let code = fs.readFileSync('src/components/SummaryScreen.tsx', 'utf8');

// 1. サマリー画面ヘッダーから架空の目標タイムを削除
const oldHeaderMetrics = `          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1 font-display tabular-nums">
            <span className="flex items-center gap-1 text-blue-600 font-bold">
              <Timer className="w-3.5 h-3.5" />
              {totalElapsedSec.toFixed(1)}s
            </span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span className="text-zinc-600">
              目標 {totalRivalTargetSec.toFixed(1)}s
            </span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[11px]">
              クリア {clearedStagesCount}/{activeStages.length}（{clearPercent}%）
            </span>
          </div>`;

const newHeaderMetrics = `          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1 font-display tabular-nums">
            <span className="flex items-center gap-1 text-blue-600 font-bold text-sm">
              <Timer className="w-4 h-4" />
              {totalElapsedSec.toFixed(1)}s
            </span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full text-[11px]">
              {clearedStagesCount === activeStages.length ? '全問完全クリア！' : \`クリア \${clearedStagesCount}/\${activeStages.length}\`}
            </span>
          </div>`;

code = code.replace(oldHeaderMetrics, newHeaderMetrics);

// 2. ステージカード内のレンダリング（改行崩れ・見切れ・デバッグノイズの完全解消）
const oldCardContent = `                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="font-display font-bold text-zinc-700">{st.title}</span>
                    <span aria-hidden="true" className="text-zinc-300">·</span>
                    <span className="text-sm font-bold text-zinc-900 truncate">
                      {st.displayAnswer}
                    </span>
                    {rec && (
                      <span
                        className={\`px-1.5 py-0.2 rounded text-[10px] font-display font-bold shadow-xs \${
                          rec.speedRank === 'S'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                            : rec.speedRank === 'A'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                            : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                        }\`}
                      >
                        {rec.speedRank}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate font-display tabular-nums">
                    {rec
                      ? isCleared
                        ? \`タイム \${rec.elapsedSec.toFixed(1)}s（目標 \${st.rivalTargetSec.toFixed(1)}s） · 残モザイク \${rec.mosaicPercent}%\`
                        : \`未クリア · 残モザイク \${rec.mosaicPercent}%\`
                      : \`目標タイム \${st.rivalTargetSec.toFixed(1)}s\`}
                  </p>
                </div>`;

const newCardContent = `                <div className="min-w-0 flex-1">
                  {(() => {
                    const match = st.displayAnswer.match(/^([^(（]+)([（(][^）)]+[）)])?$/);
                    const mainName = match ? match[1].trim() : st.displayAnswer;
                    const subName = match && match[2] ? match[2].trim() : '';
                    return (
                      <>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 min-w-0">
                          <span className="font-display font-bold text-zinc-700 whitespace-nowrap shrink-0">
                            {st.title}
                          </span>
                          <span aria-hidden="true" className="text-zinc-300 shrink-0">·</span>
                          <span className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                            {mainName}
                          </span>
                          {subName && (
                            <span className="text-[10px] text-zinc-400 font-normal truncate hidden sm:inline">
                              {subName}
                            </span>
                          )}
                          {rec && (
                            <span
                              className={\`ml-auto shrink-0 px-1.5 py-0.2 rounded text-[10px] font-display font-bold shadow-xs \${
                                rec.speedRank === 'S'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                                  : rec.speedRank === 'A'
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                                  : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                              }\`}
                            >
                              {rec.speedRank}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5 truncate font-display tabular-nums">
                          {rec
                            ? isCleared
                              ? \`タイム \${rec.elapsedSec.toFixed(1)}s · 早押しボーナス +\${rec.speedBonus}pt\`
                              : '未正解（タイム加算なし）'
                            : '未プレイ'}
                        </p>
                      </>
                    );
                  })()}
                </div>`;

code = code.replace(oldCardContent, newCardContent);

fs.writeFileSync('src/components/SummaryScreen.tsx', code, 'utf8');
console.log('Successfully updated SummaryScreen.tsx');
