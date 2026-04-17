export type ContactSegment = "Cliente" | "Lead Calificado" | "Lead No Calificado";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  segment: ContactSegment;
  interestedIn?: string;
  budget?: number;       // USD
  lastContact: string;   // ISO
  totalSpent?: number;   // USD (for clients)
  orders?: number;
  tags: string[];
  notes?: string;
};

const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 86_400_000).toISOString();
const hoursAgo = (h: number) => new Date(now - h * 3_600_000).toISOString();

// Realistic Argentine / Uruguayan names
const FIRST_NAMES = [
  "Lucía", "Martín", "Sofía", "Javier", "Camila", "Tomás", "Valentina", "Agustín",
  "Florencia", "Nicolás", "Julieta", "Diego", "Micaela", "Facundo", "Martina",
  "Santiago", "Belén", "Matías", "Ariana", "Lucas", "Milagros", "Bruno",
  "Carolina", "Mariano", "Rocío", "Emiliano", "Antonella", "Ignacio", "Paula",
  "Federico", "Ayelén", "Gonzalo", "Melina", "Franco", "Daniela", "Alan",
  "Jimena", "Leandro", "Verónica", "Esteban", "Brenda", "Cristian", "Noelia",
  "Pablo", "Romina", "Ramiro", "Sabrina", "Hernán", "Gabriela", "Joaquín",
  "Carla", "Hugo", "Tamara", "Walter", "Natalia", "Andrés", "Ailín",
  "Sebastián", "Evangelina", "Ezequiel", "Lorena", "Mauro", "Celeste", "Damián",
  "Abril", "Maximiliano", "Solange", "Germán", "Luciana", "Nahuel", "Fiorella",
  "Iván", "Agostina", "Rodrigo", "Yamila", "Cristian", "Denise", "Gastón",
  "Magalí", "Axel", "Aldana", "Enzo", "Daiana", "Leonardo", "Betiana",
  "Tobías", "Araceli", "Gianluca", "Estefanía", "Kevin", "Candela", "Marcelo",
  "Rosario", "Ulises", "Mía", "Benjamín", "Alma", "Lautaro", "Luz",
  "Thiago", "Emma", "Felipe", "Malena",
];

const LAST_NAMES = [
  "García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Pérez",
  "Gómez", "Sánchez", "Romero", "Sosa", "Torres", "Álvarez", "Ruiz", "Ramírez",
  "Flores", "Acosta", "Benítez", "Medina", "Suárez", "Herrera", "Aguirre",
  "Molina", "Silva", "Castro", "Ortiz", "Núñez", "Rojas", "Morales", "Vargas",
  "Ferreyra", "Méndez", "Luna", "Ríos", "Giménez", "Funes", "Cabrera",
  "Pereyra", "Villalba", "Arias", "Delgado", "Navarro", "Vega", "Figueroa",
  "Ojeda", "Quiroga", "Correa", "Paz", "Domínguez", "Salazar", "Mansilla",
  "Leiva", "Cáceres", "Maidana", "Toledo", "Escobar", "Lezcano", "Chávez",
  "Ibarra", "Bravo", "Coria", "Barrera", "Andrade",
];

// Deterministic random from seed
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PRODUCTS_INTEREST = [
  "iPhone 16 Pro Max 256GB",
  "iPhone 16 Pro 128GB",
  "iPhone 16 128GB",
  "iPhone 15 Pro 256GB",
  "iPhone 15 128GB",
  "iPhone 14 Pro 256GB",
  "iPhone 14 128GB",
  "iPhone 13 128GB",
  "iPhone 13 Reacondicionado",
  "iPhone 12 Reacondicionado",
  "AirPods Pro 2",
  "AirPods 4",
  "Apple Watch Series 10",
  "iPad Air M2",
  "Funda + Vidrio iPhone 15",
];

const NO_CAL_REASONS = [
  "Preguntó precio y no respondió",
  "Consultaba por algo que no vendemos",
  "Solo comparando",
  "Fuera de presupuesto",
  "Pidió reparación (no vendemos servicio)",
  "Quería canjear equipo antiguo",
  "Número inválido / bot",
];

function genPhone(rand: () => number): string {
  // Formato argentino móvil: +54 9 11 / 261 / 351 etc.
  const areas = ["11", "261", "351", "341", "299", "381", "387", "221"];
  const area = areas[Math.floor(rand() * areas.length)];
  const n1 = 3000 + Math.floor(rand() * 6999);
  const n2 = 1000 + Math.floor(rand() * 8999);
  return `+54 9 ${area} ${n1}-${n2}`;
}

function genUniqueName(rand: () => number, used: Set<string>): string {
  for (let attempt = 0; attempt < 50; attempt++) {
    const fn = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
    const ln = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
    const name = `${fn} ${ln}`;
    if (!used.has(name)) {
      used.add(name);
      return name;
    }
  }
  const base = `${FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)]}`;
  const name = `${base} ${used.size}`;
  used.add(name);
  return name;
}

export const CONTACTS: Contact[] = (() => {
  const rand = mulberry32(42);
  const out: Contact[] = [];
  const usedNames = new Set<string>();

  // 252 Clientes
  for (let i = 0; i < 252; i++) {
    const orders = 1 + Math.floor(rand() * 5);
    const avgTicket = 500 + Math.floor(rand() * 1200);
    const totalSpent = orders * avgTicket;
    const fav = PRODUCTS_INTEREST[Math.floor(rand() * PRODUCTS_INTEREST.length)];
    out.push({
      id: `cli-${i + 1}`,
      name: genUniqueName(rand, usedNames),
      phone: genPhone(rand),
      segment: "Cliente",
      interestedIn: fav,
      lastContact: daysAgo(Math.floor(rand() * 180)),
      totalSpent,
      orders,
      tags: totalSpent > 2500 ? ["VIP", "recurrente"] : orders > 1 ? ["recurrente"] : ["cliente"],
      notes: rand() > 0.7 ? "Prefiere contacto por WhatsApp, pago transferencia" : undefined,
    });
  }

  // 240 Leads Calificados
  for (let i = 0; i < 240; i++) {
    const interested = PRODUCTS_INTEREST[Math.floor(rand() * PRODUCTS_INTEREST.length)];
    const budget = 400 + Math.floor(rand() * 1400);
    out.push({
      id: `lcal-${i + 1}`,
      name: genUniqueName(rand, usedNames),
      phone: genPhone(rand),
      segment: "Lead Calificado",
      interestedIn: interested,
      budget,
      lastContact: hoursAgo(Math.floor(rand() * 120)),
      tags: rand() > 0.5 ? ["interés alto"] : ["en seguimiento"],
      notes: rand() > 0.6 ? "Consultó financiación en cuotas" : undefined,
    });
  }

  // 108 Leads No Calificados
  for (let i = 0; i < 108; i++) {
    out.push({
      id: `lnc-${i + 1}`,
      name: genUniqueName(rand, usedNames),
      phone: genPhone(rand),
      segment: "Lead No Calificado",
      lastContact: daysAgo(Math.floor(rand() * 60)),
      tags: ["descartado"],
      notes: NO_CAL_REASONS[Math.floor(rand() * NO_CAL_REASONS.length)],
    });
  }

  return out;
})();

export function contactsBySegment(segment: ContactSegment) {
  return CONTACTS.filter((c) => c.segment === segment);
}
