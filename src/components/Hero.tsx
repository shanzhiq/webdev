import { HERO_IMAGE, PRODUCTS, ROAST_LABEL } from "../data/products";
import { ArrowIcon, RoastMeter } from "./Icons";
import { useScramble, Reveal } from "../hooks/motion";

const WORDS = ["埃塞俄比亚 耶加雪菲", "肯尼亚 涅里 AA", "哥伦比亚 粉波旁", "云南 保山 厌氧日晒"];

const STATS = [
  { num: "6", unit: "款", label: "在售豆单" },
  { num: "12", unit: "家", label: "合作庄园" },
  { num: "48", unit: "h", label: "烘焙发货" },
];

export default function Hero({ onShop, onStory }: { onShop: () => void; onStory: () => void }) {
  const origin = useScramble(WORDS);
  const featured = PRODUCTS[0];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* 分层环境背景 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[620px] h-[620px] rounded-full bg-amberhi-500/10 blur-[120px]" />
        <div className="absolute top-1/2 -left-48 w-[480px] h-[480px] rounded-full bg-copper-500/10 blur-[110px]" />
        <div className="absolute inset-0 bean-pattern opacity-[0.06]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-[1.04fr_0.96fr] gap-12 lg:gap-16 items-center">
        {/* 左栏：文案 */}
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-amberhi-400 text-xs sm:text-sm font-medium tracking-[0.28em] mb-6">
              <span className="inline-block w-10 h-px bg-amberhi-500/70" />
              SPECIALTY COFFEE ROASTERS · 独立烘焙所
            </p>
          </Reveal>

          <h1 className="font-display font-black text-crema-50 leading-[1.12] text-[2.6rem] sm:text-6xl xl:text-[4.4rem] tracking-tight">
            <span className="mask-line" style={{ "--d": "0.05s" } as React.CSSProperties}>
              <span>当季庄园直采，</span>
            </span>
            <span className="mask-line" style={{ "--d": "0.18s" } as React.CSSProperties}>
              <span>
                每周三<span className="text-amberhi-400">新鲜烘焙</span>，
              </span>
            </span>
            <span className="mask-line" style={{ "--d": "0.31s" } as React.CSSProperties}>
              <span>48 小时直达你的杯。</span>
            </span>
          </h1>

          <Reveal delay={380}>
            <p className="mt-7 text-crema-300 text-base sm:text-lg leading-relaxed max-w-xl">
              拾烘是一家只做小批量的精品咖啡烘焙所，每一批生豆都经首席烘焙师逐杯杯测。
              本周炉上正烘 ——
              <span className="font-display font-semibold text-amberhi-400 mx-1 inline-block min-w-[11em]">
                {origin}
              </span>
              ，下单后 48 小时内完成烘焙并发出。
            </p>
          </Reveal>

          <Reveal delay={480}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={onShop}
                className="group flex items-center gap-2.5 bg-amberhi-500 text-espresso-950 font-bold px-7 py-3.5 rounded-full shadow-amber hover:bg-amberhi-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                选购豆单
                <ArrowIcon className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onStory}
                className="flex items-center gap-2.5 border border-espresso-600 text-crema-100 px-7 py-3.5 rounded-full hover:border-amberhi-500/70 hover:text-amberhi-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                了解拾烘
              </button>
            </div>
          </Reveal>

          <Reveal delay={580}>
            <dl className="mt-12 pt-7 border-t border-espresso-800 flex gap-10 sm:gap-14">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display font-bold text-3xl sm:text-4xl text-crema-50">
                    {s.num}
                    <span className="text-amberhi-400 text-xl sm:text-2xl ml-0.5">{s.unit}</span>
                  </dd>
                  <dd className="mt-1.5 text-xs sm:text-sm text-crema-500 tracking-wider">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* 右栏：拱形影像 */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
          <div className="relative">
            {/* 旋转印章 */}
            <div className="absolute -top-7 -left-4 sm:-left-8 z-20 w-24 h-24 sm:w-28 sm:h-28 text-amberhi-400">
              <svg viewBox="0 0 100 100" className="w-full h-full spin-slow" style={{ animation: "spin 22s linear infinite" }} aria-hidden="true">
                <defs>
                  <path id="stamp-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                </defs>
                <circle cx="50" cy="50" r="47" fill="var(--color-espresso-900)" stroke="var(--color-espresso-700)" />
                <text fontSize="10.5" letterSpacing="2.5" fill="currentColor" fontFamily="Fraunces, serif">
                  <textPath href="#stamp-circle">ROASTNOTE · FRESH WEEKLY · 拾烘出品 ·</textPath>
                </text>
              </svg>
              <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto w-7 h-7" fill="none" aria-hidden="true">
                <path d="M12 3c-4.4 0-8 4-8 9s3.6 9 8 9 8-4 8-9-3.6-9-8-9Zm0 2.2c1.4 2 1.4 5 0 7s-1.4 5 0 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>

            {/* 拱形图片 */}
            <div className="relative rounded-t-[999px] rounded-b-[26px] overflow-hidden border border-espresso-700 shadow-2xl shadow-black/50">
              <img
                src={HERO_IMAGE}
                alt="一杯刚冲好的手冲咖啡，热气缓缓升起"
                className="kenburns w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-espresso-950/10 pointer-events-none" />

              {/* 蒸汽 */}
              <div className="absolute top-[16%] left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <svg
                    key={i}
                    viewBox="0 0 20 60"
                    className="steam-wisp absolute w-5 h-14 text-crema-100/70"
                    style={{ animationDelay: `${i * 1.3}s`, left: `${(i - 1) * 18}px` }}
                  >
                    <path
                      d="M10 56c-5-8 5-12 0-20s5-12 0-20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                ))}
              </div>
            </div>

            {/* 今日烘焙浮卡 */}
            <div className="floaty absolute -bottom-6 -left-3 sm:-left-8 z-20 bg-espresso-900/95 border border-espresso-700 rounded-xl px-5 py-4 shadow-xl shadow-black/40 backdrop-blur-sm" style={{ "--r": "-3deg" } as React.CSSProperties}>
              <p className="text-[10px] tracking-[0.3em] text-amberhi-400 font-medium">今日烘焙 TODAY'S ROAST</p>
              <p className="mt-1.5 font-display font-semibold text-crema-50 text-base sm:text-lg">{featured.name}</p>
              <div className="mt-1.5 flex items-center gap-3 text-crema-400 text-xs">
                <RoastMeter level={featured.roast} className="text-amberhi-500" />
                <span>{ROAST_LABEL[featured.roast]}</span>
              </div>
            </div>

            {/* SCA 评分章 */}
            <div className="absolute top-[38%] -right-3 sm:-right-6 z-20 bg-sage-600/90 text-crema-50 rounded-lg px-4 py-2.5 shadow-lg rotate-3 border border-sage-400/30">
              <p className="font-display font-bold text-xl leading-none">{featured.score}</p>
              <p className="text-[10px] tracking-widest mt-1 opacity-80">SCA 杯测分</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
