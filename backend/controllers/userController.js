import User from "../models/User.js"

export const getUser=async(req,res)=>{
  try {
    const userId=req.userId

    const userData=await User.findById(userId).select('-password')

    if(!userData) return res.status(404).json({message:'User not found'})

    res.status(200).json(userData)
  } catch (error) {
    res.status(500).json({message:'could not fetch user data'})
  }
}

export const updateProfile=async(req,res)=>{
  try {
   const {password,...profileUpdates}=req.body

   const user=await User.findById(req.userId)

   if(!user) return res.status(404).json({ message: 'User not found' })

   const updatedUser=await User.findByIdAndUpdate(
    req.userId,
    {$set:profileUpdates},
    {new:true}
   ).select('-password')

   res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({message:'Update failed'})
  }
}