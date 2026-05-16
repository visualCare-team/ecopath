import SavedPlaces from "../models/SavedPlaces.js";

export const postSavedPlace=async(req,res)=>{
  try {
    const {type,name}=req.body
    const lat=parseFloat(req.body.latitude)
    const lng=parseFloat(req.body.longitude)
    const userId=req.userId

    if (!lat || !lng)
      return res.status(400).json({ message: "coordinates of user required" });

    if(!type || !name)return res.status(400).json({message:'type and name of place is required'})
    
    const savedPlace=await SavedPlaces.create({
      userId,
      location:{
        type:'Point',
        coordinates:[lng,lat]
      },
      type,
      name
    })

    res.status(201).json({message:'place successfully saved'})
  } catch (error) {
    res.status(500).json({message:'Error occured while saving place'})
  }
}