const Destination = require("../models/Destination");

const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findOne()
      .select({
        "destinations._id": 0,
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .lean()
      .exec();
    if (!destinations) {
      return res.status(404).json({ message: "Destinations not found" });
    }

    res.json(destinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching destinations" });
  }
};

const updateDestinationPrice = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        message: "Invalid request. Please provide city name and price.",
      });
    }

    const destination = await Destination.findOneAndUpdate(
      { "destinations.name": name },
      { $set: { "destinations.$.price": price } },
      { new: true }
    );

    if (!destination) {
      return res.status(404).json({ message: `City "${name}" not found.` });
    }

    res.json({ message: "City price updated successfully", destination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating city price" });
  }
};

module.exports = { getDestinations, updateDestinationPrice };
