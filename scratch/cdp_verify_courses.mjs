import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9222;

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

    // 1. タイトル画面の全6コース表示を撮影
    await new Promise((r) => setTimeout(r, 1200));
    const ssTitle = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/v23_title_screen.png', Buffer.from(ssTitle.data, 'base64'));
    console.log('Saved v23_title_screen.png');

    // 2. 「世界の傑作名画」コースを選択してゲームスタート
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const courseBtn = btns.find(b => b.textContent.includes('傑作名画'));
        if (courseBtn) courseBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 600));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1500));

    // STAGE 1 (モナ・リザ) 撮影
    const ssMona = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/v23_stage_mona_lisa_mosaic.png', Buffer.from(ssMona.data, 'base64'));

    // 回答モーダルで正解を開示
    await send('Runtime.evaluate', {
      expression: `(() => {
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const giveUpBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (giveUpBtn) giveUpBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // モナ・リザ原本正解画面
    const ssMonaRevealed = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/v23_stage_mona_lisa_revealed.png', Buffer.from(ssMonaRevealed.data, 'base64'));

    // 次のステージ（ひまわり）
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージへ'));
        if (nextBtn) nextBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const giveUpBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (giveUpBtn) giveUpBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // ひまわり原本正解画面
    const ssSunflowersRevealed = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/v23_stage_sunflowers_revealed.png', Buffer.from(ssSunflowersRevealed.data, 'base64'));

    // 次のステージ（叫び）
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージへ'));
        if (nextBtn) nextBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const giveUpBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (giveUpBtn) giveUpBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 叫び原本正解画面
    const ssScreamRevealed = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/v23_stage_scream_revealed.png', Buffer.from(ssScreamRevealed.data, 'base64'));

    console.log('All sample verifications completed successfully!');
    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
