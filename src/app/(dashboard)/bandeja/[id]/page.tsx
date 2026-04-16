"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import clsx from "clsx";
import { CONVERSATIONS } from "@/data/conversations";

export default function ChatView() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const [assistantOn, setAssistantOn] = useState(true);

  const conv = useMemo(
    () => CONVERSATIONS.find((c) => c.id === params.id),
    [params.id]
  );

  if (!conv) {
    return (
      <div className="flex-1 flex items-center justify-center text-csmuted">
        Conversación no encontrada
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="h-16 px-4 md:px-6 border-b border-csborder bg-cspanel flex items-center gap-3 shrink-0">
        <button
          onClick={() => router.push("/bandeja")}
          className="md:hidden p-1.5 rounded-lg hover:bg-white/5 text-csmuted"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full cs-gradient flex items-center justify-center text-xs font-bold text-white">
          {conv.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white truncate">{conv.name}</p>
          <p className="text-[11px] text-csmuted truncate">{conv.phone}</p>
        </div>
        <button
          onClick={() => setAssistantOn((v) => !v)}
          className={clsx(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold transition",
            assistantOn
              ? "bg-csaccent/15 text-csaccent border border-csaccent/30"
              : "bg-cspanel2 text-csmuted border border-csborder"
          )}
        >
          <span className={clsx("w-1.5 h-1.5 rounded-full", assistantOn ? "bg-csaccent animate-pulse" : "bg-csmuted")} />
          Agente IA {assistantOn ? "activo" : "pausado"}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 bg-csblack">
        {conv.messages.map((m) => (
          <div
            key={m.id}
            className={clsx("flex", m.direction === "out" ? "justify-end" : "justify-start")}
          >
            <div
              className={clsx(
                "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                m.direction === "out"
                  ? "bg-csaccent text-white rounded-br-sm"
                  : "bg-cspanel2 text-slate-100 border border-csborder rounded-bl-sm"
              )}
            >
              {m.direction === "out" && m.agent && (
                <p className="text-[10px] font-bold uppercase tracking-wide opacity-80 mb-1">
                  🤖 Agente IA
                </p>
              )}
              <p className="whitespace-pre-wrap leading-snug">{m.content}</p>
              <p className={clsx("text-[10px] mt-1", m.direction === "out" ? "text-white/70" : "text-csmuted")}>
                {new Date(m.at).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Composer */}
      <div className="border-t border-csborder bg-cspanel p-3 md:p-4 shrink-0">
        {assistantOn && (
          <div className="mb-2 flex items-center gap-2 text-[11px] text-csmuted">
            <span className="w-1.5 h-1.5 bg-csaccent rounded-full animate-pulse" />
            El agente está respondiendo automáticamente. Pausalo arriba para intervenir manualmente.
          </div>
        )}
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={assistantOn}
            rows={1}
            placeholder={assistantOn ? "Pausá el agente para escribir manualmente" : "Escribir mensaje..."}
            className="flex-1 bg-cspanel2 border border-csborder rounded-xl px-4 py-2.5 text-sm text-white placeholder-csmuted resize-none focus:outline-none focus:ring-2 focus:ring-csaccent/40 focus:border-csaccent disabled:opacity-50"
          />
          <button
            disabled={assistantOn || !draft.trim()}
            className="cs-gradient text-white px-4 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
