import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CareNote, PageHeader } from "@/components/site/PageHeader";
import { care, cafe, heatRooms, journey, media, px } from "@/lib/content";

export const metadata: Metadata = {
  title: "The ritual",
  description: "A half-day Korean bathhouse ritual for women in Chennai: bathe, heat, scrub, rest and savour, in about four hours.",
};

export default function RitualsPage() {
  return (
    <main className="relative bg-white">
      <Reveal>
        <PageHeader
          eyebrow="The ritual · about four hours"
          title="A half-day reset"
          intro="A jjimjilbang is a Korean bathhouse: warm baths, heated themed rooms, a lounge and good food. Not a one-hour massage, but a slow afternoon that leaves skin, scalp and mind visibly refreshed."
          image={media.hero}
          image2={media.sauna}
        />

        {/* Journey */}
        <section data-tone="light" className="px-6 pb-24 md:px-[10vw]">
          <ol className="grid gap-px border border-stone bg-stone md:grid-cols-3">
            {journey.map((j, i) => (
              <li key={j.t} className="bg-white" data-reveal>
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={px(j.img.id, 900)} alt={j.img.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-7">
                  <p className="label text-[10px] text-taupe">Step {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 font-display text-3xl uppercase tracking-tight">{j.t}</h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{j.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Heat rooms */}
        <section id="heat-rooms" data-tone="dark" className="scroll-mt-20 bg-navy-deep px-6 py-24 text-pearl md:px-[10vw] md:py-36">
          <p className="label text-[10px] text-champagne" data-reveal>Jjimjil rooms</p>
          <h2 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-7xl" data-lines>
            Five heated rooms, one ice room, one circuit
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-pearl/75" data-reveal>
            Each door carries a placard with the room&apos;s temperature and a short guide, in English, Tamil and Korean. Start gentle, stay
            as long as feels good, and drink cold water between rooms.
          </p>
          <ul className="mt-14 grid gap-px border border-pearl/15 bg-pearl/15 md:grid-cols-3">
            {heatRooms.map((r) => (
              <li key={r.name} className="flex flex-col bg-navy-deep p-7" data-reveal>
                <p className="font-display text-4xl tabular-nums text-champagne">{r.temp}</p>
                <h3 className="mt-6 font-display text-2xl uppercase tracking-tight">{r.name}</h3>
                <p className="label mt-1 text-[10px] text-pearl/50">{r.ko}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-pearl/75">{r.d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Wet zone + lounge */}
        <section data-tone="light" className="grid gap-12 px-6 py-24 md:grid-cols-2 md:px-[10vw] md:py-36">
          <div className="relative aspect-[4/5] overflow-hidden" data-arch>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={px(media.pool.id, 1400)} alt={media.pool.alt} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="label text-[10px] text-taupe" data-reveal>Baths and pools</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl" data-reveal>Hot, warm, cold</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft" data-reveal>
              Korean seated shower stations with a stool, basin and hand shower; a hot pool at 40 °C, a warm pool at 37 °C and a cold plunge
              at 15 °C. Private shower cubicles are always available, and swimwear is welcome.
            </p>
            <p className="label mt-14 text-[10px] text-taupe" data-reveal>The lounge</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl" data-reveal>Ondol warmth</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft" data-reveal>
              A heated-floor lounge in powder blue and sage, with mats, loungers, massage chairs, sheep-head towels and a sheet mask. Then the
              café: {cafe.line.toLowerCase()}
            </p>
          </div>
        </section>

        {/* Care */}
        <section data-tone="light" className="bg-sky px-6 py-24 md:px-[10vw] md:py-32">
          <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="label text-[10px] text-taupe" data-reveal>Your safety</p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl" data-reveal>Cared for, quietly</h2>
              <Link href="/menu" className="label mt-10 inline-block bg-cream px-7 py-4 text-[11px] text-cocoa shadow-[0_6px_16px_-6px_rgba(110,59,48,.35)] outline outline-[1.5px] -outline-offset-[5px] outline-gold transition-colors hover:bg-white" data-reveal>
                Explore the menu
              </Link>
            </div>
            <div>
              <ul className="divide-y divide-stone border-y border-stone">
                {care.map((c) => (
                  <li key={c} className="py-4 text-[15px]" data-reveal>{c}</li>
                ))}
              </ul>
              <CareNote className="mt-10" />
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
