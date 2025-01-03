import { Router } from 'express';
import { getMenu } from './services/menu.js';

const router = Router()

router.get('/', (req, res) => {
    res.json({msg: "Hello world"})
})

router.get('/menu', getMenu)

export default router;