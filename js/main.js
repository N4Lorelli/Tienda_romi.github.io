// PRODUCTOS
const productos = [
    // Velas
    {
        id: "velas-01",
        titulo: "Vela 01",
        imagen: "./img/abrigos/01.jpg",
        categoria: {
            nombre: "Velas",
            id: "velas"
        },
        precio: 1000
    },
    {
        id: "velas-02",
        titulo: "Vela 02",
        imagen: "./img/abrigos/02.jpg",
        categoria: {
            nombre: "Velas",
            id: "velas"
        },
        precio: 500
    },
    {
        id: "velas-03",
        titulo: "Vela 03",
        imagen: "./img/abrigos/03.jpg",
        categoria: {
            nombre: "Velas",
            id: "velas"
        },
        precio: 700
    },
    {
        id: "velas-04",
        titulo: "Vela 04",
        imagen: "./img/abrigos/04.jpg",
        categoria: {
            nombre: "Velas",
            id: "velas"
        },
        precio: 900
    },
    {
        id: "velas-05",
        titulo: "Vela 05",
        imagen: "./img/abrigos/05.jpg",
        categoria: {
            nombre: "Velas",
            id: "velas"
        },
        precio: 500
    },
    // Santeria
    {
        id: "santeria-01",
        titulo: "Santeria 01",
        imagen: "./img/camisetas/01.jpg",
        categoria: {
            nombre: "Santeria",
            id: "santeria"
        },
        precio: 1000
    },
    {
        id: "santeria-02",
        titulo: "Santeria 02",
        imagen: "./img/camisetas/02.jpg",
        categoria: {
            nombre: "Santeria",
            id: "santeria"
        },
        precio: 1000
    },
    {
        id: "santeria-03",
        titulo: "Santeria 03",
        imagen: "./img/camisetas/03.jpg",
        categoria: {
            nombre: "Santeria",
            id: "santeria"
        },
        precio: 1000
    },
    {
        id: "santeria-04",
        titulo: "Santeria 04",
        imagen: "./img/camisetas/04.jpg",
        categoria: {
            nombre: "Santeria",
            id: "santeria"
        },
        precio: 1000
    },
    {
        id: "santeria-051",
        titulo: "Santeria 05",
        imagen: "./img/camisetas/05.jpg",
        categoria: {
            nombre: "Santeria",
            id: "santeria"
        },
        precio: 1000
    },
    {
        id: "santeria-06",
        titulo: "Santeria 06",
        imagen: "./img/camisetas/06.jpg",
        categoria: {
            nombre: "Santeria",
            id: "santeria"
        },
        precio: 1000
    },
    {
        id: "santeria-07",
        titulo: "Santeria 07",
        imagen: "./img/camisetas/07.jpg",
        categoria: {
            nombre: "Santeria",
            id: "santeria"
        },
        precio: 1000
    },
    {
        id: "santeria-08",
        titulo: "Santeria 08",
        imagen: "./img/camisetas/08.jpg",
        categoria: {
            nombre: "Santeria",
            id: "santeria"
        },
        precio: 1000
    },
    // Pantalones
    {
        id: "otros-01",
        titulo: "Pantalón 01",
        imagen: "./img/pantalones/01.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "otros"
        },
        precio: 1000
    },
    {
        id: "otros-02",
        titulo: "Pantalón 02",
        imagen: "./img/pantalones/02.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "otros"
        },
        precio: 1000
    },
    {
        id: "otros-03",
        titulo: "Pantalón 03",
        imagen: "./img/pantalones/03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "otros"
        },
        precio: 1000
    },
    {
        id: "otros-04",
        titulo: "Pantalón 04",
        imagen: "./img/pantalones/04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "otros"
        },
        precio: 1000
    },
    {
        id: "otros-05",
        titulo: "Pantalón 05",
        imagen: "./img/pantalones/05.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "otros"
        },
        precio: 1000
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}