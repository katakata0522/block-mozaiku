import { spawn } from 'child_process';

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
  console.log('Page target WS:', pageTarget?.webSocketDebuggerUrl);

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

    // ゲームスタートボタンをクリック
    const clickRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
        if (btn) { btn.click(); return 'clicked'; }
        return 'not found';
      })()`
    });
    console.log('Start button click:', clickRes);

    await new Promise((r) => setTimeout(r, 1000));

    // スクリーンショット撮影（ゲーム画面 READY）
    const ss1 = await send('Page.captureScreenshot', { format: 'png' });
    import('fs').then(fs => {
      fs.writeFileSync('screenshots/game_ready.png', Buffer.from(ss1.data, 'base64'));
      console.log('Saved screenshots/game_ready.png');
    });

    // 発射ボタンをクリック
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ボールを発射'));
        if (btn) { btn.click(); return 'launched'; }
        return 'not found';
      })()`
    });

    // 2秒間物理シミュレーションを動かす
    await new Promise((r) => setTimeout(r, 2500));

    // スクリーンショット撮影（ゲーム画面 PLAYING）
    const ss2 = await send('Page.captureScreenshot', { format: 'png' });
    const fs = await import('fs');
    fs.writeFileSync('screenshots/game_playing.png', Buffer.from(ss2.data, 'base64'));
    console.log('Saved screenshots/game_playing.png');

    // 回答するボタンをクリック
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (btn) { btn.click(); return 'answer clicked'; }
        return 'not found';
      })()`
    });

    await new Promise((r) => setTimeout(r, 800));

    // スクリーンショット撮影（回答モーダル ANSWERING）
    const ss3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/game_answering.png', Buffer.from(ss3.data, 'base64'));
    console.log('Saved screenshots/game_answering.png');

    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
