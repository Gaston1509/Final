// definir variable array
let carrito = [];

// función agregar productos--botones

const boton = document.getElementById("boton")
boton.onclick = function(){
    agregarAlCarrito('Chupetines', 200)
}

const boton2 = document.getElementById("boton2")
boton2.onclick = function(){
    agregarAlCarrito('Chocolate Block', 800)
}

const boton3 = document.getElementById("boton3")
boton3.onclick = function(){
    agregarAlCarrito('Galletitas Oreo', 1230.50)
}

const boton4 = document.getElementById("boton4")
boton4.onclick = function(){
    agregarAlCarrito('Alfajor Capitan', 750)
}

const boton5 = document.getElementById("boton5")
boton5.onclick = function(){
    agregarAlCarrito('Coca Cola', 850)
}


function agregarAlCarrito(producto, precio) {
    const item = {producto, precio};
    carrito.push(item);
    actualizarCarrito();
}

// funcion actulizacion

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total');
    listaCarrito.innerHTML = '';
   

// variable total    
    let total = 0;
    
    carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.producto}: $${item.precio.toFixed(2)}`;
        listaCarrito.appendChild(listItem);
        total += item.precio;
        //LOCALSTORAGE--JSON
        localStorage.setItem("carrito", JSON.stringify(listaCarrito));
    });

    totalElemento.textContent = `Total: $${total.toFixed(2)}`;
}

// funcion vaciar resetear carrito

const botonVaciar = document.getElementById("botonVaciar")
        botonVaciar.onclick = function(){
        carrito = [];
        actualizarCarrito()
}

