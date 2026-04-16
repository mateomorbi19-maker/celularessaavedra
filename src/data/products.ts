export type Product = {
  id: string;
  name: string;
  category: "iPhone" | "AirPods" | "Accesorios" | "Apple Watch" | "iPad";
  storage?: string;
  color?: string;
  condition: "Nuevo" | "Reacondicionado";
  price: number;        // USD
  stock: number;
  available: boolean;
  highlight?: boolean;  // show as "destacado"
};

// Prices in USD (mercado argentino, febrero/abril 2026)
export const PRODUCTS: Product[] = [
  // iPhone 16
  { id: "ip16pm-256-tit", name: "iPhone 16 Pro Max", category: "iPhone", storage: "256GB", color: "Titanio Desierto", condition: "Nuevo", price: 1699, stock: 4, available: true, highlight: true },
  { id: "ip16pm-512-tit", name: "iPhone 16 Pro Max", category: "iPhone", storage: "512GB", color: "Titanio Negro", condition: "Nuevo", price: 1949, stock: 2, available: true },
  { id: "ip16p-128-tit",  name: "iPhone 16 Pro",     category: "iPhone", storage: "128GB", color: "Titanio Natural", condition: "Nuevo", price: 1349, stock: 5, available: true, highlight: true },
  { id: "ip16p-256-tit",  name: "iPhone 16 Pro",     category: "iPhone", storage: "256GB", color: "Titanio Blanco", condition: "Nuevo", price: 1499, stock: 3, available: true },
  { id: "ip16-128-ul",    name: "iPhone 16",         category: "iPhone", storage: "128GB", color: "Ultramar",    condition: "Nuevo", price: 1049, stock: 6, available: true, highlight: true },
  { id: "ip16-256-ne",    name: "iPhone 16",         category: "iPhone", storage: "256GB", color: "Negro",       condition: "Nuevo", price: 1199, stock: 4, available: true },
  { id: "ip16-128-ro",    name: "iPhone 16",         category: "iPhone", storage: "128GB", color: "Rosa",        condition: "Nuevo", price: 1049, stock: 2, available: true },

  // iPhone 15
  { id: "ip15pm-256-ti",  name: "iPhone 15 Pro Max", category: "iPhone", storage: "256GB", color: "Titanio Natural", condition: "Nuevo", price: 1499, stock: 3, available: true },
  { id: "ip15p-128-bl",   name: "iPhone 15 Pro",     category: "iPhone", storage: "128GB", color: "Titanio Azul",   condition: "Nuevo", price: 1199, stock: 4, available: true },
  { id: "ip15-128-ro",    name: "iPhone 15",         category: "iPhone", storage: "128GB", color: "Rosa",           condition: "Nuevo", price: 899,  stock: 7, available: true, highlight: true },
  { id: "ip15-256-ne",    name: "iPhone 15",         category: "iPhone", storage: "256GB", color: "Negro",          condition: "Nuevo", price: 1029, stock: 5, available: true },
  { id: "ip15p-256-rea",  name: "iPhone 15 Pro",     category: "iPhone", storage: "256GB", color: "Titanio Negro", condition: "Reacondicionado", price: 1049, stock: 2, available: true },

  // iPhone 14
  { id: "ip14pm-256-mo",  name: "iPhone 14 Pro Max", category: "iPhone", storage: "256GB", color: "Morado",      condition: "Nuevo", price: 1199, stock: 2, available: true },
  { id: "ip14p-128-ne",   name: "iPhone 14 Pro",     category: "iPhone", storage: "128GB", color: "Negro Espacial", condition: "Nuevo", price: 999,  stock: 3, available: true },
  { id: "ip14-128-bl",    name: "iPhone 14",         category: "iPhone", storage: "128GB", color: "Azul",        condition: "Nuevo", price: 749,  stock: 6, available: true },
  { id: "ip14-128-rea",   name: "iPhone 14",         category: "iPhone", storage: "128GB", color: "Medianoche",  condition: "Reacondicionado", price: 619, stock: 4, available: true },

  // iPhone 13
  { id: "ip13-128-bl",    name: "iPhone 13",         category: "iPhone", storage: "128GB", color: "Azul",        condition: "Nuevo", price: 649,  stock: 5, available: true },
  { id: "ip13-128-rea",   name: "iPhone 13",         category: "iPhone", storage: "128GB", color: "Medianoche",  condition: "Reacondicionado", price: 499, stock: 8, available: true },
  { id: "ip13mini-128-r", name: "iPhone 13 Mini",    category: "iPhone", storage: "128GB", color: "Rosa",        condition: "Reacondicionado", price: 459, stock: 2, available: true },

  // iPhone 12
  { id: "ip12-128-rea",   name: "iPhone 12",         category: "iPhone", storage: "128GB", color: "Blanco",      condition: "Reacondicionado", price: 399, stock: 4, available: true },
  { id: "ip12-64-rea",    name: "iPhone 12",         category: "iPhone", storage: "64GB",  color: "Negro",       condition: "Reacondicionado", price: 349, stock: 3, available: true },

  // AirPods
  { id: "ap-pro2",        name: "AirPods Pro 2 (USB-C)",   category: "AirPods", condition: "Nuevo", price: 249, stock: 8, available: true, highlight: true },
  { id: "ap-4-anc",       name: "AirPods 4 con ANC",       category: "AirPods", condition: "Nuevo", price: 179, stock: 6, available: true },
  { id: "ap-4",           name: "AirPods 4",               category: "AirPods", condition: "Nuevo", price: 129, stock: 10, available: true },
  { id: "ap-max",         name: "AirPods Max",             category: "AirPods", condition: "Nuevo", price: 549, stock: 2, available: true },

  // Apple Watch
  { id: "aw-s10-45",      name: "Apple Watch Series 10 45mm", category: "Apple Watch", condition: "Nuevo", price: 499, stock: 3, available: true },
  { id: "aw-s10-42",      name: "Apple Watch Series 10 42mm", category: "Apple Watch", condition: "Nuevo", price: 429, stock: 4, available: true },
  { id: "aw-se",          name: "Apple Watch SE (2ª gen)",    category: "Apple Watch", condition: "Nuevo", price: 279, stock: 5, available: true },

  // iPad
  { id: "ipad-air-m2",    name: "iPad Air 11\" M2",           category: "iPad", storage: "128GB", condition: "Nuevo", price: 649, stock: 3, available: true },
  { id: "ipad-10",        name: "iPad (10ª gen)",             category: "iPad", storage: "64GB",  condition: "Nuevo", price: 379, stock: 6, available: true },

  // Accesorios
  { id: "magsafe",        name: "Cargador MagSafe",           category: "Accesorios", condition: "Nuevo", price: 45, stock: 20, available: true },
  { id: "cable-usbc",     name: "Cable USB-C 1m Apple",       category: "Accesorios", condition: "Nuevo", price: 25, stock: 30, available: true },
  { id: "cargador-20w",   name: "Adaptador 20W USB-C",        category: "Accesorios", condition: "Nuevo", price: 29, stock: 25, available: true },
  { id: "funda-16p",      name: "Funda silicona iPhone 16 Pro",  category: "Accesorios", condition: "Nuevo", price: 55, stock: 18, available: true },
  { id: "funda-16",       name: "Funda silicona iPhone 16",   category: "Accesorios", condition: "Nuevo", price: 49, stock: 15, available: true },
  { id: "vidrio-16",      name: "Vidrio templado iPhone 16/15", category: "Accesorios", condition: "Nuevo", price: 18, stock: 40, available: true },
];

export const CATEGORIES: Product["category"][] = ["iPhone", "AirPods", "Apple Watch", "iPad", "Accesorios"];

export function findProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
