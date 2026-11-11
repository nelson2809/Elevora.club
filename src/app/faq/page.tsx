import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CareNote, PageHeader } from "@/components/site/PageHeader";
import { faqs } from "@/lib/content";

export const metadata: Metadata = { title: "FAQ" };

export default function Faq() {
  return (
    <main className="relative bg-white">
      <Reveal>
        <PageHeader eyebrow="Questions" title="Good to know" />
        <section data-tone="light" className="px-6 pb-24 md:px-[10vw]">
          <div className="max-w-3xl divide-y divide-stone border-y border-stone">
            {faqs.map(([q, a]) => (
              <details key={q} className="group py-6" data-reveal>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl uppercase tracking-tight md:text-2xl">
                  {q}
                  <span className="text-champagne-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{a}</p>
              </details>
            ))}
          </div>
          <CareNote className="mt-12 max-w-2xl" />
        </section>
      </Reveal>
    </main>
  );
}
