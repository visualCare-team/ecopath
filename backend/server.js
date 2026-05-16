import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import sosRoutes from './routes/sosRoutes.js'
import hazardRoutes from './routes/hazardRoute.js'
import savedPlacesRoutes from './routes/savedPlacesRoutes.js'

dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/sos', sosRoutes)
app.use('/api/hazard',hazardRoutes)
app.use('/api/places',savedPlacesRoutes)

const PORT=process.env.PORT || 5000

connectDb()
.then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
  })
})