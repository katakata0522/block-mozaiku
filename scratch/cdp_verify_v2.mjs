import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9222;

const chromeProcess = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=500,900',
  'http://localhost:3000/'
]);

await new Promise((r) => setTimeout(r, 2000));

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

    // デモ枠をクリックして 70%（輪郭先行浮上）にする
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btn70 = btns.find(b => b.textContent.includes('70%'));
        if (btn70) btn70.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 600));

    // 70%デモ撮影
    const ss70 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/demo_smart_70.png', Buffer.from(ss70.data, 'base64'));
    console.log('Saved demo_smart_70.png');

    // 40%デモをクリック
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btn40 = btns.find(b => b.textContent.includes('40%'));
        if (btn40) btn40.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 600));

    // 40%デモ撮影
    const ss40 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/demo_smart_40.png', Buffer.from(ss40.data, 'base64'));
    console.log('Saved demo_smart_40.png');

    // ゲームスタート
    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 800));

    // ゲーム画面の撮影
    const ssGame = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/game_smart_ready.png', Buffer.from(ssGame.data, 'base64'));
    console.log('Saved game_smart_ready.png');

    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
