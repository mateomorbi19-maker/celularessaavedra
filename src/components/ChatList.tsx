"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import clsx from "clsx";
import type { Conversation } from "@/data/conversations";

export function ChatList({ conversations }: { conversations: Conversation[] }) {
  const params = useParams<{ id?: string }>();
  const selected = params?.id ?? null;
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return conversations;
    const n = q.toLowerCase();
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(n) ||
        c.phone.toLowerCase().includes(n) ||
        c.labels.some((l) => l.toLowerCase().includes(n))
    );
  }, [conversations, q]);

  return (
    <aside className="w-full h-full border-r border-csborder bg-cspanel flex flex-col md:rounded-l-2xl overflow-hidden">
      <div className="p-4 border-b border-csborder shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-white">Bandeja</h2>
            <p className="text-[11px] text-csmuted">{conversations.length} conversaciones</p>
          </div>
          <div className="flex items-center gap-1.5 bg-csaccent/10 text-csaccent px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-csaccent rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wide">Agente IA</span>
          </div>
        </div>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-csmuted"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar chat..."
            className="w-full pl-9 pr-3 py-2 bg-cspanel2 border border-csborder rounded-lg text-sm text-white placeholder-csmuted focus:outline-none focus:ring-2 focus:ring-csaccent/40 focus:border-csaccent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="p-8 text-center text-csmuted text-sm">
            {q ? "Sin resultados" : "No hay conversaciones"}
          </div>
        )}
        {filtered.map((c) => {
          const isActive = selected === c.id;
          const last = c.messages[c.messages.length - 1];
          return (
            <Link
              key={c.id}
              href={`/bandeja/${c.id}`}
              className={clsx(
                "block px-4 py-3 border-b border-csborder/60 transition",
                isActive ? "bg-csaccent/10 border-l-2 border-l-csaccent" : "hover:bg-white/5"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full cs-gradient flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <span className="font-semibold text-white text-sm truncate">{c.name}</span>
                    <span className="text-[10px] text-csmuted shrink-0 mt-0.5">
                      {new Date(c.lastAt).toLocaleString("es-AR", {
                        day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-[11px] text-csmuted truncate">{c.phone}</p>
                  <p className="text-xs text-slate-400 truncate mt-1">
                    <span className={last?.direction === "out" ? "text-csaccent" : "text-csmuted"}>
                      {last?.direction === "out" ? "→ " : "← "}
                    </span>
                    {last?.content ?? "[sin mensajes]"}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.labels.map((l) => (
                      <span
                        key={l}
                        className={clsx(
                          "text-[10px] px-2 py-0.5 rounded-full font-medium",
                          l === "VIP" || l === "cliente"
                            ? "bg-amber-500/15 text-amber-400"
                            : l === "lead calificado"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : l === "lead no calificado"
                            ? "bg-slate-500/15 text-slate-400"
                            : "bg-csaccent/15 text-csaccent"
                        )}
                      >
                        {l}
                      </span>
                    ))}
                    {c.unread > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-csaccent text-white">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
