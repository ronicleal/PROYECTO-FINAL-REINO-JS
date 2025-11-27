import { Producto } from "./producto.js";

/**
 * @fileoverview Módulo que gestiona el listado predefinido de productos y las funciones del Mercado.
 * @module mercado
 * @constant {Array<Producto>} mercado - Listado predefinido de productos disponibles en el juego.
 */
export const mercado = [
    new Producto('Espada corta', 120, 'común', 'Arma', 8),
    new Producto('Arco de caza', 140, 'común', 'Arma', 7),
    new Producto('Armadura de cuero', 180, 'común', 'Armadura', 6),
    new Producto('Poción pequeña', 40, 'común', 'Consumible', 20),
    new Producto('Espada rúnica', 460, 'raro', 'Arma', 18),
    new Producto('Escudo de roble', 320, 'raro', 'Armadura', 14),
    new Producto('Poción grande', 110, 'raro', 'Consumible', 60),
    new Producto('Mandoble épico', 950, 'épico', 'Arma', 32),
    new Producto('Placas dracónicas', 880, 'épico', 'Armadura', 28),
    new Producto('Elixir legendario', 520, 'épico', 'Consumible', 150),
];

/**
 * Obtiene un listado de todas las categorías de rareza únicas presentes en el mercado.
 * @function obtenerTodasLasRarezas
 * @returns {Array<string>} Un array de strings conteniendo todas las rarezas únicas (ej: ['común', 'raro', 'épico']).
 */
export function obtenerTodasLasRarezas() {
    // Obtiene una lista única de todas las rarezas presentes en el mercado
    return [...new Set(mercado.map(p => p.rareza))];
}


/**
 * Filtra el listado de productos del mercado según su rareza.
 * @function filtrarPorRareza
 * @param {string} rareza - La rareza por la cual se desea filtrar (ej: 'raro', 'común').
 * @returns {Array<Producto>} Un nuevo array con los productos que coinciden con la rareza especificada.
 */
export function filtrarPorRareza(rareza) {
  return mercado.filter(producto => producto.rareza === rareza);
}


/**
 * Aplica un descuento porcentual a todos los productos que coincidan con la rareza especificada.
 * Devuelve una nueva lista sin modificar los productos originales que no apliquen.
 * @function aplicarDescuentoPorRareza
 * @param {string} rareza - La rareza de los productos a los que se aplicará el descuento.
 * @param {number} porcentaje - El porcentaje de descuento a aplicar (0-100).
 * @returns {Array<Producto>} Un nuevo array de productos con los precios actualizados donde corresponda.
 */
export function aplicarDescuentoPorRareza(rareza, porcentaje) {
  return mercado.map(producto =>
    producto.rareza === rareza ? producto.aplicarDescuento(porcentaje) : producto
  );
}


/**
 * Busca un producto en el listado del mercado por su nombre, ignorando mayúsculas y minúsculas.
 * @function buscarProducto
 * @param {string} nombre - El nombre del producto a buscar.
 * @returns {Producto|null} El objeto Producto encontrado o null si no se encuentra ninguno.
 */
export function buscarProducto(nombre) {
  return mercado.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase()) || null;
}

