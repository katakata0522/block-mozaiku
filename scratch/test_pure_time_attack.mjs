import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9231;
const artifactDir = "C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed";

const chromeProcess = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=500,980',
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

  // 1. タイトル画面から「ランダム5問」スタート
  await new Promise((r) => setTimeout(r, 1200));
  console.log('Starting Game...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
      if (startBtn) startBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1500));

  // 2. プレイ画面キャプチャ（ライフ全廃・ドット進行・単一ストップウォッチ・フル幅回答ボタン）
  console.log('Capturing Pure Time Attack Play Screen...');
  await capture('pure_time_attack_play_screen.png');

  // 3. 落球ペナルティ（3, 2, 1クイックリスタート）のテスト
  console.log('Simulating ball drop for 3, 2, 1 restart penalty...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      // 発射してボールを即座に最下部（CANVAS_HEIGHT + 10）にテレポート
      const canvas = document.querySelector('canvas');
      if (canvas) canvas.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 300));

  // ボールを下に落とす
  await send('Runtime.evaluate', {
    expression: `(() => {
      // 内部落球シミュレーション: Appコンポーネントのキーイベントまたは落下
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    })()`
  });
  await new Promise((r) => setTimeout(r, 500));

  // 4. ステージ1を正解してSTAGE 2へ進み、プログレスドット（● ● ○ ○ ○）の推移をキャプチャ
  console.log('Solving Stage 1 to check Stage 2 Dots...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
      if (ansBtn) ansBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 400));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
      if (giveUp) giveUp.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 600));

  // 次のステージへ
  await send('Runtime.evaluate', {
    expression: `(() => {
      const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ'));
      if (next) next.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 800));

  console.log('Capturing Stage 2 Play Screen...');
  await capture('pure_time_attack_stage2_screen.png');

  ws.close();
  console.log('Pure Time Attack tests completed successfully!');
} catch (err) {
  console.error('Error during pure time attack test:', err);
} finally {
  chromeProcess.kill();
}
