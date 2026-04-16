"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { USERS, setSession, type User } from "@/lib/session";
import { BrandLogo } from "@/components/BrandLogo";

export default function LoginPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!selected) return;
    setLoading(true);
    setSession(selected);
    setTimeout(() => router.push("/bandeja"), 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 bg-csblack relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-csaccent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-csaccent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <BrandLogo size={88} />
          <h1 className="mt-5 text-2xl font-bold text-white tracking-tight">Celulares Nuevos Saavedra</h1>
          <p className="text-sm text-csmuted mt-1">Panel de gestión · CRM interno</p>
        </div>

        <div className="bg-cspanel border border-csborder rounded-2xl p-6 shadow-2xl shadow-black/50">
          <p className="text-xs uppercase tracking-wider text-csmuted mb-4">Seleccionar usuario</p>

          <div className="space-y-2.5">
            {USERS.map((u) => {
              const active = selected?.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => setSelected(u)}
                  className={clsx(
                    "w-full flex items-center gap-4 p-4 rounded-xl border transition text-left",
                    active
                      ? "border-csaccent bg-csaccent/10 shadow-lg shadow-csaccent/10"
                      : "border-csborder bg-cspanel2 hover:border-csaccent/40 hover:bg-cspanel3"
                  )}
                >
                  <div
                    className={clsx(
                      "w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg shrink-0",
                      active ? "cs-gradient text-white" : "bg-cspanel3 text-csmuted"
                    )}
                  >
                    {u.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white">{u.name}</p>
                    <p className="text-xs text-csmuted">{u.role}</p>
                  </div>
                  {active && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          <button
            disabled={!selected || loading}
            onClick={handleLogin}
            className={clsx(
              "w-full mt-6 py-3 rounded-xl font-semibold text-sm transition",
              selected && !loading
                ? "cs-gradient text-white shadow-lg shadow-csaccent/20 hover:brightness-110"
                : "bg-cspanel3 text-csmuted cursor-not-allowed"
            )}
          >
            {loading ? "Ingresando..." : "Ingresar al panel"}
          </button>
        </div>

        <p className="text-center text-[11px] text-csmuted mt-6">
          Celulares Nuevos Saavedra · v1.0
        </p>
      </div>
    </div>
  );
}
