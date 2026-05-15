import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'

export const register=async(req,res)=>{
  try {
    const {name,phoneNumber, password, emergencyContacts, preferredLanguage}=req.body

    if(!name || !password || !phoneNumber || !preferredLanguage)return res.status(400).json({message:'Please enter all required details'})

    const isMatch=await User.findOne({phoneNumber})
    if(isMatch)return res.status(400).json({message:'User already exists'})
    
    if(emergencyContacts.length===0)return res.status(400).json({message:'Please enter atleat one emergency contact'})

      const hashedPassword =await bcrypt.hash(password,10)

    const newUser=await User.create({
      name,
      phoneNumber,
      password:hashedPassword,
      emergencyContacts,
      preferredLanguage
    })
    
    res.status(201).json({message:'User registered successfully',
      userId:newUser._id
    })
  } catch (error) {
    res.status(500).json({message:'Error occured while user registration'})
  }
}

export const login=async(req,res)=>{
  try {
     const {phoneNumber, password}=req.body

     if(!phoneNumber || !password)return res.status(400).json({message:'please give all required details'})

    const user=await User.findOne({phoneNumber})

    if(!user)return res.status(400).json({message:'Please register first'})

    const isMatch=await bcrypt.compare(password, user.password)

    if(!isMatch) return res.status(400).json({message:'either password or number is wrong'})

      const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
      )

      res.status(200).json({ 
  message: 'user logged in successfully', 
  token,
  user: {
    id: user._id,
    name: user.name,
    preferredLanguage: user.preferredLanguage
  }
})
  } catch (error) {
    res.status(500).json({message:'user could not login'})
  }
}