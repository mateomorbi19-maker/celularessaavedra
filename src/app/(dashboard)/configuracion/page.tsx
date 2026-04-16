"use client";

import { useState } from "react";
import clsx from "clsx";

export default function ConfiguracionPage() {
  const [tab, setTab] = useState<"agente" | "whatsapp" | "horarios" | "equipo">("agente");

  return (
    <div className="flex-1 overflow-y-auto p-5 md:p-8">
      <div className="max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Configuración</h1>
          <p className="text-sm text-csmuted mt-1">
            Ajustes del agente de IA, WhatsApp, horarios y equipo.
          </p>
        </div>

        <div className="flex gap-1 mb-6 bg-cspanel border border-csborder rounded-xl p-1 w-fit overflow-x-auto">
          {(["agente", "whatsapp", "horarios", "equipo"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={clsx(
                "px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition whitespace-nowrap",
                tab === t ? "bg-csaccent text-white" : "text-csmuted hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "agente" && <AgenteTab />}
        {tab === "whatsapp" && <WhatsAppTab />}
        {tab === "horarios" && <HorariosTab />}
        {tab === "equipo" && <EquipoTab />}
      </div>
    </div>
  );
}

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="bg-cspanel border border-csborder rounded-xl p-5 mb-4">
      <h3 className="text-sm font-bold text-white">{title}</h3>
      {desc && <p className="text-xs text-csmuted mt-0.5 mb-4">{desc}</p>}
      {children}
    </div>
  );
}

function Toggle({ label, defaultOn = true }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-200">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={clsx("relative w-10 h-5 rounded-full transition", on ? "bg-csaccent" : "bg-csborder")}
      >
        <span
          className={clsx(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
            on ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

function AgenteTab() {
  return (
    <>
      <Card title="Estado del agente" desc="Controlá si el agente de IA responde los mensajes entrantes.">
        <div className="flex items-center gap-3 bg-csaccent/10 border border-csaccent/30 rounded-lg p-4">
          <div className="w-10 h-10 rounded-full cs-gradient flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">Agente activo</p>
            <p className="text-[11px] text-csmuted">Respondiendo 100% de los mensajes entrantes</p>
          </div>
          <button className="bg-cspanel2 border border-csborder text-csmuted hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
            Pausar
          </button>
        </div>
      </Card>

      <Card title="Personalidad y tono" desc="Cómo se comunica el agente con los clientes.">
        <div className="space-y-3">
          <div>
            <label className="text-[11px] uppercase text-csmuted">Nombre del agente</label>
            <input defaultValue="Saavedra Bot" className="w-full mt-1 bg-cspanel2 border border-csborder rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-csaccent/40" />
          </div>
          <div>
            <label className="text-[11px] uppercase text-csmuted">Tono</label>
            <select className="w-full mt-1 bg-cspanel2 border border-csborder rounded-lg px-3 py-2 text-sm text-white">
              <option>Cercano y comercial (recomendado)</option>
              <option>Formal</option>
              <option>Casual</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] uppercase text-csmuted">Mensaje de bienvenida</label>
            <textarea
              defaultValue="¡Hola! 👋 Bienvenido a Celulares Nuevos Saavedra 📱 ¿En qué iPhone te podemos ayudar hoy?"
              rows={3}
              className="w-full mt-1 bg-cspanel2 border border-csborder rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-csaccent/40"
            />
          </div>
        </div>
      </Card>

      <Card title="Comportamiento" desc="Qué puede hacer el agente automáticamente.">
        <Toggle label="Responder consultas de precios y stock" />
        <Toggle label="Calificar leads y clasificar intención de compra" />
        <Toggle label="Recomendar combos (iPhone + accesorios)" />
        <Toggle label="Derivar al equipo humano cuando detecta oportunidad real" />
        <Toggle label="Descartar automáticamente consultas fuera de nuestro rubro" />
      </Card>
    </>
  );
}

function WhatsAppTab() {
  return (
    <>
      <Card title="Conexión con WhatsApp Business" desc="Número asociado al CRM y al agente de IA.">
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
              <path d="M20.885 3.488A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">+54 9 11 6789-0001</p>
            <p className="text-[11px] text-emerald-400">Conectado · WhatsApp Business API</p>
          </div>
          <button className="bg-cspanel2 border border-csborder text-csmuted hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
            Configurar
          </button>
        </div>
      </Card>

      <Card title="Respuestas automáticas">
        <Toggle label="Responder al instante (24/7)" />
        <Toggle label="Usar emojis acorde al tono de la marca" />
        <Toggle label="Enviar catálogo cuando piden productos" />
        <Toggle label="Confirmar pedidos antes de derivar" />
      </Card>
    </>
  );
}

function HorariosTab() {
  return (
    <Card title="Horario de atención humana" desc="Fuera de estos horarios, el agente indica que el equipo responderá al día siguiente.">
      <div className="space-y-2">
        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((d) => (
          <div key={d} className="flex items-center justify-between bg-cspanel2 border border-csborder rounded-lg px-3 py-2.5">
            <span className="text-sm text-white w-24">{d}</span>
            <div className="flex items-center gap-2 text-sm text-csmuted">
              <span>09:00</span>
              <span>—</span>
              <span>19:00</span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between bg-cspanel2 border border-csborder rounded-lg px-3 py-2.5">
          <span className="text-sm text-white w-24">Sábado</span>
          <div className="flex items-center gap-2 text-sm text-csmuted">
            <span>10:00</span>
            <span>—</span>
            <span>14:00</span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-cspanel2 border border-csborder rounded-lg px-3 py-2.5 opacity-50">
          <span className="text-sm text-white w-24">Domingo</span>
          <span className="text-sm text-csmuted">Cerrado</span>
        </div>
      </div>
    </Card>
  );
}

function EquipoTab() {
  return (
    <Card title="Usuarios del panel" desc="Personas con acceso al CRM.">
      <div className="space-y-2">
        {[
          { name: "Mateo", role: "Administrador" },
          { name: "Marcio", role: "Ventas" },
        ].map((u) => (
          <div key={u.name} className="flex items-center gap-3 bg-cspanel2 border border-csborder rounded-lg p-3">
            <div className="w-10 h-10 rounded-full cs-gradient flex items-center justify-center font-bold text-white">
              {u.name[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{u.name}</p>
              <p className="text-[11px] text-csmuted">{u.role}</p>
            </div>
            <button className="text-csmuted hover:text-white text-xs">Editar</button>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 bg-cspanel2 border border-dashed border-csborder hover:border-csaccent/40 text-csmuted hover:text-white py-2.5 rounded-lg text-sm font-semibold">
        + Invitar usuario
      </button>
    </Card>
  );
}
