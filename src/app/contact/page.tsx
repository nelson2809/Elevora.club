import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CareNote, PageHeader } from "@/components/site/PageHeader";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { media, site } from "@/lib/content";

export const metadata: Metadata = { title: "Join the waitlist" };

export default async function Contact({ searchParams }: { searchParams: Promise<{ interest?: string }> }) {
  const { interest } = await searchParams;
  return (
    <main className="relative bg-white">
      <Reveal>
        <PageHeader
          eyebrow="Waitlist and enquiries"
          title="Be first in"
          image={media.sheetMask}
          image2={media.towels}
          intro="Elevora Seoul Spa opens soon in Chennai. Join the waitlist to hear first, to be invited to our K-beauty facial and head-spa preview days, and to be offered a founding-member rate."
        />
        <section data-tone="light" className="grid gap-16 px-6 pb-24 md:grid-cols-[1.3fr_1fr] md:px-[10vw]">
          <div data-reveal>
            <EnquiryForm defaultInterest={interest ?? ""} />
          </div>
          <aside className="space-y-8 text-[15px]" data-reveal>
            <div>
              <p className="label text-[10px] text-taupe">Where</p>
              <p className="mt-2">{site.city}</p>
            </div>
            <div>
              <p className="label text-[10px] text-taupe">Hours</p>
              <p className="mt-2">{site.hours}</p>
            </div>
            <div>
              <p className="label text-[10px] text-taupe">Email</p>
              <a href={`mailto:${site.email}`} className="mt-2 block underline-offset-4 hover:underline">{site.email}</a>
            </div>
            <div>
              <p className="label text-[10px] text-taupe">Who</p>
              <p className="mt-2 text-ink-soft">Women guests only, with an all-women team.</p>
            </div>
            <CareNote />
          </aside>
        </section>
      </Reveal>
    </main>
  );
}
