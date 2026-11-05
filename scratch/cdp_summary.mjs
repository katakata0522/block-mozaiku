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

    // スタート
    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
        if (startBtn) startBtn.click();
      })()`
    });

    await new Promise((r) => setTimeout(r, 800));

    // 回答する
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (btn) btn.click();
      })()`
    });

    await new Promise((r) => setTimeout(r, 600));

    // 「正解を見る（0 pt）」をクリック
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (btn) btn.click();
      })()`
    });

    await new Promise((r) => setTimeout(r, 1200));

    // ステージリザルト画面（原画全露出＆結果ドック）を撮影
    const ssResult = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/stage_giveup_result.png', Buffer.from(ssResult.data, 'base64'));
    console.log('Saved stage_giveup_result.png');

    // 「次のステージへ」
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次へ') || b.textContent.includes('次の'));
        if (btn) btn.click();
      })()`
    });

    await new Promise((r) => setTimeout(r, 800));

    // 第2問で「回答する」→「正解を見る」
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 600));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 800));

    // 第3問へ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次へ') || b.textContent.includes('次の'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 800));

    // 第3問で「回答する」→「正解を見る」
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 600));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 800));

    // 総合リザルトへ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('総合') || b.textContent.includes('リザルト') || b.textContent.includes('次へ'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 総合リザルト画面（SUMMARY）を撮影
    const ssSummary = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/summary_real.png', Buffer.from(ssSummary.data, 'base64'));
    console.log('Saved summary_real.png');

    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
