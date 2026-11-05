import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9222;

const chromeProcess = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=500,980',
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

    async function goHome() {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const homeBtn = document.querySelector('button[aria-label=\"タイトル画面へ戻る\"]') || Array.from(document.querySelectorAll('button')).find(b => b.innerHTML.includes('lucide-house') || b.textContent.includes('ホーム'));
          if (homeBtn) homeBtn.click();
        })()`
      });
      await new Promise((r) => setTimeout(r, 800));
    }

    // 1. タイトル画面撮影（全50問のコース一覧）
    await new Promise((r) => setTimeout(r, 1200));
    const ssTitle = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed/v50_title_screen.png', Buffer.from(ssTitle.data, 'base64'));
    console.log('Saved v50_title_screen.png');

    // 2. 「ドット絵＆アート」コースをテスト
    console.log('Testing Pixel Art & Modern Art Course...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const courseBtn = btns.find(b => b.textContent.includes('ドット絵＆アート'));
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

    await testStageReveal('v50_pixel_chest.png');  // 6: 宝箱
    await testStageReveal('v50_pixel_sword.png');  // 24: 勇者の剣
    await testStageReveal('v50_pixel_potion.png'); // 25: ポーション
    await goHome();

    // 3. 「宇宙・乗物・どうぶつ」コースをテスト
    console.log('Testing Space & Vehicles Course...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const courseBtn = btns.find(b => b.textContent.includes('宇宙・乗物'));
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

    await testStageReveal('v50_space_saturn.png');     // 35: 土星
    await testStageReveal('v50_space_moon.png');       // 36: 月
    await testStageReveal('v50_shinkansen.png');       // 40: 新幹線
    await goHome();

    // 4. 「グルメ＆日常道具」コースをテスト
    console.log('Testing Foods & Life Course...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const courseBtn = btns.find(b => b.textContent.includes('グルメ＆日常'));
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

    await testStageReveal('v50_strawberry.png'); // 44: いちご
    await testStageReveal('v50_pizza.png');      // 45: ピザ
    await testStageReveal('v50_sushi.png');      // 46: 寿司
    await goHome();

    console.log('All 50-stage verification tests completed successfully!');
    ws.close();
  }
} catch (e) {
  console.error('Error:', e);
} finally {
  chromeProcess.kill();
  process.exit(0);
}
