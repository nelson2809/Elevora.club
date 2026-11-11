import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { MAIL_LOGO_PNG_BASE64 } from "@/lib/mail-logo";

/**
 * Enquiry emails over Gmail SMTP.
 * Credentials come from .env.local (never committed):
 *   GMAIL_USER=elevoraservice@gmail.com
 *   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   (Google "App password", not the normal password)
 *   ADMIN_EMAIL=elevoraservice@gmail.com     (optional, defaults to GMAIL_USER)
 * Optional for local testing: SMTP_HOST, SMTP_PORT, SMTP_SECURE=false.
 */

export type EnquiryRecord = {
  receivedAt: string;
  kind: "individual" | "corporate";
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  company: string | null;
  teamSize: string | null;
  message: string | null;
  consents: { serviceProcessing: { granted: boolean }; marketing: { granted: boolean } };
};

const interestLabels: Record<string, string> = {
  waitlist: "Waitlist and opening news",
  "founding-member": "Founding membership",
  "preview-days": "Preview days (facial and head spa)",
  package: "Signature package",
  bridal: "Bridal Glow",
  corporate: "Corporate wellness day",
  other: "Something else",
};
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Strip line breaks so user input can never inject extra mail headers. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

let transporter: Transporter | null = null;

function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) return null;
  if (!transporter) {
    const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT ?? 465);
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      ...(process.env.SMTP_HOST ? { tls: { rejectUnauthorized: false } } : {}),
    });
  }
  return transporter;
}

// ---------- templates (Elevora Seoul Spa branding) ----------

const c = {
  sky: "#dbe8f7",
  cream: "#f8f5ef",
  white: "#ffffff",
  navy: "#1f3d68",
  cocoa: "#6e3b30",
  taupe: "#a68a80",
  soft: "#8a6b62",
  gold: "#d5b17c",
  line: "#ece3d6",
};
const serif = "Georgia,'Times New Roman',serif";
const sans = "Helvetica,Arial,sans-serif";
const site = process.env.SITE_URL || "https://www.elevora.club";
export const LOGO_CID = "elevora-mark@elevora.club";

/** Small caps label. */
const label = (t: string, color = c.soft) =>
  `<div style="font-family:${sans};font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${color}">${t}</div>`;

