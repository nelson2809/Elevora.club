import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { LogoPrimary } from "@/components/brand/Logo";
import { audiences, differences, media, promises, px, site } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: site.vision };

export default function About() {
  return (
    <main className="relative bg-white">
      <Reveal>
        <PageHeader eyebrow="About Elevora Seoul Spa" title="Seoul in Chennai" intro={site.vision} image={media.jade} image2={media.robe2} />

        <section data-tone="light" className="grid gap-16 px-6 pb-24 md:grid-cols-2 md:px-[10vw]">
          <div data-reveal>
            <p className="label text-[10px] text-taupe">Our promise</p>
            <p className="mt-4 font-display text-3xl uppercase leading-tight tracking-tight md:text-4xl">
              {site.tagline}. {site.promise}
            </p>
          </div>
          <div data-reveal>
            <p className="label text-[10px] text-taupe">Why women only</p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              Comfort and safety decide where many women choose to unwind. With women guests and an all-women team, the main barrier to
              communal bathing simply disappears, and a Korean bathhouse becomes somewhere you can truly switch off.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              And because modesty is personal, you choose how you bathe: swimwear-friendly pools, private shower cubicles and a private scrub
              room are always there.
            </p>
          </div>
        </section>

        {/* Promises */}
        <section data-tone="light" className="bg-cream px-6 py-24 md:px-[10vw]">
          <h2 className="font-display text-4xl uppercase tracking-tight md:text-6xl" data-lines>Five promises</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-5">
            {promises.map((d, i) => (
              <div key={d.t} data-reveal>
                <p className="label text-[10px] text-champagne-deep">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-xl uppercase tracking-tight">{d.t}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{d.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Difference table */}
        <section data-tone="light" className="px-6 py-24 md:px-[10vw] md:py-32">
          <p className="label text-[10px] text-taupe" data-reveal>The difference</p>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-tight md:text-6xl" data-reveal>Not a day spa</h2>
          <div className="mt-12 overflow-x-auto" data-reveal>
            <table className="w-full min-w-[620px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-ink/30">
                  <th className="label py-4 pr-6 text-[10px] font-normal text-ink-soft"> </th>
                  <th className="label py-4 pr-6 text-[10px] font-normal text-ink-soft">A typical day spa</th>
                  <th className="label py-4 text-[10px] font-normal text-taupe">Elevora Seoul Spa</th>
                </tr>
              </thead>
              <tbody>
                {differences.map(([k, a, b]) => (
                  <tr key={k} className="border-b border-stone">
                    <th scope="row" className="py-5 pr-6 font-display text-lg font-normal uppercase tracking-tight">{k}</th>
                    <td className="py-5 pr-6 text-ink-soft">{a}</td>
                    <td className="py-5">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Design */}
        <section id="house" data-tone="light" className="grid scroll-mt-24 gap-12 bg-sky px-6 py-24 md:grid-cols-[1fr_1.3fr] md:px-[10vw] md:py-32">
          <div className="relative aspect-[4/5] overflow-hidden" data-arch>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.towels.id, 1200)} alt={media.towels.alt} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center" data-reveal>
            <p className="label text-[10px] text-taupe">The house</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">Paris meets Seoul</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
              An arched, backlit logo wall and a fluted ivory desk at reception. Powder-blue and sage upholstery, cove lighting and greenery in
              the lounge. Ivory and soft beige with champagne-gold fittings in the baths. Clay, salt, jade and hinoki in the heat rooms. Frosted
              glass wherever a door has a window.
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
              On the K-beauty wall: luxury hanbang skincare and Korean professional lines, bought only through authorised Indian channels.
            </p>
            <div className="mt-12 w-56 text-jade"><LogoPrimary /></div>
          </div>
        </section>

        {/* Who it's for */}
        <section data-tone="light" className="px-6 py-24 md:px-[10vw] md:py-32">
          <p className="label text-[10px] text-taupe" data-reveal>Made for</p>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-tight md:text-6xl" data-reveal>Every Chennai woman</h2>
          <div className="mt-12 grid gap-px border border-stone bg-stone md:grid-cols-3">
            {audiences.map((a) => (
              <article key={a.t} className="bg-white p-7" data-reveal>
                <h3 className="font-display text-2xl uppercase leading-none tracking-tight">{a.t}</h3>
                <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">{a.d}</p>
                <p className="label mt-6 text-[10px] text-champagne-deep">{a.offer}</p>
              </article>
            ))}
          </div>
          <Link href="/contact" className="label mt-12 inline-block bg-cream px-7 py-4 text-[11px] text-cocoa shadow-[0_6px_16px_-6px_rgba(110,59,48,.35)] outline outline-[1.5px] -outline-offset-[5px] outline-gold transition-colors hover:bg-white" data-reveal>
            Join the waitlist
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
