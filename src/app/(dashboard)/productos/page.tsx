"use client";

import { useState } from "react";
import clsx from "clsx";
import { PRODUCTS, CATEGORIES, type Product } from "@/data/products";

export default function ProductosPage() {
  const [activeCat, setActiveCat] = useState<Product["category"]>(CATEGORIES[0]);
  const [prices, setPrices] = useState<Record<string, number>>(() => {
    const m: Record<string, number> = {};
    PRODUCTS.forEach((p) => (m[p.id] = p.price));
    return m;
  });
  const [stock, setStock] = useState<Record<string, number>>(() => {
    const m: Record<string, number> = {};
    PRODUCTS.forEach((p) => (m[p.id] = p.stock));
    return m;
  });
  const [availability, setAvailability] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = {};
    PRODUCTS.forEach((p) => (m[p.id] = p.available));
    return m;
  });
  const [editing, setEditing] = useState<Product | null>(null);
  const [q, setQ] = useState("");

  const items = PRODUCTS.filter((p) => p.category === activeCat).filter((p) =>
    q.trim()
      ? p.name.toLowerCase().includes(q.toLowerCase()) ||
        (p.color ?? "").toLowerCase().includes(q.toLowerCase()) ||
        (p.storage ?? "").toLowerCase().includes(q.toLowerCase())
      : true
  );

  const toggle = (id: string) => setAvailability((p) => ({ ...p, [id]: !p[id] }));

  const saveEdit = (id: string, price: number, st: number) => {
    setPrices((p) => ({ ...p, [id]: price }));
    setStock((s) => ({ ...s, [id]: st }));
    setEditing(null);
  };

  return (
    <div className="flex-1 flex min-w-0 overflow-hidden">
      {/* Category sidebar */}
      <aside className="hidden md:block w-56 border-r border-csborder bg-cspanel overflow-y-auto shrink-0">
        <div className="p-4 border-b border-csborder">
          <h2 className="text-sm font-bold text-white">Catálogo</h2>
          <p className="text-[11px] text-csmuted mt-0.5">{PRODUCTS.length} productos</p>
        </div>
        <nav className="p-2 space-y-0.5">
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={clsx(
                  "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition",
                  activeCat === c
                    ? "bg-csaccent text-white"
                    : "text-csmuted hover:bg-white/5 hover:text-white"
                )}
              >
                {c}
                <span className="float-right text-[10px] opacity-70">{count}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 md:p-8">
        <div className="max-w-5xl">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Productos</h1>
              <p className="text-sm text-csmuted mt-1">
                Modificá precios, stock y disponibilidad. Los cambios se reflejan automáticamente en el agente de IA y en la web.
              </p>
            </div>
          </div>

          {/* Mobile category select */}
          <div className="md:hidden mb-4 overflow-x-auto -mx-1 px-1">
            <div className="flex gap-2 w-max">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={clsx(
                    "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border",
                    activeCat === c
                      ? "bg-csaccent border-csaccent text-white"
                      : "bg-cspanel2 border-csborder text-csmuted"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-5 gap-3">
            <h2 className="font-display text-2xl md:text-3xl text-white">{activeCat}</h2>
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-csmuted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar..."
                className="w-full pl-8 pr-3 py-1.5 bg-cspanel border border-csborder rounded-lg text-xs text-white placeholder-csmuted focus:outline-none focus:ring-2 focus:ring-csaccent/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            {items.map((item) => {
              const on = availability[item.id];
              const price = prices[item.id];
              const st = stock[item.id];
              return (
                <div
                  key={item.id}
                  className={clsx(
                    "bg-cspanel border border-csborder rounded-xl p-4 flex items-start gap-4 transition",
                    !on && "opacity-50",
                    item.highlight && "ring-1 ring-csaccent/30"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      {item.storage && (
                        <span className="text-[10px] text-csmuted uppercase tracking-wider">
                          {item.storage}
                        </span>
                      )}
                      {item.condition === "Reacondicionado" && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 uppercase font-bold">
                          Reacond.
                        </span>
                      )}
                      {item.highlight && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-csaccent/15 text-csaccent uppercase font-bold">
                          Destacado
                        </span>
                      )}
                    </div>
                    {item.color && (
                      <p className="text-xs text-csmuted mt-1">
                        Color: {item.color}
                      </p>
                    )}
                    <p className="text-[11px] text-csmuted mt-1">
                      Stock: <span className={st > 0 ? "text-white" : "text-rose-400"}>{st} unidades</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-lg font-bold text-csaccent leading-none">
                      USD {price.toLocaleString("es-AR")}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggle(item.id)}
                        className={clsx(
                          "flex items-center gap-2 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider transition",
                          on
                            ? "bg-csaccent/15 border-csaccent/40 text-csaccent hover:bg-csaccent/25"
                            : "bg-cspanel2 border-csborder text-csmuted hover:border-csmuted/60"
                        )}
                        title={on ? "Visible — click para ocultar" : "Oculto — click para publicar"}
                      >
                        <span className={clsx("w-1.5 h-1.5 rounded-full", on ? "bg-csaccent" : "bg-csmuted")} />
                        {on ? "Publicado" : "Oculto"}
                      </button>
                      <button
                        onClick={() => setEditing(item)}
                        className="text-csmuted hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition"
                        title="Editar precio / stock"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {items.length === 0 && (
              <p className="text-center text-csmuted py-10">Sin productos que coincidan.</p>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <EditModal
          product={editing}
          initPrice={prices[editing.id]}
          initStock={stock[editing.id]}
          onClose={() => setEditing(null)}
          onSave={saveEdit}
        />
      )}
    </div>
  );
}

function EditModal({
  product,
  initPrice,
  initStock,
  onClose,
  onSave,
}: {
  product: Product;
  initPrice: number;
  initStock: number;
  onClose: () => void;
  onSave: (id: string, price: number, stock: number) => void;
}) {
  const [price, setPrice] = useState(String(initPrice));
  const [st, setSt] = useState(String(initStock));

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-cspanel border border-csborder rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="text-[11px] uppercase text-csmuted">Editar producto</p>
            <h3 className="text-lg font-bold text-white">{product.name}</h3>
            {(product.storage || product.color) && (
              <p className="text-xs text-csmuted mt-0.5">
                {[product.storage, product.color].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-csmuted hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-csmuted">Precio (USD)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full mt-1 bg-cspanel2 border border-csborder rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-csaccent/40"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-csmuted">Stock (unidades)</label>
            <input
              type="number"
              value={st}
              onChange={(e) => setSt(e.target.value)}
              className="w-full mt-1 bg-cspanel2 border border-csborder rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-csaccent/40"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-cspanel2 border border-csborder text-csmuted hover:text-white py-2.5 rounded-xl text-sm font-semibold"
            >
              Cancelar
            </button>
            <button
              onClick={() => onSave(product.id, Number(price), Number(st))}
              className="flex-1 cs-gradient text-white py-2.5 rounded-xl text-sm font-semibold"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
