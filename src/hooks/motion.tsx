import { useEffect, useRef, useState, type ReactNode } from "react";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** 滚动显现容器 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error 泛型标签 ref
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

const SCRAMBLE_POOL = "烘焙豆风味产地水洗日晒耶加雪菲肯亚哥仑比云南挂耳焦糖花香";

/** 乱码解码式文字轮换 */
export function useScramble(words: string[], holdMs = 2400) {
  const [text, setText] = useState(words[0]);
  const idxRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const t = window.setInterval(() => {
        idxRef.current = (idxRef.current + 1) % words.length;
        setText(words[idxRef.current]);
      }, holdMs);
      return () => window.clearInterval(t);
    }

    let frame = 0;
    let scrambling = false;
    let raf = 0;
    let holdTimer = 0;

    const runScramble = () => {
      const target = words[idxRef.current];
      scrambling = true;
      frame = 0;
      const total = Math.max(10, target.length * 4);
      const tick = () => {
        frame += 1;
        const progress = frame / total;
        const settled = Math.floor(progress * target.length);
        let out = "";
        for (let i = 0; i < target.length; i += 1) {
          out +=
            i < settled
              ? target[i]
              : SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
        }
        setText(out);
        if (frame < total) {
          raf = requestAnimationFrame(tick);
        } else {
          setText(target);
          scrambling = false;
          holdTimer = window.setTimeout(() => {
            idxRef.current = (idxRef.current + 1) % words.length;
            runScramble();
          }, holdMs);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    holdTimer = window.setTimeout(runScramble, holdMs);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
      scrambling = false;
    };
  }, [words, holdMs]);

  return text;
}
