import express from 'express'
import { getNearbyPlaces } from '../controllers/nearbyPlacesController.js'

const router=express.Router()

router.get('/',getNearbyPlaces)

export default router