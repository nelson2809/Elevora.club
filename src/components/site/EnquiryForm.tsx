"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";

const field =
  "mt-1 w-full border-0 border-b border-stone bg-transparent px-0 py-2 text-[15px] outline-none transition focus:border-champagne-deep";

export function EnquiryForm({ kind = "individual", defaultInterest = "" }: { kind?: "individual" | "corporate"; defaultInterest?: string }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { ok: false, message: "" });

  if (state.ok)
    return (
      <div className="mt-8 border border-champagne/50 bg-cream p-8">
        <p className="font-display text-2xl uppercase tracking-tight">Received</p>
        <p className="mt-3 text-[15px] text-ink-soft">{state.message}</p>
      </div>
    );

  const err = (k: string) => state.errors?.[k] && <span className="mt-1 block text-[12px] text-red-700">{state.errors[k]}</span>;

  return (
    <form action={action} className="mt-8 grid gap-6" noValidate>
      <input type="hidden" name="kind" value={kind} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="label text-[10px]">
        Name
        <input name="name" required className={field} autoComplete="name" />
        {err("name")}
      </label>
      <label className="label text-[10px]">
        {kind === "corporate" ? "Work email" : "Email"}
        <input name="email" type="email" required className={field} autoComplete="email" />
        {err("email")}
      </label>
      {kind === "corporate" ? (
        <div className="grid gap-6 md:grid-cols-2">
          <label className="label text-[10px]">
            Company
            <input name="company" className={field} />
          </label>
          <label className="label text-[10px]">
            Number of women
            <input name="teamSize" className={field} />
          </label>
        </div>
      ) : (
        <label className="label text-[10px]">
          I am interested in
          <select name="interest" defaultValue={defaultInterest} className={field}>
            <option value="">Choose one</option>
            <option value="waitlist">The waitlist and opening news</option>
            <option value="founding-member">Founding membership</option>
            <option value="preview-days">K-beauty facial and head-spa preview days</option>
            <option value="package">A signature package</option>
            <option value="bridal">Bridal Glow</option>
            <option value="corporate">A corporate wellness day</option>
            <option value="other">Something else</option>
          </select>
        </label>
      )}
      <label className="label text-[10px]">
        {kind === "corporate" ? "Group size, occasion and preferred dates" : "Anything you would like us to know? (optional)"}
        <textarea name="message" rows={3} className={field} />
      </label>
      <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink-soft">
        <input type="checkbox" name="consentProcessing" className="mt-1 accent-champagne-deep" />
        <span>
          I agree that Elevora Seoul Spa may use these details to reply to my enquiry, as described in the{" "}
          <Link href="/privacy" className="underline">privacy notice</Link>.
          {err("consentProcessing")}
        </span>
      </label>
      <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink-soft">
        <input type="checkbox" name="consentMarketing" className="mt-1 accent-champagne-deep" />
        <span>Send me opening news, preview-day invitations and offers (optional).</span>
      </label>
      {state.message && !state.ok && <p className="text-[13px] text-red-700">{state.message}</p>}
      <button disabled={pending} className="label w-fit bg-cream px-8 py-4 text-[11px] text-cocoa shadow-[0_6px_16px_-6px_rgba(110,59,48,.35)] outline outline-[1.5px] -outline-offset-[5px] outline-gold transition hover:bg-white disabled:opacity-50">
        {pending ? "Sending…" : kind === "corporate" ? "Send enquiry" : "Join the waitlist"}
      </button>
      <p className="text-[12px] text-ink-soft">We reply within one business day. Women guests only.</p>
    </form>
  );
}
