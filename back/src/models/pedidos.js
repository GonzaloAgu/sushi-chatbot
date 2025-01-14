import mongoose from 'mongoose'
import { productoPedidoSchema } from './productos.js';

const { Schema } = mongoose;

const pedidoSchema = new Schema({
    productos: [{ id: {type: Schema.Types.ObjectId, ref: "Menu"}, cantidad: Schema.Types.Number, precio: Schema.Types.Number}],
    fecha: Date,
    direccion: String
}, { collection: 'pedidos' });

const Pedido = mongoose.model('Pedido', pedidoSchema)

export default Pedido;