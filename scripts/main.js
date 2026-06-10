setTimeout(() => {
    document.getElementById('gif').classList.add("inicio")
    setTimeout(() => {
        location.href='Pages/home.html'
    }, 800);
}, 1700);

import { DB } from "./db.js";

/* ---------------- VARIABLES ---------------- */

let Filtro = document.querySelector("#Filtro");
let ordenar = document.querySelector("#ordenar");

const categorias = document.querySelectorAll(
    'input[name="categoria"]'
);

/* ---------------- MOSTRAR PRODUCTOS ---------------- */

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

/* ---------------- FILTROS ---------------- */

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

/* ---------------- EVENTOS ---------------- */

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

/* ---------------- CONTADOR ---------------- */

document.getElementById("cantidad").innerText =
`Productos: ${DB.length}`;

/* ---------------- CARGA INICIAL ---------------- */

TraerDatos(DB);

/* ---------------- FAVORITOS ---------------- */

let contador = 0;

window.agregarfavorito = function(nombre){

    contador++;

    console.log(
        nombre +
        " agregado a favoritos"
    );

}

/* ---------------- CARRITO ---------------- */

let carrito = 0;

window.agregarCarrito = function(nombre){
    carrito++;
    console.log(
        nombre +
        " agregado al carrito"
    );

}