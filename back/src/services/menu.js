import Producto from "../models/productos.js"


export const getMenu = async () => {
    try {
        const productos = await Producto.find();
        let plainProductos = productos.map(producto => {
            const plainProducto = producto.toObject();
            delete plainProducto.__v; 
            return plainProducto; 
        });
        return plainProductos; 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el menú" });
    }
}

