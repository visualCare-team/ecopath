import User from "../models/User.js"

export const getEmergencyContacts=async(req,res)=>{
  try {
    const userId=req.userId

    const user=await User.findById(userId)
    if(!user) return res.status(400).json({message:'User not found'})

    res.status(200).json({ emergencyContacts: user.emergencyContacts })
  } catch (error) {
    res.status(500).json({message:'error getting emergency contacts'})
  }
}

export const updateEmergencyContacts=async(req,res)=>{
  try {
    const userId=req.userId

    const user=await User.findById(userId)
    if(!user) return res.status(400).json({message:'User not found'})

      const {emergencyContacts}=req.body

      const updatedContacts=await User.findByIdAndUpdate(
        userId,
        { $set: { emergencyContacts } },
        {new:true}
      ).select('-password')

      res.status(200).json(updatedContacts)
  } catch (error) {
    res.status(500).json({message:'error occured while updating emergency contacts'})
  }
}