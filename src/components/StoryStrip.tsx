import { Reveal } from "../hooks/motion";
import { ArrowIcon } from "./Icons";

const WORDS = ["新鲜烘焙", "SINGLE ORIGIN", "小批量出品", "48H 发货", "逐批杯测", "FRESH ROASTED"];

const STEPS = [
  { num: "01", title: "选豆下单", desc: "浏览豆单，选择规格与数量" },
  { num: "02", title: "周三开炉", desc: "首席烘焙师按订单小批量烘焙" },
  { num: "03", title: "48h 到家", desc: "单向排气阀锁鲜，顺丰冷链直发" },
];

export default function StoryStrip() {
  return (
    <section id="story" className="relative border-y border-espresso-800 bg-espresso-900/60">
      {/* 大字跑马灯 */}
      <div className="ticker-shell overflow-hidden py-5 border-b border-espresso-800/70" aria-hidden="true">
        <div className="ticker-track reverse items-center">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {WORDS.map((w, i) => (
                <span key={`${dup}-${w}`} className="flex items-center">
                  <span
                    className={`font-display font-black text-2xl sm:text-4xl tracking-tight px-6 whitespace-nowrap ${
                      i % 2 === 0 ? "text-crema-50" : "text-transparent [-webkit-text-stroke:1px_var(--color-crema-500)]"
                    }`}
                  >
                    {w}
                  </span>
                  <svg viewBox="0 0 16 16" className="w-4 h-4 text-amberhi-500 shrink-0" fill="none">
                    <path
                      d="M8 2c-3 0-5.3 2.7-5.3 6S5 14 8 14s5.3-2.7 5.3-6S11 2 8 2Zm0 1.6c1 1.5 1 3.4 0 4.9s-1 3.5 0 5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 三步流程 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-9">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-12">
            <p className="font-display font-bold text-xl sm:text-2xl text-crema-50 shrink-0 lg:border-r lg:border-espresso-700 lg:pr-12">
              从下单到出杯，
              <br className="hidden sm:block" />
              <span className="text-amberhi-400">三步</span>而已
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-0 flex-1">
              {STEPS.map((s, i) => (
                <div key={s.num} className="flex sm:contents">
                  <div className="flex items-start gap-4 sm:block sm:flex-1 sm:pr-8 group">
                    <span className="font-display font-black text-amberhi-500/80 text-3xl leading-none group-hover:text-amberhi-400 transition-colors">
                      {s.num}
                    </span>
                    <div className="sm:mt-2">
                      <p className="font-semibold text-crema-100">{s.title}</p>
                      <p className="text-sm text-crema-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ArrowIcon className="hidden sm:block w-5 h-5 text-espresso-600 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
