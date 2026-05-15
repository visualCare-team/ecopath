import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { sosController } from '../controllers/sosController.js'

const router=express.Router()

router.post('/',authMiddleware,sosController)

export default router