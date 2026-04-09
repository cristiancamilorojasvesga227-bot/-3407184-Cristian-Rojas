// ============================================
// PROYECTO SEMANA 06: Reporte con Bucles
// Dominio: Plataforma de Servicios de Traducción Profesional
// ============================================
 
// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================
 
const services = [
  { name: "Traducción Jurídica Certificada",   category: "legal",      value: 120_000 },
  { name: "Traducción de Contratos Mercantiles", category: "legal",    value: 95_000  },
  { name: "Traducción de Informes Médicos",     category: "medica",    value: 85_000  },
  { name: "Traducción de Manuales Técnicos",    category: "tecnica",   value: 75_000  },
  { name: "Traducción Literaria de Novela",     category: "literaria", value: 60_000  },
  { name: "Traducción de Patentes Industriales",category: "tecnica",   value: 110_000 },
  { name: "Traducción de Historia Clínica",     category: "medica",    value: 90_000  },
  { name: "Traducción de Guion Cinematográfico",category: "literaria", value: 70_000  },
];
 
const categories = ["legal", "medica", "tecnica", "literaria"];
 
// Nombre descriptivo del valor numérico
const valueLabel = "precio por página (COP)";
 
 
// ============================================
// SECCIÓN 2: Listado completo con for...of
// ============================================
console.log("=== LISTADO COMPLETO ===");
 
let lineNumber = 0;
 
for (const item of services) {
  lineNumber++;
  console.log(`${lineNumber}. ${item.name} — ${item.category} — ${valueLabel}: ${item.value.toLocaleString("es-CO")}`);
}
 
console.log("");
 
// ============================================
// SECCIÓN 3: Contadores por categoría
// ============================================
console.log("=== CONTEO POR CATEGORÍA ===");
 
for (const category of categories) {
  let count = 0;
 
  for (const item of services) {
    if (item.category === category) count++;
  }
 
  console.log(`${category}: ${count} elemento(s)`);
}
 
console.log("");
 
// ============================================
// SECCIÓN 4: Totales y promedio (acumulador)
// ============================================
console.log("=== ESTADÍSTICAS ===");
 
let totalValue = 0;
 
for (const item of services) {
  totalValue += item.value;
}
 
const averageValue = services.length > 0 ? totalValue / services.length : 0;
 
console.log(`Total ${valueLabel}: ${totalValue.toLocaleString("es-CO")}`);
console.log(`Promedio ${valueLabel}: ${averageValue.toFixed(1)}`);
 
console.log("");
 
// ============================================
// SECCIÓN 5: Máximo y mínimo
// ============================================
console.log("=== MÁXIMO Y MÍNIMO ===");
 
let maxItem = services[0] ?? null;
let minItem = services[0] ?? null;
 
if (services.length > 0) {
  for (const item of services) {
    if (item.value > maxItem.value) maxItem = item;
    if (item.value < minItem.value) minItem = item;
  }
 
  console.log(`Mayor ${valueLabel}: ${maxItem?.name} (${maxItem?.value.toLocaleString("es-CO")})`);
  console.log(`Menor ${valueLabel}: ${minItem?.name} (${minItem?.value.toLocaleString("es-CO")})`);
}
 
console.log("");
 
// ============================================
// SECCIÓN 6: Reporte numerado con for clásico
// ============================================
console.log("=== REPORTE DETALLADO ===");
 
for (let i = 0; i < services.length; i++) {
  const item = services[i];
 
  const comparison = item.value >= averageValue ? "sobre el promedio" : "bajo el promedio";
 
  console.log(`${i + 1}. ${item.name} (${item.value.toLocaleString("es-CO")} COP) — ${comparison}`);
}
 
console.log("");
console.log("=== FIN DEL REPORTE ===");