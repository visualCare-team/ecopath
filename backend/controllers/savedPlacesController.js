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

export const getSavedPlaces=async(req,res)=>{
  try {
    const userId=req.userId
    const {name}=req.query
    const query={userId}

    if(name)query.name=name

    const places=await SavedPlaces.find(query)

    if(places.length===0)return res.status(400).json({message:'no saved places'})

    res.status(200).json(places)
  } catch (error) {
    res.status(500).json({message:'no saved places found'})
  }
}

export const deleteSavedPlace=async(req,res)=>{
  try {
    const userId=req.userId
    const {id}=req.params

    const place=await SavedPlaces.findOne({
      "_id":id,
      "userId":userId
    })

    if(!place) return res.status(400).json({message:'Place does not exist'})

    await SavedPlaces.findByIdAndDelete(id)

    res.status(200).json({message:'deleted saved place'})
  } catch (error) {
    res.status(500).json({message:'Error deleting place'})
  }
}