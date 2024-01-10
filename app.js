// OBJETO PRODUCTO

const productos = [
    { id: 1, nombre: 'Alfajor Capitan', precio: 600, imagen: './assets/img/capitan.png'},
    { id: 2, nombre: 'Gomitas', precio: 650.6, imagen: './assets/img/mogul.png'},
    { id: 3, nombre: 'Gaseosas', precio: 900, imagen:'./assets/img/gaseosas.png' },
    { id: 4, nombre: 'Oreos', precio: 1650, imagen: './assets/img/oreos.png' },
    { id: 5, nombre: 'Block', precio: 1200, imagen: './assets/img/block.png' },
    { id: 6, nombre: 'Chicles Beldent', precio: 800,  imagen:'./assets/img/beldent.png' },
    { id: 7, nombre: 'Bizcochos Don Satur', precio: 500, imagen: './assets/img/donSatur.png'},
];
//FUNCION AGREGAR AL CARRITO
function agregarAlCarrito(id, nombre, precio, imagen) {
    const carrito = obtenerCarrito();
    carrito.push({ id, nombre, precio, imagen});
    guardarCarrito(carrito);
    actualizarCarrito();
}

//JSON
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}
//GUARDAR ELEMENTOS
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
//ACTUALIZAR CARRITO
function actualizarCarrito() {
    const carrito = obtenerCarrito();
    const carritoLista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total');
    let total = 0;
    carritoLista.innerHTML = '';
//RECORRER PRODUCTOS 
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.nombre}</span>
            <span>$ ${item.precio}</span>`;
        carritoLista.appendChild(li);
        total += item.precio;
    });
//TOTAL PRECIOS
    totalElement.textContent = total.toFixed(2);
}
//VER PRODUCTOS FINALIZAR Y ACTUALIZAR
document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');
    const carritoLista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total');

    actualizarCarrito();

    //PRODUCTOS A COMPRAR

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `<img src="${producto.imagen}">
            <h4>${producto.nombre}</h4>
            <p>Precio: ${producto.precio} $</p>
            <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio},)">Agregar al Carrito</button>`;
        productosContainer.appendChild(productoDiv);
    });

    document.getElementById('finalizarCompra').addEventListener('click', finalizarCompra);

    function finalizarCompra() {
        const carrito = obtenerCarrito();
        if (carrito.length === 0) {
            alert('¡Compra algo ratón');
        } else {
            alert('Gracias por tu compra. Vuela Pronto!! Gracias...');
            // LIMPIAR CARRITO
            guardarCarrito([]);
            actualizarCarrito();
        }
    }
});
