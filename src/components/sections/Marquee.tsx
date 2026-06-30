const words = [
  "Presença diária",
  "Equipe técnica",
  "Acolhimento",
  "Segurança",
  "Dignidade",
];

export default function Marquee() {
  const set = (
    <>
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-8">
          <span>{w}</span>
          <span className="text-brand-leaf">•</span>
        </span>
      ))}
    </>
  );
  return (
    <div className="overflow-hidden border-y border-white/10 bg-brand-blue py-5 text-white-warm">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-8 whitespace-nowrap pr-8 display-font text-[clamp(1.2rem,2.4vw,1.9rem)] italic">
        {set}
        {set}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
