import Menu from "../models/menu.js"

export const getMenu = async (req, res) => {
    try {
        const menuItems = await Menu.find(); // Espera la resolución de la promesa
        res.json(menuItems); // Envía los datos en formato JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el menú" }); // Manejo de errores
    }
}