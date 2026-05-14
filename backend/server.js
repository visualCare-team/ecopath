import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user',userRoutes)

const PORT=process.env.PORT || 5000

connectDb()
.then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
  })
})