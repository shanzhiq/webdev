const ITEMS = [
  "每周三新鲜烘焙",
  "满 ¥199 顺丰包邮",
  "下单后 48 小时内发出",
  "SCA 84+ 精品批次",
  "生豆庄园直采",
  "支持 7 天无忧退换",
];

function BeanDot() {
  return (
    <svg viewBox="0 0 16 16" className="w-3 h-3 shrink-0" aria-hidden="true">
      <path
        d="M8 2c-3 0-5.3 2.7-5.3 6S5 14 8 14s5.3-2.7 5.3-6S11 2 8 2Zm0 1.6c1 1.5 1 3.4 0 4.9s-1 3.5 0 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Ticker() {
  const row = (key: string) => (
    <div key={key} className="flex items-center shrink-0" aria-hidden={key === "b"}>
      {ITEMS.map((item) => (
        <span key={`${key}-${item}`} className="flex items-center gap-3 px-5 py-2 text-[13px] font-medium tracking-wide whitespace-nowrap">
          <BeanDot />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="ticker-shell bg-amberhi-500 text-espresso-950 overflow-hidden border-b border-amberhi-600/40">
      <div className="ticker-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
