import { useState } from "react";
import type { Category } from "../data/products";
import { BeanMark, ArrowIcon, CheckIcon, PinIcon, ThermoIcon } from "./Icons";
import { Reveal } from "../hooks/motion";

interface Props {
  onCategory: (c: "all" | Category) => void;
  onGoShop: () => void;
}

const NAV: { label: string; cat: "all" | Category }[] = [
  { label: "全部豆单", cat: "all" },
  { label: "单品产地", cat: "single" },
  { label: "意式拼配", cat: "blend" },
  { label: "挂耳咖啡", cat: "drip" },
];

export default function Footer({ onCategory, onGoShop }: Props) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subErr, setSubErr] = useState("");

  const subscribe = () => {
    if (!/^[\w.+-]+@[\w-]+\.[\w.]{2,}$/.test(email.trim())) {
      setSubErr("请输入有效的邮箱地址");
      return;
    }
    setSubErr("");
    setSubscribed(true);
  };

  const goNav = (cat: "all" | Category) => {
    onCategory(cat);
    onGoShop();
  };

  return (
    <footer className="relative border-t border-espresso-800 bg-espresso-900/70 mt-8">
      <div className="absolute inset-0 bean-pattern opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <Reveal className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-12 lg:grid-cols-[1.25fr_0.8fr_1fr]">
        {/* 品牌 + 订阅 */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-full bg-espresso-800 border border-espresso-700 flex items-center justify-center text-amberhi-500">
              <BeanMark className="w-[22px] h-[22px]" />
            </span>
            <span className="leading-none">
              <span className="block font-display font-bold text-lg text-crema-50">拾烘咖啡</span>
              <span className="block text-[10px] tracking-[0.32em] text-crema-500 mt-1">ROASTNOTE</span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-crema-400 max-w-sm">
            拾烘成立于 2019 年，是一家坚持小批量、按单烘焙的独立精品咖啡烘焙所。我们相信，新鲜是风味的前提，而风味值得被认真对待。
          </p>

          <p className="mt-7 text-xs tracking-[0.25em] text-crema-500">订阅烘焙日志 ROAST LOG</p>
          {subscribed ? (
            <p className="mt-3 flex items-center gap-2 text-sm text-sage-300 font-medium pop-in">
              <CheckIcon className="w-4 h-4" /> 订阅成功！每周五的烘焙日志将准时送达
            </p>
          ) : (
            <>
              <div className="mt-3 flex max-w-sm">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubErr("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && subscribe()}
                  placeholder="you@example.com"
                  className="flex-1 bg-espresso-850 border border-espresso-700 border-r-0 rounded-l-full px-4 py-2.5 text-sm text-crema-100 placeholder:text-crema-500/60 outline-none focus:border-amberhi-500/70 transition-colors"
                  aria-label="订阅邮箱"
                />
                <button
                  onClick={subscribe}
                  className="bg-amberhi-500 text-espresso-950 rounded-r-full px-5 font-bold text-sm hover:bg-amberhi-400 transition-colors"
                >
                  订阅
                </button>
              </div>
              {subErr && <p className="mt-2 text-xs text-warmred-400">{subErr}</p>}
            </>
          )}
        </div>

        {/* 豆单导航 */}
        <nav aria-label="豆单分类">
          <p className="text-xs tracking-[0.25em] text-crema-500">豆单导航</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((n) => (
              <li key={n.cat}>
                <button
                  onClick={() => goNav(n.cat)}
                  className="group flex items-center gap-2 text-sm text-crema-300 hover:text-amberhi-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-espresso-600 group-hover:bg-amberhi-500 transition-colors" />
                  {n.label}
                  <ArrowIcon className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 烘焙所信息 */}
        <div>
          <p className="text-xs tracking-[0.25em] text-crema-500">拾烘烘焙所</p>
          <ul className="mt-4 space-y-3.5 text-sm text-crema-300">
            <li className="flex items-start gap-3">
              <PinIcon className="w-4 h-4 text-amberhi-500 mt-0.5 shrink-0" />
              <span>上海市静安区昌平路 989 号 A 栋 102（线下杯测室每周六开放）</span>
            </li>
            <li className="flex items-start gap-3">
              <ThermoIcon className="w-4 h-4 text-amberhi-500 mt-0.5 shrink-0" />
              <span>
                每周三 09:00 开炉烘焙
                <span className="block text-xs text-crema-500 mt-0.5">订单截至于周二 22:00</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BeanMark className="w-4 h-4 text-amberhi-500 mt-0.5 shrink-0" />
              <span>
                微信公众号 · 拾烘 ROASTNOTE
                <span className="block text-xs text-crema-500 mt-0.5">冲煮问题欢迎随时留言，烘焙师在线答疑</span>
              </span>
            </li>
          </ul>
        </div>
      </Reveal>

      <div className="relative border-t border-espresso-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-crema-500">
          <p>© 2026 拾烘咖啡 ROASTNOTE · 用心烘焙每一批豆子</p>
          <p>本页面为前端演示项目 · 所有商品与交易均为模拟</p>
        </div>
      </div>
    </footer>
  );
}
