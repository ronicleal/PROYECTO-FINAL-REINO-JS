/*====IMPORTACION DE CLASES====*/
import { Jugador } from "./modules/jugadores.js";
import { showScene } from "./utils/utils.js";
import { obtenerTodasLasRarezas, aplicarDescuentoPorRareza } from "./modules/mercado.js";
import { Producto } from "./modules/producto.js";

/*====VARIABLES GLOBALES====*/
let jugador;
let enemigos = [];
let seleccionados = [];


/**
 * Inicializa la Escena 1 (Creación y Estado Inicial del Jugador).
 * Configura el evento click para crear la instancia del Jugador y mostrar sus estadísticas iniciales.
 * @function escena1
 */
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

        // Genera la estructura HTML de la tarjeta de estadísticas.
        estadoDiv.innerHTML = `
            <div class="stats-grid">
                <div class="stat-box">⚔️ Ataque: ${jugador.ataqueTotal}</div>
                <div class="stat-box">🛡️ Defensa: ${jugador.defensaTotal}</div>
                <div class="stat-box">❤️ Vida: ${jugador.vida} / ${jugador.vidaMax}</div>
                <div class="stat-box">⭐ Puntos: ${jugador.puntos}</div>
            </div>
        `;

        let btnContinuar = document.getElementById("continuar-mercado");
        // Verifica si el botón de continuar ya existe para no crearlo múltiples veces
        if(!btnContinuar) {
            btnContinuar = document.createElement("button");
            btnContinuar.id = "continuar-mercado";
            btnContinuar.textContent = "➡️Continuar Mercado";
            estadoDiv.appendChild(btnContinuar);

            // Configura el evento para avanzar a la Escena 2 (Mercado)
            btnContinuar.addEventListener("click", () => {
                showScene("market");
                escena2();

            });
        }



    });
}





/**
 * Inicializa y muestra la Escena 2 (Mercado de Productos).
 * Genera un descuento aleatorio aplicable a una rareza específica,
 * muestra las tarjetas de productos, gestiona la selección de la cesta
 * mediante eventos click, y finaliza la compra para avanzar a la Escena 3.
 * @function escena2
 */
