// ============================================
// PAGINADOR CON GENERADORES - SEMANA 08
// Dominio: Plataforma de Servicios de Traducción Profesional
// ============================================

// ============================================
// GENERADOR DE DATOS
// ============================================

function* dataGenerator(total) {
  const categories = ["legal", "medica", "tecnica", "literaria"];
  const names = [
    "Traducción Jurídica Certificada",
    "Traducción de Contratos Mercantiles",
    "Traducción de Informes Médicos",
    "Traducción de Manuales Técnicos",
    "Traducción Literaria de Novela",
    "Traducción de Patentes Industriales",
    "Traducción de Historia Clínica",
    "Traducción de Guion Cinematográfico",
    "Traducción de Estatutos Empresariales",
    "Traducción de Artículos Científicos",
  ];

  for (let i = 1; i <= total; i++) {
    const category = categories[(i - 1) % categories.length];
    const baseName = names[(i - 1) % names.length];
    yield {
      id: `TRD-${String(i).padStart(3, "0")}`,
      title: `${baseName} #${i}`,
      description: `Servicio de categoría ${category} — precio base: ${(60_000 + i * 5_000).toLocaleString("es-CO")} COP por página.`,
    };
  }
}

// ============================================
// UTILIDADES DE GENERADORES
// ============================================

function* take(iterator, n) {
  let count = 0;
  for (const item of iterator) {
    if (count >= n) break;
    yield item;
    count++;
  }
}

function* skip(iterator, n) {
  let skipped = 0;
  for (const item of iterator) {
    if (skipped < n) {
      skipped++;
      continue;
    }
    yield item;
  }
}

// ============================================
// CLASE PAGINATOR
// ============================================

class Paginator {
  constructor(generatorFn, totalItems, itemsPerPage = 5) {
    this.generatorFn  = generatorFn;
    this.totalItems   = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPage  = 1;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get hasNext() {
    return this.currentPage < this.totalPages;
  }

  get hasPrevious() {
    return this.currentPage > 1;
  }

  getPageItems() {
    const generator   = this.generatorFn(this.totalItems);
    const toSkip      = (this.currentPage - 1) * this.itemsPerPage;
    const skipped     = skip(generator, toSkip);
    const pageItems   = take(skipped, this.itemsPerPage);
    return [...pageItems];
  }

  next() {
    if (this.hasNext) {
      this.currentPage++;
      return true;
    }
    return false;
  }

  previous() {
    if (this.hasPrevious) {
      this.currentPage--;
      return true;
    }
    return false;
  }

  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      return true;
    }
    return false;
  }

  first() {
    this.currentPage = 1;
  }

  last() {
    this.currentPage = this.totalPages;
  }

  setItemsPerPage(newItemsPerPage) {
    const firstVisible    = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.itemsPerPage     = newItemsPerPage;
    this.currentPage      = Math.ceil(firstVisible / newItemsPerPage);
  }

  getRange() {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end   = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return { start, end };
  }
}

// ============================================
// DEMO EN CONSOLA
// ============================================

console.log("=".repeat(55));
console.log("  PAGINADOR — TRADEXPRO SOLUTIONS");
console.log("=".repeat(55));

const TOTAL  = 23;
const PER_PAGE = 5;
const paginador = new Paginator(dataGenerator, TOTAL, PER_PAGE);

console.log(`\nTotal servicios: ${TOTAL} | Por página: ${PER_PAGE} | Total páginas: ${paginador.totalPages}\n`);

// Recorrer todas las páginas automáticamente
do {
  const { start, end } = paginador.getRange();
  console.log(`--- Página ${paginador.currentPage} / ${paginador.totalPages}  (servicios ${start}–${end}) ---`);

  const items = paginador.getPageItems();
  items.forEach(item => {
    console.log(`  [${item.id}] ${item.title}`);
    console.log(`         ${item.description}`);
  });

  console.log("");
} while (paginador.next());

// Demo de navegación
console.log("=".repeat(55));
console.log("  DEMO DE NAVEGACIÓN");
console.log("=".repeat(55));

paginador.first();
console.log(`\nIr a primera página → página ${paginador.currentPage}`);

paginador.last();
console.log(`Ir a última página  → página ${paginador.currentPage}`);

paginador.goToPage(3);
console.log(`Ir a página 3       → página ${paginador.currentPage}`);

paginador.next();
console.log(`Siguiente           → página ${paginador.currentPage}`);

paginador.previous();
console.log(`Anterior            → página ${paginador.currentPage}`);

paginador.setItemsPerPage(10);
console.log(`\nCambiar a 10 por página → página ${paginador.currentPage} / ${paginador.totalPages}`);

console.log("\n" + "=".repeat(55));
console.log("  FIN DEL REPORTE");
console.log("=".repeat(55));