import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader, CareNote } from "@/components/site/PageHeader";

// Draft outlines only: final wording must be reviewed by legal counsel before launch.
const pages: Record<string, { title: string; sections: [string, string][] }> = {
  privacy: {
    title: "Privacy notice",
    sections: [
      ["What we collect", "Your name, email and the details you share in an enquiry or waitlist form. At a visit we also keep a client register and the short health declaration you complete at check-in."],
      ["Why", "To reply to you, manage the waitlist and bookings, keep you safe during your visit, issue invoices, and keep the client register that spas in Chennai are required to hold. We send news and offers only if you opt in."],
      ["Cameras", "CCTV records only at the entrance and exit. There are never cameras in changing rooms, wet areas, heat rooms or treatment rooms."],
      ["Where and how long", "Data is stored with providers in India where possible. Enquiries and waitlist details are kept for 12 months unless you become a guest; guest records and registers are kept as required by law."],
      ["Your rights", "Under the Digital Personal Data Protection Act 2023 you may access, correct or erase your data, withdraw consent, nominate a representative and raise a grievance."],
      ["Grievance officer", "For any privacy question or grievance, email elevoraservice@gmail.com with the subject \"Privacy\". We will acknowledge your request and respond within the time required by law."],
    ],
  },
  terms: {
    title: "Terms of visit",
    sections: [
      ["Women only", "Elevora Seoul Spa admits women guests only, and our team is all women."],
      ["Health", "Heat rooms, pools and some treatments are not suitable for everyone. Please answer the check-in health questions honestly and follow staff guidance and room timers."],
      ["House rules", "Phones stay in lockers in the wet zones. Children are not admitted to the wet zones or heat rooms. Please shower before using the pools."],
      ["Fees", "Prices are in INR before 5% GST, which is added at billing. Café and retail purchases are charged to your wristband and settled at checkout."],
      ["Governing law", "These terms are governed by the laws of India, with courts in Chennai having jurisdiction."],
    ],
  },
  "cancellation-refund": {
    title: "Cancellation and refunds",
    sections: [
      ["Rescheduling", "Free rescheduling up to 24 hours before your visit."],
      ["Deposits", "Bookings are held with a deposit. Cancel more than 24 hours ahead and your deposit is refunded in full."],
      ["Late cancellation and no-shows", "A booking cancelled within 24 hours, or missed, forfeits the deposit."],
      ["Packages and memberships", "Multi-visit packages such as Bridal Glow can be rescheduled within their validity. Membership visits are valid in the month they are issued."],
    ],
  },
  "health-safety": {
    title: "Health and safety",
    sections: [
      ["At check-in", "A short declaration covering pregnancy, heart conditions and blood pressure. Our team will suggest what is suitable for you."],
      ["In the heat rooms", "Every room shows its temperature and has a timer, cold drinking water and an emergency call button. A trained first-aider is on every shift."],
      ["Water", "Pools are filtered with UV and automatic chlorine and pH control. Pool water is tested every two hours and logged daily; hot water is stored at 60 °C or above."],
      ["Hygiene", "Heat rooms are cleaned hourly. Every guest receives a fresh robe, two towels and amenities, and scrub mitts are single-use or laundered per guest."],
      ["Products", "We use only cosmetics registered with CDSCO, bought from authorised channels in India."],
      ["Not offered", "V-steam and medical-aesthetic procedures such as injectables, lasers and chemical peels beyond cosmetic strength."],
    ],
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((legal) => ({ legal }));
}

export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const { legal } = await params;
  return { title: pages[legal]?.title ?? "Not found" };
}

export default async function LegalPage({ params }: { params: Promise<{ legal: string }> }) {
  const { legal } = await params;
  const page = pages[legal];
  if (!page) notFound();
  return (
    <main className="relative bg-white">
      <Reveal>
        <PageHeader eyebrow="Elevora Seoul Spa" title={page.title} intro="Questions about this page? Email elevoraservice@gmail.com." />
        <section data-tone="light" className="max-w-3xl space-y-10 px-6 pb-24 md:px-[10vw] md:max-w-none">
          {page.sections.map(([h, b]) => (
            <div key={h} className="max-w-2xl" data-reveal>
              <h2 className="font-display text-2xl uppercase tracking-tight">{h}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{b}</p>
            </div>
          ))}
          <CareNote className="max-w-2xl" />
        </section>
      </Reveal>
    </main>
  );
}
