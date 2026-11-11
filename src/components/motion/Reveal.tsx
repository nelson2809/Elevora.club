"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Light motion kit for inner pages and simpler home sections.
 * Inside the wrapper:  [data-reveal] fades up,  [data-split] letters grow in (title morph),
 * [data-lines] lines sharpen from blur,  [data-arch] image opens through an arch.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        q("[data-reveal]").forEach((el) =>
          gsap.from(el, { opacity: 0, y: 40, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } })
        );
        q("[data-split]").forEach((el) => {
          const s = SplitText.create(el, { type: "chars", charsClass: "split-char" });
          gsap.from(s.chars, { opacity: 0, filter: "blur(4px)", y: 10, stagger: { each: 0.04, from: "random" }, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
        q("[data-lines]").forEach((el) => {
          const s = SplitText.create(el, { type: "lines", mask: "lines" });
          gsap.from(s.lines, { yPercent: 105, stagger: 0.1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
        q("[data-arch]").forEach((el) => {
          const img = el.querySelector("img");
          gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } })
            .fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }, 0)
            .fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1);
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
