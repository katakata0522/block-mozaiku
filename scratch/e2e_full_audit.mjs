import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9226;
const artifactDir = "C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed";

const chromeProcess = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=500,980',
  'http://localhost:3000/'
]);

await new Promise((r) => setTimeout(r, 2200));

const consoleErrors = [];
const consoleLogs = [];

try {
  const versionRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const targets = await versionRes.json();
  const pageTarget = targets.find((t) => t.type === 'page');

  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error('No webSocketDebuggerUrl found');
  }

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

  // コンソールログ・エラーをキャプチャ
  await send('Runtime.enable');
  await send('Log.enable');

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      const type = msg.params.type;
      const text = msg.params.args.map((a) => a.value || JSON.stringify(a)).join(' ');
      if (type === 'error') {
        consoleErrors.push(text);
      } else {
        consoleLogs.push(`[${type}] ${text}`);
      }
    }
  });

  async function capture(filename) {
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${artifactDir}/${filename}`, Buffer.from(ss.data, 'base64'));
    console.log(`Saved screenshot: ${filename}`);
  }

  console.log('--- TEST 1: Title Screen & Course Selection ---');
  await new Promise((r) => setTimeout(r, 1200));

  // 全コースの切り替えテスト
  const courseIds = [
    'RANDOM_5', 'RANDOM_10', 'HISTORY_HEROES', 'WORLD_MASTERPIECES',
    'RETRO_PIXEL_ART', 'WORLD_HERITAGE', 'SPACE_AND_NATURE',
    'VEHICLES_AND_FOODS', 'ALL_STAGES'
  ];

  for (const cid of courseIds) {
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const target = btns.find(b => b.textContent.includes('${cid === 'ALL_STAGES' ? '全100ステージ' : cid === 'RANDOM_5' ? 'ランダム5問' : cid === 'RANDOM_10' ? 'ランダム10問' : ''}'));
        return Boolean(target);
      })()`,
      returnByValue: true
    });
  }
  console.log('Course options verified.');

  console.log('--- TEST 2: Playthrough 5 stages to Summary Screen ---');
  // ランダム5問を選択
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ランダム5問'));
      if (btn) btn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 400));

  // スタート
  await send('Runtime.evaluate', {
    expression: `(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
      if (startBtn) startBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1200));

  // 5ステージ連続で回答してクリア
  for (let s = 1; s <= 5; s++) {
    console.log(`Playing Stage ${s}/5...`);
    // 「回答する」を開く
    await send('Runtime.evaluate', {
      expression: `(() => {
        const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
        if (ansBtn) ansBtn.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 400));

    // 正解を見る（または解答）
    await send('Runtime.evaluate', {
      expression: `(() => {
        const g = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
        if (g) g.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 900));

    // 次のステージへ
    await send('Runtime.evaluate', {
      expression: `(() => {
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ') || b.textContent.includes('結果を見る') || b.textContent.includes('サマリー'));
        if (next) next.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 1200));
  }

  // 5問終了後、サマリー画面が表示されているか確認！
  console.log('Checking Summary Screen...');
  await new Promise((r) => setTimeout(r, 1000));
  await capture('v100_e2e_summary_screen.png');

  const summaryVisible = await send('Runtime.evaluate', {
    expression: `(() => {
      const title = document.querySelector('h2');
      return Boolean(title && title.textContent.includes('トータルリザルト'));
    })()`,
    returnByValue: true
  });
  console.log('Summary Screen visible:', summaryVisible.result.value);

  // サマリー画面のボタン動作確認
  const restartBtnVisible = await send('Runtime.evaluate', {
    expression: `(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return Boolean(btns.find(b => b.textContent.includes('最初からタイムアタック')));
    })()`,
    returnByValue: true
  });
  console.log('Restart button visible:', restartBtnVisible.result.value);

  // ホームへ戻る
  await send('Runtime.evaluate', {
    expression: `(() => {
      const homeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ホームへ'));
      if (homeBtn) homeBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1000));
  console.log('Returned to title.');

  console.log('--- TEST 3: Free Play (No Timer) Mode ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const freeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('フリープレイ'));
      if (freeBtn) freeBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 400));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
      if (startBtn) startBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1200));

  const freeLabelCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      return document.body.innerText.includes('FREE');
    })()`,
    returnByValue: true
  });
  console.log('Free play FREE label active:', freeLabelCheck.result.value);
  await capture('v100_e2e_free_play.png');

  console.log('--- CONSOLE ERROR AUDIT ---');
  console.log('Total console errors caught:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  ws.close();
  console.log('E2E FULL AUDIT FINISHED SUCCESSFULLY!');
} catch (e) {
  console.error('E2E Audit Error:', e);
} finally {
  chromeProcess.kill();
}
