// Central content and media for Elevora Seoul Spa (elevora.club).
// Source: "Women-Only Korean Spa, Chennai — Business Plan & Execution Roadmap" (Nov 2026).
// Photos are from Pexels (free to use); swap any URL for the spa's own photography when it is ready.

export const px = (id: number, w = 2000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export type Img = { id: number; alt: string };

export const media = {
  hero: { id: 6667430, alt: "A warm soaking pool with a soft waterfall in a calm stone bathhouse" },
  pool: { id: 6667461, alt: "A woman resting her chin on the edge of a warm pool, eyes closed" },
  facial: { id: 3985329, alt: "A woman relaxing during a gentle facial treatment" },
  facialMask: { id: 5069494, alt: "A therapist applying a facial mask in a bright treatment room" },
  sheetMask: { id: 7520460, alt: "Close-up of a woman wearing a sheet mask with her eyes closed" },
  headSpa: { id: 7755461, alt: "A woman lying back at a head-spa basin while her scalp is washed" },
  headSpa2: { id: 7755482, alt: "A therapist massaging a guest's scalp at a wash basin" },
  stones: { id: 6560266, alt: "Warm stones laid along a woman's back on a treatment bed" },
  sauna: { id: 7587466, alt: "An empty, warmly lit wooden heat room with tiered benches" },
  tea: { id: 7364044, alt: "Tea poured from a blue-and-white porcelain pot into small cups" },
  teaCup: { id: 1758279, alt: "A cup of herbal tea on linen beside a pink tulip" },
  jade: { id: 6766261, alt: "A jade gua sha stone and jade roller on dark wood" },
  jadeTools: { id: 6621357, alt: "A jade roller, gua sha and creams on white marble" },
  jadeHands: { id: 7011227, alt: "Hands holding a face roller and a gua sha stone" },
  serum: { id: 4041392, alt: "A serum bottle on a wooden dish surrounded by pink rose petals" },
  serumRose: { id: 4041391, alt: "A dropper bottle beside a pink rose on a wooden plate" },
  towels: { id: 4238996, alt: "Soft linen towels hanging on hooks against white tiles" },
  robe: { id: 8412755, alt: "A woman in a white robe with a towel wrapped on her head, resting" },
  robe2: { id: 15023478, alt: "A smiling woman in a white robe and head towel" },
  bride: { id: 2236409, alt: "A bride with softly glowing skin, seen from the side" },
  bubbleMask: { id: 6925538, alt: "A woman wearing a bubbling cleansing mask" },
};

export const site = {
  name: "Elevora Seoul Spa",
  short: "Elevora",
  legalName: "ELEVORA AI PRIVATE LIMITED",
  tagline: "Elevate your everyday",
  promise: "A half-day reset that leaves skin, scalp and mind visibly refreshed.",
  vision:
    "Bringing the Korean everyday ritual of bathing, heat, scrub and skincare to Chennai women, in a safe, private, premium setting.",
  message:
    "Chennai's Korean bathhouse for women. Warm pools, five heated jjimjil rooms, the seshin body scrub, K-beauty facials and Korean head spa, with women guests and women staff only.",
  city: "Chennai, Tamil Nadu",
  email: "elevoraservice@gmail.com",
  hours: "9:00 am – 9:00 pm, every day",
  gst: "Prices in rupees, before 5% GST.",
  status: "Opening soon in Chennai",
};

/** The guest journey, about four hours. */
export const journey = [
  { t: "Arrive", d: "Check in and receive your robe, towel set, locker wristband and the folded sheep-head towel.", img: media.robe2 },
  { t: "Bathe", d: "Shower at your own seated station, then move between the hot and warm soaking pools and the cold plunge.", img: media.pool },
  { t: "Heat", d: "Circle through the themed rooms: loess clay, salt, jade, charcoal kiln and the ice room.", img: media.sauna },
  { t: "Ritual", d: "Your signature service: the seshin body scrub, a K-beauty facial, head spa or massage.", img: media.facial },
  { t: "Rest", d: "Lie back on the heated ondol floor with sikhye, barley tea and a sheet mask.", img: media.sheetMask },
  { t: "Savour", d: "A Korean café meal, a browse of the K-beauty wall, and your next visit booked.", img: media.tea },
] as const;

/** The five jjimjil heat rooms plus the sauna and steam room (Sections 3, 8 and 10 of the plan). */
export const heatRooms = [
  { name: "Loess clay room", ko: "Hwangto", temp: "50–60 °C", d: "Radiant heat from walls and floor of yellow-earth clay. Deep, even warmth." },
  { name: "Salt room", ko: "Sogeum", temp: "45–50 °C", d: "Backlit Himalayan salt brick and a soft, dry heat." },
  { name: "Jade room", ko: "Okdol", temp: "45–50 °C", d: "Heated jade tiles. The gentlest room, made for first-timers." },
  { name: "Charcoal kiln", ko: "Sutgama", temp: "70–90 °C", d: "A domed kiln-style room for a short, intense heat. Electric radiant heaters, no fire." },
  { name: "Ice room", ko: "Eoreum", temp: "0–5 °C", d: "A cooling wall and fresh ice to close the circuit." },
  { name: "Dry sauna and mugwort steam", ko: "Ssuk", temp: "Timed", d: "A Finnish-style dry sauna and an herbal mugwort steam room." },
] as const;

export type MenuItem = { name: string; time?: string; price: string; signature?: boolean; note?: string };
export type MenuSection = { id: string; no: string; title: string; ko?: string; intro: string; img: Img; items: MenuItem[] };

/** Section 5 of the plan. Signature = launch menu (★ in the plan). */
export const menu: MenuSection[] = [
  {
    id: "facilities-pass",
    no: "01",
    title: "Facilities pass",
    ko: "Jjimjil",
    intro: "Up to four hours with the baths, pools, every heat room and the heated-floor lounge. Robe, towels, amenities and barley tea included.",
    img: media.pool,
    items: [
      { name: "Day pass, weekday", price: "1,800", signature: true, note: "Baths, pools, all heat rooms, lounge, robe, towels, amenities, barley tea" },
      { name: "Day pass, weekend", price: "2,200", signature: true, note: "Same as the weekday pass" },
      { name: "Extended stay", time: "+2 hrs", price: "600", note: "Within opening hours" },
      { name: "Monthly membership", price: "11,999", note: "8 visits and 10% off services" },
    ],
  },
  {
    id: "body-scrub",
    no: "02",
    title: "Korean body scrub",
    ko: "Seshin · Ttaemiri",
    intro: "Our hero ritual. After thirty minutes of soaking, a therapist scrubs head to toe with Italy-towel mitts, lifting away dull skin.",
    img: media.stones,
    items: [
      { name: "Classic Korean body scrub", time: "40 min", price: "2,500", signature: true },
      { name: "Premium scrub, milk-honey rinse and oil rub", time: "60 min", price: "3,500", signature: true },
      { name: "Scrub, cucumber moisturising and face pack", time: "75 min", price: "4,500" },
      { name: "Myeongdong-style scrub, seaweed body pack, mud pack and hair wash", time: "90 min", price: "5,500" },
      { name: "Private-room scrub, away from the communal area", time: "60 min", price: "4,200" },
    ],
  },
  {
    id: "facials",
    no: "03",
    title: "Korean facials",
    ko: "K-beauty",
    intro: "Layered Korean skincare, modeling masks and jade tools for the glass-skin finish.",
    img: media.facialMask,
    items: [
      { name: "Glass-skin hydration facial with modeling (rubber) mask", time: "60 min", price: "3,500", signature: true },
      { name: "Ginseng anti-ageing ritual with luxury hanbang skincare", time: "90 min", price: "7,500", signature: true },
      { name: "Royal court facial with gold and hanbang botanicals", time: "90 min", price: "8,500" },
      { name: "Aqua-peel, LED and ampoule infusion", time: "60 min", price: "4,500" },
      { name: "Facial lifting and gua sha “face Pilates” with jade tools", time: "60 min", price: "4,000" },
      { name: "Cica calming facial for sensitive or post-sun skin", time: "45 min", price: "2,800" },
    ],
  },
  {
    id: "head-spa",
    no: "04",
    title: "Korean head spa",
    ko: "Scalp care",
    intro: "A close look at your scalp, then scaling, steam, a waterfall rinse and a slow, deep massage.",
    img: media.headSpa,
    items: [
      { name: "Scalp reset: scope analysis, scaling, steam, waterfall rinse and massage", time: "60 min", price: "3,500", signature: true },
      { name: "Signature 15-step head spa with LED and tonic", time: "90 min", price: "5,500", signature: true },
      { name: "Silk repair: scalp care and intensive hair treatment", time: "75 min", price: "4,800" },
    ],
  },
  {
    id: "body",
    no: "05",
    title: "Body massage and therapies",
    intro: "Certified therapists, warm beds and Korean techniques for tired shoulders, feet and minds.",
    img: media.robe,
    items: [
      { name: "Korean acupressure (jiap), full body", time: "60 / 90 min", price: "3,000 / 4,200", signature: true },
      { name: "Hot-stone and jade-stone massage", time: "75 min", price: "4,500" },
      { name: "Lymphatic drainage with herbal gel", time: "60 min", price: "3,800" },
      { name: "Foot reflexology with red-ginseng foot bath", time: "45 min", price: "1,800" },
      { name: "Body wraps: red clay, seaweed or ginseng", time: "60 min", price: "3,800" },
    ],
  },
  {
    id: "beauty",
    no: "06",
    title: "Beauty add-ons",
    intro: "Finishing touches before you step back into the city.",
    img: media.jadeTools,
    items: [
      { name: "Korean lash lift and brow lamination", price: "2,500" },
      { name: "Gel manicure and pedicure", price: "1,500 – 2,200" },
      { name: "Post-spa makeup and blow-dry", price: "800" },
      { name: "Sheet mask in the lounge", price: "300" },
    ],
  },
];

export const packages = [
  { name: "Seoul Starter", price: "3,900", signature: true, contents: ["Day pass", "Classic Korean body scrub", "Sheet mask"], line: "The first visit we recommend.", img: media.sheetMask },
  { name: "Glass Skin Day", price: "8,500", signature: true, contents: ["Day pass", "Premium scrub", "Glass-skin hydration facial", "Korean lunch"], line: "Scrub, glow, then lunch in the café.", img: media.facial },
  { name: "Royal Elevora", price: "16,500", contents: ["Day pass", "Body scrub", "Royal court facial", "Signature 15-step head spa", "Korean lunch"], line: "The whole house, head to toe.", img: media.serum },
  { name: "Bridal Glow", price: "29,000", contents: ["Three visits over six weeks", "Scrubs and facials", "Head spa", "Lash lift"], line: "Planned around your wedding date.", img: media.bride },
  { name: "Mother-Daughter / Friends", price: "7,500", contents: ["Two day passes", "Two body scrubs", "Café set"], line: "Bring someone you love.", img: media.tea },
  { name: "Corporate Wellness Day", price: "On request", contents: ["An exclusive weekday slot", "For 10 to 20 women", "Rituals and café, tailored"], line: "For HR teams and women's networks.", img: media.towels },
] as const;

export const cafe = {
  line: "Sikhye, barley and jujube tea, baked jjimjil eggs, kimbap, a ramyeon station, japchae and patbingsu.",
  items: ["Sikhye", "Barley tea", "Jujube tea", "Baked jjimjil eggs", "Kimbap", "Ramyeon", "Japchae", "Patbingsu"],
};

export const differences = [
  ["Format", "Single treatment, 60–90 min", "A half-day ritual with a facilities pass"],
  ["Heat therapy", "A steam cabin, if any", "Five themed jjimjil rooms plus pools"],
  ["Signature", "Balinese or Thai massage", "Korean seshin scrub and a 15-step head spa"],
  ["Products", "Generic brands", "Luxury hanbang and Korean professional lines"],
  ["Food", "Herbal tea", "A Korean café: sikhye, eggs, ramyeon, bingsu"],
  ["Guests", "Mixed or couples", "Women only, women staff only"],
] as const;

export const promises = [
  { t: "Women only", d: "Every guest and every member of staff is a woman. Comfort and safety come first." },
  { t: "Modesty, your way", d: "Swimwear-friendly pools, private shower cubicles and a private scrub room. You choose." },
  { t: "Water you can trust", d: "Pool water tested every two hours, filtration with UV, and a daily chemistry log." },
  { t: "Clean, hour by hour", d: "Heat rooms cleaned hourly. Fresh robe, two towels and amenities for every guest." },
  { t: "Certified hands", d: "Therapists trained for weeks and certified in scrub and head-spa technique." },
] as const;

export const care = [
  "A short health check at arrival for pregnancy, heart conditions and blood pressure",
  "Timers, temperature displays and cold drinking water at every heat room",
  "A trained first-aider on every shift",
  "Temperature placards in English, Tamil and Korean",
  "A discreet treatment-only option with a private shower, for days you'd rather skip the pools",
  "No phones in the wet zones, ever",
  "CCTV only at the entrance and exit, never in changing or wet areas",
] as const;

export const audiences = [
  { t: "Working professionals", d: "A stress reset with skin and scalp care, on weekday evenings and Saturdays.", offer: "Day pass + scrub, or membership" },
  { t: "K-beauty and K-drama fans", d: "The authentic Korean experience, made for weekends with friends.", offer: "Seoul Starter and the café" },
  { t: "Brides and bridal parties", d: "Pre-wedding skin and glow across the October to February season.", offer: "Bridal Glow series" },
  { t: "Mothers and homemakers", d: "Me-time on quiet weekday mornings, in a safe, women-only space.", offer: "Weekday packages, Mother-Daughter" },
  { t: "Teams and women's networks", d: "Women's Day and wellness-benefit days, booked as an exclusive slot.", offer: "Corporate Wellness Day" },
  { t: "Korean and NRI women", d: "A familiar ritual, away from home.", offer: "Day pass + scrub" },
] as const;

export const faqs = [
  ["Is Elevora Seoul Spa really women only?", "Yes. Every guest and every member of our team is a woman."],
  ["Do I have to bathe without clothes?", "No. Korean bathhouses are traditionally nude in the bathing zone, but at Elevora you choose. Swimwear is welcome in the pools, and we have private shower cubicles and a private scrub room."],
  ["How long should I plan for?", "About four hours. The facilities pass covers up to four hours, and you can add two more within opening hours."],
  ["What is the seshin body scrub?", "The Korean body scrub. After about thirty minutes of soaking, a therapist exfoliates you head to toe with Italy-towel mitts, then rinses and moisturises. It's our signature ritual."],
  ["What should I bring?", "Nothing but yourself, and swimwear if you prefer it. We provide a robe, two towels, amenities and a locker wristband that also pays for the café and the retail wall."],
  ["Can I visit during my period?", "Yes. Choose our treatment-only option with a private shower, handled discreetly."],
  ["Are there health restrictions?", "We ask a few short questions at check-in about pregnancy, heart conditions and blood pressure. Heat rooms and some treatments aren't suitable for everyone, and our team will guide you."],
  ["Can I use my phone?", "Phones stay in your locker in the wet zones. There's a photo wall in the lounge."],
  ["What are your hours?", "9:00 am to 9:00 pm, every day."],
  ["Are prices inclusive of GST?", "Menu prices are in rupees before 5% GST, which is added at billing."],
  ["Do you offer V-steam, injectables or laser treatments?", "No. We don't offer V-steam or any medical-aesthetic procedure such as injectables, lasers or strong chemical peels."],
  ["When do you open?", "We're opening soon in Chennai. Join the waitlist to hear first and to be offered a founding-member rate."],
] as const;

/** The three signature rituals featured on the home page slider. */
export const signatures = [
  { slug: "body-scrub", title: "Body Scrub", line: "The Korean seshin scrub, after thirty minutes in the warm pools. Skin you can feel the difference in.", from: "2,500", unit: "40 min", image: media.stones },
  { slug: "facials", title: "Glass Skin", line: "K-beauty facials with modeling masks, ampoules and jade tools, for the glass-skin glow.", from: "3,500", unit: "60 min", image: media.facial },
  { slug: "head-spa", title: "Head Spa", line: "Scalp analysis, scaling, steam, a waterfall rinse and a slow massage. Fifteen steps in the signature ritual.", from: "3,500", unit: "60 min", image: media.headSpa2 },
] as const;
