"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import clsx from "clsx";
import { CONTACTS, type Contact, type ContactSegment } from "@/data/contacts";

const SEGMENT_ORDER: (ContactSegment | "Todos")[] = ["Todos", "Cliente", "Lead Calificado", "Lead No Calificado"];

const segmentStyle: Record<ContactSegment, string> = {
  "Cliente": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Lead Calificado": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Lead No Calificado": "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export default function ContactosPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<ContactSegment | "Todos">("Todos");
  const [selected, setSelected] = useState<Contact | null>(null);

  const filtered = useMemo(() => {
    let list = CONTACTS;
    if (filter !== "Todos") list = list.filter((c) => c.segment === filter);
    if (q.trim()) {
      const n = q.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(n) ||
          c.phone.includes(n) ||
          c.tags.some((t) => t.toLowerCase().includes(n)) ||
          c.interestedIn?.toLowerCase().includes(n)
      );
    }
    return list;
  }, [q, filter]);

  const stats = useMemo(() => {
    const clientes = CONTACTS.filter((c) => c.segment === "Cliente").length;
    const leadsCal = CONTACTS.filter((c) => c.segment === "Lead Calificado").length;
    const leadsNoCal = CONTACTS.filter((c) => c.segment === "Lead No Calificado").length;
    const revenue = CONTACTS.reduce((s, c) => s + (c.totalSpent || 0), 0);
    return { total: CONTACTS.length, clientes, leadsCal, leadsNoCal, revenue };
  }, []);

  return (
    <div className="flex-1 flex min-w-0 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-5 md:p-8">
        <div className="max-w-6xl">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Contactos</h1>
              <p className="text-sm text-csmuted mt-1">
                Base de contactos unificada · Clientes, Leads Calificados y Leads No Calificados.
              </p>
            </div>
            <Link
              href="/campanas"
              className="hidden sm:flex items-center gap-2 cs-gradient text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-csaccent/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 11 18-5v12L3 14v-3z" />
              </svg>
              Nueva campaña
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatBox label="Contactos totales" value={stats.total} tone="accent" />
            <StatBox label="Clientes" value={stats.clientes} tone="amber" />
            <StatBox label="Leads calificados" value={stats.leadsCal} tone="emerald" />
            <StatBox label="Facturado histórico" value={`USD ${stats.revenue.toLocaleString("es-AR")}`} tone="accent" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {SEGMENT_ORDER.map((s) => {
              const count =
                s === "Todos"
                  ? CONTACTS.length
                  : CONTACTS.filter((c) => c.segment === s).length;
              return (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={clsx(
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                    filter === s
                      ? "bg-csaccent border-csaccent text-white"
                      : "bg-cspanel2 border-csborder text-csmuted hover:text-white hover:border-csaccent/40"
                  )}
                >
                  {s} · {count}
                </button>
              );
            })}
          </div>

          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-csmuted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, teléfono, interés o tag..."
              className="w-full pl-9 pr-3 py-2.5 bg-cspanel border border-csborder rounded-xl text-sm text-white placeholder-csmuted focus:outline-none focus:ring-2 focus:ring-csaccent/40 focus:border-csaccent"
            />
          </div>

          <div className="bg-cspanel border border-csborder rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cspanel2 text-csmuted text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-4 py-3">Contacto</th>
                    <th className="text-left px-4 py-3">Teléfono</th>
                    <th className="text-left px-4 py-3">Segmento</th>
                    <th className="text-left px-4 py-3">Interés / Favorito</th>
                    <th className="text-right px-4 py-3">Gastado</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelected(c)}
                      className={clsx(
                        "border-t border-csborder cursor-pointer transition",
                        selected?.id === c.id ? "bg-csaccent/10" : "hover:bg-white/5"
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full cs-gradient flex items-center justify-center text-[10px] font-bold text-white">
                            {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </div>
                          <span className="text-white font-semibold">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-csmuted text-xs">{c.phone}</td>
                      <td className="px-4 py-3">
                        <span className={clsx("inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border", segmentStyle[c.segment])}>
                          {c.segment}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-csmuted text-xs max-w-[220px] truncate">
                        {c.interestedIn ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-right text-white font-semibold">
                        {c.totalSpent ? `USD ${c.totalSpent.toLocaleString("es-AR")}` : <span className="text-csmuted">—</span>}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-csmuted">
                        Sin resultados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <aside className="hidden lg:flex w-[360px] border-l border-csborder bg-cspanel flex-col shrink-0">
          <div className="p-5 border-b border-csborder flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full cs-gradient flex items-center justify-center font-bold text-white">
                {selected.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-bold text-white">{selected.name}</p>
                <p className="text-xs text-csmuted">{selected.phone}</p>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="text-csmuted hover:text-white p-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">Segmento</p>
              <span className={clsx("inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border", segmentStyle[selected.segment])}>
                {selected.segment}
              </span>
            </div>
            {selected.segment === "Cliente" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-cspanel2 border border-csborder rounded-lg p-3">
                  <p className="text-[10px] uppercase text-csmuted">Pedidos</p>
                  <p className="text-xl font-bold text-white">{selected.orders}</p>
                </div>
                <div className="bg-cspanel2 border border-csborder rounded-lg p-3">
                  <p className="text-[10px] uppercase text-csmuted">Total</p>
                  <p className="text-xl font-bold text-csaccent">
                    USD {selected.totalSpent?.toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
            )}
            {selected.interestedIn && (
              <div>
                <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">
                  {selected.segment === "Cliente" ? "Producto favorito" : "Interesado en"}
                </p>
                <p className="text-sm text-white">{selected.interestedIn}</p>
              </div>
            )}
            {selected.budget && (
              <div>
                <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">Presupuesto</p>
                <p className="text-sm text-csaccent font-semibold">USD {selected.budget.toLocaleString("es-AR")}</p>
              </div>
            )}
            {selected.notes && (
              <div>
                <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">Notas</p>
                <p className="text-sm text-white bg-cspanel2 border border-csborder rounded-lg px-3 py-2">
                  {selected.notes}
                </p>
              </div>
            )}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">Último contacto</p>
              <p className="text-sm text-white">
                {new Date(selected.lastContact).toLocaleString("es-AR")}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">Tags</p>
              <div className="flex flex-wrap gap-1">
                {selected.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-cspanel2 border border-csborder text-csmuted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-csborder space-y-2">
            <button className="w-full cs-gradient text-white py-2.5 rounded-xl text-sm font-semibold">
              Abrir conversación
            </button>
            <Link
              href="/campanas"
              className="block w-full text-center bg-cspanel2 border border-csborder text-csmuted hover:text-white py-2.5 rounded-xl text-sm font-semibold"
            >
              Incluir en campaña
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}

function StatBox({ label, value, tone }: { label: string; value: string | number; tone: "accent" | "amber" | "emerald" }) {
  const toneStyle = {
    accent: "from-csaccent/15 to-csaccent/5 border-csaccent/30",
    amber: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
  }[tone];
  return (
    <div className={clsx("rounded-xl border bg-gradient-to-br p-4", toneStyle)}>
      <p className="text-[11px] uppercase tracking-wider text-csmuted">{label}</p>
      <p className="text-xl md:text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
