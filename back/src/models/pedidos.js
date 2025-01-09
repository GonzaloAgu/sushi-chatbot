import mongoose from 'mongoose'
import { productoPedidoSchema } from './productos.js';

const { Schema } = mongoose;

const pedidoSchema = new Schema({
    productos: [{type: Schema.Types.ObjectId, ref: "Menu"}],
    fecha: Date,
    direccion: String
}, { collection: 'pedidos' });

const Pedido = mongoose.model('Pedido', pedidoSchema)

export default Pedido;