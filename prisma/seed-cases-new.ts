import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const cases = [
  // ── Update existing: 建棕 (was "我是小羅") ──
  {
    slug: "di-di-ppapp",
    name: "建棕",
    avatarUrl: "/avator/avatar-di-di-ppapp.jpeg",
    category: "short-video",
    title: "短影音創作者 / 多帳號經營者",
    bio: "我是建棕，過去想經營個人品牌卻苦於沒有方向，自己摸索拍了幾支影片反應平平。\n\n交給羅威傳媒代操後，團隊為我規劃了多帳號矩陣策略，主帳號之外還延伸出「小羅百態」「小羅三觀」等系列，從不同角度切入目標受眾。每支影片的腳本和剪輯節奏都經過專業打磨，輕鬆幽默中帶有記憶點。\n\n合作成果：主帳號 TikTok 粉絲突破 22,000，影片總讚數接近 99 萬。多帳號矩陣讓曝光量倍數成長，品牌合作邀約源源不絕。從一個人摸索變成有專業團隊支撐，內容品質和產出效率都有質的飛躍。",
    stats: { followers: "22K", likes: "988K", platform: "TikTok" },
    order: 3,
  },
  // ── Update existing: 小羅三觀 ──
  {
    slug: "lw-tvs",
    name: "小羅三觀",
    avatarUrl: "/avator/avatar-lw-tvs.jpeg",
    category: "short-video",
    title: "觀點型品牌帳號",
    bio: "「小羅三觀」是羅威傳媒為建棕打造的觀點型子品牌帳號，主打「說人話、說真話、說心話」的真誠路線。\n\n代操團隊精準地將觀點濃縮在短短幾十秒內，每支影片以社會現象和人際關係為切角，用最直白的方式引起觀眾共鳴。從選題、腳本到後製一條龍，不需要自己操心任何環節。\n\n合作成果：帳號累積 8,753 粉絲，讚數突破 178,000。作為矩陣帳號之一，成功拓展了不同調性的受眾群，證明了「一人多品牌」的代操策略能有效放大個人影響力和商業價值。",
    stats: { followers: "8753", likes: "178.2K", platform: "TikTok" },
    order: 4,
  },
  // ── New: 小羅百態 ──
  {
    slug: "lw-hfl",
    name: "小羅百態",
    avatarUrl: "/avator/avatar-lw-hfl.jpeg",
    category: "short-video",
    title: "人生百態紀實帳號",
    bio: "「小羅百態」是羅威傳媒為建棕操盤的另一個矩陣帳號，定位為「一隻影片一個人生」的高品質紀實路線。\n\n與主帳號的輕鬆風格不同，這個帳號走高規格製作路線——每支影片都像一部微電影，深入記錄各行各業的人生故事。羅威傳媒團隊從選題策劃、腳本開發到拍攝後製全程操盤，確保每支作品都有電影級的敘事張力。\n\n合作成果：帳號粉絲突破 35,300，累積讚數接近 50 萬。高品質的內容策略讓品牌合作的層級也跟著提升，吸引到的業配品牌願意支付更高的合作費用。三個矩陣帳號合計粉絲超過 6.5 萬，形成了強大的全網影響力。",
    stats: { followers: "35.3K", likes: "493.7K", platform: "TikTok" },
    order: 3.5,
  },
  // ── New: 羅威傳媒數位行銷 ──
  {
    slug: "luomedia",
    name: "羅威傳媒",
    avatarUrl: "/avator/avatar-luomedia.jpeg",
    category: "short-video",
    title: "數位行銷公司官方帳號",
    bio: "羅威傳媒自己的官方帳號，也是用同一套代操方法論在經營——以身作則，用數據證明我們教的東西是有效的。\n\n帳號內容涵蓋客戶成功案例、短影音製作幕後、行銷知識分享和團隊日常。每一支影片都是我們專業能力的直接展示，讓潛在客戶在合作前就能看到我們的實力。\n\n經營成果：TikTok 粉絲突破 21,000，影片總讚數 125,000。官方帳號已成為最有效的業務開發工具——超過 40% 的新客戶是先看到我們的 TikTok 內容，再主動來洽詢合作的。",
    stats: { followers: "21K", likes: "125K", platform: "TikTok" },
    order: 0,
  },
  // ── New: Vivian 男性性福CEO ──
  {
    slug: "vivian510510",
    name: "Vivian",
    avatarUrl: "/avator/avatar-vivian.jpeg",
    category: "short-video",
    title: "博威診所 CEO / 男性健康專家",
    bio: "我是 Vivian，經營博威診所，專攻男性性功能領域，擁有人類性學碩士學位和 15 年專業資歷。醫療產業在社群上推廣特別困難，尤其是男性健康這個敏感議題，要怎麼講得專業又不尷尬是最大的挑戰。\n\n與羅威傳媒合作後，團隊幫我找到了「男性性福 CEO」這個大膽但精準的定位。影片內容以專業知識科普為主，用輕鬆的方式打破男性健康的溝通障礙。每支影片都經過醫療合規審查，既有專業深度又有社群傳播力。\n\n合作成果：TikTok 粉絲從零飆升到 39,000，讚數突破 147,000。最重要的是，診所諮詢量大幅成長，來自社群的新患者比例從不到 5% 提升到超過 35%。短影音讓「難以啟齒」的醫療服務變得平易近人，也為診所建立了強大的品牌信任。",
    stats: { followers: "39K", likes: "147.3K", platform: "TikTok" },
    order: 1.5,
  },
  // ── New: 張天威 車業吳彥祖 ──
  {
    slug: "easoncar",
    name: "張天威",
    avatarUrl: "/avator/avatar-easoncar.jpeg",
    category: "short-video",
    title: "元威國際汽車負責人",
    bio: "我是張天威，經營元威國際汽車，主要做國產、進口到超跑的車輛買賣。汽車買賣這行競爭激烈，客戶信任是成交的關鍵，但傳統的銷售方式很難在第一時間建立信任感。\n\n交給羅威傳媒代操後，團隊以「車業吳彥祖」的鮮明人設切入，結合超級奶爸和愛車男子的日常，讓冰冷的汽車銷售變得有溫度。影片內容從看車日常、交車喜悅到家庭生活，全方位展現一個值得信賴的車商形象。\n\n合作成果：TikTok 粉絲成長到 13,100，讚數突破 180,000。每個月透過 TikTok 來的購車諮詢穩定在 20-30 組，成交率遠高於其他管道。不少客人說「看你影片看了半年，終於要換車了第一個就想到你」。短影音幫我把「看車的人」變成「信任你的人」，大幅縮短了成交週期。",
    stats: { followers: "13.1K", likes: "180.5K", platform: "TikTok" },
    order: 1.8,
  },
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  for (const c of cases) {
    await prisma.case.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        avatarUrl: c.avatarUrl,
        category: c.category,
        title: c.title,
        bio: c.bio,
        stats: c.stats,
        order: Math.round(c.order),
      },
      create: {
        slug: c.slug,
        name: c.name,
        avatarUrl: c.avatarUrl,
        category: c.category,
        title: c.title,
        bio: c.bio,
        stats: c.stats,
        order: Math.round(c.order),
        visible: true,
      },
    });
    console.log(`Case seeded: ${c.slug} (${c.name})`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
