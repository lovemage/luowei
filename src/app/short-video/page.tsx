import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import PainPointHook from "@/components/PainPointHook";
import ComparisonTable from "@/components/ComparisonTable";
import FAQAccordion from "@/components/FAQAccordion";
import RegistrationForm from "@/components/RegistrationForm";

const phases = [
  {
    number: "01",
    title: "基礎紮根 -- 數據驅動的品牌成長系統",
    desc: "演算法破解 + 高頻產出",
    details: [
      "深度拆解平台演算法，掌握流量密碼",
      "建立高頻內容產出機制，持續累積品牌聲量",
      "透過數據回饋，快速迭代內容方向",
    ],
  },
  {
    number: "02",
    title: "靈魂定位 -- 人設設定",
    desc: "打造不可取代的品牌人格",
    details: [
      "視覺符號 -- 建立一眼可辨識的品牌視覺體系",
      "語言風格 -- 形成獨特的表達方式與口頭禪",
      "專家權威 -- 透過專業內容建立行業話語權",
      "價值觀輸出 -- 讓受眾認同你的理念，產生深度連結",
    ],
  },
  {
    number: "03",
    title: "模組化執行 -- 4 步驟高效產出",
    desc: "從策略到成品，全流程標準化",
    details: [
      "策略會議 -- 確認月度主題與內容方向",
      "腳本開發 -- 撰寫符合演算法邏輯的爆款腳本",
      "高效拍攝 -- 一次拍攝多支素材，最大化效率",
      "後製精修 -- 節奏、字幕、音效全方位打磨",
    ],
  },
  {
    number: "04",
    title: "目標產值 -- 數據指標",
    desc: "用數字衡量成果",
    details: [
      "流量 100k+ -- 單月曝光突破十萬",
      "互動率 200% -- 留言、分享、收藏全面提升",
      "品牌聯想 -- 讓受眾提到品類就想到你",
      "流量變現 -- 將觀看轉化為實際營收",
    ],
  },
];

const whyChooseUs = [
  {
    number: "01",
    title: "AI 技術賦能",
    desc: "使用最新 AI 工具優化文案與素材處理，效率翻倍",
  },
  {
    number: "02",
    title: "轉換思維導向",
    desc: "每支影片的目標都是「轉換」，不只是好看",
  },
  {
    number: "03",
    title: "生態整合服務",
    desc: "影片 + Landing Page + 自動化客服，一站式整合",
  },
];

const comparisonItems = [
  { label: "內容品質", left: "缺乏專業，品質不穩定", right: "專業團隊，品質保證" },
  { label: "時間成本", left: "每天花 3-5 小時", right: "只需 1 次策略會議/月" },
  { label: "演算法", left: "靠感覺猜測", right: "數據驅動，精準破解" },
  { label: "產出量", left: "一個月 2-4 支", right: "一個月 12-20 支" },
  { label: "變現能力", left: "不知如何導流", right: "完整流量變現閉環" },
];

export default async function ShortVideoPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { pageSlug: "short-video" },
    orderBy: { order: "asc" },
  });

  return (
    <main className="relative z-10 flex min-h-dvh flex-col px-6 pt-10 pb-12">
      {/* Back link */}
      <Link
        href="/"
        className="animate-fade-in self-start text-sm text-text-secondary hover:text-accent transition-colors mb-6"
      >
        &larr; 返回
      </Link>

      {/* Hero */}
      <HeroSection
        title="全方位短影音品牌代操計畫"
        subtitle="從 0 到 1，將點擊轉化為真實的品牌影響力"
      />

      {/* Pain Points */}
      <PainPointHook
        title="你是否也面臨這些困境？"
        points={[
          "空有產品卻沒流量 -- 廣告費越來越貴，投報率卻直線下滑",
          "想做影音卻沒方向 -- 拍了幾支片卻沒人看，完全不知道演算法要什麼",
          "團隊人力成本太高 -- 找企劃、攝影、剪輯、營運，每月薪資支出驚人",
          "有流量卻無法變現 -- 讚數很多，但私訊詢問度卻是零",
        ]}
      />

      {/* Four Service Phases */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          四大執行階段
        </h2>
        {phases.map((phase) => (
          <div
            key={phase.number}
            className="bg-bg-surface border border-divider rounded-xl p-5 mb-4"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-2xl font-bold text-accent tracking-wider">
                {phase.number}
              </span>
              <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-sm font-bold text-text-primary">
                {phase.title}
              </h3>
            </div>
            <p className="text-xs text-text-secondary mb-3 leading-[1.8]">
              {phase.desc}
            </p>
            <ul className="flex flex-col gap-1.5">
              {phase.details.map((detail) => (
                <li
                  key={detail}
                  className="text-xs text-text-secondary leading-[1.8] pl-3 relative before:content-['-'] before:absolute before:left-0 before:text-text-secondary/50"
                >
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Comparison Table */}
      <ComparisonTable
        title="為什麼選擇專業代操？"
        leftLabel="自己做"
        rightLabel="交給我們"
        items={comparisonItems}
      />

      {/* Why Choose Us */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          為什麼選擇我們
        </h2>
        <div className="flex flex-col gap-4">
          {whyChooseUs.map((item) => (
            <div
              key={item.number}
              className="bg-bg-surface border border-divider rounded-xl p-5"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl font-bold text-accent tracking-wider">
                  {item.number}
                </span>
                <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-sm font-bold text-text-primary">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-[1.8]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion title="常見問題" items={faqs} />

      {/* Registration Form */}
      <RegistrationForm
        courseOptions={["品牌啟航方案", "流量爆發方案", "行業壟斷方案"]}
      />

      {/* CTA Section */}
      <section className="animate-fade-up mb-12 rounded-xl bg-bg-surface border border-divider p-6 text-center">
        <p className="font-[family-name:var(--font-noto-serif-tc)] text-sm font-bold text-text-primary mb-3 leading-[1.8]">
          名額有限，每月僅接 3 位深度合作客戶
        </p>
        <Link
          href="https://lin.ee/htTdJSH"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full rounded-full border-2 border-accent bg-transparent py-3.5 text-center text-sm font-semibold text-accent tracking-wider transition-colors duration-200 hover:bg-accent hover:text-bg-primary"
        >
          立即透過 LINE 諮詢
        </Link>
      </section>

      {/* Back link bottom */}
      <Link
        href="/"
        className="self-start text-sm text-text-secondary hover:text-accent transition-colors"
      >
        &larr; 返回首頁
      </Link>
    </main>
  );
}
