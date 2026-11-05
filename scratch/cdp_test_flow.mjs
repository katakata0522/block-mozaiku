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

    // 1. 「歴史＆名画・世界遺産コース」ボタンをクリック
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const histBtn = btns.find(b => b.textContent.includes('歴史＆名画'));
        if (histBtn) histBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 400));

    // ゲームスタート
    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 回答するボタンを押して「織田信長」と入力・送信
    await send('Runtime.evaluate', {
      expression: `(() => {
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const input = document.querySelector('input[placeholder*=\"答えを打って\"]');
        if (input) {
          input.value = '織田信長';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答を送信'));
        if (submitBtn) submitBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 信長 正解リザルト画面撮影
    const ssNobunagaResult = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/nobunaga_correct_result.png', Buffer.from(ssNobunagaResult.data, 'base64'));
    console.log('Saved nobunaga_correct_result.png');

    // 「次のステージへ」をクリック（Stage 5: フェルメール）
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージへ'));
        if (nextBtn) nextBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // フェルメール ステージ画面撮影
    const ssVermeer = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/stage_vermeer_pd.png', Buffer.from(ssVermeer.data, 'base64'));
    console.log('Saved stage_vermeer_pd.png');

    // 「真珠の耳飾りの少女」と入力・送信
    await send('Runtime.evaluate', {
      expression: `(() => {
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const input = document.querySelector('input[placeholder*=\"答えを打って\"]');
        if (input) {
          input.value = '真珠の耳飾りの少女';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答を送信'));
        if (submitBtn) submitBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 「次のステージへ」（Stage 7: 富士山）
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージへ'));
        if (nextBtn) nextBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 富士山ステージ撮影
    const ssFuji = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/stage_fuji_pd.png', Buffer.from(ssFuji.data, 'base64'));
    console.log('Saved stage_fuji_pd.png');

    // 「富士山」と入力・送信
    await send('Runtime.evaluate', {
      expression: `(() => {
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const input = document.querySelector('input[placeholder*=\"答えを打って\"]');
        if (input) {
          input.value = '富士山';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答を送信'));
        if (submitBtn) submitBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 「次のステージへ」（Stage 8: 自由の女神）
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージへ'));
        if (nextBtn) nextBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 自由の女神ステージ撮影
    const ssLiberty = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/stage_liberty_pd.png', Buffer.from(ssLiberty.data, 'base64'));
    console.log('Saved stage_liberty_pd.png');

    // 「自由の女神」と入力・送信
    await send('Runtime.evaluate', {
      expression: `(() => {
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const input = document.querySelector('input[placeholder*=\"答えを打って\"]');
        if (input) {
          input.value = '自由の女神';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答を送信'));
        if (submitBtn) submitBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 最終サマリーへ進む
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('最終結果を見る') || b.textContent.includes('次のステージへ'));
        if (nextBtn) nextBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // コースサマリー画面撮影
    const ssSummary = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/summary_course_history.png', Buffer.from(ssSummary.data, 'base64'));
    console.log('Saved summary_course_history.png');

    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
