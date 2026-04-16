"use client";

import { useState } from "react";
import clsx from "clsx";

type RangeKey = "7d" | "30d" | "90d";

const CURRENT = {
  "7d": {
    messagesSent: 412,
    newContacts: 38,
    qualifiedLeads: 24,
    salesCount: 11,
    salesRevenue: 13420,
    conversionRate: 45.8,
    avgTicket: 1220,
    campaigns: 2,
  },
  "30d": {
    messagesSent: 1840,
    newContacts: 142,
    qualifiedLeads: 98,
    salesCount: 47,
    salesRevenue: 58310,
    conversionRate: 47.9,
    avgTicket: 1240,
    campaigns: 6,
  },
  "90d": {
    messagesSent: 5120,
    newContacts: 389,
    qualifiedLeads: 272,
    salesCount: 128,
    salesRevenue: 152680,
    conversionRate: 47.0,
    avgTicket: 1193,
    campaigns: 14,
  },
} as const;

const TOP_PRODUCTS_30D = [
  { name: "iPhone 16 Pro 128GB", units: 9, revenue: 10791 },
  { name: "iPhone 16 128GB", units: 8, revenue: 7552 },
  { name: "iPhone 15 128GB", units: 7, revenue: 6293 },
  { name: "iPhone 16 Pro Max 256GB", units: 5, revenue: 8495 },
  { name: "AirPods Pro 2", units: 12, revenue: 2988 },
  { name: "iPhone 13 Reacondicionado", units: 4, revenue: 1996 },
  { name: "Funda iPhone 16 Pro", units: 11, revenue: 605 },
] as const;

const LAST_CAMPAIGNS = [
  { name: "Combo iPhone 16 Pro + AirPods", sent: 42, opened: 38, replies: 14, sales: 4, date: "Hace 3 días" },
  { name: "Nuevo stock ingresado", sent: 100, opened: 82, replies: 31, sales: 7, date: "Hace 8 días" },
  { name: "Reacondicionados — oportunidad", sent: 40, opened: 30, replies: 9, sales: 2, date: "Hace 14 días" },
  { name: "Oferta exclusiva VIP", sent: 25, opened: 24, replies: 12, sales: 6, date: "Hace 20 días" },
] as const;

