import express from 'express'
import { getHazard, postHazard, resolveHazard } from '../controllers/hazardController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router=express.Router()

router.post('/',authMiddleware, postHazard)
router.get('/',authMiddleware,getHazard)
router.put('/:id',authMiddleware, resolveHazard)

export default router