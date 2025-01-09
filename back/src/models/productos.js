import mongoose from 'mongoose'

const { Schema } = mongoose;

const menuSchema = new Schema({
    nombre: String,
    precio: Number
}, { collection: 'menu' });

menuSchema.index({nombre: 1})

export const productoPedidoSchema = new Schema({
    producto: menuSchema,
    cantidad: { type: Number, required: true, min: 1 }
})

const Menu = mongoose.model('Menu', menuSchema)

export default Menu;