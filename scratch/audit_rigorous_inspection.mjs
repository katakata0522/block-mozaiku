import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9232;
const artifactDir = "C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed";

const chromeProcess = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=390,844', // iPhone 13/14 standard viewport
  'http://localhost:3000/'
]);

await new Promise((r) => setTimeout(r, 2000));

const auditResults = {
  consoleErrors: [],
  consoleWarnings: [],
  viewportOverflows: [],
  logicFlaws: [],
  capturedScreenshots: []
};

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

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Log.enable');

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      const type = msg.params.type;
      const text = msg.params.args.map((a) => a.value || JSON.stringify(a)).join(' ');
      if (type === 'error') {
        auditResults.consoleErrors.push(text);
      } else if (type === 'warning') {
        auditResults.consoleWarnings.push(text);
      }
    }
  });

  async function capture(filename) {
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${artifactDir}/${filename}`, Buffer.from(ss.data, 'base64'));
    auditResults.capturedScreenshots.push(filename);
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. タイトル画面の検査（390x844 モバイルビューポート）
  console.log('--- AUDIT 1: Title Screen on iPhone (390x844) ---');
  await new Promise((r) => setTimeout(r, 1500));
  await capture('audit_title_iphone390.png');

  // 要素のはみ出しチェック
  const overflowCheck1 = await send('Runtime.evaluate', {
    expression: `(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        scrollHeight: doc.scrollHeight,
        clientHeight: doc.clientHeight,
        hasHorizontalScroll: doc.scrollWidth > doc.clientWidth,
        hasVerticalOverflow: doc.scrollHeight > doc.clientHeight
      };
    })()`,
    returnByValue: true
  });
  console.log('Title Screen Viewport metrics:', overflowCheck1.value);

  // 2. ゲーム開始（ランダム5問）
  console.log('--- AUDIT 2: Start Game ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ゲームスタート'));
      if (startBtn) startBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1200));
  await capture('audit_play_stage1_ready.png');

  // 3. ボール発射とプレイ中のキャンバス動作
  console.log('--- AUDIT 3: Launch Ball & In-flight inspection ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) canvas.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture('audit_play_inflight.png');

  // 4. 回答モーダル展開時の動作（ボールの一時停止・UIレイアウト）
  console.log('--- AUDIT 4: Answer Modal Open in Mid-flight ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
      if (ansBtn) ansBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 600));
  await capture('audit_answer_modal_open.png');

  // 誤答テスト（ペナルティメッセージとタイム加算の確認）
  console.log('--- AUDIT 5: Submit Wrong Answer ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      // かなキーを2回タップして誤答送信
      const kanaBtns = Array.from(document.querySelectorAll('button')).filter(b => b.className.includes('keycap-btn') && b.textContent.length === 1);
      if (kanaBtns[0]) kanaBtns[0].click();
      if (kanaBtns[1]) kanaBtns[1].click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 300));
  await send('Runtime.evaluate', {
    expression: `(() => {
      const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('送信'));
      if (submitBtn) submitBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 600));
  await capture('audit_answer_wrong_feedback.png');

  // 戻るボタンを押してゲーム復帰
  console.log('--- AUDIT 6: Return from Answer Modal ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('戻る'));
      if (backBtn) backBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 600));
  await capture('audit_returned_to_game.png');

  // 一時停止テスト
  console.log('--- AUDIT 7: Pause Menu Test ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const pauseBtn = document.querySelector('button[title="一時停止"]');
      if (pauseBtn) pauseBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 600));
  await capture('audit_pause_screen.png');

  // 再開
  await send('Runtime.evaluate', {
    expression: `(() => {
      const resumeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('プレイを再開'));
      if (resumeBtn) resumeBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 600));

  // 正解を見る -> ステージリザルト画面
  console.log('--- AUDIT 8: Stage Result Dock ---');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const ansBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('回答する'));
      if (ansBtn) ansBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 400));
  await send('Runtime.evaluate', {
    expression: `(() => {
      const giveUp = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('正解を見る'));
      if (giveUp) giveUp.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture('audit_stage_result_dock.png');

  // 5問完走してサマリー画面
  console.log('--- AUDIT 9: Complete 5 Stages to Summary ---');
  for (let s = 2; s <= 5; s++) {
    await send('Runtime.evaluate', {
      expression: `(() => {
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('次のステージ') || b.textContent.includes('トータル結果へ'));
        if (next) next.click();
      })()`
    });
    await new Promise((r) => setTimeout(r, 600));

    // 回答 -> 正解を見る
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
    await new Promise((r) => setTimeout(r, 600));
  }

  // 最後のトータル結果へ
  await send('Runtime.evaluate', {
    expression: `(() => {
      const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('トータル結果へ') || b.textContent.includes('結果を見る') || b.textContent.includes('次のステージ'));
      if (next) next.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1200));
  await capture('audit_summary_screen.png');

  // 10. スマホ最小サイズ（375x667: iPhone SE）でのレイアウトテスト
  console.log('--- AUDIT 10: Viewport 375x667 (iPhone SE) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise((r) => setTimeout(r, 800));
  await capture('audit_summary_iphonese.png');

  // タイトルに戻る
  await send('Runtime.evaluate', {
    expression: `(() => {
      const homeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ホームへ'));
      if (homeBtn) homeBtn.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 1000));
  await capture('audit_title_iphonese.png');

  ws.close();
  console.log('Audit completed successfully!');
  console.log('Audit summary:', JSON.stringify(auditResults, null, 2));
} catch (e) {
  console.error('Audit script failed:', e);
} finally {
  chromeProcess.kill();
}
