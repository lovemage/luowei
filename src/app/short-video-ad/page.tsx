import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import PainPointHook from "@/components/PainPointHook";
import ComparisonTable from "@/components/ComparisonTable";
import FAQAccordion from "@/components/FAQAccordion";
import RegistrationForm from "@/components/RegistrationForm";

const serviceHighlights = [
  {
    number: "01",
    title: "全平台策略佈局",
    desc: "Meta (FB/IG)、Google、TikTok 之間建立最強流量閉環",
  },
  {
    number: "02",
    title: "AI 驅動受眾精準定位",
    desc: "比競爭對手更早挖掘高潛力「準客戶」",
  },
  {
    number: "03",
    title: "文案與素材雙重夾擊",
    desc: "前 3 秒留住用戶，直擊痛點引導轉換",
  },
];

const timelineSteps = [
  {
    number: "01",
    title: "深度診斷",
    desc: "分析帳號體質與競爭對手",
    result: "一份清晰的流量獲取策略",
  },
  {
    number: "02",
    title: "動態優化",
    desc: "每日監控數據，調整出價與受眾",
    result: "預算最大化利用",
  },
  {
    number: "03",
    title: "定期彙報",
    desc: "每月數據回顧與下階段建議",
    result: "掌控全局，規模化成長",
  },
];

const comparisonItems = [
  { label: "策略", left: "按加強推廣碰運氣", right: "全平台策略佈局" },
  { label: "受眾", left: "廣泛投放，浪費預算", right: "AI 精準定位準客戶" },
  { label: "優化", left: "投完就放著", right: "每日監控動態調整" },
  { label: "數據", left: "看不懂後台", right: "透明化報表，清楚每分錢" },
  { label: "成效", left: "不確定 ROAS", right: "目標導向，持續提升" },
];

const dashboardMetrics = [
  { label: "ROAS 目標", value: "5x+" },
  { label: "月觸及人數", value: "100K+" },
  { label: "轉換成本降低", value: "40%" },
];

export default async function ShortVideoAdPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { pageSlug: "short-video-ad" },
    orderBy: { order: "asc" },
  });

  return (
    <main className="relative z-10 flex min-h-dvh flex-col px-6 pt-10 pb-12">
      {/* Back link */}
      <Link
        href="/"
        className="animate-fade-in self-start text-sm text-text-secondary transition-colors active:text-accent mb-6"
      >
        ← 返回
      </Link>

      {/* Hero */}
      <HeroSection
        title="精準投流，讓每一分預算都成為品牌成長的燃料"
        subtitle="數據導向，業績導向，更是夥伴導向"
      />

      {/* Pain Points */}
      <PainPointHook
        title="你也正在為了這些數字頭痛嗎？"
        points={[
          "廣告費越來越貴 — 點擊次數不少，但真正下單的沒幾個",
          "後台數據看不懂 — ROAS、像素、轉換率，一堆術語讓人頭大",
          "受眾抓不準 — 廣告總是投給不對的人，白白燒掉血汗錢",
        ]}
      />

      {/* Service Highlights */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
          核心優勢
        </h2>
        <div className="flex flex-col gap-4">
          {serviceHighlights.map((item) => (
            <div
              key={item.number}
              className="bg-bg-surface rounded-xl p-5"
            >
              <span className="text-xs font-semibold text-accent tracking-wider">
                {item.number}
              </span>
              <h3 className="text-sm font-bold text-text-primary mt-2 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-[1.8]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline / Steps */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
          合作三部曲
        </h2>
        <div className="relative flex flex-col">
          {timelineSteps.map((step, i) => (
            <div key={step.number} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Vertical line */}
              {i < timelineSteps.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 border-l-2 border-divider" />
              )}
              {/* Number circle */}
              <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                {step.number}
              </div>
              {/* Content card */}
              <div className="flex-1 bg-bg-surface rounded-xl p-4">
                <h3 className="text-sm font-bold text-text-primary mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-[1.8] mb-2">
                  {step.desc}
                </p>
                <p className="text-xs text-accent leading-[1.6]">
                  → {step.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable
        title="專業代操的差異"
        leftLabel="自己投廣告"
        rightLabel="專業代操"
        items={comparisonItems}
      />

      {/* Data Transparency - Dashboard Metrics */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
          數據透明，成效看得見
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {dashboardMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-bg-surface rounded-xl p-4 text-center"
            >
              <p className="text-xl font-bold text-accent mb-1">
                {metric.value}
              </p>
              <p className="text-[11px] text-text-secondary leading-[1.6]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion title="常見問題" items={faqs} />

      {/* Registration Form */}
      <RegistrationForm courseOptions={["廣告投放代操"]} />

      {/* CTA Section */}
      <section className="animate-fade-up mb-12 text-center">
        <p className="font-[family-name:var(--font-noto-serif-tc)] text-base font-bold text-text-primary leading-[1.8] mb-6">
          廣告投放不需要豪賭，只需要專業的引路人
        </p>
        <a
          href="https://line.me/ti/p/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full rounded-lg bg-accent py-3.5 text-center text-sm font-semibold text-white tracking-wider transition-colors duration-200 hover:bg-accent-hover"
        >
          預約免費廣告診斷
        </a>
      </section>

      {/* Back link bottom */}
      <Link
        href="/"
        className="self-start text-sm text-text-secondary transition-colors active:text-accent"
      >
        ← 返回首頁
      </Link>
    </main>
  );
}
