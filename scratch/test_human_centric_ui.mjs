import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9227;
const artifactDir = "C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed";

const chromeProcess = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=500,960',
  'http://localhost:3000/'
]);

await new Promise((r) => setTimeout(r, 2000));

try {
  const versionRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const targets = await versionRes.json();
  const pageTarget = targets.find((t) => t.type === 'page');

  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error('No webSocketDebuggerUrl found');
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.onopen = resolve);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const curId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === curId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }

  await send('Runtime.enable');
  await send('Page.enable');

  async function capture(filename) {
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${artifactDir}/${filename}`, Buffer.from(ss.data, 'base64'));
    console.log(`Saved screenshot: ${filename}`);
  }

  await new Promise((r) => setTimeout(r, 1500));

  // 1. タイトル画面のキャプチャ（ゆったりカードとスクロール感）
  console.log('Capturing Title Screen...');
  await capture('human_ui_title_screen.png');

  // 2. ゲーム開始（ランダム5問）
  console.log('Starting Game...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ランダム5問'));
      if (btn) btn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 300));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
      if (startBtn) startBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1200));

  // 2. プレイ画面のキャプチャ（スライダー撤廃・主役回答ボタン）
  console.log('Capturing In-Game Play Screen...');
  await capture('human_ui_play_screen.png');

  // 3. 回答ドック展開
  console.log('Opening Answer Dock...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
      if (ansBtn) ansBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 800));

  // 3. 回答ドック展開画面キャプチャ（スリム化・絵を隠さない）
  console.log('Capturing Slim Answer Dock...');
  await capture('human_ui_answer_dock.png');

  // タイトルに戻るためリロード
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise((r) => setTimeout(r, 1500));

  // 4. ステージ29（コーヒーカップ）のテスト
  console.log('Selecting Retro Pixel Art / Modern Art course for Coffee Cup...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ドット絵＆アート'));
      if (btn) btn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 400));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
      if (startBtn) startBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1000));

  // 内部状態からStage 29に直行させるか、回答を進める
  // 念のため、AppコンポーネントまたはCanvas描画を検証するため、Stage 29にスキップまたは直接描画を確認
  console.log('Skipping to Stage 29 (Coffee Cup)...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      // ドット絵コース内でStage 29を探して設定
      // React state is encapsulated, but we can fast-forward by giving up / next stage until stageId 29
      const loopUntilStage29 = async () => {
        for (let i = 0; i < 25; i++) {
          const header = document.querySelector('header');
          const titleText = document.body.innerText;
          if (titleText.includes('STAGE 29') || titleText.includes('コーヒー')) {
            break;
          }
          const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
          if (ansBtn) ansBtn.click();
          await new Promise(r => setTimeout(r, 200));
          const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
          if (giveUp) giveUp.click();
          await new Promise(r => setTimeout(r, 400));
          const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ') || b.textContent.includes('結果を見る'));
          if (next) next.click();
          await new Promise(r => setTimeout(r, 400));
        }
      };
      return loopUntilStage29();
    })()`,
    awaitPromise: true
  });
  await new Promise((r) => setTimeout(r, 1000));

  console.log('Revealing Stage 29 Coffee Cup...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
      if (ansBtn) ansBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 300));
  await send('Runtime.evaluate', {
    expression: `(() => {
      const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
      if (giveUp) giveUp.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1000));

  await capture('human_ui_coffee_cup_revealed.png');

  console.log('Capturing Coffee Cup finished!');
  ws.close();
} catch (err) {
  console.error('Error during test:', err);
} finally {
  chromeProcess.kill();
  console.log('All tests completed.');
}
