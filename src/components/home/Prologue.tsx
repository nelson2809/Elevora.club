"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Duo } from "@/components/home/Duo";
import { media, px, site } from "@/lib/content";
import { duoIn, linesIn } from "@/components/home/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A full-bleed photograph rises over the blue ground and holds still while a cream panel slides
 * over it carrying "ELEVATE your EVERYDAY", a framed picture in a stepped mat and a side note.
 */
export function Prologue() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(q(".rise img"), { scale: 1.18, yPercent: 8 }, {
          scale: 1, yPercent: 0, ease: "none",
          scrollTrigger: { trigger: q(".rise")[0], start: "top bottom", end: "bottom bottom", scrub: true },
        });
        duoIn(q(".pro-duo")[0]);
        gsap.from(q(".pro-mat"), { y: 120, ease: "none", scrollTrigger: { trigger: q(".pro-panel")[0], start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(q(".pro-mat .mat-core img"), { scale: 1.2, ease: "none", scrollTrigger: { trigger: q(".pro-mat")[0], start: "top bottom", end: "bottom top", scrub: true } });
        linesIn(q(".pro-note")[0]);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      {/* sticky photograph */}
      <section className="rise relative h-[170vh] bg-sky" data-tone="dark">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={px(media.hero.id, 2400)} alt={media.hero.alt} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </section>

      {/* cream panel slides over it */}
      <section data-tone="light" className="pro-panel relative z-10 -mt-[70vh] bg-cream pb-0 pt-[16vh]">
        <div className="text-center">
          <Duo a="Elevate" s="your" b="Everyday" className="pro-duo text-[9vw] md:text-[4.6vw]" />
        </div>
        <div className="relative mx-auto mt-[10vh] grid max-w-[1440px] items-start gap-12 px-6 pb-[16vh] md:grid-cols-[1fr_auto_1fr] md:px-[10vw]">
          <p className="pro-note order-2 max-w-[300px] text-[15px] leading-[2] tracking-[0.04em] text-cocoa md:order-1 md:mt-[6vh]">
            {site.promise} Bathing, heat, scrub and skincare: the Korean everyday ritual, brought to Chennai in a safe, private, premium
            setting.
          </p>
          <div className="pro-mat mat order-1 mx-auto w-[78vw] max-w-[440px] md:order-2 md:w-[30vw]">
            <div className="mat-inner">
              <div className="mat-core">
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={px(media.robe2.id, 1000)} alt={media.robe2.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
          <span className="hidden md:order-3 md:block" />
        </div>
        <div className="band-stripes" aria-hidden="true" />
      </section>
    </div>
  );
}
