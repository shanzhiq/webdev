import { useEffect } from "react";
import { FREE_SHIPPING_AT, SHIPPING_FEE, type Product } from "../data/products";
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon, TruckIcon, CheckIcon, BasketIcon, ArrowIcon } from "./Icons";

export interface ResolvedItem {
  key: string;
  product: Product;
  variant: number;
  qty: number;
}

interface Props {
  open: boolean;
  items: ResolvedItem[];
  onClose: () => void;
  onSetQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
  onGoShop: () => void;
}

export default function CartDrawer({ open, items, onClose, onSetQty, onRemove, onCheckout, onGoShop }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.product.variants[i.variant].price * i.qty, 0);
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_AT) * 100));

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="购物篮">
      <div className="absolute inset-0 bg-espresso-950/80 backdrop-blur-sm fade-in" onClick={onClose} />

      <aside className="drawer-in absolute right-0 top-0 h-full w-full max-w-md bg-espresso-900 border-l border-espresso-700 shadow-2xl shadow-black/60 flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 h-[68px] border-b border-espresso-800 shrink-0">
          <h3 className="flex items-center gap-3 font-display font-bold text-xl text-crema-50">
            购物篮
            {count > 0 && (
              <span className="text-xs font-body font-bold bg-amberhi-500 text-espresso-950 rounded-full px-2.5 py-1">
                {count} 件
              </span>
            )}
          </h3>
          <button
            onClick={onClose}
            aria-label="关闭购物篮"
            className="w-10 h-10 rounded-full border border-espresso-700 text-crema-300 flex items-center justify-center hover:text-amberhi-400 hover:border-amberhi-500/60 hover:rotate-90 transition-all duration-300"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* 包邮进度 */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-b border-espresso-800 shrink-0">
            {shipping === 0 ? (
              <p className="flex items-center gap-2 text-sm text-sage-300 font-medium">
                <TruckIcon className="w-[18px] h-[18px]" /> 已达免运费门槛，顺丰包邮送出
                <CheckIcon className="w-4 h-4" />
              </p>
            ) : (
              <p className="text-sm text-crema-300">
                再买 <span className="font-display font-bold text-amberhi-400">¥{FREE_SHIPPING_AT - subtotal}</span> 即可免运费
              </p>
            )}
            <div className="mt-2.5 h-1.5 rounded-full bg-espresso-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${shipping === 0 ? "bg-sage-400" : "bg-amberhi-500"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* 列表 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-espresso-800 border border-espresso-700 flex items-center justify-center text-crema-500">
                  <BasketIcon className="w-10 h-10" />
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-espresso-700 flex items-center justify-center text-crema-400">
                  <MinusIcon className="w-3 h-3" strokeWidth={2.4} />
                </span>
              </div>
              <p className="mt-6 font-display font-bold text-xl text-crema-100">篮子还空着</p>
              <p className="mt-2 text-sm text-crema-500 max-w-[220px]">新鲜烘焙的豆子正在架子上等你，去挑一款吧</p>
              <button
                onClick={onGoShop}
                className="mt-7 flex items-center gap-2 bg-amberhi-500 text-espresso-950 font-bold rounded-full px-6 py-3 hover:bg-amberhi-400 hover:-translate-y-0.5 transition-all duration-300"
              >
                去逛豆单 <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const unit = item.product.variants[item.variant].price;
                return (
                  <li key={item.key} className="flex gap-4 bg-espresso-850 border border-espresso-800 rounded-xl p-3.5 group hover:border-espresso-700 transition-colors">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-sm text-crema-100 leading-snug">{item.product.name}</p>
                        <button
                          onClick={() => onRemove(item.key)}
                          aria-label={`移除 ${item.product.name}`}
                          className="text-crema-500 hover:text-warmred-400 transition-colors shrink-0 mt-0.5"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-crema-500">{item.product.variants[item.variant].label}</p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-espresso-700 bg-espresso-900">
                          <button
                            onClick={() => onSetQty(item.key, item.qty - 1)}
                            disabled={item.qty <= 1}
                            className="w-8 h-8 flex items-center justify-center text-crema-300 hover:text-amberhi-400 disabled:opacity-30 transition-colors"
                            aria-label="减少数量"
                          >
                            <MinusIcon className="w-3.5 h-3.5" />
                          </button>
                          <span key={item.qty} className="pop-in w-7 text-center text-sm font-bold text-crema-50">{item.qty}</span>
                          <button
                            onClick={() => onSetQty(item.key, item.qty + 1)}
                            disabled={item.qty >= 20}
                            className="w-8 h-8 flex items-center justify-center text-crema-300 hover:text-amberhi-400 disabled:opacity-30 transition-colors"
                            aria-label="增加数量"
                          >
                            <PlusIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-display font-bold text-lg text-amberhi-400">
                          ¥{unit * item.qty}
                          {item.qty > 1 && <span className="text-[11px] text-crema-500 font-body font-normal ml-1">¥{unit}×{item.qty}</span>}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* 结算区 */}
        {items.length > 0 && (
          <div className="border-t border-espresso-800 px-6 py-5 shrink-0 bg-espresso-850/60">
            <div className="space-y-2 text-sm">
              <p className="flex justify-between text-crema-400">
                <span>商品小计</span>
                <span className="font-medium text-crema-100">¥{subtotal}</span>
              </p>
              <p className="flex justify-between text-crema-400">
                <span>运费</span>
                <span className={`font-medium ${shipping === 0 ? "text-sage-300" : "text-crema-100"}`}>
                  {shipping === 0 ? "免运费" : `¥${shipping}`}
                </span>
              </p>
              <p className="flex justify-between items-baseline pt-2 border-t border-espresso-800">
                <span className="text-crema-300">合计</span>
                <span className="font-display font-black text-3xl text-amberhi-400">¥{total}</span>
              </p>
            </div>
            <button
              onClick={onCheckout}
              className="mt-4 w-full flex items-center justify-center gap-2.5 bg-amberhi-500 text-espresso-950 font-bold text-base rounded-full py-4 shadow-amber hover:bg-amberhi-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              去结算 <ArrowIcon className="w-5 h-5" />
            </button>
            <p className="mt-3 text-center text-[11px] text-crema-500 tracking-wide">模拟商店 · 不会产生真实扣款</p>
          </div>
        )}
      </aside>
    </div>
  );
}
