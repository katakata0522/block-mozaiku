import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9228;
const artifactDir = "C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed";

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

  await send('Runtime.enable');
  await send('Page.enable');

  async function capture(filename) {
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${artifactDir}/${filename}`, Buffer.from(ss.data, 'base64'));
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. レトロドット絵コースを選択
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ドット絵＆アート'));
      if (btn) btn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 300));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
      if (startBtn) startBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Stage 29 までスキップ（Stage 29で止まる）
  await send('Runtime.evaluate', {
    expression: `(async () => {
      for (let i = 0; i < 30; i++) {
        const text = document.body.innerText;
        if (text.includes('STAGE 29') || text.includes('コーヒー')) {
          console.log('Found Stage 29!');
          break;
        }
        // 回答する -> 正解を見る -> 次へ
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
        await new Promise(r => setTimeout(r, 150));
        const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (giveUp) giveUp.click();
        await new Promise(r => setTimeout(r, 300));
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ') || b.textContent.includes('結果を見る'));
        if (next) next.click();
        await new Promise(r => setTimeout(r, 300));
      }
    })()`,
    awaitPromise: true
  });
  await new Promise((r) => setTimeout(r, 800));

  // 回答を開いて「正解を見る」で全開にしてコーヒーカップを大画面撮影
  await send('Runtime.evaluate', {
    expression: `(() => {
      const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
      if (ansBtn) ansBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 300));
  await send('Runtime.evaluate', {
    expression: `(() => {
      const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
      if (giveUp) giveUp.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1000));

  console.log('Capturing Stage 29 In-Game Revealed...');
  await capture('human_ui_coffee_cup_ingame.png');

  // 次へ進めてコース完了まで行き、サマリー画面のSTAGE 29サムネイルを撮影
  await send('Runtime.evaluate', {
    expression: `(async () => {
      for (let i = 0; i < 10; i++) {
        const text = document.body.innerText;
        if (text.includes('トータルリザルト')) {
          break;
        }
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ') || b.textContent.includes('結果を見る'));
        if (next) {
          next.click();
          await new Promise(r => setTimeout(r, 300));
          continue;
        }
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
        await new Promise(r => setTimeout(r, 150));
        const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (giveUp) giveUp.click();
        await new Promise(r => setTimeout(r, 300));
      }
    })()`,
    awaitPromise: true
  });
  await new Promise((r) => setTimeout(r, 1200));

  // サマリー画面でSTAGE 29が見えるようにスクロール
  await send('Runtime.evaluate', {
    expression: `(() => {
      const items = Array.from(document.querySelectorAll('div, li')).filter(el => el.textContent.includes('STAGE 29'));
      const target = items[items.length - 1];
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    })()`
  });
  await new Promise((r) => setTimeout(r, 800));

  console.log('Capturing Stage 29 in Summary Screen...');
  await capture('human_ui_coffee_summary_thumbnail.png');

  ws.close();
} catch (e) {
  console.error(e);
} finally {
  chromeProcess.kill();
  console.log('Finished capturing coffee verification.');
}
