setTimeout(() => {
    document.getElementById('gif').classList.add("inicio")
    setTimeout(() => {
        location.href='Pages/home.html'
    }, 800);
}, 1700);

import { DB } from "./db.js";

/*  VARIABLES  */

let Filtro = document.querySelector("#Filtro");
let ordenar = document.querySelector("#ordenar");

const categorias = document.querySelectorAll(
    'input[name="categoria"]'
);

/*  MOSTRAR PRODUCTOS  */

function TraerDatos(Datos) {

    let contenedor =
    document.querySelector(".contenedor");

    contenedor.innerHTML = "";

    Datos.forEach(i => {

        let ContenedorAux =
        document.createElement("div");

        ContenedorAux.className =
        "tarjetas";

        ContenedorAux.innerHTML = `
            <img src="${i.Imagen}" alt="${i.Nombre}">

            <h1>${i.Nombre}</h1>

            <h2>$${i.Precio.toLocaleString()}</h2>

            <p>${i.Descripcion}</p>

            <button
            onclick="agregarfavorito('${i.Nombre}')"
            class="btnfav">
                💕 Favorito
            </button>

            <button
            onclick="agregarCarrito('${i.Nombre}')"
            class="btncarrito">
                🛒 Comprar
            </button>
        `;

        contenedor.appendChild(
            ContenedorAux
        );

    });

}

/*  FILTROS  */

function aplicarFiltros() {

    let resultado = [...DB];

    let texto =
    Filtro.value.toLowerCase();

    resultado = resultado.filter(
        producto =>
        producto.Nombre
        .toLowerCase()
        .includes(texto)
    );

    let categoriaSeleccionada =
    document.querySelector(
        'input[name="categoria"]:checked'
    ).value;

    if(categoriaSeleccionada !== "Todos") {

        resultado = resultado.filter(
            producto =>
            producto.categoria ===
            categoriaSeleccionada
        );

    }

    if(ordenar.value === "menor") {

        resultado.sort(
            (a,b) =>
            a.Precio - b.Precio
        );

    }

    if(ordenar.value === "mayor") {

        resultado.sort(
            (a,b) =>
            b.Precio - a.Precio
        );

    }

    if(resultado.length > 0) {

        TraerDatos(resultado);

    } else {

        document.querySelector(
            ".contenedor"
        ).innerHTML =
        "<p>Producto no encontrado</p>";

    }

}

/*  EVENTOS  */

Filtro.addEventListener(
    "keyup",
    aplicarFiltros
);

ordenar.addEventListener(
    "change",
    aplicarFiltros
);

categorias.forEach(categoria => {

    categoria.addEventListener(
        "change",
        aplicarFiltros
    );

});

// /*  CONTADOR  */

// document.getElementById("cantidad").innerText =
// `Productos: ${DB.length}`;

/*  CARGA INICIAL  */

TraerDatos(DB);

/*  FAVORITOS  */

let contador = 0;

window.agregarfavorito = function(nombre){

    contador++;

    const boton = event.target;

    boton.classList.add(
        "animar-favorito"
    );

    setTimeout(() => {

        boton.classList.remove(
            "animar-favorito"
        );

    },600);

    for(let i = 0; i < 8; i++){

        const estrella =
        document.createElement("span");

        const iconos = ["✨","⭐","💖"];

        estrella.innerHTML =
        iconos[
            Math.floor(
            Math.random() * iconos.length
        )
    ];
        estrella.classList.add(
            "estrella"
        );

        const ancho = boton.offsetWidth;
        const alto = boton.offsetHeight;
        estrella.style.left =
        Math.random() * ancho + "px";

        estrella.style.top =
        Math.random() * alto + "px";
        const x =
        (Math.random() - 0.5) * 150;

        const y =
        (Math.random() - 0.5) * 150;

        estrella.style.setProperty(
         "--x",
         `${x}px`
        );

        estrella.style.setProperty(
         "--y",
         `${y}px`
        );
        boton.appendChild(
            estrella
        );

        estrella.addEventListener(
            "animationend",
            () => estrella.remove()
        );

    }

}

/*  CARRITO  */

let carrito = 0;

window.agregarCarrito = function(nombre){

    carrito++;

    document.getElementById("carrito").innerText =
    carrito;

    const boton =
    event.target;

    const tarjeta =
    boton.closest(".tarjetas");

    const imagen =
    tarjeta.querySelector("img");

    const copia =
    imagen.cloneNode(true);

    const origen =
    imagen.getBoundingClientRect();

    const destino =
    document
    .getElementById("iconoCarrito")
    .getBoundingClientRect();

    copia.classList.add(
        "imagen-voladora"
    );

    copia.style.left =
    origen.left + "px";

    copia.style.top =
    origen.top + "px";

    copia.style.setProperty(
        "--x",
        `${destino.left - origen.left}px`
    );

    copia.style.setProperty(
        "--y",
        `${destino.top - origen.top}px`
    );

    document.body.appendChild(
        copia
    );

    copia.addEventListener(
        "animationend",
        () => copia.remove()
    );

}