import Link from "next/link";
import { media, px, site } from "@/lib/content";

/**
 * Footer, after the reference: a squares band closes the page, which then lifts like a curtain to
 * reveal a fixed full-screen photograph with the address block at the top and a giant navy
 * ELEVORA wordmark printed into the picture (multiply blend).
 */
export function CurtainFooter() {
  return (
    <>
      <div className="relative z-0 bg-white">
        <div className="band-squares" aria-hidden="true" />
      </div>
      <div aria-hidden="true" className="pointer-events-none h-[100svh]" />
      <footer className="fixed inset-x-0 bottom-0 -z-10 h-[100svh] overflow-hidden bg-sky text-cocoa">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={px(media.tea.id, 2400)} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/55 to-white/25" />

        <div className="relative flex h-full flex-col">
          <div className="flex flex-col items-center px-6 pt-[16vh] text-center text-[14px] uppercase leading-[2.1] tracking-[0.12em] md:pt-[14vh] md:text-[15px]">
            <p>{site.name} · {site.city}</p>
            <p>{site.hours} · Women only</p>
            <p>
              <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">{site.email}</a>
            </p>
            <p className="mt-6 text-[12px] text-ink-soft">© {new Date().getFullYear()} {site.legalName}</p>
          </div>

          <div className="mt-auto flex flex-col items-center pb-[13vh] mix-blend-multiply md:pb-[12vh]">
            <p className="font-sans text-[19vw] font-medium uppercase leading-none tracking-[0.06em] text-navy md:text-[14.5vw]">Elevora</p>
            <p className="mt-2 font-sans text-[4.2vw] uppercase tracking-[0.5em] text-navy md:text-[2.4vw]">Seoul Spa</p>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-6 text-[12px] uppercase tracking-[0.12em] md:px-[2.5vw] md:pb-8 md:text-[13px]">
            <div className="flex flex-col gap-2 md:gap-3">
              <Link href="/privacy" className="hover:underline">Privacy policy</Link>
              <Link href="/terms" className="hover:underline">Terms of visit</Link>
              <Link href="/cancellation-refund" className="hidden hover:underline md:block">Cancellation</Link>
            </div>
            <div className="flex flex-col items-end gap-2 md:gap-3">
              <Link href="/health-safety" className="hover:underline">Health & safety</Link>
              <Link href="/contact" className="hover:underline">Join the waitlist</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
