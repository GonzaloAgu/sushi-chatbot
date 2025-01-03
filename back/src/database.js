import mongoose from "mongoose";

export const initDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/saka');
        console.log("MongoDB conectado")
    } catch (err) {
        console.error("Error al conectar Mongo: ", err)
    }
}