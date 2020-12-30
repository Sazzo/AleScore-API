import { Router } from 'express'
import MainController from '../controllers/MainController'

const router = Router()

require('express-async-errors')

router.get('/', (_, res) => res.redirect('https://ale.sazz.fail'))
router.get('/api/v1/changes', MainController.getChanges)

export default router
