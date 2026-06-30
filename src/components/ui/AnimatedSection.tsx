import type { ReactNode } from "react";

// Wrapper semântico de seção. As animações ficam em cada elemento filho
// (AnimatedItem / RevealText), que disparam o próprio reveal ao entrar na tela.
export default function AnimatedSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
