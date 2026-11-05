import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. インポート追加
code = code.replace(
  "import { BrandLogo } from './components/BrandLogo';",
  "import { BrandLogo } from './components/BrandLogo';\nimport { getStageCanonicalKana, generateMinhayaChoices } from './utils/minhayaChoices';"
);

// 2. 状態の追加
const oldStateAnchor = "  const [answerInput, setAnswerInput] = useState<string>('');";
const newStateAnchor = `  const [inputKana, setInputKana] = useState<string>('');
  const [currentChoices, setCurrentChoices] = useState<string[]>([]);
  const [wrongPenaltyBanner, setWrongPenaltyBanner] = useState<string | null>(null);
  const [answerInput, setAnswerInput] = useState<string>('');`;

code = code.replace(oldStateAnchor, newStateAnchor);

// 3. handleOpenAnswerModal の更新
const oldOpenModal = `  const handleOpenAnswerModal = useCallback(() => {
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
  }, [clearAllMovementInputs]);`;

const newOpenModal = `  const handleOpenAnswerModal = useCallback(() => {
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
  }, [clearAllMovementInputs, currentStage]);`;

code = code.replace(oldOpenModal, newOpenModal);

// 4. triggerLastChance 内でも4択を生成
code = code.replace(
  "    setPhase('LAST_CHANCE');\n    soundEngine.playWarning();",
  `    const canonical = getStageCanonicalKana(currentStage);
    setInputKana('');
    const initialChoices = generateMinhayaChoices(canonical, 0, currentStage.kanaPad);
    setCurrentChoices(initialChoices);
    setPhase('LAST_CHANCE');
    soundEngine.playWarning();`
);

// 5. handleSelectChoice の追加
const choiceHandlerCode = `  const handleSelectChoice = useCallback((selectedChar: string) => {
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
      if (elapsedTimerSpanRef.current) {
        const currentTotalSec = totalCourseElapsedSecRef.current + (elapsedMsRef.current / 1000);
        elapsedTimerSpanRef.current.textContent = formatStopwatch(currentTotalSec);
      }

      setWrongPenaltyBanner(\`❌ 不正解！（タイム+5.0秒加算）\`);
      window.setTimeout(() => setWrongPenaltyBanner(null), 2200);

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
        setPhase('COUNTDOWN');
        setCountdownValue(3);
        let cnt = 3;
        const timer = setInterval(() => {
          cnt -= 1;
          if (cnt <= 0) {
            clearInterval(timer);
            setCountdownValue(null);
            setPhase('PLAYING');
          } else {
            setCountdownValue(cnt);
            soundEngine.playBounce(false);
          }
        }, 800);
      }
    }
  }, [currentStage, inputKana, phase, lastChanceReason, finalizeStageResult]);

`;

code = code.replace(
  '  const handleReturnFromAnswerModal = useCallback(() => {',
  choiceHandlerCode + '  const handleReturnFromAnswerModal = useCallback(() => {'
);

// 6. AnswerDock JSX レンダリング部分の差し替え
const oldAnswerDockCall = `<AnswerDock
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
                />`;

const newAnswerDockCall = `<AnswerDock
                  phase={phase}
                  currentStage={currentStage}
                  targetKana={getStageCanonicalKana(currentStage)}
                  inputKana={inputKana}
                  currentChoices={currentChoices}
                  potentialNormalScore={stageMetrics.potentialNormalScore}
                  onSelectChoice={handleSelectChoice}
                  onReturnFromAnswer={handleReturnFromAnswerModal}
                  onGiveUpAndReveal={handleGiveUpAndReveal}
                />`;

code = code.replace(oldAnswerDockCall, newAnswerDockCall);

// 7. 誤答ペナルティバナーの表示追加
const bannerJsx = `{wrongPenaltyBanner && (
        <div className="absolute top-14 inset-x-0 flex justify-center z-40 pointer-events-none animate-bounce">
          <div className="px-4 py-1.5 rounded-full bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center gap-1.5 border border-rose-400">
            <span>{wrongPenaltyBanner}</span>
          </div>
        </div>
      )}
      {/* メインステージ`;

code = code.replace('{/* メインステージ', bannerJsx);

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Successfully applied Minhaya 4-choice answer system to App.tsx!');
