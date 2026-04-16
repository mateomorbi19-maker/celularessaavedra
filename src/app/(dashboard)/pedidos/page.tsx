"use client";

import { useState, useMemo } from "react";
import clsx from "clsx";
import { ORDERS, type Order } from "@/data/orders";

const STATUSES: Order["status"][] = ["Nuevo", "Reservado", "Pagado", "Enviado", "Entregado", "Cancelado"];

const statusStyle: Record<Order["status"], string> = {
  "Nuevo": "bg-csaccent/15 text-csaccent border-csaccent/30",
  "Reservado": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Pagado": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Enviado": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Entregado": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Cancelado": "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export default function PedidosPage() {
  const [filter, setFilter] = useState<Order["status"] | "Todos">("Todos");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = useMemo(
    () => (filter === "Todos" ? ORDERS : ORDERS.filter((o) => o.status === filter)),
    [filter]
  );

  const stats = useMemo(() => {
    const activas = ORDERS.filter((o) => !["Cancelado", "Entregado"].includes(o.status)).length;
    const revenue = ORDERS.filter((o) => o.status !== "Cancelado").reduce((s, o) => s + o.total, 0);
    const entregadas = ORDERS.filter((o) => o.status === "Entregado").length;
    return { total: ORDERS.length, revenue, activas, entregadas };
  }, []);

  return (
    <div className="flex-1 flex min-w-0 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-5 md:p-8">
        <div className="max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Pedidos</h1>
            <p className="text-sm text-csmuted mt-1">
              Todos los pedidos entran estructurados desde WhatsApp o tienda física.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatCard label="Totales" value={stats.total} tone="accent" />
            <StatCard label="Activos" value={stats.activas} tone="amber" />
            <StatCard label="Entregados" value={stats.entregadas} tone="emerald" />
            <StatCard label="Facturado" value={`USD ${stats.revenue.toLocaleString("es-AR")}`} tone="accent" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {(["Todos", ...STATUSES] as const).map((s) => (
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
                {s}
              </button>
            ))}
          </div>

          <div className="bg-cspanel border border-csborder rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cspanel2 text-csmuted text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-4 py-3">Código</th>
                    <th className="text-left px-4 py-3">Cliente</th>
                    <th className="text-left px-4 py-3">Tipo</th>
                    <th className="text-left px-4 py-3">Estado</th>
                    <th className="text-right px-4 py-3">Total</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o) => (
                    <tr
                      key={o.id}
                      onClick={() => setSelected(o)}
                      className={clsx(
                        "border-t border-csborder cursor-pointer transition",
                        selected?.id === o.id ? "bg-csaccent/10" : "hover:bg-white/5"
                      )}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-csaccent">{o.code}</td>
                      <td className="px-4 py-3 text-white">{o.customer}</td>
                      <td className="px-4 py-3 text-csmuted">{o.type}</td>
                      <td className="px-4 py-3">
                        <span className={clsx("inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border", statusStyle[o.status])}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-white font-semibold">
                        USD {o.total.toLocaleString("es-AR")}
                      </td>
                      <td className="px-4 py-3 text-csmuted text-xs hidden md:table-cell">
                        {new Date(o.createdAt).toLocaleDateString("es-AR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-csmuted">
                        Sin pedidos en este estado
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
        <aside className="hidden lg:flex w-[380px] border-l border-csborder bg-cspanel flex-col shrink-0">
          <div className="p-5 border-b border-csborder flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-csmuted">Pedido</p>
              <p className="font-mono text-csaccent font-bold">{selected.code}</p>
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
              <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">Cliente</p>
              <p className="text-white font-semibold">{selected.customer}</p>
              <p className="text-xs text-csmuted">{selected.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">Tipo</p>
                <p className="text-sm text-white">{selected.type}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">Pago</p>
                <p className="text-sm text-white">{selected.payment}</p>
              </div>
            </div>
            {selected.address && (
              <div>
                <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">Dirección</p>
                <p className="text-sm text-white">{selected.address}</p>
              </div>
            )}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-csmuted mb-2">Items</p>
              <div className="space-y-2">
                {selected.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-sm bg-cspanel2 rounded-lg px-3 py-2 border border-csborder">
                    <div>
                      <p className="text-white">{i.qty}× {i.name}</p>
                      {i.note && <p className="text-[10px] text-csmuted">{i.note}</p>}
                    </div>
                    <p className="text-csmuted">USD {(i.qty * i.price).toLocaleString("es-AR")}</p>
                  </div>
                ))}
              </div>
            </div>
            {selected.notes && (
              <div>
                <p className="text-[11px] uppercase tracking-wider text-csmuted mb-1">Notas</p>
                <p className="text-sm text-white bg-cspanel2 border border-csborder rounded-lg px-3 py-2">
                  {selected.notes}
                </p>
              </div>
            )}
            <div className="border-t border-csborder pt-4 flex justify-between items-baseline">
              <span className="text-sm text-csmuted">Total</span>
              <span className="text-2xl font-bold text-csaccent">USD {selected.total.toLocaleString("es-AR")}</span>
            </div>
          </div>

          <div className="p-4 border-t border-csborder space-y-2">
            <button className="w-full cs-gradient text-white py-2.5 rounded-xl text-sm font-semibold">
              Avanzar al siguiente estado
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string | number; tone: "accent" | "emerald" | "amber" }) {
  const toneStyle = {
    accent: "from-csaccent/20 to-csaccent/5 border-csaccent/30",
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
  }[tone];
  return (
    <div className={clsx("rounded-xl border bg-gradient-to-br p-4", toneStyle)}>
      <p className="text-[11px] uppercase tracking-wider text-csmuted">{label}</p>
      <p className="text-xl md:text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
