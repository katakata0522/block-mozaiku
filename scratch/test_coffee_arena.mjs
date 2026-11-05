import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9229;
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

  // レトロドット絵コースを選択
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ドット絵＆アート'));
      if (btn) btn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 200));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
      if (startBtn) startBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1000));

  // STAGE 29に到達するまで進める
  await send('Runtime.evaluate', {
    expression: `(async () => {
      for (let i = 0; i < 20; i++) {
        const header = document.querySelector('header');
        if (header && (header.textContent.includes('STAGE 29') || header.textContent.includes('15/20'))) {
          break;
        }
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
        await new Promise(r => setTimeout(r, 120));
        const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (giveUp) giveUp.click();
        await new Promise(r => setTimeout(r, 200));
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ'));
        if (next) next.click();
        await new Promise(r => setTimeout(r, 200));
      }
    })()`,
    awaitPromise: true
  });
  await new Promise((r) => setTimeout(r, 500));

  // 回答ドックを開いて正解を表示
  await send('Runtime.evaluate', {
    expression: `(() => {
      const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
      if (ansBtn) ansBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 200));
  await send('Runtime.evaluate', {
    expression: `(() => {
      const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
      if (giveUp) giveUp.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 800));

  console.log('Capturing Stage 29 in Arena...');
  await capture('human_ui_coffee_cup_arena.png');

  ws.close();
} catch (e) {
  console.error(e);
} finally {
  chromeProcess.kill();
  console.log('Finished capturing arena coffee.');
}
