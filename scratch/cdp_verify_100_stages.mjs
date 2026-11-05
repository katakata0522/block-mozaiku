import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9223;
const artifactDir = "C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed";

const chromeProcess = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=500,980',
  'http://localhost:3000/'
]);

await new Promise((r) => setTimeout(r, 2200));

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

    async function capture(filename) {
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${artifactDir}/${filename}`, Buffer.from(ss.data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
    }

    // 1. タイトル画面
    await new Promise((r) => setTimeout(r, 1000));
    await capture('v100_title_screen.png');

    // コース一覧の確認
    const coursesResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('button'));
        return cards.map(c => c.textContent.trim()).filter(t => t.includes('問') || t.includes('制覇'));
      })()`,
      returnByValue: true
    });
    console.log('Available course options:', coursesResult.result.value);

    // 2. 「歴史の偉人・英雄」コースを選択してスタート
    console.log('Testing HISTORY_HEROES...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('歴史の偉人') || b.textContent.includes('歴史＆'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));

    // スタート
    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート') || b.textContent.includes('スタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // 1問目（信長）
    await capture('v100_stage_nobunaga.png');

    // パスして2問目（秀吉）へ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const skip = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('パス') || b.textContent.includes('スキップ') || b.textContent.includes('回答する'));
        if (skip) skip.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 400));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (giveUp) giveUp.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 900));

    // 次へ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ') || b.textContent.includes('次へ'));
        if (next) next.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // パスして3問目（徳川家康 STAGE 51）へ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const skip = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('パス') || b.textContent.includes('スキップ') || b.textContent.includes('回答する'));
        if (skip) skip.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 400));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (giveUp) giveUp.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 900));

    // 次へ -> 徳川家康へ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ') || b.textContent.includes('次へ'));
        if (next) next.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // STAGE 51: 徳川家康の原本写真ステージ
    await capture('v100_stage_ieyasu.png');

    // 「回答する」をクリックして正解を見る
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
    await capture('v100_ieyasu_revealed.png');

    // 3. タイトルへ戻り「ドット絵＆アート」コースを検証（STAGE 93: 王冠）
    console.log('Testing RETRO_PIXEL_ART (STAGE 93: 王冠)...');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise((r) => setTimeout(r, 1500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ドット絵＆アート') || b.textContent.includes('ドット絵'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート') || b.textContent.includes('スタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // STAGE 93: 王冠のピクセルアート
    await capture('v100_stage_crown.png');

    // 正解を見る
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
    await capture('v100_crown_revealed.png');

    // 4. 「宇宙・大自然・動物」コースを検証（STAGE 79: 地球）
    console.log('Testing SPACE_AND_NATURE (STAGE 79: 地球)...');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise((r) => setTimeout(r, 1500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('宇宙・大自然') || b.textContent.includes('宇宙'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート') || b.textContent.includes('スタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // STAGE 79: 地球（ブルーマーブル）
    await capture('v100_stage_earth.png');

    // 正解を見る
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
    await capture('v100_earth_revealed.png');

    // 5. 「世界の傑作名画」コースを検証（STAGE 60: 星月夜）
    console.log('Testing WORLD_MASTERPIECES (STAGE 60: 星月夜)...');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise((r) => setTimeout(r, 1500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('傑作名画'));
        if (btn) btn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 500));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート') || b.textContent.includes('スタート'));
        if (startBtn) startBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // モナリザをスキップして2問目の星月夜へ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const skip = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('パス') || b.textContent.includes('スキップ') || b.textContent.includes('回答する'));
        if (skip) skip.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 400));
    await send('Runtime.evaluate', {
      expression: `(() => {
        const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (giveUp) giveUp.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 900));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ') || b.textContent.includes('次へ'));
        if (next) next.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));

    // STAGE 60: 星月夜
    await capture('v100_stage_starry_night.png');

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
    await capture('v100_starry_night_revealed.png');

    console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
    ws.close();
  }
} catch (e) {
  console.error('CDP test error:', e);
} finally {
  chromeProcess.kill();
}