function escena2(){
    seleccionados = [];//Lista de productos seleccionados
    const container = document.getElementById("market-container");
    container.innerHTML = "";

    //=== Lógica del descuento ===
    
    // 1. Obtener todas las rarezas únicas
    const todasLasRarezas = obtenerTodasLasRarezas();
    // 2. Elegir una rareza aleatoria a la que aplicar el descuento
    const rarezaDescontada = todasLasRarezas[Math.floor(Math.random() * todasLasRarezas.length)];
    // 3. Generar un descuento aleatorio de 0 al 30%
    const descuentoAleatorio = Math.floor(Math.random() * 31 );
    // 4. Aplicar el descuento solo a los productos de esa rareza
    const mercadoDescontado = aplicarDescuentoPorRareza(rarezaDescontada, descuentoAleatorio);

    // 1. Contenedor de notificacion del descuento en los productos
    let notifArea = document.getElementById("notificacion-mercado");
    if(!notifArea){
        notifArea = document.createElement("div");
        notifArea.id = "notificacion-mercado";
        //Insertar la notificacion antes del contendor de productos
        container.parentNode.insertBefore(notifArea, container);
    }
    notifArea.innerHTML = ""; //Limpiar notificaciones anteriores

    // 2. Crear el elemento de notificacion
    const notificacionDescuento = document.createElement("p");
    notificacionDescuento.classList.add("descuento-notificacion");
    //Estilos del texto
    notificacionDescuento.style.textAlign = "center";
    notificacionDescuento.style.fontSize = "1.2em";
    notificacionDescuento.style.color = "red";
    notificacionDescuento.style.padding = "10px";
    notificacionDescuento.style.backgroundColor = "yellow";

    // 3. Asignar el contenido dinámico
    notificacionDescuento.textContent = `🚨 ¡OFERTA! Descuento del 📢${descuentoAleatorio}%🎉 aplicado a ítems de rareza: ${rarezaDescontada.toUpperCase()} 🚨`;

    // 4. Insertar la notificación a su nuevo contenedor
    notifArea.appendChild(notificacionDescuento);
    console.log(`¡Descuento aplicado del ${descuentoAleatorio}% a la rareza: ${rarezaDescontada}!`);

    //=== Mostrar productos en tarjetas ===

    mercadoDescontado.forEach(producto =>{
        const card = document.createElement("div");
        card.classList.add("card-producto");

        const img = document.createElement("img");
        img.src = obtenerImagen(producto.nombre);
        img.alt = producto.nombre;

        const texto = document.createElement("p");
        texto.textContent = producto.mostrarProducto();

        //Botón añadir o quitar de la cesta
        const btnAñadir = document.createElement("button");
        btnAñadir.textContent = "Añadir";
        btnAñadir.style.marginTop = "5px";

        btnAñadir.addEventListener("click", () => {
            if(!seleccionados.includes(producto)){
                //Añadir a la cesta
                seleccionados.push(producto);
                card.classList.add("selected");
                btnAñadir.textContent = "Retirar";
            }else{
                //Quitar de la cesta
                seleccionados = seleccionados.filter(p => p !== producto);
                card.classList.add("selected");
                btnAñadir.textContent = "Añadir";
            }

            mostrarSeleccionados();
        });

        card.appendChild(img);
        card.appendChild(texto);
        card.appendChild(btnAñadir);
        container.appendChild(card);
    });


    // ==== FOOTER DONDE APARECEN LOS PRODUCTOS COMPRADOS ====
    const footer = document.getElementById("inventory-container");
    footer.innerHTML = "";

    // Contenedor para productos seleccionados
    const seleccionadosDiv = document.createElement("div");
    seleccionadosDiv.id = "seleccionados-div";
    footer.appendChild(seleccionadosDiv);

    //Boton comprar
    const btnComprar = document.createElement("button");
    btnComprar.id = "btn-comprar";
    btnComprar.textContent = "🛒Confirmar compra";
    btnComprar.style.display = "block";
    btnComprar.style.margin = "10px";
    container.appendChild(btnComprar);

    btnComprar.addEventListener("click", () => {
        if(seleccionados.length === 0){
            alert("¡No has seleccionado ningún producto!");
            return;
        }

        //Agregamos los productos seleccionados por el jugador
        seleccionados.forEach(item => jugador.añadirItem(item));

        //Limpiar selección visual
        document.querySelectorAll(".card-producto.selected").forEach(c => c.classList.remove("selected"));
        seleccionados = [];
        mostrarSeleccionados();

        //Pasar a la siguiente escena después de comprar
        showScene("enemies");
        escena3();
        
    });

    
    /**
     * Muestra las miniaturas de los productos seleccionados actualmente en el footer (cesta).
     * @function mostrarSeleccionados
     */
    function mostrarSeleccionados(){
        seleccionadosDiv.innerHTML = "";

        seleccionados.forEach(p => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("item");

            const img = document.createElement("img");
            img.src = obtenerImagen(p.nombre);
            img.alt = p.nombre;
            img.style.width = "60px"; // tamaño de miniatura

            itemDiv.appendChild(img);
            seleccionadosDiv.appendChild(itemDiv);

        });
    }
}





/**
 * Inicializa y muestra la Escena 3 (Estado Actual del Jugador).
 * Recalcula las estadísticas del jugador con los ítems comprados
 * y muestra el estado final (Ataque, Defensa, Vida) junto con el inventario visual.
 * Configura el botón para avanzar a la Escena 4 (Enemigos).
 * @function escena3
 */
