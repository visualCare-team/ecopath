import express from 'express'
import { getUser, updateProfile } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router=express.Router()

router.get('/',authMiddleware,getUser)
router.put('/update',authMiddleware,updateProfile)

export default router