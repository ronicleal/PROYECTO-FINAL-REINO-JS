/*====IMPORTACION DE CLASES====*/
import { Jugador } from "./modules/jugadores.js";


/*====VARIABLES GLOBALES====*/
let jugador;
let enemigos = [];
let seleccionados = [];

/*====ESCENA 1: CREAR JUGADOR ====*/
function escena1() {
    const btnCrear = document.getElementById("crear-jugador");

    btnCrear.addEventListener("click", function() {
        const nombre = document.getElementById("nombre-jugador").value.trim();

        console.log(nombre);


    });
}

//Inicio del juego
escena1()