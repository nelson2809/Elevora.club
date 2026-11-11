"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Shared scroll reveals in the reference style. Call them inside a gsap.matchMedia() block so they
 * are reverted with it.
 */

/** "WORD script WORD": capitals fade in letter by letter, then the script word writes itself in. */
export function duoIn(el: Element | undefined, start = "top 82%") {
  if (!el) return;
  const caps = el.querySelectorAll(".duo-a, .duo-b");
  const chars = Array.from(caps).flatMap((c) => SplitText.create(c, { type: "chars", charsClass: "split-char" }).chars);
  const script = el.querySelector(".duo-s");
  gsap
    .timeline({ scrollTrigger: { trigger: el, start } })
    .from(chars, { opacity: 0, y: 14, filter: "blur(3px)", duration: 0.9, ease: "power2.out", stagger: { each: 0.04, from: "random" } }, 0)
    .fromTo(script, { clipPath: "inset(-60% 100% -60% -30%)" }, { clipPath: "inset(-60% -30% -60% -30%)", duration: 1.5, ease: "power2.inOut" }, 0.35);
}

/** Paragraph lines rise out of masks one after another. */
export function linesIn(el: Element | undefined, start = "top 85%") {
  if (!el) return;
  const s = SplitText.create(el, { type: "lines", mask: "lines" });
  gsap.from(s.lines, { yPercent: 105, duration: 1.1, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: el, start } });
}

/** Simple fade-up for small items. */
export function fadeUp(els: Element[] | NodeListOf<Element>, start = "top 88%") {
  Array.from(els).forEach((el) =>
    gsap.from(el, { opacity: 0, y: 30, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start } })
  );
}

/** Scroll-linked vertical drift (parallax). Positive speed moves up faster than the page. */
export function drift(el: Element | undefined, speed: number) {
  if (!el) return;
  gsap.fromTo(el, { y: () => speed * 120 }, {
    y: () => -speed * 120,
    ease: "none",
    scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
  });
}

/** Picture opens from the bottom edge with a slow settle. */
export function picIn(el: Element | undefined, start = "top 85%") {
  if (!el) return;
  const img = el.querySelector("img");
  gsap
    .timeline({ scrollTrigger: { trigger: el, start } })
    .fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }, 0)
    .fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1);
}
