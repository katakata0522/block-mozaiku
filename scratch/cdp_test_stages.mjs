import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9222;

const chromeProcess = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=500,920',
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

    // 1. タイトル画面撮影（コース選択肢に全8ステージ・歴史＆名画4問が反映されているか）
    await new Promise((r) => setTimeout(r, 1000));
    const ssTitle = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/title_screen_v8.png', Buffer.from(ssTitle.data, 'base64'));
    console.log('Saved title_screen_v8.png');

    // 2. 「歴史＆名画・世界遺産コース」ボタンをクリック
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const histBtn = btns.find(b => b.textContent.includes('歴史＆名画'));
        if (histBtn) histBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 400));

    // 3. ゲームスタートをクリック（Stage 4: 織田信長が第1問として開始）
    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1500));

    // 織田信長のステージ画面を撮影
    const ssNobunaga = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/stage_nobunaga_pd.png', Buffer.from(ssNobunaga.data, 'base64'));
    console.log('Saved stage_nobunaga_pd.png');

    // コアブロック等を削った状態（モザイク露出）をシミュレート
    await send('Runtime.evaluate', {
      expression: `(() => {
        // 解答ボタンを押して解答モーダルを開く
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 600));

    const ssAns = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/stage_nobunaga_answer_modal.png', Buffer.from(ssAns.data, 'base64'));
    console.log('Saved stage_nobunaga_answer_modal.png');

    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
