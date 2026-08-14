import { useEffect, useMemo, useState } from "react";
import { FREE_SHIPPING_AT, SHIPPING_FEE } from "../data/products";
import { CloseIcon, CheckIcon, SpinnerIcon, TruckIcon } from "./Icons";
import type { ResolvedItem } from "./CartDrawer";

interface Props {
  open: boolean;
  items: ResolvedItem[];
  onClose: () => void;
  onComplete: () => void;
}

const DELIVERY = [
  { key: "standard", label: "顺丰标准配送", desc: "48 小时内发出 · 运费按购物车计算", extra: 0 },
  { key: "cold", label: "顺丰冷鲜速配", desc: "恒温锁鲜 · 优先发出", extra: 6 },
];

const PAYMENTS = [
  { key: "wechat", label: "微信支付" },
  { key: "alipay", label: "支付宝" },
  { key: "cod", label: "货到付款" },
];

export default function CheckoutModal({ open, items, onClose, onComplete }: Props) {
  const [phase, setPhase] = useState<"form" | "processing" | "success">("form");
  const [form, setForm] = useState({ name: "", phone: "", address: "", delivery: "standard", payment: "wechat" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderNo, setOrderNo] = useState("");

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.product.variants[i.variant].price * i.qty, 0);
  const deliveryExtra = useMemo(
    () => DELIVERY.find((d) => d.key === form.delivery)?.extra ?? 0,
    [form.delivery]
  );
  const baseShipping = subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
  const shipping = items.length ? baseShipping + deliveryExtra : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (open) {
      setPhase("form");
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && phase !== "processing" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, phase, onClose]);

  if (!open) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "请填写收货人姓名";
    if (!/^1[3-9]\d{9}$/.test(form.phone.trim())) errs.phone = "请填写正确的 11 位手机号";
    if (form.address.trim().length < 5) errs.address = "请填写详细的收货地址（不少于 5 个字）";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setPhase("processing");
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setTimeout(() => {
      setOrderNo(`RN-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`);
      setPhase("success");
    }, 1100);
  };

  const field = (key: "name" | "phone" | "address") => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: "" }));
    },
  });

  const inputCls = (err?: string) =>
    `w-full bg-espresso-850 border rounded-xl px-4 py-3 text-sm text-crema-100 placeholder:text-crema-500/60 outline-none transition-colors ${
      err ? "border-warmred-400/70 focus:border-warmred-400" : "border-espresso-700 focus:border-amberhi-500/80 hover:border-espresso-600"
    }`;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label="结算">
      <div className="absolute inset-0 bg-espresso-950/85 backdrop-blur-sm fade-in" onClick={() => phase !== "processing" && onClose()} />

      <div className="modal-in relative w-full sm:max-w-lg bg-espresso-900 border border-espresso-700 rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-black/60 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto">
        {phase !== "processing" && (
          <button
            onClick={onClose}
            aria-label="关闭结算"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-espresso-850 border border-espresso-700 text-crema-300 flex items-center justify-center hover:text-amberhi-400 hover:border-amberhi-500/60 hover:rotate-90 transition-all duration-300"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        )}

        {/* 表单 */}
        {phase === "form" && (
          <div className="p-6 sm:p-8">
            <p className="text-xs tracking-[0.3em] text-amberhi-400 font-medium">CHECKOUT</p>
            <h3 className="mt-2 font-display font-black text-2xl sm:text-3xl text-crema-50">确认订单</h3>
            <p className="mt-1.5 text-sm text-crema-500">共 {count} 件商品 · 模拟结算不会产生真实扣款</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs tracking-wider text-crema-400 mb-1.5" htmlFor="ck-name">收货人</label>
                <input id="ck-name" {...field("name")} placeholder="您的姓名" className={inputCls(errors.name)} />
                {errors.name && <p className="mt-1.5 text-xs text-warmred-400">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs tracking-wider text-crema-400 mb-1.5" htmlFor="ck-phone">手机号</label>
                <input id="ck-phone" {...field("phone")} placeholder="用于接收发货通知" maxLength={11} inputMode="numeric" className={inputCls(errors.phone)} />
                {errors.phone && <p className="mt-1.5 text-xs text-warmred-400">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-xs tracking-wider text-crema-400 mb-1.5" htmlFor="ck-addr">收货地址</label>
                <textarea id="ck-addr" {...field("address")} placeholder="省 / 市 / 区 / 街道门牌号" rows={2} className={`${inputCls(errors.address)} resize-none`} />
                {errors.address && <p className="mt-1.5 text-xs text-warmred-400">{errors.address}</p>}
              </div>

              {/* 配送方式 */}
              <div>
                <p className="text-xs tracking-wider text-crema-400 mb-2">配送方式</p>
                <div className="space-y-2">
                  {DELIVERY.map((d) => (
                    <button
                      key={d.key}
                      onClick={() => setForm((f) => ({ ...f, delivery: d.key }))}
                      className={`w-full flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-300 ${
                        form.delivery === d.key
                          ? "border-amberhi-500/80 bg-amberhi-500/10"
                          : "border-espresso-700 bg-espresso-850 hover:border-espresso-600"
                      }`}
                      aria-pressed={form.delivery === d.key}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-colors ${form.delivery === d.key ? "border-amberhi-500" : "border-espresso-600"}`}>
                          {form.delivery === d.key && <span className="w-2 h-2 rounded-full bg-amberhi-500 pop-in" />}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-crema-100">{d.label}</span>
                          <span className="block text-xs text-crema-500 mt-0.5">{d.desc}</span>
                        </span>
                      </span>
                      <span className={`text-sm font-display font-bold ${d.extra ? "text-amberhi-400" : "text-sage-300"}`}>
                        {d.extra ? `+¥${d.extra}` : "标准运费"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 支付方式 */}
              <div>
                <p className="text-xs tracking-wider text-crema-400 mb-2">支付方式</p>
                <div className="grid grid-cols-3 gap-2">
                  {PAYMENTS.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setForm((f) => ({ ...f, payment: p.key }))}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-300 ${
                        form.payment === p.key
                          ? "border-amberhi-500/80 bg-amberhi-500/10 text-amberhi-400"
                          : "border-espresso-700 bg-espresso-850 text-crema-300 hover:border-espresso-600"
                      }`}
                      aria-pressed={form.payment === p.key}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 汇总 */}
              <div className="rounded-xl border border-espresso-700 bg-espresso-850 px-4 py-4 space-y-1.5 text-sm">
                <p className="flex justify-between text-crema-400"><span>商品小计</span><span className="text-crema-100">¥{subtotal}</span></p>
                <p className="flex justify-between text-crema-400">
                  <span>运费{deliveryExtra ? "（含冷鲜 +¥6）" : ""}</span>
                  <span className={baseShipping === 0 && !deliveryExtra ? "text-sage-300" : "text-crema-100"}>
                    {baseShipping === 0 ? "免运费" : `¥${baseShipping}`}
                    {deliveryExtra ? ` +¥${deliveryExtra}` : ""}
                  </span>
                </p>
                <p className="flex justify-between items-baseline pt-2 border-t border-espresso-700">
                  <span className="text-crema-300">应付合计</span>
                  <span className="font-display font-black text-2xl text-amberhi-400">¥{total}</span>
                </p>
              </div>

              <button
                onClick={submit}
                className="w-full bg-amberhi-500 text-espresso-950 font-bold text-base rounded-full py-4 shadow-amber hover:bg-amberhi-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                提交订单 · ¥{total}
              </button>
            </div>
          </div>
        )}

        {/* 处理中 */}
        {phase === "processing" && (
          <div className="p-16 flex flex-col items-center text-center">
            <SpinnerIcon className="w-12 h-12 text-amberhi-500" />
            <p className="mt-6 font-display font-bold text-xl text-crema-100">正在提交订单…</p>
            <p className="mt-2 text-sm text-crema-500">烘焙师已收到你的豆子清单</p>
          </div>
        )}

        {/* 成功 */}
        {phase === "success" && (
          <div className="p-8 sm:p-10 flex flex-col items-center text-center">
            <svg viewBox="0 0 120 120" className="w-28 h-28" aria-hidden="true">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-sage-400)" strokeWidth="4" strokeLinecap="round" className="draw-circle" transform="rotate(-90 60 60)" />
              <path d="M40 62l14 14 26-30" fill="none" stroke="var(--color-sage-300)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="draw-check" />
            </svg>
            <h3 className="mt-6 font-display font-black text-3xl text-crema-50">下单成功！</h3>
            <p className="mt-2 text-sm text-crema-400">
              订单号 <span className="font-display font-bold text-amberhi-400 tracking-wide">{orderNo}</span>
            </p>

            <div className="mt-6 w-full rounded-xl border border-espresso-700 bg-espresso-850 px-5 py-4 text-sm text-left space-y-2">
              <p className="flex justify-between text-crema-400"><span>商品件数</span><span className="text-crema-100">{count} 件</span></p>
              <p className="flex justify-between text-crema-400"><span>配送方式</span><span className="text-crema-100">{DELIVERY.find((d) => d.key === form.delivery)?.label}</span></p>
              <p className="flex justify-between text-crema-400"><span>支付方式</span><span className="text-crema-100">{PAYMENTS.find((p) => p.key === form.payment)?.label}</span></p>
              <p className="flex justify-between text-crema-400"><span>收货人</span><span className="text-crema-100">{form.name} {form.phone}</span></p>
              <p className="flex justify-between items-baseline pt-2 border-t border-espresso-700">
                <span className="text-crema-300">实付金额</span>
                <span className="font-display font-black text-2xl text-amberhi-400">¥{total}</span>
              </p>
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-crema-500">
              <TruckIcon className="w-4 h-4 text-sage-400" /> 豆子将在本周三烘焙后 48 小时内发出
            </p>

            <button
              onClick={onComplete}
              className="mt-7 w-full flex items-center justify-center gap-2 bg-amberhi-500 text-espresso-950 font-bold rounded-full py-4 hover:bg-amberhi-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <CheckIcon className="w-5 h-5" /> 完成，继续逛逛
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
