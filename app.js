// OBJETO PRODUCTO
const productos = [
    { id: 1, nombre: 'Alfajor Capitan', precio: 600, imagen: './assets/img/capitan.png' },
    { id: 2, nombre: 'Gomitas', precio: 650.6, imagen: './assets/img/mogul.png' },
    { id: 3, nombre: 'Gaseosas', precio: 900, imagen: './assets/img/gaseosas.png' },
    { id: 4, nombre: 'Oreos', precio: 1650, imagen: './assets/img/oreos.png' },
    { id: 5, nombre: 'Block', precio: 1200, imagen: './assets/img/block.png' },
    { id: 6, nombre: 'Chicles Beldent', precio: 800, imagen: './assets/img/beldent.png' },
    { id: 7, nombre: 'Bizcochos', precio: 500, imagen: './assets/img/donSatur.png' },
    { id: 8, nombre: 'Pipas', precio: 500, imagen: './assets/img/pipas.png' },
    { id: 9, nombre: 'kinder', precio: 1100, imagen: './assets/img/kinder.png' },
    { id: 10, nombre: 'Pepas', precio: 1400, imagen: './assets/img/pepas.png' },
    { id: 11, nombre: 'Desayuno', precio: 3000, imagen: './assets/img/cafe_medialunas.png' },
    { id: 12, nombre: 'Yogurt', precio: 1450, imagen: './assets/img/yogurt.png' },
];
// FUNCION AGREGAR AL CARRITO
function agregarAlCarrito(id, nombre, precio, imagen) {
    const carrito = obtenerCarrito();
    carrito.push({ id, nombre, precio, imagen });
    guardarCarrito(carrito);
    actualizarCarrito();
    
    // MOSTRAR MODAL DE AGREGADO
    mostrarModal('Agregaste un producto', nombre);
}
// FUNCION QUITAR DEL CARRITO
function quitarDelCarrito(id) {
    let carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {
        const nombreProducto = carrito[index].nombre;
        carrito.splice(index, 1);
        guardarCarrito(carrito);
        actualizarCarrito();
        
        // MOSTRAR MODAL DE QUITAR
        mostrarModal('Quitaste un producto', nombreProducto);
    }
}
// FUNCION PARA MOSTRAR MODAL
function mostrarModal(titulo, mensaje) {
    Swal.fire({
        position: "top-end",
        icon: 'success',
        title: titulo,
        text: mensaje,
        showConfirmButton: false,
        timer: 1000,
    });
}
// JSON
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// GUARDAR ELEMENTOS
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// FUNCION OBTENER IMG GOLOSINAS DESDE UNSPLASH
async function obtenerGolosinasUnsplash() {
    const accessKey = '0xh-TCYKau5cy36dy6qjVl6DjUgVYI1Yut4iMBWKHaY'; //clave de acceso de Unsplash
    const query = 'candy'; 
    const count = 4; // cantidad de imagenes

    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&count=${count}&client_id=${accessKey}`);
        if (!response.ok) {
            throw new Error('Error al obtener datos desde Unsplash');
        }
        const data = await response.json();
        return data.map(item => ({ id: item.id, nombre: 'Golosina', precio: 0, imagen: item.urls.regular }));
    } catch (error) {
        console.error('Error:', error.message);
        return [];
    }
}

// FUNCION MOSTRAR GOLOSINAS EN EL BANNER
function mostrarBanner(golosinasUnsplash) {
    const bannerContainer = document.getElementById('banner-container');

    golosinasUnsplash.forEach(golosina => {
        const golosinaDiv = document.createElement('div');
        golosinaDiv.innerHTML = `<img src="${golosina.imagen}">`;
        bannerContainer.appendChild(golosinaDiv);
    });
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
    const carrito = obtenerCarrito();
    const carritoLista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total');
    let total = 0;

    carritoLista.innerHTML = '';

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.nombre}</span>
            <span>$ ${item.precio}</span>
            <button onclick="quitarDelCarrito(${item.id})">Quitar</button>`;
        carritoLista.appendChild(li);
        total += item.precio;
    });

    totalElement.textContent = total.toFixed(2);
}

// VER PRODUCTOS FINALIZAR Y ACTUALIZAR
document.addEventListener('DOMContentLoaded', async () => {
    const productosContainer = document.getElementById('productos-container');
    const carritoLista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total');

    actualizarCarrito();

    // PRODUCTOS A COMPRAR
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `<img src="${producto.imagen}">
            <h4>${producto.nombre}</h4>
            <p>Precio: ${producto.precio} $</p>
            <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, '${producto.imagen}')">Agregar al Carrito</button>`;
        productosContainer.appendChild(productoDiv);
    });

    // OBTENER Y MOSTRAR GOLOSINAS DESDE UNSPLASH
    const golosinasUnsplash = await obtenerGolosinasUnsplash();
    mostrarBanner(golosinasUnsplash);

    document.getElementById('finalizarCompra').addEventListener('click', finalizarCompra);

    function finalizarCompra() {
        const carrito = obtenerCarrito();
        if (carrito.length === 0) {
            Swal.fire({
                title: "¡Compra algo ratón!",
                imageUrl: "./assets/img/raton.png",
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: "Custom image"
              });
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Gracias por tu compra. Vuelve pronto. ¡Gracias!",
                showConfirmButton: false,
                timer: 2000
              });
            // LIMPIAR CARRITO
            guardarCarrito([]);
            actualizarCarrito();
        }
    }
});
