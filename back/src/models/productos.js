import mongoose from 'mongoose'

const { Schema } = mongoose;

const menuSchema = new Schema({
    nombre: String,
    precio: Number
}, { collection: 'menu' });

menuSchema.index({nombre: 1})

const Menu = mongoose.model('Menu', menuSchema)

export default Menu;