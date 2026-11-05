import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9230;
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

  // 1. タイトル画面のキャプチャ（ストアフロント・売り物基準のクオリティ）
  await new Promise((r) => setTimeout(r, 1600));
  console.log('Capturing Title Screen...');
  await capture('storefront_title_screen.png');

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

  // 2. プレイ画面のキャプチャ（ストアフロントHUD＆ローンチトリガー＆回答ボタン）
  console.log('Capturing In-Game Play Screen...');
  await capture('storefront_play_screen.png');

  // 3. 回答ドック展開
  console.log('Opening Answer Dock...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
      if (ansBtn) ansBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 800));

  // 3. 回答ドック展開キャプチャ（メカニカルキートップ・スリムUI）
  console.log('Capturing Answer Dock...');
  await capture('storefront_answer_dock.png');

  // 4. 5ステージを解いてサマリー画面へ進行
  console.log('Progressing to Summary Screen...');
  for (let s = 1; s <= 5; s++) {
    await send('Runtime.evaluate', {
      expression: `(() => {
        const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (giveUp) giveUp.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 400));

    if (s < 5) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ'));
          if (next) next.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 400));

      // 次ステージで回答ドックを開く
      await send('Runtime.evaluate', {
        expression: `(() => {
          const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
          if (ansBtn) ansBtn.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 400));
    } else {
      // 最終ステージ
      await send('Runtime.evaluate', {
        expression: `(() => {
          const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('結果を見る') || b.textContent.includes('サマリー') || b.textContent.includes('次のステージ') || b.textContent.includes('トータル'));
          if (next) next.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 1200));
    }
  }

  console.log('Capturing Summary Screen...');
  await capture('storefront_summary_screen.png');

  ws.close();
  console.log('All Storefront screenshots successfully taken!');
} catch (err) {
  console.error('Error during storefront test:', err);
} finally {
  chromeProcess.kill();
}
