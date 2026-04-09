import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const cases = [
  {
    slug: "low-0410",
    name: "斗南找西瓜",
    avatarUrl: "/images/avatar-low-0410.jpg",
    category: "short-video",
    title: "彭家飯湯創辦人",
    bio: "我們是雲林斗南在地的小吃品牌「彭家飯湯」，開店多年主要靠附近居民光顧，客群一直無法突破在地範圍。\n\n接受羅威傳媒代操方案後，團隊以「雲林勞工魂環島」為主軸，打造了一系列帶有人情味的短影音內容。把飯湯的製作過程、環島趣事和小鎮日常串連成故事，讓品牌有了溫度和記憶點。\n\n合作成果：TikTok 粉絲成長至近 2,000 人，累積 15,000 讚。最重要的是，開始有外縣市的客人專程開車來吃飯湯，還有不少人說「在 TikTok 上看到你們才知道斗南有這麼好吃的店」。短影音為我們打開了在地小吃走向全台的大門。",
    stats: { followers: "1955", likes: "15.3K", platform: "TikTok" },
    order: 2,
  },
  {
    slug: "di-di-ppapp",
    name: "我是小羅",
    avatarUrl: "/images/avatar-di-di-ppapp.jpg",
    category: "short-video",
    title: "短影音創作者 / 多帳號經營者",
    bio: "我是小羅，一直想經營個人品牌但不知道從何下手，自己拍了幾支影片都沒什麼人看。\n\n交給羅威傳媒代操後，團隊幫我規劃了多帳號矩陣策略，除了主帳號外，還延伸出「小羅百態」「小羅三觀」等系列內容，從不同角度切入目標受眾。每支影片的腳本和剪輯節奏都經過專業打磨，輕鬆幽默中帶有記憶點。\n\n合作成果：主帳號 TikTok 粉絲突破 21,900，影片總讚數接近 100 萬。多帳號的矩陣佈局讓曝光量倍數成長，品牌合作邀約開始源源不絕。從一個人摸索變成有專業團隊支撐，內容產出效率和品質都有質的飛躍。",
    stats: { followers: "21.9K", likes: "985.8K", platform: "TikTok" },
    order: 3,
  },
  {
    slug: "lw-tvs",
    name: "小羅三觀",
    avatarUrl: "/images/avatar-lw-tvs.jpg",
    category: "short-video",
    title: "觀點型品牌帳號",
    bio: "「小羅三觀」是羅威傳媒為小羅打造的觀點型子品牌帳號，主打「說人話、說真話、說心話」的真誠路線。\n\n羅威傳媒的代操團隊精準地將觀點濃縮在短短幾十秒內，每支影片都以社會現象、人際關係為切角，用最直白的方式引起觀眾共鳴。從選題、腳本到後製一條龍，不需要自己操心任何環節。\n\n合作成果：帳號累積 8,764 粉絲，讚數突破 178,000。作為矩陣帳號之一，它成功拓展了不同調性的受眾群，證明了「一人多品牌」的代操策略能有效放大個人影響力和商業價值。",
    stats: { followers: "8764", likes: "178.2K", platform: "TikTok" },
    order: 4,
  },
  {
    slug: "fca-jasmine",
    name: "Jasmine",
    avatarUrl: "/images/avatar-fca-jasmine.jpg",
    category: "short-video",
    title: "FC二代 / ACE認證教練",
    bio: "我是 Jasmine，經營直銷事業多年，同時也是 ACE 和 UA 雙認證的私人教練。過去主要靠線下人脈拓展業務，但觸及範圍有限，想透過社群突破瓶頸卻一直找不到方向。\n\n與羅威傳媒合作代操後，團隊幫我定位為「最懂安麗的健身教練」，把事業經營心得和健身日常結合，打造出差異化的個人品牌形象。影片風格既專業又親切，精準吸引了目標受眾。\n\n合作成果：TikTok 帳號穩定成長至 1,818 粉絲，累積超過 6,000 讚。最大的收穫是開始有陌生客戶透過 TikTok 主動詢問合作，不用再只靠熟人介紹，為事業打開了全新的線上流量入口。",
    stats: { followers: "1818", likes: "6107", platform: "TikTok" },
    order: 6,
  },
  {
    slug: "iphoneboss-0731",
    name: "蘋果不一家",
    avatarUrl: "/images/avatar-iphoneboss.jpg",
    category: "short-video",
    title: "通訊行連鎖 5 間分店",
    bio: "我經營 5 間通訊行連鎖，並且持續開放加盟。過去店面主要靠路過客和舊客回購，但同業競爭越來越激烈，需要新的獲客管道。\n\n接受羅威傳媒的代操方案後，團隊將通訊行的專業知識轉化為有趣的短影音內容——手機選購指南、業界秘辛、創業日常等，既有實用價值又有娛樂性。所有內容由專業團隊製作，我只需要出鏡配合拍攝。\n\n合作成果：TikTok 粉絲快速成長到 25,800 人，影片總讚數超過 31 萬。加盟詢問量大幅增加，每月都有 3-5 組透過 TikTok 來的加盟諮詢。實體店面的來客數也明顯提升，不少新客進門第一句話就是「我在 TikTok 上看到你們」。短影音成為我們最有效的品牌推廣和加盟招商工具。",
    stats: { followers: "25.8K", likes: "318.6K", platform: "TikTok" },
    order: 7,
  },
  {
    slug: "lw-mary",
    name: "賣珠寶的牧師",
    avatarUrl: "/images/avatar-lw-mary.jpg",
    category: "short-video",
    title: "伯特利皇家珠寶負責人",
    bio: "我經營伯特利皇家珠寶，北中南皆有實體店面，擁有 20 年跨國商戰經驗。珠寶是高信任門檻的產業，過去主要靠老客戶轉介，年輕客群一直很難觸及。\n\n與羅威傳媒合作後，團隊為我打造了「賣珠寶的牧師」這個獨特的個人 IP——結合信仰與誠信經營的形象，在 TikTok 上分享珠寶鑑賞知識和真誠的經營理念。內容策略精準地傳遞了「珠寶界最誠實的牧師」這個品牌定位。\n\n合作成果：成功打開了年輕族群的市場認知，開始有 20-35 歲的新客群透過社群認識我們。品牌形象從傳統珠寶店升級為有溫度、有故事的高端品牌，線上諮詢量穩定成長。",
    stats: { followers: "876", likes: "2934", platform: "TikTok" },
    order: 8,
  },
  {
    slug: "lw-egg",
    name: "冒煙雞蛋糕",
    avatarUrl: "/images/avatar-lw-egg.jpg",
    category: "short-video",
    title: "雞蛋糕品牌創辦人 / 開放加盟",
    bio: "我是冒煙雞蛋糕的創辦人，品牌堅持每日限量 350 顆、只做最高標準。除了自營之外也開放加盟教學，但過去品牌知名度不高，加盟詢問很少。\n\n交給羅威傳媒代操後，團隊用短影音記錄雞蛋糕的製作過程和品牌堅持——從選料、調配到限量出爐的每個環節，讓觀眾感受到「一顆雞蛋糕也值得被認真對待」的品牌精神。影片風格乾淨俐落，強調職人質感。\n\n合作成果：TikTok 帳號成長到 6,658 粉絲，影片總讚數突破 75,000。加盟詢問從幾乎為零到每月穩定收到 5-8 組洽詢，線上訂單也大幅增加。短影音讓小攤車的品牌力升級到連鎖加盟的層次。",
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
