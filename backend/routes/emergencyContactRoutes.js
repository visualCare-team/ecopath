import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { getEmergencyContacts, updateEmergencyContacts } from '../controllers/emergencyContactsController.js'

const router=express.Router()

router.get('/', authMiddleware,getEmergencyContacts)
router.put('/', authMiddleware,updateEmergencyContacts)

export default router