$(() => { //Función ready se ejecuta cuando el HTML es cargado completamente
    const prendas = [
        { id: 1, nombre: "Polera Caballeros", precio: 10000, imagen: "poleraCaballeros.jpeg"},
        { id: 2, nombre: "Poleron Damas", precio: 20000, imagen: "poleronDamas.jpg"},
        { id: 3, nombre: "Pantalón Caballeros", precio: 24999, imagen: "pantalonCaballeros.png"},
        { id: 4, nombre: "Pantalón Damas", precio: 23999, imagen: "pantalonDamas.jpg"},
    ]

    const carrito = []

    const listarPrendas = prendas => {
        $("#listado-prendas").html("");
        for (const item of prendas) {
            $("#listado-prendas").append(`
                <div>
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="assets/img/prendas/${item.imagen}" class="img-fluid rounded-start" alt="${item.nombre}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${item.nombre}</h5>
                                    <div>
                                        <span class="fw-bold">Precio: </span>
                                        <span> $${item.precio}</span>
                                    </div>
                                    <div class="mt-4 d-flex">
                                        <input class="form-control" type="number" class="precio" value="0" readonly>
                                        <button class="btn btn-success cantidades aumenta">+</button>
                                        <button class="btn btn-danger cantidades disminuye">-</button>
                                        <button class="btn btn-primary btn-agregar" data-id="${item.id}">Añadir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
    }
    listarPrendas(prendas)

    const mostrarResumen = carrito => {
        $("#resumen table").html("");
        for (const item of carrito) {
            $("#resumen table").append(`
                <tr>
                    <td>
                        <div class="py-0">${item.nombre}</div>
                        <div class="py-0"><b>Cantidad:</b> ${item.cantidad}</div>
                        <div class="py-0"><b>Precio:</b> ${item.precio}</div>
                    </td>
                    
                </tr>
            `)
        }
    }

    const calcularTotal = carrito => {
        let total = 0
        for (const item of carrito) {
            total += item.precio * item.cantidad
        }
        return total
    }


    $(".aumenta").click(function() {
        let valor = $(this).siblings("input").val()
        valor++;
        $(this).siblings("input").val(valor)
    })

    $(".disminuye").click(function() {
        let valor = $(this).siblings("input").val()
        if(Number(valor) !== 0) {
            valor--;
            $(this).siblings("input").val(valor)
        }
    })

    $(".btn-agregar").click(function() { 
        const idPrenda = $(this).attr("data-id")
        let cantidad = Number($(this).siblings("input").val())
        const itemCarrito = carrito.find(item => item.id == idPrenda) //Busca si la prenda ya existe en el carrito
        
        if(!itemCarrito) { // Caso donde la prenda NO está en el carrito.
            const prenda = prendas.find(item => item.id == idPrenda)
            carrito.push({
                ...prenda,
                cantidad: cantidad
            })
        } else { // Caso donde la prenda SI está en el carrito.
            itemCarrito.cantidad += cantidad
        }
        $(this).siblings("input").val(0)
        mostrarResumen(carrito)

        const total = calcularTotal(carrito)
        $("#monto-total").html(total)
    })
})