/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";

/*
 * Elevora logo: the golden "E" monogram (a figure rising out of the letter, with a leaf)
 * and the ELEVORA serif wordmark. Both are transparent WebP cut from the official artwork,
 * so they sit on the ivory and the dark sections alike.
 */

type Props = { className?: string; style?: CSSProperties; title?: string };

const MARK = { src: "/brand/elevora-mark.webp", w: 220, h: 222 };
const WORD = { src: "/brand/elevora-wordmark.webp", w: 520, h: 80 };

/** The golden E monogram on its own (badges, footer, small spaces). Size it by height. */
export function SunMark({ className, style, title }: Props) {
  return (
    <img
      src={MARK.src}
      width={MARK.w}
      height={MARK.h}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      className={className}
      style={{ objectFit: "contain", ...style }}
      draggable={false}
    />
  );
}

/** The ELEVORA wordmark on its own. Size it by height. */
export function Wordmark({ className, style, title = "Elevora" }: Props) {
  return <img src={WORD.src} width={WORD.w} height={WORD.h} alt={title} className={className} style={style} draggable={false} />;
}

/** Monogram + wordmark side by side, for the nav bar. Size it by height. */
export function LogoHorizontal({ className, title = "Elevora Seoul Spa" }: Props) {
  return (
    <span role="img" aria-label={title} className={`inline-flex items-center gap-[0.35em] ${className ?? ""}`}>
      <SunMark className="h-[135%] w-auto" />
      <Wordmark title="" className="h-[58%] w-auto" />
    </span>
  );
}

/** Stacked lockup: monogram over the wordmark and "AI Private Limited". Size it by width. */
export function LogoPrimary({ className, title = "Elevora Seoul Spa" }: Props) {
  return (
    <span role="img" aria-label={title} className={`flex flex-col items-center ${className ?? ""}`}>
      <SunMark className="w-[46%] h-auto" />
      <Wordmark title="" className="mt-[7%] w-full h-auto" />
      <span className="mt-[4%] flex w-full items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#b8893c]">
        <span className="h-px flex-1 bg-current" />
        Seoul Spa
        <span className="h-px flex-1 bg-current" />
      </span>
    </span>
  );
}
