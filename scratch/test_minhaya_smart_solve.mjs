import WebSocket from 'ws';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getStageCanonicalKana } from '../src/utils/minhayaChoices.js';

const ARTIFACT_DIR = 'C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed';
const PORT = 9240;
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
          if (msg.error) reject(new Error(JSON.stringify(msg.error)));
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }

  await send('Runtime.enable');
  await send('Page.enable');
  await send('DOM.enable');

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

  // 1. スタート
  console.log('--- 1. Start Game ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('ゲームスタート'));
      if (b) b.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1200));

  // 2. 回答ドックを開く
  console.log('--- 2. Open Answer Dock ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('何の写真か回答する'));
      if (b) b.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 600));

  // 3. window.__CURRENT_STAGE__ を取得
  const stageRes = await send('Runtime.evaluate', {
    expression: `window.__CURRENT_STAGE__`,
    returnByValue: true
  });
  const currentStage = stageRes.result.value;
  const canonical = getStageCanonicalKana(currentStage);
  console.log(`Stage ID: ${currentStage.id}, Title: "${currentStage.title}", Canonical: "${canonical}"`);

  // 4. 正解を1文字ずつポチポチ入力
  for (let i = 0; i < canonical.length; i++) {
    const char = canonical[i];
    console.log(`Typing char ${i + 1}/${canonical.length}: "${char}"`);

    const tapRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('.keycap-btn')).filter(b => b.querySelector('.text-2xl, .text-3xl'));
        const match = btns.find(b => b.innerText.includes('${char}'));
        if (match) {
          match.click();
          return { success: true, char: '${char}' };
        }
        return { success: false, char: '${char}', btns: btns.map(b => b.innerText) };
      })()`,
      returnByValue: true
    });
    console.log(`Result:`, tapRes.result.value);
    await new Promise((r) => setTimeout(r, 500));

    if (i === 1) {
      await capture('minhaya_typing_in_progress.png');
    }
  }

  // 5. ステージリザルト画面キャプチャ
  await new Promise((r) => setTimeout(r, 1200));
  await capture('minhaya_stage_correct_cleared.png');

  ws.close();
  console.log('Test completed successfully!');
} catch (e) {
  console.error('Test error:', e);
} finally {
  chromeProcess.kill();
}
