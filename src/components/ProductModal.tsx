import { useEffect, useState } from "react";
import { CATEGORY_LABEL, ROAST_LABEL, type Product } from "../data/products";
import {
  CloseIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  RoastMeter,
  PinIcon,
  LeafIcon,
  MountainIcon,
  DropIcon,
  ThermoIcon,
  ScaleIcon,
  GrinderIcon,
  BasketIcon,
} from "./Icons";

interface Props {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, variant: number, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: Props) {
  const [variant, setVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setVariant(0);
    setQty(1);
    setAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const price = product.variants[variant].price;

  const handleAdd = () => {
    onAdd(product, variant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const attrs = [
    { icon: PinIcon, label: "产地", value: product.origin },
    { icon: LeafIcon, label: "处理法", value: product.process },
    { icon: MountainIcon, label: "海拔", value: product.altitude },
    { icon: DropIcon, label: "品种", value: product.variety },
  ];

  const brews = [
    { icon: ThermoIcon, label: "水温", value: product.brew.temp },
    { icon: ScaleIcon, label: "粉水比", value: product.brew.ratio },
    { icon: GrinderIcon, label: "研磨", value: product.brew.grind },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={product.name}>
      <div className="absolute inset-0 bg-espresso-950/85 backdrop-blur-sm fade-in" onClick={onClose} />

      <div className="modal-in relative w-full sm:max-w-4xl bg-espresso-900 border border-espresso-700 sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl shadow-black/60 max-h-[94vh] sm:max-h-[88vh] flex flex-col">
        <button
          onClick={onClose}
          aria-label="关闭详情"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-espresso-950/70 border border-espresso-700 text-crema-200 flex items-center justify-center hover:text-amberhi-400 hover:border-amberhi-500/60 hover:rotate-90 transition-all duration-300"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="grid sm:grid-cols-[0.92fr_1.08fr] overflow-y-auto">
          {/* 图片 */}
          <div className="relative h-64 sm:h-auto sm:min-h-[560px] shrink-0 overflow-hidden">
            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/50 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-espresso-900/40" />
            {product.badge && (
              <span
                className={`absolute top-4 left-4 text-xs font-bold tracking-wider px-3.5 py-1.5 rounded-full ${
                  product.badge === "新产季" ? "bg-sage-600 text-crema-50" : "bg-amberhi-500 text-espresso-950"
                }`}
              >
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-4 left-4 bg-espresso-950/75 backdrop-blur-sm border border-espresso-700 rounded-lg px-3.5 py-2.5">
              <p className="text-[10px] tracking-[0.25em] text-crema-400">SCA 杯测分</p>
              <p className="font-display font-black text-xl text-amberhi-400 leading-tight">{product.score}</p>
            </div>
          </div>

          {/* 内容 */}
          <div className="p-6 sm:p-8 flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-wider">
                <span className="text-amberhi-400 font-medium">{CATEGORY_LABEL[product.category]}</span>
                <span className="w-1 h-1 rounded-full bg-espresso-600" />
                <span className="text-crema-500">{ROAST_LABEL[product.roast]}</span>
                <RoastMeter level={product.roast} className="text-amberhi-500 ml-auto" />
              </div>
              <h3 className="mt-3 font-display font-black text-2xl sm:text-3xl text-crema-50 leading-tight">{product.name}</h3>
              <p className="mt-1 text-sm text-crema-500 tracking-wide">{product.en}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.flavors.map((f) => (
                <span key={f} className="text-xs font-medium text-amberhi-400 bg-amberhi-500/10 border border-amberhi-500/30 rounded-full px-3 py-1.5">
                  # {f}
                </span>
              ))}
            </div>

            <p className="text-sm leading-relaxed text-crema-300">{product.desc}</p>

            {/* 产地档案 */}
            <div className="grid grid-cols-2 gap-px bg-espresso-800 border border-espresso-800 rounded-xl overflow-hidden">
              {attrs.map((a) => (
                <div key={a.label} className="bg-espresso-850 px-4 py-3 flex items-start gap-3 hover:bg-espresso-800 transition-colors">
                  <a.icon className="w-[18px] h-[18px] text-amberhi-500 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.2em] text-crema-500">{a.label}</p>
                    <p className="text-[13px] text-crema-100 mt-0.5 leading-snug">{a.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 规格 */}
            <div>
              <p className="text-xs tracking-[0.2em] text-crema-500 mb-2.5">选择规格</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.label}
                    onClick={() => setVariant(i)}
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium border transition-all duration-300 ${
                      i === variant
                        ? "bg-amberhi-500 border-amberhi-500 text-espresso-950 shadow-amber"
                        : "bg-espresso-850 border-espresso-700 text-crema-300 hover:border-amberhi-500/60 hover:text-amberhi-400"
                    }`}
                    aria-pressed={i === variant}
                  >
                    {v.label}
                    <span className={`ml-2 font-display font-bold ${i === variant ? "text-espresso-950" : "text-amberhi-400"}`}>
                      ¥{v.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 数量 + 加入 */}
            <div className="flex items-stretch gap-3">
              <div className="flex items-center rounded-full border border-espresso-700 bg-espresso-850 px-1.5">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="w-10 h-11 flex items-center justify-center text-crema-300 hover:text-amberhi-400 disabled:opacity-30 disabled:hover:text-crema-300 transition-colors"
                  aria-label="减少数量"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span key={qty} className="pop-in w-8 text-center font-display font-bold text-lg text-crema-50">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="w-10 h-11 flex items-center justify-center text-crema-300 hover:text-amberhi-400 transition-colors"
                  aria-label="增加数量"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2.5 rounded-full font-bold text-base transition-all duration-300 ${
                  added
                    ? "bg-sage-600 text-crema-50"
                    : "bg-amberhi-500 text-espresso-950 hover:bg-amberhi-400 shadow-amber hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                {added ? (
                  <>
                    <CheckIcon className="w-5 h-5" /> 已加入购物篮
                  </>
                ) : (
                  <>
                    <BasketIcon className="w-5 h-5" /> 加入购物篮 · ¥{price * qty}
                  </>
                )}
              </button>
            </div>

            {/* 冲煮建议 */}
            <div className="mt-1 border-t border-espresso-800 pt-5">
              <p className="text-xs tracking-[0.25em] text-crema-500 mb-3">冲煮建议 BREW GUIDE</p>
              <div className="grid grid-cols-3 gap-2">
                {brews.map((b) => (
                  <div key={b.label} className="bg-espresso-850 border border-espresso-800 rounded-lg px-3 py-3 text-center hover:border-amberhi-500/40 transition-colors">
                    <b.icon className="w-5 h-5 text-amberhi-500 mx-auto" />
                    <p className="mt-1.5 text-[10px] tracking-widest text-crema-500">{b.label}</p>
                    <p className="mt-0.5 text-xs font-medium text-crema-100 leading-snug">{b.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
