"use client";

import { useState, useMemo } from "react";
import clsx from "clsx";
import { CONTACTS, type Contact, type ContactSegment } from "@/data/contacts";
import { TEMPLATES, type CampaignTemplate } from "@/data/templates";

const SEGMENTS: (ContactSegment | "Todos")[] = ["Todos", "Cliente", "Lead Calificado", "Lead No Calificado"];

const segmentStyle: Record<ContactSegment, string> = {
  "Cliente": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Lead Calificado": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Lead No Calificado": "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

const typeStyle: Record<CampaignTemplate["type"], string> = {
  "Promoción": "bg-csaccent/15 text-csaccent border-csaccent/30",
  "Combo": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Stock nuevo": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Exclusivo VIP": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Recordatorio": "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

function personalize(body: string, name: string) {
  const firstName = name.split(" ")[0];
  return body.replaceAll("{nombre}", firstName);
}

export default function CampanasPage() {
  const [segment, setSegment] = useState<ContactSegment | "Todos">("Todos");
  const [q, setQ] = useState("");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [limit, setLimit] = useState<number | null>(null);
  const [template, setTemplate] = useState<CampaignTemplate>(TEMPLATES[0]);
  const [customBody, setCustomBody] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const filtered = useMemo(() => {
    let list = CONTACTS;
    if (segment !== "Todos") list = list.filter((c) => c.segment === segment);
    if (q.trim()) {
      const n = q.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(n) ||
          c.phone.includes(n) ||
          c.tags.some((t) => t.toLowerCase().includes(n))
      );
    }
    return list;
  }, [segment, q]);

  const displayed = useMemo(() => {
    return limit ? filtered.slice(0, limit) : filtered;
  }, [filtered, limit]);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllVisible = () => {
    setChecked(new Set(displayed.map((c) => c.id)));
  };

  const clearSelection = () => setChecked(new Set());

  const selectFirst = (n: number) => {
    setChecked(new Set(filtered.slice(0, n).map((c) => c.id)));
    setLimit(null);
  };

  const previewContacts = useMemo(
    () => CONTACTS.filter((c) => checked.has(c.id)),
    [checked]
  );

  const body = customBody ?? template.body;
  const previewContact = previewContacts[0];

  const handleTemplateChange = (t: CampaignTemplate) => {
    setTemplate(t);
    setCustomBody(null);
  };

  const handleSend = () => {
    if (checked.size === 0) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      clearSelection();
    }, 3500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Campañas masivas</h1>
          <p className="text-sm text-csmuted mt-1">
            Enviá promociones, combos y novedades personalizadas a segmentos de tu base. Cada mensaje se personaliza con el nombre del cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* LEFT — Contact selector */}
          <section className="lg:col-span-3 bg-cspanel border border-csborder rounded-2xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-csborder">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-csmuted font-bold">Paso 1</p>
                  <h2 className="text-base font-bold text-white">Seleccionar contactos</h2>
                </div>
                <div className="flex items-center gap-2 bg-csaccent/10 text-csaccent px-3 py-1.5 rounded-full">
                  <span className="text-xs font-bold">{checked.size}</span>
                  <span className="text-[10px] uppercase tracking-wider">seleccionados</span>
                </div>
              </div>

              {/* Segment filter */}
              <div className="flex flex-wrap gap-2 mb-3">
                {SEGMENTS.map((s) => {
                  const count =
                    s === "Todos"
                      ? CONTACTS.length
                      : CONTACTS.filter((c) => c.segment === s).length;
                  return (
                    <button
                      key={s}
                      onClick={() => setSegment(s)}
                      className={clsx(
                        "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                        segment === s
                          ? "bg-csaccent border-csaccent text-white"
                          : "bg-cspanel2 border-csborder text-csmuted hover:text-white hover:border-csaccent/40"
                      )}
                    >
                      {s} · {count}
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative mb-3">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-csmuted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar contacto..."
                  className="w-full pl-9 pr-3 py-2 bg-cspanel2 border border-csborder rounded-lg text-sm text-white placeholder-csmuted focus:outline-none focus:ring-2 focus:ring-csaccent/40 focus:border-csaccent"
                />
              </div>

              {/* Quick actions */}
              <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="text-csmuted">Rápido:</span>
                <button onClick={selectAllVisible} className="px-2.5 py-1 rounded-lg bg-cspanel2 border border-csborder text-white hover:border-csaccent/40">
                  Seleccionar todos ({filtered.length})
                </button>
                {[10, 25, 50].map((n) => (
                  <button
                    key={n}
                    onClick={() => selectFirst(Math.min(n, filtered.length))}
                    className="px-2.5 py-1 rounded-lg bg-cspanel2 border border-csborder text-csmuted hover:text-white hover:border-csaccent/40"
                  >
                    Primeros {n}
                  </button>
                ))}
                {checked.size > 0 && (
                  <button onClick={clearSelection} className="ml-auto px-2.5 py-1 rounded-lg text-csmuted hover:text-white">
                    Limpiar
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-[520px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-cspanel2 text-csmuted text-[10px] uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="w-10 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={displayed.length > 0 && displayed.every((c) => checked.has(c.id))}
                        onChange={(e) => {
                          if (e.target.checked) selectAllVisible();
                          else clearSelection();
                        }}
                        className="accent-csaccent w-4 h-4 cursor-pointer"
                      />
                    </th>
                    <th className="text-left px-4 py-3">Contacto</th>
                    <th className="text-left px-4 py-3 hidden sm:table-cell">Segmento</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Interés</th>
                  </tr>
                </thead>
                <tbody>
                  {displayed.map((c) => {
                    const isChecked = checked.has(c.id);
                    return (
                      <tr
                        key={c.id}
                        onClick={() => toggle(c.id)}
                        className={clsx(
                          "border-t border-csborder cursor-pointer transition",
                          isChecked ? "bg-csaccent/10" : "hover:bg-white/5"
                        )}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggle(c.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="accent-csaccent w-4 h-4 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full cs-gradient flex items-center justify-center text-[10px] font-bold text-white">
                              {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-white font-semibold truncate">{c.name}</p>
                              <p className="text-[11px] text-csmuted truncate">{c.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className={clsx("inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border", segmentStyle[c.segment])}>
                            {c.segment}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-csmuted text-xs hidden md:table-cell max-w-[200px] truncate">
                          {c.interestedIn ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* RIGHT — Template & preview */}
          <section className="lg:col-span-2 space-y-5">
            {/* Template picker */}
            <div className="bg-cspanel border border-csborder rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-wider text-csmuted font-bold mb-1">Paso 2</p>
              <h2 className="text-base font-bold text-white mb-3">Elegir plantilla</h2>

              <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                {TEMPLATES.map((t) => {
                  const active = template.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateChange(t)}
                      className={clsx(
                        "w-full text-left p-3 rounded-xl border transition",
                        active
                          ? "border-csaccent bg-csaccent/10"
                          : "border-csborder bg-cspanel2 hover:border-csaccent/40"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-white text-sm">{t.name}</p>
                        <span className={clsx("px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border shrink-0", typeStyle[t.type])}>
                          {t.type}
                        </span>
                      </div>
                      <p className="text-xs text-csmuted">{t.preview}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-cspanel border border-csborder rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-csmuted font-bold">Paso 3</p>
                  <h2 className="text-base font-bold text-white">Vista previa personalizada</h2>
                </div>
                {previewContact && (
                  <span className="text-[11px] text-csmuted">
                    Ejemplo con {previewContact.name.split(" ")[0]}
                  </span>
                )}
              </div>

              <div className="bg-[#075E54]/10 border border-[#25D366]/20 rounded-xl p-3 mb-3">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <p className="text-[11px] text-csmuted">WhatsApp · Preview</p>
                </div>

                <div className="bg-cspanel2 rounded-lg p-3 max-h-[280px] overflow-y-auto">
                  <p className="whitespace-pre-wrap text-sm text-slate-100 leading-relaxed">
                    {previewContact
                      ? personalize(body, previewContact.name)
                      : body.replaceAll("{nombre}", "—")}
                  </p>
                </div>
              </div>

              <details className="mb-3">
                <summary className="cursor-pointer text-[11px] uppercase tracking-wider text-csmuted hover:text-white">
                  Editar mensaje manualmente
                </summary>
                <textarea
                  value={customBody ?? template.body}
                  onChange={(e) => setCustomBody(e.target.value)}
                  rows={8}
                  className="w-full mt-2 bg-cspanel2 border border-csborder rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-csaccent/40 font-mono"
                />
                <p className="text-[10px] text-csmuted mt-1">
                  La variable <span className="text-csaccent font-mono">{"{nombre}"}</span> se reemplaza automáticamente por el primer nombre de cada contacto.
                </p>
              </details>

              <button
                disabled={checked.size === 0 || sent}
                onClick={handleSend}
                className={clsx(
                  "w-full py-3 rounded-xl text-sm font-bold transition",
                  sent
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : checked.size === 0
                      ? "bg-cspanel2 border border-csborder text-csmuted cursor-not-allowed"
                      : "cs-gradient text-white shadow-lg shadow-csaccent/20 hover:brightness-110"
                )}
              >
                {sent
                  ? `✓ ${checked.size} mensajes encolados correctamente`
                  : checked.size === 0
                    ? "Seleccioná al menos un contacto"
                    : `Enviar a ${checked.size} contacto${checked.size > 1 ? "s" : ""}`}
              </button>

              {checked.size > 0 && !sent && (
                <p className="text-[10px] text-csmuted text-center mt-2">
                  Se enviará vía WhatsApp Business · Cada mensaje personalizado con el nombre del contacto
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
