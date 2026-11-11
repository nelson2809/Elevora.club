import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CareNote, PageHeader } from "@/components/site/PageHeader";
import { media, packages, px, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Signature packages",
  description: "Seoul Starter, Glass Skin Day, Royal Elevora, Bridal Glow, Mother-Daughter and Corporate Wellness Day packages. Day pass included.",
};

export default function PackagesPage() {
  return (
    <main className="relative bg-white">
      <Reveal>
        <PageHeader
          eyebrow="Signature packages · day pass included"
          title="Packages"
          intro="Our favourite combinations, each with a day pass for the baths, heat rooms and lounge."
          image={media.serum}
          image2={media.sheetMask}
        />
        <section data-tone="light" className="px-6 pb-24 md:px-[10vw]">
          <div className="grid gap-px overflow-hidden border border-stone bg-stone md:grid-cols-2 lg:grid-cols-3">
            {packages.map((p, i) => (
              <article key={p.name} className="group flex flex-col bg-white" data-reveal>
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={px(p.img.id, 1000)} alt={p.img.alt} className="h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-105" loading="lazy" />
                  {"signature" in p && p.signature && (
                    <span className="label absolute left-4 top-4 bg-white/90 px-3 py-1.5 text-[9px] text-champagne-deep">★ Signature</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="label text-[10px] text-taupe">{String(i + 1).padStart(2, "0")} — {String(packages.length).padStart(2, "0")}</p>
                  <h2 className="mt-3 font-display text-3xl uppercase leading-none tracking-tight">{p.name}</h2>
                  <p className="mt-3 text-[14px] text-ink-soft">{p.line}</p>
                  <ul className="mt-6 space-y-1.5 text-[14px]">
                    {p.contents.map((c) => (
                      <li key={c}>— {c}</li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-8 font-display text-3xl">{p.price === "On request" ? "On request" : `₹${p.price}`}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div data-reveal>
              <p className="text-[14px] text-ink-soft">{site.gst}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact?interest=package" className="label bg-cream px-7 py-4 text-[11px] text-cocoa shadow-[0_6px_16px_-6px_rgba(110,59,48,.35)] outline outline-[1.5px] -outline-offset-[5px] outline-gold transition-colors hover:bg-white">Reserve a package</Link>
                <Link href="/corporate" className="label border-[1.5px] border-gold px-7 py-4 text-[11px] text-cocoa transition-colors hover:bg-cream">Corporate wellness day</Link>
              </div>
            </div>
            <CareNote />
          </div>
        </section>
      </Reveal>
    </main>
  );
}
