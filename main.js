/*====IMPORTACION DE CLASES====*/
import { Jugador } from "./modules/jugadores.js";
import { showScene } from "./utils/utils.js";


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

        if(!nombre){
            alert("¡Debes introducir un nombre!")
        }

        //Crear jugador
        jugador = new Jugador(nombre);

        //Mostrar el nombre en el DOM
        document.getElementById("nombre-jugador-display").textContent = jugador.nombre;

        //Mostrar estado inicial del jugador en la misma escena
        const estadoDiv = document.getElementById("estado-jugador");

        estadoDiv.innerHTML = `
            <div class="stats-grid">
                <div class="stat-box">⚔️ Ataque: ${jugador.ataqueTotal}</div>
                <div class="stat-box">🛡️ Defensa: ${jugador.defensaTotal}</div>
                <div class="stat-box">❤️ Vida: ${jugador.vida} / ${jugador.vidaMax}</div>
                <div class="stat-box">⭐ Puntos: ${jugador.puntos}</div>
            </div>
        `;

        let btnContinuar = document.getElementById("continuar-mercado");
        if(!btnContinuar) {
            btnContinuar = document.createElement("button");
            btnContinuar.id = "continuar-mercado";
            btnContinuar.textContent = "➡️Continuar Mercado";
            estadoDiv.appendChild(btnContinuar);

            btnContinuar.addEventListener("click", () => {
                showScene("market");
                escena2();

            });
        }



    });
}


/*====ESCENA 2: MOSTRAR EL MERCADO DE PRODUCTOS ====*/
function escena2(){

}

//Inicio del juego
escena1()