export default function MetricasPage() {
  const [range, setRange] = useState<RangeKey>("30d");
  const d = CURRENT[range];

  return (
    <div className="flex-1 overflow-y-auto p-5 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-white">Métricas</h1>
            <p className="text-sm text-csmuted mt-1">
              Visibilidad completa de la operación comercial — tomá decisiones con datos reales.
            </p>
          </div>
          <div className="flex gap-1 bg-cspanel border border-csborder rounded-xl p-1">
            {(["7d", "30d", "90d"] as RangeKey[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition",
                  range === r ? "bg-csaccent text-white" : "text-csmuted hover:text-white"
                )}
              >
                {r === "7d" ? "7 días" : r === "30d" ? "30 días" : "90 días"}
              </button>
            ))}
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Kpi label="Mensajes enviados" value={d.messagesSent.toLocaleString("es-AR")} tone="accent" icon="send" />
          <Kpi label="Contactos nuevos" value={d.newContacts.toLocaleString("es-AR")} tone="emerald" icon="users" />
          <Kpi label="Leads calificados" value={d.qualifiedLeads.toLocaleString("es-AR")} tone="amber" icon="star" />
          <Kpi label="Ventas concretadas" value={d.salesCount.toLocaleString("es-AR")} tone="purple" icon="cart" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <Kpi label="Facturación" value={`USD ${d.salesRevenue.toLocaleString("es-AR")}`} tone="accent" icon="money" size="lg" />
          <Kpi label="Conversión lead → venta" value={`${d.conversionRate}%`} tone="emerald" icon="chart" size="lg" />
          <Kpi label="Ticket promedio" value={`USD ${d.avgTicket.toLocaleString("es-AR")}`} tone="purple" icon="ticket" size="lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Top productos */}
          <section className="bg-cspanel border border-csborder rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Productos más vendidos</h3>
              <span className="text-[11px] text-csmuted">{range === "7d" ? "7 días" : range === "30d" ? "30 días" : "90 días"}</span>
            </div>
            <div className="space-y-3">
              {TOP_PRODUCTS_30D.map((p, i) => {
                const maxRev = Math.max(...TOP_PRODUCTS_30D.map((x) => x.revenue));
                const pct = (p.revenue / maxRev) * 100;
                return (
                  <div key={p.name}>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={clsx(
                          "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                          i < 3 ? "bg-csaccent text-white" : "bg-cspanel3 text-csmuted"
                        )}>
                          {i + 1}
                        </span>
                        <span className="text-sm text-white truncate">{p.name}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-csaccent">USD {p.revenue.toLocaleString("es-AR")}</span>
                        <p className="text-[10px] text-csmuted">{p.units} uds</p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-cspanel2 rounded-full overflow-hidden">
                      <div
                        className="h-full cs-gradient rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Last campaigns */}
          <section className="bg-cspanel border border-csborder rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Últimas campañas</h3>
              <span className="text-[11px] text-csmuted">{d.campaigns} en el período</span>
            </div>
            <div className="space-y-3">
              {LAST_CAMPAIGNS.map((c) => (
                <div key={c.name} className="bg-cspanel2 border border-csborder rounded-xl p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-semibold text-white">{c.name}</p>
                    <span className="text-[10px] text-csmuted shrink-0">{c.date}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                    <Box label="Enviados" value={c.sent} />
                    <Box label="Abiertos" value={c.opened} />
                    <Box label="Respuestas" value={c.replies} />
                    <Box label="Ventas" value={c.sales} highlight />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Funnel */}
        <section className="mt-6 bg-cspanel border border-csborder rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-4">Embudo de conversión · {range === "7d" ? "7 días" : range === "30d" ? "30 días" : "90 días"}</h3>
          <FunnelRow label="Mensajes entrantes" value={d.messagesSent} color="csaccent" />
          <FunnelRow label="Contactos nuevos" value={d.newContacts} color="emerald" />
          <FunnelRow label="Leads calificados" value={d.qualifiedLeads} color="amber" />
          <FunnelRow label="Ventas cerradas" value={d.salesCount} color="purple" />
        </section>
      </div>
    </div>
  );
}

function Kpi({
  label, value, tone, icon, size = "md",
}: {
  label: string;
  value: string | number;
  tone: "accent" | "emerald" | "amber" | "purple";
  icon?: "send" | "users" | "star" | "cart" | "money" | "chart" | "ticket";
  size?: "md" | "lg";
}) {
  const toneBg = {
    accent: "from-csaccent/15 to-csaccent/5 border-csaccent/30",
    emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    amber: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    purple: "from-purple-500/15 to-purple-500/5 border-purple-500/30",
  }[tone];
  const iconColor = {
    accent: "text-csaccent",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    purple: "text-purple-400",
  }[tone];

  return (
    <div className={clsx("rounded-xl border bg-gradient-to-br p-4 relative overflow-hidden", toneBg)}>
      <p className="text-[11px] uppercase tracking-wider text-csmuted">{label}</p>
      <p className={clsx("font-bold text-white mt-1", size === "lg" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl")}>
        {value}
      </p>
      {icon && (
        <div className={clsx("absolute top-3 right-3 opacity-30", iconColor)}>
          <Icon name={icon} />
        </div>
      )}
    </div>
  );
}

function Icon({ name }: { name: string }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "send": return <svg {...common}><path d="m22 2-7 20-4-9-9-4 20-7z" /></svg>;
    case "users": return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "star": return <svg {...common}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
    case "cart": return <svg {...common}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>;
    case "money": return <svg {...common}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
    case "chart": return <svg {...common}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
    case "ticket": return <svg {...common}><path d="M20.5 12.5V6a2 2 0 0 0-2-2h-13a2 2 0 0 0-2 2v6.5a2.5 2.5 0 0 1 0 5V21a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3.5a2.5 2.5 0 0 1 0-5z" /></svg>;
    default: return null;
  }
}

function Box({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="py-1">
      <p className={clsx("font-bold", highlight ? "text-csaccent" : "text-white")}>{value}</p>
      <p className="text-[9px] uppercase text-csmuted">{label}</p>
    </div>
  );
}

function FunnelRow({ label, value, color }: { label: string; value: number; color: "csaccent" | "emerald" | "amber" | "purple" }) {
  const MAX = 1840;
  const pct = Math.max((value / MAX) * 100, 8);
  const bg = {
    csaccent: "bg-csaccent",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    purple: "bg-purple-500",
  }[color];
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-40 text-xs text-csmuted shrink-0">{label}</div>
      <div className="flex-1 bg-cspanel2 rounded-lg h-8 overflow-hidden relative">
        <div className={clsx("h-full flex items-center px-3 rounded-lg", bg)} style={{ width: `${pct}%` }}>
          <span className="text-xs font-bold text-white">{value.toLocaleString("es-AR")}</span>
        </div>
      </div>
    </div>
  );
}
