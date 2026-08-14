import { useMemo, useState } from "react";
import {
  PRODUCTS,
  CATEGORY_LABEL,
  ROAST_LABEL,
  type Category,
  type Product,
} from "../data/products";
import { PlusIcon, CheckIcon, RoastMeter, BeanMark, CloseIcon } from "./Icons";
import { Reveal } from "../hooks/motion";

type SortKey = "rec" | "priceAsc" | "priceDesc" | "roastDesc";

const CATEGORIES: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "全部豆单" },
  { key: "single", label: "单品产地" },
  { key: "blend", label: "意式拼配" },
  { key: "drip", label: "挂耳咖啡" },
];

interface ShopProps {
  query: string;
  onClearQuery: () => void;
  loading: boolean;
  category: "all" | Category;
  onCategory: (c: "all" | Category) => void;
  onAdd: (p: Product, variant: number, qty: number) => void;
  onDetail: (p: Product) => void;
}

function ProductCard({
  product,
  index,
  onAdd,
  onDetail,
}: {
  product: Product;
  index: number;
  onAdd: ShopProps["onAdd"];
  onDetail: ShopProps["onDetail"];
}) {
  const [justAdded, setJustAdded] = useState(false);
  const price = product.variants[0].price;

  const quickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(product, 0, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <Reveal delay={(index % 3) * 90} as="article" className="h-full">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onDetail(product)}
        onKeyDown={(e) => e.key === "Enter" && onDetail(product)}
        className="group h-full flex flex-col bg-espresso-850 border border-espresso-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-amberhi-500/50 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-18px_rgba(221,148,51,0.28)] focus-visible:border-amberhi-500/70"
      >
        {/* 图片 */}
        <div className="relative aspect-[4/3] overflow-hidden bg-espresso-800">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/55 via-transparent to-transparent opacity-70" />

          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full ${
                product.badge === "新产季"
                  ? "bg-sage-600 text-crema-50"
                  : "bg-amberhi-500 text-espresso-950"
              }`}
            >
              {product.badge}
            </span>
          )}

          <span className="absolute top-3 right-3 text-[11px] font-medium tracking-wider px-2.5 py-1 rounded-full bg-espresso-950/70 text-crema-200 border border-espresso-700/70 backdrop-blur-sm">
            {CATEGORY_LABEL[product.category]}
          </span>

          {/* 快速加入 */}
          <button
            onClick={quickAdd}
            aria-label={`将 ${product.name} 加入购物篮`}
            className={`absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-300 sm:translate-y-16 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 ${
              justAdded
                ? "bg-sage-600 text-crema-50"
                : "bg-amberhi-500 text-espresso-950 hover:bg-amberhi-400 shadow-amber"
            }`}
          >
            {justAdded ? <CheckIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
            {justAdded ? "已加入" : "加入篮子"}
          </button>
        </div>

        {/* 信息 */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] tracking-[0.18em] text-crema-500">{ROAST_LABEL[product.roast]}</span>
            <RoastMeter level={product.roast} className="text-amberhi-500" />
          </div>

          <h3 className="mt-2.5 font-display font-bold text-lg sm:text-xl text-crema-50 leading-snug group-hover:text-amberhi-400 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-crema-500 tracking-wide">{product.en}</p>

          <div className="mt-3 mb-4 flex flex-wrap gap-1.5">
            {product.flavors.map((f) => (
              <span
                key={f}
                className="text-xs text-crema-300 bg-espresso-800 border border-espresso-700 rounded-full px-2.5 py-1"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 flex items-end justify-between border-t border-espresso-800/80">
            <p className="font-display font-black text-2xl text-amberhi-400">
              <span className="text-base align-top mr-0.5">¥</span>
              {price}
              <span className="text-xs text-crema-500 font-body font-normal ml-1.5">
                / {product.variants[0].label}
              </span>
            </p>
            <span className="text-xs text-crema-500 mb-1">SCA {product.score}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-espresso-850 border border-espresso-800 rounded-xl overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 rounded skeleton" />
        <div className="h-5 w-3/4 rounded skeleton" />
        <div className="h-3 w-1/2 rounded skeleton" />
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-16 rounded-full skeleton" />
          <div className="h-6 w-16 rounded-full skeleton" />
        </div>
        <div className="h-7 w-24 rounded skeleton" />
      </div>
    </div>
  );
}

export default function Shop({ query, onClearQuery, loading, category, onCategory, onAdd, onDetail }: ShopProps) {
  const [sort, setSort] = useState<SortKey>("rec");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const matchCat = category === "all" || p.category === category;
      if (!matchCat) return false;
      if (!q) return true;
      const hay = [p.name, p.en, p.origin, ...p.flavors, CATEGORY_LABEL[p.category], p.process]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
    if (sort === "priceAsc") list = [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
    if (sort === "priceDesc") list = [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
    if (sort === "roastDesc") list = [...list].sort((a, b) => b.roast - a.roast);
    return list;
  }, [query, category, sort]);

  const countFor = (key: "all" | Category) =>
    key === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === key).length;

  return (
    <section id="shop" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
      {/* 标题行 */}
      <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-9">
        <div>
          <p className="text-amberhi-400 text-xs font-medium tracking-[0.3em] mb-3">THE SHELF</p>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-crema-50 tracking-tight">
            在售豆单
            <span className="text-amberhi-400">.</span>
          </h2>
          <p className="mt-3 text-crema-500 text-sm sm:text-base max-w-lg">
            每款豆子均由首席烘焙师杯测通过后方可上架，{query ? `已根据「${query}」筛选` : "滑动查看本周全部出品"}。
          </p>
        </div>
        <p className="font-display text-crema-300 text-sm">
          共 <span className="text-amberhi-400 text-2xl font-bold mx-1">{loading ? "…" : filtered.length}</span> 款
        </p>
      </Reveal>

      {/* 筛选栏 */}
      <Reveal delay={80} className="sticky top-[104px] md:top-[120px] z-30 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 mb-8 bg-espresso-950/90 backdrop-blur-md rounded-none sm:rounded-xl sm:border sm:border-espresso-800/80">
        <div className="flex flex-wrap items-center gap-2.5">
          {CATEGORIES.map((c) => {
            const active = category === c.key;
            return (
              <button
                key={c.key}
                onClick={() => onCategory(c.key)}
                className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-amberhi-500 text-espresso-950 shadow-amber"
                    : "bg-espresso-800 text-crema-300 border border-espresso-700 hover:border-amberhi-500/60 hover:text-amberhi-400"
                }`}
                aria-pressed={active}
              >
                {c.label}
                <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                    active ? "bg-espresso-950/15" : "bg-espresso-700 text-crema-400"
                  }`}
                >
                  {countFor(c.key)}
                </span>
              </button>
            );
          })}

          {/* 排序 */}
          <div className="relative ml-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="appearance-none bg-espresso-800 border border-espresso-700 text-crema-200 text-sm rounded-full pl-5 pr-10 py-2.5 cursor-pointer hover:border-amberhi-500/60 focus:border-amberhi-500 outline-none transition-colors"
              aria-label="排序方式"
            >
              <option value="rec">推荐排序</option>
              <option value="priceAsc">价格从低到高</option>
              <option value="priceDesc">价格从高到低</option>
              <option value="roastDesc">烘焙度从深到浅</option>
            </select>
            <svg viewBox="0 0 24 24" className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-crema-500 pointer-events-none" fill="none" aria-hidden="true">
              <path d="m6 9.5 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Reveal>

      {/* 商品网格 */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center">
          <div className="inline-flex w-20 h-20 rounded-full bg-espresso-800 border border-espresso-700 items-center justify-center text-crema-500 mb-6">
            <BeanMark className="w-9 h-9" />
          </div>
          <h3 className="font-display font-bold text-2xl text-crema-100">没有找到匹配的豆子</h3>
          <p className="mt-2 text-crema-500">试试「耶加雪菲」「黑加仑」「拼配」这样的关键词</p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              onClick={onClearQuery}
              className="flex items-center gap-2 bg-espresso-800 border border-espresso-700 text-crema-200 rounded-full px-5 py-2.5 text-sm hover:border-amberhi-500/60 hover:text-amberhi-400 transition-colors"
            >
              <CloseIcon className="w-4 h-4" /> 清空搜索
            </button>
            <button
              onClick={() => onCategory("all")}
              className="bg-amberhi-500 text-espresso-950 font-bold rounded-full px-5 py-2.5 text-sm hover:bg-amberhi-400 transition-colors"
            >
              查看全部豆单
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onAdd={onAdd} onDetail={onDetail} />
          ))}
        </div>
      )}
    </section>
  );
}
