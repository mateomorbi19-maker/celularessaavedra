export type Message = {
  id: string;
  direction: "in" | "out";
  content: string;
  at: string;
  agent?: boolean;
};

export type Conversation = {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  lastAt: string;
  unread: number;
  labels: string[];
  assistant: boolean;
  messages: Message[];
};

const now = Date.now();
const ago = (mins: number) => new Date(now - mins * 60_000).toISOString();

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    name: "Lucía Fernández",
    phone: "+54 9 11 4782-3219",
    avatar: "LF",
    lastAt: ago(3),
    unread: 1,
    labels: ["lead calificado"],
    assistant: true,
    messages: [
      { id: "m1", direction: "in", content: "Hola! Está el iPhone 16 Pro 128GB?", at: ago(20) },
      {
        id: "m2", direction: "out", agent: true,
        content:
`¡Hola Lucía! 👋 Soy el asistente de *Smart Saavedra* 📱

Sí, tenemos el *iPhone 16 Pro 128GB* en stock. Colores disponibles:
• Titanio Natural
• Titanio Negro
• Titanio Blanco

Precio: USD 1349 (con 10% OFF pagando en efectivo/transferencia queda en USD 1214)

¿Te interesa alguno en particular?`,
        at: ago(19),
      },
      { id: "m3", direction: "in", content: "El negro. Se puede en cuotas?", at: ago(15) },
      {
        id: "m4", direction: "out", agent: true,
        content:
`Sí Lucía, con tarjeta de crédito ofrecemos:
• 3 cuotas sin interés
• 6 cuotas con recargo del 10%
• 12 cuotas con recargo del 25%

¿Querés que te reservemos una unidad en Titanio Negro?`,
        at: ago(14),
      },
      { id: "m5", direction: "in", content: "Dale, me lo reservás? paso mañana por la tienda", at: ago(3) },
    ],
  },
  {
    id: "c2",
    name: "Martín Rodríguez",
    phone: "+54 9 11 5562-8812",
    avatar: "MR",
    lastAt: ago(22),
    unread: 2,
    labels: ["lead calificado"],
    assistant: true,
    messages: [
      { id: "m1", direction: "in", content: "Hola, el AirPods Pro 2 cuanto sale?", at: ago(28) },
      {
        id: "m2", direction: "out", agent: true,
        content:
`¡Hola Martín! 🎧

*AirPods Pro 2 (USB-C)* — USD 249
• Sellados, garantía oficial 1 año
• Cancelación de ruido + audio espacial
• Stock inmediato

¿Los querés solos o te armo combo con algún iPhone?`,
        at: ago(27),
      },
      { id: "m3", direction: "in", content: "Y si llevo el iPhone 16 y los airpods juntos?", at: ago(22) },
    ],
  },
  {
    id: "c3",
    name: "Sofía Méndez",
    phone: "+54 9 351 441-2290",
    avatar: "SM",
    lastAt: ago(55),
    unread: 0,
    labels: ["cliente", "VIP"],
    assistant: true,
    messages: [
      { id: "m1", direction: "in", content: "Hola! mi hija quiere un iPhone 15 de regalo, me aconsejás?", at: ago(70) },
      {
        id: "m2", direction: "out", agent: true,
        content:
`¡Hola Sofía! 👋 Un placer saludarte de nuevo.

Para regalo te recomiendo:
• *iPhone 15 128GB Rosa* — USD 899 (colores divinos, muy buscado por chicas)
• *iPhone 15 Pro 128GB Titanio Azul* — USD 1199 (si querés algo más premium)

Ambos sellados con garantía. ¿Querés que te mande fotos?`,
        at: ago(68),
      },
      { id: "m3", direction: "in", content: "El rosa, perfecto. Le sumás funda y vidrio?", at: ago(60) },
      {
        id: "m4", direction: "out", agent: true,
        content:
`Listo Sofía, te armo el combo:
• iPhone 15 128GB Rosa — USD 899
• Funda silicona original — USD 49
• Vidrio templado — USD 18
Total: *USD 966*

Te lo tengo listo para retiro mañana al mediodía?`,
        at: ago(58),
      },
      { id: "m5", direction: "in", content: "Perfecto, mañana paso!", at: ago(55) },
    ],
  },
  {
    id: "c4",
    name: "Javier Peralta",
    phone: "+54 9 11 6134-7705",
    avatar: "JP",
    lastAt: ago(130),
    unread: 0,
    labels: ["lead no calificado"],
    assistant: true,
    messages: [
      { id: "m1", direction: "in", content: "arreglan pantallas de iphone?", at: ago(140) },
      {
        id: "m2", direction: "out", agent: true,
        content:
`Hola Javier, gracias por escribirnos 🙏

Actualmente solo trabajamos *venta de equipos nuevos y reacondicionados*, no hacemos servicio técnico.

Si estás pensando en renovar, podés entregar tu equipo actual como parte de pago. ¿Te interesa esa opción?`,
        at: ago(138),
      },
      { id: "m3", direction: "in", content: "no gracias", at: ago(130) },
    ],
  },
  {
    id: "c5",
    name: "Camila Suárez",
    phone: "+54 9 261 559-4487",
    avatar: "CS",
    lastAt: ago(240),
    unread: 0,
    labels: ["lead calificado"],
    assistant: true,
    messages: [
      { id: "m1", direction: "in", content: "Hola! Tenés iPhone 13 usado?", at: ago(260) },
      {
        id: "m2", direction: "out", agent: true,
        content:
`¡Hola Camila! Sí 😊

Tenemos *iPhone 13 128GB reacondicionado Grado A* a USD 499:
• Batería 85%+
• 6 meses de garantía
• Probado por nuestro equipo técnico

¿Color preferís? Tenemos Medianoche y Azul.`,
        at: ago(258),
      },
      { id: "m3", direction: "in", content: "Medianoche. Podría verlo antes de comprarlo?", at: ago(240) },
    ],
  },
  {
    id: "c6",
    name: "Tomás Lacalle",
    phone: "+54 9 11 3345-5581",
    avatar: "TL",
    lastAt: ago(380),
    unread: 0,
    labels: ["lead calificado"],
    assistant: true,
    messages: [
      { id: "m1", direction: "in", content: "Envian a Mar del Plata?", at: ago(385) },
      {
        id: "m2", direction: "out", agent: true,
        content:
`Hola Tomás 👋

Sí, enviamos a todo el país vía Andreani o Correo Argentino:
• Envío 24/48hs
• Costo según ciudad (USD 15 a Mar del Plata)
• El equipo sale sellado, con factura

¿Qué modelo te interesa?`,
        at: ago(382),
      },
    ],
  },
  {
    id: "c7",
    name: "Valentina Rossi",
    phone: "+54 9 11 7889-2215",
    avatar: "VR",
    lastAt: ago(620),
    unread: 0,
    labels: ["cliente", "VIP"],
    assistant: true,
    messages: [
      { id: "m1", direction: "in", content: "Llegó el 16 Pro Max 512?", at: ago(630) },
      {
        id: "m2", direction: "out", agent: true,
        content:
`¡Hola Valentina! Sí, justo entraron 2 unidades hoy:
• *iPhone 16 Pro Max 512GB Titanio Negro* — USD 1949
• *iPhone 16 Pro Max 512GB Titanio Desierto* — USD 1949

¿Te aparto uno antes de que se agoten?`,
        at: ago(625),
      },
      { id: "m3", direction: "in", content: "Sí! el titanio negro. Mañana paso y transfiero.", at: ago(620) },
    ],
  },
  {
    id: "c8",
    name: "Facundo Acosta",
    phone: "+54 9 11 4455-7730",
    avatar: "FA",
    lastAt: ago(800),
    unread: 0,
    labels: ["lead calificado"],
    assistant: true,
    messages: [
      { id: "m1", direction: "in", content: "buenas, quiero saber si entregan factura A", at: ago(820) },
      {
        id: "m2", direction: "out", agent: true,
        content:
`Hola Facundo, sí, entregamos factura A para CUIT de empresa 💼

El precio es el mismo, sumamos el 21% de IVA discriminado. Si querés, pasame:
• CUIT
• Razón social
• Modelo que te interesa

Y te armo el presupuesto formal.`,
        at: ago(815),
      },
      { id: "m3", direction: "in", content: "Perfecto, mañana te mando los datos", at: ago(800) },
    ],
  },
  {
    id: "c9",
    name: "Brenda Molina",
    phone: "+54 9 221 448-2156",
    avatar: "BM",
    lastAt: ago(1200),
    unread: 0,
    labels: ["lead no calificado"],
    assistant: true,
    messages: [
      { id: "m1", direction: "in", content: "tenes samsung galaxy?", at: ago(1210) },
      {
        id: "m2", direction: "out", agent: true,
        content:
`Hola Brenda! 🙏

Somos una tienda *exclusiva de productos Apple* (iPhone, iPad, AirPods, Apple Watch). No trabajamos con Samsung.

Si alguna vez pensás pasarte a iPhone, me avisás 😉`,
        at: ago(1205),
      },
    ],
  },
];
