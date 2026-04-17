export type CampaignTemplate = {
  id: string;
  name: string;
  type: "Promoción" | "Combo" | "Stock nuevo" | "Exclusivo VIP" | "Recordatorio";
  preview: string;     // short summary
  body: string;        // full body with {nombre} variable
  recommendedSegment?: "Cliente" | "Lead Calificado" | "Lead No Calificado" | "Todos";
};

export const TEMPLATES: CampaignTemplate[] = [
  {
    id: "tpl-promo-16",
    name: "Promoción iPhone 16",
    type: "Promoción",
    recommendedSegment: "Lead Calificado",
    preview: "10% OFF pagando en efectivo o transferencia",
    body:
`Hola {nombre}! 👋 Te escribimos desde *Smart Saavedra* 📱

Esta semana tenemos el *iPhone 16 128GB* con *10% OFF* pagando en efectivo o transferencia.

✅ Sellado, garantía oficial 1 año
✅ Enviamos a todo el país
✅ Aceptamos tu iPhone usado como parte de pago

¿Querés que te reservemos una unidad, {nombre}?`,
  },
  {
    id: "tpl-combo-pro",
    name: "Combo iPhone 16 Pro + AirPods",
    type: "Combo",
    recommendedSegment: "Cliente",
    preview: "iPhone 16 Pro + AirPods Pro 2 a precio especial",
    body:
`{nombre}, combo exclusivo para vos 🎁

📦 *iPhone 16 Pro 128GB* + *AirPods Pro 2*
💸 Precio combo: *USD 1549* (ahorrás USD 49)

🟢 Stock inmediato
🟢 12 cuotas sin interés con tarjeta
🟢 Envío gratis en CABA

¿Te lo apartamos, {nombre}?`,
  },
  {
    id: "tpl-stock-nuevo",
    name: "Nuevo stock ingresado",
    type: "Stock nuevo",
    recommendedSegment: "Todos",
    preview: "Llegó nuevo stock de iPhone 15 y 16",
    body:
`¡Hola {nombre}! 🚨

Nos llegó stock nuevo esta semana:

📱 iPhone 16 Pro Max 256GB — Titanio Desierto
📱 iPhone 16 128GB — Ultramar / Rosa / Negro
📱 iPhone 15 Pro 128GB — Titanio Azul
🎧 AirPods Pro 2 USB-C

Todo sellado con garantía oficial. ¿Querés que te pase precios y fotos, {nombre}?`,
  },
  {
    id: "tpl-vip",
    name: "Oferta exclusiva VIP",
    type: "Exclusivo VIP",
    recommendedSegment: "Cliente",
    preview: "Preventa exclusiva para clientes VIP",
    body:
`{nombre} 👑, gracias por ser cliente de *Smart Saavedra*.

Antes de publicar al público, te dejamos acceso preferencial:

⭐ *iPhone 16 Pro Max 512GB* — USD 1899 (USD 50 menos que precio lista)
⭐ Incluye funda de silicona + vidrio templado sin cargo
⭐ 3 unidades disponibles solo para clientes recurrentes

Avisame hoy si querés separarlo, {nombre}.`,
  },
  {
    id: "tpl-reacondicionado",
    name: "Reacondicionados — oportunidad",
    type: "Promoción",
    recommendedSegment: "Lead Calificado",
    preview: "iPhone reacondicionados desde USD 349",
    body:
`Hola {nombre}! 🙌

¿Buscabas un iPhone sin gastar de más? Tenemos reacondicionados *Grado A* con garantía de 6 meses:

💚 iPhone 12 — USD 349
💚 iPhone 13 — USD 499
💚 iPhone 14 — USD 619
💚 iPhone 15 Pro — USD 1049

Todos con batería 85%+ y probados por nuestro equipo técnico. ¿Te interesa alguno, {nombre}?`,
  },
];
