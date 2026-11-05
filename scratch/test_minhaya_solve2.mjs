import WebSocket from 'ws';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed';
const PORT = 9238;
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
  await send('Runtime.evaluate', {
    expression: `(() => {
      const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('ゲームスタート'));
      if (b) b.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1200));

  // 2. 回答ドックを開く
  await send('Runtime.evaluate', {
    expression: `(() => {
      const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('何の写真か回答する'));
      if (b) b.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 600));

  // 3. 「も」→「な」→「り」→「ざ」など、ステージの正解を探してタップ
  // ステージ1が「もなりざ」の場合
  const letters = ['も', 'な', 'り', 'ざ'];
  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    console.log(`Trying to tap: ${char}`);
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('.keycap-btn')).filter(b => b.querySelector('.text-2xl, .text-3xl'));
        const match = btns.find(b => b.innerText.includes('${char}'));
        if (match) {
          match.click();
          return { found: true, char: '${char}' };
        }
        return { found: false, char: '${char}', btns: btns.map(b => b.innerText) };
      })()`,
      returnByValue: true
    });
    console.log(`Step ${i} tap:`, res.result.value);
    await new Promise((r) => setTimeout(r, 600));
  }

  await new Promise((r) => setTimeout(r, 1200));
  await capture('minhaya_stage_clear_result.png');

  ws.close();
} catch (e) {
  console.error('Test error:', e);
} finally {
  chromeProcess.kill();
}
