import fs from 'fs';

let code = fs.readFileSync('src/components/SummaryScreen.tsx', 'utf8');

const targetBlock = `                <div className="min-w-0 flex-1">
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

const replacementBlock = `                <div className="min-w-0 flex-1">
                  {(() => {
                    const match = st.displayAnswer.match(/^([^(（]+)([（(][^）)]+[）)])?$/);
                    const mainName = match ? match[1].trim() : st.displayAnswer;
                    const subName = match && match[2] ? match[2].trim() : '';
                    return (
                      <div className="space-y-0.5">
                        {/* 1段目: 答えを主役に最大幅確保 ＋ スピードランク */}
                        <div className="flex items-center gap-1.5 min-w-0">
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
                              className={\`shrink-0 px-1.5 py-0.2 rounded text-[10px] font-display font-bold shadow-xs \${
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
                        {/* 2段目: ステージ番号 ＋ タイム/ステータス */}
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-display tabular-nums truncate">
                          <span className="font-semibold text-zinc-600 whitespace-nowrap">
                            {st.title}
                          </span>
                          <span aria-hidden="true" className="text-zinc-300">·</span>
                          <span className="truncate">
                            {rec
                              ? isCleared
                                ? \`\${rec.elapsedSec.toFixed(1)}秒 (+\${rec.speedBonus}pt)\`
                                : '未正解'
                              : '未プレイ'}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>`;

code = code.replace(targetBlock, replacementBlock);

fs.writeFileSync('src/components/SummaryScreen.tsx', code, 'utf8');
console.log('Successfully refined SummaryScreen layout');
