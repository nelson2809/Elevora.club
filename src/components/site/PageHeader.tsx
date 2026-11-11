"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { px, type Img } from "@/lib/content";

gsap.registerPlugin(SplitText, useGSAP);

/**
 * Inner-page opening, after the reference's "Contacts" page: a large picture slides in from the left
 * across half the screen, a smaller one drops in at the top right, and the thin capital title fades in
 * letter by letter on the right. The intro line follows, centred, on cream.
 */
export function PageHeader({ eyebrow, title, intro, image, image2 }: { eyebrow: string; title: string; intro?: string; image?: Img; image2?: Img }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const chars = SplitText.create(q(".ph-title"), { type: "chars,words", charsClass: "split-char" }).chars;
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
        if (q(".ph-a").length)
          tl.fromTo(q(".ph-a"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }, 0)
            .fromTo(q(".ph-a img"), { scale: 1.25, xPercent: -8 }, { scale: 1, xPercent: 0, duration: 2 }, 0);
        if (q(".ph-b").length)
          tl.fromTo(q(".ph-b"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }, 0.35);
        tl.from(chars, { opacity: 0, filter: "blur(4px)", duration: 1, ease: "power2.out", stagger: { each: 0.04, from: "random" } }, 0.6)
          .from(q(".ph-eyebrow, .ph-intro"), { opacity: 0, y: 16, duration: 1, stagger: 0.15, ease: "power3.out" }, 1);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-tone="light" className="relative bg-cream pt-[60px] md:pt-[92px]">
      {image ? (
        <div className="relative grid md:min-h-[78vh] md:grid-cols-2">
          <div className="ph-a relative h-[46vh] overflow-hidden md:h-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(image.id, 1800)} alt={image.alt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
          </div>
          <div className="relative flex flex-col justify-center px-6 py-16 md:px-[5vw]">
            {image2 && (
              <div className="ph-b absolute right-[6%] top-0 hidden aspect-[3/4] w-[24%] overflow-hidden md:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={px(image2.id, 700)} alt={image2.alt} className="h-full w-full object-cover" />
              </div>
            )}
            <p className="ph-eyebrow label text-[11px] text-taupe">{eyebrow}</p>
            <h1 className="ph-title mt-5 font-display text-[12vw] uppercase leading-[1.05] tracking-[0.04em] text-taupe md:text-[4.8vw]">{title}</h1>
          </div>
        </div>
      ) : (
        <div className="px-6 pb-6 pt-[14vh] text-center md:px-[10vw]">
          <p className="ph-eyebrow label text-[11px] text-taupe">{eyebrow}</p>
          <h1 className="ph-title mt-5 font-display text-[12vw] uppercase leading-[1.05] tracking-[0.04em] text-taupe md:text-[5.4vw]">{title}</h1>
        </div>
      )}
      {intro && (
        <p className="ph-intro mx-auto max-w-[760px] px-6 py-[12vh] text-center font-serif text-[21px] font-light leading-[1.8] text-cocoa md:text-[1.6vw]">
          {intro}
        </p>
      )}
    </section>
  );
}

/** Short note shown under menus and booking forms. */
export function CareNote({ className }: { className?: string }) {
  return (
    <p className={`border-l-[1.5px] border-gold pl-4 text-[13px] leading-relaxed text-ink-soft ${className ?? ""}`}>
      Elevora Seoul Spa is for women only, with an all-women team. Heat rooms and some treatments are not suitable during pregnancy or
      with heart conditions or high blood pressure; we ask a few short health questions at check-in. We do not offer V-steam or any
      medical-aesthetic procedure.
    </p>
  );
}
