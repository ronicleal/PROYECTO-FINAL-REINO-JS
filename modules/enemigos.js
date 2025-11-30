/**
 * Clase base que representa a un enemigo genérico en el juego.
 * Contiene las estadísticas básicas necesarias para la batalla.
 * @module enemigos
 */
export class Enemigo {
    tipo;
    nombre;
    avatar;
    ataque;
    vida;

    
   /**
     * Crea una nueva instancia de Enemigo.
     * @param {string} nombre - Nombre del enemigo.
     * @param {number} ataque - Nivel de ataque del enemigo.
     * @param {number} vida - Puntos de vida del enemigo.
     * @param {string} [avatar='./image/default-enemy.png'] - URL o ruta de la imagen del avatar.
     */
    constructor(nombre, ataque, vida, avatar = './image/default-enemy.png') {
        this.tipo = 'enemigo';
        this.nombre = nombre;
        this.avatar = avatar;
        this.ataque = ataque;
        this.vida = vida;
    }

    /**
     * Devuelve una presentación breve del enemigo.
     * @returns {string} Descripción formateada del enemigo (ej: "🗡️ Goblin (ATQ 5, HP 30)").
     */
    mostrarEnemigo() {
        return `🗡️ ${this.nombre} (ATQ ${this.ataque}, HP ${this.vida})`;
    }


}




/**
 * Clase que representa a un Jefe Final, que hereda de Enemigo.
 * Añade propiedades y lógica para calcular puntos extra al ser derrotado.
 * @augments Enemigo
 */
export class JefeFinal extends Enemigo {
    habilidadEspecial;
    multiplicador;

   /**
     * Crea una nueva instancia de JefeFinal.
     * @param {string} nombre - Nombre del jefe final.
     * @param {number} ataque - Nivel de ataque base del jefe.
     * @param {number} vida - Puntos de vida del jefe.
     * @param {string} habilidadEspecial - Nombre o descripción de su habilidad especial.
     * @param {number} [multiplicador=1.3] - Multiplicador aplicado a los puntos obtenidos (por defecto 1.3).
     * @param {string} [avatar] - URL o ruta de la imagen del avatar (heredado).
     */
    constructor(nombre, ataque, vida, habilidadEspecial, multiplicador = 1.3) {
        super(nombre, ataque, vida);
        this.tipo = 'jefe';
        this.habilidadEspecial = habilidadEspecial;
        this.multiplicador = multiplicador;
    }


    /**
     * Sobrescribe el método para devolver una presentación detallada del jefe final.
     * @returns {string} Descripción formateada del jefe final, incluyendo su habilidad especial.
     */
    mostrarEnemigo() {
        return `🐲 ${this.nombre} (ATQ ${this.ataque}, HP ${this.vida}) — Habilidad: ${this.habilidadEspecial}`;
    }
}

