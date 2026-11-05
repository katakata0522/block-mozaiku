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

    async function submitText(text) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const input = document.querySelector('input[placeholder*=\"答えを打って\"]');
          if (input) {
            const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            nativeSetter.call(input, ${JSON.stringify(text)});
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
          const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答を送信'));
          if (submitBtn) submitBtn.click();
        })()`
      });
    }

    async function openAnswerModal() {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
          if (ansBtn) ansBtn.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 500));
    }

    async function clickNext() {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージへ') || b.textContent.includes('最終結果'));
          if (nextBtn) nextBtn.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 1200));
    }

    // 「歴史＆名画・世界遺産コース」を選択してゲームスタート
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const histBtn = btns.find(b => b.textContent.includes('歴史＆名画'));
        if (histBtn) histBtn.click();
        const startBtn = btns.find(b => b.textContent.includes('ゲームスタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1500));

    // --- STAGE 1 (信長) ---
    console.log('Testing Stage: Nobunaga');
    await openAnswerModal();
    await submitText('織田信長');
    await new Promise((r) => setTimeout(r, 1200));

    const ssNobunaga = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/result_stage_nobunaga.png', Buffer.from(ssNobunaga.data, 'base64'));

    await clickNext();

    // --- STAGE 2 (フェルメール) ---
    console.log('Testing Stage: Vermeer');
    const ssVermeer = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/screen_stage_vermeer.png', Buffer.from(ssVermeer.data, 'base64'));

    await openAnswerModal();
    await submitText('真珠の耳飾りの少女');
    await new Promise((r) => setTimeout(r, 1200));

    const ssVermeerRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/result_stage_vermeer.png', Buffer.from(ssVermeerRes.data, 'base64'));

    await clickNext();

    // --- STAGE 3 (富士山) ---
    console.log('Testing Stage: Fuji');
    const ssFuji = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/screen_stage_fuji.png', Buffer.from(ssFuji.data, 'base64'));

    await openAnswerModal();
    await submitText('富士山');
    await new Promise((r) => setTimeout(r, 1200));

    const ssFujiRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/result_stage_fuji.png', Buffer.from(ssFujiRes.data, 'base64'));

    await clickNext();

    // --- STAGE 4 (自由の女神) ---
    console.log('Testing Stage: Liberty');
    const ssLiberty = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/screen_stage_liberty.png', Buffer.from(ssLiberty.data, 'base64'));

    await openAnswerModal();
    await submitText('自由の女神');
    await new Promise((r) => setTimeout(r, 1200));

    const ssLibertyRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/result_stage_liberty.png', Buffer.from(ssLibertyRes.data, 'base64'));

    await clickNext();

    // --- FINAL SUMMARY ---
    console.log('Testing Summary');
    const ssSummary = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/result_summary_history.png', Buffer.from(ssSummary.data, 'base64'));
    console.log('All tests completed successfully!');

    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
