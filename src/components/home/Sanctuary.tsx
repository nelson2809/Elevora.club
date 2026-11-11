"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LatticeMark } from "@/components/brand/Lattice";
import { media, px } from "@/lib/content";
import { drift, duoIn, linesIn } from "@/components/home/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const slides = [media.facial, media.headSpa, media.jade];

/**
 * Split section: title, picture and emblem on the left; on the right a tall picture that holds
 * while the next ones wipe up over it as you scroll. A striped band closes it, then a centred note.
 */
export function Sanctuary() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        duoIn(q(".san-duo")[0]);
        drift(q(".san-pic")[0], 0.5);
        gsap.from(q(".san-mark"), { opacity: 0, scale: 0.6, duration: 1, ease: "back.out(1.6)", scrollTrigger: { trigger: q(".san-mark")[0], start: "top 90%" } });
        linesIn(q(".san-note")[0]);
      });
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const s = q(".san-slide");
        const tl = gsap.timeline({ scrollTrigger: { trigger: q(".san-split")[0], start: "top top", end: "bottom bottom", scrub: true } });
        s.slice(1).forEach((el, i) => {
          tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }, i * 1.2 + 0.2)
            .fromTo(el.querySelector("img"), { scale: 1.2 }, { scale: 1, ease: "none", duration: 1.4 }, i * 1.2 + 0.2);
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-tone="light" className="relative bg-white">
      <div className="san-split relative grid md:min-h-[260vh] md:grid-cols-2">
        <div className="px-6 pb-16 pt-24 md:px-[6vw] md:pt-[22vh]">
          <h2 className="san-duo duo flex-col !items-start text-[10vw] md:text-[4.2vw]" aria-label="A sanctuary just for women">
            <span className="duo-a" aria-hidden="true">A sanctuary</span>
            <span className="flex items-center" aria-hidden="true">
              <span className="script duo-s !ml-0">just</span>
              <span className="duo-b ml-[0.2em]">for women</span>
            </span>
          </h2>
          <div className="san-pic mt-14 aspect-[16/11] w-full overflow-hidden md:w-[82%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.robe.id, 1400)} alt={media.robe.alt} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="mt-14 flex flex-col items-center md:w-[82%]">
            <LatticeMark className="san-mark h-[68px] w-[68px]" />
            <p className="label mt-5 text-[13px] text-cocoa">Women only</p>
          </div>
          <p className="mx-auto mt-14 max-w-[420px] text-center text-[15px] leading-[2] tracking-[0.04em] text-cocoa md:mx-0 md:ml-[6%] md:text-left">
            Every guest and every member of our team is a woman. Bathe your way: swimwear-friendly pools, private shower cubicles and a
            private scrub room are always there.
          </p>
          <Link href="/about" className="label mt-6 block text-center text-[12px] text-cocoa underline-offset-8 hover:underline md:ml-[6%] md:text-left">
            Why women only
          </Link>
        </div>

        {/* right: holding picture stack */}
        <div className="relative hidden md:block">
          <div className="sticky top-0 h-screen overflow-hidden">
            {slides.map((m, i) => (
              <div key={m.id} className="san-slide absolute inset-0 overflow-hidden" style={{ zIndex: i + 1 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={px(m.id, 1600)} alt={m.alt} className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="band-stripes" aria-hidden="true" />

      <div className="bg-white px-6 py-[18vh] text-center">
        <p className="san-note mx-auto max-w-[620px] font-serif text-[22px] font-light leading-[1.8] text-cocoa md:text-[1.75vw]">
          Not a one-hour massage but a half-day ritual. Every visit begins in the baths and heat rooms, then turns to the treatment you came for.
        </p>
      </div>
    </section>
  );
}
