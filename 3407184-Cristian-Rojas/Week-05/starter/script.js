// ============================================
// PROYECTO SEMANA 05: Clasificador
// Condicionales — if/else, ternario, switch, ??, ?.
// ============================================
// Dominio: Plataforma de Servicios de Traducción Profesional
// ============================================

// ============================================
// SECCIÓN 1: Datos del elemento de tu dominio
// ============================================

const elementName = "Traducción Jurídica Certificada";   // Nombre del servicio
const elementStatus = "active";                           // Estado actual del servicio
const elementValue = 78;                                  // Porcentaje de ocupación del traductor asignado
const elementType = "legal";                              // Tipo de traducción
const elementInfo = {                                     // Información adicional del servicio
  detail: "Incluye apostilla y entrega en 48 horas",
  turnaround: "48h",
  certifiedBy: "Notaría 23 de Bogotá"
};

// ============================================
// SECCIÓN 2: Clasificación con if / else if / else
// ============================================

// Clasifica el nivel de carga del traductor según el porcentaje de ocupación
let classification;
if (elementValue >= 90) {
  classification = "Capacidad crítica — sin nuevos pedidos";
} else if (elementValue >= 70) {
  classification = "Alta demanda — pedidos con reserva previa";
} else if (elementValue >= 40) {
  classification = "Demanda moderada — disponible";
} else {
  classification = "Baja demanda — alta disponibilidad";
}

// ============================================
// SECCIÓN 3: Estado binario con operador ternario
// ============================================

// Determina si el servicio está activo o inactivo
const statusLabel = elementStatus === "active" ? "Activo" : "Inactivo";

// ============================================
// SECCIÓN 4: Tipo con switch
// ============================================

// Asigna una etiqueta según el tipo de traducción
let typeLabel;
switch (elementType) {
  case "legal":
    typeLabel = "Traducción Legal y Jurídica";
    break;
  case "medica":
    typeLabel = "Traducción Médica y Farmacéutica";
    break;
  case "tecnica":
    typeLabel = "Traducción Técnica e Industrial";
    break;
  case "literaria":
    typeLabel = "Traducción Literaria y Editorial";
    break;
  default:
    typeLabel = "Tipo desconocido";
}

// ============================================
// SECCIÓN 5: Valor por defecto con ??
// ============================================

// Si el nombre es null o undefined, muestra "Sin nombre"
const displayName = elementName ?? "Sin nombre";

// Si el objeto no tiene detalle, muestra mensaje por defecto
const infoDetail = elementInfo?.detail ?? "Sin información adicional";

// ============================================
// SECCIÓN 6: Acceso seguro con ?.
// ============================================

// Accede de forma segura al tiempo de entrega del servicio
const safeProperty = elementInfo?.turnaround ?? "Tiempo de entrega no especificado";

// ============================================
// SECCIÓN 7: Ficha de salida
// ============================================

console.log("=".repeat(40));
console.log("   FICHA DE CLASIFICACIÓN");
console.log("=".repeat(40));
console.log(`Nombre:               ${displayName}`);
console.log(`Estado:               ${statusLabel}`);
console.log(`Tipo:                 ${typeLabel}`);
console.log(`Ocupación:            ${elementValue}%`);
console.log(`Clasificación:        ${classification}`);
console.log(`Detalle:              ${infoDetail}`);
console.log(`Tiempo de entrega:    ${safeProperty}`);
console.log("=".repeat(40));