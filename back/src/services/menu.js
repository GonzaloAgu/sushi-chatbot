import Producto from "../models/productos.js"

export const getMenu = async () => {
    try {
        return await Producto.find();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el menú" });
    }
}