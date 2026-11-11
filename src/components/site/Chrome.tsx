"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SunMark } from "@/components/brand/Logo";

gsap.registerPlugin(useGSAP);

const columns = [
  {
    title: "The Spa",
    href: "/rituals",
    links: [
      { href: "/rituals", label: "The ritual" },
      { href: "/rituals#heat-rooms", label: "Heat rooms" },
      { href: "/about", label: "Why women only" },
      { href: "/about#house", label: "The house" },
      { href: "/health-safety", label: "Health & safety" },
    ],
  },
  {
    title: "Menu",
    href: "/menu",
    links: [
      { href: "/menu#facilities-pass", label: "Facilities pass" },
      { href: "/menu#body-scrub", label: "Korean body scrub" },
      { href: "/menu#facials", label: "Korean facials" },
      { href: "/menu#head-spa", label: "Korean head spa" },
      { href: "/menu#body", label: "Massage & therapies" },
      { href: "/menu#beauty", label: "Beauty add-ons" },
      { href: "/menu#cafe", label: "Korean café" },
    ],
  },
  {
    title: "Packages",
    href: "/packages",
    links: [
      { href: "/packages", label: "Seoul Starter" },
      { href: "/packages", label: "Glass Skin Day" },
      { href: "/packages", label: "Royal Elevora" },
      { href: "/contact?interest=bridal", label: "Bridal Glow" },
      { href: "/packages", label: "Mother-Daughter" },
    ],
  },
];

const side = [
  { href: "/faq", label: "Faq" },
  { href: "/contact", label: "Waitlist" },
  { href: "/corporate", label: "Corporate Days" },
  { href: "/contact?interest=founding-member", label: "Founding Members" },
];

function BoxButton({ children, gold = false, ...rest }: { children: React.ReactNode; gold?: boolean } & React.ComponentProps<"span">) {
  return (
    <span
      {...rest}
      className={`label inline-flex h-11 items-center justify-center bg-cream px-4 text-[11px] text-cocoa shadow-[0_6px_16px_-6px_rgba(110,59,48,.35)] transition-colors duration-300 group-hover:bg-white md:h-[52px] md:px-5 md:text-[13px] ${
        gold ? "outline outline-[1.5px] -outline-offset-[5px] outline-gold" : ""
      }`}
    >
      {children}
    </span>
  );
}

/**
 * Site header and full-screen menu, after the reference:
 * a cream bar with a gold hairline (MENU box · golden E · JOIN WAITLIST box), hidden over the home hero
 * and dropping in once you scroll. The menu opens as a white sheet split by gold hairlines into
 * three link columns (title at the foot) and a stack of four large links.
 */
