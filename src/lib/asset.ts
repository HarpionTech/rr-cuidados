// Prefixo de assets para funcionar tanto em dev (localhost) quanto no
// GitHub Pages sob subcaminho (ex: /rr-cuidados). Use em caminhos manuais
// que o Next NÃO prefixa sozinho (ex: src de <img>/canvas montado em JS).
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (p: string) => `${BASE}${p}`;
