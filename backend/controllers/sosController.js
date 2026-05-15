import SOS from "../models/SOS.js";
import User from "../models/User.js";

export const sosController = async (req, res) => {
  try {
    const userId = req.userId;
    const { lat, lng } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "user not found" });

    const emergency = user.emergencyContacts;

    const sos = await SOS.create({
      userId,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      message: `Emergency ${user.name} needs help`,
    });

    res.status(201).json({
      message: "SOS sent successfully",
      emergencyContacts: emergency,
      sosId: sos._id,
      locationLink: `https://maps.google.com/?q=${lat},${lng}`
    });
  } catch (error) {
    res.status(500).json({ message: "error creating/sending sos" });
  }
};