function escena3(){
    const cont = document.getElementById("enemies-container");
    cont.innerHTML = "";

    //Vida máxima y actual del jugador con los bonus de consumibles
    // Se actualizan las propiedades del jugador para reflejar los ítems comprados.
    jugador.vidaMax = jugador.vidaTotal;
    jugador.vida = jugador.vidaMax;

    //Limpiar el footer para que no quede el botón de compra
    const footer = document.getElementById("inventory-container");
    footer.innerHTML = "";

    //Titulo del estado actual
    const titulo = document.createElement("h2");
    titulo.textContent = "Estado actual del jugador";
    cont.appendChild(titulo);

    //Contenedor del estado actual
    const estadoActual = document.createElement("div");
    estadoActual.classList.add("player-estado");

    // Estructura de la tarjeta de estadísticas
    estadoActual.innerHTML= `
    <br>
    <p><strong>Nombre:</strong> ${jugador.nombre}</p>
    <br>
    <div class="stats-grid"> 
                <div class="stat-box">⚔️ Ataque: ${jugador.ataqueTotal}</div>
                <div class="stat-box">🛡️ Defensa: ${jugador.defensaTotal}</div>
                <div class="stat-box">❤️ Vida: ${jugador.vida} / ${jugador.vidaMax}</div>
                <div class="stat-box">⭐ Inventario: ${jugador.inventario.length}</div>
    </div>
    `;

    cont.appendChild(estadoActual);

    //=== Mostrar objetos del inventario ===
    const inventarioDiv = document.createElement("div");
    inventarioDiv.classList.add("inventario-objetos");

    jugador.inventario.forEach(obj => {
        const caja = document.createElement("div");
        caja.classList.add("item");

        const img = document.createElement("img");
        img.src = obtenerImagen(obj.nombre);
        img.alt = obj.nombre;

        //Usar el tipo y el bonus numérico para el tooltip (etiqueta 'title')
        let bonusText = '';
        if (obj.tipo === 'Arma') bonusText = `Ataque +${obj.bonus}`;
        else if (obj.tipo === 'Armadura') bonusText = `Defensa +${obj.bonus}`;
        else if (obj.tipo === 'Consumible') bonusText = `Curación +${obj.bonus}`;

        caja.title = `${obj.nombre}\n${bonusText}`;
        caja.appendChild(img);
        inventarioDiv.appendChild(caja);
    });

    cont.appendChild(inventarioDiv);

    // Botón para ir a la siguiente escena (enemigos)
    const btnContinuarEnemigos = document.createElement("button");
    btnContinuarEnemigos.id = "continuar-enemigos";
    btnContinuarEnemigos.textContent = "➡️Continuar Enemigos";
    btnContinuarEnemigos.style.display = "block";
    btnContinuarEnemigos.style.margin = "20px auto";

    cont.appendChild(btnContinuarEnemigos);

    // Evento para avanzar a la Escena 4
    btnContinuarEnemigos.addEventListener("click", () => {
        escena4(); //Crear enemigos
    });
    

}





function escena4(){
    

}




/**
 * 
 * @param {*} nombre 
 * @returns 
 */
function obtenerImagen(nombre) {
    const imagenes = {
        "Espada corta": "./image/espada.png",
        "Arco de caza": "./image/b_t_01.png",
        "Armadura de cuero": "./image/armor.png",
        "Poción pequeña": "./image/hp.png",
        "Espada rúnica": "./image/espada_runica.png",
        "Escudo de roble": "./image/shield.png",
        "Poción grande": "./image/pocion_grande.png",
        "Mandoble épico": "./image/mandoble.png",
        "Placas dracónicas": "./image/placas_draconicas.png",
        "Elixir legendario": "./image/elixir_legendario.png",
        "Goblin": "./image/goblin.png",
        "Orco Guerrero": "./image/orco.png",
        "Esqueleto": "./image/esqueleto.png",
        "Dragón Rojo": "./image/dragon.png",
    };

    // Si no existe imagen, usa una genérica
    return imagenes[nombre] || "./image/default.png";
}







//Inicio del juego
escena1()