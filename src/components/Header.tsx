import { useEffect, useRef, useState } from "react";
import { BeanMark, BasketIcon, SearchIcon, CloseIcon } from "./Icons";

interface HeaderProps {
  query: string;
  onQuery: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ query, onQuery, cartCount, onOpenCart }: HeaderProps) {
  const [bump, setBump] = useState(false);
  const prev = useRef(cartCount);

  useEffect(() => {
    if (cartCount > prev.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 400);
      return () => clearTimeout(t);
    }
    prev.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    prev.current = cartCount;
  }, [cartCount]);

  const searchBox = (extra: string) => (
    <div
      className={`group flex items-center gap-2.5 rounded-full bg-espresso-800/80 border border-espresso-700 px-4 py-2.5 transition-colors duration-300 focus-within:border-amberhi-500/70 focus-within:bg-espresso-800 ${extra}`}
    >
      <SearchIcon className="w-4 h-4 text-crema-500 group-focus-within:text-amberhi-400 transition-colors" />
      <input
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="搜索产地、风味或豆名…"
        className="bg-transparent outline-none text-sm text-crema-100 placeholder:text-crema-500/70 w-full"
        aria-label="搜索商品"
      />
      {query && (
        <button
          onClick={() => onQuery("")}
          className="text-crema-500 hover:text-amberhi-400 transition-colors"
          aria-label="清空搜索"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-espresso-950/85 backdrop-blur-md border-b border-espresso-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 h-16 md:h-[72px]">
          {/* 品牌 */}
          <a
            href="#top"
            className="flex items-center gap-2.5 shrink-0 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="w-10 h-10 rounded-full bg-espresso-800 border border-espresso-700 flex items-center justify-center text-amberhi-500 group-hover:border-amberhi-500/60 group-hover:rotate-12 transition-all duration-300">
              <BeanMark className="w-[22px] h-[22px]" />
            </span>
            <span className="leading-none">
              <span className="block font-display font-bold text-lg tracking-wide text-crema-50">拾烘咖啡</span>
              <span className="block text-[10px] tracking-[0.32em] text-crema-500 mt-1">ROASTNOTE</span>
            </span>
          </a>

          {/* 桌面端搜索 */}
          <div className="hidden md:block flex-1 max-w-md ml-auto">{searchBox("")}</div>

          {/* 购物篮 */}
          <button
            onClick={onOpenCart}
            className={`relative flex items-center gap-2 rounded-full border px-4 py-2.5 transition-all duration-300 ml-auto md:ml-0 ${
              cartCount > 0
                ? "bg-amberhi-500 border-amberhi-500 text-espresso-950 hover:bg-amberhi-400 shadow-amber"
                : "bg-espresso-800 border-espresso-700 text-crema-100 hover:border-amberhi-500/60 hover:text-amberhi-400"
            } ${bump ? "scale-110" : "scale-100"}`}
            aria-label={`打开购物篮，当前 ${cartCount} 件商品`}
          >
            <BasketIcon className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">购物篮</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className={`pop-in absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold flex items-center justify-center ${
                  bump ? "bg-espresso-950 text-amberhi-400" : "bg-copper-500 text-crema-50"
                }`}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* 移动端搜索 */}
        <div className="md:hidden pb-3">{searchBox("")}</div>
      </div>
    </header>
  );
}
