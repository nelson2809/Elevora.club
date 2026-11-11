"use server";

import { z } from "zod";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { sendEnquiryEmails } from "@/lib/mail";

const schema = z.object({
  kind: z.enum(["individual", "corporate"]),
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  interest: z.string().trim().max(60).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  teamSize: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consentProcessing: z.literal("on", { message: "Please agree so we can reply to you" }),
  consentMarketing: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot
});

export type EnquiryState = { ok: boolean; message: string; errors?: Record<string, string> };

/**
 * Phase A enquiry handler. Validates input, records consent with a timestamp and policy version,
 * appends to data/enquiries.jsonl, then emails the admin (new enquiry) and the person (confirmation)
 * through Gmail SMTP (see src/lib/mail.ts). Swap the storage for the Prisma `Lead` model later.
 */
export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const parsed = schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] = i.message;
    return { ok: false, message: "Please check the highlighted fields.", errors };
  }
  const d = parsed.data;
  const record = {
    receivedAt: new Date().toISOString(),
    kind: d.kind,
    name: d.name,
    email: d.email,
    phone: d.phone || null,
    interest: d.interest || null,
    company: d.company || null,
    teamSize: d.teamSize || null,
    message: d.message || null,
    consents: {
      serviceProcessing: { granted: true, version: "privacy-v0.1" },
      marketing: { granted: d.consentMarketing === "on", version: "privacy-v0.1" },
    },
    status: "NEW",
  };
  // Local log of enquiries. Hosts like Vercel have a read-only file system, so there the email
  // to the admin inbox is the record (until the database is added); a write failure never blocks the form.
  if (!process.env.VERCEL) {
    try {
      const dir = path.join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "enquiries.jsonl"), JSON.stringify(record) + "\n", "utf8");
    } catch (e) {
      console.error("[enquiry] could not write data/enquiries.jsonl:", e);
    }
  }
  const sent = await sendEnquiryEmails(record);
  return {
    ok: true,
    message: sent.customer
      ? `Thank you. We have sent a confirmation to ${d.email} and will reply within one business day.`
      : "Thank you. We will reply within one business day.",
  };
}
