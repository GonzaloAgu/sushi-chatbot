import mongoose from 'mongoose'

const { Schema } = mongoose;

const pedidoSchema = new Schema({
    productos: [{type: Schema.Types.ObjectId, ref: "Menu"}],
    fecha: Date,
    monto: Number
}, { collection: 'pedidos' });

const Pedido = mongoose.model('Menu', pedidoSchema)

export default Pedido;