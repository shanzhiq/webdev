import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Ticker from "./components/Ticker";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StoryStrip from "./components/StoryStrip";
import Shop from "./components/Shop";
import ProductModal from "./components/ProductModal";
import CartDrawer, { type ResolvedItem } from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import { CheckIcon } from "./components/Icons";
import { PRODUCTS, type CartItem, type Category, type Product } from "./data/products";

const CART_KEY = "roastnote-cart-v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed.filter((i) => PRODUCTS.some((p) => p.id === i.productId)) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [detail, setDetail] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null);
  const toastTimer = useRef(0);

  /* 模拟加载骨架屏 */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  /* 购物篮持久化 */
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* 忽略隐私模式下的存储异常 */
    }
  }, [cart]);

  const showToast = useCallback((msg: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), msg });
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback(
    (product: Product, variant: number, qty: number) => {
      const key = `${product.id}-${variant}`;
      setCart((prev) => {
        const found = prev.find((i) => `${i.productId}-${i.variant}` === key);
        if (found) {
          return prev.map((i) => (i === found ? { ...i, qty: Math.min(20, i.qty + qty) } : i));
        }
        return [...prev, { productId: product.id, variant, qty }];
      });
      showToast(`${product.name} ×${qty} 已加入购物篮`);
    },
    [showToast]
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      prev.map((i) => (`${i.productId}-${i.variant}` === key ? { ...i, qty: Math.max(1, Math.min(20, qty)) } : i))
    );
  }, []);

  const removeItem = useCallback(
    (key: string) => {
      setCart((prev) => prev.filter((i) => `${i.productId}-${i.variant}` !== key));
      showToast("已从购物篮移除");
    },
    [showToast]
  );

  const resolved: ResolvedItem[] = useMemo(
    () =>
      cart
        .map((i) => {
          const product = PRODUCTS.find((p) => p.id === i.productId);
          return product ? { key: `${i.productId}-${i.variant}`, product, variant: i.variant, qty: i.qty } : null;
        })
        .filter((x): x is ResolvedItem => x !== null),
    [cart]
  );

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const scrollToShop = useCallback(() => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleCheckoutDone = useCallback(() => {
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    showToast("订单已提交，豆子周三见！");
  }, [showToast]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="noise-overlay" aria-hidden="true" />

      <Ticker />
      <Header query={query} onQuery={setQuery} cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <main className="flex-1">
        <Hero onShop={scrollToShop} onStory={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })} />
        <StoryStrip />
        <Shop
          query={query}
          onClearQuery={() => setQuery("")}
          loading={loading}
          category={category}
          onCategory={setCategory}
          onAdd={addToCart}
          onDetail={setDetail}
        />
      </main>

      <Footer onCategory={setCategory} onGoShop={scrollToShop} />

      {/* 弹层 */}
      <ProductModal product={detail} onClose={() => setDetail(null)} onAdd={addToCart} />
      <CartDrawer
        open={cartOpen}
        items={resolved}
        onClose={() => setCartOpen(false)}
        onSetQty={setQty}
        onRemove={removeItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onGoShop={() => {
          setCartOpen(false);
          scrollToShop();
        }}
      />
      <CheckoutModal open={checkoutOpen} items={resolved} onClose={() => setCheckoutOpen(false)} onComplete={handleCheckoutDone} />

      {/* Toast */}
      {toast && (
        <div
          key={toast.id}
          className="toast-in fixed bottom-7 left-1/2 z-[70] flex items-center gap-2.5 bg-espresso-800/95 border border-amberhi-500/40 text-crema-100 rounded-full pl-4 pr-5 py-3 shadow-amber backdrop-blur-sm text-sm font-medium pointer-events-none"
          role="status"
        >
          <span className="w-6 h-6 rounded-full bg-amberhi-500 text-espresso-950 flex items-center justify-center shrink-0">
            <CheckIcon className="w-3.5 h-3.5" strokeWidth={2.6} />
          </span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
