import { groupBy } from "../utils/utils.js";

/**
 * @fileoverview Módulo que gestiona la simulación del combate y el cálculo de la puntuación final/ranking.
 * @module ranking
 */


/**
 * Simula una batalla por turnos entre un jugador y un enemigo.
 * Aplica la fórmula literal de defensa del jugador: Vida = (Vida actual + Defensa) - Ataque Enemigo.
 * Si el jugador gana, calcula y añade los puntos obtenidos (incluyendo el multiplicador si es un Jefe).
 * @function batalla
 * @param {Jugador} jugador - La instancia del Jugador participante, cuya vida y puntos serán modificados.
 * @param {Enemigo} enemigo - La instancia del Enemigo a combatir.
 * @returns {{ganador: string, puntosGanados: number}} Objeto con el nombre del ganador y la cantidad de puntos ganados por el jugador (0 si pierde).
 */
export function batalla(jugador, enemigo) {
    //=== Copiamos las vidas actuales (sin modificarlas directamente)===
    let vidaJugador = jugador.vida;
    let vidaEnemigo = enemigo.vida;

    const ataqueJugadorTotal = jugador.ataqueTotal;
    const ataqueEnemigo = enemigo.ataque;

    //==== Los dos se atacan hasta que uno se quede sin vida =====
    while (vidaJugador > 0 && vidaEnemigo > 0) {
        // Turno 1: Jugador ataca
        vidaEnemigo -= ataqueJugadorTotal;

        if (vidaEnemigo <= 0) break;

        // Turno 2: Enemigo ataca
        // Vida del jugador = (vida actual + defensa) - ataque enemigo
        const vidaProxima = vidaJugador + jugador.defensaTotal - ataqueEnemigo;

        // Asegurar que la vida no baje de cero
        if (vidaProxima < 0) {
            vidaJugador = 0;
        } else {
            vidaJugador = vidaProxima;
        }
    }

    //====Comprobar si el jugador ganó======
    const ganoJugador = vidaJugador > 0 && vidaEnemigo <= 0;
    let puntosGanados = 0;


    if (ganoJugador) {
        // Calcula puntos según el poder del enemigo
        const base = 100 + enemigo.ataque; // 100 puntos base + ataque del enemigo

        // Si era un jefe, los puntos tendrán bonificación
        let multiplicador = 1;

        if (enemigo.tipo === 'jefe') {
            // Usa el multiplicador del jefe, o 1.5 si no está definido (valor por defecto)
            multiplicador = enemigo.multiplicador ?? 1.5;
        }

        puntosGanados = Math.round(base * multiplicador);
        jugador.ganarPuntos(puntosGanados);
    }

    // Actualiza la vida final del jugador
    jugador.vida = vidaJugador;

    return {
        ganador: ganoJugador ? jugador.nombre : enemigo.nombre,
        puntosGanados,
    };

}



/**
 * Agrupa la lista de jugadores según su puntuación final para determinar su nivel.
 * Si la puntuación es igual o superior al umbral, el jugador es 'Veterano'; de lo contrario, es 'Novato'.
 * @function agruparPorNivel
 * @param {Array<Jugador>} jugadores - Lista de todos los jugadores al final de la partida.
 * @param {number} [umbral=300] - Puntos mínimos requeridos para ser clasificado como 'Veterano'.
 * @returns {Object<string, Array<Jugador>>} Un objeto donde las claves son 'Veterano' o 'Novato', conteniendo listas de jugadores.
 */
export function agruparPorNivel(jugadores, umbral = 300){
    return groupBy(jugadores, jugador => (jugador.puntos >= umbral ? 'Veterano' : 'Novato'));
}

