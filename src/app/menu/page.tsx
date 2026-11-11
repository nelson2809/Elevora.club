import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CareNote, PageHeader } from "@/components/site/PageHeader";
import { cafe, media, menu, px, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Spa menu and prices",
  description: "Facilities pass, Korean body scrub, K-beauty facials, Korean head spa, massage and beauty add-ons at Elevora Seoul Spa, Chennai.",
};

export default function MenuPage() {
  return (
    <main className="relative bg-white">
      <Reveal>
        <PageHeader
          eyebrow="The menu"
          title="Spa menu"
          intro="Every ritual begins with time in the baths and heat rooms. Signature rituals are marked with a star; they open first, and the rest of the menu follows as our therapists are certified."
          image={media.facialMask}
          image2={media.jadeTools}
        />

        {/* Section index */}
        <nav aria-label="Menu sections" className="sticky top-[60px] z-20 border-y border-stone bg-white/90 backdrop-blur md:top-[92px]">
          <ul className="flex gap-6 overflow-x-auto px-6 py-3 md:justify-center md:px-[10vw]">
            {menu.map((s) => (
              <li key={s.id} className="shrink-0">
                <a href={`#${s.id}`} className="label text-[10px] hover:text-cocoa">{s.title}</a>
              </li>
            ))}
            <li className="shrink-0"><a href="#cafe" className="label text-[10px] hover:text-cocoa">Café</a></li>
          </ul>
        </nav>

        <section data-tone="light" className="px-6 pb-24 md:px-[10vw]">
          {menu.map((s) => (
            <article id={s.id} key={s.id} className="grid scroll-mt-32 gap-10 border-b border-stone py-16 md:grid-cols-[0.9fr_1.4fr] md:gap-16 md:py-24">
              <div>
                <div className="relative aspect-[4/5] overflow-hidden" data-arch>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={px(s.img.id, 1200)} alt={s.img.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
              <div>
                <p className="label text-[10px] text-taupe" data-reveal>{s.no} — 06{s.ko ? ` · ${s.ko}` : ""}</p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl" data-reveal>{s.title}</h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft" data-reveal>{s.intro}</p>
                <ul className="mt-10 divide-y divide-stone border-y border-stone">
                  {s.items.map((it) => (
                    <li key={it.name} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5" data-reveal>
                      <p className="text-[16px] leading-snug">
                        {it.signature && <span className="mr-2 text-champagne-deep" aria-label="Signature ritual">★</span>}
                        {it.name}
                      </p>
                      <p className="font-display text-xl tabular-nums">₹{it.price}</p>
                      {(it.time || it.note) && (
                        <p className="col-span-2 text-[12px] uppercase tracking-[0.18em] text-ink-soft">
                          {[it.time, it.note].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <article id="cafe" className="grid scroll-mt-32 gap-10 py-16 md:grid-cols-[0.9fr_1.4fr] md:gap-16 md:py-24">
            <div className="relative aspect-[4/5] overflow-hidden" data-arch>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={px(media.tea.id, 1200)} alt={media.tea.alt} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div data-reveal>
              <p className="label text-[10px] text-taupe">Café and lounge</p>
              <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">Korean café</h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">{cafe.line} Charged to your wristband.</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {cafe.items.map((c) => (
                  <li key={c} className="border border-gold px-4 py-2 text-[13px]">{c}</li>
                ))}
              </ul>
            </div>
          </article>

          <div className="mt-6 grid gap-8 border-t border-stone pt-12 md:grid-cols-2">
            <div data-reveal>
              <p className="text-[14px] text-ink-soft">★ Signature ritual, available from opening day. {site.gst}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/packages" className="label border-[1.5px] border-gold px-7 py-4 text-[11px] text-cocoa transition-colors hover:bg-cream">See packages</Link>
                <Link href="/contact" className="label bg-cream px-7 py-4 text-[11px] text-cocoa shadow-[0_6px_16px_-6px_rgba(110,59,48,.35)] outline outline-[1.5px] -outline-offset-[5px] outline-gold transition-colors hover:bg-white">Join the waitlist</Link>
              </div>
            </div>
            <CareNote />
          </div>
        </section>
      </Reveal>
    </main>
  );
}