/** Square button with an inset gold outline, like the site's. */
const button = (href: string, text: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr><td style="background:${c.cream};padding:4px;box-shadow:0 6px 16px -6px rgba(110,59,48,.35)">
     <a href="${href}" style="display:block;border:1.5px solid ${c.gold};padding:13px 26px;font-family:${sans};font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:${c.cocoa};text-decoration:none">${text}</a>
   </td></tr></table>`;

/** Navy band edged in gold (the site's stripe band, email-safe). */
const band = `<tr><td style="padding:0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr><td height="2" style="height:2px;line-height:2px;font-size:0;background:${c.gold}">&nbsp;</td></tr>
  <tr><td height="8" style="height:8px;line-height:8px;font-size:0;background:${c.navy}">&nbsp;</td></tr>
  <tr><td height="2" style="height:2px;line-height:2px;font-size:0;background:${c.gold}">&nbsp;</td></tr></table></td></tr>`;

/** "WORD italic WORD" heading in the site's style. */
const duo = (a: string, s: string, b = "") =>
  `<h1 style="margin:0;font-family:${serif};font-weight:normal;font-size:27px;line-height:1.25;letter-spacing:3px;text-transform:uppercase;color:${c.taupe}">${a} <span style="font-style:italic;text-transform:none;letter-spacing:0;font-size:30px;color:${c.cocoa}">${s}</span> ${b}</h1>`;

function layout(preheader: string, heading: string, body: string) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="color-scheme" content="light"/><title>Elevora Seoul Spa</title></head>
<body style="margin:0;padding:0;background:${c.sky};color:${c.cocoa}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.sky};padding:22px 10px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:${c.white}">
        <tr><td align="center" style="padding:34px 32px 22px">
          <img src="cid:${LOGO_CID}" width="56" height="56" alt="Elevora" style="display:block;border:0;width:56px;height:56px"/>
          <div style="margin-top:12px;font-family:${serif};font-size:22px;letter-spacing:8px;color:${c.gold}">ELEVORA</div>
          <div style="margin-top:6px;font-family:${sans};font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${c.navy}">Seoul Spa · Chennai</div>
        </td></tr>
        <tr><td style="padding:0 32px"><div style="height:1px;background:${c.gold};line-height:1px;font-size:0">&nbsp;</div></td></tr>
        <tr><td align="center" style="padding:30px 32px 8px">${heading}</td></tr>
        <tr><td style="padding:14px 36px 34px;font-family:${sans};font-size:15px;line-height:1.75;color:${c.cocoa}">${body}</td></tr>
        ${band}
        <tr><td align="center" style="background:${c.cream};padding:22px 28px;font-family:${sans};font-size:11px;line-height:1.9;letter-spacing:1.5px;text-transform:uppercase;color:${c.soft}">
          Women only · 9:00 am – 9:00 pm, every day<br/>
          <a href="mailto:elevoraservice@gmail.com" style="color:${c.cocoa};text-decoration:none">elevoraservice@gmail.com</a> · <a href="${site}" style="color:${c.cocoa};text-decoration:none">elevora.club</a><br/>
          <span style="text-transform:none;letter-spacing:.5px">Elevora Seoul Spa is a venture of Elevora AI Private Limited, Chennai.</span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function rows(r: EnquiryRecord) {
  const items: [string, string | null][] = [
    ["Type", r.kind === "corporate" ? "Corporate wellness day" : "Guest"],
    ["Name", r.name],
    ["Email", r.email],
    ["Interested in", r.interest ? interestLabels[r.interest] ?? r.interest : null],
    ["Company", r.company],
    ["Number of women", r.teamSize],
    ["Message", r.message],
    ["Marketing consent", r.consents.marketing.granted ? "Yes, opted in" : "No"],
    ["Received", new Date(r.receivedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
  ];
  return items.filter(([, v]) => v);
}

function adminEmail(r: EnquiryRecord) {
  const list = rows(r);
  const what = r.kind === "corporate" ? "corporate enquiry" : r.interest === "founding-member" ? "founding member" : "waitlist sign-up";
  const html = layout(
    `${r.name} · ${r.interest ? interestLabels[r.interest] ?? r.interest : "Waitlist"}`,
    `${label("New " + what)}<div style="height:10px"></div>${duo("From", esc(r.name.split(/\s+/)[0]))}`,
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px solid ${c.line}">
      ${list
        .map(
          ([k, v]) =>
            `<tr><td style="padding:11px 14px 11px 0;border-bottom:1px solid ${c.line};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${c.soft};vertical-align:top;white-space:nowrap;width:1%">${k}</td><td style="padding:11px 0;border-bottom:1px solid ${c.line};white-space:pre-wrap;color:${c.cocoa}">${esc(v!)}</td></tr>`,
        )
        .join("")}
    </table>
    <div style="height:26px"></div>
    ${button(`mailto:${encodeURIComponent(r.email)}?subject=${encodeURIComponent("Elevora Seoul Spa")}`, "Reply to " + esc(r.name.split(/\s+/)[0]))}
    <p style="margin:22px 0 0;text-align:center;font-size:13px;color:${c.soft}">Or simply reply to this email. Please answer within one business day.</p>`,
  );
  const text = `New ${what} - Elevora Seoul Spa\n\n` + list.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nReply to this email to answer ${r.name} directly.`;
  return { subject: oneLine(`New ${what}: ${r.name}${r.interest ? ` (${interestLabels[r.interest] ?? r.interest})` : ""}`), html, text };
}

function confirmationEmail(r: EnquiryRecord) {
  const first = esc(r.name.split(/\s+/)[0]);
  const corporate = r.kind === "corporate";
  const topic = corporate ? "Corporate wellness day" : r.interest ? interestLabels[r.interest] ?? "Waitlist" : "Waitlist and opening news";
  const steps = corporate
    ? [
        ["Within one business day", "We reply to arrange a short call about your group, the occasion and your dates."],
        ["A proposal", "Rituals, café set and an exclusive weekday slot for 10 to 20 women, priced for your group."],
        ["Your day", "A half-day reset for your team: baths, heat rooms, rituals and the Korean café."],
      ]
    : [
        ["Within one business day", "A member of our all-women team will reply personally."],
        ["Preview days", "You'll be first to hear about our K-beauty facial and head-spa preview days."],
        ["Founding members", "Before we open, waitlist guests are offered our founding-member rate."],
      ];
  const html = layout(
    `Thank you, ${first}. You're on the Elevora Seoul Spa list.`,
    `${label("Thank you, " + first)}<div style="height:10px"></div>${corporate ? duo("Your", "wellness", "day") : duo("Welcome", "to the", "list")}`,
    `<p style="margin:0 0 22px;text-align:center;font-family:${serif};font-size:18px;line-height:1.7;color:${c.cocoa}">
       Bathing, heat, scrub and skincare: the Korean everyday ritual, coming to Chennai, for women only.
     </p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.cream};margin:0 0 26px">
       <tr><td style="padding:16px 20px">
         ${label("Your request")}
         <div style="margin-top:6px;font-family:${serif};font-size:19px;color:${c.cocoa}">${esc(topic)}</div>
         ${r.message ? `<div style="margin-top:10px;font-size:14px;line-height:1.7;color:${c.soft};white-space:pre-wrap">“${esc(r.message)}”</div>` : ""}
       </td></tr>
     </table>
     ${label("What happens next", c.taupe)}
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0 30px;border-top:1px solid ${c.line}">
       ${steps
         .map(
           ([t, d], i) => `<tr>
             <td style="padding:14px 14px 14px 0;border-bottom:1px solid ${c.line};vertical-align:top;width:34px;font-family:${serif};font-size:20px;color:${c.taupe}">0${i + 1}</td>
             <td style="padding:14px 0;border-bottom:1px solid ${c.line}"><div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${c.cocoa}">${t}</div><div style="margin-top:3px;font-size:14px;line-height:1.7;color:${c.soft}">${d}</div></td>
           </tr>`,
         )
         .join("")}
     </table>
     ${button(`${site}/menu`, corporate ? "See the rituals" : "Explore the spa menu")}
     <p style="margin:30px 0 0;text-align:center;font-size:14px;line-height:1.7">If anything changes, simply reply to this email.<br/>
       <span style="font-family:${serif};font-style:italic;font-size:17px">Warm regards,</span><br/>The Elevora Seoul Spa team</p>`,
  );
  const text = `Thank you, ${r.name.split(/\s+/)[0]}.\n\nYou're on the Elevora Seoul Spa list.\nYour request: ${topic}${r.message ? `\n"${r.message}"` : ""}\n\nWhat happens next:\n${steps.map(([t, d], i) => `${i + 1}. ${t}: ${d}`).join("\n")}\n\nExplore the menu: ${site}/menu\n\nIf anything changes, simply reply to this email.\n\nWarm regards,\nThe Elevora Seoul Spa team\nWomen only · 9:00 am - 9:00 pm, every day · elevoraservice@gmail.com`;
  return { subject: corporate ? "Your corporate wellness day enquiry - Elevora Seoul Spa" : "You're on the list - Elevora Seoul Spa", html, text };
}

