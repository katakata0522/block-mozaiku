import fs from 'fs';

let code = fs.readFileSync('src/components/TitleScreen.tsx', 'utf8');

// 1. ヘッダー重複の解消とコンパクト化
const oldHeader = `      {/* 売り物クオリティの洗練されたブランドヘッダー */}
      <div className="text-center shrink-0 pb-1.5 pt-0.5">
        <div className="flex items-center justify-center gap-2 mb-1">
          <BrandLogo size={24} />
          <span className="font-display text-[11px] font-extrabold tracking-widest uppercase text-blue-600">
            MOSAIC BREAK
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
            <Sparkles className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
            <span>全100問</span>
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight leading-snug">
          モザイクブレイク
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5 max-w-sm mx-auto leading-relaxed text-balance">
          壊すほど原画が晴れていく。何の写真かひらめいた瞬間に答えてハイスコア！
        </p>
      </div>`;

const newHeader = `      {/* 洗練されたブランドヘッダー（重複排除・コンテンツ最優先） */}
      <div className="text-center shrink-0 pb-1 pt-0.5">
        <div className="flex items-center justify-center gap-2 mb-0.5">
          <BrandLogo size={22} />
          <h1 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight">
            モザイクブレイク
          </h1>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
            <Sparkles className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
            <span>全100問</span>
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 max-w-sm mx-auto leading-normal text-balance">
          壊すほど写真が露出。ひらめいた瞬間に答えて最速タイムを目指そう！
        </p>
      </div>`;

code = code.replace(oldHeader, newHeader);

// 2. デモカードのアスペクト比をスマホでスリム化（コース一覧の可視性確保）
code = code.replace(
  'className="relative w-full max-w-[260px] sm:max-w-[280px] aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200 shadow-sm cursor-pointer group select-none transition hover:shadow-md"',
  'className="relative w-full max-w-[240px] sm:max-w-[280px] aspect-[20/9] sm:aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200 shadow-sm cursor-pointer group select-none transition hover:shadow-md"'
);

// 3. モード切替の文言（「制限時間あり」を排除）
code = code.replace(
  '⏱️ タイムアタック（制限時間あり）',
  '⏱️ タイムアタック（最速クリア）'
);
code = code.replace(
  '☕ フリープレイ（時間無制限）',
  '☕ フリープレイ（練習モード）'
);

fs.writeFileSync('src/components/TitleScreen.tsx', code, 'utf8');
console.log('Successfully updated TitleScreen.tsx');
