import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Saavedra · CRM",
  description: "CRM y agente de IA para Smart Saavedra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-csblack text-slate-100 antialiased">{children}</body>
    </html>
  );
}
