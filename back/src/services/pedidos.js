import Pedido from "../models/pedidos.js";

export const hacerPedido = async (listaProductos, direccion) => {
    if(!listaProductos || listaProductos.length === 0){
        throw new Error("No se incluyeron productos en el pedido.")
    }
    let pedido = new Pedido()
    pedido.fecha = new Date();
    pedido.direccion = direccion;

    listaProductos.forEach(producto => {
        pedido.productos.push({id: producto.objectId, cantidad: producto.cantidad, precio: producto.precio})
    });
    try {
        console.log("Guardando pedido con " + listaProductos.length + " producto(s)")
        await pedido.save()
        return pedido;
    } catch(err) {
        throw new Error("Error al guardar el pedido. ", err)
    }
}

export const getPedido = async (id) => {
    try {
        let pedido = await Pedido.findById(id);
        pedido = pedido.toObject();
        delete pedido.__v;
        return pedido;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el pedido" });
    }
}

export const getAllPedidos = async () => {
    try {
        let pedidos = await Pedido.find();
        
        let plainPedidos = pedidos.map(pedido => {
            const plainPedido = pedido.toObject();
            delete plainPedido.__v; 
            return plainPedido; 
        });
        return plainPedidos; 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los pedidos" });
    }
}