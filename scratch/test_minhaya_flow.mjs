import WebSocket from 'ws';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed';
const PORT = 9235;
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const chromeProcess = spawn(CHROME_PATH, [
  `--remote-debugging-port=${PORT}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=390,844',
  'http://localhost:3000/'
]);

await new Promise((r) => setTimeout(r, 2000));

try {
  const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const targets = await versionRes.json();
  const pageTarget = targets.find((t) => t.type === 'page');

  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error('No webSocketDebuggerUrl found');
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.onopen = resolve);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const curId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === curId) {
          ws.removeEventListener('message', handler);
          if (msg.error) {
            reject(new Error(JSON.stringify(msg.error)));
          } else {
            resolve(msg.result);
          }
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }

  await send('Runtime.enable');
  await send('Page.enable');
  await send('DOM.enable');

  // モバイルビューポート (iPhone 14 / 15: 390x844)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true
  });

  const capture = async (filename) => {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    fs.writeFileSync(path.join(ARTIFACT_DIR, filename), buffer);
    console.log(`Saved screenshot: ${filename}`);
  };

  await new Promise((r) => setTimeout(r, 1000));

  // 1. ゲームスタート
  console.log('--- Step 1: Start Game ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
      if (startBtn) startBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1200));

  // 2. 「何の写真か回答する」ボタンをタップ
  console.log('--- Step 2: Open Minhaya 4-choice Dock ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('何の写真か回答する'));
      if (ansBtn) ansBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 600));
  await capture('minhaya_4choice_dock.png');

  // 3. 画面の4択ボタンの状態を取得
  const stageInfo = await send('Runtime.evaluate', {
    expression: `(() => {
      const btns = Array.from(document.querySelectorAll('.keycap-btn'));
      const choiceBtns = btns.filter(b => b.querySelector('.text-2xl, .text-3xl'));
      const choices = choiceBtns.map(b => b.innerText.trim().slice(-1));
      return choices;
    })()`,
    returnByValue: true
  });
  console.log('Initial choices:', stageInfo.value);

  // 4. 正解の1文字目（ステージ1「ひまわり」の「ひ」）をタップ
  console.log('--- Step 3: Tap correct 1st character "ひ" ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btns = Array.from(document.querySelectorAll('.keycap-btn')).filter(b => b.querySelector('.text-2xl, .text-3xl'));
      const hiBtn = btns.find(b => b.textContent.includes('ひ'));
      if (hiBtn) hiBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 500));
  await capture('minhaya_input_first_char.png');

  // 5. 2文字目でわざと誤答をタップ（「ま」以外）
  console.log('--- Step 4: Click wrong choice for 2nd character to trigger penalty ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btns = Array.from(document.querySelectorAll('.keycap-btn')).filter(b => b.querySelector('.text-2xl, .text-3xl'));
      const wrongBtn = btns.find(b => !b.textContent.includes('ま')) || btns[0];
      if (wrongBtn) wrongBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 300));
  await capture('minhaya_wrong_penalty_return.png');

  // 6. カウントダウンを経てブロック崩しへ復帰
  console.log('--- Step 5: Wait for countdown to finish and game to resume ---');
  await new Promise((r) => setTimeout(r, 2200));
  await capture('minhaya_game_resumed.png');

  ws.close();
  console.log('Minhaya verification completed successfully!');
} catch (e) {
  console.error('Test failed:', e);
} finally {
  chromeProcess.kill();
}
