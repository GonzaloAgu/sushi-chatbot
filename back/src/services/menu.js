import Producto from "../models/productos.js"
import Pedido from "../models/pedidos.js";

export const getMenu = async () => {
    try {
        return await Producto.find();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el menú" });
    }
}

export const hacerPedido = async (productos, direccion) => {
    if(!productos || productos.length === 0){
        throw new Error("No se incluyeron productos en el pedido.")
    }
    let pedido = new Pedido()
    pedido.fecha = new Date();
    pedido.direccion = direccion;

    productos.forEach(producto => {
        pedido.productos.push(producto.objectId)
    });
    try {
        await pedido.save()
        return pedido;
    } catch(err) {
        throw new Error("Error al guardar el pedido. ", err)
    }
}
