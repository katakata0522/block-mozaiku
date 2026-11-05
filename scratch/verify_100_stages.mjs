import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs';

const artifactDir = 'C:\\Users\\tomok\\.gemini\\antigravity\\brain\\e4b1f208-a8f4-4ac9-8cdc-c8a1c3f54eed';

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

  // 1. タイトル画面のスクリーンショット
  console.log('Taking title screen screenshot...');
  await page.screenshot({ path: path.join(artifactDir, 'v100_title_screen.png') });

  // 各コースの存在確認
  const courseButtons = await page.$$eval('button', (btns) =>
    btns.map((b) => b.innerText.trim()).filter((t) => t.length > 0)
  );
  console.log('Found buttons:', courseButtons.filter((t) => t.includes('問') || t.includes('制覇') || t.includes('スタート')));

  // 2. 「歴史の偉人・英雄」コース（信長・家康など）を選択してスタート
  console.log('Selecting HISTORY_HEROES course...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const heroBtn = btns.find((b) => b.innerText.includes('歴史の偉人') || b.innerText.includes('歴史＆'));
    if (heroBtn) heroBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  // スタートボタンをクリック
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find((b) => b.innerText.includes('ゲームスタート') || b.innerText.includes('スタート'));
    if (startBtn) startBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // 最初のステージ（信長）
  await page.screenshot({ path: path.join(artifactDir, 'v100_stage_nobunaga.png') });

  // スキップで第3問（徳川家康 STAGE 51）へ進む
  console.log('Skipping to Tokugawa Ieyasu (STAGE 51)...');
  // スキップボタンを探してクリック
  for (let i = 0; i < 2; i++) {
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const skipBtn = btns.find((b) => b.innerText.includes('パス') || b.innerText.includes('ギブアップ') || b.innerText.includes('スキップ'));
      if (skipBtn) skipBtn.click();
    });
    await new Promise((r) => setTimeout(r, 1000));
    // 結果画面なら「次のステージ」をクリック
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const nextBtn = btns.find((b) => b.innerText.includes('次へ') || b.innerText.includes('次のステージ'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise((r) => setTimeout(r, 1200));
  }

  // 徳川家康ステージのスクリーンショット
  console.log('Taking Tokugawa Ieyasu stage screenshot...');
  await page.screenshot({ path: path.join(artifactDir, 'v100_stage_ieyasu.png') });

  // 徳川家康に正解してみる
  console.log('Typing answer: とくがわいえやす...');
  await page.evaluate(() => {
    const input = document.querySelector('input');
    if (input) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(input, 'とくがわいえやす');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'v100_ieyasu_correct.png') });

  // 3. タイトルへ戻り「ドット絵＆アート」コースを検証
  console.log('Returning to title and testing RETRO_PIXEL_ART (STAGE 93: 王冠)...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const artBtn = btns.find((b) => b.innerText.includes('ドット絵＆アート') || b.innerText.includes('ドット絵'));
    if (artBtn) artBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find((b) => b.innerText.includes('ゲームスタート') || b.innerText.includes('スタート'));
    if (startBtn) startBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // 王冠ステージ
  console.log('Taking Crown (STAGE 93) screenshot...');
  await page.screenshot({ path: path.join(artifactDir, 'v100_stage_crown.png') });

  // かな文字パッドで「お」「う」「か」「ん」をクリック入力
  console.log('Clicking kana pad buttons for 王冠: お, う, か, ん...');
  await page.evaluate(() => {
    const kanaToClick = ['お', 'う', 'か', 'ん'];
    const btns = Array.from(document.querySelectorAll('button'));
    for (const char of kanaToClick) {
      const kBtn = btns.find((b) => b.innerText.trim() === char);
      if (kBtn) kBtn.click();
    }
  });
  await new Promise((r) => setTimeout(r, 800));

  // 決定ボタンをクリック
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submitBtn = btns.find((b) => b.innerText.includes('決定') || b.innerText.includes('判定'));
    if (submitBtn) submitBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'v100_crown_correct.png') });

  // 4. 「宇宙・大自然・動物」コースを検証（STAGE 79: 地球）
  console.log('Testing SPACE_AND_NATURE course (STAGE 79: 地球)...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const spaceBtn = btns.find((b) => b.innerText.includes('宇宙・大自然') || b.innerText.includes('宇宙'));
    if (spaceBtn) spaceBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find((b) => b.innerText.includes('ゲームスタート') || b.innerText.includes('スタート'));
    if (startBtn) startBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // 地球ステージ
  console.log('Taking Earth (STAGE 79) screenshot...');
  await page.screenshot({ path: path.join(artifactDir, 'v100_stage_earth.png') });

  // 「ちきゅう」と入力して正解
  console.log('Typing answer: ちきゅう...');
  await page.evaluate(() => {
    const input = document.querySelector('input');
    if (input) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(input, 'ちきゅう');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'v100_earth_correct.png') });

  // 5. 「世界の傑作名画」コースを検証（STAGE 13: モナ・リザ -> STAGE 60: 星月夜）
  console.log('Testing WORLD_MASTERPIECES course (STAGE 60: 星月夜)...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const artBtn = btns.find((b) => b.innerText.includes('傑作名画'));
    if (artBtn) artBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find((b) => b.innerText.includes('ゲームスタート') || b.innerText.includes('スタート'));
    if (startBtn) startBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // パスして2問目（星月夜 STAGE 60）へ
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const skipBtn = btns.find((b) => b.innerText.includes('パス') || b.innerText.includes('ギブアップ') || b.innerText.includes('スキップ'));
    if (skipBtn) skipBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const nextBtn = btns.find((b) => b.innerText.includes('次へ') || b.innerText.includes('次のステージ'));
    if (nextBtn) nextBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // 星月夜
  console.log('Taking Starry Night (STAGE 60) screenshot...');
  await page.screenshot({ path: path.join(artifactDir, 'v100_stage_starry_night.png') });

  await browser.close();
  console.log('All tests completed successfully!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
