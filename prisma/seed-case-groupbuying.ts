import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  await prisma.case.upsert({
    where: { slug: "groupbuying-ihome" },
    update: {
      name: "愛嘉行銷",
      avatarUrl: "/images/avatar-groupbuying.png",
      category: "short-video",
      title: "B2B B2C 大型團購倉儲",
      bio: "大家好，我們是愛嘉行銷股份有限公司，公司位在台南市關廟區南雄路一段552號，是一間合法登記的進口商。\n\n我們主要在做什麼呢？簡單來說，就是幫大家把國外好的商品帶進台灣，用最實惠的價格提供給消費者。我們不只是一般的貿易商，更是一間有規模、有制度的行銷公司。光是倉儲空間，我們就有將近1500坪的倉庫在幫大家囤貨，所以不管是個人消費還是團購批發，我們都有辦法穩定供貨，不怕缺貨。\n\n我們的營業時間是週一到週五，早上八點半到下午五點半，中午十二點到一點是午休時間。如果有任何問題，都可以打電話 06-2794467 跟我們聯繫，或者寄信到 ihome529529@gmail.com，我們都會盡快回覆。\n\n為了讓老客戶享受到更好的優惠，我們特別設計了一套VIP會員制度。只要加入我們的VIP，就能用會員專屬價格購買商品。我們每個月20號都會定期開放VIP賣場，讓會員們搶先選購最新、最划算的商品，目前VIP卡的費用是一年3000元。\n\n除了線上購物平台之外，我們也提供團購批發的服務。不管你是公司行號想要大量採購，還是一群朋友想要揪團買，我們都很歡迎，量大還可以再談更優惠的價格。\n\n我們一直秉持著「把好東西用好價格帶給大家」的理念在經營。身為合法進口商，每一樣商品的來源我們都嚴格把關，讓大家買得安心、用得放心。未來我們也會持續引進更多優質的商品，服務更多的客戶。\n\n歡迎大家來認識愛嘉行銷，不管是線上逛逛我們的賣場，還是直接打電話來聊聊，我們都非常樂意為您服務！",
      stats: { warehouse: "1500坪", vip: "月月開團", type: "進口商" },
      order: 10,
    },
    create: {
      slug: "groupbuying-ihome",
      name: "愛嘉行銷",
      avatarUrl: "/images/avatar-groupbuying.png",
      category: "short-video",
      title: "B2B B2C 大型團購倉儲",
      bio: "大家好，我們是愛嘉行銷股份有限公司，公司位在台南市關廟區南雄路一段552號，是一間合法登記的進口商。\n\n我們主要在做什麼呢？簡單來說，就是幫大家把國外好的商品帶進台灣，用最實惠的價格提供給消費者。我們不只是一般的貿易商，更是一間有規模、有制度的行銷公司。光是倉儲空間，我們就有將近1500坪的倉庫在幫大家囤貨，所以不管是個人消費還是團購批發，我們都有辦法穩定供貨，不怕缺貨。\n\n我們的營業時間是週一到週五，早上八點半到下午五點半，中午十二點到一點是午休時間。如果有任何問題，都可以打電話 06-2794467 跟我們聯繫，或者寄信到 ihome529529@gmail.com，我們都會盡快回覆。\n\n為了讓老客戶享受到更好的優惠，我們特別設計了一套VIP會員制度。只要加入我們的VIP，就能用會員專屬價格購買商品。我們每個月20號都會定期開放VIP賣場，讓會員們搶先選購最新、最划算的商品，目前VIP卡的費用是一年3000元。\n\n除了線上購物平台之外，我們也提供團購批發的服務。不管你是公司行號想要大量採購，還是一群朋友想要揪團買，我們都很歡迎，量大還可以再談更優惠的價格。\n\n我們一直秉持著「把好東西用好價格帶給大家」的理念在經營。身為合法進口商，每一樣商品的來源我們都嚴格把關，讓大家買得安心、用得放心。未來我們也會持續引進更多優質的商品，服務更多的客戶。\n\n歡迎大家來認識愛嘉行銷，不管是線上逛逛我們的賣場，還是直接打電話來聊聊，我們都非常樂意為您服務！",
      stats: { warehouse: "1500坪", vip: "月月開團", type: "進口商" },
      order: 10,
      visible: true,
    },
  });

  console.log("Case seeded: groupbuying-ihome");
  await prisma.$disconnect();
}

main().catch(console.error);
