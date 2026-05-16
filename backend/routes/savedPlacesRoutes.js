import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { deleteSavedPlace, getSavedPlaces, postSavedPlace } from '../controllers/savedPlacesController.js'

const router=express.Router()

router.post('/',authMiddleware,postSavedPlace)
router.get('/',authMiddleware,getSavedPlaces)
router.delete('/:id',authMiddleware,deleteSavedPlace)

export default router