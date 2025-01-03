import Producto from "../models/productos.js"

export const getMenu = async (req, res) => {
    try {
        const menuItems = await Producto.find();
        res.json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el menú" });
    }
}