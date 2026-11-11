"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Duo } from "@/components/home/Duo";
import { LatticeMark } from "@/components/brand/Lattice";
import { cafe, heatRooms, journey, media, packages, px } from "@/lib/content";
import { drift, duoIn, fadeUp, linesIn, picIn } from "@/components/home/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ViewMore({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-5">
      <span className="grid h-[46px] w-[46px] place-items-center border-[8px] border-navy transition-colors duration-500 group-hover:bg-navy">
        <span className="h-2 w-2 bg-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <span className="label text-[12px] text-cocoa">{children}</span>
    </Link>
  );
}

/**
 * Heat rooms (the "dining" chapter of the reference), packages ("wellness") and the first visit ("curator").
 */
export function Chapters() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        linesIn(q(".heat-note")[0]);
        duoIn(q(".heat-duo")[0], "top 92%");
        gsap.fromTo(q(".heat-rise"), { y: "35vh" }, { y: "-12vh", ease: "none", scrollTrigger: { trigger: q(".heat-head")[0], start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(q(".heat-leaf img"), { scale: 1.25, yPercent: -6 }, { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: q(".heat-leaf")[0], start: "top bottom", end: "bottom top", scrub: true } });
        picIn(q(".heat-pic")[0]);
        fadeUp(q(".heat-row"));
        gsap.fromTo(q(".heat-wide img"), { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: q(".heat-wide")[0], start: "top bottom", end: "bottom top", scrub: true } });

        duoIn(q(".glow-duo")[0]);
        drift(q(".glow-a")[0], 0.6);
        drift(q(".glow-b")[0], -0.3);
        linesIn(q(".glow-note")[0]);
        fadeUp(q(".glow-pk"));

        duoIn(q(".visit-duo")[0]);
        drift(q(".visit-a")[0], 0.4);
        picIn(q(".visit-b")[0]);
        fadeUp(q(".visit-step"));
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      {/* ---------- Heat rooms ---------- */}
      <section data-tone="light" className="heat-head relative overflow-hidden bg-white pt-[16vh]">
        <p className="heat-note mx-auto max-w-[640px] px-6 text-center font-serif text-[22px] font-light leading-[1.8] text-cocoa md:text-[1.75vw]">
          Between the pools and your treatment, the heat circuit: loess clay, salt, jade and a charcoal kiln, then the ice room to close.
        </p>
        <div className="relative mt-[8vh] flex h-[70vh] items-end justify-center md:h-[82vh]">
          <div className="heat-rise absolute left-1/2 top-0 aspect-[3/4] w-[46vw] -translate-x-1/2 overflow-hidden md:w-[17vw]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.teaCup.id, 900)} alt={media.teaCup.alt} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <Duo a="Heat" s="and" b="Stillness" className="heat-duo relative z-10 mb-[8vh] gap-[2vw] text-[9vw] md:text-[5vw]" />
        </div>
        <div className="band-lattice" aria-hidden="true" />

        <div className="grid md:grid-cols-[40%_60%]">
          <div className="heat-leaf relative h-[70vh] overflow-hidden md:h-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.sauna.id, 1600)} alt={media.sauna.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="px-6 py-20 md:px-[7vw] md:py-[16vh]">
            <p className="max-w-[440px] text-[15px] leading-[2] tracking-[0.04em] text-cocoa">
              Each room has its own temperature, a timer and cold water at the door, with a placard in English, Tamil and Korean. Start in the
              gentle jade room and stay as long as feels good.
            </p>
            <ul className="mt-10 max-w-[480px] divide-y divide-stone border-y border-stone">
              {heatRooms.map((r) => (
                <li key={r.name} className="heat-row flex items-baseline justify-between gap-6 py-4">
                  <span className="text-[14px] uppercase tracking-[0.12em] text-cocoa">{r.name}</span>
                  <span className="font-display text-[20px] text-taupe">{r.temp}</span>
                </li>
              ))}
            </ul>
            <div className="heat-pic ml-auto mt-14 aspect-[4/5] w-[70%] overflow-hidden md:w-[52%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={px(media.tea.id, 1000)} alt={media.tea.alt} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="mt-12 flex flex-col items-center md:items-end md:pr-[13%]">
              <LatticeMark className="h-[60px] w-[60px]" />
              <p className="label mt-4 text-[12px] text-cocoa">Korean café</p>
              <p className="mt-3 max-w-[300px] text-center text-[13px] leading-[1.9] text-ink-soft md:text-right">{cafe.line}</p>
            </div>
          </div>
        </div>
        <div className="heat-wide relative h-[80vh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={px(media.jade.id, 2400)} alt={media.jade.alt} className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover" loading="lazy" />
        </div>
      </section>

      {/* ---------- Packages ---------- */}
      <section data-tone="light" className="relative overflow-hidden bg-white py-[18vh]">
        <div className="text-center">
          <Duo a="Days" s="of" b="Glow" className="glow-duo gap-[1vw] text-[11vw] md:text-[4.6vw]" />
        </div>
        <div className="mx-auto mt-[12vh] grid max-w-[1440px] items-start gap-12 px-6 md:grid-cols-[1fr_1.1fr_1fr] md:px-[5vw]">
          <div className="glow-a aspect-[4/5] overflow-hidden md:mt-[-4vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.serum.id, 1000)} alt={media.serum.alt} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="md:pt-[6vh]">
            <p className="glow-note text-[15px] leading-[2] tracking-[0.04em] text-cocoa">
              Signature packages, each with a day pass for the baths, heat rooms and lounge. Begin with the Seoul Starter, or give the
              whole day to yourself.
            </p>
            <ul className="mt-10 divide-y divide-stone border-y border-stone">
              {packages.slice(0, 5).map((p) => (
                <li key={p.name} className="glow-pk flex items-baseline justify-between gap-6 py-4">
                  <span className="text-[14px] uppercase tracking-[0.12em] text-cocoa">{p.name}</span>
                  <span className="font-display text-[20px] text-taupe">₹{p.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <ViewMore href="/packages">View packages</ViewMore>
            </div>
          </div>
          <div className="glow-b aspect-[3/4] overflow-hidden md:mt-[22vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.bride.id, 1000)} alt={media.bride.alt} className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <div className="relative h-[70vh] overflow-hidden" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={px(media.pool.id, 2400)} alt="" className="heat-wide-2 absolute inset-0 h-full w-full object-cover" loading="lazy" style={{ objectPosition: "50% 40%" }} />
      </div>

      {/* ---------- First visit ---------- */}
      <section data-tone="light" className="relative overflow-hidden bg-white py-[18vh]">
        <div className="text-center">
          <Duo a="Your" s="first" b="Visit" className="visit-duo gap-[1vw] text-[11vw] md:text-[4.6vw]" />
        </div>
        <div className="mx-auto mt-[12vh] grid max-w-[1440px] gap-12 px-6 md:grid-cols-[0.8fr_1fr_1.1fr] md:px-[5vw]">
          <div className="visit-a aspect-[3/4] w-[70%] overflow-hidden md:w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.headSpa.id, 900)} alt={media.headSpa.alt} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="visit-b aspect-[4/5] overflow-hidden md:mt-[16vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.robe2.id, 1000)} alt={media.robe2.alt} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="md:pt-[8vh]">
            <ol className="space-y-6">
              {journey.map((j, i) => (
                <li key={j.t} className="visit-step grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="font-display text-[22px] text-taupe">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="label text-[13px] text-cocoa">{j.t}</p>
                    <p className="mt-1.5 text-[14px] leading-[1.8] text-ink-soft">{j.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-12">
              <ViewMore href="/rituals">The full ritual</ViewMore>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
