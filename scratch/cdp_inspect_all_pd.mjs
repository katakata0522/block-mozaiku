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

    // 1. 歴史コースを選択
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const histBtn = btns.find(b => b.textContent.includes('歴史＆名画'));
        if (histBtn) histBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 600));

    // 2. スタートをクリック
    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1500));

    const stageNames = ['nobunaga', 'vermeer', 'fuji', 'liberty'];

    for (let i = 0; i < 4; i++) {
      const name = stageNames[i];
      console.log(`Inspecting Stage ${i+1}: ${name}`);

      // プレイ中（モザイク状態）の撮影
      const ssPlay = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/pd_${i+1}_${name}_mosaic.png`, Buffer.from(ssPlay.data, 'base64'));

      // 回答モーダルを開く
      await send('Runtime.evaluate', {
        expression: `(() => {
          const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
          if (ansBtn) ansBtn.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 600));

      // 「正解を見る（0 pt）」ボタンを押して原本写真・解説・ライセンス全開画面を表示
      await send('Runtime.evaluate', {
        expression: `(() => {
          const giveUpBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
          if (giveUpBtn) giveUpBtn.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 1200));

      // 原本写真・解説全開画面の撮影
      const ssReveal = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/pd_${i+1}_${name}_revealed.png`, Buffer.from(ssReveal.data, 'base64'));
      console.log(`Saved pd_${i+1}_${name}_revealed.png`);

      // 「次のステージへ」または「最終結果を見る」をクリック
      await send('Runtime.evaluate', {
        expression: `(() => {
          const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージへ') || b.textContent.includes('最終結果を見る'));
          if (nextBtn) nextBtn.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 1200));
    }

    // コースサマリー画面の撮影
    const ssSummary = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/pd_summary_history4.png', Buffer.from(ssSummary.data, 'base64'));
    console.log('Saved pd_summary_history4.png');

    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
