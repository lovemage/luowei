import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const cases = [
  {
    slug: "low-0410",
    name: "斗南找西瓜",
    avatarUrl: "/images/avatar-low-0410.jpg",
    category: "short-video",
    title: "彭家飯湯創辦人",
    bio: "大家好，我是斗南找西瓜，來自雲林斗南的彭家飯湯創辦人。靠著一碗飯湯，我帶著雲林勞工魂環島整個台灣，用最樸實的方式傳承職人味。我們家的飯湯是斗南在地的經典小吃，每一碗都承載著對家鄉味道的堅持與熱愛。從小看著家人在廚房忙碌的身影，那份對食物的用心與執著深深影響了我。長大後決定接手家業，不只守住這份傳統，更要讓更多人認識這道屬於雲林的驕傲。平時除了顧店，也喜歡到處走走看看，把旅途中的趣事和美食分享給大家。\n\n上完羅威傳媒的短影音課程後，我開始學習如何用鏡頭說故事，把飯湯的製作過程、環島的點滴和小鎮的日常記錄下來。透過 TikTok 分享在地美食文化，讓更多人看見斗南的美好，也為小店帶來了不少新客人。",
    stats: { followers: "1955", likes: "15.3K", platform: "TikTok" },
    order: 2,
  },
  {
    slug: "di-di-ppapp",
    name: "我是小羅",
    avatarUrl: "/images/avatar-di-di-ppapp.jpg",
    category: "short-video",
    title: "短影音創作者",
    bio: "哈囉大家好，我是小羅！一個喜歡觀察生活、記錄日常的短影音創作者。我相信每個人的生活裡都有值得被看見的故事，無論是搞笑的瞬間、感動的片刻，還是那些讓人會心一笑的小事。我擅長用輕鬆幽默的方式呈現生活中的百態，讓觀眾在滑手機的時候也能感受到溫暖和快樂。除了主帳號之外，我還經營「小羅百態」和「小羅三觀」等系列內容，從不同角度分享我對生活的觀察與思考。目前在 TikTok 已累積超過兩萬粉絲，影片獲讚數接近百萬。\n\n上完羅威傳媒的課程後，我掌握了短影音的拍攝節奏和剪輯技巧，開始有系統地產出內容，粉絲成長速度明顯加快，也逐步建立起自己的個人品牌。",
    stats: { followers: "21.9K", likes: "985.8K", platform: "TikTok" },
    order: 3,
  },
  {
    slug: "lw-tvs",
    name: "小羅三觀",
    avatarUrl: "/images/avatar-lw-tvs.jpg",
    category: "short-video",
    title: "觀點型創作者",
    bio: "嗨，我是小羅三觀的經營者。「說人話，說真話」說心話！這是我做內容的核心理念。在這個資訊爆炸的時代，我選擇用最真誠的方式和大家聊聊生活中的大小事。不包裝、不做作，就是把我真實的想法和觀點分享出來。有時候是對社會現象的觀察，有時候是對人際關係的思考，也有時候就是單純想跟大家說說心裡話。我相信真誠的內容最能打動人心，而每一個願意停下來聽我說話的人，都是我繼續創作的動力。\n\n接觸羅威傳媒的課程後，我學會了如何將觀點精準地濃縮在短短幾十秒內，用更有力量的方式傳遞想法，讓每一支影片都能引起觀眾的共鳴與討論。",
    stats: { followers: "8764", likes: "178.2K", platform: "TikTok" },
    order: 4,
  },
  {
    slug: "fca-jasmine",
    name: "Jasmine",
    avatarUrl: "/images/avatar-fca-jasmine.jpg",
    category: "short-video",
    title: "FC二代 / ACE認證教練",
    bio: "Hi 大家好，我是 Jasmine！全網最懂安麗的 ME，同時也是 FC 二代（家族世界第二）。除了在直銷領域深耕，我也是一名 ACE 和 UA 雙認證的私人教練，熱愛健身和健康生活。我相信一個人的成功不只看事業成就，更要看身心的平衡與成長。在我的內容裡，你會看到我分享關於事業經營的心得、健身訓練的日常，以及作為年輕創業者的生活點滴。我希望透過自己的故事，激勵更多年輕人勇敢追夢，找到屬於自己的舞台。\n\n透過羅威傳媒的短影音課程，我開始將個人品牌延伸到 TikTok，用短影音的形式讓更多人認識我，也為事業開拓了全新的流量入口。",
    stats: { followers: "1818", likes: "6107", platform: "TikTok" },
    order: 6,
  },
  {
    slug: "iphoneboss-0731",
    name: "蘋果不一家",
    avatarUrl: "/images/avatar-iphoneboss.jpg",
    category: "short-video",
    title: "通訊行連鎖創辦人",
    bio: "大家好，我是蘋果不一家的創辦人！目前經營 5 間通訊行，並且開放加盟中。從一間小小的手機店起步，一路走到現在擁有多間分店，這段創業歷程充滿了酸甜苦辣。我在 TikTok 上分享的內容涵蓋創業日常、通訊行業的秘辛以及各種手機知識。不管你是想了解最新的手機資訊、好奇通訊行的經營內幕，還是對創業有興趣，都歡迎來我的頻道逛逛。我希望用最真實的方式，讓大家看見創業者的日常，也幫助想踏入這個行業的人少走一些彎路。\n\n上完羅威傳媒的課程後，我開始有系統地經營短影音，將通訊行的專業知識轉化為有趣的內容，短時間內粉絲快速成長到兩萬五，也為實體店面帶來了大量新客源。",
    stats: { followers: "25.8K", likes: "318.6K", platform: "TikTok" },
    order: 7,
  },
  {
    slug: "lw-mary",
    name: "賣珠寶的牧師",
    avatarUrl: "/images/avatar-lw-mary.jpg",
    category: "short-video",
    title: "伯特利皇家珠寶負責人",
    bio: "大家好，我是 Mary，大家都叫我賣珠寶的牧師。我經營伯特利皇家珠寶，擁有超過 20 年的跨國商戰經驗。從國際貿易到珠寶產業，一路走來我始終堅持誠信經營的原則，因此也被業界稱為珠寶界最誠實的牧師。目前在北中南皆設有實體店面，提供最優質的珠寶服務。除了事業之外，我也是一位牧師，信仰是支撐我走過每一段旅程的力量。我相信做生意和做人一樣，誠實是最好的策略。\n\n接觸羅威傳媒的短影音課程後，我開始嘗試用 TikTok 分享珠寶知識和經營心得，讓更多人透過影片認識伯特利皇家珠寶，也為品牌打開了年輕族群的市場。",
    stats: { followers: "876", likes: "2934", platform: "TikTok" },
    order: 8,
  },
  {
    slug: "lw-egg",
    name: "冒煙雞蛋糕",
    avatarUrl: "/images/avatar-lw-egg.jpg",
    category: "short-video",
    title: "雞蛋糕品牌創辦人",
    bio: "哈囉大家好，我是冒煙雞蛋糕的創辦人！我們的理念很簡單——只做最高標準，每日限量 350 顆。從選料、調配到烘烤，每一個環節都堅持用最好的品質呈現給顧客。冒煙雞蛋糕不只是一個小攤販，而是一個用心做到極致的品牌。我們相信，即使是一顆小小的雞蛋糕，也值得被認真對待。目前除了自營之外，也開放加盟及教學，希望把這份對品質的堅持傳遞給更多想創業的夥伴。\n\n上完羅威傳媒的短影音課程後，我開始用 TikTok 記錄雞蛋糕的製作過程和創業日常，讓大家看到每一顆雞蛋糕背後的用心，也成功吸引了不少加盟詢問和線上訂單。",
    stats: { followers: "6658", likes: "75.1K", platform: "TikTok" },
    order: 9,
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
