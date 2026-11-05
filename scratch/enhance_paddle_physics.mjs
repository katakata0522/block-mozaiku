import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. paddleVxRef, lastPaddleXRef, lastPaddleTimeRef の定義を追加
const oldPaddleState = `  const paddleXRef = useRef<number>((CANVAS_WIDTH - PADDLE_WIDTH) / 2);`;
const newPaddleState = `  const paddleXRef = useRef<number>((CANVAS_WIDTH - PADDLE_WIDTH) / 2);
  const paddleVxRef = useRef<number>(0);
  const lastPaddleXRef = useRef<number>((CANVAS_WIDTH - PADDLE_WIDTH) / 2);
  const lastPaddleTimeRef = useRef<number>(performance.now());`;

code = code.replace(oldPaddleState, newPaddleState);

// 2. キーボード操作時の paddleVxRef 更新
const oldKeyMove = `        const paddleSpeed = 520;
        if (moveLeft && !moveRight) {
          paddleXRef.current = Math.max(12, paddleXRef.current - paddleSpeed * dt);
        } else if (moveRight && !moveLeft) {
          paddleXRef.current = Math.min(
            CANVAS_WIDTH - PADDLE_WIDTH - 12,
            paddleXRef.current + paddleSpeed * dt
          );
        }`;

const newKeyMove = `        const paddleSpeed = 540;
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
        }`;

code = code.replace(oldKeyMove, newKeyMove);

// 3. マウス／タッチ（PointerMove）時の paddleVxRef 計算
const oldPointerMove = `    const clampedX = Math.max(
      12,
      Math.min(CANVAS_WIDTH - PADDLE_WIDTH - 12, targetCenterX - PADDLE_WIDTH / 2)
    );
    paddleXRef.current = clampedX;`;

const newPointerMove = `    const clampedX = Math.max(
      12,
      Math.min(CANVAS_WIDTH - PADDLE_WIDTH - 12, targetCenterX - PADDLE_WIDTH / 2)
    );
    const now = performance.now();
    const dtSec = Math.max(0.008, (now - lastPaddleTimeRef.current) / 1000);
    const rawVx = (clampedX - lastPaddleXRef.current) / dtSec;
    paddleVxRef.current = paddleVxRef.current * 0.35 + rawVx * 0.65;
    lastPaddleXRef.current = clampedX;
    lastPaddleTimeRef.current = now;
    paddleXRef.current = clampedX;`;

code = code.replace(oldPointerMove, newPointerMove);

// 4. パドル衝突時の反射角計算を本格ブロック崩し（アルカノイド仕様＋スライステクニック）に強化
const oldPaddleCollision = `              } else {
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
              }`;

const newPaddleCollision = `              } else {
                // 本格ブロック崩し（アルカノイド仕様）角度コントロール：
                // 1. パドルの接触位置（hitOffset: -1.0〜+1.0）に応じた非線形アングルカーブ（最大68度）
                const sign = hitOffset >= 0 ? 1 : -1;
                const absOffset = Math.abs(hitOffset);
                const maxBounceAngle = (68 * Math.PI) / 180;
                const curveRatio = Math.pow(absOffset, 1.18);
                let bounceAngle = sign * curveRatio * maxBounceAngle;

                // 2. パドルのスイング速度（スライステクニック）の反映
                // パドルを右に振りながら打つと右奥へスライス、逆に切ると角度を相殺
                const sliceImpulse = Math.max(-0.22, Math.min(0.22, (paddleVxRef.current / 750) * 0.22));
                bounceAngle = Math.max(-maxBounceAngle, Math.min(maxBounceAngle, bounceAngle + sliceImpulse));

                ball.vx = Math.sin(bounceAngle) * BASE_BALL_SPEED;
                ball.vy = -Math.cos(bounceAngle) * BASE_BALL_SPEED;
                normalizeAndEnforceMinVy(false);
                ball.y = PADDLE_Y - BALL_RADIUS - 1;

                // エッジスライス時は高音の軽快なヒット音
                soundEngine.playBounce(absOffset > 0.65);
              }`;

code = code.replace(oldPaddleCollision, newPaddleCollision);

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Successfully enhanced paddle physics in App.tsx');
