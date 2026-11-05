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

    async function testStageReveal(filename) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
          if (ansBtn) ansBtn.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 400));
      await send('Runtime.evaluate', {
        expression: `(() => {
          const giveUpBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
          if (giveUpBtn) giveUpBtn.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 900));

      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/${filename}`, Buffer.from(ss.data, 'base64'));
      console.log(`Saved ${filename}`);

      await send('Runtime.evaluate', {
        expression: `(() => {
          const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージへ') || b.textContent.includes('最終結果を見る'));
          if (nextBtn) nextBtn.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 1000));
    }

    // 世界遺産コースを選択
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const courseBtn = btns.find(b => b.textContent.includes('世界遺産＆自然'));
        if (courseBtn) courseBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1400));

    // 自由の女神(1), 富士山(2), ピラミッド(3), エッフェル塔(4)
    await testStageReveal('skip_1.png');
    await testStageReveal('skip_2.png');
    await testStageReveal('skip_3.png');
    await testStageReveal('check_eiffel_adjusted.png'); // 4: エッフェル塔

    // ホームに戻る
    await send('Runtime.evaluate', {
      expression: `(() => {
        const homeBtn = document.querySelector('button[aria-label=\"タイトル画面へ戻る\"]') || Array.from(document.querySelectorAll('button')).find(b => b.innerHTML.includes('lucide-house') || b.textContent.includes('ホーム'));
        if (homeBtn) homeBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 800));

    // どうぶつコースを選択
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const courseBtn = btns.find(b => b.textContent.includes('どうぶつ＆日常'));
        if (courseBtn) courseBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1400));

    // パンダ(1), ライオン(2), ペンギン(3)
    await testStageReveal('skip_p1.png');
    await testStageReveal('skip_p2.png');
    await testStageReveal('check_penguin_adjusted.png'); // 3: ペンギン

    console.log('Adjusted checks done!');
    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
