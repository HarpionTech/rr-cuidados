export default function EyebrowBadge({
  children,
  tone = "green",
}: {
  children: React.ReactNode;
  tone?: "green" | "light";
}) {
  const color = tone === "light" ? "text-brand-leaf" : "text-brand-green";
  return (
    <span
      className={`inline-block text-xs font-semibold uppercase tracking-[0.22em] ${color}`}
    >
      {children}
    </span>
  );
}
