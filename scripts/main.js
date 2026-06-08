setTimeout(() => {
    document.getElementById('gif').classList.add("inicio")
    setTimeout(() => {
        location.href='Pages/home.html'
    }, 800);
}, 1700);
a
import { DB } from "/scripts/db.js";

function TraerDatos(Datos) {

    let contenedor = document.querySelector('.contenedor')
    contenedor.innerHTML = "";

    Datos.forEach(i => {
        let ContenedorAux = document.createElement('div')
        ContenedorAux.className = 'tarjetas'
       ContenedorAux.innerHTML =
`a
<img src="${i.Imagen}" alt="${i.Nombre}">

<h1>${i.Nombre}</h1>

<h2>$${i.Precio.toLocaleString()}</h2>

<h3>Stock: ${i.Stock}</h3>

${i.Stock <= 3 ? '<p class="bajo-stock">Bajo Stock</p>' : ""}

<p>${i.Descripcion}</p>

<button onclick="agregarfavorito('${i.Nombre}')" class="btnfav">
💕 Favorito
</button>

<button onclick="agregarCarrito('${i.Nombre}')" class="btncarrito">
🛒 Comprar
</button>
`
        contenedor.appendChild(ContenedorAux)
    });

}

document.getElementById("cantidad").innerText =
    `Productos: ${DB.length}`;
    
TraerDatos(DB)

let Filtro= document.querySelector('#Filtro')
let Contenedor= document.querySelector('.contenedor')

Filtro.addEventListener('keyup', function(){
    let Filtros= DB.filter(i=>i.Nombre.toLowerCase().includes(Filtro.value.toLocaleLowerCase()))
    TraerDatos(Filtros)
    if (Filtros.length>0) {
        TraerDatos(Filtros)

    } else {
        Contenedor.innerHTML=`<p>Producto NO Encontrado</p>`
    }

})

let contador= 0;
let carrito= 0;

window.agregarCarrito = function(nombre){
    carrito++;
    document.getElementById("carrito").innerText = carrito;

    const toast = new bootstrap.Toast(
        document.getElementById("toastCarrito")
    );

    toast.show();
}

window.agregarfavorito=function(nombre) {
    contador++;
    document.getElementById('fav').innerText=contador;
    console.log(nombre + " agregado a favoritos");
}

// Ordenar por precio
 let ordenar = document.querySelector('#ordenar');

 ordenar.addEventListener('change', function(){

    let copia = [...DB];

     if(this.value === 'menor'){
         copia.sort((a,b) => a.Precio - b.Precio);
    }

     if(this.value === 'mayor'){
         copia.sort((a,b) => b.Precio - a.Precio);
    }

    TraerDatos(copia);
});