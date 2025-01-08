import { Router } from 'express';
import { sendChat } from './services/chat.js';

const router = Router()

router.get('/', (req, res) => {
    res.json({msg: "Hello world"})
})

router.post('/sendchat', async (req, res) => {
    try {
        const response = await sendChat(req.body.message)
        res.json(response)
    } catch (e) {
        console.error("Error al comunicarse con la IA: ", e)
        return res.status(500).json({message: "Se produjo un error al comunicarse con la IA."})
    }
})

export default router;