"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { SunMark, Wordmark } from "@/components/brand/Logo";
import { media, px } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Opening card, after the reference: a white card on a powder-blue ground with the logo at the top,
 * a small picture top-left, a tall picture on the right and the thin capital title bottom-left.
 * On load the logo and pictures fade up out of white, the title letters arrive one by one, and the card
 * draws in from the edges to reveal the blue frame. Scrolling carries the card away with a gentle
 * parallax and leaves the blue ground for the intro line.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const { motion } = ctx.conditions as { motion: boolean };
        const sec = root.current!;
        if (!motion) {
          sec.classList.remove("hero-pre");
          return;
        }
        const split = SplitText.create(q(".hero-title"), { type: "words,chars", charsClass: "split-char" });
        const intro = SplitText.create(q(".intro-text"), { type: "lines", mask: "lines" });

        window.scrollTo(0, 0);
        const f = window.innerWidth >= 768 ? window.innerWidth * 0.024 : 10;
        // take over from the CSS pre-state in the same frame, before the from() tweens read values
        gsap.set(q(".hero-card"), { top: 0, right: 0, bottom: 0, left: 0 });
        sec.classList.remove("hero-pre");
        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .set(q(".hero-card"), { top: 0, right: 0, bottom: 0, left: 0 })
          .from(q(".hero-logo"), { opacity: 0, y: 10, duration: 1.1 }, 0.1)
          .from(q(".hero-pic-a"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: 1.4 }, 0.35)
          .from(q(".hero-pic-b"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: 1.6 }, 0.55)
          .from(split.chars, { opacity: 0, filter: "blur(4px)", duration: 0.9, stagger: { each: 0.035, from: "random" } }, 0.8)
          .to(q(".hero-card"), { top: f, right: f, bottom: f, left: f, duration: 1.2, ease: "expo.inOut", clearProps: "top,right,bottom,left" }, 1.35)
          .from(q(".hero-scroll"), { opacity: 0, y: 8, duration: 0.8 }, 1.8);

        // slow drift on the tall picture, like a breeze in the curtain
        gsap.to(q(".hero-pic-b img"), { scale: 1.08, xPercent: -2, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // scroll: card leaves at different speeds, intro line rises in
        const st = { trigger: q(".hero-stage")[0], start: "top top", end: "bottom top", scrub: true };
        gsap.to(q(".hero-pic-a"), { yPercent: -60, ease: "none", scrollTrigger: st });
        gsap.to(q(".hero-pic-b"), { yPercent: -18, ease: "none", scrollTrigger: st });
        gsap.to(q(".hero-title"), { yPercent: -40, ease: "none", scrollTrigger: st });
        gsap.from(intro.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: q(".intro-text")[0], start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-tone="light" className="hero-pre relative bg-sky [--frame:10px] md:[--frame:2.4vw]">
      <div className="hero-stage relative h-[100svh] min-h-[560px]">
        <div className="hero-card absolute inset-[var(--frame)] overflow-hidden bg-white">
          {/* logo */}
          <div className="hero-logo absolute left-1/2 top-[5vh] flex -translate-x-1/2 flex-col items-center md:top-[4.5vh]">
            <SunMark className="h-14 w-auto md:h-[8.5vh]" title="Elevora" />
            <Wordmark className="mt-2 h-[16px] w-auto md:h-[2.6vh]" title="Elevora" />
            <span className="label mt-2 text-[9px] tracking-[0.4em] text-navy md:text-[10px]">Seoul Spa · Chennai</span>
          </div>

          {/* small picture, top-left */}
          <div className="hero-pic-a absolute left-[6%] top-[13%] hidden aspect-[3/4.2] w-[12.6%] overflow-hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.towels.id, 600)} alt={media.towels.alt} className="h-full w-full object-cover" fetchPriority="high" />
          </div>

          {/* tall picture, right */}
          <div className="hero-pic-b absolute bottom-[28%] right-[6%] aspect-[4/5] w-[52%] overflow-hidden md:bottom-[5.5%] md:top-[16%] md:aspect-auto md:w-[25.5%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.pool.id, 1400)} alt={media.pool.alt} className="h-full w-full object-cover" fetchPriority="high" />
          </div>

          {/* title */}
          <h1 className="hero-title absolute bottom-[17%] left-[6%] font-display text-[9.2vw] uppercase leading-[1.12] tracking-[0.04em] text-cocoa md:bottom-[11%] md:text-[4.6vw]">
            A Seoul ritual
            <br />
            just for women
          </h1>

          <button
            onClick={() => {
              const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
              const y = window.innerHeight;
              if (lenis) lenis.scrollTo(y, { duration: 1.4 });
              else window.scrollTo({ top: y, behavior: "smooth" });
            }}
            className="hero-scroll group absolute bottom-[3%] right-[6%] flex flex-col items-center gap-2 text-cocoa md:bottom-[6%] md:left-1/2 md:right-auto md:-translate-x-1/2"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-cocoa transition-colors duration-300 group-hover:bg-cocoa group-hover:text-white">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
              </svg>
            </span>
            <span className="label text-[11px]">Scroll down</span>
          </button>
        </div>
      </div>

      {/* intro line on the blue ground */}
      <div className="px-6 pb-[22vh] pt-[14vh] text-center md:pb-[30vh] md:pt-[18vh]">
        <p className="intro-text mx-auto max-w-[760px] font-serif text-[22px] font-light leading-[1.75] text-cocoa md:text-[1.9vw]">
          A women-only Korean bathhouse in Chennai, where warm pools, heated jjimjil rooms, the seshin scrub and K-beauty rituals come
          together in one unhurried half-day.
        </p>
      </div>
    </section>
  );
}
