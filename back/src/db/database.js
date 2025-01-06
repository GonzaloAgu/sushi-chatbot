import mongoose from "mongoose";
import Menu from "../models/productos.js";
import fs from "fs/promises"
import path from "path";



export const initDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/saka');
        console.log("MongoDB conectado")

        const menuCount = await Menu.countDocuments()
        
        if(menuCount === 0) {

            console.log("Cargando menu con datos iniciales")

            const __dirname = import.meta.dirname;
            const jsonPath = path.join(__dirname, "mock-data.json");
            const data = await fs.readFile(jsonPath, "utf-8")
            
            const mockProducts = await JSON.parse(data);
            
            await Menu.insertMany(mockProducts)
        }

        await Promise.all([
            mongoose.connection.createCollection("menu"),
            mongoose.connection.createCollection("pedidos")
        ])

    } catch (err) {
        console.error("Error al iniciar Mongo: ", err)
    }
}