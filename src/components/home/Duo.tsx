/**
 * "WORD script WORD" headline in the reference style: thin wide capitals with a handwritten
 * word dropped between them. Each part carries a class so scroll animations can move them apart.
 */
export function Duo({
  a,
  s,
  b,
  className = "",
  as: Tag = "h2",
}: {
  a: string;
  s: string;
  b: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={`duo ${className}`} aria-label={`${a} ${s} ${b}`}>
      <span className="duo-a" aria-hidden="true">{a}</span>
      <span className="script duo-s" aria-hidden="true">{s}</span>
      <span className="duo-b" aria-hidden="true">{b}</span>
    </Tag>
  );
}
