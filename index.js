let = seleccion = []
let = contadorIva =0
let = contadorTotal = 0

const iva =0.21


const listaPedido = document.querySelector("#pedido")

let plato1 = document.getElementById("contPlato1")


let obtSubtotal = document.getElementById("subTotal")
let obtIva = document.getElementById("Iva")
let obtTotal = document.getElementById("Total")


const masUnoPlatoUno = document.getElementById("masUnoPlatoUno")
const menosUnoPlatoUno = document.getElementById("menosUnoPlatoUno")


masUnoPlatoUno.addEventListener("click",()=>{
    let contPlato1 = parseInt(plato1.textContent)
    plato1.innerText = contPlato1 + 1
    contadorIva = contadorIva + 8000
    contadorTotal = contadorIva * iva 
    let subTotal = parseInt(obtSubtotal.textContent)
    obtSubtotal.innerText = subTotal + 8000
    obtIva.innerText =  contadorIva * iva
    obtTotal.innerText =  contadorIva + contadorTotal

    

    seleccion.push('Hamburguesa Clasica con papas fritas')
    listaPedido.innerHTML = ""

    seleccion.forEach(elemento =>{
        const li = document.createElement("li")
        li.innerText = elemento
        listaPedido.appendChild(li)
    })
    localStorage.setItem("platoUnoGuardado" , contadorTotal)
} )


menosUnoPlatoUno.addEventListener("click",()=>{
    let contPlato1 = parseInt(plato1.textContent)
    if(contPlato1 >0 ){
    plato1.innerText = contPlato1 - 1
    
        contadorIva = contadorIva - 8000
        contadorTotal = contadorIva * iva 
        let subTotal = parseInt(obtSubtotal.textContent)
        obtSubtotal.innerText = subTotal - 8000
        obtIva.innerText =  contadorIva * iva
        obtTotal.innerText =  contadorIva + contadorTotal
        
        seleccion.splice(contPlato1 - 1)
        listaPedido.innerHTML = ""
    
        seleccion.forEach(elemento =>{
            const li = document.createElement("li")
            li.innerText = elemento
            listaPedido.appendChild(li)
        })
    }
    
} )





























