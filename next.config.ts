import type { NextConfig } from "next";
import path from "path";

// basePath vem do ambiente. No GitHub Pages (projeto) = "/rr-cuidados".
// Em dev local fica vazio (http://localhost:3000).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export", // gera site estático (pasta out/) — funciona no GitHub Pages
  trailingSlash: true, // cada rota vira /pasta/index.html
  basePath: basePath || undefined,
  images: {
    unoptimized: true, // GitHub Pages não tem otimizador de imagem
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
