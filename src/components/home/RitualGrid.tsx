"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Duo } from "@/components/home/Duo";
import { NavySquare } from "@/components/brand/Lattice";
import { media, px, type Img } from "@/lib/content";
import { duoIn } from "@/components/home/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Card = { t: string; price: string; href: string; img: Img; col: 0 | 1 | 2; ratio: string; mt: string };

const cards: Card[] = [
  { t: "Korean body scrub", price: "from ₹2,500", href: "/menu#body-scrub", img: media.stones, col: 0, ratio: "aspect-[4/5]", mt: "md:mt-[10vh]" },
  { t: "Ginseng anti-ageing ritual", price: "₹7,500", href: "/menu#facials", img: media.serumRose, col: 0, ratio: "aspect-[4/5]", mt: "md:mt-[16vh]" },
  { t: "Glass-skin facial", price: "from ₹3,500", href: "/menu#facials", img: media.facial, col: 1, ratio: "aspect-[4/5]", mt: "md:mt-[46vh]" },
  { t: "Face Pilates with jade", price: "₹4,000", href: "/menu#facials", img: media.jadeHands, col: 1, ratio: "aspect-[4/5]", mt: "md:mt-[14vh]" },
  { t: "15-step head spa", price: "₹5,500", href: "/menu#head-spa", img: media.headSpa2, col: 2, ratio: "aspect-[4/5]", mt: "md:mt-[30vh]" },
  { t: "Korean acupressure", price: "from ₹3,000", href: "/menu#body", img: media.robe, col: 2, ratio: "aspect-[4/5]", mt: "md:mt-[18vh]" },
];

const squares = [
  "left-[37%] top-[46%]", "left-[66%] top-[38%]", "left-[3%] top-[70%]", "left-[86%] top-[64%]", "left-[30%] top-[86%]", "left-[58%] top-[92%]",
];

/**
 * "RITUALS and RESETS": the two words part as the picture between them rises; below, ritual cards
 * in three columns drift at different speeds over a faint square pattern, with navy squares popping in.
 */
export function RitualGrid() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        duoIn(q(".rg-duo")[0], "top 90%");
        q(".rg-sq").forEach((el, i) =>
          gsap.from(el, { scale: 0, rotate: 45, duration: 0.8, ease: "back.out(1.8)", delay: (i % 3) * 0.08, scrollTrigger: { trigger: el, start: "top 92%" } })
        );
        q(".rg-card").forEach((el) => {
          const img = el.querySelector("img");
          gsap.fromTo(img, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
          gsap.from(el.querySelector(".rg-cap"), { opacity: 0, y: 10, duration: 0.8, scrollTrigger: { trigger: el, start: "top 70%" } });
        });
      });
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const head = q(".rg-head")[0];
        const ht = { trigger: head, start: "top 75%", end: "bottom top", scrub: true };
        gsap.to(q(".rg-head .duo-a"), { xPercent: -45, ease: "none", scrollTrigger: ht });
        gsap.to(q(".rg-head .duo-b"), { xPercent: 45, ease: "none", scrollTrigger: ht });
        gsap.to(q(".rg-head .duo-s"), { opacity: 0, ease: "none", scrollTrigger: { ...ht, start: "top 30%" } });
        gsap.fromTo(q(".rg-lead"), { y: "30vh" }, { y: "-40vh", ease: "none", scrollTrigger: { trigger: head, start: "top bottom", end: "bottom top", scrub: true } });
        const speeds = [0.25, -0.35, 0.05];
        q(".rg-col").forEach((col, i) =>
          gsap.fromTo(col, { y: () => speeds[i] * window.innerHeight }, {
            y: () => -speeds[i] * window.innerHeight, ease: "none",
            scrollTrigger: { trigger: q(".rg-grid")[0], start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
          })
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-tone="light" className="grid-squares relative overflow-hidden pb-[18vh]">
      <div className="rg-head relative flex h-[70vh] items-center justify-center bg-white md:h-[90vh]">
        <Duo a="Rituals" s="and" b="Resets" className="rg-duo relative z-10 gap-[3vw] text-[8vw] md:gap-[14vw] md:text-[5vw]" />
        <div className="rg-lead absolute left-1/2 top-[62%] z-0 aspect-[3/4] w-[36vw] -translate-x-1/2 -translate-y-1/2 md:top-1/2 overflow-hidden md:w-[19vw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={px(media.sheetMask.id, 1000)} alt={media.sheetMask.alt} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>

      <div className="rg-grid relative mx-auto grid max-w-[1440px] gap-10 px-6 md:grid-cols-3 md:gap-[6vw] md:px-[12vw]">
        {squares.map((pos) => (
          <NavySquare key={pos} className={`rg-sq absolute hidden h-[54px] w-[54px] md:block ${pos}`} />
        ))}
        {[0, 1, 2].map((c) => (
          <div key={c} className="rg-col flex flex-col gap-10">
            {cards
              .filter((k) => k.col === c)
              .map((k) => (
                <Link key={k.t} href={k.href} className={`rg-card group relative block overflow-hidden ${k.ratio} ${k.mt}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={px(k.img.id, 900)} alt={k.img.alt} className="h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-[.85]" loading="lazy" />
                  <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
                  <span className="rg-cap absolute inset-x-0 bottom-5 text-center text-white">
                    <span className="label block text-[12px] md:text-[13px]">{k.t}</span>
                    <span className="mt-1 block font-serif text-[15px] italic opacity-90">{k.price}</span>
                  </span>
                </Link>
              ))}
          </div>
        ))}
      </div>

      <div className="relative mt-[14vh] flex justify-center">
        <Link href="/menu" className="group flex items-center gap-5">
          <span className="grid h-[54px] w-[54px] place-items-center border-[9px] border-navy transition-colors duration-500 group-hover:bg-navy">
            <span className="h-2 w-2 bg-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <span className="label text-[13px] text-cocoa">View the full menu</span>
        </Link>
      </div>
    </section>
  );
}
