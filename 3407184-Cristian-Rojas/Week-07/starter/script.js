// ============================================
// PROYECTO: Sistema de Gestión de Usuarios
// Semana 07: Sets y Maps
// Dominio: Plataforma de Servicios de Traducción Profesional
// ============================================

// ============================================
// ALMACENAMIENTO DE DATOS
// ============================================

const users = new Map();
const registeredEmails = new Set();
const userRoles = new Map();
const privateData = new WeakMap();
const activeSessions = new WeakSet();
const activeSessionIds = new Set();
const AVAILABLE_ROLES = new Set(['admin', 'editor', 'viewer']);

// ============================================
// UTILIDADES
// ============================================

const generateId = () => {
  return 'user_' + Math.random().toString(36).substr(2, 9);
};

const hashPassword = password => {
  // Hash simple en base64 para propósitos educativos
  return Buffer.from(password).toString('base64');
};

const logToConsole = (message, type = 'info') => {
  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
  console.log(`${icons[type] ?? 'ℹ️'} [${type.toUpperCase()}] ${message}`);
};

// ============================================
// GESTIÓN DE USUARIOS
// ============================================

const registerUser = (name, email, password) => {
  // 1. Verificar que el email no esté registrado
  if (registeredEmails.has(email)) return null;

  // 2. Crear objeto usuario
  const id = generateId();
  const user = { id, name, email, createdAt: new Date().toISOString() };

  // 3. Agregar email al Set
  registeredEmails.add(email);

  // 4. Guardar usuario en el Map
  users.set(id, user);

  // 5. Guardar contraseña hasheada en WeakMap
  privateData.set(user, { passwordHash: hashPassword(password) });

  // 6. Inicializar roles vacíos
  userRoles.set(id, new Set());

  // 7. Retornar usuario creado
  return user;
};

const getUserById = userId => {
  return users.get(userId);
};

const getAllUsers = () => {
  return [...users.values()];
};

const deleteUser = userId => {
  const user = getUserById(userId);
  if (!user) return false;

  // 1. Eliminar email del Set
  registeredEmails.delete(user.email);

  // 2. Eliminar roles
  userRoles.delete(userId);

  // 3. Cerrar sesión si está activa
  if (activeSessions.has(user)) {
    activeSessions.delete(user);
    activeSessionIds.delete(userId);
  }

  // 4. Eliminar del Map
  users.delete(userId);

  return true;
};

// ============================================
// GESTIÓN DE ROLES
// ============================================

const assignRoles = (userId, roles) => {
  // 1. Verificar que el usuario existe
  const user = getUserById(userId);
  if (!user) return false;

  // 2. Filtrar solo roles válidos
  const validRoles = roles.filter(role => AVAILABLE_ROLES.has(role));
  if (validRoles.length === 0) return false;

  // 3. Crear o actualizar el Set de roles
  const currentRoles = userRoles.get(userId) ?? new Set();
  validRoles.forEach(role => currentRoles.add(role));
  userRoles.set(userId, currentRoles);

  return true;
};

const getUserRoles = userId => {
  return userRoles.get(userId) ?? new Set();
};

const hasRole = (userId, role) => {
  return getUserRoles(userId).has(role);
};

// ============================================
// OPERACIONES DE CONJUNTOS
// ============================================

const getUsersByRole = role => {
  return getAllUsers().filter(user => hasRole(user.id, role));
};

const getUsersWithAllRoles = roles => {
  return getAllUsers().filter(user =>
    roles.every(role => hasRole(user.id, role))
  );
};

const getUsersWithAnyRole = roles => {
  return getAllUsers().filter(user =>
    roles.some(role => hasRole(user.id, role))
  );
};

const getUsersWithoutRoles = () => {
  return getAllUsers().filter(user => getUserRoles(user.id).size === 0);
};

// ============================================
// GESTIÓN DE SESIONES
// ============================================

const login = userId => {
  const user = getUserById(userId);
  if (!user) return false;

  // Verificar que no tenga sesión activa
  if (activeSessions.has(user)) return false;

  activeSessions.add(user);
  activeSessionIds.add(userId);

  return true;
};

const logout = userId => {
  const user = getUserById(userId);
  if (!user) return false;

  if (!activeSessions.has(user)) return false;

  activeSessions.delete(user);
  activeSessionIds.delete(userId);

  return true;
};

const isLoggedIn = userId => {
  const user = getUserById(userId);
  if (!user) return false;
  return activeSessions.has(user);
};

const getActiveSessionCount = () => {
  return activeSessionIds.size;
};

