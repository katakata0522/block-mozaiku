import WebSocket from 'ws';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getStageCanonicalKana } from '../src/utils/minhayaChoices.js';

const ARTIFACT_DIR = 'C:/Users/tomok/.gemini/antigravity/brain/e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed';
const PORT = 9246;
const APP_URL = process.env.APP_URL || 'http://localhost:3001/';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const chromeProcess = spawn(CHROME_PATH, [
  `--remote-debugging-port=${PORT}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=390,844',
  APP_URL,
]);

await new Promise((r) => setTimeout(r, 2000));

const consoleErrors = [];
const overflowChecks = [];

try {
  const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const targets = await versionRes.json();
  const pageTarget = targets.find((t) => t.type === 'page');

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve) => (ws.onopen = resolve));

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const curId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === curId) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(new Error(JSON.stringify(msg.error)));
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      consoleErrors.push(msg.params.args.map((a) => a.value || JSON.stringify(a)).join(' '));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(JSON.stringify(msg.params.exceptionDetails));
    }
  });

  await send('Runtime.enable');
  await send('Page.enable');
  await send('DOM.enable');

  const setViewport = async (width, height, mobile = true) => {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 3,
      mobile,
    });
    await new Promise((r) => setTimeout(r, 250));
  };

  const checkOverflow = async (label) => {
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const doc = document.documentElement;
        return {
          scrollW: doc.scrollWidth,
          clientW: doc.clientWidth,
          scrollH: doc.scrollHeight,
          clientH: doc.clientHeight,
          hasOverflow: doc.scrollWidth > doc.clientWidth + 1 || doc.scrollHeight > doc.clientHeight + 1
        };
      })()`,
      returnByValue: true,
    });
    overflowChecks.push({ label, ...res.result.value });
  };

  const capture = async (filename) => {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    fs.writeFileSync(path.join(ARTIFACT_DIR, filename), buffer);
    console.log(`Saved: ${filename}`);
  };

  // --- 1. タイトル画面 (iPhone 14: 390x844) ---
  await setViewport(390, 844, true);
  await new Promise((r) => setTimeout(r, 800));
  await checkOverflow('title_390x844');
  await capture('arcade_01_title.png');

  // --- 2. ゲームスタート → プレイ待機画面 ---
  await send('Runtime.evaluate', {
    expression: `(() => {
      const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('ゲームスタート'));
      if (b) b.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 1300));
  await checkOverflow('play_ready_390x844');
  await capture('arcade_02_play_ready.png');

  // --- 3. ボール発射＆複数バウンス（クラック・コメットテイル・クリムゾン早押しブザー点灯確認） ---
  await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelector('canvas');
      if (c) c.click();
      // 左右にパドルをスイープしてボールを落とさず複数回打ち返すテスト補助
      let t = 0;
      window.__SWEEP_TIMER__ = setInterval(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        t += 0.35;
        const clientX = rect.left + rect.width * (0.5 + Math.sin(t) * 0.28);
        canvas.dispatchEvent(new PointerEvent('pointermove', {
          bubbles: true,
          clientX,
          clientY: rect.top + rect.height * 0.9,
          pointerType: 'mouse',
          buttons: 1
        }));
      }, 40);
    })()`,
  });

  // まずは初撃ヒット直後のクラック＆コメットテイル撮影
  await new Promise((r) => setTimeout(r, 750));
  await checkOverflow('play_inflight_390x844');
  await capture('arcade_03_play_inflight_cracks.png');

  // さらにラリーを続けてブロックを割り、下部ボタンがクリムゾンレッド（.buzzer-ready）に点灯するまで最大4.5秒待つ
  for (let attempt = 0; attempt < 15; attempt++) {
    const litRes = await send('Runtime.evaluate', {
      expression: `Boolean(document.querySelector('.buzzer-ready'))`,
      returnByValue: true,
    });
    if (litRes.result.value) break;
    await new Promise((r) => setTimeout(r, 300));
  }
  await checkOverflow('play_buzzer_lit_390x844');
  await capture('arcade_03b_buzzer_lit.png');

  // スイープ停止
  await send('Runtime.evaluate', {
    expression: `clearInterval(window.__SWEEP_TIMER__)`,
  });

  // もし偶然落球カウントダウン中なら復帰を待つ
  await new Promise((r) => setTimeout(r, 300));
  for (let w = 0; w < 10; w++) {
    const canAnswer = await send('Runtime.evaluate', {
      expression: `(() => {
        const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('何の写真か回答する'));
        return Boolean(b && !b.disabled);
      })()`,
      returnByValue: true,
    });
    if (canAnswer.result.value) break;
    await new Promise((r) => setTimeout(r, 300));
  }

  // --- 4. 回答ドック起動＆1文字正解入力（電光スロット＆スプリング文字表示＆4色立体キートップ） ---
  await send('Runtime.evaluate', {
    expression: `(() => {
      const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('何の写真か回答する'));
      if (b) b.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 450));
  await checkOverflow('answer_dock_390x844');
  await capture('arcade_04_answer_dock_initial.png');

  // iPhone SE (375x667) でも回答ドック表示時に1pxも溢れないか検証！
  await setViewport(375, 667, true);
  await checkOverflow('answer_dock_iphoneSE_375x667');
  await capture('arcade_05_answer_dock_iphonese.png');

  // 390x844に戻す
  await setViewport(390, 844, true);

  const stageRes = await send('Runtime.evaluate', {
    expression: `window.__CURRENT_STAGE__`,
    returnByValue: true,
  });
  const currentStage = stageRes.result.value;
  const canonical = getStageCanonicalKana(currentStage);
  console.log(`Current Stage: ${currentStage.id} (${currentStage.displayAnswer}) -> "${canonical}"`);

  // 1文字目を正解タップ
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btns = Array.from(document.querySelectorAll('.arcade-choice-btn'));
      const match = btns.find(b => b.querySelector('span:last-child')?.textContent?.trim() === '${canonical[0]}');
      if (match) match.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 300));
  await capture('arcade_06_answer_char_typed.png');

  // --- 5. 2文字目でわざと誤答タップ → タイマー真紅激震 + "+5.0s" ポップアップ + 警告バナー確認 ---
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btns = Array.from(document.querySelectorAll('.arcade-choice-btn'));
      const wrong = btns.find(b => b.querySelector('span:last-child')?.textContent?.trim() !== '${canonical[1]}');
      if (wrong) wrong.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 200));
  await capture('arcade_07_wrong_penalty_shake.png');

  // カウントダウン終了＋万一の落球復帰まで確実にボタンが有効になるのを待つ
  await new Promise((r) => setTimeout(r, 2000));
  for (let w = 0; w < 12; w++) {
    const canAnswer = await send('Runtime.evaluate', {
      expression: `(() => {
        const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('何の写真か回答する'));
        return Boolean(b && !b.disabled);
      })()`,
      returnByValue: true,
    });
    if (canAnswer.result.value) break;
    await new Promise((r) => setTimeout(r, 300));
  }

  // --- 6. 再度回答ドックを開き、全文字正解してミュージアム額装ギャラリーリザルト確認！ ---
  await send('Runtime.evaluate', {
    expression: `(() => {
      const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('何の写真か回答する'));
      if (b) b.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 350));

  for (let i = 0; i < canonical.length; i++) {
    const ch = canonical[i];
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('.arcade-choice-btn'));
        const match = btns.find(b => b.querySelector('span:last-child')?.textContent?.trim() === '${ch}');
        if (match) match.click();
      })()`,
    });
    await new Promise((r) => setTimeout(r, 250));
  }

  await new Promise((r) => setTimeout(r, 400));
  await checkOverflow('stage_result_390x844');
  await capture('arcade_08_stage_clear_gallery.png');

  // iPhone SE (375x667) でもクリアギャラリーが1pxも溢れないか検証！
  await setViewport(375, 667, true);
  await checkOverflow('stage_result_iphoneSE_375x667');
  await capture('arcade_08b_stage_clear_iphonese.png');
  await setViewport(390, 844, true);

  // --- 7. スコア一覧（トータルリザルト）画面確認 ---
  await send('Runtime.evaluate', {
    expression: `(() => {
      const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('一覧'));
      if (b) b.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 500));
  await checkOverflow('summary_390x844');
  await capture('arcade_09_summary.png');

  console.log('=== OVERFLOW AUDIT ===');
  console.log(JSON.stringify(overflowChecks, null, 2));
  console.log('=== CONSOLE ERRORS ===');
  console.log(JSON.stringify(consoleErrors, null, 2));

  ws.close();
} catch (err) {
  console.error('Verification failed:', err);
} finally {
  chromeProcess.kill();
}
