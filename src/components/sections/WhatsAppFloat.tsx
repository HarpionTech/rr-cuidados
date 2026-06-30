import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=5548988803583&text=Ol%C3%A1!"
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 grid h-13 w-13 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/40" />
      <WhatsAppIcon size={28} className="relative" />
    </a>
  );
}
