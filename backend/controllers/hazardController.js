import Hazard from "../models/Hazard.js";

export const postHazard = async (req, res) => {
  try {
    const { lat, lng, description } = req.body;
    const userId = req.userId;

    //gemma 4 takes decription and specifies type

    const type = "other"; //temp

    const hazardCreated = await Hazard.create({
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      userId,
      resolved: false,
      description,
      type,
    });

    res
      .status(201)
      .json({
        message: "Hazard created successfully",
        hazardId: hazardCreated._id,
      });
  } catch (error) {
    res.status(500).json({ message: "Error occured while creating hazard" });
  }
};

export const getHazard = async (req, res) => {
  try {
    const { latitude, longitude, rad } = req.query;

    const lat = parseFloat(req.query.latitude);
    const lng = parseFloat(req.query.longitude);
    const radius = parseInt(req.query.rad);

    if (!lat || !lng)
      return res.status(400).json({ message: "coordinates of user required" });

    const hazards = await Hazard.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: radius || 500,
        },
      },
      resolved: false,
    });

    if (hazards.length === 0)
      return res.status(200).json({ message: "No hazards found here" });

    res.status(200).json(hazards);
  } catch (error) {
    res.status(500).json({ message: "error sending hazards" });
  }
};

export const resolveHazard=async(req,res)=>{
  try {
    const {id}=req.params

    const hazard=await Hazard.findByIdAndUpdate(
      id,
      {resolved:true, resolvedAt:new Date()},
      {new:true}
    )

    if(!hazard) return res.status(404).json({ message: 'Hazard not found' })

    res.status(200).json({message:'Hazard Resolved'})
  } catch (error) {
    res.status(500).json({message:'error occured while marking hazard as resolved'})
  }
}
