import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const cases = [
  {
    slug: "course-2024-03",
    name: "2024.03 台南場",
    avatarUrl: "/pics/S__4505725_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "這場台南小班制課程，學員來自餐飲、美容、零售等不同產業。課程結束後，多位企業主反饋：\n\n「以前請外面拍一支產品影片要花 2-3 萬，現在自己員工用手機就能拍出不輸專業的內容。」\n\n「課後第二週就開始自己拍 TikTok，第一支破千觀看的時候真的很興奮。」\n\n三個月追蹤回訪：超過 70% 的學員仍持續產出短影音，其中 3 位學員的帳號已開始接到業配邀約。",
    stats: { date: "2024.03", location: "台南", students: "10人" },
    order: 1,
  },
  {
    slug: "course-2024-06",
    name: "2024.06 台南場",
    avatarUrl: "/pics/S__4505724_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "這期吸引了更多對短影音有熱情的中小企業主。課程涵蓋帳號規劃、拍攝技巧到後期剪輯，每位學員都在課堂上實際完成作品。\n\n企業主回饋：「以前覺得拍影片很難，上完課才知道原來一支手機加上正確的方法就夠了。回去之後讓員工也開始拍，現在店裡每週都有新影片上架。」\n\n「課程教的 HVA 結構（Hook + Value + Action）真的很實用，套用之後影片的完播率明顯提高。」",
    stats: { date: "2024.06", location: "台南", students: "20人" },
    order: 2,
  },
  {
    slug: "course-2024-08",
    name: "2024.08 台南場",
    avatarUrl: "/pics/S__4505723_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "盛夏的台南場聚集了 25 位來自不同背景的企業主和創業者。從社群灌粉策略到內容變現模式，每位學員都帶走了可以立刻執行的 SOP。\n\n學員見證：「上課前花 3 萬請人拍的影片只有 200 觀看，上課後自己拍的第一支就破 5,000。差別在於懂不懂演算法邏輯。」\n\n「最大的收穫不只是技術，而是建立了一群同路人的社群。課後群組裡大家互相分享數據、交流心得，進步速度比一個人快太多了。」",
    stats: { date: "2024.08", location: "台南", students: "25人" },
    order: 3,
  },
  {
    slug: "course-2024-10",
    name: "2024.10 台南場",
    avatarUrl: "/pics/S__4505722_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "這場課程特別加入了成功經營短影音帳號的實際案例分享，讓學員直接從真實數據中學習。\n\n傳產老闆回饋：「我做工廠做了二十年，從來沒想過短影音跟我有什麼關係。上完課後讓工廠主管拍製程影片，結果 B2B 的詢價電話增加了三成，都是看到影片來的。」\n\n「課程裡教的 AI 輔助剪輯工具，讓完全不會剪片的員工也能在 30 分鐘內完成一支可以發布的影片。這對人力有限的中小企業來說太關鍵了。」",
    stats: { date: "2024.10", location: "台南", students: "25人" },
    order: 4,
  },
  {
    slug: "course-2024-12",
    name: "2024.12 馬來西亞場",
    avatarUrl: "/pics/S__4505716_0.webp",
    category: "course",
    title: "海外影響力變現課程",
    bio: "羅威傳媒首次將課程帶到海外，在馬來西亞成功開辦。現場學員對短影音商業應用的熱情超乎預期。\n\n馬來西亞企業主回饋：「在馬來西亞很少有這麼實戰的短影音課程，大部分都在講理論。這堂課直接教我們拍、教我們剪、教我們發，離開教室的時候手機裡已經有兩支可以上架的影片了。」\n\n「回去後公司行銷部開始自主產出內容，一個月省下的外包費用就超過課程費好幾倍。」\n\n跨國教學證明了影響力變現的方法不受國界限制。",
    stats: { date: "2024.12", location: "馬來西亞", students: "20人" },
    order: 5,
  },
  {
    slug: "course-2025-01",
    name: "2025.01 雲林場",
    avatarUrl: "/pics/S__4505719_0.webp",
    category: "course",
    title: "大自媒體時代課程",
    bio: "「因雲而聚・大自媒體時代」專為在地中小企業主和創業者設計。許多學員是第一次接觸短影音製作，課程結束時都已能獨立完成作品。\n\n在地企業主回饋：「我開早餐店十幾年了，從來沒想過要拍影片。上完課的第一個月，用手機拍了製作過程的短影音，結果隔壁鎮的客人看到影片特地開車來吃。」\n\n「課程教的 AI 腳本工具太方便了，以前想不出要拍什麼，現在 AI 幫我想好大綱，我只需要照著拍。一週可以產出 3-4 支，以前一個月都拍不出一支。」",
    stats: { date: "2025.01", location: "雲林", students: "30人" },
    order: 6,
  },
  {
    slug: "course-2025-03",
    name: "2025.03 台南場",
    avatarUrl: "/pics/S__4505718_0.webp",
    category: "course",
    title: "卓越系統八把金鑰匙",
    bio: "全新進階課程「卓越系統・八把金鑰匙深度剖析」，從帳號定位、內容規劃到流量變現，八個關鍵步驟環環相扣。\n\n連鎖品牌主管回饋：「進階課教的不只是怎麼拍片，而是怎麼用短影音建立一個完整的業務系統。我們回去後讓 15 位業務人員各自經營帳號，等於多了 15 個 24 小時不下班的線上業務員。」\n\n「最有價值的是流量變現閉環的設計——從影片吸引關注、導流到 LINE、再轉化為實際訂單。上完課三個月，透過短影音帶進來的業績已經佔到總營收的 20%。」",
    stats: { date: "2025.03", location: "台南", students: "15人" },
    order: 7,
  },
  {
    slug: "course-2025-06",
    name: "2025.06 台北場",
    avatarUrl: "/pics/S__4505721_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "北上台北開課，吸引了來自各行各業的企業主和經營者。從上班族到自營業者，每個人都在課程中完成實戰練習。\n\n科技業主管回饋：「我帶了公司的行銷團隊一起來上課。以前外包一支影片要等兩週、花兩萬塊，現在團隊自己一天可以產三支，品質還不差。光是省下的外包費用，半年就回本了。」\n\n「課程裡教的 AI 生成工具特別實用——AI 數位人、AI 動畫、AI 腳本，讓我們用極低成本做出以前要花幾十萬才有的影片效果。」",
    stats: { date: "2025.06", location: "台北", students: "30人" },
    order: 8,
  },
  {
    slug: "course-2025-09",
    name: "2025.09 台南場",
    avatarUrl: "/pics/S__4505717_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "規模更大的一場，超過二十位不同背景的企業主齊聚。教室上方跑馬燈展示著歷屆優秀學員的品牌名稱，激勵著每一位新學員。\n\n美容業老闆回饋：「做美容這行，客人最在意的是信任感。上完課後我開始自己拍護膚過程和客戶見證的短影音，比花錢投廣告有效十倍。新客人進門就說『我在 TikTok 看過你，所以特別放心來找你做臉。』」\n\n「課後建立的學員人脈網絡非常有價值，大家互相轉介客戶、合拍影片，生意圈子一下子擴大了好幾倍。」",
    stats: { date: "2025.09", location: "台南", students: "25人" },
    order: 9,
  },
  {
    slug: "course-2026-01",
    name: "2026.01 台北場",
    avatarUrl: "/pics/S__4505720_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "2026 年首場課程，規模盛大，超過三十位企業主齊聚一堂。短影音和 AI 工具的結合應用成為這期課程的最大亮點。\n\n餐飲連鎖業者回饋：「我有 8 間分店，以前每間店的行銷都要總部統一安排。上完課之後，每間店的店長自己就能拍、自己就能發。8 間店等於 8 個自媒體頻道，在地化的內容比總部統一發的效果好太多了。」\n\n「AI 數位人分身技術是這堂課最驚豔的部分——錄一段素材就能生成多國語言版本，我們直接用在海外加盟的推廣上，省下了大量翻譯和重拍的成本。」",
    stats: { date: "2026.01", location: "台北", students: "35人" },
    order: 10,
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
    console.log(`Case seeded: ${c.slug}`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
