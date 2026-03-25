// ============================================
// PROYECTO SEMANA 04: Generador de Mensajes
// ============================================
// Dominio: Plataforma de Servicios de Traducción Profesional
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

const DOMAIN_NAME = "Plataforma de Servicios de Traducción Profesional";

// Nombre del servicio con espacios intencionales para aplicar trim()
const rawEntityName = "  Traducción Jurídica Certificada  ";

// Especialización del servicio
const entityCategory = "Traducción Legal - Español / Inglés";

// Código único del servicio
const entityCode = "TRD-045";

// Descripción del servicio con palabras clave del dominio
const entityDescription = "Servicio de traducción certificada para documentos legales, contratos y escrituras. Incluye certificación notarial y entrega en 48 horas.";

// Precio base por página en pesos colombianos
const mainValue = 120_000;

// ¿El servicio está activo actualmente?
const isActive = true;


// ============================================
// SECCIÓN 2: Transformaciones de string
// ============================================

// Limpiar espacios del nombre con trim()
const entityName = rawEntityName.trim();

// Nombre en mayúsculas para el encabezado
const entityNameUpper = entityName.toUpperCase();

// Nombre en minúsculas para referencias internas
const entityNameLower = entityName.toLowerCase();

// Extraer prefijo del código con slice() → "TRD"
const codePrefix = entityCode.slice(0, 3);


// ============================================
// SECCIÓN 3: Validaciones con búsqueda
// ============================================

// ¿El código empieza con el prefijo "TRD"?
const hasValidPrefix = entityCode.startsWith(codePrefix);

// ¿La descripción menciona la palabra "traducción"?
const descriptionIsRelevant = entityDescription.includes("traducción");

// ¿El código termina con "045"?
const hasValidSuffix = entityCode.endsWith("045");


// ============================================
// SECCIÓN 4: Generación de la ficha principal
// ============================================

const separator = "=".repeat(45);
const subSeparator = "-".repeat(45);

const mainCard = `
${separator}
  ${DOMAIN_NAME.toUpperCase()} — FICHA DE ENTIDAD
${separator}
Nombre:      ${entityNameUpper}
Categoría:   ${entityCategory}
Código:      ${entityCode}
Prefijo:     ${codePrefix}
Valor:       ${mainValue.toLocaleString("es-CO")} COP
Estado:      ${isActive ? "Activo" : "Inactivo"}

${subSeparator}
Descripción:
${entityDescription}
${separator}
`;

console.log(mainCard);


// ============================================
// SECCIÓN 5: Validaciones
// ============================================

console.log("--- Validaciones ---");
console.log(`¿Código empieza con '${codePrefix}'?:          ${hasValidPrefix}`);
console.log(`¿Descripción contiene 'traducción'?:          ${descriptionIsRelevant}`);
console.log(`¿Código termina con '045'?:                   ${hasValidSuffix}`);
console.log(`Nombre sin espacios (trim):                   "${entityName}"`);
console.log(`Nombre en minúsculas:                         ${entityNameLower}`);
console.log("");


// ============================================
// SECCIÓN 6: Mensaje de notificación corto
// ============================================

console.log("--- Notificación ---");
const notification = `📢 Nuevo servicio disponible: ${entityName} (${entityCode})`;
console.log(notification);
console.log("");