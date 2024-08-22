
// declaracion de todos los contenedores a traves de los Id
const totalIva = document.getElementById('iva')
const totalElemento = document.getElementById('total')
const productosContainer = document.getElementById('cajaMostrarProductos')
const mostrarProductosSeleccion = document.getElementById('cajaMostrarProductosSeleccion')
const productosSeleccionadosContainer = document.getElementById('productosSeleccionados')
const botonContinuar = document.getElementById('continuar')
const principalContainer = document.getElementById('cajaPrincipalContainer')
const confirmarElem = document.getElementById('confirmacion')

//declaracion de array de objetos para productos
const productos = [
    { nombre: 'Hamburguesa Clasica con Papas', precio: 8000 },
    { nombre: 'Hamburguesa Especial con Papas', precio: 10000 },
    { nombre: 'Pizza Muzzarella', precio: 10000 },
    { nombre: 'Pizza Especial', precio: 15000 },
    { nombre: 'Gaseosa', precio: 3000 },
    ]

// Inicializacion variables
let iva = 0
let totalMasIva = 0
let total = 0
let producto = 0


// funcion para mostrar productos disponibles
function mostrarProductos(productos) {
    productosContainer.innerHTML = ""
    
    productos.forEach((producto) => {
    const productosHTML = `
        <div class="producto card">
        <h2>${producto.nombre}</h2>
        <p>Precio: AR$<span class="precio">${producto.precio}</span></p>
        <div class="cajaBoton">
        <button class="btn menosUno">-1</button>
        <p class="counter">0</p>
        <button class="btn masUno">+1</button>
        </div>
        </div>
    `
    productosContainer.innerHTML += productosHTML;
    })
    }
    mostrarProductos(productos)

// Declaracion de todos los botones de masUno, menosUno, contador y precios
    let botonMasUno = document.querySelectorAll('.masUno')
    let botonMenosUno = document.querySelectorAll('.menosUno')
    let counters = document.querySelectorAll('.counter')
    let precios = document.querySelectorAll('.precio')

// Event listener para cada botón de incremento
botonMasUno.forEach((button, index) => {
    button.addEventListener('click', function() {
        let count = parseInt(counters[index].textContent)
        count++
        counters[index].textContent = count  // Actualizo el contador correspondiente
        actTolales()  // Actualizo subtotales, productos seleccionados y total
    })
})

// Event listener para cada botón de decremento
botonMenosUno.forEach((button, index) => {
    button.addEventListener('click', function() {
        let count = parseInt(counters[index].textContent)
        if (count > 0) {
            count--
            counters[index].textContent = count  // Actualizo el contador correspondiente
            actTolales()  // Actualizo subtotales, productos seleccionados y total
        }
    })
})


// Función para mostrar los productos seleccionados y actualizar el subtotal y total a pagar
function actTolales(iva, totalMasIva, total) {
    total = 0  // Reinicio el total
    productosSeleccionadosContainer.innerHTML = '' // Limpio productos seleccionados

    counters.forEach((counter, index) => {
        const count = parseInt(counter.textContent)
        const precio = parseInt(precios[index].textContent)
        const productoSubtotal = count * precio

        if (count > 0) {
            // Muestro el producto seleccionado en la sección derecha
            const nombreProducto = document.querySelectorAll('.producto h2')[index].textContent
            const SeleccionProductoHTML = `
                <div class="seleccion d-flex">
                <p class="me-3 subtotal" id="cantidadLista">X ${count}</p>
                <p class="me-3" id="nombreLista">${nombreProducto}</p>
                <p class="me-3 subtotal">Subtotal: $${productoSubtotal}</p>
                </div>
            `
            productosSeleccionadosContainer.innerHTML += SeleccionProductoHTML
        }
        total += productoSubtotal
        iva = total * 0.21
        totalMasIva = iva + total
    })
    
    totalIva.textContent = iva
    totalElemento.textContent = totalMasIva
    localStorage.setItem ("cobrar", totalMasIva)
}


//funcion para construir lista de productos para llevar al storage

function obtenerListaSeleccion(){
    const seleccionElementos = document.querySelectorAll('.seleccion');
    const listaSeleccion = []

    seleccionElementos.forEach(elemento => {
        const nombreProductoSeleccionado = elemento.querySelector('#nombreLista').textContent;
        const cantidadSeleccionada = parseInt(elemento.querySelector('#cantidadLista').textContent.replace('X ', ''));
    
        const productoLista = {
            nombre: nombreProductoSeleccionado,
            cantidad: cantidadSeleccionada 
        }
        listaSeleccion.push(productoLista)
    })
    
  return listaSeleccion
}

// funcion para guardar en local storage
function guardarProductos() {
    const listaSeleccion = obtenerListaSeleccion();
    const listaSeleccionJSON = JSON.stringify(listaSeleccion);

    localStorage.setItem('productosSeleccionados', listaSeleccionJSON);
    
}

// funcion para llamar al storage
function llamarDesdeLocalStorage() {

    const listaSeleccionJSON = localStorage.getItem('productosSeleccionados');

    if (listaSeleccionJSON) {
        const listaSeleccion = JSON.parse(listaSeleccionJSON);
        return listaSeleccion;
    }
    // Si no hay datos, retornar un arreglo vacío
    return [];
}

//Event listener para boton continuar 

botonContinuar.addEventListener('click', function() {
  guardarProductos()
  mostrarSeleccion()
  iva = 0
  totalMasIva = 0
  
})


// Funcion para mostrar las opciones seleccionadas y el total en el carrito
  function mostrarSeleccion(){
    
        listaSeleccion = llamarDesdeLocalStorage()
        const totalJSON = localStorage.getItem('cobrar')
        let carritoContainerHTML = ''
        if (listaSeleccion.length >0){
            listaSeleccion.forEach(productoLista => {
                carritoContainerHTML += `
                <div class="d-flex justify-content-center">
                    <div class="seleccion">
                    <h4">${productoLista.nombre}   X${productoLista.cantidad}</h4>
                </div></div>
                ` 
            })
            principalContainer.innerHTML = `<h3 class="d-flex justify-content-center" > ¡Pedido tomado!, seleccinaste:<h3></h3>` + carritoContainerHTML + `<h3 class="d-flex justify-content-center" > Total a pagar: ${totalJSON}<h3></h3>`+ `<div class="d-flex justify-content-center"><button class="btn" id="confirmacion"> confirmar </button></div>`
        
        }else{
            principalContainer.innerHTML = `<h3 class="d-flex justify-content-center" > ¡carrito vacío!<h3></h3>`
        }
 
} 

// Funcion para continuar... pd: En construccion
confirmarElem.addEventListener('click', function() {
    principalContainer.innerHTML = `<h3 class="d-flex justify-content-center" > ¡Gracias!<h3></h3>`
  })











