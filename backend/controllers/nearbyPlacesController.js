import axios from "axios";
export const getNearbyPlaces = async (req, res) => {
  try {
    const lat = parseFloat(req.query.latitude);
    const lng = parseFloat(req.query.longitude);

    if (!lat || !lng)
      return res.status(400).json({ message: "coordinates required" });

    const query = `
  [out:json];
  (
    node["amenity"](around:500,${lat},${lng});
    node["shop"](around:500,${lat},${lng});
  );
  out body;
`;

    const encodedQuery = encodeURIComponent(query)

const response = await axios.get(
  `https://overpass-api.de/api/interpreter?data=${encodedQuery}`,
  {
    headers: {
      'User-Agent': 'VisionNav/1.0 (hackathon project)',
      'Accept': 'application/json'
    }
  }
)
    if (!response)
      return res
        .status(400)
        .json({ message: "could not fetch any nearby place" });

    res.status(200).json(response.data.elements);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "error fetching nearby places" });
  }
};
