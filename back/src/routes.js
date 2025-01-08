import { Router } from 'express';
import { getMenu } from './services/menu.js';
import { sendChat } from './services/chat.js';

const router = Router()

router.get('/', (req, res) => {
    res.json({msg: "Hello world"})
})

router.get('/menu', getMenu)
router.post('/sendchat', sendChat)

export default router;