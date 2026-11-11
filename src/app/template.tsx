"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Page change, after the reference: a white veil covers the old page and lifts off the new one. */
export default function Template({ children }: { children: React.ReactNode }) {
  const veil = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(veil.current, { autoAlpha: 0 });
      return;
    }
    gsap.fromTo(veil.current, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.9, ease: "power2.inOut", delay: 0.1 });
  });
  return (
    <>
      <div ref={veil} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] bg-white" />
      {children}
    </>
  );
}
