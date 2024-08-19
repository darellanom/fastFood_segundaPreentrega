// Selecciono todos los botones de incremento, decremento, precios, subtotales y los contadores
const botonMasUno = document.querySelectorAll('.masUno')
const botonMenosUno = document.querySelectorAll('.menosUno')
const counters = document.querySelectorAll('.counter')
const precios = document.querySelectorAll('.precio')
const totalIva = document.getElementById('iva')
const totalElemento = document.getElementById('total')
const productosSeleccionadosContainer = document.getElementById('productosSeleccionados')
const botonContinuar = document.getElementById('continuar')
const confirmarElem = document.getElementById('confirmacion')

let total = 0  // Inicializo el total general
let iva = 0
let totalMasIva = 0


// Función para actualizar el subtotal y total
function ActTolales() {
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
                <p class="me-3 subtotal">X ${count}</p>
                <p class="me-3">${nombreProducto}</p>
                <p class="me-3 subtotal">Subtotal: $${productoSubtotal}</p>
                </div>
            `;
            productosSeleccionadosContainer.innerHTML += SeleccionProductoHTML
        }
        total += productoSubtotal
        iva = total * 0.21
        totalMasIva = iva + total
    })
    
    totalIva.textContent = iva
    totalElemento.textContent = totalMasIva
}

// Agrego event listener a cada botón de incrementar
botonMasUno.forEach((button, index) => {
    button.addEventListener('click', function() {
        let count = parseInt(counters[index].textContent)
        count++
        counters[index].textContent = count  // Actualizo el contador correspondiente
        ActTolales()  // Actualizo subtotales, productos seleccionados y total
    })
})

// Agrego event listener a cada botón de decrementar
botonMenosUno.forEach((button, index) => {
    button.addEventListener('click', function() {
        let count = parseInt(counters[index].textContent)
        if (count > 0) {
            count--
            counters[index].textContent = count  // Actualizo el contador correspondiente
            ActTolales()  // Actualizo subtotales, productos seleccionados y total
        }
    })
})


botonContinuar.addEventListener('click', function() {
    localStorage.setItem ("seleccionGuardar", productosSeleccionadosContainer.innerHTML)
    localStorage.setItem ("cobrar", totalMasIva)

    confirmarElem.innerHTML = `
                <p> Pedido tomado, ¡Gracias por tu compra! <p> `
    })



