/**
 * Sends the admin notification and the customer confirmation.
 * Returns which ones went out; never throws, so a mail problem never loses an enquiry.
 */
export async function sendEnquiryEmails(r: EnquiryRecord) {
  const t = getTransport();
  if (!t) {
    console.warn("[mail] GMAIL_USER / GMAIL_APP_PASSWORD not set; skipping enquiry emails");
    return { admin: false, customer: false };
  }
  const user = process.env.GMAIL_USER!;
  const from = { name: "Elevora Seoul Spa", address: user };
  const admin = process.env.ADMIN_EMAIL || user;
  const a = adminEmail(r);
  const m = confirmationEmail(r);
  const attachments = [{ filename: "elevora.png", content: Buffer.from(MAIL_LOGO_PNG_BASE64, "base64"), cid: LOGO_CID, contentType: "image/png" }];
  const [adminRes, customerRes] = await Promise.allSettled([
    t.sendMail({ from, to: admin, replyTo: { name: oneLine(r.name), address: r.email }, subject: a.subject, html: a.html, text: a.text, attachments }),
    t.sendMail({ from, to: { name: oneLine(r.name), address: r.email }, replyTo: admin, subject: m.subject, html: m.html, text: m.text, attachments }),
  ]);
  if (adminRes.status === "rejected") console.error("[mail] admin notification failed:", adminRes.reason);
  if (customerRes.status === "rejected") console.error("[mail] confirmation failed:", customerRes.reason);
  return { admin: adminRes.status === "fulfilled", customer: customerRes.status === "fulfilled" };
}
