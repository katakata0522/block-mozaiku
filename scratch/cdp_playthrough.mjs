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

    // 「歴史＆名画コース」を選択してスタート
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('歴史＆名画'));
        if (btn) btn.click();
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
        if (startBtn) startBtn.click();
      })()`
    });

    await new Promise((r) => setTimeout(r, 1000));

    // 信長のステージ画面を撮影
    const ssNobunaga = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/stage_nobunaga.png', Buffer.from(ssNobunaga.data, 'base64'));
    console.log('Saved stage_nobunaga.png');

    // 回答ボタンをクリック
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (btn) btn.click();
      })()`
    });

    await new Promise((r) => setTimeout(r, 800));

    // 「おだのぶなが」を入力して回答送信
    await send('Runtime.evaluate', {
      expression: `(() => {
        const input = document.querySelector('input[type="text"]');
        if (input) {
          input.value = 'おだのぶなが';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答を送信'));
        if (submitBtn) submitBtn.click();
      })()`
    });

    await new Promise((r) => setTimeout(r, 1000));

    // ステージリザルト画面（STAGE_RESULT）を撮影
    const ssResult = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/stage_result.png', Buffer.from(ssResult.data, 'base64'));
    console.log('Saved stage_result.png');

    // 「次のステージへ」をクリック
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次へ') || b.textContent.includes('次の'));
        if (btn) btn.click();
      })()`
    });

    await new Promise((r) => setTimeout(r, 1000));

    // 第2問（真珠の耳飾りの少女）を回答
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const input = document.querySelector('input[type="text"]');
        if (input) {
          input.value = '真珠の耳飾りの少女';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答を送信'));
        if (submitBtn) submitBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1000));

    // 第3問へ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次へ') || b.textContent.includes('次の'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1000));

    // 第3問（富士山）を回答
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const input = document.querySelector('input[type="text"]');
        if (input) {
          input.value = 'ふじさん';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答を送信'));
        if (submitBtn) submitBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1000));

    // 「総合リザルトを見る」をクリック
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('リザルト') || b.textContent.includes('次へ') || b.textContent.includes('総合'));
        if (btn) btn.click();
      })()`
    });

    await new Promise((r) => setTimeout(r, 1200));

    // トータルリザルト画面（SUMMARY）を撮影
    const ssSummary = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('screenshots/summary_screen.png', Buffer.from(ssSummary.data, 'base64'));
    console.log('Saved summary_screen.png');

    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
