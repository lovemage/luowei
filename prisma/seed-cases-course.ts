import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const cases = [
  {
    slug: "course-yunlin-01",
    name: "雲林場 (一)",
    avatarUrl: "/pics/LINE_ALBUM_六個都是雲林場_260409_1.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "雲林在地中小企業主專場。課程結束後，多位老闆反饋：\n\n「以前請外面拍一支產品影片要花 2-3 萬，現在自己員工用手機就能拍出不輸專業的內容。」\n\n「課後第二週就開始自己拍 TikTok，第一支破千觀看的時候真的很興奮。」\n\n三個月追蹤回訪：超過 70% 的學員仍持續產出短影音，其中 3 位學員的帳號已開始接到業配邀約。",
    stats: { location: "雲林", students: "25人", type: "包班" },
    order: 1,
  },
  {
    slug: "course-yunlin-02",
    name: "雲林場 (二)",
    avatarUrl: "/pics/LINE_ALBUM_六個都是雲林場_260409_2.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "第二場雲林企業主專班，學員來自餐飲、農產加工、在地觀光等產業。\n\n早餐店老闆回饋：「我開店十幾年了，從來沒想過要拍影片。上完課的第一個月，用手機拍了製作過程的短影音，結果隔壁鎮的客人看到影片特地開車來吃。」\n\n「課程教的 AI 腳本工具太方便了，以前想不出要拍什麼，現在 AI 幫我想好大綱，我只需要照著拍。一週可以產出 3-4 支，以前一個月都拍不出一支。」",
    stats: { location: "雲林", students: "30人", type: "包班" },
    order: 2,
  },
  {
    slug: "course-yunlin-03",
    name: "雲林場 (三)",
    avatarUrl: "/pics/LINE_ALBUM_六個都是雲林場_260409_3.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "雲林場持續加開，這場吸引了更多傳統產業的經營者。\n\n農產品牌主回饋：「我們家的花生油一直靠口碑在賣，量就是上不去。上完課之後開始拍製油過程的短影音，沒想到在 TikTok 上迴響這麼大，一個月內線上訂單翻了三倍。」\n\n「最實用的是學會了怎麼用手機拍出有質感的產品照，不用再花錢請攝影師了。」",
    stats: { location: "雲林", students: "20人", type: "包班" },
    order: 3,
  },
  {
    slug: "course-yunlin-04",
    name: "雲林場 (四)",
    avatarUrl: "/pics/LINE_ALBUM_六個都是雲林場_260409_4.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "第四場雲林場特別加入了 AI 影像力應用的進階內容。\n\n企業主回饋：「AI 數位人分身技術是這堂課最驚豔的部分——錄一段素材就能生成多國語言版本，我們直接用在外銷產品的介紹上，省下了大量翻譯和重拍的成本。」\n\n「以前覺得 AI 離我們傳產很遠，上完課才知道原來 AI 已經可以幫我們做這麼多事了。」",
    stats: { location: "雲林", students: "25人", type: "包班" },
    order: 4,
  },
  {
    slug: "course-yunlin-05",
    name: "雲林場 (五)",
    avatarUrl: "/pics/LINE_ALBUM_六個都是雲林場_260409_5.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "持續深耕雲林在地企業，這場學員多為二代接班的年輕經營者。\n\n二代經營者回饋：「爸媽那一代靠的是人脈和口碑，但現在不做線上曝光真的不行。上完課之後，我幫工廠開了 TikTok 帳號，B2B 的詢價電話增加了三成，都是看到影片來的。」\n\n「課程裡教的 AI 輔助剪輯工具，讓完全不會剪片的同事也能在 30 分鐘內完成一支可以發布的影片。」",
    stats: { location: "雲林", students: "20人", type: "包班" },
    order: 5,
  },
  {
    slug: "course-yunlin-06",
    name: "雲林場 (六)",
    avatarUrl: "/pics/LINE_ALBUM_六個都是雲林場_260409_6.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "雲林第六場，已成為在地企業主口耳相傳的必修課程。\n\n連鎖小吃品牌主回饋：「我有 3 間分店，以前行銷都靠發傳單。上完課之後每間店的店長自己拍、自己發，在地化的內容比統一廣告效果好太多了。」\n\n「最大的改變是心態——以前覺得拍影片很難很丟臉，現在整個團隊都搶著要出鏡。」",
    stats: { location: "雲林", students: "30人", type: "包班" },
    order: 6,
  },
  {
    slug: "course-tainan",
    name: "台南場",
    avatarUrl: "/pics/LINE_ALBUM_台南場._260409_1.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "台南場聚集了來自餐飲、美容、零售等不同產業的企業主。\n\n美容業老闆回饋：「做美容這行，客人最在意的是信任感。上完課後我開始自己拍護膚過程和客戶見證的短影音，比花錢投廣告有效十倍。新客人進門就說『我在 TikTok 看過你，所以特別放心來找你做臉。』」\n\n「課程教的 HVA 結構（Hook + Value + Action）真的很實用，套用之後影片的完播率明顯提高。」",
    stats: { location: "台南", students: "25人", type: "包班" },
    order: 7,
  },
  {
    slug: "course-taichung-01",
    name: "台中場 (一)",
    avatarUrl: "/pics/LINE_ALBUM_台中場_260409_1.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "首場台中企業主專班，學員橫跨傳產、科技、服務業。\n\n傳產老闆回饋：「我做工廠做了二十年，從來沒想過短影音跟我有什麼關係。上完課後讓工廠主管拍製程影片，結果 B2B 的詢價電話增加了三成，都是看到影片來的。」\n\n「上課前花 3 萬請人拍的影片只有 200 觀看，上課後自己拍的第一支就破 5,000。差別在於懂不懂演算法邏輯。」",
    stats: { location: "台中", students: "25人", type: "包班" },
    order: 8,
  },
  {
    slug: "course-taichung-02",
    name: "台中場 (二)",
    avatarUrl: "/pics/LINE_ALBUM_台中場2_260409_1.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "台中第二場，加碼了 AI 影像力的進階應用內容。\n\n科技業主管回饋：「我帶了公司的行銷團隊一起來上課。以前外包一支影片要等兩週、花兩萬塊，現在團隊自己一天可以產三支，品質還不差。光是省下的外包費用，半年就回本了。」\n\n「AI 生成工具特別實用——AI 數位人、AI 動畫、AI 腳本，讓我們用極低成本做出以前要花幾十萬才有的影片效果。」",
    stats: { location: "台中", students: "30人", type: "包班" },
    order: 9,
  },
  {
    slug: "course-taipei",
    name: "台北場",
    avatarUrl: "/pics/LINE_ALBUM_台北場_260409_1.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "北上台北開課，吸引了來自各行各業的企業主和經營者。\n\n餐飲連鎖業者回饋：「我有 8 間分店，以前每間店的行銷都要總部統一安排。上完課之後，每間店的店長自己就能拍、自己就能發。8 間店等於 8 個自媒體頻道，在地化的內容比總部統一發的效果好太多了。」\n\n「課後建立的學員人脈網絡非常有價值，大家互相轉介客戶、合拍影片，生意圈子一下子擴大了好幾倍。」",
    stats: { location: "台北", students: "35人", type: "包班" },
    order: 10,
  },
  {
    slug: "course-chiayi",
    name: "嘉義場",
    avatarUrl: "/pics/LINE_ALBUM_嘉義場_260409_1.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "嘉義首場企業包班，在地中小企業主反應熱烈。\n\n觀光業者回饋：「嘉義觀光資源這麼豐富，但年輕人都不知道。上完課後我開始用短影音介紹在地秘境和美食，結果影片被大量分享，民宿訂房率提升了四成。」\n\n「最有用的是信任變現閉環的設計——影片吸引關注、導流到 LINE、再轉化為實際訂單。三個月內透過短影音帶來的訂單已經佔到營收的 15%。」",
    stats: { location: "嘉義", students: "20人", type: "包班" },
    order: 11,
  },
  {
    slug: "course-pingtung",
    name: "屏東場",
    avatarUrl: "/pics/LINE_ALBUM_屏東場_260409_1.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "屏東場專為在地農漁產業和觀光業者設計。\n\n水產業者回饋：「我們家做水產加工三十年了，一直都是 B2B 模式。上完課之後嘗試拍了產地直送的短影音，沒想到直接帶來了 B2C 的訂單，開啟了全新的銷售通路。」\n\n「課程教的內容真的是手把手，完全不懂的人也能跟上。回去後讓工廠的年輕員工接手經營帳號，現在每週穩定產出 2-3 支影片。」",
    stats: { location: "屏東", students: "20人", type: "包班" },
    order: 12,
  },
  {
    slug: "course-kaohsiung-01",
    name: "高雄場 (一)",
    avatarUrl: "/pics/LINE_ALBUM_高雄秀泰 兩場_260409_1.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "高雄秀泰場地首場，南部企業主反應極為熱烈。\n\n健身房經營者回饋：「以前靠發傳單和街頭拉客，效率很差。上完課之後教練團隊開始拍訓練日常和學員轉變的短影音，每個月穩定帶來 15-20 組新會員諮詢，獲客成本降低了 70%。」\n\n「讓 30 位員工都學會拍片，等於多了 30 個不用付薪水的線上業務員，這個投資報酬率太高了。」",
    stats: { location: "高雄", students: "30人", type: "包班" },
    order: 13,
  },
  {
    slug: "course-kaohsiung-02",
    name: "高雄場 (二)",
    avatarUrl: "/pics/LINE_ALBUM_高雄秀泰 兩場_260409_2.webp",
    category: "course",
    title: "企業品牌影響力包班課程",
    bio: "高雄第二場，延續首場的好口碑，座無虛席。\n\n連鎖品牌主管回饋：「進階課教的不只是怎麼拍片，而是怎麼用短影音建立一個完整的業務系統。我們回去後讓 15 位業務人員各自經營帳號，等於多了 15 個 24 小時不下班的線上業務員。」\n\n「上完課三個月，透過短影音帶進來的業績已經佔到總營收的 20%，完全超出預期。」",
    stats: { location: "高雄", students: "30人", type: "包班" },
    order: 14,
  },
  {
    slug: "course-singapore",
    name: "新加坡場",
    avatarUrl: "/pics/LINE_ALBUM_新加坡場_260409_1.webp",
    category: "course",
    title: "海外企業品牌影響力課程",
    bio: "羅威傳媒海外場，在新加坡成功開辦。現場學員對短影音商業應用的熱情超乎預期。\n\n新加坡企業主回饋：「在新加坡很少有這麼實戰的短影音課程，大部分都在講理論。這堂課直接教我們拍、教我們剪、教我們發，離開教室的時候手機裡已經有兩支可以上架的影片了。」\n\n「回去後公司行銷部開始自主產出內容，一個月省下的外包費用就超過課程費好幾倍。」\n\n跨國教學證明了影響力變現的方法不受國界限制。",
    stats: { location: "新加坡", students: "25人", type: "包班" },
    order: 15,
  },
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  // Remove old course cases that no longer exist
  const oldSlugs = [
    "course-2024-03", "course-2024-06", "course-2024-08", "course-2024-10",
    "course-2024-12", "course-2025-01", "course-2025-03", "course-2025-06",
    "course-2025-09", "course-2026-01",
  ];
  for (const slug of oldSlugs) {
    await prisma.case.deleteMany({ where: { slug } });
    console.log(`Deleted old: ${slug}`);
  }

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
        order: c.order,
      },
      create: {
        slug: c.slug,
        name: c.name,
        avatarUrl: c.avatarUrl,
        category: c.category,
        title: c.title,
        bio: c.bio,
        stats: c.stats,
        order: c.order,
        visible: true,
      },
    });
    console.log(`Case seeded: ${c.slug} (${c.name})`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
