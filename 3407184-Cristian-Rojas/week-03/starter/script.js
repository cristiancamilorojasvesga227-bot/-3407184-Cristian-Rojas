// ============================================
// PROYECTO SEMANA 03: Calculadora de Dominio
// ============================================
// Dominio: Plataforma de Servicios de Traducción Profesional
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

const PRICE_PER_PAGE       = 120_000;  // Precio base por página (COP)
const CERTIFIED_SURCHARGE  = 35_000;   // Recargo por certificación notarial
const EXPRESS_SURCHARGE    = 50_000;   // Recargo por servicio exprés (24h)
const MAX_PAGES_PER_ORDER  = 20;       // Límite de páginas por pedido estándar
const LOYALTY_DISCOUNT     = 0.15;     // Descuento para clientes frecuentes (15%)


// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones básicas ===");

const pages = 8;
const baseTotal = PRICE_PER_PAGE * pages;
console.log("Páginas del documento:       ", pages);
console.log("Subtotal base (8 páginas):   ", baseTotal, "COP");

const totalWithCertification = baseTotal + CERTIFIED_SURCHARGE;
console.log("Total con certificación:     ", totalWithCertification, "COP");

const totalExpress = totalWithCertification + EXPRESS_SURCHARGE;
console.log("Total servicio exprés:       ", totalExpress, "COP");

const remainingPages = MAX_PAGES_PER_ORDER - pages;
console.log("Páginas restantes del cupo:  ", remainingPages);

const pricePerWord = PRICE_PER_PAGE / 250;  // ~250 palabras por página
console.log("Precio estimado por palabra: ", pricePerWord, "COP");

const discount = totalWithCertification * LOYALTY_DISCOUNT;
console.log("Descuento fidelidad (15%):   ", discount, "COP");

console.log("");

// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Asignación compuesta ===");

let orderTotal = 0;
console.log("Total inicial:               ", orderTotal, "COP");

orderTotal += PRICE_PER_PAGE * pages;   // agregar costo de páginas
console.log("Tras agregar páginas:        ", orderTotal, "COP");

orderTotal += CERTIFIED_SURCHARGE;       // agregar certificación
console.log("Tras agregar certificación:  ", orderTotal, "COP");

orderTotal += EXPRESS_SURCHARGE;         // agregar servicio exprés
console.log("Tras agregar exprés:         ", orderTotal, "COP");

orderTotal *= (1 - LOYALTY_DISCOUNT);    // aplicar descuento del 15%
console.log("Tras descuento fidelidad:    ", orderTotal, "COP");

orderTotal -= 10_000;                    // cupón promocional fijo
console.log("Tras cupón promocional:      ", orderTotal, "COP");

console.log("");

// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones con === ===");

const requestedPages = 8;
const isMaxOrder = requestedPages === MAX_PAGES_PER_ORDER;
console.log("¿Pedido al máximo de páginas?", isMaxOrder);

const serviceType = "exprés";
const isExpressService = serviceType === "exprés";
console.log("¿Es servicio exprés?         ", isExpressService);

const isAffordable = orderTotal < 1_000_000;
console.log("¿Costo menor a 1.000.000?    ", isAffordable);

const isLargeOrder = requestedPages > 10;
console.log("¿Pedido grande (+10 páginas)?", isLargeOrder);

console.log("");

// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones lógicas ===");

const isLoyalClient = true;
const totalSpent = 850_000;

// Cliente fiel Y gasto mayor a 500.000 → descuento aplicable
const qualifiesForDiscount = isLoyalClient && totalSpent >= 500_000;
console.log("¿Aplica descuento fidelidad? ", qualifiesForDiscount);

// Servicio exprés O más de 5 páginas → requiere pago anticipado
const requiresAdvancePayment = isExpressService || requestedPages > 5;
console.log("¿Requiere pago anticipado?   ", requiresAdvancePayment);

// ¿NO es servicio estándar?
const isNotStandard = !( serviceType === "estándar" );
console.log("¿No es servicio estándar?    ", isNotStandard);

// Cliente fiel Y (exprés O pedido grande)
const priorityOrder = isLoyalClient && (isExpressService || isLargeOrder);
console.log("¿Pedido prioritario?         ", priorityOrder);

console.log("");

// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen ===");

console.log("Dominio:                     Plataforma de Traducción Profesional");
console.log("Servicio:                    Traducción Jurídica Certificada - Exprés");
console.log("Páginas traducidas:          ", requestedPages);
console.log("Total final del pedido:      ", orderTotal.toFixed(0), "COP");
console.log("¿Descuento aplicado?         ", qualifiesForDiscount);
console.log("¿Pago anticipado requerido?  ", requiresAdvancePayment);

console.log("");