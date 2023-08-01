// models/Destination.js
const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    destinations: [
      {
        name: { type: String, required: true, unique: true },
        price: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
