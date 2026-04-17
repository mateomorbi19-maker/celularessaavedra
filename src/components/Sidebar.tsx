"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { getSession, clearSession, type User } from "@/lib/session";
import { BrandLogo } from "./BrandLogo";

type IconProps = { className?: string };

const icons: Record<string, (p: IconProps) => JSX.Element> = {
  inbox: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  contacts: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  campaigns: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  orders: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  products: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
    </svg>
  ),
  metrics: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  settings: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  logout: ({ className }) => (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

const LINKS = [
  { href: "/bandeja", label: "Chats", longLabel: "Bandeja de entrada", icon: "inbox" as const },
  { href: "/contactos", label: "Contactos", longLabel: "Contactos", icon: "contacts" as const },
  { href: "/campanas", label: "Campañas", longLabel: "Campañas masivas", icon: "campaigns" as const },
  { href: "/pedidos", label: "Pedidos", longLabel: "Pedidos", icon: "orders" as const },
  { href: "/productos", label: "Productos", longLabel: "Productos", icon: "products" as const },
  { href: "/metricas", label: "Métricas", longLabel: "Métricas", icon: "metrics" as const },
  { href: "/configuracion", label: "Ajustes", longLabel: "Configuración", icon: "settings" as const },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const s = getSession();
    if (!s) router.replace("/login");
    else setUser(s);
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <>
      <aside className="hidden md:flex w-60 bg-cspanel border border-csborder rounded-2xl shadow-xl shadow-black/10 flex-col shrink-0 overflow-hidden">
        <div className="p-5 border-b border-csborder">
          <div className="flex items-center gap-3">
            <BrandLogo size={44} />
            <div>
              <h1 className="font-bold text-[13px] leading-tight text-white">Smart</h1>
              <p className="text-[11px] text-csmuted uppercase tracking-wider">Saavedra</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            const Icon = icons[link.icon];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-sm font-medium",
                  active
                    ? "bg-csaccent text-white shadow-lg shadow-csaccent/20"
                    : "text-csmuted hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="shrink-0" />
                <span>{link.longLabel}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-csborder">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 mb-1">
              <div className="w-8 h-8 rounded-full cs-gradient flex items-center justify-center text-xs font-bold text-white">
                {user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-csmuted truncate">{user.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-csmuted hover:bg-white/5 hover:text-white transition"
          >
            {icons.logout({})}
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 inset-x-0 h-14 bg-cspanel border-b border-csborder flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <BrandLogo size={34} />
          <h1 className="font-bold text-sm text-white">Smart Saavedra</h1>
        </div>
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="p-2 rounded-lg text-csmuted hover:text-white hover:bg-white/5"
        >
          {icons.logout({})}
        </button>
      </header>

      {/* Mobile bottom nav — horizontally scrollable */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-cspanel border-t border-csborder flex items-stretch z-40 pb-[env(safe-area-inset-bottom)] overflow-x-auto">
        {LINKS.map((link) => {
          const active = pathname.startsWith(link.href);
          const Icon = icons[link.icon];
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex-1 min-w-[70px] flex flex-col items-center justify-center gap-0.5 transition",
                active ? "text-csaccent" : "text-csmuted active:text-white"
              )}
            >
              <Icon />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
