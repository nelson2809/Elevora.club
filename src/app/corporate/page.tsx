import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Corporate wellness days",
  description: "Book an exclusive weekday slot at Elevora Seoul Spa for 10 to 20 women: Women's Day, team wellness and women's networks.",
};

const includes = [
  "An exclusive weekday slot for 10 to 20 women",
  "Day passes: baths, pools, heat rooms and the heated-floor lounge",
  "A choice of rituals: body scrub, facial, head spa or massage",
  "A Korean café set for the group",
  "Women's Day, wellness-benefit and team-celebration formats",
];

export default function Corporate() {
  return (
    <main className="relative bg-white">
      <Reveal>
        <PageHeader
          eyebrow="For HR teams and women's networks"
          title="Wellness days"
          intro="Give your team a half-day reset: an exclusive weekday slot, women only, with rituals and a Korean café set tailored to your group."
          image={media.towels}
          image2={media.tea}
        />
        <section data-tone="light" className="grid gap-16 px-6 pb-24 md:grid-cols-2 md:px-[10vw]">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-tight" data-reveal>What&apos;s included</h2>
            <ul className="mt-6 divide-y divide-stone border-y border-stone">
              {includes.map((t) => (
                <li key={t} className="py-4 text-[15px]" data-reveal>{t}</li>
              ))}
            </ul>
            <p className="mt-8 font-display text-2xl" data-reveal>Priced on request</p>
            <p className="mt-2 text-[13px] text-ink-soft" data-reveal>
              Quoted for your group size, rituals and date. Prices before 5% GST.
            </p>
            <p className="label mt-10 text-[10px] text-ink-soft" data-reveal>Enquiry → call → proposal → your day</p>
          </div>
          <div id="enquire" className="scroll-mt-24" data-reveal>
            <h2 className="font-display text-3xl uppercase tracking-tight">Request a proposal</h2>
            <EnquiryForm kind="corporate" />
          </div>
        </section>
      </Reveal>
    </main>
  );
}
