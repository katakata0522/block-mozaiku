import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9225;
const artifactDir = "C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed";

const chromeProcess = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=500,980',
  'http://localhost:3000/'
]);

await new Promise((r) => setTimeout(r, 2200));

try {
  const versionRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const targets = await versionRes.json();
  const pageTarget = targets.find((t) => t.type === 'page');

  if (pageTarget?.webSocketDebuggerUrl) {
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

    await new Promise((r) => setTimeout(r, 1000));

    // 「歴史の偉人・英雄」コースを選択してスタート
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('歴史の偉人') || b.textContent.includes('歴史＆'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート') || b.textContent.includes('スタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 1問目（信長）スキップ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const skip = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('パス') || b.textContent.includes('回答する'));
        if (skip) skip.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 400));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const g = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (g) g.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 900));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ') || b.textContent.includes('次へ'));
        if (next) next.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 2問目（秀吉）スキップ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const skip = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('パス') || b.textContent.includes('回答する'));
        if (skip) skip.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 400));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const g = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (g) g.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 900));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ') || b.textContent.includes('次へ'));
        if (next) next.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 3問目（家康）正解を見る
    await send('Runtime.evaluate', {
      expression: `(() => {
        const skip = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('パス') || b.textContent.includes('回答する'));
        if (skip) skip.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 400));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const g = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (g) g.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 900));

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${artifactDir}/v100_ieyasu_perfect.png`, Buffer.from(ss.data, 'base64'));
    console.log('Saved perfect Ieyasu screenshot!');

    ws.close();
  }
} catch (e) {
  console.error(e);
} finally {
  chromeProcess.kill();
}
