import { EUR } from "../utils/utils.js";

/**
 * Clase que representa un producto (ítem) que puede ser comprado en el mercado.
 * Contiene propiedades como nombre, precio, rareza, tipo de bonus y métodos para formateo y descuentos.
 * @module producto
 */
export class Producto {
    /**
     * Crea una nueva instancia de Producto.
     * @param {string} nombre - Nombre del producto.
     * @param {number} precio - Precio base del producto.
     * @param {string} rareza - Nivel de rareza (por ejemplo: "común", "raro", "épico").
     * @param {string} tipo - Tipo de producto (por ejemplo: "arma", "poción", "armadura"). 
     * @param {number} bonus - La cantidad (valor numérico) que aumenta.
     * @param {string} [imagen='./image/default.png'] - Ruta de la imagen del producto.
     */
    constructor(nombre, precio, rareza, tipo, bonus, imagen = "./image/default.png") {
        this.nombre = nombre;
        this.precio = precio;
        this.rareza = rareza;
        this.tipo = tipo;
        this.bonus = bonus;
        this.imagen = imagen;
    }

    

    /**
     *  Devuelve una representación en texto del producto.
     * @returns {string} Descripción del producto.
     */
    mostrarProducto() {
        // Usamos el 'tipo' para describir qué da el bonus.
        let efectoBonus = '';
        switch (this.tipo) {
            case 'Arma':
                efectoBonus = 'Ataque';
                break;
            case 'Armadura':
                efectoBonus = 'Defensa';
                break;
            case 'Consumible': // Asumiendo que el bonus para consumibles es "Curación/Vida"
                efectoBonus = 'Vida';
                break;
            default:
                efectoBonus = 'Efecto Desconocido';
        }

        // El bonus es ahora un valor numérico simple (this.bonus)
        return `${this.nombre} [${this.rareza}] (${this.tipo}) — ${EUR.format(this.precio)} — +${this.bonus} ${efectoBonus}`;
    }




    /**
     * Aplica un descuento al producto y devuelve una nueva instancia con el precio actualizado.
     * @param {number} porcentaje - Porcentaje de descuento (0–100).
     * @returns {Producto} Un nuevo producto con el precio reducido.
     */
    aplicarDescuento(porcentaje) {
        // Limita el porcentaje entre 0 y 100
        if (porcentaje < 0) porcentaje = 0;
        if (porcentaje > 100) porcentaje = 100;

        // Calcula el nuevo precio (Ejemplo: 200 * (1 - 0.25))
        const nuevoPrecio = Math.round(this.precio * (1 - porcentaje / 100));
        return new Producto(this.nombre, nuevoPrecio, this.rareza, this.tipo, this.bonus, this.imagen);
    }




}