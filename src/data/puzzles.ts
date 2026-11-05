import { STAGES_101_TO_200 } from './stages101to200';
import { renderStage101To200Artwork } from './stages101to200Artwork';

export interface PuzzleStage {
  id: number;
  title: string;
  displayAnswer: string;
  readingHint: string;
  categoryLabel: string;
  charCountHint: string;
  initialKanaHint: string;
  kanaPad: string[]; // 1文字ずつ打てる16文字かなパッド（選択肢ギャンブルを防ぎつつスマホでも快適に入力可能）
  coreTileIndices: number[];
  rivalTargetSec: number; // 対戦想定のターゲット早押しタイム（秒）
  acceptedAnswers: string[];
  acceptedKeywords: string[]; // 修飾語つき入力（「赤い傘」「白い自転車」「銀のやかん」等）でも許容するコア語幹
  photoUrl: string;
  remotePhotoUrl: string;
  description: string;
  provenance: {
    source: string;
    author: string;
    license: string;
    verificationDate: string;
  };
}

export const PUZZLE_STAGES: PuzzleStage[] = [
  {
    id: 1,
    title: 'STAGE 1',
    displayAnswer: '傘（かさ）',
    readingHint: '雨の日に広げて使う日用品',
    categoryLabel: '日用品・雨具',
    charCountHint: 'ひらがな2文字 / 漢字1文字 / カタカナ・英語も自動判定',
    initialKanaHint: '頭文字：「か」から始まる2文字（漢字「傘」も可）',
    kanaPad: ['か', 'さ', 'あ', 'ま', 'が', 'ひ', 'ぱ', 'ら', 'そ', 'る', 'い', 'き', 'し', 'ん', 'ぶ', 'れ'],
    coreTileIndices: [7, 9, 14, 16, 20, 22],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      '傘',
      'かさ',
      'カサ',
      '雨傘',
      'あまがさ',
      'アマガサ',
      '洋傘',
      'ようがさ',
      'ヨウガサ',
      '日傘',
      'ひがさ',
      '長傘',
      'なががさ',
      '番傘',
      'ばんがさ',
      '和傘',
      'わがさ',
      'ジャンプ傘',
      'じゃんぷがさ',
      'ビニール傘',
      'びにーるがさ',
      '折りたたみ傘',
      'おりたたみがさ',
      '折り畳み傘',
      'こうもり傘',
      'こうもりがさ',
      '蝙蝠傘',
      'パラソル',
      'ぱらそる',
      'アンブレラ',
      'あんぶれら',
      'umbrella',
      'parasol',
      'kasa',
      'amagasa',
      'yougasa',
      'higasa',
    ],
    acceptedKeywords: ['傘', 'かさ', 'がさ', 'あまがさ', 'あんぶれら', 'ぱらそる', 'umbrella', 'parasol', 'kasa', 'gasa'],
    photoUrl: '/photos/umbrella.jpg',
    remotePhotoUrl:
      'https://images.unsplash.com/photo-1723226705389-f478dcc3d7a4?auto=format&fit=crop&w=900&q=82',
    description: '雨粒を弾く鮮やかな4色キャノピーとJ字ハンドルの傘の実写フォトグラフ。',
    provenance: {
      source: 'Wikimedia / Unsplash 実写フリー素材（/photos/umbrella.jpg ローカル同梱＋Canvasフォールバック）',
      author: 'Wikimedia / Unsplash Photographers',
      license: 'Public Domain / Unsplash License',
      verificationDate: '2026-11-03',
    },
  },
  {
    id: 2,
    title: 'STAGE 2',
    displayAnswer: '自転車（じてんしゃ）',
    readingHint: 'ペダルをこいで走る二輪の乗り物',
    categoryLabel: '乗り物・モビリティ',
    charCountHint: 'ひらがな5文字 / 漢字3文字 / カタカナ・略称・英語も自動判定',
    initialKanaHint: '頭文字：「じ」から始まる5文字（漢字「自転車」・略称「チャリ」も可）',
    kanaPad: ['じ', 'て', 'ん', 'し', 'ゃ', 'ち', 'り', 'こ', 'ば', 'い', 'く', 'ろ', 'ー', 'ど', 'す', 'ま'],
    coreTileIndices: [6, 11, 14, 16, 20, 23],
    rivalTargetSec: 19.0,
    acceptedAnswers: [
      '自転車',
      'じてんしゃ',
      'ジテンシャ',
      'ぢてんしゃ',
      'チャリ',
      'ちゃり',
      'チャリンコ',
      'ちゃりんこ',
      'サイクリング車',
      'さいくりんぐしゃ',
      'ロードバイク',
      'ろーどばいく',
      'クロスバイク',
      'くろすばいく',
      'マウンテンバイク',
      'まうんてんばいく',
      'スポーツバイク',
      'すぽーつばいく',
      'スポーツ自転車',
      '電動自転車',
      'でんどうじてんしゃ',
      'ピストバイク',
      'ぴすとばいく',
      'シティサイクル',
      'してぃさいくる',
      'ママチャリ',
      'ままちゃり',
      'バイシクル',
      'ばいしくる',
      'バイク',
      'ばいく',
      'サイクル',
      'さいくる',
      '軽快車',
      'けいかいしゃ',
      '二輪車',
      'にりんしゃ',
      'bicycle',
      'bike',
      'roadbike',
      'crossbike',
      'cycle',
      'jitensha',
      'jitensya',
      'zitensha',
      'zitensya',
      'chari',
      'tyari',
      'charinko',
    ],
    acceptedKeywords: [
      '自転車',
      'じてんしゃ',
      'ちゃり',
      'ちゃりんこ',
      'ばいく',
      'さいくる',
      'ばいしくる',
      'bicycle',
      'bike',
      'jitensha',
      'jitensya',
    ],
    photoUrl: '/photos/bicycle.jpg',
    remotePhotoUrl:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=82',
    description: 'ダークな壁面を背景に佇む、白いフレームと革サドルのスポーツ自転車の実写フォトグラフ。',
    provenance: {
      source: 'Unsplash 実写フリー素材（/photos/bicycle.jpg ローカル同梱＋Canvasフォールバック）',
      author: 'Unsplash Photographers / Mosaic Break App',
      license: 'Unsplash License (Free to use)',
      verificationDate: '2026-11-03',
    },
  },
  {
    id: 3,
    title: 'STAGE 3',
    displayAnswer: 'やかん（薬缶・ケトル）',
    readingHint: 'お湯を沸かすための注ぎ口つきの道具',
    categoryLabel: 'キッチン・調理器具',
    charCountHint: 'ひらがな3文字 / カタカナ「ケトル」 / 漢字「薬缶」・英語も自動判定',
    initialKanaHint: '頭文字：「や」から始まる3文字（または「ケトル」「薬缶」）',
    kanaPad: ['や', 'か', 'ん', 'け', 'と', 'る', 'ゆ', 'わ', 'し', 'き', 'ぽ', 'っ', 'ちゃ', 'が', 'ま', 'ー'],
    coreTileIndices: [7, 10, 14, 16, 21, 22],
    rivalTargetSec: 17.5,
    acceptedAnswers: [
      'やかん',
      'ヤカン',
      '薬缶',
      '薬鑵',
      'ケトル',
      'けとる',
      '電気ケトル',
      'でんきけとる',
      '湯沸かし',
      'ゆわかし',
      'お湯沸かし',
      'おゆわかし',
      'ユワカシ',
      '湯沸かし器',
      'ゆわかしき',
      '湯沸器',
      '湯沸かしケトル',
      'ゆわかしけとる',
      '湯沸かしポット',
      'ゆわかしぽっと',
      'ポット',
      'ぽっと',
      '茶釜',
      'ちゃがま',
      '鉄瓶',
      'てつびん',
      '急須',
      'きゅうす',
      'ティーケトル',
      'てぃーけとる',
      'ティーポット',
      'てぃーぽっと',
      'kettle',
      'teakettle',
      'teapot',
      'yakan',
      'yakann',
      'ketoru',
      'yuwakashi',
    ],
    acceptedKeywords: [
      'やかん',
      '薬缶',
      '薬鑵',
      'けとる',
      'ゆわかし',
      'ゆわかしき',
      'ぽっと',
      'てつびん',
      'きゅうす',
      'ちゃがま',
      'kettle',
      'yakan',
      'ketoru',
    ],
    photoUrl: '/photos/kettle.jpg',
    remotePhotoUrl:
      'https://images.unsplash.com/photo-1594213114663-d94db9b17125?auto=format&fit=crop&w=900&q=82',
    description: 'クラシックな金属の質感と黒いアーチ型ハンドルが特徴的なやかんの実写フォトグラフ。',
    provenance: {
      source: 'Unsplash 実写フリー素材（/photos/kettle.jpg ローカル同梱＋Canvasフォールバック）',
      author: 'Unsplash Photographers / Mosaic Break App',
      license: 'Unsplash License (Free to use)',
      verificationDate: '2026-11-03',
    },
  },
  {
    id: 4,
    title: 'STAGE 4',
    displayAnswer: '織田信長（おだのぶなが）',
    readingHint: '戦国三英傑の筆頭・天下布武を掲げた戦国武将',
    categoryLabel: '歴史・英雄武将',
    charCountHint: '漢字4文字 / ひらがな6文字 / 略称「信長」や英語も自動判定',
    initialKanaHint: '頭文字：「お」から始まる武将名（または「信長」）',
    kanaPad: ['お', 'だ', 'の', 'ぶ', 'な', 'が', 'と', 'よ', 'み', 'ひ', 'で', 'し', 'い', 'え', 'や', 'す'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      '織田信長',
      'おだのぶなが',
      'オダノブナガ',
      '信長',
      'のぶなが',
      'ノブナガ',
      '信長公',
      'のぶながこう',
      '織田上総介',
      'odanobunaga',
      'nobunaga',
      'oda',
      'nobunagaoda',
    ],
    acceptedKeywords: ['織田信長', '信長', 'おだのぶなが', 'のぶなが', 'オダノブナガ', 'nobunaga'],
    photoUrl: '/photos/nobunaga.jpg',
    remotePhotoUrl: '/photos/nobunaga.jpg',
    description: '愛知県豊田市・長興寺所蔵の狩野宗秀作とされる織田信長像原本（歴史教科書の原本・パブリックドメイン）。',
    provenance: {
      source: 'Wikimedia Commons / 狩野宗秀画・長興寺蔵（原本画像ローカル同梱）',
      author: '狩野宗秀 (Kano Soshu, 1551–1601)',
      license: 'Public Domain (著作権保護期間満了・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 5,
    title: 'STAGE 5',
    displayAnswer: '真珠の耳飾りの少女',
    readingHint: 'フェルメールの名画・青いターバンと光る耳飾り',
    categoryLabel: '世界の名画・アート',
    charCountHint: '作品名「真珠の耳飾りの少女」/ 画家名「フェルメール」も正解',
    initialKanaHint: '頭文字：「し」から始まる名画（「フェルメール」も可）',
    kanaPad: ['し', 'ん', 'じ', 'ゅ', 'み', 'か', 'ざ', 'り', 'ょ', 'う', 'ふ', 'ぇ', 'る', 'め', 'あ', 'お'],
    coreTileIndices: [7, 9, 13, 15, 19, 21],
    rivalTargetSec: 20.0,
    acceptedAnswers: [
      '真珠の耳飾りの少女',
      'しんじゅのみみかざりのしょうじょ',
      'シンジュノミミカザリノショウジョ',
      'フェルメール',
      'ふぇるめーる',
      '青いターバンの少女',
      'あおいたーばんのしょうじょ',
      '真珠の耳飾り',
      'しんじゅのみみかざり',
      '真珠の耳飾りの女',
      'girlwithapearlearring',
      'vermeer',
      'johannesvermeer',
      'pearl',
    ],
    acceptedKeywords: ['真珠の耳飾りの少女', 'フェルメール', '青いターバンの少女', '真珠の耳飾り', 'しんじゅ', 'vermeer'],
    photoUrl: '/photos/pearl_girl.jpg',
    remotePhotoUrl: '/photos/pearl_girl.jpg',
    description: 'オランダ・マウリッツハイス美術館所蔵、ヨハネス・フェルメール作『真珠の耳飾りの少女』原本（パブリックドメイン）。',
    provenance: {
      source: 'Wikimedia Commons / マウリッツハイス美術館蔵原本（ローカル同梱）',
      author: 'Johannes Vermeer (1632–1675)',
      license: 'Public Domain (著作権保護期間満了・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 6,
    title: 'STAGE 6',
    displayAnswer: '宝箱（たからばこ）',
    readingHint: 'ダンジョンの奥に眠る金色の鍵がかかった箱',
    categoryLabel: 'レトロ・ピクセルアート',
    charCountHint: 'ひらがな5文字 / 漢字2文字 / 英語「chest」「treasure」も自動判定',
    initialKanaHint: '頭文字：「た」から始まる箱（「宝箱」）',
    kanaPad: ['た', 'か', 'ら', 'ば', 'こ', 'と', 'れ', 'じ', 'ゃ', 'ー', 'ぼ', 'っ', 'く', 'す', 'ち', 'ぇ'],
    coreTileIndices: [8, 9, 14, 15, 20, 21],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
      '宝箱',
      'たからばこ',
      'タカラバコ',
      'トレジャーボックス',
      'とれじゃーぼっくす',
      'トレジャーチェスト',
      'チェスト',
      'ちぇすと',
      'ミミック',
      'みみっく',
      'treasurebox',
      'treasurechest',
      'chest',
      'takarabako',
    ],
    acceptedKeywords: ['宝箱', 'たからばこ', 'トレジャー', 'チェスト', 'treasure', 'chest'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: '16ビット風の金色の金具と重厚な木目で描かれたピクセルアートの宝箱。',
    provenance: {
      source: 'Mosaic Break Original Pixel Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-04',
    },
  },
  {
    id: 7,
    title: 'STAGE 7',
    displayAnswer: '富士山（ふじさん）',
    readingHint: '日本一の高さを誇る雪化粧の美しい名峰',
    categoryLabel: '日本の大自然・世界遺産',
    charCountHint: 'ひらがな4文字 / 漢字3文字 / 略称「富士」・英語も自動判定',
    initialKanaHint: '頭文字：「ふ」から始まる日本一の山（「富士山」）',
    kanaPad: ['ふ', 'じ', 'さ', 'ん', 'に', 'ほ', 'ん', 'い', 'ち', 'め', 'い', 'ほ', 'う', 'や', 'ま', 'ゆ'],
    coreTileIndices: [7, 8, 13, 14, 19, 22],
    rivalTargetSec: 17.0,
    acceptedAnswers: [
      '富士山',
      'ふじさん',
      'フジサン',
      '富士',
      'ふじ',
      'フジ',
      '霊峰富士',
      '富嶽',
      'ふがく',
      'mtfuji',
      'fuji',
      'mountfuji',
      'fujisan',
      'fujiyama',
    ],
    acceptedKeywords: ['富士山', 'ふじさん', '富士', 'ふじ', 'fuji', 'mtfuji'],
    photoUrl: '/photos/mt_fuji_photo.jpg',
    remotePhotoUrl: '/photos/mt_fuji_photo.jpg',
    description: '澄み渡る青空と朝の光に輝く、雪化粧をまとった雄大な富士山の実写原本フォトグラフ。',
    provenance: {
      source: 'Wikimedia Commons / 忍野八海からの富士山実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 8,
    title: 'STAGE 8',
    displayAnswer: '自由の女神（じゆうのめがみ）',
    readingHint: 'ニューヨークのリバティ島に立つ世界遺産の巨像',
    categoryLabel: '世界遺産・世界的名所',
    charCountHint: 'ひらがな6文字 / 漢字5文字 / 英語「Statue of Liberty」も自動判定',
    initialKanaHint: '頭文字：「じ」から始まる世界遺産（「自由の女神」）',
    kanaPad: ['じ', 'ゆ', 'う', 'の', 'め', 'が', 'み', 'ぞ', 'う', 'に', 'ゅ', 'ー', 'よ', 'ー', 'く', 'り'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      '自由の女神',
      'じゆうのめがみ',
      'ジユウノメガミ',
      '自由の女神像',
      'じゆうのめがみぞう',
      '女神像',
      'めがみぞう',
      'リバティ',
      'りばてぃ',
      'statueofliberty',
      'liberty',
      'ladyliberty',
      'lady liberty',
      'statue of liberty',
    ],
    acceptedKeywords: ['自由の女神', 'じゆうのめがみ', 'めがみ', '自由', 'liberty', 'statueofliberty'],
    photoUrl: '/photos/statue_of_liberty.jpg',
    remotePhotoUrl: '/photos/statue_of_liberty.jpg',
    description: '青空に堂々とそびえ立つ、リバティ島の自由の女神像の実写原本フォトグラフ。',
    provenance: {
      source: 'Wikimedia Commons / リバティ島実写写真原本（ローカル同梱）',
      author: 'William Warby / Wikimedia Commons',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 9,
    title: 'STAGE 9',
    displayAnswer: '坂本龍馬（さかもとりょうま）',
    readingHint: '幕末の土佐藩士・薩長同盟や海援隊を率いた風雲児',
    categoryLabel: '日本の歴史・幕末維新',
    charCountHint: '漢字4文字 / ひらがな7文字 / 略称「龍馬」や英語も自動判定',
    initialKanaHint: '頭文字：「さ」から始まる幕末の英雄（「坂本龍馬」）',
    kanaPad: ['さ', 'か', 'も', 'と', 'り', 'ょ', 'う', 'ま', 'ど', 'せ', 'ん', 'し', 'ん', 'ぷ', 'う', 'つ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      '坂本龍馬',
      'さかもとりょうま',
      'サカモトリョウマ',
      '坂本竜馬',
      'さかもとりゅうま',
      '龍馬',
      'りょうま',
      'リョウマ',
      '竜馬',
      'sakamotoryoma',
      'ryomasakamoto',
      'ryoma',
      'sakamoto',
    ],
    acceptedKeywords: ['坂本龍馬', 'さかもとりょうま', '坂本竜馬', '龍馬', 'りょうま', 'ryoma'],
    photoUrl: '/photos/ryoma.jpg',
    remotePhotoUrl: '/photos/ryoma.jpg',
    description: '井上俊三撮影、高知県立坂本龍馬記念館等所蔵の懐手をした坂本龍馬の原本写真（歴史教科書掲載・パブリックドメイン）。',
    provenance: {
      source: '高知県立坂本龍馬記念館蔵原本写真 / 井上俊三撮影（ローカル同梱）',
      author: '井上俊三 (1866年撮影)',
      license: 'Public Domain (1866年撮影・没後150年以上経過・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 10,
    title: 'STAGE 10',
    displayAnswer: '聖徳太子（しょうとくたいし）',
    readingHint: '冠位十二階・十七条憲法を制定した飛鳥時代の皇族',
    categoryLabel: '日本の歴史・飛鳥古代',
    charCountHint: '漢字4文字 / ひらがな7文字 / 「厩戸皇子」や英語も自動判定',
    initialKanaHint: '頭文字：「し」から始まる旧一万円札の顔（「聖徳太子」）',
    kanaPad: ['し', 'ょ', 'う', 'と', 'く', 'た', 'い', 'し', 'う', 'ま', 'や', 'ど', 'あ', 'す', 'か', 'の'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      '聖徳太子',
      'しょうとくたいし',
      'ショウトクタイシ',
      '厩戸皇子',
      'うまやどのおうじ',
      'うまやどのみこ',
      '厩戸王',
      'うまやどおう',
      'shotokutaishi',
      'princeshotoku',
      'shotoku',
    ],
    acceptedKeywords: ['聖徳太子', 'しょうとくたいし', '厩戸皇子', 'うまやどのおうじ', 'shotoku'],
    photoUrl: '/photos/shotoku.jpg',
    remotePhotoUrl: '/photos/shotoku.jpg',
    description: '宮内庁所蔵『聖徳太子二王子像（唐本御影）』の原本（歴史教科書・旧紙幣の原本・パブリックドメイン）。',
    provenance: {
      source: '宮内庁所蔵 唐本御影（原本画像ローカル同梱）',
      author: '奈良〜平安時代伝承画',
      license: 'Public Domain (著作権保護期間完全満了・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 11,
    title: 'STAGE 11',
    displayAnswer: '西郷隆盛（さいごうたかもり）',
    readingHint: '維新の三傑・薩摩藩出身の英雄（上野の銅像でも有名）',
    categoryLabel: '日本の歴史・明治維新',
    charCountHint: '漢字4文字 / ひらがな7文字 / 愛称「西郷どん」や英語も自動判定',
    initialKanaHint: '頭文字：「さ」から始まる薩摩の英雄（「西郷隆盛」）',
    kanaPad: ['さ', 'い', 'ご', 'う', 'た', 'か', 'も', 'り', 'せ', 'ご', 'ど', 'ん', 'さ', 'つ', 'ま', 'ぐ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      '西郷隆盛',
      'さいごうたかもり',
      'サイゴウタカモリ',
      '西郷どん',
      'せごどん',
      'セゴドン',
      '西郷吉之助',
      'さいごうきちのすけ',
      '西郷南洲',
      'さいごうなんしゅう',
      'saigotakamori',
      'saigo',
    ],
    acceptedKeywords: ['西郷隆盛', 'さいごうたかもり', '西郷どん', 'せごどん', 'saigo'],
    photoUrl: '/photos/saigo.jpg',
    remotePhotoUrl: '/photos/saigo.jpg',
    description: 'エドアルド・キヨッソーネ画『西郷隆盛肖像』の原本（歴史教科書掲載・パブリックドメイン）。',
    provenance: {
      source: 'エドアルド・キヨッソーネ画（原本画像ローカル同梱）',
      author: 'Edoardo Chiossone (1833–1898)',
      license: 'Public Domain (1898年没・没後120年以上経過・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 12,
    title: 'STAGE 12',
    displayAnswer: '豊臣秀吉（とよとみひでよし）',
    readingHint: '戦国三英傑・天下統一を成し遂げた太閤',
    categoryLabel: '日本の歴史・戦国安土桃山',
    charCountHint: '漢字4文字 / ひらがな8文字 / 「秀吉」「太閤」や英語も自動判定',
    initialKanaHint: '頭文字：「と」から始まる天下人（「豊臣秀吉」）',
    kanaPad: ['と', 'よ', 'と', 'み', 'ひ', 'で', 'よ', 'し', 'た', 'い', 'こ', 'う', 'さ', 'る', 'お', 'さ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      '豊臣秀吉',
      'とよとみひでよし',
      'トヨトミヒデヨシ',
      '秀吉',
      'ひでよし',
      'ヒデヨシ',
      '太閤',
      'たいこう',
      '太閤秀吉',
      '羽柴秀吉',
      'はしばひでよし',
      '木下藤吉郎',
      'toyotomihideyoshi',
      'hideyoshi',
    ],
    acceptedKeywords: ['豊臣秀吉', 'とよとみひでよし', '秀吉', 'ひでよし', '太閤', 'hideyoshi'],
    photoUrl: '/photos/hideyoshi.jpg',
    remotePhotoUrl: '/photos/hideyoshi.jpg',
    description: '京都・高台寺所蔵、狩野光信筆とされる豊臣秀吉像の原本（歴史教科書掲載・パブリックドメイン）。',
    provenance: {
      source: '京都・高台寺蔵原本（原本画像ローカル同梱）',
      author: '狩野光信 (Kano Mitsunobu, 1565–1608)',
      license: 'Public Domain (没後410年以上経過・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 13,
    title: 'STAGE 13',
    displayAnswer: 'モナ・リザ（もなりざ）',
    readingHint: 'ダ・ヴィンチの最高傑作・ルーヴル美術館の神秘の微笑み',
    categoryLabel: '世界の名画・ルネサンス',
    charCountHint: '作品名「モナリザ」/ 画家名「ダ・ヴィンチ」も正解',
    initialKanaHint: '頭文字：「も」から始まる世界一有名な肖像画（「モナ・リザ」）',
    kanaPad: ['も', 'な', 'り', 'ざ', 'れ', 'お', 'な', 'る', 'ど', 'だ', 'び', 'ん', 'ち', 'る', 'ー', 'ぶ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      'モナ・リザ',
      'モナリザ',
      'もなりざ',
      'モナ・リザの微笑み',
      'ラ・ジョコンダ',
      'ジョコンダ',
      'レオナルド・ダ・ヴィンチ',
      'ダ・ヴィンチ',
      'ダヴィンチ',
      'monalisa',
      'mona lisa',
      'davinci',
      'leonardodavinci',
    ],
    acceptedKeywords: ['モナ・リザ', 'モナリザ', 'もなりざ', 'ダ・ヴィンチ', 'ダヴィンチ', 'monalisa'],
    photoUrl: '/photos/mona_lisa.jpg',
    remotePhotoUrl: '/photos/mona_lisa.jpg',
    description: 'フランス・ルーヴル美術館所蔵、レオナルド・ダ・ヴィンチ作『モナ・リザ』原本（パブリックドメイン）。',
    provenance: {
      source: 'ルーヴル美術館蔵原本（ローカル同梱）',
      author: 'Leonardo da Vinci (1452–1519)',
      license: 'Public Domain (没後500年経過・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 14,
    title: 'STAGE 14',
    displayAnswer: 'ひまわり（ゴッホ）',
    readingHint: 'ゴッホがアルルで描いた黄色い花瓶の情熱的な向日葵',
    categoryLabel: '世界の名画・ポスト印象派',
    charCountHint: '作品名「ひまわり」/ 画家名「ゴッホ」も正解',
    initialKanaHint: '頭文字：「ひ」から始まる黄色い名画（「ひまわり」）',
    kanaPad: ['ひ', 'ま', 'わ', 'り', 'ご', 'っ', 'ほ', 'あ', 'る', 'る', 'き', 'い', 'ろ', 'か', 'び', 'ん'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      'ひまわり',
      'ヒマワリ',
      '向日葵',
      'ゴッホのひまわり',
      'フィンセント・ファン・ゴッホ',
      'ファン・ゴッホ',
      'ゴッホ',
      'ごっほ',
      'sunflowers',
      'gogh',
      'vangogh',
      'vincentvangogh',
    ],
    acceptedKeywords: ['ひまわり', 'ヒマワリ', '向日葵', 'ゴッホ', 'ごっほ', 'vangogh', 'sunflowers'],
    photoUrl: '/photos/sunflowers.jpg',
    remotePhotoUrl: '/photos/sunflowers.jpg',
    description: 'ファン・ゴッホ美術館所蔵、フィンセント・ファン・ゴッホ作『ひまわり』原本（パブリックドメイン）。',
    provenance: {
      source: 'ファン・ゴッホ美術館蔵原本（ローカル同梱）',
      author: 'Vincent van Gogh (1853–1890)',
      license: 'Public Domain (没後130年以上経過・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 15,
    title: 'STAGE 15',
    displayAnswer: '叫び（ムンク）',
    readingHint: 'ムンクの代表作・夕焼けの下で両手で耳を塞ぐ有名な姿',
    categoryLabel: '世界の名画・表現主義',
    charCountHint: '作品名「叫び」/ 画家名「ムンク」も正解',
    initialKanaHint: '頭文字：「さ」から始まる表現主義の傑作（「叫び」）',
    kanaPad: ['さ', 'け', 'び', 'む', 'ん', 'く', 'お', 'す', 'ろ', 'ふ', 'ぃ', 'よ', 'る', 'ど', 'あ', 'か'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      '叫び',
      'さけび',
      'サケビ',
      'ムンクの叫び',
      'むんくのさけび',
      'エドヴァルド・ムンク',
      'ムンク',
      'むんく',
      'thescream',
      'scream',
      'munch',
      'edvardmunch',
    ],
    acceptedKeywords: ['叫び', 'さけび', 'ムンクの叫び', 'ムンク', 'むんく', 'scream', 'munch'],
    photoUrl: '/photos/the_scream.jpg',
    remotePhotoUrl: '/photos/the_scream.jpg',
    description: 'ノルウェー・オスロ国立美術館所蔵、エドヴァルド・ムンク作『叫び』(1893年) 原本（パブリックドメイン）。',
    provenance: {
      source: 'オスロ国立美術館蔵原本（ローカル同梱）',
      author: 'Edvard Munch (1863–1944)',
      license: 'Public Domain (没後80年経過・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 16,
    title: 'STAGE 16',
    displayAnswer: '神奈川沖浪裏（富嶽三十六景）',
    readingHint: '葛飾北斎『富嶽三十六景』・世界中を魅了した巨大な波と富士山',
    categoryLabel: '世界の名画・浮世絵',
    charCountHint: '「神奈川沖浪裏」「大波」「波裏」「葛飾北斎」すべて正解',
    initialKanaHint: '頭文字：「か」から始まる北斎の代表作（または「大波」「波裏」）',
    kanaPad: ['な', 'み', 'う', 'ら', 'ほ', 'く', 'さ', 'い', 'ふ', 'じ', 'さ', 'ん', 'か', 'な', 'が', 'わ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      '神奈川沖浪裏',
      'かながわおきなみうら',
      'カナガワオキナミウラ',
      '波裏',
      'なみうら',
      'ナミウラ',
      '大波',
      'おおなみ',
      '富嶽三十六景',
      'ふがくさんじゅうろっけい',
      '葛飾北斎',
      'かつしかほくさい',
      '北斎',
      'ほくさい',
      'greatwave',
      'thegreatwave',
      'hokusai',
    ],
    acceptedKeywords: ['神奈川沖浪裏', 'なみうら', '波裏', '大波', '富嶽三十六景', '葛飾北斎', '北斎', 'hokusai', 'greatwave'],
    photoUrl: '/photos/great_wave.jpg',
    remotePhotoUrl: '/photos/great_wave.jpg',
    description: '葛飾北斎作『富嶽三十六景 神奈川沖浪裏』原本（パブリックドメイン）。',
    provenance: {
      source: '東京国立博物館 / メトロポリタン美術館等蔵原本（ローカル同梱）',
      author: '葛飾北斎 (Katsushika Hokusai, 1760–1849)',
      license: 'Public Domain (没後170年以上経過・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 17,
    title: 'STAGE 17',
    displayAnswer: 'ピラミッド（ギザの三大ピラミッド）',
    readingHint: '古代エジプトの巨石建造物・ギザの砂漠に立つ世界の七不思議',
    categoryLabel: '世界遺産・古代文明',
    charCountHint: 'カタカナ5文字 / ひらがな6文字 / 英語「Pyramid」も自動判定',
    initialKanaHint: '頭文字：「ぴ」から始まるエジプトの世界遺産（「ピラミッド」）',
    kanaPad: ['ぴ', 'ら', 'み', 'っ', 'ど', 'え', 'じ', 'ぷ', 'と', 'ぎ', 'ざ', 'く', 'ふ', 'す', 'な', 'だ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      'ピラミッド',
      'ぴらみっど',
      'ピラミッド群',
      '三大ピラミッド',
      'さんだいぴらみっど',
      'ギザのピラミッド',
      'クフ王のピラミッド',
      'エジプトピラミッド',
      'pyramid',
      'pyramids',
      'giza',
      'gizapyramids',
    ],
    acceptedKeywords: ['ピラミッド', 'ぴらみっど', '三大ピラミッド', 'ギザ', 'pyramid', 'pyramids'],
    photoUrl: '/photos/pyramids.jpg',
    remotePhotoUrl: '/photos/pyramids.jpg',
    description: 'エジプト・ギザの三大ピラミッドの実写原本フォトグラフ。',
    provenance: {
      source: 'Wikimedia Commons / ギザ三大ピラミッド実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 18,
    title: 'STAGE 18',
    displayAnswer: 'エッフェル塔（えっふぇるとう）',
    readingHint: 'フランス・パリの象徴・鉄の貴婦人と呼ばれる優美な電波塔',
    categoryLabel: '世界遺産・名所建造物',
    charCountHint: 'カタカナ・漢字「エッフェル塔」/ ひらがな7文字 / 英語も自動判定',
    initialKanaHint: '頭文字：「え」から始まるパリのシンボル（「エッフェル塔」）',
    kanaPad: ['え', 'っ', 'ふ', 'ぇ', 'る', 'と', 'う', 'ぱ', 'り', 'ふ', 'ら', 'ん', 'す', 'て', 'つ', 'の'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      'エッフェル塔',
      'えっふぇるとう',
      'エッフェルトウ',
      'エッフェル',
      'えっふぇる',
      'パリのエッフェル塔',
      'eiffeltower',
      'eiffel',
      'toureiffel',
      'paris',
    ],
    acceptedKeywords: ['エッフェル塔', 'えっふぇるとう', 'エッフェル', 'えっふぇる', 'eiffel', 'eiffeltower'],
    photoUrl: '/photos/eiffel_tower.jpg',
    remotePhotoUrl: '/photos/eiffel_tower.jpg',
    description: 'フランス・パリのシャン・ド・マルス広場にそびえ立つエッフェル塔の実写原本フォトグラフ。',
    provenance: {
      source: 'Wikimedia Commons / エッフェル塔実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 19,
    title: 'STAGE 19',
    displayAnswer: 'コロッセオ（古代ローマ闘技場）',
    readingHint: 'イタリア・ローマに残る古代ローマ帝国の巨大円形闘技場',
    categoryLabel: '世界遺産・古代遺跡',
    charCountHint: 'カタカナ5文字 / ひらがな6文字 / 「円形闘技場」や英語も自動判定',
    initialKanaHint: '頭文字：「こ」から始まるローマの世界遺産（「コロッセオ」）',
    kanaPad: ['こ', 'ろ', 'っ', 'せ', 'お', 'ろ', 'ー', 'ま', 'い', 'た', 'り', 'あ', 'え', 'ん', 'け', 'い'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      'コロッセオ',
      'ころっせお',
      'コロセウム',
      'ころせうむ',
      'コロッセウム',
      '円形闘技場',
      'えんけいとうぎじょう',
      '闘技場',
      'とうぎじょう',
      'colosseum',
      'colosseo',
      'rome',
    ],
    acceptedKeywords: ['コロッセオ', 'ころっせお', 'コロセウム', 'コロッセウム', '闘技場', 'colosseum'],
    photoUrl: '/photos/colosseum.jpg',
    remotePhotoUrl: '/photos/colosseum.jpg',
    description: 'イタリア・ローマの古代円形闘技場コロッセオの実写原本フォトグラフ。',
    provenance: {
      source: 'Wikimedia Commons / コロッセオ実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 20,
    title: 'STAGE 20',
    displayAnswer: '金閣寺（きんかくじ・鹿苑寺）',
    readingHint: '京都・足利義満が建立した金箔輝く池の上の舎利殿',
    categoryLabel: '世界遺産・古都京都',
    charCountHint: '漢字3文字 / ひらがな5文字 / 正式名「鹿苑寺」も自動判定',
    initialKanaHint: '頭文字：「き」から始まる黄金の寺院（「金閣寺」）',
    kanaPad: ['き', 'ん', 'か', 'く', 'じ', 'ろ', 'く', 'お', 'ん', 'じ', 'き', 'ょ', 'う', 'と', 'い', 'け'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      '金閣寺',
      'きんかくじ',
      'キンカクジ',
      '金閣',
      'きんかく',
      '鹿苑寺',
      'ろくおんじ',
      '金閣鹿苑寺',
      'kinkakuji',
      'kinkaku',
      'rokuonji',
    ],
    acceptedKeywords: ['金閣寺', 'きんかくじ', '金閣', 'きんかく', '鹿苑寺', 'kinkakuji'],
    photoUrl: '/photos/kinkakuji.jpg',
    remotePhotoUrl: '/photos/kinkakuji.jpg',
    description: '京都・北山、鏡湖池に美しく映り込む金閣寺（鹿苑寺舎利殿）の実写原本フォトグラフ。',
    provenance: {
      source: 'Wikimedia Commons / 金閣寺実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 21,
    title: 'STAGE 21',
    displayAnswer: 'パンダ（ジャイアントパンダ）',
    readingHint: '白黒の丸い体で笹を食べる愛らしい大人気動物',
    categoryLabel: '動物・大自然',
    charCountHint: 'カタカナ3文字 / ひらがな4文字 / 「ジャイアントパンダ」や英語も自動判定',
    initialKanaHint: '頭文字：「ぱ」から始まる白黒の動物（「パンダ」）',
    kanaPad: ['ぱ', 'ん', 'だ', 'じ', 'ゃ', 'い', 'あ', 'ん', 'と', 'さ', 'さ', 'た', 'け', 'く', 'ろ', 'し'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      'パンダ',
      'ぱんだ',
      'パンダさん',
      'ジャイアントパンダ',
      'じゃいあんとぱんだ',
      '大熊猫',
      'panda',
      'giantpanda',
    ],
    acceptedKeywords: ['パンダ', 'ぱんだ', 'ジャイアントパンダ', 'panda'],
    photoUrl: '/photos/panda.jpg',
    remotePhotoUrl: '/photos/panda.jpg',
    description: '笹を美味しそうに食べるジャイアントパンダの実写原本フォトグラフ。',
    provenance: {
      source: 'Wikimedia Commons / ジャイアントパンダ実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 22,
    title: 'STAGE 22',
    displayAnswer: 'ライオン（百獣の王）',
    readingHint: '立派なタテガミを持つ百獣の王・サバンナの肉食動物',
    categoryLabel: '動物・大自然',
    charCountHint: 'カタカナ4文字 / ひらがな5文字 / 「百獣の王」や英語も自動判定',
    initialKanaHint: '頭文字：「ら」から始まる百獣の王（「ライオン」）',
    kanaPad: ['ら', 'い', 'お', 'ん', 'ひ', 'ゃ', 'く', 'じ', 'ゅ', 'う', 'の', 'お', 'う', 'さ', 'ば', 'ん'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      'ライオン',
      'らいおん',
      '百獣の王',
      'ひゃくじゅうのおう',
      'オスライオン',
      'おすらいおん',
      '獅子',
      'しし',
      'lion',
    ],
    acceptedKeywords: ['ライオン', 'らいおん', '百獣の王', 'lion'],
    photoUrl: '/photos/lion.jpg',
    remotePhotoUrl: '/photos/lion.jpg',
    description: 'サバンナの草原に座る立派なタテガミを持つ百獣の王ライオンの実写原本フォトグラフ。',
    provenance: {
      source: 'Wikimedia Commons / ナミビアの雄ライオン実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 23,
    title: 'STAGE 23',
    displayAnswer: 'ペンギン（皇帝ペンギン）',
    readingHint: '南極の氷の上をよちよち歩く飛べない鳥・首元の黄色が特徴',
    categoryLabel: '動物・大自然',
    charCountHint: 'カタカナ4文字 / ひらがな5文字 / 「皇帝ペンギン」や英語も自動判定',
    initialKanaHint: '頭文字：「ぺ」から始まる南極の鳥（「ペンギン」）',
    kanaPad: ['ぺ', 'ん', 'ぎ', 'ん', 'こ', 'う', 'て', 'い', 'な', 'ん', 'き', 'ょ', 'く', 'こ', 'お', 'り'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      'ペンギン',
      'ぺんぎん',
      '皇帝ペンギン',
      'こうていぺんぎん',
      'コウテイペンギン',
      'エンペラーペンギン',
      'penguin',
      'emperorpenguin',
    ],
    acceptedKeywords: ['ペンギン', 'ぺんぎん', '皇帝ペンギン', 'こうていぺんぎん', 'penguin'],
    photoUrl: '/photos/penguin.jpg',
    remotePhotoUrl: '/photos/penguin.jpg',
    description: '南極の白銀の氷原に立つ皇帝ペンギンの実写原本フォトグラフ。',
    provenance: {
      source: 'Wikimedia Commons / 南極スノー・ヒル島の皇帝ペンギン実写写真（ローカル同梱）',
      author: 'Luyten-De-Hauwere / Wikimedia Commons',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 24,
    title: 'STAGE 24',
    displayAnswer: '勇者の剣（ゆうしゃのつるぎ）',
    readingHint: 'ダンジョンの台座に刺さる伝説の聖剣・16bitドット絵',
    categoryLabel: 'レトロ・ピクセルアート',
    charCountHint: '「勇者の剣」「聖剣」「ソード」も自動判定',
    initialKanaHint: '頭文字：「ゆ」から始まる伝説の武器（「勇者の剣」）',
    kanaPad: ['ゆ', 'う', 'し', 'ゃ', 'の', 'つ', 'る', 'ぎ', 'せ', 'い', 'け', 'ん', 'そ', 'ー', 'ど', 'ぶ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
      '勇者の剣',
      'ゆうしゃのつるぎ',
      'ユウシャノツルギ',
      '聖剣',
      'せいけん',
      '伝説の剣',
      'でんせつのつるぎ',
      'つるぎ',
      '剣',
      'けん',
      'ソード',
      'そーど',
      'マスターソード',
      'ロトの剣',
      'sword',
      'blade',
    ],
    acceptedKeywords: ['勇者の剣', '聖剣', 'つるぎ', 'けん', 'ソード', 'sword'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: '16ビットRPGの台座に輝く伝説の聖剣を描いたオリジナルピクセルアート。',
    provenance: {
      source: 'Original Pixel Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 25,
    title: 'STAGE 25',
    displayAnswer: 'ポーション（回復薬）',
    readingHint: 'ガラス瓶に入った赤い回復魔法薬・レトロドット絵',
    categoryLabel: 'レトロ・ピクセルアート',
    charCountHint: '「ポーション」「かいふくやく」「くすり」も自動判定',
    initialKanaHint: '頭文字：「ぽ」から始まるRPGの回復アイテム（「ポーション」）',
    kanaPad: ['ぽ', 'ー', 'し', 'ょ', 'ん', 'か', 'い', 'ふ', 'く', 'や', 'く', 'あ', 'か', 'い', 'び', 'ん'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
      'ポーション',
      'ぽーしょん',
      '回復薬',
      'かいふくやく',
      '薬瓶',
      'くすりびん',
      '赤い薬',
      'あかいくすり',
      '薬',
      'くすり',
      'potion',
      'heal',
    ],
    acceptedKeywords: ['ポーション', 'かいふくやく', 'くすり', 'potion'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: 'コルク栓のフラスコで泡立つ赤い回復薬のオリジナルピクセルアート。',
    provenance: {
      source: 'Original Pixel Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 26,
    title: 'STAGE 26',
    displayAnswer: '宇宙船（スペースシップ）',
    readingHint: '星空を翔けるレトロアーケード風の白い宇宙戦闘機',
    categoryLabel: 'レトロ・ピクセルアート',
    charCountHint: '「宇宙船」「スペースシップ」「ロケット」も自動判定',
    initialKanaHint: '頭文字：「う」から始まる宇宙の乗り物（「宇宙船」）',
    kanaPad: ['う', 'ち', 'ゅ', 'う', 'せ', 'ん', 'す', 'ぺ', 'ー', 'す', 'し', 'っ', 'ぷ', 'ろ', 'け', 'っ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
      '宇宙船',
      'うちゅうせん',
      'ウチュウセン',
      'スペースシップ',
      'すぺーすしっぷ',
      'ロケット',
      'ろけっと',
      '戦闘機',
      'せんとうき',
      'spaceship',
      'rocket',
    ],
    acceptedKeywords: ['宇宙船', 'うちゅうせん', 'スペースシップ', 'ロケット', 'spaceship'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: '青白いプラズマ炎を噴射して飛ぶ宇宙船のレトロピクセルアート。',
    provenance: {
      source: 'Original Pixel Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 27,
    title: 'STAGE 27',
    displayAnswer: 'キノコ（スーパーマッシュルーム）',
    readingHint: '赤地に白水玉の傘とつぶらな瞳・レトロゲームの定番',
    categoryLabel: 'レトロ・ピクセルアート',
    charCountHint: '「キノコ」「マッシュルーム」も自動判定',
    initialKanaHint: '頭文字：「き」から始まるレトロゲームのキノコ（「キノコ」）',
    kanaPad: ['き', 'の', 'こ', 'す', 'ー', 'ぱ', 'ー', 'ま', 'っ', 'し', 'ゅ', 'る', 'ー', 'む', 'あ', 'か'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
      'キノコ',
      'きのこ',
      'スーパーキノコ',
      'すーぱーきのこ',
      'マッシュルーム',
      'まっしゅるーむ',
      'スーパーマッシュルーム',
      'mushroom',
    ],
    acceptedKeywords: ['キノコ', 'きのこ', 'マッシュルーム', 'mushroom'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: '赤地に白水玉の傘を持った8bitゲーム風キノコのピクセルアート。',
    provenance: {
      source: 'Original Pixel Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 28,
    title: 'STAGE 28',
    displayAnswer: 'ハートの器（ライフ・ハート）',
    readingHint: '赤く輝く生命のシンボル・レトロドット絵のハート',
    categoryLabel: 'レトロ・ピクセルアート',
    charCountHint: '「ハート」「ハートのうつわ」「ライフ」も自動判定',
    initialKanaHint: '頭文字：「は」から始まる命のシンボル（「ハート」）',
    kanaPad: ['は', 'ー', 'と', 'の', 'う', 'つ', 'わ', 'ら', 'い', 'ふ', 'あ', 'か', 'い', 'ち', 'か', 'ら'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
      'ハート',
      'はーと',
      'ハートの器',
      'はーとのうつわ',
      'ライフ',
      'らいふ',
      '赤ハート',
      'heart',
      'life',
    ],
    acceptedKeywords: ['ハート', 'はーと', 'ハートの器', 'ライフ', 'heart'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: '黒い枠線と光沢ハイライトが美しい8bit赤いハートのピクセルアート。',
    provenance: {
      source: 'Original Pixel Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 29,
    title: 'STAGE 29',
    displayAnswer: 'コーヒーカップ（ホットコーヒー）',
    readingHint: '白い陶器のマグカップから立ちのぼる温かい湯気',
    categoryLabel: '暮らし・ベクターアート',
    charCountHint: '「コーヒー」「コーヒーカップ」「マグカップ」も自動判定',
    initialKanaHint: '頭文字：「こ」から始まるカフェの飲み物（「コーヒー」）',
    kanaPad: ['こ', 'ー', 'ひ', 'ー', 'か', 'っ', 'ぷ', 'ほ', 'っ', 'と', 'か', 'ふ', 'ぇ', 'ま', 'ぐ', 'ちゃ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      'コーヒー',
      'こーひー',
      'コーヒーカップ',
      'こーひーかっぷ',
      'ホットコーヒー',
      'ほっとこーひー',
      'マグカップ',
      'まぐかっぷ',
      'カフェ',
      'かふぇ',
      'coffee',
      'coffeecup',
    ],
    acceptedKeywords: ['コーヒー', 'こーひー', 'コーヒーカップ', 'マグカップ', 'coffee'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: 'カフェの木目テーブルに置かれた白いマグカップと湯気のモダンベクターアート。',
    provenance: {
      source: 'Original Modern Vector Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 30,
    title: 'STAGE 30',
    displayAnswer: '気球（熱気球・バルーン）',
    readingHint: '青空にふわりと浮かぶカラフルな巨大気球',
    categoryLabel: '空の旅・ベクターアート',
    charCountHint: '「気球」「熱気球」「バルーン」も自動判定',
    initialKanaHint: '頭文字：「き」から始まる空の乗り物（「気球」）',
    kanaPad: ['き', 'き', 'ゅ', 'う', 'ね', 'つ', 'き', 'き', 'ゅ', 'う', 'ば', 'る', 'ー', 'ん', 'そ', 'ら'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      '気球',
      'ききゅう',
      'キキュウ',
      '熱気球',
      'ねつききゅう',
      'バルーン',
      'ばるーん',
      'hotairballoon',
      'balloon',
    ],
    acceptedKeywords: ['気球', 'ききゅう', '熱気球', 'バルーン', 'balloon'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: '青空と雲の中を飛ぶカラフルな熱気球のオリジナルベクターアート。',
    provenance: {
      source: 'Original Modern Vector Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 31,
    title: 'STAGE 31',
    displayAnswer: '灯台（とうだい）',
    readingHint: '夜の海と岬に立ち夜空を照らす赤白ストライプの塔',
    categoryLabel: '海の景色・ベクターアート',
    charCountHint: '「灯台」「ライトハウス」も自動判定',
    initialKanaHint: '頭文字：「と」から始まる海を照らす塔（「灯台」）',
    kanaPad: ['と', 'う', 'だ', 'い', 'み', 'さ', 'き', 'う', 'み', 'ひ', 'か', 'り', 'よ', 'る', 'な', 'み'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      '灯台',
      'とうだい',
      'トウダイ',
      '岬の灯台',
      'ライトハウス',
      'らいとはうす',
      'lighthouse',
    ],
    acceptedKeywords: ['灯台', 'とうだい', 'ライトハウス', 'lighthouse'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: '夜の荒波の岬に立ち光芒を放つ灯台のオリジナルベクターアート。',
    provenance: {
      source: 'Original Modern Vector Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 32,
    title: 'STAGE 32',
    displayAnswer: '風車（オランダ風車）',
    readingHint: 'チューリップ畑と青空に映える十字の4枚羽根',
    categoryLabel: '世界の風景・ベクターアート',
    charCountHint: '「風車」「オランダ風車」「ふうしゃ」も自動判定',
    initialKanaHint: '頭文字：「ふ」から始まる風で回る羽根（「風車」）',
    kanaPad: ['ふ', 'う', 'し', 'ゃ', 'お', 'ら', 'ん', 'だ', 'は', 'ね', 'ち', 'ゅ', 'ー', 'り', 'っ', 'ぷ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      '風車',
      'ふうしゃ',
      'フウシャ',
      'オランダ風車',
      'おらんだふうしゃ',
      'windmill',
    ],
    acceptedKeywords: ['風車', 'ふうしゃ', 'オランダ風車', 'windmill'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: 'チューリップ畑にそびえる木製オランダ風車のオリジナルベクターアート。',
    provenance: {
      source: 'Original Modern Vector Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 33,
    title: 'STAGE 33',
    displayAnswer: 'レコードプレーヤー（アナログレコード）',
    readingHint: '黒い溝のある円盤が回るレトロなターンテーブル',
    categoryLabel: '音楽・ベクターアート',
    charCountHint: '「レコード」「レコードプレーヤー」「ターンテーブル」も自動判定',
    initialKanaHint: '頭文字：「れ」から始まる音楽再生機（「レコード」）',
    kanaPad: ['れ', 'こ', 'ー', 'ど', 'ぷ', 'れ', 'ー', 'や', 'ー', 'お', 'ん', 'が', 'く', 'は', 'り', 'ばん'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      'レコード',
      'れこーど',
      'レコードプレーヤー',
      'れこーどぷれーやー',
      'ターンテーブル',
      'たーんてーぶる',
      '蓄音機',
      'ちくおんき',
      'record',
      'recordplayer',
      'turntable',
    ],
    acceptedKeywords: ['レコード', 'れこーど', 'レコードプレーヤー', 'ターンテーブル', 'record'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: '木目キャビネットと黒い円盤のレコードプレーヤーのオリジナルベクターアート。',
    provenance: {
      source: 'Original Modern Vector Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 34,
    title: 'STAGE 34',
    displayAnswer: 'サボテン（砂漠のサボテン）',
    readingHint: '夕焼けの砂漠に両腕を広げてそびえるトゲのある植物',
    categoryLabel: '自然・ベクターアート',
    charCountHint: '「サボテン」「さぼてん」「カクタス」も自動判定',
    initialKanaHint: '頭文字：「さ」から始まる砂漠の植物（「サボテン」）',
    kanaPad: ['さ', 'ぼ', 'て', 'ん', 'す', 'な', 'ば', 'く', 'ゆ', 'う', 'や', 'け', 'と', 'げ', 'み', 'どり'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      'サボテン',
      'さぼてん',
      '砂漠のサボテン',
      'カクタス',
      'かくたす',
      'cactus',
    ],
    acceptedKeywords: ['サボテン', 'さぼてん', 'カクタス', 'cactus'],
    photoUrl: '',
    remotePhotoUrl: '',
    description: 'オレンジ色の砂漠の夕焼けにそびえる緑のサボテンのオリジナルベクターアート。',
    provenance: {
      source: 'Original Modern Vector Art (Canvasプログラマティック描画)',
      author: 'Antigravity Studio',
      license: 'CC0 / Public Domain',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 35,
    title: 'STAGE 35',
    displayAnswer: '土星（どせい・リングのある惑星）',
    readingHint: '暗黒の宇宙に輝く巨大で美しい環（リング）を持つ太陽系惑星',
    categoryLabel: '宇宙・天体',
    charCountHint: '「土星」「どせい」「サターン」も自動判定',
    initialKanaHint: '頭文字：「ど」から始まるリングの惑星（「土星」）',
    kanaPad: ['ど', 'せ', 'い', 'さ', 'た', 'ー', 'ん', 'わ', 'っ', 'か', 'り', 'ん', 'ぐ', 'ほ', 'し', 'そ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      '土星',
      'どせい',
      'ドセイ',
      'サターン',
      'さたーん',
      'saturn',
    ],
    acceptedKeywords: ['土星', 'どせい', 'サターン', 'saturn'],
    photoUrl: '/photos/saturn.jpg',
    remotePhotoUrl: '/photos/saturn.jpg',
    description: 'NASAカッシーニ探査機が撮影した、美しい環を持つ土星の実写原本写真。',
    provenance: {
      source: 'NASA / JPL / Space Science Institute (カッシーニ探査機撮影)',
      author: 'NASA / Cassini Imaging Team',
      license: 'Public Domain (NASA公有画像・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 36,
    title: 'STAGE 36',
    displayAnswer: '月（満月・ムーン）',
    readingHint: '夜空に白銀に輝き無数のクレーターが刻まれた地球の衛星',
    categoryLabel: '宇宙・天体',
    charCountHint: '「月」「つき」「満月」「まんげつ」も自動判定',
    initialKanaHint: '頭文字：「つ」から始まる夜空の光（「月」）',
    kanaPad: ['つ', 'き', 'ま', 'ん', 'げ', 'つ', 'む', 'ー', 'ん', 'よ', 'る', 'そ', 'ら', 'ほ', 'し', 'く'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      '月',
      'つき',
      'ツキ',
      '満月',
      'まんげつ',
      'マンゲツ',
      'ムーン',
      'むーん',
      'お月様',
      'おつきさま',
      'moon',
      'fullmoon',
    ],
    acceptedKeywords: ['月', 'つき', '満月', 'まんげつ', 'moon'],
    photoUrl: '/photos/moon.jpg',
    remotePhotoUrl: '/photos/moon.jpg',
    description: '天体望遠鏡で捉えたクレーター鮮やかな満月の実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / 満月望遠鏡実写写真（ローカル同梱）',
      author: 'Luc Viatour / Wikimedia Commons',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 37,
    title: 'STAGE 37',
    displayAnswer: 'オーロラ（ノーザンライツ）',
    readingHint: '北極圏の夜空にエメラルドグリーンに揺らめく神秘の光のカーテン',
    categoryLabel: '大自然・地球の神秘',
    charCountHint: '「オーロラ」「ノーザンライツ」「極光」も自動判定',
    initialKanaHint: '頭文字：「お」から始まる夜空の光のカーテン（「オーロラ」）',
    kanaPad: ['お', 'ー', 'ろ', 'ら', 'の', 'ー', 'ざ', 'ん', 'ら', 'い', 'つ', 'き', 'ょ', 'っ', 'こ', 'う'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 17.0,
    acceptedAnswers: [
      'オーロラ',
      'おーろら',
      'ノーザンライツ',
      'のーざんらいつ',
      '極光',
      'きょっこう',
      '北極光',
      'aurora',
      'northernlights',
    ],
    acceptedKeywords: ['オーロラ', 'おーろら', 'ノーザンライツ', 'aurora'],
    photoUrl: '/photos/aurora.jpg',
    remotePhotoUrl: '/photos/aurora.jpg',
    description: '雪原の夜空に緑色の光条が美しく揺らめくオーロラの実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / アラスカ上空のオーロラ実写写真（ローカル同梱）',
      author: 'United States Air Force',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 38,
    title: 'STAGE 38',
    displayAnswer: 'ナイアガラの滝（大瀑布）',
    readingHint: '轟音とともに大量の水が水煙を上げて落ちる世界最大の瀑布',
    categoryLabel: '大自然・世界的名所',
    charCountHint: '「ナイアガラの滝」「ナイアガラ」「滝」も自動判定',
    initialKanaHint: '頭文字：「な」から始まる世界一有名な滝（「ナイアガラ」）',
    kanaPad: ['な', 'い', 'あ', 'が', 'ら', 'の', 'た', 'き', 'ば', 'く', 'ふ', 'み', 'ず', 'し', 'ぶ', 'き'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 17.0,
    acceptedAnswers: [
      'ナイアガラの滝',
      'ないあがらのたき',
      'ナイアガラ',
      'ないあがら',
      '滝',
      'たき',
      '大瀑布',
      'だいばくふ',
      'ホースシュー滝',
      'niagara',
      'niagarafalls',
      'falls',
    ],
    acceptedKeywords: ['ナイアガラの滝', 'ないあがら', 'ナイアガラ', 'たき', '滝', 'niagara'],
    photoUrl: '/photos/niagara.jpg',
    remotePhotoUrl: '/photos/niagara.jpg',
    description: '巨大な水煙を上げて落ちるナイアガラ・ホースシュー滝の実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / ナイアガラ実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 39,
    title: 'STAGE 39',
    displayAnswer: '桜（さくら・ソメイヨシノ）',
    readingHint: '春の青空に薄桃色の花びらが満開に咲き誇る日本の花',
    categoryLabel: '日本の大自然・季節',
    charCountHint: '「桜」「さくら」「サクラ」「チェリーブロッサム」も自動判定',
    initialKanaHint: '頭文字：「さ」から始まる春の花（「桜」）',
    kanaPad: ['さ', 'く', 'ら', 'は', 'る', 'そ', 'め', 'い', 'よ', 'し', 'の', 'は', 'な', 'み', 'ぴ', 'ん'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      '桜',
      'さくら',
      'サクラ',
      'ソメイヨシノ',
      'そめいよしの',
      'お花見',
      'おはなみ',
      '桜の花',
      'sakura',
      'cherryblossom',
    ],
    acceptedKeywords: ['桜', 'さくら', 'サクラ', 'ソメイヨシノ', 'sakura', 'cherryblossom'],
    photoUrl: '/photos/cherry_blossom.jpg',
    remotePhotoUrl: '/photos/cherry_blossom.jpg',
    description: '青空に薄ピンクの花びらが満開に咲くソメイヨシノ桜の実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / 満開の桜実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 40,
    title: 'STAGE 40',
    displayAnswer: '新幹線（しんかんせん）',
    readingHint: '白と青の流線形先頭車両が高速疾走する日本の夢の超特急',
    categoryLabel: '乗り物・モビリティ',
    charCountHint: '「新幹線」「しんかんせん」「のぞみ」「N700」も自動判定',
    initialKanaHint: '頭文字：「し」から始まる超特急（「新幹線」）',
    kanaPad: ['し', 'ん', 'か', 'ん', 'せ', 'ん', 'の', 'ぞ', 'み', 'え', 'ぬ', 'な', 'な', 'ひ', 'ゃ', 'く'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 17.0,
    acceptedAnswers: [
      '新幹線',
      'しんかんせん',
      'シンカンセン',
      'のぞみ',
      'N700',
      'N700系',
      '弾丸列車',
      '新幹線電車',
      'shinkansen',
      'bullettrain',
    ],
    acceptedKeywords: ['新幹線', 'しんかんせん', 'のぞみ', 'shinkansen'],
    photoUrl: '/photos/shinkansen.jpg',
    remotePhotoUrl: '/photos/shinkansen.jpg',
    description: '白と青の流線型フォルムが特徴的なN700系新幹線の実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / N700系新幹線実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 41,
    title: 'STAGE 41',
    displayAnswer: '飛行機（ひこうき・旅客機）',
    readingHint: '大空高く主翼を広げて雲海を飛ぶ純白のジェット旅客機',
    categoryLabel: '乗り物・モビリティ',
    charCountHint: '「飛行機」「ひこうき」「ジェット機」「ボーイング」も自動判定',
    initialKanaHint: '頭文字：「ひ」から始まる空の乗り物（「飛行機」）',
    kanaPad: ['ひ', 'こ', 'う', 'き', 'り', 'ょ', 'か', 'く', 'き', 'じ', 'ぇ', 'っ', 'と', 'そ', 'ら', 'つ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 17.0,
    acceptedAnswers: [
      '飛行機',
      'ひこうき',
      'ヒコウキ',
      '旅客機',
      'りょかくき',
      'ジェット機',
      'じぇっとき',
      'ボーイング',
      'エアプレーン',
      'airplane',
      'plane',
      'aircraft',
      'boeing',
    ],
    acceptedKeywords: ['飛行機', 'ひこうき', '旅客機', 'ジェット機', 'airplane', 'plane'],
    photoUrl: '/photos/airplane.jpg',
    remotePhotoUrl: '/photos/airplane.jpg',
    description: '青空を優雅に飛ぶボーイング787旅客機の実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / ボーイング787実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 42,
    title: 'STAGE 42',
    displayAnswer: '蒸気機関車（SL・きかんしゃ）',
    readingHint: '黒鉄の重厚な車体から白い煙をダイナミックに吐き出す機関車',
    categoryLabel: '乗り物・レトロ交通',
    charCountHint: '「蒸気機関車」「SL」「きかんしゃ」「D51」も自動判定',
    initialKanaHint: '頭文字：「じ」から始まる煙を吐く機関車（または「SL」）',
    kanaPad: ['じ', 'ょ', 'う', 'き', 'き', 'か', 'ん', 'し', 'ゃ', 'え', 'す', 'え', 'る', 'で', 'ご', 'い'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 17.0,
    acceptedAnswers: [
      '蒸気機関車',
      'じょうききかんしゃ',
      'SL',
      'えすえる',
      '機関車',
      'きかんしゃ',
      'デゴイチ',
      'でごいち',
      'D51',
      'steamlocomotive',
      'locomotive',
    ],
    acceptedKeywords: ['蒸気機関車', 'じょうききかんしゃ', 'SL', 'えすえる', 'きかんしゃ', 'steamlocomotive'],
    photoUrl: '/photos/steam_locomotive.jpg',
    remotePhotoUrl: '/photos/steam_locomotive.jpg',
    description: '黒鉄のボイラーと動輪が重厚なD51形蒸気機関車の実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / D51蒸気機関車実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 43,
    title: 'STAGE 43',
    displayAnswer: '消防車（はしご車）',
    readingHint: '真っ赤なボディに長いハシゴと赤色灯を載せた緊急車両',
    categoryLabel: '乗り物・働く車',
    charCountHint: '「消防車」「しょうぼうしゃ」「はしご車」も自動判定',
    initialKanaHint: '頭文字：「し」から始まる赤い働く車（「消防車」）',
    kanaPad: ['し', 'ょ', 'う', 'ぼ', 'う', 'し', 'ゃ', 'は', 'し', 'ご', 'し', 'ゃ', 'あ', 'か', 'さ', 'い'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      '消防車',
      'しょうぼうしゃ',
      'ショウボウシャ',
      'はしご車',
      'はしごしゃ',
      '梯子車',
      'fireengine',
      'firetruck',
    ],
    acceptedKeywords: ['消防車', 'しょうぼうしゃ', 'はしご車', 'fireengine', 'firetruck'],
    photoUrl: '/photos/fire_engine.jpg',
    remotePhotoUrl: '/photos/fire_engine.jpg',
    description: '長い伸梯と赤色灯を備えた消防車（はしご車）の実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / 消防車実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 44,
    title: 'STAGE 44',
    displayAnswer: 'いちご（苺・ストロベリー）',
    readingHint: '真っ赤な実に小さなつぶつぶと緑のヘタがついた甘酸っぱい果物',
    categoryLabel: '食べ物・フルーツ',
    charCountHint: '「いちご」「苺」「ストロベリー」も自動判定',
    initialKanaHint: '頭文字：「い」から始まる真っ赤なくだもの（「いちご」）',
    kanaPad: ['い', 'ち', 'ご', 'す', 'と', 'ろ', 'べ', 'り', 'ー', 'あ', 'か', 'く', 'だ', 'も', 'の', 'へ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
      'いちご',
      'イチゴ',
      '苺',
      'ストロベリー',
      'すとろべりー',
      'strawberry',
    ],
    acceptedKeywords: ['いちご', 'イチゴ', '苺', 'ストロベリー', 'strawberry'],
    photoUrl: '/photos/strawberry.jpg',
    remotePhotoUrl: '/photos/strawberry.jpg',
    description: '鮮やかな赤と黄色いつぶつぶが瑞々しい完熟いちごの実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / 完熟いちご実写写真（ローカル同梱）',
      author: 'baby-bear.org / Wikimedia Commons',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 45,
    title: 'STAGE 45',
    displayAnswer: 'ピザ（マルゲリータ）',
    readingHint: 'とろけるモッツァレラチーズとバジルが乗った丸いイタリア料理',
    categoryLabel: '食べ物・イタリアン',
    charCountHint: '「ピザ」「ピッツァ」「マルゲリータ」も自動判定',
    initialKanaHint: '頭文字：「ぴ」から始まる丸いチーズ料理（「ピザ」）',
    kanaPad: ['ぴ', 'ざ', 'ぴ', 'っ', 'つ', 'ぁ', 'ま', 'る', 'げ', 'り', 'ー', 'た', 'ち', 'ー', 'ず', 'と'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
      'ピザ',
      'ぴざ',
      'ピッツァ',
      'ぴっつぁ',
      'マルゲリータ',
      'まるげりーた',
      'pizza',
      'margherita',
    ],
    acceptedKeywords: ['ピザ', 'ぴざ', 'ピッツァ', 'マルゲリータ', 'pizza'],
    photoUrl: '/photos/pizza.jpg',
    remotePhotoUrl: '/photos/pizza.jpg',
    description: 'トマトソースととろけるチーズ、バジルが焼き上がったピザの実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / ピザ・マルゲリータ実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 46,
    title: 'STAGE 46',
    displayAnswer: '寿司（握り寿司・すし）',
    readingHint: '酢飯の上に赤身のマグロやサーモンのネタをのせた和食の代表',
    categoryLabel: '食べ物・伝統和食',
    charCountHint: '「寿司」「すし」「にぎりずし」「まぐろ」も自動判定',
    initialKanaHint: '頭文字：「す」から始まる日本の代表料理（「寿司」）',
    kanaPad: ['す', 'し', 'に', 'ぎ', 'り', 'ず', 'し', 'ま', 'ぐ', 'ろ', 'さ', 'ー', 'も', 'ん', 'わ', 'さ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
      '寿司',
      'すし',
      'スシ',
      '握り寿司',
      'にぎりずし',
      'ニギリズシ',
      'お寿司',
      'おすし',
      'まぐろ寿司',
      'sushi',
      'nigiri',
    ],
    acceptedKeywords: ['寿司', 'すし', '握り寿司', 'にぎりずし', 'sushi'],
    photoUrl: '/photos/sushi.jpg',
    remotePhotoUrl: '/photos/sushi.jpg',
    description: '艶やかなマグロやサーモンが盛られた握り寿司の実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / 握り寿司実写写真（ローカル同梱）',
      author: 'Songshu888 / Wikimedia Commons',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 47,
    title: 'STAGE 47',
    displayAnswer: 'ケーキ（ショートケーキ）',
    readingHint: 'ふわふわのスポンジに真っ白な生クリームと苺が乗った洋菓子',
    categoryLabel: '食べ物・スイーツ',
    charCountHint: '「ケーキ」「ショートケーキ」「いちごケーキ」も自動判定',
    initialKanaHint: '頭文字：「け」から始まる甘いスイーツ（「ケーキ」）',
    kanaPad: ['け', 'ー', 'き', 'し', 'ょ', 'ー', 'と', 'け', 'ー', 'き', 'い', 'ち', 'ご', 'す', 'い', 'つ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
      'ケーキ',
      'けーき',
      'ショートケーキ',
      'しょーとけーき',
      '苺ショートケーキ',
      'イチゴケーキ',
      'cake',
      'shortcake',
    ],
    acceptedKeywords: ['ケーキ', 'けーき', 'ショートケーキ', 'cake'],
    photoUrl: '/photos/cake.jpg',
    remotePhotoUrl: '/photos/cake.jpg',
    description: '生クリームの層に苺がサンドされた三角のショートケーキ実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / ショートケーキ実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 48,
    title: 'STAGE 48',
    displayAnswer: 'ピアノ（グランドピアノ）',
    readingHint: '黒い光沢のボディと白黒の88鍵盤を持つ楽器の王様',
    categoryLabel: '楽器・クラシック音楽',
    charCountHint: '「ピアノ」「グランドピアノ」「けんばん」も自動判定',
    initialKanaHint: '頭文字：「ぴ」から始まる鍵盤楽器（「ピアノ」）',
    kanaPad: ['ぴ', 'あ', 'の', 'ぐ', 'ら', 'ん', 'ど', 'ぴ', 'あ', 'の', 'け', 'ん', 'ば', 'ん', 'お', 'と'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
      'ピアノ',
      'ぴあの',
      'グランドピアノ',
      'ぐらんどぴあの',
      'アップライトピアノ',
      '鍵盤',
      'けんばん',
      'piano',
      'grandpiano',
    ],
    acceptedKeywords: ['ピアノ', 'ぴあの', 'グランドピアノ', 'piano'],
    photoUrl: '/photos/piano.jpg',
    remotePhotoUrl: '/photos/piano.jpg',
    description: '黒漆の光沢と白黒の鍵盤が美しいスタインウェイ・グランドピアノの実写原本写真。',
    provenance: {
      source: 'Wikimedia Commons / グランドピアノ実写写真（ローカル同梱）',
      author: 'Wikimedia Commons Photographers',
      license: 'Public Domain / CC0 (商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 49,
    title: 'STAGE 49',
    displayAnswer: '遮光器土偶（しゃこうきどぐう）',
    readingHint: '青森・亀ヶ岡遺跡出土、大きな目と独特の文様を持つ縄文の至宝',
    categoryLabel: '日本の古代史・国宝級考古遺物',
    charCountHint: '「遮光器土偶」「土偶」「どぐう」も自動判定',
    initialKanaHint: '頭文字：「し」から始まる教科書の縄文土偶（「遮光器土偶」）',
    kanaPad: ['し', 'ゃ', 'こ', 'う', 'き', 'ど', 'ぐ', 'う', 'じ', 'ょ', 'う', 'も', 'ん', 'こ', 'く', 'ほ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      '遮光器土偶',
      'しゃこうきどぐう',
      'シャコウキドグウ',
      '土偶',
      'どぐう',
      'ドグウ',
      '縄文土偶',
      'じょうもんどぐう',
      'dogu',
      'shakokidogu',
    ],
    acceptedKeywords: ['遮光器土偶', 'しゃこうきどぐう', '土偶', 'どぐう', 'dogu'],
    photoUrl: '/photos/dogu.jpg',
    remotePhotoUrl: '/photos/dogu.jpg',
    description: '東京国立博物館所蔵、青森県つがる市木造亀ヶ岡出土の遮光器土偶原本（パブリックドメイン）。',
    provenance: {
      source: '東京国立博物館所蔵 重要文化財遮光器土偶原本（ローカル同梱）',
      author: '縄文時代晩期（紀元前1000年〜400年頃）',
      license: 'Public Domain (著作権保護期間完全満了・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 50,
    title: 'STAGE 50',
    displayAnswer: 'ツタンカーメンの黄金のマスク',
    readingHint: 'エジプト・王家の谷で発見された古代エジプト少年王の黄金のマスク',
    categoryLabel: '世界遺産・古代エジプト文明',
    charCountHint: '「ツタンカーメン」「黄金のマスク」「ツタンカーメンのマスク」すべて正解',
    initialKanaHint: '頭文字：「つ」から始まるエジプト王のマスク（「ツタンカーメン」）',
    kanaPad: ['つ', 'た', 'ん', 'か', 'ー', 'め', 'ん', 'お', 'う', 'ご', 'ん', 'ま', 'す', 'く', 'え', 'じ'],
    coreTileIndices: [7, 8, 13, 14, 19, 20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
      'ツタンカーメンの黄金のマスク',
      'つたんかーめんのおうごんのますく',
      'ツタンカーメン',
      'つたんかーめん',
      'ツタンカーメンのマスク',
      '黄金のマスク',
      'おうごんのますく',
      'ファラオ',
      'ふぁらお',
      'tutankhamun',
      'kingtut',
      'maskoftutankhamun',
    ],
    acceptedKeywords: ['ツタンカーメン', 'つたんかーめん', '黄金のマスク', 'tutankhamun', 'kingtut'],
    photoUrl: '/photos/tutankhamun.jpg',
    remotePhotoUrl: '/photos/tutankhamun.jpg',
    description: 'エジプト考古学博物館所蔵、第18王朝ファラオ・ツタンカーメンの黄金のマスク原本（パブリックドメイン）。',
    provenance: {
      source: 'エジプト・カイロ考古学博物館所蔵原本（ローカル同梱）',
      author: '古代エジプト第18王朝（紀元前1323年頃）',
      license: 'Public Domain (著作権保護期間完全満了・商用利用可能)',
      verificationDate: '2026-11-05',
    },
  },
  {
    id: 51,
    title: "STAGE 51",
    displayAnswer: "徳川家康（とくがわいえやす）",
    readingHint: "江戸幕府を開いた初代征夷大将軍",
    categoryLabel: '歴史・戦国三英傑',
    charCountHint: "ひらがな8文字 / 漢字4文字 / ローマ字も可",
    initialKanaHint: "頭文字：「と」から始まる（「いえやす」単体も正解）",
    kanaPad: ["と","く","が","わ","い","え","や","す","ば","く","ふ","え","ど","み","つ","よ"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
          "徳川家康",
          "とくがわいえやす",
          "トクガワイエヤス",
          "家康",
          "いえやす",
          "イエヤス",
          "東照大権現",
          "とうしょうだいごんげん",
          "tokugawaieyasu",
          "ieyasu"
    ],
    acceptedKeywords: ["家康","いえやす","イエヤス","ieyasu"],
    photoUrl: "/photos/ieyasu.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Tokugawa_Ieyasu2.jpg",
    description: "江戸幕府を開府し260年余りの泰平の世の礎を築いた初代将軍・徳川家康の肖像画（狩野探幽画）。",
    provenance: {
      source: "狩野探幽画「徳川家康像」（大阪城天守閣蔵・パブリックドメイン）",
      author: "狩野探幽（1602–1674）",
      license: "Public Domain (没後350年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 52,
    title: "STAGE 52",
    displayAnswer: "アインシュタイン（アルベルト・アインシュタイン）",
    readingHint: "相対性理論を提唱した「現代物理学の父」",
    categoryLabel: '科学・偉人',
    charCountHint: "カタカナ7文字 / 英語・ひらがなも可",
    initialKanaHint: "頭文字：「あ」から始まるノーベル物理学賞受賞者",
    kanaPad: ["あ","い","ん","し","ゅ","た","ぶ","つ","り","そ","う","た","い","せ","い","る"],
    coreTileIndices: [6,7,12,13,18,19],
    rivalTargetSec: 17.5,
    acceptedAnswers: [
          "アインシュタイン",
          "あいんしゅたいん",
          "アルベルトアインシュタイン",
          "あるべるとあいんしゅたいん",
          "einstein",
          "alberteinstein"
    ],
    acceptedKeywords: ["アインシュタイン","あいんしゅたいん","einstein"],
    photoUrl: "/photos/einstein.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Albert_Einstein_Head.jpg",
    description: "特殊・一般相対性理論を提唱し光電効果の解明でノーベル物理学賞を受賞したアルベルト・アインシュタイン。",
    provenance: {
      source: "公式ポートレート（米国議会図書館・パブリックドメイン）",
      author: "Ferdinand Schmutzer / Oren Jack Turner",
      license: "Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 53,
    title: "STAGE 53",
    displayAnswer: "ベートーヴェン（ルードヴィヒ・ヴァン・ベートーヴェン）",
    readingHint: "「運命」「第九」を作曲した楽聖",
    categoryLabel: '音楽・作曲家',
    charCountHint: "カタカナ6〜7文字 / ひらがな・英語も可",
    initialKanaHint: "頭文字：「べ」から始まるドイツの大作曲家",
    kanaPad: ["べ","ー","と","う","ヴ","ぇ","ん","が","く","せ","い","う","ん","め","い","だ"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
          "ベートーヴェン",
          "べーとーゔぇん",
          "べーとーべん",
          "ベートーベン",
          "ベートーヴエン",
          "beethoven",
          "ludwigvanbeethoven"
    ],
    acceptedKeywords: ["ベートーヴェン","ベートーベン","べーとーべん","べーとーゔぇん","beethoven"],
    photoUrl: "/photos/beethoven.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Beethoven.jpg",
    description: "難聴の苦難を乗り越えて「運命」「英雄」「第九（合唱付き）」などを生み出したドイツの楽聖ルートヴィヒ・ヴァン・ベートーヴェン。",
    provenance: {
      source: "ヨーゼフ・カール・シュティーラー画（1820年・ボーン・ベートーヴェン・ハウス蔵）",
      author: "Joseph Karl Stieler (1781–1858)",
      license: "Public Domain (没後160年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 54,
    title: "STAGE 54",
    displayAnswer: "クレオパトラ（クレオパトラ7世）",
    readingHint: "古代エジプト・プトレマイオス朝最後の女王",
    categoryLabel: '歴史・古代エジプト',
    charCountHint: "カタカナ6文字 / ひらがな・英語も可",
    initialKanaHint: "頭文字：「く」から始まる世界三大美女の一人",
    kanaPad: ["く","れ","お","ぱ","と","ら","え","じ","ぷ","と","じ","ょ","お","う","び","ん"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 17.0,
    acceptedAnswers: [
          "クレオパトラ",
          "くれおぱとら",
          "クレオパトラ7世",
          "くれおぱとらななせい",
          "cleopatra"
    ],
    acceptedKeywords: ["クレオパトラ","くれおぱとら","cleopatra"],
    photoUrl: "/photos/cleopatra.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Cleopatra_VII_terracotta_bust_in_the_Mus%C3%A9e_des_Beaux-Arts_de_Lyon.jpg",
    description: "カエサルやアントニウスを魅了した古代エジプト最後の女王クレオパトラ7世の胸像。",
    provenance: {
      source: "リヨン美術館所蔵 テラコッタ胸像（紀元前1世紀）",
      author: "Ancient Roman / Egyptian Sculptor",
      license: "Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 55,
    title: "STAGE 55",
    displayAnswer: "紫式部（むらさきしきぶ）",
    readingHint: "『源氏物語』を著した平安時代の女性作家",
    categoryLabel: '文学・歴史',
    charCountHint: "ひらがな6文字 / 漢字3文字 / ローマ字可",
    initialKanaHint: "頭文字：「む」から始まる平安中期の歌人",
    kanaPad: ["む","ら","さ","き","し","き","ぶ","げ","ん","じ","も","の","が","た","り","え"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
          "紫式部",
          "むらさきしきぶ",
          "ムラサキシキブ",
          "murasakishikibu",
          "murasaki"
    ],
    acceptedKeywords: ["紫式部","むらさきしきぶ","murasaki"],
    photoUrl: "/photos/murasaki.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Murasaki_Shikibu_by_Tosa_Mitsuoki.jpg",
    description: "世界最古の長編小説『源氏物語』の作者・紫式部が石山寺で構想を練る姿（土佐光起画）。",
    provenance: {
      source: "土佐光起画「紫式部図」（石山寺蔵・パブリックドメイン）",
      author: "土佐光起（1617–1691）",
      license: "Public Domain (没後330年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 56,
    title: "STAGE 56",
    displayAnswer: "ナポレオン（ナポレオン・ボナパルト）",
    readingHint: "フランス第一帝政の皇帝「アルプス越え」",
    categoryLabel: '歴史・軍事',
    charCountHint: "カタカナ5文字 / ひらがな・英語も可",
    initialKanaHint: "頭文字：「な」から始まるフランス皇帝",
    kanaPad: ["な","ぽ","れ","お","ん","ふ","ら","ん","す","こ","う","て","い","ぐ","ん","ば"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 17.5,
    acceptedAnswers: [
          "ナポレオン",
          "なぽれおん",
          "ナポレオンボナパルト",
          "なぽれおんぼなぱると",
          "napoleon",
          "napoleonbonaparte"
    ],
    acceptedKeywords: ["ナポレオン","なぽれおん","napoleon"],
    photoUrl: "/photos/napoleon.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Napoleon_at_the_Great_St._Bernard_-_Jacques-Louis_David_-_Google_Cultural_Institute.jpg",
    description: "白馬に跨りアルプスを越える勇姿を描いたジャック＝ルイ・ダヴィッドの傑作「サン＝ベルナール峠を越えるボナパルト」。",
    provenance: {
      source: "ジャック＝ルイ・ダヴィッド画（マルメゾン城美術館所蔵・パブリックドメイン）",
      author: "Jacques-Louis David (1748–1825)",
      license: "Public Domain (没後190年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 57,
    title: "STAGE 57",
    displayAnswer: "ガリレオ（ガリレオ・ガリレイ）",
    readingHint: "「それでも地球は回っている」天文学の父",
    categoryLabel: '科学・天文学',
    charCountHint: "カタカナ4文字 / ひらがな・フルネーム・英語も可",
    initialKanaHint: "頭文字：「が」から始まるイタリアの物理・天文学者",
    kanaPad: ["が","り","れ","お","が","り","れ","い","て","ん","も","ん","ち","き","ゅ","う"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
          "ガリレオ",
          "がりれお",
          "ガリレオガリレイ",
          "がりれおがりれい",
          "galileo",
          "galileogalilei"
    ],
    acceptedKeywords: ["ガリレオ","がりれお","galileo"],
    photoUrl: "/photos/galileo.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Galileo_Galilei_by_Justus_Sustermans.jpg",
    description: "望遠鏡で木星の衛星や月面のクレーターを発見し地動説を擁護した「近代科学の父」ガリレオ・ガリレイ。",
    provenance: {
      source: "ユストゥス・スステルマンス画（ウフィツィ美術館所蔵・パブリックドメイン）",
      author: "Justus Sustermans (1597–1681)",
      license: "Public Domain (没後340年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 58,
    title: "STAGE 58",
    displayAnswer: "リンカーン（エイブラハム・リンカーン）",
    readingHint: "「人民の人民による人民のための政治」第16代米大統領",
    categoryLabel: '歴史・アメリカ',
    charCountHint: "カタカナ5文字 / ひらがな・英語も可",
    initialKanaHint: "頭文字：「り」から始まる奴隷解放宣言の大統領",
    kanaPad: ["り","ん","か","ー","ん","だ","い","と","う","り","ょ","う","あ","め","り","か"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 17.5,
    acceptedAnswers: [
          "リンカーン",
          "りんかーん",
          "エイブラハムリンカーン",
          "えいぶらはむりんかーん",
          "lincoln",
          "abrahamlincoln"
    ],
    acceptedKeywords: ["リンカーン","りんかーん","lincoln"],
    photoUrl: "/photos/lincoln.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Abraham_Lincoln_O-77_matte_collodion_print.jpg",
    description: "ゲティスバーグ演説や奴隷解放宣言で名高い第16代アメリカ合衆国大統領エイブラハム・リンカーンの肖像写真。",
    provenance: {
      source: "アンソニー・バーガー撮影写真（1864年・米国議会図書館・パブリックドメイン）",
      author: "Anthony Berger (1832–1897)",
      license: "Public Domain (没後120年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 59,
    title: "STAGE 59",
    displayAnswer: "最後の晩餐（さいごのばんさん）",
    readingHint: "レオナルド・ダ・ヴィンチが描いたキリストと12使徒の壁画",
    categoryLabel: '世界の名画・ルネサンス',
    charCountHint: "ひらがな7文字 / 漢字5文字 / 英語も可",
    initialKanaHint: "頭文字：「さ」から始まるサンタ・マリア・デッレ・グラツィエ修道院の壁画",
    kanaPad: ["さ","い","ご","の","ば","ん","さ","ん","れ","お","な","る","ど","だ","ヴ","ぃ"],
    coreTileIndices: [13,14,15,16,17,18],
    rivalTargetSec: 19.0,
    acceptedAnswers: [
          "最後の晩餐",
          "さいごのばんさん",
          "サイゴノバンサン",
          "thelastsupper",
          "lastsupper"
    ],
    acceptedKeywords: ["最後の晩餐","さいごのばんさん","lastsupper"],
    photoUrl: "/photos/last_supper.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:%C3%9Altima_Cena_-_Da_Vinci_5.jpg",
    description: "キリストが「あなたがたの一人がわたしを裏切ろうとしている」と告げた瞬間を描いたダ・ヴィンチの最高傑作。",
    provenance: {
      source: "サンタ・マリア・デッレ・グラツィエ修道院壁画（パブリックドメイン）",
      author: "Leonardo da Vinci (1452–1519)",
      license: "Public Domain (没後500年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 60,
    title: "STAGE 60",
    displayAnswer: "星月夜（ほしづきよ）",
    readingHint: "ゴッホが描いた渦巻く夜空と輝く三日月",
    categoryLabel: '世界の名画・印象派',
    charCountHint: "ひらがな5文字 / 漢字3文字 / 英語も可",
    initialKanaHint: "頭文字：「ほ」から始まるゴッホの代表作（「せいげつや」も可）",
    kanaPad: ["ほ","し","づ","き","よ","せ","い","げ","つ","や","ご","っ","ほ","よ","ぞ","ら"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
          "星月夜",
          "ほしづきよ",
          "ほしずきよ",
          "ホシヅキヨ",
          "せいげつや",
          "thestarrynight",
          "starrynight"
    ],
    acceptedKeywords: ["星月夜","ほしづきよ","ほしずきよ","せいげつや","starrynight"],
    photoUrl: "/photos/starry_night.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    description: "サン＝レミの療養院から見上げた夜空の星々と糸杉を力強い筆致で描いたフィンセント・ファン・ゴッホの傑作。",
    provenance: {
      source: "ニューヨーク近代美術館 (MoMA) 所蔵（パブリックドメイン）",
      author: "Vincent van Gogh (1853–1890)",
      license: "Public Domain (没後130年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 61,
    title: "STAGE 61",
    displayAnswer: "落穂拾い（おちぼひろい）",
    readingHint: "ミレーが描いた夕暮れの麦畑で働く農婦たち",
    categoryLabel: '世界の名画・バルビゾン派',
    charCountHint: "ひらがな6文字 / 漢字4文字 / 英語可",
    initialKanaHint: "頭文字：「お」から始まるオルセー美術館の名画",
    kanaPad: ["お","ち","ぼ","ひ","ろ","い","み","れ","ー","の","う","ふ","む","ぎ","ば","た"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
          "落穂拾い",
          "おちぼひろい",
          "オチボヒロイ",
          "thegleaners",
          "gleaners"
    ],
    acceptedKeywords: ["落穂拾い","おちぼひろい","gleaners"],
    photoUrl: "/photos/gleaners.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
    description: "収穫後の畑に残された麦の穂を拾い集める3人の慎ましやかな農婦を描いたジャン＝フランソワ・ミレーの代表作。",
    provenance: {
      source: "オルセー美術館所蔵（パブリックドメイン）",
      author: "Jean-François Millet (1814–1875)",
      license: "Public Domain (没後150年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 62,
    title: "STAGE 62",
    displayAnswer: "風神雷神図（ふうじんらいじんず）",
    readingHint: "俵屋宗達が描いた金箔屏風の二神",
    categoryLabel: '日本の名画・琳派',
    charCountHint: "ひらがな9文字 / 漢字5文字",
    initialKanaHint: "頭文字：「ふ」から始まる国宝二曲一双屏風（「風神雷神」も可）",
    kanaPad: ["ふ","う","じ","ん","ら","い","じ","ん","ず","そ","う","た","つ","り","ん","ぱ"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.5,
    acceptedAnswers: [
          "風神雷神図",
          "ふうじんらいじんず",
          "風神雷神図屏風",
          "ふうじんらいじんずびょうぶ",
          "風神雷神",
          "ふうじんらいじん",
          "フウジンライジンズ"
    ],
    acceptedKeywords: ["風神雷神","ふうじんらいじん"],
    photoUrl: "/photos/fujin_raijin.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Wind-God-Fujin-and-Thunder-God-Raijin-by-Tawaraya-Sotatsu.png",
    description: "天空を駆け巡る風神と雷神を金箔地にダイナミックに描いた江戸初期の絵師・俵屋宗達の最高傑作（建仁寺蔵・国宝）。",
    provenance: {
      source: "京都・建仁寺蔵 国宝二曲一双屏風（パブリックドメイン）",
      author: "俵屋宗達（生没年不詳・江戸初期）",
      license: "Public Domain (没後380年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 63,
    title: "STAGE 63",
    displayAnswer: "考える人（かんがえるひと）",
    readingHint: "ロダン作の顎に手を当てて思索するブロンズ彫刻",
    categoryLabel: '世界の彫刻・名作',
    charCountHint: "ひらがな7文字 / 漢字4文字 / 英語可",
    initialKanaHint: "頭文字：「か」から始まる地獄の門の彫像",
    kanaPad: ["か","ん","が","え","る","ひ","と","ろ","だ","ん","ち","ご","く","の","も","ん"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 17.0,
    acceptedAnswers: [
          "考える人",
          "かんがえるひと",
          "カンガエルヒト",
          "thethinker",
          "thinker"
    ],
    acceptedKeywords: ["考える人","かんがえるひと","thinker"],
    photoUrl: "/photos/thinker.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:The_Thinker_Museo_Soumaya.jpg",
    description: "オーギュスト・ロダンがダンテの『神曲』に着想を得て制作した思索にふける男性のブロンズ像。",
    provenance: {
      source: "ロダン美術館所蔵彫刻（パブリックドメイン）",
      author: "Auguste Rodin (1840–1917)",
      license: "Public Domain (没後100年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 64,
    title: "STAGE 64",
    displayAnswer: "ヴィーナスの誕生（ヴぃーなすのたんじょう）",
    readingHint: "ボッティチェリが描いた貝殻の上に立つ愛と美の女神",
    categoryLabel: '世界の名画・ルネサンス',
    charCountHint: "カタカナ・ひらがな9文字 / 英語可",
    initialKanaHint: "頭文字：「ヴ」または「び」から始まるウフィツィ美術館の至宝",
    kanaPad: ["ヴ","ぃ","ー","な","す","の","た","ん","じ","ょ","う","ぼ","っ","て","ぃ","び"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 19.0,
    acceptedAnswers: [
          "ヴィーナスの誕生",
          "ビーナスの誕生",
          "ヴぃーなすのたんじょう",
          "びーなすのたんじょう",
          "ヴィーナス",
          "ビーナス",
          "thebirthofvenus",
          "birthofvenus"
    ],
    acceptedKeywords: ["ヴィーナス","ビーナス","ヴぃーなす","びーなす","birthofvenus"],
    photoUrl: "/photos/birth_of_venus.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Arts_%26_Culture_-_scale.jpg",
    description: "海より生まれた愛と美の女神ヴィーナスが西風ゼピュロスに吹かれ貝殻に乗って上陸する姿を描いたサンドロ・ボッティチェリの傑作。",
    provenance: {
      source: "ウフィツィ美術館所蔵（パブリックドメイン）",
      author: "Sandro Botticelli (1445–1510)",
      license: "Public Domain (没後500年超)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 65,
    title: "STAGE 65",
    displayAnswer: "タージマハル（タージ・マハル）",
    readingHint: "インド・アグラにある白大理石の美しい霊廟",
    categoryLabel: '世界遺産・インド',
    charCountHint: "カタカナ5〜6文字 / 英語可",
    initialKanaHint: "頭文字：「た」から始まるムガル帝国皇帝が建てた墓廟",
    kanaPad: ["た","ー","じ","ま","は","る","い","ん","ど","だ","い","り","せ","き","び","よ"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 17.5,
    acceptedAnswers: [
          "タージマハル",
          "タージ・マハル",
          "たーじまはる",
          "tajmahal",
          "taj_mahal"
    ],
    acceptedKeywords: ["タージマハル","たーじまはる","tajmahal"],
    photoUrl: "/photos/taj_mahal.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Taj_Mahal_(Edited).jpeg",
    description: "ムガル帝国第5代皇帝シャー・ジャハーンが愛妃ムムターズ・マハルのために建てた総白大理石の墓廟建築。",
    provenance: {
      source: "Wikimedia Commons (CC BY-SA / Featured Picture)",
      author: "Muhammad Mahdi Karim",
      license: "GNU Free Documentation License / CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 66,
    title: "STAGE 66",
    displayAnswer: "万里の長城（ばんりのちょうじょう）",
    readingHint: "中国の山並みをどこまでも続く巨大な城壁",
    categoryLabel: '世界遺産・中国',
    charCountHint: "ひらがな9文字 / 漢字5文字 / 英語可",
    initialKanaHint: "頭文字：「ば」から始まる秦の始皇帝が築いた防壁",
    kanaPad: ["ば","ん","り","の","ち","ょ","う","じ","ょ","う","ち","ゅ","う","ご","く","じ"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
          "万里の長城",
          "ばんりのちょうじょう",
          "バンリノチョウジョウ",
          "thegreatwall",
          "greatwall",
          "greatwallofchina"
    ],
    acceptedKeywords: ["万里の長城","ばんりのちょうじょう","greatwall"],
    photoUrl: "/photos/great_wall.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    description: "北方民族の侵入を防ぐため数千年にわたり建設・修復された総延長2万キロを超える人類史上最大の城壁遺跡。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Severin.stalder",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 67,
    title: "STAGE 67",
    displayAnswer: "サグラダファミリア（サグラダ・ファミリア）",
    readingHint: "バルセロナにあるガウディ未完の贖罪教会",
    categoryLabel: '世界遺産・スペイン',
    charCountHint: "カタカナ8文字 / 英語可",
    initialKanaHint: "頭文字：「さ」から始まる聖家族贖罪教会",
    kanaPad: ["さ","ぐ","ら","だ","ふ","ぁ","み","り","あ","が","う","で","ぃ","す","ぺ","い"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
          "サグラダファミリア",
          "サグラダ・ファミリア",
          "さぐらだふぁみりあ",
          "sagradafamilia",
          "sagrada"
    ],
    acceptedKeywords: ["サグラダファミリア","さぐらだふぁみりあ","sagradafamilia"],
    photoUrl: "/photos/sagrada_familia.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Bas%C3%ADlica_de_la_Sagrada_Fam%C3%ADlia,_Barcelona.jpg",
    description: "アントニ・ガウディが生涯を捧げて設計したバルセロナの象徴・聖家族贖罪教会。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Stefan Tuchila",
      license: "CC BY-SA 4.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 68,
    title: "STAGE 68",
    displayAnswer: "オペラハウス（シドニー・オペラハウス）",
    readingHint: "オーストラリア・シドニー港に浮かぶ貝殻や帆のような建築",
    categoryLabel: '世界遺産・オーストラリア',
    charCountHint: "カタカナ6文字 / ひらがな・英語可",
    initialKanaHint: "頭文字：「お」から始まる20世紀近代建築の傑作",
    kanaPad: ["お","ぺ","ら","は","う","す","し","ど","に","ー","ご","う","し","ゅ","う","か"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 17.5,
    acceptedAnswers: [
          "オペラハウス",
          "おぺらはうす",
          "シドニーオペラハウス",
          "しどにーおぺらはうす",
          "sydneyoperahouse",
          "operahouse"
    ],
    acceptedKeywords: ["オペラハウス","おぺらはうす","operahouse"],
    photoUrl: "/photos/opera_house.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Sydney_Opera_House_Sails.jpg",
    description: "ヨーン・ウツソンが設計したシドニー湾に佇む白い帆船のような優美な歌劇場（世界遺産）。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Marlith",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 69,
    title: "STAGE 69",
    displayAnswer: "厳島神社（いつくしまじんじゃ）",
    readingHint: "広島・宮島の海に浮かぶ朱塗りの大鳥居",
    categoryLabel: '世界遺産・日本の神社',
    charCountHint: "ひらがな8文字 / 漢字4文字 / 宮島も可",
    initialKanaHint: "頭文字：「い」から始まる平清盛ゆかりの神社",
    kanaPad: ["い","つ","く","し","ま","じ","ん","じ","ゃ","み","や","じ","ま","と","り","い"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
          "厳島神社",
          "いつくしまじんじゃ",
          "イツクシマジンジャ",
          "宮島",
          "みやじま",
          "大鳥居",
          "おおとりい",
          "itsukushima",
          "miyajima"
    ],
    acceptedKeywords: ["厳島神社","いつくしま","宮島","みやじま","itsukushima"],
    photoUrl: "/photos/itsukushima.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Miyajima_Torii_high_tide.jpg",
    description: "海上に朱色の大鳥居と社殿が広がる日本三景・宮島の厳島神社（世界文化遺産）。",
    provenance: {
      source: "Wikimedia Commons (CC BY-SA)",
      author: "Fg2",
      license: "Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 70,
    title: "STAGE 70",
    displayAnswer: "ストーンヘンジ（Stonehenge）",
    readingHint: "イギリス・ソールズベリー平原の先史巨石記念物",
    categoryLabel: '世界遺産・イギリス古代遺跡',
    charCountHint: "カタカナ6文字 / ひらがな・英語可",
    initialKanaHint: "頭文字：「す」から始まる円形に並んだ巨石群",
    kanaPad: ["す","と","ー","ん","へ","ん","じ","い","ぎ","り","す","き","ょ","せ","き","え"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 18.0,
    acceptedAnswers: [
          "ストーンヘンジ",
          "すとーんへんじ",
          "stonehenge"
    ],
    acceptedKeywords: ["ストーンヘンジ","すとーんへんじ","stonehenge"],
    photoUrl: "/photos/stonehenge.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Stonehenge_Total.jpg",
    description: "紀元前2500年頃に築かれたとされるイギリスの謎多き環状巨石遺構（世界遺産）。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Diego Delso",
      license: "CC BY-SA 4.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 71,
    title: "STAGE 71",
    displayAnswer: "マチュピチュ（マチュ・ピチュ空中都市）",
    readingHint: "ペルーのアンデス山脈尾根に佇むインカ帝国の空中都市",
    categoryLabel: '世界遺産・インカ帝国',
    charCountHint: "カタカナ5文字 / 英語可",
    initialKanaHint: "頭文字：「ま」から始まる天空の古代遺跡",
    kanaPad: ["ま","ち","ゅ","ぴ","ち","ゅ","い","ん","か","く","う","ち","ゅ","う","ぺ","る"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 17.5,
    acceptedAnswers: [
          "マチュピチュ",
          "マチュ・ピチュ",
          "まちゅぴちゅ",
          "machupicchu",
          "machu_picchu"
    ],
    acceptedKeywords: ["マチュピチュ","まちゅぴちゅ","machupicchu"],
    photoUrl: "/photos/machu_picchu.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Machu_Picchu,_Peru.jpg",
    description: "標高約2,400mの切り立った尾根の上に忽然と姿を現すインカ文明の石造都市遺跡。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Pedro Szekely",
      license: "CC BY-SA 2.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 72,
    title: "STAGE 72",
    displayAnswer: "キリン（麒麟）",
    readingHint: "首と足がとても長いアフリカのサバンナの動物",
    categoryLabel: '動物・哺乳類',
    charCountHint: "カタカナ3文字 / ひらがな・英語可",
    initialKanaHint: "頭文字：「き」から始まる首の長い動物",
    kanaPad: ["き","り","ん","く","び","な","が","ど","う","ぶ","つ","さ","ば","ん","な","あ"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
          "キリン",
          "きりん",
          "麒麟",
          "giraffe"
    ],
    acceptedKeywords: ["キリン","きりん","giraffe"],
    photoUrl: "/photos/giraffe.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Giraffa_camelopardalis_angolensis.jpg",
    description: "長い首と網目模様の毛並みを持つ地球上で最も背の高い陸生動物キリン。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Hans Stieglitz",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 73,
    title: "STAGE 73",
    displayAnswer: "ゾウ（象・アフリカゾウ）",
    readingHint: "大きな耳と器用に動く長い鼻を持つ最大の陸上動物",
    categoryLabel: '動物・哺乳類',
    charCountHint: "カタカナ2文字 / ひらがな・漢字1文字・英語可",
    initialKanaHint: "頭文字：「ぞ」から始まる大きな鼻の動物",
    kanaPad: ["ぞ","う","象","は","な","み","み","き","ば","あ","ふ","り","か","ど","で","か"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.5,
    acceptedAnswers: [
          "ゾウ",
          "ぞう",
          "象",
          "アフリカゾウ",
          "あふりかぞう",
          "アジアゾウ",
          "あじあぞう",
          "elephant"
    ],
    acceptedKeywords: ["ゾウ","ぞう","象","elephant"],
    photoUrl: "/photos/elephant.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Elephant_near_ndutu.jpg",
    description: "大きな耳と長い鼻、白い牙を誇るアフリカサバンナの陸上最大哺乳類ゾウ。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Muhammad Mahdi Karim",
      license: "GNU FDL / CC BY-SA",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 74,
    title: "STAGE 74",
    displayAnswer: "コアラ（子守熊）",
    readingHint: "オーストラリアのユーカリの木の上で暮らす有袋類",
    categoryLabel: '動物・オーストラリア',
    charCountHint: "カタカナ3文字 / ひらがな・英語可",
    initialKanaHint: "頭文字：「こ」から始まる丸い耳の動物",
    kanaPad: ["こ","あ","ら","ゆ","ー","か","り","ど","う","ぶ","つ","ご","う","し","ゅ","う"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
          "コアラ",
          "こあら",
          "子守熊",
          "koala"
    ],
    acceptedKeywords: ["コアラ","こあら","koala"],
    photoUrl: "/photos/koala.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Koala_climbing_tree.jpg",
    description: "ユーカリの葉を食べ一日中木の枝でくつろぐオーストラリア固有の人気有袋類コアラ。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Diliff",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 75,
    title: "STAGE 75",
    displayAnswer: "イルカ（海豚）",
    readingHint: "海を軽やかにジャンプする知能の高い水生哺乳類",
    categoryLabel: '海の生き物・哺乳類',
    charCountHint: "カタカナ3文字 / ひらがな・漢字可",
    initialKanaHint: "頭文字：「い」から始まる海の人気者",
    kanaPad: ["い","る","か","海","豚","う","み","す","い","ぞ","く","か","ん","ジ","ャ","ン"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
          "イルカ",
          "いるか",
          "海豚",
          "dolphin"
    ],
    acceptedKeywords: ["イルカ","いるか","dolphin"],
    photoUrl: "/photos/dolphin.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Dolphin_in_Red_Sea.jpg",
    description: "群れで泳ぎ超音波（エコーロケーション）で仲間と交信する賢い海洋哺乳類イルカ。",
    provenance: {
      source: "Wikimedia Commons (Public Domain / CC0)",
      author: "Alexander Vasenin",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 76,
    title: "STAGE 76",
    displayAnswer: "トラ（虎・百獣の王）",
    readingHint: "黄色と黒の縞模様を持つネコ科最大の猛獣",
    categoryLabel: '動物・ネコ科',
    charCountHint: "カタカナ2文字 / ひらがな・漢字1文字・英語可",
    initialKanaHint: "頭文字：「と」から始まる縞模様の肉食獣",
    kanaPad: ["と","ら","虎","し","ま","も","よ","う","ね","こ","も","う","じ","ゅ","う","き"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.5,
    acceptedAnswers: [
          "トラ",
          "とら",
          "虎",
          "tiger"
    ],
    acceptedKeywords: ["トラ","とら","虎","tiger"],
    photoUrl: "/photos/tiger.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Siberian_Tiger_by_Valerius_Tygart.jpg",
    description: "力強い体躯と鮮烈な縞模様、鋭い眼光で密林に君臨するアジアの猛獣トラ。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Valerius Tygart",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 77,
    title: "STAGE 77",
    displayAnswer: "カメレオン（変色する爬虫類）",
    readingHint: "体色を変え左右独立して動く目を持つ爬虫類",
    categoryLabel: '動物・爬虫類',
    charCountHint: "カタカナ5文字 / ひらがな・英語可",
    initialKanaHint: "頭文字：「か」から始まる長い舌を伸ばす爬虫類",
    kanaPad: ["か","め","れ","お","ん","へ","ん","し","ょ","く","し","た","は","ち","ゅ","う"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 17.0,
    acceptedAnswers: [
          "カメレオン",
          "かめれおん",
          "chameleon"
    ],
    acceptedKeywords: ["カメレオン","かめれおん","chameleon"],
    photoUrl: "/photos/chameleon.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Panther_chameleon_(Furcifer_pardalis)_male_Nosy_Be.jpg",
    description: "周囲の環境や感情に応じて体色を変化させ、クルクル動く目と伸縮自在の舌を持つカメレオン。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Charles J. Sharp",
      license: "CC BY-SA 4.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 78,
    title: "STAGE 78",
    displayAnswer: "シマウマ（縞馬）",
    readingHint: "白と黒の鮮やかな縞模様を持つサバンナの草食獣",
    categoryLabel: '動物・サバンナ',
    charCountHint: "カタカナ4文字 / ひらがな・漢字可",
    initialKanaHint: "頭文字：「し」から始まる白黒ストライプの馬",
    kanaPad: ["し","ま","う","ま","縞","馬","し","ろ","く","ろ","さ","ば","ん","な","く","さ"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.5,
    acceptedAnswers: [
          "シマウマ",
          "しまうま",
          "縞馬",
          "zebra"
    ],
    acceptedKeywords: ["シマウマ","しまうま","zebra"],
    photoUrl: "/photos/zebra.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Equus_quagga_burchellii_-_Etosha,_2014.jpg",
    description: "1頭ごとに異なる唯一無二の白黒ストライプ模様をまとうアフリカの草食動物シマウマ。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Yadigar",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 79,
    title: "STAGE 79",
    displayAnswer: "地球（ちきゅう・The Earth）",
    readingHint: "宇宙に青く輝く生命の星「青いビー玉」",
    categoryLabel: '宇宙・太陽系惑星',
    charCountHint: "ひらがな4文字 / 漢字2文字 / 英語可",
    initialKanaHint: "頭文字：「ち」から始まる私たちが暮らす第3惑星",
    kanaPad: ["ち","き","ゅ","う","青","い","星","わ","く","せ","い","う","ち","ゅ","う","水"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
          "地球",
          "ちきゅう",
          "チキュウ",
          "earth",
          "theearth"
    ],
    acceptedKeywords: ["地球","ちきゅう","earth"],
    photoUrl: "/photos/earth.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:The_Blue_Marble_(remastered).jpg",
    description: "アポロ17号の宇宙飛行士が撮影した生命と水の青い惑星「ザ・ブルー・マーブル（地球）」。",
    provenance: {
      source: "NASA Apollo 17 Photography (1972)",
      author: "NASA / Harrison Schmitt or Ron Evans",
      license: "Public Domain (NASA)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 80,
    title: "STAGE 80",
    displayAnswer: "木星（もくせい・Jupiter）",
    readingHint: "太陽系最大のガス惑星・大赤斑と縞模様",
    categoryLabel: '宇宙・太陽系惑星',
    charCountHint: "ひらがな4文字 / 漢字2文字 / 英語可",
    initialKanaHint: "頭文字：「も」から始まる第5惑星（英語名「ジュピター」）",
    kanaPad: ["も","く","せ","い","ジ","ュ","ピ","タ","ー","だ","い","せ","き","は","ん","気"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.5,
    acceptedAnswers: [
          "木星",
          "もくせい",
          "モクセイ",
          "ジュピター",
          "じゅぴたー",
          "jupiter"
    ],
    acceptedKeywords: ["木星","もくせい","jupiter","ジュピター","じゅぴたー"],
    photoUrl: "/photos/jupiter.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:PIA22946-Jupiter-RedSpot-JunoSpacecraft-20190212.jpg",
    description: "探査機ジュノーが捉えた太陽系最大の巨大ガス惑星・木星とその象徴である大赤斑のクローズアップ。",
    provenance: {
      source: "NASA / JPL-Caltech / SwRI / MSSS / Gerald Eichstädt",
      author: "NASA Juno Spacecraft",
      license: "Public Domain (NASA)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 81,
    title: "STAGE 81",
    displayAnswer: "火星（かせい・Mars）",
    readingHint: "酸化鉄の赤褐色の土に覆われた「赤い惑星」",
    categoryLabel: '宇宙・太陽系惑星',
    charCountHint: "ひらがな3文字 / 漢字2文字 / 英語可",
    initialKanaHint: "頭文字：「か」から始まる第4惑星（英語名「マーズ」）",
    kanaPad: ["か","せ","い","マ","ー","ズ","あ","か","い","わ","く","せ","い","て","ん","さ"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
          "火星",
          "かせい",
          "カセイ",
          "マーズ",
          "まーず",
          "mars"
    ],
    acceptedKeywords: ["火星","かせい","mars","マーズ","まーず"],
    photoUrl: "/photos/mars.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:OSIRIS_Mars_true_color.jpg",
    description: "欧州宇宙機関のロゼッタ探査機が撮影した赤い大地と極冠を持つ地球の隣の惑星・火星。",
    provenance: {
      source: "ESA / MPS for OSIRIS Team (2007)",
      author: "ESA / Rosetta Spacecraft",
      license: "CC BY-SA 3.0 IGO",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 82,
    title: "STAGE 82",
    displayAnswer: "太陽（たいよう・The Sun）",
    readingHint: "太陽系の中心で燃え盛る巨大な恒星",
    categoryLabel: '宇宙・太陽系の主星',
    charCountHint: "ひらがな4文字 / 漢字2文字 / 英語可",
    initialKanaHint: "頭文字：「た」から始まる光と熱を放つ星",
    kanaPad: ["た","い","よ","う","サ","ン","こ","う","せ","い","ひ","か","り","ね","つ","炎"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.5,
    acceptedAnswers: [
          "太陽",
          "たいよう",
          "タイヨウ",
          "sun",
          "thesun"
    ],
    acceptedKeywords: ["太陽","たいよう","sun"],
    photoUrl: "/photos/sun.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
    description: "NASAの太陽観測衛星SDOが捉えた強烈なコロナとプロミネンスを放つ太陽系の恒星・太陽。",
    provenance: {
      source: "NASA / SDO (Solar Dynamics Observatory)",
      author: "NASA",
      license: "Public Domain (NASA)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 83,
    title: "STAGE 83",
    displayAnswer: "パトカー（パトロールカー・警察車両）",
    readingHint: "白黒ツートンカラーに赤い赤色灯を載せた警察の緊急車両",
    categoryLabel: '乗り物・緊急車両',
    charCountHint: "カタカナ4文字 / ひらがな・略称可",
    initialKanaHint: "頭文字：「ぱ」から始まる街の治安を守る車",
    kanaPad: ["ぱ","と","か","ー","け","い","さ","つ","し","ゃ","り","ょ","う","あ","か","い"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
          "パトカー",
          "ぱとかー",
          "パトロールカー",
          "ぱとろーるかー",
          "警察車両",
          "けいさつしゃりょう",
          "policecar",
          "patrolcar"
    ],
    acceptedKeywords: ["パトカー","ぱとかー","policecar","patrolcar"],
    photoUrl: "/photos/patrol_car.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Toyota_Crown_patrol_car_of_Chiba_Prefectural_Police_front.JPG",
    description: "白と黒のツートンボディに天井の赤色散光灯が光る日本の代表的なパトロールカー。",
    provenance: {
      source: "Wikimedia Commons (Public Domain)",
      author: "市川市民",
      license: "Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 84,
    title: "STAGE 84",
    displayAnswer: "ヘリコプター（回転翼機）",
    readingHint: "頭上の大きなローターを回転させて垂直離着陸する航空機",
    categoryLabel: '乗り物・航空機',
    charCountHint: "カタカナ6文字 / ひらがな・略称「ヘリ」可",
    initialKanaHint: "頭文字：「へ」から始まる空を飛ぶ乗り物",
    kanaPad: ["へ","り","こ","ぷ","た","ー","へ","り","そ","ら","と","ぶ","ろ","ー","た","ー"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
          "ヘリコプター",
          "へりこぷたー",
          "ヘリ",
          "へり",
          "helicopter",
          "chopper"
    ],
    acceptedKeywords: ["ヘリコプター","へりこぷたー","ヘリ","へり","helicopter"],
    photoUrl: "/photos/helicopter.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Tokyo_Fire_Department_A%C3%A9rospatiale_AS332L1_Super_Puma_JA6741.jpg",
    description: "災害救助やドクターヘリでも活躍する回転翼で垂直上昇・ホバリング可能な航空機。",
    provenance: {
      source: "Wikimedia Commons (CC BY-SA)",
      author: "Cp9asngf",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 85,
    title: "STAGE 85",
    displayAnswer: "潜水艦（せんすいかん・Submarine）",
    readingHint: "海中深くを潜航して航行する特殊な艦艇",
    categoryLabel: '乗り物・海洋艦艇',
    charCountHint: "ひらがな6文字 / 漢字3文字 / 英語可",
    initialKanaHint: "頭文字：「せ」から始まる深海を進む黒い船",
    kanaPad: ["せ","ん","す","い","か","ん","海","中","し","ん","か","い","ふ","ね","軍","艦"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.5,
    acceptedAnswers: [
          "潜水艦",
          "せんすいかん",
          "センスイカン",
          "サブマリン",
          "さぶまりん",
          "submarine"
    ],
    acceptedKeywords: ["潜水艦","せんすいかん","submarine"],
    photoUrl: "/photos/submarine.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:US_Navy_031215-N-6236G-001_The_fast_attack_submarine_USS_Salt_Lake_City_(SSN_716)_departs_San_Diego,_Calif.,_for_a_scheduled_deployment.jpg",
    description: "海中を密かに進みソナーや潜望鏡を備える黒い流線型の潜水艦。",
    provenance: {
      source: "米国海軍公式写真（パブリックドメイン）",
      author: "U.S. Navy / Photographer Mate 2nd Class Daniel A. Jones",
      license: "Public Domain (US Navy)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 86,
    title: "STAGE 86",
    displayAnswer: "客船（豪華客船・クルーズ船）",
    readingHint: "何千人もの乗客を乗せて大洋を航海する巨大な白亜の船",
    categoryLabel: '乗り物・船舶',
    charCountHint: "ひらがな4〜5文字 / 漢字2文字 / 「クルーズ船」可",
    initialKanaHint: "頭文字：「き」または「く」から始まる海のホテル",
    kanaPad: ["き","ゃ","く","せ","ん","く","る","ー","ず","せ","ん","ご","う","か","ふ","ね"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.5,
    acceptedAnswers: [
          "客船",
          "きゃくせん",
          "キャクセン",
          "クルーズ船",
          "くるーずせん",
          "豪華客船",
          "ごうかきゃくせん",
          "cruiseship",
          "cruise_ship"
    ],
    acceptedKeywords: ["客船","きゃくせん","クルーズ船","くるーずせん","cruiseship"],
    photoUrl: "/photos/cruise_ship.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Queen_Mary_2_in_Sydney_Harbour.jpg",
    description: "プールや劇場、レストランを備え世界中を旅する白亜の超大型クルーズ客船。",
    provenance: {
      source: "Wikimedia Commons (Featured Picture)",
      author: "Marlith",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 87,
    title: "STAGE 87",
    displayAnswer: "ロケット（宇宙ロケット・打ち上げ機）",
    readingHint: "白煙と炎を噴射して宇宙へと飛び立つ巨大な打ち上げ機",
    categoryLabel: '乗り物・宇宙探査',
    charCountHint: "カタカナ4文字 / ひらがな・英語可",
    initialKanaHint: "頭文字：「ろ」から始まる宇宙へ人工衛星を運ぶ機体",
    kanaPad: ["ろ","け","っ","と","う","ち","ゅ","う","は","っ","し","ゃ","ほ","の","お","空"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
          "ロケット",
          "ろけっと",
          "宇宙ロケット",
          "うちゅうろけっと",
          "rocket"
    ],
    acceptedKeywords: ["ロケット","ろけっと","rocket"],
    photoUrl: "/photos/rocket.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:SpaceX_CRS-1_launch.jpg",
    description: "轟音と猛烈な噴射炎とともに大気圏を突き抜けて宇宙へと飛び立つ大型ロケット。",
    provenance: {
      source: "NASA Kennedy Space Center (2012)",
      author: "NASA / SpaceX",
      license: "Public Domain (NASA)",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 88,
    title: "STAGE 88",
    displayAnswer: "ハンバーガー（Hamburger）",
    readingHint: "丸いバンズにパティやレタス、トマトを挟んだファストフード",
    categoryLabel: 'グルメ・ファストフード',
    charCountHint: "カタカナ6文字 / ひらがな・英語可",
    initialKanaHint: "頭文字：「は」から始まる肉を挟んだサンド",
    kanaPad: ["は","ん","ば","ー","が","ー","ば","ん","ず","ぱ","て","ぃ","ち","ー","ず","肉"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
          "ハンバーガー",
          "はんばーがー",
          "バーガー",
          "ばーがー",
          "hamburger",
          "burger"
    ],
    acceptedKeywords: ["ハンバーガー","はんばーがー","バーガー","ばーがー","hamburger","burger"],
    photoUrl: "/photos/hamburger.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:NCI_Visuals_Food_Hamburger.jpg",
    description: "香ばしく焼いたジューシーな牛肉パティにチーズと野菜を挟んだアメリカ生まれの人気ハンバーガー。",
    provenance: {
      source: "米国国立がん研究所 (NCI) 食育写真（パブリックドメイン）",
      author: "National Cancer Institute / Linda Bartlett",
      license: "Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 89,
    title: "STAGE 89",
    displayAnswer: "ラーメン（拉麺・中華そば）",
    readingHint: "温かいスープに中華麺、チャーシューや煮卵が入った国民食",
    categoryLabel: 'グルメ・麺類',
    charCountHint: "カタカナ4文字 / ひらがな・漢字可",
    initialKanaHint: "頭文字：「ら」から始まるどんぶり麺料理",
    kanaPad: ["ら","ー","め","ん","拉","麺","ち","ゅ","う","か","そ","ば","す","ー","ぷ","煮"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
          "ラーメン",
          "らーめん",
          "拉麺",
          "中華そば",
          "ちゅうかそば",
          "ramen",
          "noodles"
    ],
    acceptedKeywords: ["ラーメン","らーめん","拉麺","中華そば","ちゅうかそば","ramen"],
    photoUrl: "/photos/ramen.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:A_bowl_of_ramen_in_Osaka,_Japan.jpg",
    description: "旨味の詰まった濃厚スープに縮れ麺、大判チャーシューとメンマが乗った日本の国民食ラーメン。",
    provenance: {
      source: "Wikimedia Commons (CC BY 2.0)",
      author: "City Foodsters",
      license: "CC BY 2.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 90,
    title: "STAGE 90",
    displayAnswer: "カレー（カレーライス）",
    readingHint: "スパイスを煮込んだルーをご飯にかけて食べる国民的人気料理",
    categoryLabel: 'グルメ・洋食',
    charCountHint: "カタカナ3〜6文字 / ひらがな・英語可",
    initialKanaHint: "頭文字：「か」から始まるスパイス香るご飯もの",
    kanaPad: ["か","れ","ー","ら","い","す","す","ぱ","い","す","ご","は","ん","る","ー","肉"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
          "カレー",
          "かれー",
          "カレーライス",
          "かれーらいす",
          "カリー",
          "かりー",
          "curry",
          "curryrice"
    ],
    acceptedKeywords: ["カレー","かれー","カレーライス","かれーらいす","curry"],
    photoUrl: "/photos/curry.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Curry_rice_by_jetalone_in_Tokyo.jpg",
    description: "じっくり炒めた玉ねぎと牛肉の深いコク、香り高いスパイスが食欲をそそる日本の王道カレーライス。",
    provenance: {
      source: "Wikimedia Commons (CC BY 2.0)",
      author: "jetalone",
      license: "CC BY 2.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 91,
    title: "STAGE 91",
    displayAnswer: "りんご（林檎・Apple）",
    readingHint: "赤くて丸いシャキッとした食感の代表的フルーツ",
    categoryLabel: '果物・フルーツ',
    charCountHint: "ひらがな3文字 / 漢字2文字 / カタカナ・英語可",
    initialKanaHint: "頭文字：「り」から始まる真っ赤な果物",
    kanaPad: ["り","ん","ご","林","檎","あ","か","い","く","だ","も","の","ふ","る","ー","つ"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 14.5,
    acceptedAnswers: [
          "りんご",
          "リンゴ",
          "林檎",
          "アップル",
          "あっぷる",
          "apple"
    ],
    acceptedKeywords: ["りんご","リンゴ","林檎","apple"],
    photoUrl: "/photos/apple.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Red_Apple.jpg",
    description: "鮮やかな深紅の皮に果汁がぎっしり詰まったみずみずしい採れたての完熟りんご。",
    provenance: {
      source: "Wikimedia Commons (CC BY-SA 3.0)",
      author: "Abhijit Tembhekar",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 92,
    title: "STAGE 92",
    displayAnswer: "バナナ（甘蕉・実芭蕉）",
    readingHint: "黄色い皮をむいて食べる三日月形の甘い果物",
    categoryLabel: '果物・フルーツ',
    charCountHint: "カタカナ3文字 / ひらがな・英語可",
    initialKanaHint: "頭文字：「ば」から始まる手軽なエネルギー源フルーツ",
    kanaPad: ["ば","な","な","き","い","ろ","皮","く","だ","も","の","あ","ま","い","南","国"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 14.5,
    acceptedAnswers: [
          "バナナ",
          "ばなな",
          "banana"
    ],
    acceptedKeywords: ["バナナ","ばなな","banana"],
    photoUrl: "/photos/banana.jpg",
    remotePhotoUrl: "https://commons.wikimedia.org/wiki/File:Banana_and_cross_section.jpg",
    description: "甘い香りと栄養たっぷりのやさしい果肉を持つ黄色い房のバナナ。",
    provenance: {
      source: "Wikimedia Commons (CC BY-SA 3.0)",
      author: "Steve Hopson",
      license: "CC BY-SA 3.0",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 93,
    title: "STAGE 93",
    displayAnswer: "王冠（おうかん・クラウン）",
    readingHint: "国王や女王が頭に戴く宝石を散りばめた黄金の冠",
    categoryLabel: 'ドット絵・王室レガリア',
    charCountHint: "ひらがな4文字 / 漢字2文字 / カタカナ・英語可",
    initialKanaHint: "頭文字：「お」から始まる黄金の冠（「クラウン」も可）",
    kanaPad: ["お","う","か","ん","ク","ラ","ウ","ン","き","ん","ほ","う","せ","き","王","冠"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
          "王冠",
          "おうかん",
          "オウカン",
          "クラウン",
          "くらうん",
          "crown"
    ],
    acceptedKeywords: ["王冠","おうかん","クラウン","くらうん","crown"],
    photoUrl: "",
    remotePhotoUrl: "",
    description: "レトロRPG風ドット絵で描かれたルビーやサファイアが輝く黄金の王冠。",
    provenance: {
      source: "BlockMosaic Pixel Art Studio（Canvas 16bit自作グラフィック）",
      author: "BlockMosaic Designer",
      license: "Original / CC0 Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 94,
    title: "STAGE 94",
    displayAnswer: "盾（たて・シールド）",
    readingHint: "騎士や勇者が敵の攻撃を防ぐために構える防具",
    categoryLabel: 'ドット絵・RPG装備',
    charCountHint: "ひらがな2文字 / 漢字1文字 / カタカナ・英語可",
    initialKanaHint: "頭文字：「た」から始まる勇者の防具（「シールド」も可）",
    kanaPad: ["た","て","盾","シ","ー","ル","ド","ぼ","う","ぐ","き","し","ゆ","う","し","ゃ"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.5,
    acceptedAnswers: [
          "盾",
          "たて",
          "タテ",
          "シールド",
          "しーるど",
          "shield"
    ],
    acceptedKeywords: ["盾","たて","シールド","しーるど","shield"],
    photoUrl: "",
    remotePhotoUrl: "",
    description: "青と金の紋章が刻まれた勇者のカイトシールドを表現したノスタルジックなドット絵。",
    provenance: {
      source: "BlockMosaic Pixel Art Studio（Canvas 16bit自作グラフィック）",
      author: "BlockMosaic Designer",
      license: "Original / CC0 Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 95,
    title: "STAGE 95",
    displayAnswer: "コイン（金貨・ゴールド）",
    readingHint: "ゲームでおなじみのきらめく丸いお金・金貨",
    categoryLabel: 'ドット絵・レトロゲームアイテム',
    charCountHint: "カタカナ3文字 / ひらがな・漢字可",
    initialKanaHint: "頭文字：「こ」から始まる輝く硬貨（「金貨」も可）",
    kanaPad: ["こ","い","ん","金","貨","き","ん","か","ご","ー","る","ど","お","か","ね","星"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
          "コイン",
          "こいん",
          "金貨",
          "きんか",
          "ゴールド",
          "ごーるど",
          "硬貨",
          "こうか",
          "coin",
          "gold"
    ],
    acceptedKeywords: ["コイン","こいん","金貨","きんか","coin"],
    photoUrl: "",
    remotePhotoUrl: "",
    description: "レトロアクションゲームでおなじみの星のレリーフが輝くゴールドコインのドット絵。",
    provenance: {
      source: "BlockMosaic Pixel Art Studio（Canvas 16bit自作グラフィック）",
      author: "BlockMosaic Designer",
      license: "Original / CC0 Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 96,
    title: "STAGE 96",
    displayAnswer: "おばけ（ゴースト・幽霊）",
    readingHint: "白い布を被ったようなふわふわ漂う愛嬌ある幽霊",
    categoryLabel: 'ドット絵・モンスター',
    charCountHint: "ひらがな3文字 / カタカナ・漢字可",
    initialKanaHint: "頭文字：「お」から始まる親しみやすいオバケ",
    kanaPad: ["お","ば","け","ゴ","ー","ス","ト","ゆ","う","れ","い","幽","霊","白","よ","る"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.0,
    acceptedAnswers: [
          "おばけ",
          "オバケ",
          "ゴースト",
          "ごーすと",
          "幽霊",
          "ゆうれい",
          "ghost"
    ],
    acceptedKeywords: ["おばけ","オバケ","ゴースト","ごーすと","幽霊","ゆうれい","ghost"],
    photoUrl: "",
    remotePhotoUrl: "",
    description: "レトロアーケード風の丸い目と波打つ裾を持つキュートな白いゴーストのドット絵。",
    provenance: {
      source: "BlockMosaic Pixel Art Studio（Canvas 16bit自作グラフィック）",
      author: "BlockMosaic Designer",
      license: "Original / CC0 Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 97,
    title: "STAGE 97",
    displayAnswer: "たまご（ドラゴンの卵・エッグ）",
    readingHint: "神秘的な模様と光を放つファンタジー世界の大きな卵",
    categoryLabel: 'ドット絵・ファンタジーアイテム',
    charCountHint: "ひらがな3文字 / 漢字1文字 / 「卵」可",
    initialKanaHint: "頭文字：「た」から始まる神秘の卵（「ドラゴンのたまご」も可）",
    kanaPad: ["た","ま","ご","卵","玉","子","ど","ら","ご","ん","エ","ッ","グ","す","巣","光"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.5,
    acceptedAnswers: [
          "たまご",
          "タマゴ",
          "卵",
          "玉子",
          "ドラゴンの卵",
          "どらごんのたまご",
          "エッグ",
          "えっぐ",
          "egg"
    ],
    acceptedKeywords: ["たまご","タマゴ","卵","玉子","egg"],
    photoUrl: "",
    remotePhotoUrl: "",
    description: "神秘的なエメラルドとゴールドの鱗模様を持ち光のヒビが入ったドラゴンの卵のドット絵。",
    provenance: {
      source: "BlockMosaic Pixel Art Studio（Canvas 16bit自作グラフィック）",
      author: "BlockMosaic Designer",
      license: "Original / CC0 Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 98,
    title: "STAGE 98",
    displayAnswer: "ギター（アコースティックギター・楽器）",
    readingHint: "弦を弾いて美しい音色を奏でる木製の弦楽器",
    categoryLabel: 'ベクターアート・楽器',
    charCountHint: "カタカナ3文字 / ひらがな・英語可",
    initialKanaHint: "頭文字：「ぎ」から始まるくびれのある弦楽器",
    kanaPad: ["ぎ","た","ー","ア","コ","ギ","が","っ","き","げ","ん","が","っ","き","音","楽"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 15.5,
    acceptedAnswers: [
          "ギター",
          "ぎたー",
          "アコギ",
          "あこぎ",
          "アコースティックギター",
          "あこーすてぃっくぎたー",
          "クラシックギター",
          "guitar"
    ],
    acceptedKeywords: ["ギター","ぎたー","アコギ","guitar"],
    photoUrl: "",
    remotePhotoUrl: "",
    description: "滑らかな曲線の木製ボディとサウンドホール、ピンと張られた6本の弦を描いたモダンベクターアート。",
    provenance: {
      source: "BlockMosaic Vector Studio（Canvasプログラマティック描画）",
      author: "BlockMosaic Designer",
      license: "Original / CC0 Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 99,
    title: "STAGE 99",
    displayAnswer: "砂時計（すなどけい・アワーグラス）",
    readingHint: "細いガラスのくびれを黄金の砂が落ちて時間を測る道具",
    categoryLabel: 'ベクターアート・道具・時計',
    charCountHint: "ひらがな5文字 / 漢字3文字 / 英語可",
    initialKanaHint: "頭文字：「す」から始まる砂が落ちる時計",
    kanaPad: ["す","な","ど","け","い","砂","時","計","が","ら","す","時","間","ア","ワ","ー"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.0,
    acceptedAnswers: [
          "砂時計",
          "すなどけい",
          "スナドケイ",
          "アワーグラス",
          "あわーぐらす",
          "hourglass"
    ],
    acceptedKeywords: ["砂時計","すなどけい","hourglass"],
    photoUrl: "",
    remotePhotoUrl: "",
    description: "重厚な木製フレームと透明なガラス球の中をサラサラと流れ落ちる金色の砂時計。",
    provenance: {
      source: "BlockMosaic Vector Studio（Canvasプログラマティック描画）",
      author: "BlockMosaic Designer",
      license: "Original / CC0 Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  {
    id: 100,
    title: "STAGE 100",
    displayAnswer: "地球儀（ちきゅうぎ・グローブ）",
    readingHint: "地球の陸地や海を球体に縮小して回転軸をつけた置物",
    categoryLabel: 'ベクターアート・知育・インテリア',
    charCountHint: "ひらがな5文字 / 漢字3文字 / 英語可",
    initialKanaHint: "頭文字：「ち」から始まる回転する地球の模型",
    kanaPad: ["ち","き","ゅ","う","ぎ","地","球","儀","グ","ロ","ー","ブ","世","界","地","図"],
    coreTileIndices: [7,8,13,14,19,20],
    rivalTargetSec: 16.5,
    acceptedAnswers: [
          "地球儀",
          "ちきゅうぎ",
          "チキュウギ",
          "グローブ",
          "ぐろーぶ",
          "globe"
    ],
    acceptedKeywords: ["地球儀","ちきゅうぎ","globe"],
    photoUrl: "",
    remotePhotoUrl: "",
    description: "真鍮の半円アーチに支えられ青い大海原と大陸が広がる美しいアンティーク地球儀（記念すべき第100問）。",
    provenance: {
      source: "BlockMosaic Vector Studio（Canvasプログラマティック描画）",
      author: "BlockMosaic Designer",
      license: "Original / CC0 Public Domain",
      verificationDate: "2026-11-05",
    },
  },
  ...STAGES_101_TO_200,
];

// 実写写真のプリロードキャッシュ
const LOADED_STAGE_IMAGES = new Map<number, HTMLImageElement>();
const PHOTO_LISTENERS = new Set<(stageId: number) => void>();
let preloadInitiated = false;

export function preloadStagePhotos(onLoaded?: (stageId: number) => void): () => void {
  if (onLoaded) {
    PHOTO_LISTENERS.add(onLoaded);
  }

  if (!preloadInitiated && typeof window !== 'undefined') {
    preloadInitiated = true;
    for (const stage of PUZZLE_STAGES) {
      if (!stage.photoUrl) continue;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          LOADED_STAGE_IMAGES.set(stage.id, img);
          PHOTO_LISTENERS.forEach((cb) => cb(stage.id));
        }
      };
      img.onerror = () => {
        if (img.src !== stage.remotePhotoUrl) {
          img.src = stage.remotePhotoUrl;
        }
      };
      img.src = stage.photoUrl;
    }
  } else if (onLoaded) {
    LOADED_STAGE_IMAGES.forEach((_, stageId) => onLoaded(stageId));
  }

  return () => {
    if (onLoaded) {
      PHOTO_LISTENERS.delete(onLoaded);
    }
  };
}

/**
 * 入力文字列を正規化する（ひらがな・カタカナ・漢字・ローマ字・句読点・前置き/語尾の揺れを吸収）:
 * 1. 40文字上限に切り詰め & 制御文字・句読点・記号（！、？、。、「」等）の除去
 * 2. Unicode NFKC 正規化（全角英数・半角カナ等を統一）
 * 3. 前後および内部の空白除去
 * 4. カタカナ（ァ〜ヶ）をひらがなへ変換
 * 5. 英字を小文字へ統一
 * 6. 「答えは〜」「〜です」「〜だ」「〜かな」等の前置き・語尾を除去
 */
export function normalizeAnswerText(raw: string): string {
  const truncated = raw.slice(0, 40).replace(/[\u0000-\u001F\u007F]/g, '');
  const nfkc = truncated
    .normalize('NFKC')
    .trim()
    .replace(/[\s!！?？。、.,・:：;；/／「」『』()（）【】[\]〜~-]+/g, '');

  let result = '';
  for (let i = 0; i < nfkc.length; i++) {
    const code = nfkc.charCodeAt(i);
    if (code >= 0x30a1 && code <= 0x30f6) {
      result += String.fromCharCode(code - 0x60);
    } else {
      result += nfkc[i];
    }
  }

  let lowered = result.toLowerCase();
  // 前置き表現（「こたえは」「正解は」「これは」等）を吸収
  lowered = lowered.replace(/^(こたえは|答えは|せいかいは|正解は|これは|しゃしんは|写真は|たぶん|きっと)/, '');
  // 語尾の丁寧語・助詞（「かさです」「自転車だ」等）を自然に吸収
  lowered = lowered.replace(/(です|ます|だよ|だな|かな|かも|だとおもう|とおもう|のしゃしん|の写真|のえ|のがぞう|の画像|だ)$/, '');
  return lowered;
}

const NORMALIZED_ANSWERS_BY_STAGE: Map<number, Set<string>> = new Map(
  PUZZLE_STAGES.map((stage) => [
    stage.id,
    new Set(stage.acceptedAnswers.map((ans) => normalizeAnswerText(ans))),
  ])
);

export function judgeStageAnswer(
  stage: PuzzleStage,
  rawInput: string
): { isEmpty: boolean; isCorrect: boolean; normalizedInput: string } {
  const normalizedInput = normalizeAnswerText(rawInput);
  if (!normalizedInput) {
    return { isEmpty: true, isCorrect: false, normalizedInput: '' };
  }
  const normalizedSet = NORMALIZED_ANSWERS_BY_STAGE.get(stage.id);
  let isCorrect = normalizedSet
    ? normalizedSet.has(normalizedInput)
    : stage.acceptedAnswers.some((ans) => normalizeAnswerText(ans) === normalizedInput);

  // 「赤い傘」「カラフルなかさ」「白い自転車」「銀色のやかん」等の修飾語付き回答も許容（14文字以内の妥当な入力に限る）
  if (!isCorrect && normalizedInput.length <= 14) {
    for (const kw of stage.acceptedKeywords) {
      const normKw = normalizeAnswerText(kw);
      if (normKw && normalizedInput.endsWith(normKw)) {
        isCorrect = true;
        break;
      }
    }
  }

  return {
    isEmpty: false,
    isCorrect,
    normalizedInput,
  };
}

// Stage 1 の白背景実写傘写真を透過キャッシュするためのオフスクリーンCanvas
let cachedCutoutUmbrellaCanvas: HTMLCanvasElement | null = null;

function getCutoutUmbrellaCanvas(img: HTMLImageElement): HTMLCanvasElement {
  if (cachedCutoutUmbrellaCanvas) return cachedCutoutUmbrellaCanvas;
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const cCtx = c.getContext('2d');
  if (cCtx) {
    cCtx.drawImage(img, 0, 0);
    try {
      const imgData = cCtx.getImageData(0, 0, c.width, c.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // スタジオ白背景（#fafafa〜#ffffff）を滑らかに透過
        if (r > 240 && g > 240 && b > 240) {
          const whiteness = Math.min(r, g, b);
          const alpha = Math.max(0, Math.min(255, (252 - whiteness) * 20));
          data[i + 3] = alpha;
        }
      }
      cCtx.putImageData(imgData, 0, 0);
    } catch {
      // 万一getImageDataが制限された場合はそのまま使用
    }
  }
  cachedCutoutUmbrellaCanvas = c;
  return c;
}

/**
 * 指定された (0, 0, width, height) 領域に「1枚の実写写真」を、
 * どのゾーンのモザイクを削っても被写体が明確に判別できる最適フレーミングで描画する。
 */
export function renderStageArtworkToCanvas(
  ctx: CanvasRenderingContext2D,
  stageId: number,
  width: number,
  height: number
): void {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  if (stageId >= 101 && stageId <= 200) {
    renderStage101To200Artwork(ctx, stageId, width, height);
    ctx.restore();
    return;
  }

  const loadedImg = LOADED_STAGE_IMAGES.get(stageId);
  if (loadedImg && loadedImg.complete && loadedImg.naturalWidth > 0) {
    if (stageId === 1) {
      // STAGE 1（傘）：雨空と雨粒の背景の上に、実写の4色傘（ドーム＋中棒＋J字ハンドル）を大きく配置
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.55, '#1e293b');
      bgGrad.addColorStop(1, '#334155');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 雨粒のストリーク（外周ゾーンを削ったときの手掛かり）
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.35)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      for (let i = 0; i < 42; i++) {
        const rx = ((i * 97 + 23) % 100) * 0.01 * width;
        const ry = ((i * 61 + 11) % 100) * 0.01 * height;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - width * 0.018, ry + height * 0.085);
        ctx.stroke();
      }

      const umbrellaCanvas = getCutoutUmbrellaCanvas(loadedImg);
      const scale = Math.min((width * 0.56) / umbrellaCanvas.width, (height * 0.92) / umbrellaCanvas.height);
      const drawW = umbrellaCanvas.width * scale;
      const drawH = umbrellaCanvas.height * scale;
      const drawX = width * 0.46 - drawW * 0.5;
      const drawY = height * 0.5 - drawH * 0.5;

      // 実写の傘の中棒の先に木製J字ハンドルを描画して「傘」のシルエットを100%明確化
      const tipX = drawX + drawW * 0.945;
      const tipY = drawY + drawH * 0.945;
      ctx.save();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = Math.max(8, width * 0.022);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tipX - drawW * 0.06, tipY - drawH * 0.06);
      ctx.lineTo(tipX + drawW * 0.04, tipY + drawH * 0.03);
      ctx.arc(
        tipX + drawW * 0.01,
        tipY + drawH * 0.06,
        Math.max(12, width * 0.032),
        -Math.PI * 0.2,
        Math.PI * 0.85,
        false
      );
      ctx.stroke();
      ctx.restore();

      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(umbrellaCanvas, drawX, drawY, drawW, drawH);
      ctx.restore();
      return;
    }

    const imgW = loadedImg.naturalWidth;
    const imgH = loadedImg.naturalHeight;
    const targetRatio = width / height;
    const imgRatio = imgW / imgH;

    let sx = 0;
    let sy = 0;
    let sw = imgW;
    let sh = imgH;

    // 各ステージの写真の被写体位置（縦方向オフセット 0.0=上端, 1.0=下端）
    let focusY = 0.50;
    if (stageId === 2) {
      focusY = 0.78; // 自転車：下寄りの車体全体を捉える
    } else if (stageId === 4) {
      focusY = 0.35; // 織田信長：狩野宗秀画の凛々しい顔・髷・肩衣をフレーム中央に配置
    } else if (stageId === 5) {
      focusY = 0.32; // 真珠の耳飾りの少女：青いターバンと光る真珠の耳飾り・唇を美しく収める
    } else if (stageId === 7) {
      focusY = 0.45; // 富士山：山頂の雪化粧と青空を絶妙な構図で配置
    } else if (stageId === 8) {
      focusY = 0.15; // 自由の女神：高く掲げた黄金のたいまつと王冠・頭部・銘板を収める
    } else if (stageId === 9) {
      focusY = 0.25; // 坂本龍馬：懐手と凛々しい顔立ち
    } else if (stageId === 10) {
      focusY = 0.25; // 聖徳太子：唐本御影の冠・顔・笏
    } else if (stageId === 11) {
      focusY = 0.26; // 西郷隆盛：太い眉と軍服襟
    } else if (stageId === 12) {
      focusY = 0.38; // 豊臣秀吉：黒い冠と衣冠束帯
    } else if (stageId === 13) {
      focusY = 0.22; // モナ・リザ：神秘的な微笑みと目元
    } else if (stageId === 14) {
      focusY = 0.42; // ひまわり：花瓶と向日葵の花々
    } else if (stageId === 15) {
      focusY = 0.38; // 叫び：叫ぶ顔と夕焼けの空
    } else if (stageId === 16) {
      focusY = 0.45; // 神奈川沖浪裏：大波の飛沫と遠景の富士
    } else if (stageId === 17) {
      focusY = 0.42; // ピラミッド：砂漠とピラミッドの頂点
    } else if (stageId === 18) {
      focusY = 0.62; // エッフェル塔：象徴的な末広がりアーチ脚部と展望台をフレームイン
    } else if (stageId === 19) {
      focusY = 0.48; // コロッセオ：アーチ回廊の円形闘技場
    } else if (stageId === 20) {
      focusY = 0.45; // 金閣寺：金箔の舎利殿と鏡湖池
    } else if (stageId === 21) {
      focusY = 0.48; // パンダ：笹を食べる顔立ち
    } else if (stageId === 22) {
      focusY = 0.42; // ライオン：雄々しいタテガミと表情
    } else if (stageId === 23) {
      focusY = 0.40; // ペンギン：南極の雪を背景にした美しい皇帝ペンギンの顔立ち・首元
    } else if (stageId === 35) {
      focusY = 0.48; // 土星：美しい環（リング）を水平中央に
    } else if (stageId === 36) {
      focusY = 0.50; // 月：満月の円形全体
    } else if (stageId === 37) {
      focusY = 0.38; // オーロラ：夜空の緑の光芒
    } else if (stageId === 38) {
      focusY = 0.45; // ナイアガラ：巨大な滝の馬蹄と水煙
    } else if (stageId === 39) {
      focusY = 0.45; // 桜：満開のピンクの花びら
    } else if (stageId === 40) {
      focusY = 0.50; // 新幹線：白と青の流線型先頭車
    } else if (stageId === 41) {
      focusY = 0.48; // 飛行機：青空を飛ぶ旅客機の機体
    } else if (stageId === 42) {
      focusY = 0.48; // 蒸気機関車：黒いボイラーと力強い動輪
    } else if (stageId === 43) {
      focusY = 0.50; // 消防車：赤い車体と長いハシゴ
    } else if (stageId === 44) {
      focusY = 0.46; // いちご：真っ赤な完熟の実と緑のヘタ
    } else if (stageId === 45) {
      focusY = 0.48; // ピザ：とろけるチーズとバジル
    } else if (stageId === 46) {
      focusY = 0.48; // 寿司：まぐろの握り
    } else if (stageId === 47) {
      focusY = 0.42; // ケーキ：苺のショートケーキ
    } else if (stageId === 48) {
      focusY = 0.48; // ピアノ：黒漆の鍵盤と光沢
    } else if (stageId === 49) {
      focusY = 0.28; // 遮光器土偶：特徴的な大きな目と顔
    } else if (stageId === 50) {
      focusY = 0.25; // ツタンカーメン：黄金のマスクの顔と頭飾り
    } else if (stageId === 51) {
      focusY = 0.58; // 徳川家康：狩野探幽画の威厳ある顔立ち・髷・上半身
    } else if (stageId === 52) {
      focusY = 0.28; // アインシュタイン：白髪と知的な表情
    } else if (stageId === 53) {
      focusY = 0.28; // ベートーヴェン：情熱的な表情と赤いマフラー
    } else if (stageId === 54) {
      focusY = 0.28; // クレオパトラ：古代エジプト女王の胸像
    } else if (stageId === 55) {
      focusY = 0.35; // 紫式部：十二単と石山寺で筆を執る姿
    } else if (stageId === 56) {
      focusY = 0.32; // ナポレオン：アルプス越えの赤いマントと英姿
    } else if (stageId === 57) {
      focusY = 0.28; // ガリレオ：白髭と知的な目元
    } else if (stageId === 58) {
      focusY = 0.25; // リンカーン：特徴的な顎髭と顔立ち
    } else if (stageId === 59) {
      focusY = 0.48; // 最後の晩餐：横長壁画の中央イエスと弟子たち
    } else if (stageId === 60) {
      focusY = 0.45; // 星月夜：渦巻く夜空と三日月
    } else if (stageId === 61) {
      focusY = 0.45; // 落穂拾い：麦畑の3人の農婦
    } else if (stageId === 62) {
      focusY = 0.50; // 風神雷神図：宗達の金箔屏風の二神
    } else if (stageId === 63) {
      focusY = 0.25; // 考える人：ロダンの思索する彫像上半身
    } else if (stageId === 64) {
      focusY = 0.35; // ヴィーナスの誕生：海より現れた女神上半身
    } else if (stageId === 65) {
      focusY = 0.45; // タージマハル：白大理石ドームとシンメトリー
    } else if (stageId === 66) {
      focusY = 0.45; // 万里の長城：尾根に連なる巨大城壁
    } else if (stageId === 67) {
      focusY = 0.35; // サグラダファミリア：生誕のファサード尖塔
    } else if (stageId === 68) {
      focusY = 0.48; // オペラハウス：シドニー港の白い帆
    } else if (stageId === 69) {
      focusY = 0.45; // 厳島神社：海に浮かぶ朱色の大鳥居
    } else if (stageId === 70) {
      focusY = 0.48; // ストーンヘンジ：環状巨石群
    } else if (stageId === 71) {
      focusY = 0.45; // マチュピチュ：アンデスの空中都市遺跡
    } else if (stageId === 72) {
      focusY = 0.22; // キリン：長い首と網目模様の顔
    } else if (stageId === 73) {
      focusY = 0.45; // ゾウ：大きな耳と長い鼻
    } else if (stageId === 74) {
      focusY = 0.35; // コアラ：ユーカリの木につかまる姿
    } else if (stageId === 75) {
      focusY = 0.48; // イルカ：青い海をジャンプする流線型の体
    } else if (stageId === 76) {
      focusY = 0.40; // トラ：勇猛な縞模様の顔立ち
    } else if (stageId === 77) {
      focusY = 0.45; // カメレオン：鮮やかな体色と巻いた尾
    } else if (stageId === 78) {
      focusY = 0.35; // シマウマ：白黒のストライプ模様
    } else if (stageId === 79) {
      focusY = 0.50; // 地球：青い惑星の全体球体
    } else if (stageId === 80) {
      focusY = 0.50; // 木星：大赤斑と縞模様
    } else if (stageId === 81) {
      focusY = 0.50; // 火星：赤褐色の大地
    } else if (stageId === 82) {
      focusY = 0.50; // 太陽：コロナとプロミネンス
    } else if (stageId === 83) {
      focusY = 0.50; // パトカー：白黒ツートンと赤色灯
    } else if (stageId === 84) {
      focusY = 0.48; // ヘリコプター：回転翼と機体
    } else if (stageId === 85) {
      focusY = 0.50; // 潜水艦：海を行く黒い船体
    } else if (stageId === 86) {
      focusY = 0.48; // 客船：白亜のクルーズ客船
    } else if (stageId === 87) {
      focusY = 0.45; // ロケット：打ち上がるロケットと噴煙
    } else if (stageId === 88) {
      focusY = 0.50; // ハンバーガー：バンズとパティ・野菜
    } else if (stageId === 89) {
      focusY = 0.50; // ラーメン：スープと具材のどんぶり
    } else if (stageId === 90) {
      focusY = 0.50; // カレー：ご飯とカレールー
    } else if (stageId === 91) {
      focusY = 0.50; // りんご：真っ赤な完熟りんご
    } else if (stageId === 92) {
      focusY = 0.50; // バナナ：黄色い房のバナナ
    }

    if (imgRatio > targetRatio) {
      sw = imgH * targetRatio;
      sx = (imgW - sw) * 0.5;
    } else {
      sh = imgW / targetRatio;
      sy = (imgH - sh) * focusY;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(loadedImg, sx, sy, sw, sh, 0, 0, width, height);
    ctx.restore();
    return;
  }

  if (stageId === 1) {
    renderUmbrellaScene(ctx, width, height);
  } else if (stageId === 2) {
    renderBicycleScene(ctx, width, height);
  } else if (stageId === 3) {
    renderKettleScene(ctx, width, height);
  } else if (stageId === 4) {
    renderNobunagaScene(ctx, width, height);
  } else if (stageId === 5) {
    renderPearlGirlScene(ctx, width, height);
  } else if (stageId === 6) {
    renderPixelChestScene(ctx, width, height);
  } else if (stageId === 7) {
    renderMtFujiScene(ctx, width, height);
  } else if (stageId === 8) {
    renderStatueOfLibertyScene(ctx, width, height);
  } else if (stageId === 24) {
    renderPixelSwordScene(ctx, width, height);
  } else if (stageId === 25) {
    renderPixelPotionScene(ctx, width, height);
  } else if (stageId === 26) {
    renderPixelShipScene(ctx, width, height);
  } else if (stageId === 27) {
    renderPixelMushroomScene(ctx, width, height);
  } else if (stageId === 28) {
    renderPixelHeartScene(ctx, width, height);
  } else if (stageId === 29) {
    renderCoffeeScene(ctx, width, height);
  } else if (stageId === 30) {
    renderHotAirBalloonScene(ctx, width, height);
  } else if (stageId === 31) {
    renderLighthouseScene(ctx, width, height);
  } else if (stageId === 32) {
    renderWindmillScene(ctx, width, height);
  } else if (stageId === 33) {
    renderVinylRecordScene(ctx, width, height);
  } else if (stageId === 34) {
    renderCactusScene(ctx, width, height);
  } else if (stageId === 93) {
    renderPixelCrownScene(ctx, width, height);
  } else if (stageId === 94) {
    renderPixelShieldScene(ctx, width, height);
  } else if (stageId === 95) {
    renderPixelCoinScene(ctx, width, height);
  } else if (stageId === 96) {
    renderPixelGhostScene(ctx, width, height);
  } else if (stageId === 97) {
    renderPixelEggScene(ctx, width, height);
  } else if (stageId === 98) {
    renderGuitarScene(ctx, width, height);
  } else if (stageId === 99) {
    renderHourglassScene(ctx, width, height);
  } else if (stageId === 100) {
    renderGlobeScene(ctx, width, height);
  } else {
    renderUmbrellaScene(ctx, width, height);
  }

  ctx.restore();
}

/**
 * 第1問: 傘（画面いっぱいに広がる雨傘・雨筋・街灯ボケ・水たまりの波紋）
 */
function renderUmbrellaScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#1e293b');
  bgGrad.addColorStop(0.6, '#334155');
  bgGrad.addColorStop(0.76, '#475569');
  bgGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 街灯の玉ボケ
  const bokehList = [
    { x: w * 0.13, y: h * 0.14, r: w * 0.075, color: 'rgba(251, 191, 36, 0.30)' },
    { x: w * 0.86, y: h * 0.16, r: w * 0.085, color: 'rgba(56, 189, 248, 0.28)' },
    { x: w * 0.16, y: h * 0.54, r: w * 0.065, color: 'rgba(244, 114, 182, 0.24)' },
    { x: w * 0.85, y: h * 0.52, r: w * 0.07, color: 'rgba(250, 204, 21, 0.26)' },
  ];
  for (const b of bokehList) {
    const rad = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, b.r);
    rad.addColorStop(0, b.color);
    rad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 濡れた石畳の路面と水たまりの波紋（y: 300..480）
  const floorY = h * 0.64;
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, '#334155');
  floorGrad.addColorStop(0.45, '#1e293b');
  floorGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  const ripples = [
    { x: w * 0.18, y: h * 0.70, rx: w * 0.10, ry: h * 0.025 },
    { x: w * 0.80, y: h * 0.68, rx: w * 0.11, ry: h * 0.026 },
    { x: w * 0.50, y: h * 0.75, rx: w * 0.26, ry: h * 0.042 },
  ];
  ctx.strokeStyle = 'rgba(186, 230, 253, 0.45)';
  ctx.lineWidth = 2;
  for (const rp of ripples) {
    ctx.beginPath();
    ctx.ellipse(rp.x, rp.y, rp.rx, rp.ry, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(rp.x, rp.y, rp.rx * 0.55, rp.ry * 0.55, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 斜めに降り注ぐ雨筋
  ctx.save();
  ctx.strokeStyle = 'rgba(224, 242, 254, 0.48)';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  const rainSeeds = [
    [0.08, 0.06], [0.16, 0.18], [0.24, 0.08], [0.76, 0.07], [0.88, 0.15],
    [0.92, 0.28], [0.10, 0.40], [0.86, 0.42], [0.14, 0.60], [0.90, 0.58],
    [0.35, 0.05], [0.64, 0.06],
  ];
  for (const [rx, ry] of rainSeeds) {
    const sx = w * rx;
    const sy = h * ry;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - w * 0.026, sy + h * 0.08);
    ctx.stroke();
  }
  ctx.restore();

  // 傘本体（y: 35..370 に石突からJ字ハンドルまで大きく配置）
  const cx = w * 0.5;
  const topY = h * 0.09;
  const canopyBottomY = h * 0.48;
  const canopyRadiusX = w * 0.44;

  // 石突（先端）
  const ferruleGrad = ctx.createLinearGradient(cx - 10, topY - 28, cx + 10, topY);
  ferruleGrad.addColorStop(0, '#fef08a');
  ferruleGrad.addColorStop(0.5, '#eab308');
  ferruleGrad.addColorStop(1, '#713f12');
  ctx.fillStyle = ferruleGrad;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.016, topY + 4);
  ctx.lineTo(cx - w * 0.005, topY - h * 0.055);
  ctx.arc(cx, topY - h * 0.055, w * 0.005, Math.PI, 0);
  ctx.lineTo(cx + w * 0.016, topY + 4);
  ctx.closePath();
  ctx.fill();

  // 中棒（クロームシャフト）
  const shaftGrad = ctx.createLinearGradient(cx - 7, 0, cx + 7, 0);
  shaftGrad.addColorStop(0, '#475569');
  shaftGrad.addColorStop(0.4, '#f8fafc');
  shaftGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = shaftGrad;
  ctx.fillRect(cx - w * 0.01, canopyBottomY - h * 0.05, w * 0.02, h * 0.25);

  // 内側の暗い裏地と骨組み
  ctx.fillStyle = '#31102f';
  ctx.beginPath();
  ctx.ellipse(cx, canopyBottomY - h * 0.01, canopyRadiusX * 0.94, h * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(226, 232, 240, 0.48)';
  ctx.lineWidth = 1.8;
  for (const dir of [-0.65, -0.3, 0.3, 0.65]) {
    ctx.beginPath();
    ctx.moveTo(cx, canopyBottomY + h * 0.045);
    ctx.lineTo(cx + canopyRadiusX * dir, canopyBottomY - h * 0.01);
    ctx.stroke();
  }

  // 木製J字ハンドル（y: 300..375 にしっかり収まる）
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineWidth = w * 0.042;
  const woodGrad = ctx.createLinearGradient(cx - 25, h * 0.62, cx + 85, h * 0.76);
  woodGrad.addColorStop(0, '#92400e');
  woodGrad.addColorStop(0.45, '#d97706');
  woodGrad.addColorStop(0.8, '#78350f');
  woodGrad.addColorStop(1, '#451a03');
  ctx.strokeStyle = woodGrad;
  ctx.beginPath();
  ctx.moveTo(cx, h * 0.63);
  ctx.lineTo(cx, h * 0.70);
  ctx.arc(cx + w * 0.06, h * 0.70, w * 0.06, Math.PI, 0, true);
  ctx.stroke();

  ctx.lineWidth = w * 0.01;
  ctx.strokeStyle = 'rgba(254, 243, 199, 0.55)';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.008, h * 0.635);
  ctx.lineTo(cx - w * 0.008, h * 0.70);
  ctx.arc(cx + w * 0.06, h * 0.70, w * 0.068, Math.PI, Math.PI * 0.15, true);
  ctx.stroke();
  ctx.restore();

  // キャノピー（ワインレッド×ネイビー×ゴールド縁の6パネル）
  const panelStops = [-1, -0.66, -0.22, 0.22, 0.66, 1];
  const panelColors = [
    ['#991b1b', '#dc2626', '#7f1d1d'],
    ['#1e3a8a', '#2563eb', '#172554'],
    ['#dc2626', '#f87171', '#991b1b'],
    ['#1e3a8a', '#3b82f6', '#172554'],
    ['#7f1d1d', '#b91c1c', '#450a0a'],
  ];

  for (let i = 0; i < panelStops.length - 1; i++) {
    const xStart = cx + panelStops[i] * canopyRadiusX;
    const xEnd = cx + panelStops[i + 1] * canopyRadiusX;
    const xMid = (xStart + xEnd) / 2;

    const pGrad = ctx.createLinearGradient(xStart, topY, xEnd, canopyBottomY);
    pGrad.addColorStop(0, panelColors[i][0]);
    pGrad.addColorStop(0.48, panelColors[i][1]);
    pGrad.addColorStop(1, panelColors[i][2]);
    ctx.fillStyle = pGrad;

    ctx.beginPath();
    ctx.moveTo(cx, topY);
    ctx.quadraticCurveTo(
      cx + (xStart - cx) * 0.88,
      topY + (canopyBottomY - topY) * 0.34,
      xStart,
      canopyBottomY
    );
    ctx.quadraticCurveTo(xMid, canopyBottomY - h * 0.052, xEnd, canopyBottomY);
    ctx.quadraticCurveTo(
      cx + (xEnd - cx) * 0.88,
      topY + (canopyBottomY - topY) * 0.34,
      cx,
      topY
    );
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(253, 224, 71, 0.78)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(xStart, canopyBottomY - h * 0.008);
    ctx.quadraticCurveTo(xMid, canopyBottomY - h * 0.058, xEnd, canopyBottomY - h * 0.008);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, topY);
    ctx.quadraticCurveTo(
      cx + (xStart - cx) * 0.88,
      topY + (canopyBottomY - topY) * 0.34,
      xStart,
      canopyBottomY
    );
    ctx.stroke();

    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(xStart, canopyBottomY + h * 0.005, w * 0.008, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(cx + canopyRadiusX, canopyBottomY + h * 0.005, w * 0.008, 0, Math.PI * 2);
  ctx.fill();

  const drops = [
    { x: cx - w * 0.22, y: topY + h * 0.16, r: 5 },
    { x: cx - w * 0.08, y: topY + h * 0.22, r: 6 },
    { x: cx + w * 0.1, y: topY + h * 0.17, r: 5 },
    { x: cx + w * 0.25, y: topY + h * 0.24, r: 5.5 },
  ];
  for (const d of drops) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * 第2問: 自転車（並木道・白線サイクリングレーン・スポーク反射板付きのスポーツ自転車）
 */
function renderBicycleScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.58);
  skyGrad.addColorStop(0, '#bae6fd');
  skyGrad.addColorStop(0.65, '#e0f2fe');
  skyGrad.addColorStop(1, '#fef9c3');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h * 0.58);

  // 上部コーナーの並木シルエット
  const trees = [
    { x: w * 0.1, y: h * 0.14, r: w * 0.12, color: 'rgba(34, 197, 94, 0.30)' },
    { x: w * 0.23, y: h * 0.09, r: w * 0.095, color: 'rgba(16, 185, 129, 0.25)' },
    { x: w * 0.88, y: h * 0.12, r: w * 0.125, color: 'rgba(34, 197, 94, 0.30)' },
    { x: w * 0.75, y: h * 0.08, r: w * 0.085, color: 'rgba(5, 150, 105, 0.24)' },
  ];
  for (const tr of trees) {
    ctx.fillStyle = tr.color;
    ctx.beginPath();
    ctx.arc(tr.x, tr.y, tr.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // アスファルト路面（y: 270..480）
  const roadTopY = h * 0.56;
  const roadGrad = ctx.createLinearGradient(0, roadTopY, 0, h);
  roadGrad.addColorStop(0, '#475569');
  roadGrad.addColorStop(0.4, '#334155');
  roadGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = roadGrad;
  ctx.fillRect(0, roadTopY, w, h - roadTopY);

  // 白い破線レーン（y: 340付近＝モザイク最下段にもしっかり映る）
  ctx.fillStyle = 'rgba(248, 250, 252, 0.78)';
  for (let lx = w * 0.05; lx < w * 0.95; lx += w * 0.18) {
    ctx.fillRect(lx, h * 0.70, w * 0.1, h * 0.02);
  }

  const rearX = w * 0.24;
  const frontX = w * 0.76;
  const wheelY = h * 0.54; // 259px
  const wheelR = w * 0.185; // 111px -> タイヤ下端 370px（モザイク下端385pxの内側に完璧収まる）

  ctx.fillStyle = 'rgba(15, 23, 42, 0.38)';
  ctx.beginPath();
  ctx.ellipse(w * 0.5, wheelY + wheelR + 4, w * 0.43, h * 0.035, 0, 0, Math.PI * 2);
  ctx.fill();

  const drawWheel = (cx: number, cy: number, r: number) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.85)';
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * (r * 0.88), cy + Math.sin(angle) * (r * 0.88));
      ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(cx + r * 0.52, cy - r * 0.22, w * 0.017, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = w * 0.016;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.88, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = w * 0.035;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = w * 0.008;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.93, 0, Math.PI * 2);
    ctx.stroke();
  };

  drawWheel(rearX, wheelY, wheelR);
  drawWheel(frontX, wheelY, wheelR);

  const bbX = w * 0.46;
  const bbY = wheelY + h * 0.015;
  const seatClusterX = w * 0.36;
  const seatClusterY = h * 0.27;
  const headTopX = w * 0.66;
  const headTopY = h * 0.25;
  const headBotX = w * 0.68;
  const headBotY = h * 0.34;

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(rearX, wheelY - 10);
  ctx.lineTo(bbX, bbY - 24);
  ctx.moveTo(rearX, wheelY + 10);
  ctx.lineTo(bbX, bbY + 24);
  ctx.stroke();

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = w * 0.018;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(seatClusterX, seatClusterY);
  ctx.lineTo(seatClusterX - w * 0.025, h * 0.16);
  ctx.moveTo(headTopX, headTopY);
  ctx.lineTo(headTopX - w * 0.015, h * 0.14);
  ctx.lineTo(headTopX + w * 0.04, h * 0.14);
  ctx.stroke();

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const frameGrad = ctx.createLinearGradient(rearX, h * 0.2, frontX, wheelY);
  frameGrad.addColorStop(0, '#059669');
  frameGrad.addColorStop(0.5, '#34d399');
  frameGrad.addColorStop(1, '#047857');
  ctx.strokeStyle = frameGrad;
  ctx.lineWidth = w * 0.028;

  ctx.beginPath();
  ctx.moveTo(rearX, wheelY);
  ctx.lineTo(bbX, bbY);
  ctx.lineTo(seatClusterX, seatClusterY);
  ctx.lineTo(rearX, wheelY);
  ctx.moveTo(seatClusterX, seatClusterY);
  ctx.lineTo(headTopX, headTopY);
  ctx.lineTo(headBotX, headBotY);
  ctx.lineTo(bbX, bbY);
  ctx.moveTo(headBotX, headBotY);
  ctx.lineTo(frontX, wheelY);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(209, 250, 229, 0.75)';
  ctx.lineWidth = w * 0.007;
  ctx.beginPath();
  ctx.moveTo(seatClusterX + 6, seatClusterY - 2);
  ctx.lineTo(headTopX - 6, headTopY - 2);
  ctx.moveTo(headBotX - 6, headBotY);
  ctx.lineTo(bbX + 6, bbY - 5);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(bbX, bbY, w * 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = w * 0.014;
  ctx.beginPath();
  ctx.moveTo(bbX, bbY);
  ctx.lineTo(bbX + w * 0.035, bbY + h * 0.08);
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(bbX + w * 0.012, bbY + h * 0.075, w * 0.05, h * 0.022);

  // 革サドル
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.moveTo(seatClusterX - w * 0.09, h * 0.155);
  ctx.quadraticCurveTo(seatClusterX - w * 0.02, h * 0.125, seatClusterX + w * 0.06, h * 0.165);
  ctx.quadraticCurveTo(seatClusterX - w * 0.02, h * 0.195, seatClusterX - w * 0.09, h * 0.155);
  ctx.closePath();
  ctx.fill();

  // ハンドル
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = w * 0.024;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(headTopX + w * 0.01, h * 0.14);
  ctx.quadraticCurveTo(headTopX + w * 0.095, h * 0.13, headTopX + w * 0.09, h * 0.215);
  ctx.quadraticCurveTo(headTopX + w * 0.085, h * 0.265, headTopX + w * 0.035, h * 0.255);
  ctx.stroke();

  for (const hx of [rearX, frontX]) {
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(hx, wheelY, w * 0.019, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * 第3問: やかん（キッチンタイル・五徳と青いガス炎・白い湯気・銅真鍮ケトル）
 */
function renderKettleScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const wallGrad = ctx.createLinearGradient(0, 0, 0, h * 0.66);
  wallGrad.addColorStop(0, '#1e293b');
  wallGrad.addColorStop(1, '#334155');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, w, h);

  // キッチン壁のサブウェイタイル目地
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.24)';
  ctx.lineWidth = 1.5;
  const tileRowH = 44;
  const tileColW = 86;
  for (let row = 0; row < 8; row++) {
    const y = row * tileRowH;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
    const offset = (row % 2) * (tileColW / 2);
    for (let x = offset; x < w; x += tileColW) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + tileRowH);
      ctx.stroke();
    }
  }

  // コンロ天板（y: 315..480）
  const counterY = h * 0.66;
  const counterGrad = ctx.createLinearGradient(0, counterY, 0, h);
  counterGrad.addColorStop(0, '#475569');
  counterGrad.addColorStop(0.28, '#1e293b');
  counterGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = counterGrad;
  ctx.fillRect(0, counterY, w, h - counterY);

  const cx = w * 0.46;
  const bodyCy = h * 0.50; // 240px
  const bodyRx = w * 0.30; // 180px
  const bodyRy = h * 0.22; // 105px

  // コンロの青いガス炎（y: 335..365 付近＝モザイク最下段で鮮やかに見える）
  const flameY = bodyCy + bodyRy * 0.92;
  for (let i = -4; i <= 4; i++) {
    const fx = cx + i * (w * 0.044);
    const fGrad = ctx.createRadialGradient(fx, flameY, 2, fx, flameY, 24);
    fGrad.addColorStop(0, '#ffffff');
    fGrad.addColorStop(0.4, '#38bdf8');
    fGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = fGrad;
    ctx.beginPath();
    ctx.arc(fx, flameY, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  // 五徳
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - bodyRx * 0.95, flameY + 8);
  ctx.lineTo(cx + bodyRx * 0.95, flameY + 8);
  ctx.stroke();

  // 立ち上る白い湯気
  ctx.save();
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.80)';
  ctx.lineWidth = w * 0.034;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.35, h * 0.29);
  ctx.bezierCurveTo(cx + w * 0.43, h * 0.20, cx + w * 0.31, h * 0.12, cx + w * 0.41, h * 0.05);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(224, 242, 254, 0.55)';
  ctx.lineWidth = w * 0.024;
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.40, h * 0.32);
  ctx.bezierCurveTo(cx + w * 0.48, h * 0.24, cx + w * 0.39, h * 0.15, cx + w * 0.47, h * 0.07);
  ctx.stroke();
  ctx.restore();

  // アーチ型の持ち手
  ctx.save();
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = w * 0.026;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cx, bodyCy - h * 0.15, w * 0.22, Math.PI * 0.92, Math.PI * 0.08, false);
  ctx.stroke();

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = w * 0.048;
  ctx.beginPath();
  ctx.arc(cx, bodyCy - h * 0.15, w * 0.22, Math.PI * 1.2, Math.PI * 1.8, false);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(226, 232, 240, 0.52)';
  ctx.lineWidth = w * 0.01;
  ctx.beginPath();
  ctx.arc(cx, bodyCy - h * 0.15, w * 0.232, Math.PI * 1.24, Math.PI * 1.76, false);
  ctx.stroke();
  ctx.restore();

  // 注ぎ口
  const spoutGrad = ctx.createLinearGradient(cx + w * 0.16, h * 0.27, cx + w * 0.39, h * 0.48);
  spoutGrad.addColorStop(0, '#f59e0b');
  spoutGrad.addColorStop(0.45, '#fef3c7');
  spoutGrad.addColorStop(0.8, '#b45309');
  spoutGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = spoutGrad;
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.2, bodyCy - h * 0.04);
  ctx.quadraticCurveTo(cx + w * 0.32, bodyCy - h * 0.06, cx + w * 0.35, h * 0.30);
  ctx.lineTo(cx + w * 0.40, h * 0.33);
  ctx.quadraticCurveTo(cx + w * 0.35, bodyCy + h * 0.06, cx + w * 0.21, bodyCy + h * 0.09);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.ellipse(cx + w * 0.375, h * 0.315, w * 0.026, h * 0.015, Math.PI * 0.2, 0, Math.PI * 2);
  ctx.fill();

  // やかん本体
  const bodyGrad = ctx.createRadialGradient(
    cx - w * 0.1,
    bodyCy - h * 0.06,
    w * 0.03,
    cx,
    bodyCy,
    bodyRx * 1.15
  );
  bodyGrad.addColorStop(0, '#fef3c7');
  bodyGrad.addColorStop(0.28, '#f59e0b');
  bodyGrad.addColorStop(0.68, '#b45309');
  bodyGrad.addColorStop(1, '#451a03');

  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(cx, bodyCy, bodyRx, bodyRy, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(cx - bodyRx * 0.78, bodyCy + bodyRy * 0.72, bodyRx * 1.56, h * 0.038, 8);
  } else {
    ctx.rect(cx - bodyRx * 0.78, bodyCy + bodyRy * 0.72, bodyRx * 1.56, h * 0.038);
  }
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.58)';
  ctx.beginPath();
  ctx.ellipse(cx - w * 0.12, bodyCy - h * 0.04, w * 0.065, h * 0.08, -0.35, 0, Math.PI * 2);
  ctx.fill();

  // フタ
  const lidGrad = ctx.createLinearGradient(cx - w * 0.14, 0, cx + w * 0.14, 0);
  lidGrad.addColorStop(0, '#92400e');
  lidGrad.addColorStop(0.4, '#fde68a');
  lidGrad.addColorStop(0.8, '#b45309');
  lidGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = lidGrad;
  ctx.beginPath();
  ctx.ellipse(cx, bodyCy - bodyRy * 0.88, w * 0.14, h * 0.04, 0, 0, Math.PI * 2);
  ctx.fill();

  // つまみ
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx, bodyCy - bodyRy * 1.08, w * 0.042, h * 0.028, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.arc(cx - w * 0.012, bodyCy - bodyRy * 1.1, w * 0.009, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * 第4問: 織田信長（金屏風調和紙背景・茶筅髷・鋭い眼光・口髭・南蛮風肩衣羽織）
 */
function renderNobunagaScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 金屏風・古文書調の格調高い和紙グラデーション背景
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, '#d4af37');
  bgGrad.addColorStop(0.45, '#c59b27');
  bgGrad.addColorStop(1, '#8b6914');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 和紙の微細な雲母・繊維テクスチャ風アクセント
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  for (let i = 0; i < 30; i++) {
    const rx = ((i * 137) % 100) * 0.01 * w;
    const ry = ((i * 83) % 100) * 0.01 * h;
    const rw = (((i * 47) % 40) + 20) * 0.01 * w;
    ctx.fillRect(rx, ry, rw, 1.5);
  }

  // 左右上部に控えめに浮かぶ織田木瓜紋（家紋）
  const drawMokkoCrest = (cx: number, cy: number, r: number) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(120, 53, 15, 0.35)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    for (let a = 0; a < 5; a++) {
      const ang = (a * Math.PI * 2) / 5;
      const px = cx + Math.cos(ang) * (r * 0.65);
      const py = cy + Math.sin(ang) * (r * 0.65);
      ctx.beginPath();
      ctx.arc(px, py, r * 0.38, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  };
  drawMokkoCrest(w * 0.16, h * 0.22, w * 0.08);
  drawMokkoCrest(w * 0.84, h * 0.22, w * 0.08);

  const cx = w * 0.50;
  const cy = h * 0.52;

  // 1. 豪華な肩衣（肩が大きく左右に張り出した戦国武将の正装羽織）
  ctx.save();
  ctx.fillStyle = '#14532d'; // 深緑の織部調
  ctx.beginPath();
  ctx.moveTo(cx, cy - h * 0.08);
  ctx.lineTo(cx - w * 0.42, cy + h * 0.28);
  ctx.lineTo(cx - w * 0.36, h * 0.98);
  ctx.lineTo(cx + w * 0.36, h * 0.98);
  ctx.lineTo(cx + w * 0.42, cy + h * 0.28);
  ctx.closePath();
  ctx.fill();

  // 肩衣の左右の張り出し翼
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.18, cy + h * 0.02);
  ctx.lineTo(cx - w * 0.45, cy + h * 0.26);
  ctx.lineTo(cx - w * 0.25, cy + h * 0.42);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx + w * 0.18, cy + h * 0.02);
  ctx.lineTo(cx + w * 0.45, cy + h * 0.26);
  ctx.lineTo(cx + w * 0.25, cy + h * 0.42);
  ctx.closePath();
  ctx.fill();

  // 胸元の白と紫の着物合わせ（交差襟）
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.09, cy - h * 0.04);
  ctx.lineTo(cx, cy + h * 0.24);
  ctx.lineTo(cx + w * 0.09, cy - h * 0.04);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#581c87';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.07, cy - h * 0.02);
  ctx.lineTo(cx + w * 0.03, cy + h * 0.22);
  ctx.stroke();
  ctx.restore();

  // 2. 面長な顔と首
  ctx.save();
  ctx.fillStyle = '#fed7aa'; // 明るい肌色
  ctx.beginPath();
  ctx.ellipse(cx, cy - h * 0.10, w * 0.12, h * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // 顎ライン
  ctx.strokeStyle = '#9a3412';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy - h * 0.10, w * 0.12, Math.PI * 0.15, Math.PI * 0.85, false);
  ctx.stroke();

  // 3. 信長最大のアイデンティティ：茶筅髷（ちゃせんまげ・頭頂部に直立する髷）
  ctx.fillStyle = '#0f172a';
  // 月代（さかやき）と側頭部の黒髪
  ctx.beginPath();
  ctx.ellipse(cx, cy - h * 0.23, w * 0.125, h * 0.09, 0, Math.PI * 1.0, Math.PI * 2.0);
  ctx.fill();

  // 垂直に立ち上がる髷の束
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.032, cy - h * 0.26);
  ctx.lineTo(cx - w * 0.022, cy - h * 0.44);
  ctx.quadraticCurveTo(cx, cy - h * 0.48, cx + w * 0.022, cy - h * 0.44);
  ctx.lineTo(cx + w * 0.032, cy - h * 0.26);
  ctx.closePath();
  ctx.fill();

  // 髷を結ぶ鮮やかな朱色の元結（紐）
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx - w * 0.034, cy - h * 0.32, w * 0.068, h * 0.035);

  // 髷の先端の茶筅状の広がり
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx, cy - h * 0.44, w * 0.035, h * 0.025, 0, 0, Math.PI * 2);
  ctx.fill();

  // 4. 鋭い眼光、細い眉、鼻、口
  // 眉
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.08, cy - h * 0.15);
  ctx.quadraticCurveTo(cx - w * 0.04, cy - h * 0.17, cx - w * 0.015, cy - h * 0.145);
  ctx.moveTo(cx + w * 0.08, cy - h * 0.15);
  ctx.quadraticCurveTo(cx + w * 0.04, cy - h * 0.17, cx + w * 0.015, cy - h * 0.145);
  ctx.stroke();

  // 鋭い切れ長の目
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx - w * 0.045, cy - h * 0.125, w * 0.022, h * 0.012, -0.15, 0, Math.PI * 2);
  ctx.ellipse(cx + w * 0.045, cy - h * 0.125, w * 0.022, h * 0.012, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // 鼻筋
  ctx.strokeStyle = '#9a3412';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy - h * 0.13);
  ctx.lineTo(cx - w * 0.01, cy - h * 0.065);
  ctx.lineTo(cx + w * 0.015, cy - h * 0.065);
  ctx.stroke();

  // 5. 信長の象徴：ピンと跳ねた黒い八の字口髭 ＆ 顎の先の一筆髭
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  // 口髭
  ctx.moveTo(cx - w * 0.065, cy - h * 0.038);
  ctx.quadraticCurveTo(cx, cy - h * 0.052, cx + w * 0.065, cy - h * 0.038);
  ctx.quadraticCurveTo(cx, cy - h * 0.032, cx - w * 0.065, cy - h * 0.038);
  ctx.fill();

  // 唇
  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.025, cy - h * 0.025);
  ctx.lineTo(cx + w * 0.025, cy - h * 0.025);
  ctx.stroke();

  // 顎先のちょび髭
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx, cy + h * 0.01, w * 0.015, h * 0.015, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * 第5問: 真珠の耳飾りの少女（フェルメール・暗緑背景・ウルトラマリン青ターバン・輝く大きな真珠の雫）
 */
function renderPearlGirlScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // フェルメールの絵画特有の深淵な暗緑〜黒の背景
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#0a140d');
  bgGrad.addColorStop(1, '#15241b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.48;
  const cy = h * 0.48;

  // 1. 琥珀色・黄土色のジャケット（肩周り）
  ctx.save();
  ctx.fillStyle = '#a16207';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.35, h * 0.98);
  ctx.quadraticCurveTo(cx - w * 0.28, cy + h * 0.18, cx - w * 0.08, cy + h * 0.14);
  ctx.lineTo(cx + w * 0.12, cy + h * 0.16);
  ctx.quadraticCurveTo(cx + w * 0.36, cy + h * 0.22, cx + w * 0.42, h * 0.98);
  ctx.closePath();
  ctx.fill();

  // 純白のカラー（首元の白い立ち襟）
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.12, cy + h * 0.14);
  ctx.lineTo(cx - w * 0.02, cy + h * 0.18);
  ctx.lineTo(cx + w * 0.08, cy + h * 0.15);
  ctx.lineTo(cx + w * 0.02, cy + h * 0.12);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 2. 振り返る少女の柔らかい顔立ち
  ctx.save();
  ctx.fillStyle = '#fef3c7'; // 陶器のような明るい肌色
  ctx.beginPath();
  ctx.ellipse(cx, cy - h * 0.04, w * 0.15, h * 0.20, -0.15, 0, Math.PI * 2);
  ctx.fill();

  // 3. 名画最大の象徴：ウルトラマリンブルーのターバン
  // 頭頂部を包む青い布
  ctx.fillStyle = '#1d4ed8';
  ctx.beginPath();
  ctx.ellipse(cx - w * 0.02, cy - h * 0.24, w * 0.18, h * 0.15, -0.2, Math.PI * 0.8, Math.PI * 2.3);
  ctx.fill();

  // ターバン前頭部のハイライト
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.ellipse(cx + w * 0.02, cy - h * 0.25, w * 0.14, h * 0.08, -0.1, 0, Math.PI * 2);
  ctx.fill();

  // 後ろへ長く垂れ下がる黄金色・レモンイエローの布
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.14, cy - h * 0.18);
  ctx.quadraticCurveTo(cx - w * 0.26, cy - h * 0.05, cx - w * 0.22, cy + h * 0.32);
  ctx.lineTo(cx - w * 0.14, cy + h * 0.28);
  ctx.quadraticCurveTo(cx - w * 0.16, cy + h * 0.05, cx - w * 0.08, cy - h * 0.12);
  ctx.closePath();
  ctx.fill();

  // 4. 表情（こちらを見つめる澄んだ瞳とわずかに開いた唇）
  // 左目
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.ellipse(cx + w * 0.03, cy - h * 0.08, w * 0.028, h * 0.018, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx + w * 0.038, cy - h * 0.085, 3, 0, Math.PI * 2);
  ctx.fill();

  // 唇（少し開いた艶やかなピンク）
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.ellipse(cx + w * 0.02, cy + h * 0.05, w * 0.032, h * 0.016, 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx + w * 0.025, cy + h * 0.048, 3, 2);

  // 5. 作品名そのもの：光を反射して輝く「大粒の真珠の耳飾り」
  const pearlX = cx - w * 0.065;
  const pearlY = cy + h * 0.06;
  const pearlR = w * 0.035;

  // 耳元への影
  ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.beginPath();
  ctx.arc(pearlX + 3, pearlY + 3, pearlR, 0, Math.PI * 2);
  ctx.fill();

  // 真珠の球体（雫型）グラデーション
  const pearlGrad = ctx.createRadialGradient(
    pearlX - pearlR * 0.3,
    pearlY - pearlR * 0.3,
    1,
    pearlX,
    pearlY,
    pearlR
  );
  pearlGrad.addColorStop(0, '#ffffff');
  pearlGrad.addColorStop(0.35, '#f8fafc');
  pearlGrad.addColorStop(0.75, '#cbd5e1');
  pearlGrad.addColorStop(1, '#64748b');

  ctx.fillStyle = pearlGrad;
  ctx.beginPath();
  ctx.ellipse(pearlX, pearlY, pearlR, pearlR * 1.25, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // 白いハイライト反射光
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(pearlX - pearlR * 0.35, pearlY - pearlR * 0.4, pearlR * 0.32, 0, Math.PI * 2);
  ctx.fill();

  // 白襟からの照り返し反射光（底部の淡い輝き）
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.beginPath();
  ctx.arc(pearlX + pearlR * 0.2, pearlY + pearlR * 0.6, pearlR * 0.22, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * 第6問: 宝箱（レトロ・ピクセルアート／スーファミ風ドット絵・金金具・溢れる光）
 */
function renderPixelChestScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // レトロゲームの石畳ダンジョン風タイル背景
  ctx.fillStyle = '#181824';
  ctx.fillRect(0, 0, w, h);

  // 石壁タイル目地
  ctx.strokeStyle = '#232338';
  ctx.lineWidth = 2;
  const tileSize = 40;
  for (let x = 0; x < w; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // 16x16ピクセルのクラシック宝箱マトリクス
  // 0: 透明, 1: 木暗, 2: 木明, 3: 金暗, 4: 金明, 5: 鍵穴黒, 6: 光白
  const P = [
    [0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [0, 0, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 0, 0],
    [0, 3, 4, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 4, 3, 0],
    [3, 4, 2, 2, 2, 2, 4, 3, 3, 4, 2, 2, 2, 2, 4, 3],
    [3, 4, 1, 1, 1, 1, 4, 3, 3, 4, 1, 1, 1, 1, 4, 3],
    [3, 4, 4, 4, 4, 4, 4, 3, 3, 4, 4, 4, 4, 4, 4, 3],
    [3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3],
    [5, 5, 5, 5, 5, 5, 5, 4, 4, 5, 5, 5, 5, 5, 5, 5], // 隙間の影
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3],
    [3, 4, 2, 2, 2, 2, 4, 5, 5, 4, 2, 2, 2, 2, 4, 3],
    [3, 4, 2, 2, 2, 2, 4, 5, 5, 4, 2, 2, 2, 2, 4, 3],
    [3, 4, 1, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 4, 3],
    [3, 4, 1, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 4, 3],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0],
  ];

  const colorMap: Record<number, string> = {
    1: '#78350f', // 木（暗）
    2: '#b45309', // 木（明）
    3: '#d97706', // 金金具（暗・輪郭）
    4: '#fde047', // 金金具（明るいゴールド）
    5: '#0f172a', // 鍵穴・隙間
    6: '#ffffff', // 光
  };

  const pxSize = Math.floor(Math.min(w * 0.048, h * 0.052));
  const gridW = 16 * pxSize;
  const gridH = 16 * pxSize;
  const startX = Math.floor((w - gridW) / 2);
  const startY = Math.floor((h - gridH) / 2);

  // 宝箱から漏れ出す魔法の光背
  const glowGrad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, gridW * 0.7);
  glowGrad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
  glowGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, gridW * 0.7, 0, Math.PI * 2);
  ctx.fill();

  // ドット絵描画（アンチエイリアスなしのクッキリ四角形）
  for (let r = 0; r < 16; r++) {
    for (let c = 0; c < 16; c++) {
      const val = P[r][c];
      if (val === 0) continue;
      ctx.fillStyle = colorMap[val] || '#ffffff';
      ctx.fillRect(startX + c * pxSize, startY + r * pxSize, pxSize, pxSize);
    }
  }

  // 周囲に飛び散るピクセルの金貨やキラキラ
  const sparkles = [
    { x: w * 0.18, y: h * 0.35, s: pxSize * 0.9 },
    { x: w * 0.82, y: h * 0.38, s: pxSize * 1.1 },
    { x: w * 0.24, y: h * 0.72, s: pxSize * 0.8 },
    { x: w * 0.76, y: h * 0.68, s: pxSize * 1.0 },
  ];
  ctx.fillStyle = '#fef08a';
  for (const sp of sparkles) {
    ctx.fillRect(sp.x, sp.y - sp.s, sp.s, sp.s * 3);
    ctx.fillRect(sp.x - sp.s, sp.y, sp.s * 3, sp.s);
  }
}

/**
 * 第7問: 富士山（左右対称の雄大な円錐・朝焼けの光輪・純白の冠雪・たなびく白雲）
 */
function renderMtFujiScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 朝焼けから快晴へ抜けるグラデーション空
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.42, '#38bdf8');
  skyGrad.addColorStop(0.72, '#bae6fd');
  skyGrad.addColorStop(1, '#ffedd5');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.50;
  const peakY = h * 0.16;
  const baseY = h * 0.85;

  // 朝日（霊峰富士の背後に昇る温かい太陽）
  const sunGrad = ctx.createRadialGradient(cx + w * 0.22, peakY + h * 0.05, 10, cx + w * 0.22, peakY + h * 0.05, w * 0.26);
  sunGrad.addColorStop(0, 'rgba(244, 63, 94, 0.85)');
  sunGrad.addColorStop(0.45, 'rgba(251, 113, 133, 0.5)');
  sunGrad.addColorStop(1, 'rgba(244, 63, 94, 0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(cx + w * 0.22, peakY + h * 0.05, w * 0.26, 0, Math.PI * 2);
  ctx.fill();

  // 1. 富士山の山体（深い藍色〜群青色）
  const mountainGrad = ctx.createLinearGradient(0, peakY, 0, baseY);
  mountainGrad.addColorStop(0, '#1e3a8a');
  mountainGrad.addColorStop(0.48, '#1e40af');
  mountainGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = mountainGrad;

  ctx.beginPath();
  ctx.moveTo(cx - w * 0.08, peakY);
  ctx.lineTo(cx + w * 0.08, peakY);
  // 美しい末広がりの稜線曲線
  ctx.quadraticCurveTo(cx + w * 0.22, peakY + h * 0.28, cx + w * 0.46, baseY);
  ctx.lineTo(cx - w * 0.46, baseY);
  ctx.quadraticCurveTo(cx - w * 0.22, peakY + h * 0.28, cx - w * 0.08, peakY);
  ctx.closePath();
  ctx.fill();

  // 2. 山頂の純白の冠雪（ギザギザと下に垂れる美しい雪渓）
  const snowGrad = ctx.createLinearGradient(0, peakY, 0, peakY + h * 0.32);
  snowGrad.addColorStop(0, '#ffffff');
  snowGrad.addColorStop(0.85, '#f0f9ff');
  snowGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = snowGrad;

  ctx.beginPath();
  ctx.moveTo(cx - w * 0.08, peakY);
  ctx.lineTo(cx + w * 0.08, peakY);
  ctx.quadraticCurveTo(cx + w * 0.13, peakY + h * 0.12, cx + w * 0.16, peakY + h * 0.22);
  // 雪渓のギザギザ下端
  ctx.lineTo(cx + w * 0.13, peakY + h * 0.18);
  ctx.lineTo(cx + w * 0.09, peakY + h * 0.29);
  ctx.lineTo(cx + w * 0.05, peakY + h * 0.21);
  ctx.lineTo(cx, peakY + h * 0.32);
  ctx.lineTo(cx - w * 0.05, peakY + h * 0.21);
  ctx.lineTo(cx - w * 0.09, peakY + h * 0.29);
  ctx.lineTo(cx - w * 0.13, peakY + h * 0.18);
  ctx.lineTo(cx - w * 0.16, peakY + h * 0.22);
  ctx.quadraticCurveTo(cx - w * 0.13, peakY + h * 0.12, cx - w * 0.08, peakY);
  ctx.closePath();
  ctx.fill();

  // 山頂の火口のくぼみ
  ctx.strokeStyle = 'rgba(30, 58, 138, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.06, peakY + 2);
  ctx.quadraticCurveTo(cx, peakY + 8, cx + w * 0.06, peakY + 2);
  ctx.stroke();

  // 3. 山腹と裾野にたなびく二層の白い雲海（かすみ雲）
  const drawCloudLayer = (y: number, scaleX: number) => {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    ctx.beginPath();
    ctx.ellipse(cx - w * 0.22 * scaleX, y, w * 0.18, h * 0.038, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + w * 0.15 * scaleX, y - h * 0.01, w * 0.22, h * 0.042, 0, 0, Math.PI * 2);
    ctx.ellipse(cx, y + h * 0.015, w * 0.28, h * 0.045, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  drawCloudLayer(baseY - h * 0.22, 1.0);
  drawCloudLayer(baseY - h * 0.06, 1.35);

  // 裾野の緑の樹海
  ctx.fillStyle = '#064e3b';
  ctx.fillRect(0, baseY, w, h - baseY);
}

/**
 * 第8問: 自由の女神（リバティ島の空・右手の黄金のたいまつ・7つの突起冠・青緑の銅像）
 */
function renderStatueOfLibertyScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // ニューヨーク港の晴れ渡る青空
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.5, '#38bdf8');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.48;
  const headY = h * 0.42;

  // 1. 右腕と高く掲げた黄金のたいまつ
  const armX = cx + w * 0.16;
  const torchY = h * 0.14;

  // たいまつの炎の輝き（金・オレンジ・白）
  const flameGrad = ctx.createRadialGradient(armX, torchY, 4, armX, torchY, w * 0.12);
  flameGrad.addColorStop(0, '#ffffff');
  flameGrad.addColorStop(0.35, '#facc15');
  flameGrad.addColorStop(0.7, '#f97316');
  flameGrad.addColorStop(1, 'rgba(249, 115, 22, 0)');
  ctx.fillStyle = flameGrad;
  ctx.beginPath();
  ctx.arc(armX, torchY, w * 0.12, 0, Math.PI * 2);
  ctx.fill();

  // たいまつの柄と受皿
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.moveTo(armX - 10, torchY + 12);
  ctx.lineTo(armX + 10, torchY + 12);
  ctx.lineTo(armX + 4, torchY + 36);
  ctx.lineTo(armX - 4, torchY + 36);
  ctx.closePath();
  ctx.fill();

  // 高く掲げた右腕
  ctx.fillStyle = '#5eead4';
  ctx.beginPath();
  ctx.moveTo(armX - 6, torchY + 36);
  ctx.lineTo(armX + 6, torchY + 36);
  ctx.lineTo(cx + w * 0.10, headY + h * 0.15);
  ctx.lineTo(cx + w * 0.05, headY + h * 0.18);
  ctx.closePath();
  ctx.fill();

  // 2. 自由の女神の胴体・ローブ（緑青/パティナ色）
  const robeGrad = ctx.createLinearGradient(cx - w * 0.2, headY, cx + w * 0.2, h);
  robeGrad.addColorStop(0, '#2dd4bf');
  robeGrad.addColorStop(0.5, '#14b8a6');
  robeGrad.addColorStop(1, '#0f766e');
  ctx.fillStyle = robeGrad;

  ctx.beginPath();
  ctx.moveTo(cx - w * 0.08, headY + h * 0.12);
  ctx.lineTo(cx + w * 0.08, headY + h * 0.12);
  ctx.lineTo(cx + w * 0.25, h);
  ctx.lineTo(cx - w * 0.22, h);
  ctx.closePath();
  ctx.fill();

  // 左腕に抱える銘板（独立宣言書）
  ctx.fillStyle = '#0d9488';
  ctx.fillRect(cx - w * 0.14, headY + h * 0.22, w * 0.09, h * 0.25);

  // 3. 女神の頭部と顔
  ctx.fillStyle = '#5eead4';
  ctx.beginPath();
  ctx.ellipse(cx, headY, w * 0.065, h * 0.11, 0, 0, Math.PI * 2);
  ctx.fill();

  // 4. 象徴的な7つの光条（突起冠）
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';
  const rays = [-75, -50, -25, 0, 25, 50, 75];
  for (const deg of rays) {
    const rad = ((deg - 90) * Math.PI) / 180;
    const r1 = w * 0.07;
    const r2 = w * 0.12;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(rad) * r1, headY - h * 0.04 + Math.sin(rad) * r1);
    ctx.lineTo(cx + Math.cos(rad) * r2, headY - h * 0.04 + Math.sin(rad) * r2);
    ctx.stroke();
  }
}

/**
 * STAGE 24: 勇者の剣（16bit風の輝く銀の刀身と金・青の柄、伝説の聖剣ドット絵）
 */
function renderPixelSwordScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // ダンジョン奥深くの神聖な台座と青い光のグラデーション
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(0.5, '#0f172a');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.48;
  const px = Math.max(5, Math.floor(w / 80));

  // 背後の光輪（神聖なオーラ）
  const auraGrad = ctx.createRadialGradient(cx, cy, px * 2, cx, cy, px * 22);
  auraGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  auraGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
  auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = auraGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, px * 22, 0, Math.PI * 2);
  ctx.fill();

  // 聖剣のドット絵（斜め45度）
  const swordPixels = [
    // 刀身の先端
    [0, -10, '#ffffff'], [1, -9, '#e0f2fe'], [-1, -9, '#bae6fd'],
    [0, -8, '#ffffff'], [1, -7, '#e0f2fe'], [-1, -7, '#bae6fd'],
    [0, -6, '#ffffff'], [1, -5, '#e0f2fe'], [-1, -5, '#bae6fd'],
    [0, -4, '#ffffff'], [1, -3, '#e0f2fe'], [-1, -3, '#bae6fd'],
    [0, -2, '#ffffff'], [1, -1, '#e0f2fe'], [-1, -1, '#bae6fd'],
    [0, 0, '#ffffff'], [1, 1, '#e0f2fe'], [-1, 1, '#bae6fd'],
    // 鍔（ゴールド＆ウィング）
    [-4, 3, '#fbbf24'], [-3, 3, '#f59e0b'], [-2, 3, '#f59e0b'], [-1, 3, '#d97706'],
    [0, 3, '#ef4444'], // 中央の赤い宝玉ルビー
    [1, 3, '#d97706'], [2, 3, '#f59e0b'], [3, 3, '#f59e0b'], [4, 3, '#fbbf24'],
    [-3, 2, '#fbbf24'], [3, 2, '#fbbf24'],
    // 柄（ロイヤルブルー）
    [0, 4, '#1d4ed8'], [0, 5, '#2563eb'], [0, 6, '#1d4ed8'], [0, 7, '#1e40af'],
    // 柄頭（ポンメル・金）
    [-1, 8, '#f59e0b'], [0, 8, '#fbbf24'], [1, 8, '#f59e0b'],
    [0, 9, '#d97706'],
  ];

  for (const [dx, dy, color] of swordPixels) {
    ctx.fillStyle = color as string;
    ctx.fillRect(cx + (dx as number) * px * 1.5, cy + (dy as number) * px * 1.5, px * 1.5, px * 1.5);
  }

  // キラキラ光るパーティクル
  const sparkles = [
    { x: cx - px * 10, y: cy - px * 8, s: px },
    { x: cx + px * 12, y: cy - px * 5, s: px * 1.2 },
    { x: cx - px * 7, y: cy + px * 6, s: px * 0.8 },
    { x: cx + px * 8, y: cy + px * 9, s: px },
  ];
  ctx.fillStyle = '#fef08a';
  for (const sp of sparkles) {
    ctx.fillRect(sp.x, sp.y - sp.s, sp.s, sp.s * 3);
    ctx.fillRect(sp.x - sp.s, sp.y, sp.s * 3, sp.s);
  }
}

/**
 * STAGE 25: ポーション（赤い回復薬・レトロドット絵）
 */
function renderPixelPotionScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;
  const px = Math.max(6, Math.floor(w / 70));

  // 瓶の光
  const glow = ctx.createRadialGradient(cx, cy, px * 2, cx, cy, px * 16);
  glow.addColorStop(0, 'rgba(239, 68, 68, 0.35)');
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, px * 16, 0, Math.PI * 2);
  ctx.fill();

  const potionPixels = [
    // コルク栓
    [-1, -6, '#b45309'], [0, -6, '#d97706'], [1, -6, '#92400e'],
    [-1, -5, '#b45309'], [0, -5, '#d97706'], [1, -5, '#92400e'],
    // ガラスの首
    [-1, -4, '#94a3b8'], [0, -4, '#f8fafc'], [1, -4, '#64748b'],
    [-1, -3, '#94a3b8'], [0, -3, '#f8fafc'], [1, -3, '#64748b'],
    // フラスコ肩部
    [-3, -2, '#94a3b8'], [-2, -2, '#f8fafc'], [-1, -2, '#ef4444'], [0, -2, '#dc2626'], [1, -2, '#dc2626'], [2, -2, '#f8fafc'], [3, -2, '#64748b'],
    // 胴体・赤い液体
    [-4, -1, '#94a3b8'], [-3, -1, '#ef4444'], [-2, -1, '#f87171'], [-1, -1, '#ef4444'], [0, -1, '#dc2626'], [1, -1, '#b91c1c'], [2, -1, '#ef4444'], [3, -1, '#b91c1c'], [4, -1, '#64748b'],
    [-5, 0, '#94a3b8'], [-4, 0, '#ef4444'], [-3, 0, '#ffffff'], [-2, 0, '#f87171'], [-1, 0, '#ef4444'], [0, 0, '#dc2626'], [1, 0, '#b91c1c'], [2, 0, '#b91c1c'], [3, 0, '#991b1b'], [4, 0, '#ef4444'], [5, 0, '#64748b'],
    [-5, 1, '#94a3b8'], [-4, 1, '#ef4444'], [-3, 1, '#f87171'], [-2, 1, '#ef4444'], [-1, 1, '#ef4444'], [0, 1, '#dc2626'], [1, 1, '#b91c1c'], [2, 1, '#b91c1c'], [3, 1, '#991b1b'], [4, 1, '#ef4444'], [5, 1, '#64748b'],
    [-5, 2, '#94a3b8'], [-4, 2, '#ef4444'], [-3, 2, '#ef4444'], [-2, 2, '#ef4444'], [-1, 2, '#dc2626'], [0, 2, '#dc2626'], [1, 2, '#b91c1c'], [2, 2, '#b91c1c'], [3, 2, '#991b1b'], [4, 2, '#ef4444'], [5, 2, '#64748b'],
    [-4, 3, '#94a3b8'], [-3, 3, '#ef4444'], [-2, 3, '#dc2626'], [-1, 3, '#dc2626'], [0, 3, '#b91c1c'], [1, 3, '#b91c1c'], [2, 3, '#991b1b'], [3, 3, '#7f1d1d'], [4, 3, '#64748b'],
    [-3, 4, '#64748b'], [-2, 4, '#94a3b8'], [-1, 4, '#94a3b8'], [0, 4, '#94a3b8'], [1, 4, '#64748b'], [2, 4, '#64748b'], [3, 4, '#475569'],
  ];

  for (const [dx, dy, color] of potionPixels) {
    ctx.fillStyle = color as string;
    ctx.fillRect(cx + (dx as number) * px, cy + (dy as number) * px, px, px);
  }
}

/**
 * STAGE 26: 宇宙船（8bitスペースシップ・ドット絵）
 */
function renderPixelShipScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, w, h);

  // 星々
  for (let i = 0; i < 40; i++) {
    const sx = ((i * 127 + 19) % 100) * 0.01 * w;
    const sy = ((i * 79 + 31) % 100) * 0.01 * h;
    ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#ffffff';
    ctx.fillRect(sx, sy, 2, 2);
  }

  const cx = w * 0.5;
  const cy = h * 0.46;
  const px = Math.max(5, Math.floor(w / 75));

  const shipPixels = [
    // 機首
    [0, -5, '#ffffff'],
    [-1, -4, '#e2e8f0'], [0, -4, '#ffffff'], [1, -4, '#cbd5e1'],
    [-1, -3, '#e2e8f0'], [0, -3, '#38bdf8'], [1, -3, '#cbd5e1'], // キャノピー
    [-1, -2, '#e2e8f0'], [0, -2, '#0284c7'], [1, -2, '#cbd5e1'],
    // 胴体＆主翼展開
    [-3, -1, '#ef4444'], [-2, -1, '#e2e8f0'], [-1, -1, '#ffffff'], [0, -1, '#e2e8f0'], [1, -1, '#ffffff'], [2, -1, '#cbd5e1'], [3, -1, '#ef4444'],
    [-4, 0, '#ef4444'], [-3, 0, '#e2e8f0'], [-2, 0, '#e2e8f0'], [-1, 0, '#ffffff'], [0, 0, '#e2e8f0'], [1, 0, '#ffffff'], [2, 0, '#cbd5e1'], [3, 0, '#cbd5e1'], [4, 0, '#ef4444'],
    [-5, 1, '#ef4444'], [-4, 1, '#e2e8f0'], [-3, 1, '#e2e8f0'], [-2, 1, '#64748b'], [-1, 1, '#3b82f6'], [0, 1, '#60a5fa'], [1, 1, '#3b82f6'], [2, 1, '#64748b'], [3, 1, '#cbd5e1'], [4, 1, '#cbd5e1'], [5, 1, '#ef4444'],
    [-4, 2, '#475569'], [-3, 2, '#475569'], [-1, 2, '#1d4ed8'], [0, 2, '#2563eb'], [1, 2, '#1d4ed8'], [3, 2, '#334155'], [4, 2, '#334155'],
    // エンジン噴射プラズマ
    [-1, 3, '#38bdf8'], [0, 3, '#67e8f9'], [1, 3, '#38bdf8'],
    [-1, 4, '#0284c7'], [0, 4, '#38bdf8'], [1, 4, '#0284c7'],
    [0, 5, '#0284c7'],
  ];

  for (const [dx, dy, color] of shipPixels) {
    ctx.fillStyle = color as string;
    ctx.fillRect(cx + (dx as number) * px, cy + (dy as number) * px, px, px);
  }
}

/**
 * STAGE 27: キノコ（スーパーマッシュルーム・ドット絵）
 */
function renderPixelMushroomScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;
  const px = Math.max(7, Math.floor(w / 65));

  const mushroomPixels = [
    // 傘の天辺
    [-3, -4, '#ef4444'], [-2, -4, '#ef4444'], [-1, -4, '#ffffff'], [0, -4, '#ffffff'], [1, -4, '#ef4444'], [2, -4, '#ef4444'],
    [-5, -3, '#ef4444'], [-4, -3, '#ffffff'], [-3, -3, '#ffffff'], [-2, -3, '#ef4444'], [-1, -3, '#ffffff'], [0, -3, '#ffffff'], [1, -3, '#ef4444'], [2, -3, '#ffffff'], [3, -3, '#ffffff'], [4, -3, '#ef4444'],
    [-6, -2, '#ef4444'], [-5, -2, '#ffffff'], [-4, -2, '#ffffff'], [-3, -2, '#ef4444'], [-2, -2, '#ef4444'], [-1, -2, '#ef4444'], [0, -2, '#ef4444'], [1, -2, '#ef4444'], [2, -2, '#ef4444'], [3, -2, '#ffffff'], [4, -2, '#ffffff'], [5, -2, '#ef4444'],
    [-6, -1, '#ef4444'], [-5, -1, '#ef4444'], [-4, -1, '#ef4444'], [-3, -1, '#ef4444'], [-2, -1, '#ef4444'], [-1, -1, '#ef4444'], [0, -1, '#ef4444'], [1, -1, '#ef4444'], [2, -1, '#ef4444'], [3, -1, '#ef4444'], [4, -1, '#ef4444'], [5, -1, '#ef4444'],
    [-5, 0, '#dc2626'], [-4, 0, '#dc2626'], [-3, 0, '#dc2626'], [-2, 0, '#dc2626'], [-1, 0, '#dc2626'], [0, 0, '#dc2626'], [1, 0, '#dc2626'], [2, 0, '#dc2626'], [3, 0, '#dc2626'], [4, 0, '#dc2626'],
    // 軸と目
    [-3, 1, '#fef3c7'], [-2, 1, '#1e293b'], [-1, 1, '#fef3c7'], [0, 1, '#fef3c7'], [1, 1, '#1e293b'], [2, 1, '#fef3c7'],
    [-3, 2, '#fef3c7'], [-2, 2, '#1e293b'], [-1, 2, '#fef3c7'], [0, 2, '#fef3c7'], [1, 2, '#1e293b'], [2, 2, '#fef3c7'],
    [-3, 3, '#fde68a'], [-2, 3, '#fde68a'], [-1, 3, '#fde68a'], [0, 3, '#fde68a'], [1, 3, '#fde68a'], [2, 3, '#fde68a'],
  ];

  for (const [dx, dy, color] of mushroomPixels) {
    ctx.fillStyle = color as string;
    ctx.fillRect(cx + (dx as number) * px, cy + (dy as number) * px, px, px);
  }
}

/**
 * STAGE 28: ハートの器（8bit赤いハート・ドット絵）
 */
function renderPixelHeartScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.48;
  const px = Math.max(7, Math.floor(w / 65));

  const heartPixels = [
    // 2つの山
    [-3, -3, '#ef4444'], [-2, -3, '#ef4444'], [2, -3, '#ef4444'], [3, -3, '#ef4444'],
    [-4, -2, '#ef4444'], [-3, -2, '#ffffff'], [-2, -2, '#f87171'], [-1, -2, '#ef4444'], [1, -2, '#ef4444'], [2, -2, '#ef4444'], [3, -2, '#ef4444'], [4, -2, '#ef4444'],
    [-4, -1, '#ef4444'], [-3, -1, '#ffffff'], [-2, -1, '#ef4444'], [-1, -1, '#ef4444'], [0, -1, '#ef4444'], [1, -1, '#ef4444'], [2, -1, '#ef4444'], [3, -1, '#ef4444'], [4, -1, '#ef4444'],
    [-4, 0, '#ef4444'], [-3, 0, '#ef4444'], [-2, 0, '#ef4444'], [-1, 0, '#ef4444'], [0, 0, '#dc2626'], [1, 0, '#dc2626'], [2, 0, '#dc2626'], [3, 0, '#dc2626'], [4, 0, '#dc2626'],
    [-3, 1, '#dc2626'], [-2, 1, '#dc2626'], [-1, 1, '#dc2626'], [0, 1, '#dc2626'], [1, 1, '#b91c1c'], [2, 1, '#b91c1c'], [3, 1, '#b91c1c'],
    [-2, 2, '#dc2626'], [-1, 2, '#dc2626'], [0, 2, '#b91c1c'], [1, 2, '#b91c1c'], [2, 2, '#b91c1c'],
    [-1, 3, '#b91c1c'], [0, 3, '#b91c1c'], [1, 3, '#b91c1c'],
    [0, 4, '#991b1b'],
  ];

  for (const [dx, dy, color] of heartPixels) {
    ctx.fillStyle = color as string;
    ctx.fillRect(cx + (dx as number) * px, cy + (dy as number) * px, px, px);
  }
}

/**
 * STAGE 29: コーヒーカップ（ホットコーヒー・モダンベクターアート）
 */
function renderCoffeeScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // カフェの温かみのあるウッドテーブル背景
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#271c19');
  bgGrad.addColorStop(1, '#150f0d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.56;
  const s = Math.min(w, h);

  // ソーサー（受け皿・影と美しい磁器）
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + s * 0.23, s * 0.38, s * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(cx, cy + s * 0.20, s * 0.36, s * 0.10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.ellipse(cx, cy + s * 0.19, s * 0.30, s * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();

  // マグカップの取っ手（ハンドル・相対スケール）
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = s * 0.045;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cx + s * 0.20, cy + s * 0.02, s * 0.09, -Math.PI * 0.4, Math.PI * 0.4);
  ctx.stroke();

  // マグカップ本体（滑らかなカーブと陶器の白さ）
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(cx - s * 0.20, cy - s * 0.14, s * 0.40, s * 0.32, [0, 0, s * 0.08, s * 0.08]);
  ctx.fill();

  // カップ内側のダークローストコーヒー液面
  ctx.fillStyle = '#3f1a04';
  ctx.beginPath();
  ctx.ellipse(cx, cy - s * 0.14, s * 0.19, s * 0.065, 0, 0, Math.PI * 2);
  ctx.fill();

  // コーヒーの泡（クレマとツヤ）
  ctx.fillStyle = '#9a3412';
  ctx.beginPath();
  ctx.ellipse(cx, cy - s * 0.14, s * 0.15, s * 0.045, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.ellipse(cx - s * 0.03, cy - s * 0.145, s * 0.08, s * 0.02, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // 立ちのぼる優しい湯気（スチーム）
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = Math.max(2, s * 0.016);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.06, cy - s * 0.22);
  ctx.bezierCurveTo(cx - s * 0.12, cy - s * 0.32, cx - s * 0.02, cy - s * 0.40, cx - s * 0.08, cy - s * 0.48);
  ctx.moveTo(cx + s * 0.05, cy - s * 0.22);
  ctx.bezierCurveTo(cx + s * 0.11, cy - s * 0.32, cx + s * 0.01, cy - s * 0.41, cx + s * 0.07, cy - s * 0.49);
  ctx.stroke();
}

/**
 * STAGE 30: 気球（熱気球・バルーン・モダンベクターアート）
 */
function renderHotAirBalloonScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 青空と雲
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(0.6, '#38bdf8');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // 白い雲
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.beginPath();
  ctx.ellipse(w * 0.2, h * 0.3, 60, 25, 0, 0, Math.PI * 2);
  ctx.ellipse(w * 0.8, h * 0.65, 80, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  const cx = w * 0.5;
  const cy = h * 0.42;
  const r = Math.min(w * 0.22, h * 0.32);

  // 気球の球体（カラフルなストライプ）
  const stripes = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];
  for (let i = 0; i < stripes.length; i++) {
    ctx.fillStyle = stripes[i];
    ctx.beginPath();
    const sx = cx - r + (r * 2 / stripes.length) * i;
    const ex = sx + (r * 2 / stripes.length);
    ctx.ellipse(cx, cy, r * (1 - i * 0.12), r, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 気球の下部台形
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy + r * 0.8);
  ctx.lineTo(cx + 30, cy + r * 0.8);
  ctx.lineTo(cx + 12, cy + r + 20);
  ctx.lineTo(cx - 12, cy + r + 20);
  ctx.closePath();
  ctx.fill();

  // バスケット（カゴ）
  ctx.fillStyle = '#78350f';
  ctx.fillRect(cx - 15, cy + r + 26, 30, 20);
}

/**
 * STAGE 31: 灯台（海の光・モダンベクターアート）
 */
function renderLighthouseScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 深夜の海
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#020617');
  skyGrad.addColorStop(0.7, '#0f172a');
  skyGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const topY = h * 0.18;
  const baseY = h * 0.82;

  // サーチライトの光芒
  const beamGrad = ctx.createRadialGradient(cx, topY + 20, 5, cx - w * 0.35, topY - 30, w * 0.6);
  beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.7)');
  beamGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.2)');
  beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = beamGrad;
  ctx.beginPath();
  ctx.moveTo(cx, topY + 20);
  ctx.lineTo(cx - w * 0.45, topY - 60);
  ctx.lineTo(cx - w * 0.45, topY + 90);
  ctx.closePath();
  ctx.fill();

  // 灯台の塔本体（赤白ストライプ）
  const stripeH = (baseY - topY) / 5;
  const colors = ['#dc2626', '#f8fafc', '#dc2626', '#f8fafc', '#dc2626'];
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    const y1 = topY + stripeH * i;
    const y2 = y1 + stripeH;
    const w1 = 20 + i * 8;
    const w2 = 20 + (i + 1) * 8;
    ctx.moveTo(cx - w1, y1);
    ctx.lineTo(cx + w1, y1);
    ctx.lineTo(cx + w2, y2);
    ctx.lineTo(cx - w2, y2);
    ctx.closePath();
    ctx.fill();
  }

  // ランタンルーム屋根
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx, topY, 16, Math.PI, 0);
  ctx.fill();
}

/**
 * STAGE 32: 風車（オランダ風車・モダンベクターアート）
 */
function renderWindmillScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 青空とチューリップ畑
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(0, 0, w, h * 0.7);
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(0, h * 0.7, w, h * 0.3);

  const cx = w * 0.5;
  const cy = h * 0.45;

  // 風車の塔本体
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy - 40);
  ctx.lineTo(cx + 30, cy - 40);
  ctx.lineTo(cx + 50, h * 0.75);
  ctx.lineTo(cx - 50, h * 0.75);
  ctx.closePath();
  ctx.fill();

  // 風車の十字羽根
  ctx.save();
  ctx.translate(cx, cy - 40);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 6;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2);
    ctx.strokeRect(0, -6, 90, 12);
    ctx.fillRect(0, -6, 90, 12);
  }
  ctx.restore();
}

/**
 * STAGE 33: レコードプレーヤー（モダンベクターアート）
 */
function renderVinylRecordScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.46;
  const cy = h * 0.5;
  const r = Math.min(w * 0.32, h * 0.42);

  // 黒いレコード盤
  ctx.fillStyle = '#09090b';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // レコードの溝の光沢
  ctx.strokeStyle = '#27272a';
  ctx.lineWidth = 1.5;
  for (let i = 1; i <= 6; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, r * (0.35 + i * 0.1), 0, Math.PI * 2);
    ctx.stroke();
  }

  // 赤い中央レーベル
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.32, 0, Math.PI * 2);
  ctx.fill();

  // センタースピンドル
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fill();

  // トーンアーム
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(w * 0.85, h * 0.2);
  ctx.lineTo(w * 0.78, h * 0.65);
  ctx.lineTo(cx + r * 0.5, cy + r * 0.3);
  ctx.stroke();
}

/**
 * STAGE 34: サボテン（砂漠のサボテン・モダンベクターアート）
 */
function renderCactusScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 夕焼けの砂漠
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#c026d3');
  skyGrad.addColorStop(0.5, '#f97316');
  skyGrad.addColorStop(1, '#fde047');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // 砂丘
  ctx.fillStyle = '#7c2d12';
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.9, w * 0.6, h * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  const cx = w * 0.5;
  const cy = h * 0.55;

  // サボテン（緑の太い幹）
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.roundRect(cx - 16, cy - 80, 32, 130, 16);
  ctx.fill();

  // 左の腕
  ctx.beginPath();
  ctx.roundRect(cx - 50, cy - 40, 40, 18, [10, 0, 0, 10]);
  ctx.roundRect(cx - 50, cy - 70, 18, 40, [10, 10, 0, 0]);
  ctx.fill();

  // 右の腕
  ctx.beginPath();
  ctx.roundRect(cx + 10, cy - 25, 40, 18, [0, 10, 10, 0]);
  ctx.roundRect(cx + 32, cy - 55, 18, 40, [10, 10, 0, 0]);
  ctx.fill();
}

/**
 * STAGE 93: 王冠（レトロRPG風ピクセルアート）
 */
function renderPixelCrownScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#2e1065');
  bgGrad.addColorStop(1, '#0f051d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.54;
  const p = Math.max(7, Math.floor(w / 40));

  const map = [
    [0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0],
    [5,0,0,0,0,0,1,2,2,1,0,0,0,0,0,5],
    [1,1,0,0,6,0,1,3,2,1,0,6,0,0,1,1],
    [1,2,1,0,1,1,1,2,2,1,1,1,0,1,2,1],
    [1,3,2,1,1,2,1,7,7,1,2,1,1,2,3,1],
    [1,2,2,1,7,7,7,7,7,7,7,7,1,2,2,1],
    [1,2,7,7,7,7,7,7,7,7,7,7,7,7,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,3,2,2,1,5,1,4,4,1,6,1,2,2,3,1],
    [1,2,2,2,1,1,1,4,4,1,1,1,2,2,2,1],
    [8,8,1,8,8,1,8,8,8,8,1,8,8,1,8,8],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];

  const cols = 16;
  const rows = map.length;
  const startX = cx - (cols * p) / 2;
  const startY = cy - (rows * p) / 2;

  const colorPalette: Record<number, string> = {
    1: '#92400e',
    2: '#f59e0b',
    3: '#fef08a',
    4: '#ef4444',
    5: '#3b82f6',
    6: '#10b981',
    7: '#881337',
    8: '#f8fafc'
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = map[r][c];
      if (val > 0 && colorPalette[val]) {
        ctx.fillStyle = colorPalette[val];
        ctx.fillRect(startX + c * p, startY + r * p, p, p);
      }
    }
  }

  const sparkles = [
    { x: cx - w * 0.28, y: cy - h * 0.22, s: p },
    { x: cx + w * 0.30, y: cy - h * 0.18, s: p * 1.2 },
    { x: cx + w * 0.22, y: cy + h * 0.25, s: p * 0.8 }
  ];
  ctx.fillStyle = '#fef08a';
  for (const s of sparkles) {
    ctx.fillRect(s.x, s.y - s.s, s.s, s.s * 3);
    ctx.fillRect(s.x - s.s, s.y, s.s * 3, s.s);
  }
}

/**
 * STAGE 94: 盾（勇者のカイトシールド・ピクセルアート）
 */
function renderPixelShieldScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#0f172a');
  bgGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.52;
  const p = Math.max(7, Math.floor(w / 40));

  const map = [
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,3,3,2,2,2,2,2,2,3,3,1,0],
    [1,3,2,4,4,4,6,6,5,5,2,2,3,1],
    [1,2,4,4,4,4,6,6,5,5,5,2,2,1],
    [1,2,4,4,3,3,6,6,3,3,5,2,2,1],
    [1,2,4,4,3,6,6,6,6,3,5,2,2,1],
    [1,2,4,4,4,6,6,6,6,5,5,2,2,1],
    [1,2,4,4,4,4,6,6,5,5,5,2,2,1],
    [1,2,4,4,4,4,6,6,5,5,5,2,2,1],
    [0,1,2,4,4,4,6,6,5,5,2,2,1,0],
    [0,1,2,4,4,4,6,6,5,5,2,2,1,0],
    [0,0,1,2,4,4,6,6,5,2,2,1,0,0],
    [0,0,1,2,4,4,6,6,5,2,2,1,0,0],
    [0,0,0,1,2,4,6,6,2,2,1,0,0,0],
    [0,0,0,0,1,2,6,6,2,1,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0,0,0]
  ];

  const cols = 14;
  const rows = map.length;
  const startX = cx - (cols * p) / 2;
  const startY = cy - (rows * p) / 2;

  const colorPalette: Record<number, string> = {
    1: '#090d16',
    2: '#d97706',
    3: '#fbbf24',
    4: '#1d4ed8',
    5: '#3b82f6',
    6: '#f8fafc',
    7: '#dc2626'
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = map[r][c];
      if (val > 0 && colorPalette[val]) {
        ctx.fillStyle = colorPalette[val];
        ctx.fillRect(startX + c * p, startY + r * p, p, p);
      }
    }
  }
}

/**
 * STAGE 95: コイン（ゴールドコイン・ピクセルアート）
 */
function renderPixelCoinScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#18181b';
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;
  const p = Math.max(8, Math.floor(w / 36));

  const map = [
    [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,4,4,4,4,4,3,1,1,0,0],
    [0,1,4,4,4,4,4,4,3,3,3,2,1,0],
    [0,1,4,4,3,3,3,3,3,3,2,2,1,0],
    [1,4,4,3,3,0,0,5,0,0,3,2,2,1],
    [1,4,3,3,0,5,5,5,5,5,0,2,2,1],
    [1,4,3,3,0,0,5,5,5,0,0,2,2,1],
    [1,4,3,3,0,5,5,5,5,5,0,2,2,1],
    [1,4,3,3,5,0,5,0,5,0,5,2,2,1],
    [1,4,3,3,0,0,0,0,0,0,0,2,2,1],
    [0,1,4,3,3,3,2,2,2,2,2,2,1,0],
    [0,1,3,3,2,2,2,2,2,2,2,2,1,0],
    [0,0,1,1,2,2,2,2,2,2,1,1,0,0],
    [0,0,0,0,1,1,1,1,1,1,0,0,0,0]
  ];

  const cols = 14;
  const rows = map.length;
  const startX = cx - (cols * p) / 2;
  const startY = cy - (rows * p) / 2;

  const colorPalette: Record<number, string> = {
    1: '#451a03',
    2: '#b45309',
    3: '#f59e0b',
    4: '#fde047',
    5: '#ffffff'
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = map[r][c];
      if (val > 0 && colorPalette[val]) {
        ctx.fillStyle = colorPalette[val];
        ctx.fillRect(startX + c * p, startY + r * p, p, p);
      }
    }
  }

  ctx.fillStyle = '#fef08a';
  const sp = [
    { x: cx + w * 0.28, y: cy - h * 0.25, s: p },
    { x: cx - w * 0.26, y: cy + h * 0.22, s: p * 0.8 }
  ];
  for (const s of sp) {
    ctx.fillRect(s.x, s.y - s.s, s.s, s.s * 3);
    ctx.fillRect(s.x - s.s, s.y, s.s * 3, s.s);
  }
}

/**
 * STAGE 96: おばけ（アーケード風ゴースト・ピクセルアート）
 */
function renderPixelGhostScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#1e1b4b');
  bgGrad.addColorStop(1, '#09090b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;
  const p = Math.max(8, Math.floor(w / 34));

  const map = [
    [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,2,2,2,2,2,2,1,1,0,0],
    [0,1,2,2,2,2,2,2,2,2,2,2,1,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,5,5,4,2,2,2,5,5,4,2,2,1],
    [1,2,5,4,4,2,2,2,5,4,4,2,2,1],
    [1,2,4,4,4,2,2,2,4,4,4,2,2,1],
    [1,2,6,6,2,2,4,4,2,2,6,6,2,1],
    [1,2,2,2,2,4,4,4,4,2,2,2,2,1],
    [1,2,2,2,2,2,4,4,2,2,2,2,3,1],
    [1,2,2,2,2,2,2,2,2,2,2,3,3,1],
    [1,2,2,3,2,2,3,2,2,3,2,2,3,1],
    [1,2,3,1,2,3,1,2,3,1,2,3,1,1],
    [0,1,1,0,1,1,0,1,1,0,1,1,0,0]
  ];

  const cols = 14;
  const rows = map.length;
  const startX = cx - (cols * p) / 2;
  const startY = cy - (rows * p) / 2;

  const colorPalette: Record<number, string> = {
    1: '#090d16',
    2: '#f8fafc',
    3: '#94a3b8',
    4: '#0f172a',
    5: '#ffffff',
    6: '#f472b6'
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = map[r][c];
      if (val > 0 && colorPalette[val]) {
        ctx.fillStyle = colorPalette[val];
        ctx.fillRect(startX + c * p, startY + r * p, p, p);
      }
    }
  }

  ctx.fillStyle = 'rgba(165, 243, 252, 0.4)';
  ctx.beginPath();
  ctx.arc(cx - w * 0.3, cy - h * 0.15, p * 1.5, 0, Math.PI * 2);
  ctx.arc(cx + w * 0.32, cy + h * 0.18, p, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * STAGE 97: ドラゴンのたまご（ピクセルアート）
 */
function renderPixelEggScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#1c1917');
  bgGrad.addColorStop(1, '#450a0a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.48;
  const p = Math.max(8, Math.floor(w / 34));

  const map = [
    [0,0,0,0,1,1,1,1,0,0,0,0],
    [0,0,1,1,4,4,3,3,1,1,0,0],
    [0,1,4,4,3,3,3,2,2,2,1,0],
    [1,4,4,3,3,5,5,3,2,2,2,1],
    [1,4,3,3,5,5,3,3,2,2,2,1],
    [1,4,3,3,3,5,2,2,2,2,2,1],
    [1,4,3,3,2,5,5,2,2,2,2,1],
    [1,3,3,2,2,2,5,5,2,2,2,1],
    [1,3,3,2,2,2,2,5,2,2,2,1],
    [1,3,2,2,2,2,2,2,2,2,2,1],
    [0,1,3,2,2,2,2,2,2,2,1,0],
    [0,1,2,2,2,2,2,2,2,2,1,0],
    [6,6,1,1,2,2,2,2,1,1,6,6],
    [6,6,6,6,1,1,1,1,6,6,6,6],
    [0,6,6,6,6,6,6,6,6,6,6,0]
  ];

  const cols = 12;
  const rows = map.length;
  const startX = cx - (cols * p) / 2;
  const startY = cy - (rows * p) / 2;

  const colorPalette: Record<number, string> = {
    1: '#022c22',
    2: '#064e3b',
    3: '#059669',
    4: '#34d399',
    5: '#fde047',
    6: '#78350f'
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = map[r][c];
      if (val > 0 && colorPalette[val]) {
        ctx.fillStyle = colorPalette[val];
        ctx.fillRect(startX + c * p, startY + r * p, p, p);
      }
    }
  }
}

/**
 * STAGE 98: ギター（モダンベクターアート）
 */
function renderGuitarScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#1e293b');
  bgGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.58;

  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.arc(cx, cy + 30, 75, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy - 65, 55, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx - 55, cy - 65);
  ctx.bezierCurveTo(cx - 35, cy - 10, cx - 45, cy + 10, cx - 75, cy + 30);
  ctx.lineTo(cx + 75, cy + 30);
  ctx.bezierCurveTo(cx + 45, cy + 10, cx + 35, cy - 10, cx + 55, cy - 65);
  ctx.closePath();
  ctx.fillStyle = '#d97706';
  ctx.fill();

  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.arc(cx, cy - 30, 26, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy - 30, 31, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#451a03';
  ctx.fillRect(cx - 32, cy + 50, 64, 16);

  ctx.fillStyle = '#292524';
  ctx.fillRect(cx - 10, h * 0.08, 20, cy - 30 - h * 0.08);

  ctx.strokeStyle = '#d6d3d1';
  ctx.lineWidth = 1.5;
  for (let y = h * 0.12; y < cy - 40; y += 18) {
    ctx.beginPath();
    ctx.moveTo(cx - 10, y);
    ctx.lineTo(cx + 10, y);
    ctx.stroke();
  }

  ctx.fillStyle = '#78350f';
  ctx.fillRect(cx - 14, h * 0.02, 28, h * 0.07);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 1;
  for (let i = -6; i <= 6; i += 2.4) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 0.8, h * 0.02);
    ctx.lineTo(cx + i * 1.4, cy + 50);
    ctx.stroke();
  }
}

/**
 * STAGE 99: 砂時計（モダンベクターアート）
 */
function renderHourglassScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#0f172a');
  bgGrad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;

  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.roundRect(cx - 65, cy - 110, 130, 16, 6);
  ctx.roundRect(cx - 65, cy + 94, 130, 16, 6);
  ctx.fill();

  ctx.fillStyle = '#92400e';
  ctx.fillRect(cx - 55, cy - 94, 8, 188);
  ctx.fillRect(cx + 47, cy - 94, 8, 188);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(cx - 45, cy - 94);
  ctx.bezierCurveTo(cx - 45, cy - 20, cx - 10, cy - 10, cx - 6, cy);
  ctx.bezierCurveTo(cx - 10, cy + 10, cx - 45, cy + 20, cx - 45, cy + 94);
  ctx.lineTo(cx + 45, cy + 94);
  ctx.bezierCurveTo(cx + 45, cy + 20, cx + 10, cy + 10, cx + 6, cy);
  ctx.bezierCurveTo(cx + 10, cy - 10, cx + 45, cy - 20, cx + 45, cy - 94);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(cx - 40, cy - 60);
  ctx.bezierCurveTo(cx - 30, cy - 20, cx - 6, cy - 5, cx, cy);
  ctx.bezierCurveTo(cx + 6, cy - 5, cx + 30, cy - 20, cx + 40, cy - 60);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy + 60);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - 38, cy + 94);
  ctx.lineTo(cx, cy + 60);
  ctx.lineTo(cx + 38, cy + 94);
  ctx.closePath();
  ctx.fill();
}

/**
 * STAGE 100: 地球儀（モダンベクターアート・記念すべき第100問）
 */
function renderGlobeScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#111827');
  bgGrad.addColorStop(1, '#1f2937');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.46;
  const r = Math.min(w * 0.28, h * 0.28);

  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.ellipse(cx, cy + r * 1.55, 60, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#92400e';
  ctx.fillRect(cx - 8, cy + r * 1.15, 16, r * 0.4);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.18, Math.PI * 0.35, Math.PI * 1.45, false);
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = '#0284c7';
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.ellipse(cx + r * 0.25, cy - r * 0.25, r * 0.45, r * 0.35, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx + r * 0.1, cy + r * 0.25, r * 0.28, r * 0.4, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.55, cy - r * 0.15, r * 0.28, r * 0.45, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - r, cy);
  ctx.lineTo(cx + r, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.75, 0, Math.PI * 2);
  ctx.stroke();

  const sphereGrad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
  sphereGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
  sphereGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
  sphereGrad.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
  ctx.fillStyle = sphereGrad;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  ctx.restore();
}
