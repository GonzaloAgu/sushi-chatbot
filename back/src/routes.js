import { Router } from 'express';
import { sendChat } from './services/chat.js';
import { hacerPedido, getAllPedidos, getPedido } from './services/pedidos.js';
import { getMenu } from './services/menu.js';

const router = Router()

router.get('/', (req, res) => {
    res.json({msg: "Hello world"})
})

router.get('/menu', async (req, res) => {
    try {
        const response = await getMenu();
        res.json(response)
    } catch(e) {
        console.error("Error obtener el menú. ", e);
        res.status(500).json({ ok: false, message: "Error al obtener el menú."})
    }
})


router.get('/pedidos', async (req, res) => {
    try {
        if(req.query.id) {
            const response = await getPedido(req.query.id);
            res.json(response)
        } else {
            const response = await getAllPedidos();
            res.json(response)
        }
    } catch(e) {
        console.error("Error obtener pedidos. ", e);
        res.status(500).json({ ok: false, message: "Error al obtener el o los pedidos."})
    }
})

router.post('/sendchat', async (req, res) => {
    try {
        const response = await sendChat(req.body.message, req.body.contents)
        res.json(response)
    } catch (e) {
        console.error("Error al comunicarse con la IA: ", e)
        return res.status(500).json({message: "Se produjo un error al comunicarse con la IA."})
    }
})

router.post('/ordenar', async (req, res) => {
    if(!req.body.listaProductos || !req.body.direccion){
        res.status(400).json({error: "Cuerpo de solicitud incompleto (productos, direccion)"})
    }
    try {
        const pedido = await hacerPedido(req.body.listaProductos, req.body.direccion)
        const montoTotal = req.body.listaProductos.reduce((total, p) => total + p.cantidad * p.precio, 0 )
        res.json({
            ok: true,
            listaProductos: req.body.listaProductos,
            direccion: pedido.direccion,
            montoTotal
        })
    } catch (e) {
        console.error("Error al confirmar la orden. ", e);
        res.status(500).json({ ok: false, message: "Error al confirmar la orden."})
    }
})

export default router;