export function Chrome() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const bar = useRef<HTMLElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const shown = useRef<boolean | null>(null);

  // Show/hide the bar: over the home hero card it stays out of the way.
  useEffect(() => {
    setOpen(false);
    shown.current = pathname === "/" ? false : null;
    const check = () => {
      const hide = pathname === "/" && window.scrollY < window.innerHeight * 0.55;
      const show = !hide;
      if (show === shown.current) return;
      shown.current = show;
      if (show) gsap.fromTo(bar.current, { yPercent: -110, autoAlpha: 1 }, { yPercent: 0, duration: 0.9, ease: "expo.out", overwrite: true });
      else gsap.to(bar.current, { yPercent: -110, duration: 0.45, ease: "power2.in", overwrite: true, onComplete: () => gsap.set(bar.current, { autoAlpha: 0 }) });
    };
    check();
    gsap.ticker.add(check);
    return () => gsap.ticker.remove(check);
  }, [pathname]);

  useGSAP(() => {
    const s = sheet.current!;
    gsap.set(s, { autoAlpha: 0 });
    tl.current = gsap
      .timeline({ paused: true })
      .set(s, { autoAlpha: 1 })
      .fromTo(s, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" }, 0)
      .fromTo(s.querySelectorAll("[data-rule]"), { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 0%", duration: 1, ease: "expo.out", stagger: 0.06 }, 0.35)
      .fromTo(s.querySelectorAll("[data-hrule]"), { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: 1, ease: "expo.out", stagger: 0.06 }, 0.45)
      .fromTo(s.querySelectorAll("[data-item]"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.025 }, 0.5);
  });

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!tl.current) return;
    if (open) {
      lenis?.stop();
      gsap.to(bar.current, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "expo.out", overwrite: true });
      tl.current.timeScale(reduce ? 20 : 1).play();
    } else {
      lenis?.start();
      tl.current.timeScale(reduce ? 20 : 1.6).reverse();
      if (shown.current === false) shown.current = true; // bar is visible now; let the scroll check decide
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header
        ref={bar}
        data-chrome
        style={pathname === "/" ? { visibility: "hidden" } : undefined}
        className="fixed inset-x-0 top-0 z-[70] h-[60px] border-b-[1.5px] border-gold bg-cream/90 backdrop-blur-md md:h-[92px]"
      >
        <div className="relative grid h-full grid-cols-[1fr_auto_1fr] items-center px-3 md:grid-cols-4 md:px-0">
          {/* hairlines between header cells when the menu is open */}
          <span className={`pointer-events-none absolute inset-y-0 left-1/4 hidden w-[1.5px] bg-gold transition-opacity duration-500 md:block ${open ? "opacity-100" : "opacity-0"}`} />
          <span className={`pointer-events-none absolute inset-y-0 right-1/4 hidden w-[1.5px] bg-gold transition-opacity duration-500 md:block ${open ? "opacity-100" : "opacity-0"}`} />

          <div className="flex items-center gap-4 md:pl-[5.6vw]">
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-menu" className="group outline-none">
              <BoxButton>{open ? "Close" : "Menu"}</BoxButton>
            </button>
            <span className="label hidden whitespace-nowrap text-[10px] text-taupe xl:inline">Women only · Chennai</span>
          </div>

          <Link href="/" aria-label="Elevora Seoul Spa home" onClick={close} className="justify-self-center md:col-span-2">
            <SunMark className="h-10 w-auto md:h-[64px]" />
          </Link>

          <Link href="/contact" onClick={close} className="group justify-self-end md:pr-[5.6vw]">
            <BoxButton gold>
              <span className="hidden sm:inline">Join the waitlist</span>
              <span className="sm:hidden">Waitlist</span>
            </BoxButton>
          </Link>
        </div>
      </header>

      <div
        ref={sheet}
        id="site-menu"
        aria-hidden={!open}
        inert={!open}
        className="invisible fixed inset-0 z-[65] overflow-y-auto bg-white pt-[60px] text-cocoa md:overflow-hidden md:pt-[92px]"
      >
        <div className="relative grid min-h-full md:h-full md:grid-cols-4">
          {columns.map((c, i) => (
            <nav
              key={c.title}
              aria-label={c.title}
              className={`group/col relative flex flex-col justify-between border-b-[1.5px] border-gold px-6 py-8 transition-colors duration-500 hover:bg-cream md:border-b-0 md:px-[5vw] md:py-[6vh] ${
                pathname.startsWith(c.href) ? "bg-cream" : ""
              }`}
            >
              {i > 0 && <span data-rule className="absolute inset-y-0 left-0 hidden w-[1.5px] bg-gold md:block" />}
              <ul className="space-y-3 md:mt-auto md:space-y-[1.4vh]">
                {c.links.map((l) => (
                  <li key={l.label} data-item>
                    <Link href={l.href} onClick={close} className="group/l relative inline-block py-0.5 text-[13px] uppercase tracking-[0.12em] md:text-[14px]">
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-cocoa transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover/l:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={c.href} onClick={close} data-item className="mt-8 font-display text-[34px] leading-none md:mt-[12vh] md:text-[2.4vw]">
                {c.title}
              </Link>
            </nav>
          ))}
          <div className="relative grid md:grid-rows-4">
            <span data-rule className="absolute inset-y-0 left-0 hidden w-[1.5px] bg-gold md:block" />
            {side.map((s, i) => (
              <Link
                key={s.label}
                href={s.href}
                onClick={close}
                className="relative flex items-center border-b-[1.5px] border-gold px-6 py-6 font-display text-[28px] leading-none transition-colors duration-500 last:border-b-0 hover:bg-cream md:border-b-0 md:px-[5vw] md:py-0 md:text-[2.2vw]"
              >
                {i > 0 && <span data-hrule className="absolute inset-x-0 top-0 hidden h-[1.5px] bg-gold md:block" />}
                <span data-item>{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