// ============================================
// DEMO: Simulación del sistema de traducción
// ============================================

console.log("=".repeat(50));
console.log("  SISTEMA DE GESTIÓN — TRADEXPRO SOLUTIONS");
console.log("=".repeat(50));
console.log("");

// --- Registro de usuarios ---
console.log("--- Registrando usuarios ---");

const u1 = registerUser("Cristian Rojas",    "cristian@tradexpro.co",  "pass123");
const u2 = registerUser("Maday Espinosa",    "maday@tradexpro.co",     "pass456");
const u3 = registerUser("Samuel Bernal",     "samuel@tradexpro.co",    "pass789");
const u4 = registerUser("Alejandro Matoma",  "alejandro@tradexpro.co", "pass000");
const u5 = registerUser("Sebastian Gonzales","sebastian@tradexpro.co", "pass111");

// Intento de email duplicado
const dupUser = registerUser("Intruso", "cristian@tradexpro.co", "hack");

logToConsole(`Usuario registrado: ${u1.name} (${u1.id})`, "success");
logToConsole(`Usuario registrado: ${u2.name} (${u2.id})`, "success");
logToConsole(`Usuario registrado: ${u3.name} (${u3.id})`, "success");
logToConsole(`Usuario registrado: ${u4.name} (${u4.id})`, "success");
logToConsole(`Usuario registrado: ${u5.name} (${u5.id})`, "success");
logToConsole(`Email duplicado rechazado: ${dupUser === null}`, "warning");

console.log("");

// --- Asignación de roles ---
console.log("--- Asignando roles ---");

assignRoles(u1.id, ["admin", "editor"]);
assignRoles(u2.id, ["editor"]);
assignRoles(u3.id, ["viewer"]);
assignRoles(u4.id, ["admin", "viewer"]);
// u5 queda sin roles

logToConsole(`Roles de ${u1.name}: ${[...getUserRoles(u1.id)].join(", ")}`, "info");
logToConsole(`Roles de ${u2.name}: ${[...getUserRoles(u2.id)].join(", ")}`, "info");
logToConsole(`Roles de ${u3.name}: ${[...getUserRoles(u3.id)].join(", ")}`, "info");
logToConsole(`Roles de ${u4.name}: ${[...getUserRoles(u4.id)].join(", ")}`, "info");
logToConsole(`Roles de ${u5.name}: (sin roles)`, "warning");

console.log("");

// --- Operaciones de conjuntos ---
console.log("--- Operaciones de conjuntos ---");

const admins       = getUsersByRole("admin");
const editors      = getUsersByRole("editor");
const adminAndEditor = getUsersWithAllRoles(["admin", "editor"]);
const adminOrEditor  = getUsersWithAnyRole(["admin", "editor"]);
const sinRoles       = getUsersWithoutRoles();

logToConsole(`Admins (${admins.length}): ${admins.map(u => u.name).join(", ")}`, "info");
logToConsole(`Editors (${editors.length}): ${editors.map(u => u.name).join(", ")}`, "info");
logToConsole(`Admin Y Editor (${adminAndEditor.length}): ${adminAndEditor.map(u => u.name).join(", ")}`, "info");
logToConsole(`Admin O Editor (${adminOrEditor.length}): ${adminOrEditor.map(u => u.name).join(", ")}`, "info");
logToConsole(`Sin roles (${sinRoles.length}): ${sinRoles.map(u => u.name).join(", ")}`, "warning");

console.log("");

// --- Sesiones ---
console.log("--- Gestión de sesiones ---");

login(u1.id);
login(u2.id);
login(u3.id);

logToConsole(`Sesiones activas: ${getActiveSessionCount()}`, "info");
logToConsole(`¿${u1.name} en línea?: ${isLoggedIn(u1.id)}`, "info");
logToConsole(`¿${u4.name} en línea?: ${isLoggedIn(u4.id)}`, "info");

logout(u2.id);
logToConsole(`${u2.name} cerró sesión`, "success");
logToConsole(`Sesiones activas tras logout: ${getActiveSessionCount()}`, "info");

console.log("");

// --- Eliminación de usuario ---
console.log("--- Eliminación de usuario ---");

const eliminado = deleteUser(u5.id);
logToConsole(`Usuario ${u5.name} eliminado: ${eliminado}`, "success");
logToConsole(`Total usuarios restantes: ${getAllUsers().length}`, "info");

console.log("");
console.log("=".repeat(50));
console.log("  FIN DEL REPORTE");
console.log("=".repeat(50));