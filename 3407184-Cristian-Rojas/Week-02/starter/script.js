// ============================================
// PROYECTO SEMANA 02: Ficha de Datos del Dominio
// ============================================
// Dominio: Plataforma de Servicios de Traducción Profesional
// ============================================

// ============================================
// SECCIÓN 1: DATOS PRINCIPALES
// ============================================

const DOMAIN_NAME = "Plataforma de Servicios de Traducción Profesional";

// Nombre del servicio de traducción ofrecido
const itemName = "Traducción Jurídica Certificada";

// Tipo de especialización del servicio
const itemCategory = "Traducción Legal - Español / Inglés";

// Precio base del servicio por página (en pesos colombianos)
const itemQuantity = 120_000;

// ¿El servicio está disponible actualmente?
const isItemAvailable = true;

// Traductor asignado al servicio (aún no asignado)
const assignedTranslator = null;


// ============================================
// SECCIÓN 2: MOSTRAR FICHA DE DATOS
// ============================================
console.log("===========================");
console.log(`FICHA DE DATOS: ${DOMAIN_NAME}`);
console.log("===========================");
console.log("");

console.log(`Nombre:        ${itemName}`);
console.log(`Categoría:     ${itemCategory}`);
console.log(`Precio/página: ${itemQuantity} COP`);
console.log(`Disponible:    ${isItemAvailable}`);
console.log("");


// ============================================
// SECCIÓN 3: VERIFICACIÓN DE TIPOS CON typeof
// ============================================
console.log("--- Tipos de datos ---");

console.log("typeof itemName:           ", typeof itemName);
console.log("typeof itemQuantity:       ", typeof itemQuantity);
console.log("typeof isItemAvailable:    ", typeof isItemAvailable);
console.log("");


// ============================================
// SECCIÓN 4: CONVERSIONES EXPLÍCITAS
// ============================================
console.log("--- Conversiones ---");

// a) Convertir el precio a String para mostrar con formato
const priceAsText = String(itemQuantity);
console.log("Precio como texto:         ", priceAsText);
console.log("typeof (convertido):       ", typeof priceAsText);

// b) Convertir disponibilidad a Number (true → 1, false → 0)
const availableAsNumber = Number(isItemAvailable);
console.log("Disponible como número:    ", availableAsNumber);
console.log("typeof (convertido):       ", typeof availableAsNumber);

// c) Verificar si el precio es evaluado como truthy
const priceAsBoolean = Boolean(itemQuantity);
console.log("¿Precio es truthy?:        ", priceAsBoolean);

console.log("");


// ============================================
// SECCIÓN 5: VALOR NULL
// ============================================
console.log("--- Valor nulo ---");

console.log("Traductor asignado:        ", assignedTranslator);
console.log("typeof null:               ", typeof assignedTranslator);  // "object" ← bug histórico de JS
console.log("¿Es null?:                 ", assignedTranslator === null); // true
console.log("");


// ============================================
// CIERRE
// ============================================
console.log("===========================");
console.log("FIN DE FICHA");
console.log("===========================");