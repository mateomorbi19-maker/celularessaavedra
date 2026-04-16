export type OrderItem = { name: string; qty: number; price: number; note?: string };

export type Order = {
  id: string;
  code: string;
  customer: string;
  phone: string;
  createdAt: string;
  channel: "WhatsApp" | "Tienda";
  type: "Envío" | "Retiro en tienda";
  address?: string;
  status: "Nuevo" | "Reservado" | "Pagado" | "Enviado" | "Entregado" | "Cancelado";
  payment: "Efectivo" | "Transferencia" | "Tarjeta 3c" | "Tarjeta 6c" | "Tarjeta 12c";
  items: OrderItem[];
  notes?: string;
  total: number;
};

const now = Date.now();
const ago = (mins: number) => new Date(now - mins * 60_000).toISOString();

export const ORDERS: Order[] = [
  {
    id: "o1",
    code: "SAV-20419",
    customer: "Lucía Fernández",
    phone: "+54 9 11 4782-3219",
    createdAt: ago(8),
    channel: "WhatsApp",
    type: "Retiro en tienda",
    status: "Reservado",
    payment: "Transferencia",
    items: [{ name: "iPhone 16 Pro 128GB Titanio Negro", qty: 1, price: 1214 }],
    notes: "Cliente pasa mañana 11hs. Aplicar 10% OFF efectivo.",
    total: 1214,
  },
  {
    id: "o2",
    code: "SAV-20418",
    customer: "Sofía Méndez",
    phone: "+54 9 351 441-2290",
    createdAt: ago(60),
    channel: "WhatsApp",
    type: "Retiro en tienda",
    status: "Pagado",
    payment: "Tarjeta 6c",
    items: [
      { name: "iPhone 15 128GB Rosa", qty: 1, price: 899 },
      { name: "Funda silicona iPhone 15", qty: 1, price: 49 },
      { name: "Vidrio templado", qty: 1, price: 18 },
    ],
    notes: "Combo regalo para hija",
    total: 966,
  },
  {
    id: "o3",
    code: "SAV-20417",
    customer: "Valentina Rossi",
    phone: "+54 9 11 7889-2215",
    createdAt: ago(620),
    channel: "WhatsApp",
    type: "Retiro en tienda",
    status: "Reservado",
    payment: "Transferencia",
    items: [{ name: "iPhone 16 Pro Max 512GB Titanio Negro", qty: 1, price: 1949 }],
    total: 1949,
  },
  {
    id: "o4",
    code: "SAV-20416",
    customer: "Diego Álvarez",
    phone: "+54 9 11 3298-7714",
    createdAt: ago(900),
    channel: "Tienda",
    type: "Retiro en tienda",
    status: "Entregado",
    payment: "Efectivo",
    items: [
      { name: "iPhone 16 128GB Ultramar", qty: 1, price: 944 },
      { name: "AirPods Pro 2 USB-C", qty: 1, price: 249 },
    ],
    total: 1193,
  },
  {
    id: "o5",
    code: "SAV-20415",
    customer: "Facundo Acosta",
    phone: "+54 9 11 4455-7730",
    createdAt: ago(1300),
    channel: "WhatsApp",
    type: "Envío",
    address: "Av. Corrientes 3456, CABA",
    status: "Enviado",
    payment: "Transferencia",
    items: [
      { name: "iPhone 16 Pro Max 256GB Titanio Desierto", qty: 1, price: 1699 },
    ],
    notes: "Factura A — CUIT empresa",
    total: 1699,
  },
  {
    id: "o6",
    code: "SAV-20414",
    customer: "Micaela Herrera",
    phone: "+54 9 299 445-2298",
    createdAt: ago(1800),
    channel: "WhatsApp",
    type: "Envío",
    address: "Rivadavia 2211, Neuquén",
    status: "Entregado",
    payment: "Transferencia",
    items: [{ name: "iPhone 14 128GB Azul", qty: 1, price: 749 }],
    total: 749,
  },
  {
    id: "o7",
    code: "SAV-20413",
    customer: "Tomás Lacalle",
    phone: "+54 9 11 3345-5581",
    createdAt: ago(2400),
    channel: "WhatsApp",
    type: "Envío",
    address: "San Martín 1567, Mar del Plata",
    status: "Nuevo",
    payment: "Transferencia",
    items: [{ name: "iPhone 15 256GB Negro", qty: 1, price: 1029 }],
    total: 1029,
  },
  {
    id: "o8",
    code: "SAV-20412",
    customer: "Agustín Romero",
    phone: "+54 9 341 299-1187",
    createdAt: ago(3200),
    channel: "Tienda",
    type: "Retiro en tienda",
    status: "Entregado",
    payment: "Tarjeta 12c",
    items: [
      { name: "iPhone 13 128GB Reacondicionado", qty: 1, price: 499 },
      { name: "Cargador 20W USB-C", qty: 1, price: 29 },
    ],
    total: 528,
  },
  {
    id: "o9",
    code: "SAV-20411",
    customer: "Emiliano Sosa",
    phone: "+54 9 11 5541-9923",
    createdAt: ago(4800),
    channel: "WhatsApp",
    type: "Retiro en tienda",
    status: "Cancelado",
    payment: "Efectivo",
    items: [{ name: "iPhone 16 128GB Negro", qty: 1, price: 944 }],
    notes: "Cliente no se presentó",
    total: 944,
  },
];
