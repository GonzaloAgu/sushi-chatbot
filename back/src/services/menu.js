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
        await pedido.save()
        return pedido;
    } catch(err) {
        throw new Error("Error al guardar el pedido. ", err)
    }
}
