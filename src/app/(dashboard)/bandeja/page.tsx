export default function BandejaEmpty() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cspanel border border-csborder mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-csmuted">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-white mb-1">Seleccioná un chat</h2>
        <p className="text-sm text-csmuted">
          Elegí una conversación de la lista para ver los mensajes y la actividad del agente de IA.
        </p>
      </div>
    </div>
  );
}
