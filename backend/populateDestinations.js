// populateDestinations.js
const mongoose = require("mongoose");
const Destination = require("./models/Destination");
require("dotenv").config();

const cities = [
  { name: "Adrar" },
  { name: "Chlef" },
  { name: "Laghouat" },
  { name: "Oum El Bouaghi" },
  { name: "Batna" },
  { name: "Béjaïa" },
  { name: "Biskra" },
  { name: "Béchar" },
  { name: "Blida" },
  { name: "Bouira" },
  { name: "Tamanrasset" },
  { name: "Tébessa" },
  { name: "Tlemcen" },
  { name: "Tiaret" },
  { name: "Tizi Ouzou" },
  { name: "Alger" },
  { name: "Djelfa" },
  { name: "Jijel" },
  { name: "Sétif" },
  { name: "Saïda" },
  { name: "Skikda" },
  { name: "Sidi Bel Abbès" },
  { name: "Annaba" },
  { name: "Guelma" },
  { name: "Constantine" },
  { name: "Médéa" },
  { name: "Mostaganem" },
  { name: "M'Sila" },
  { name: "Mascara" },
  { name: "Ouargla" },
  { name: "Oran" },
  { name: "El Bayadh" },
  { name: "Illizi" },
  { name: "Bordj Bou Arreridj" },
  { name: "Boumerdès" },
  { name: "El Tarf" },
  { name: "Tindouf" },
  { name: "Tissemsilt" },
  { name: "El Oued" },
  { name: "Khenchela" },
  { name: "Souk Ahras" },
  { name: "Tipaza" },
  { name: "Mila" },
  { name: "Aïn Defla" },
  { name: "Naâma" },
  { name: "Aïn Témouchent" },
  { name: "Ghardaïa" },
  { name: "Relizane" },
  { name: "Timimoun" },
  { name: "Mokhtar" },
  { name: "Djellal" },
  { name: "Béni Abbès" },
  { name: "Salah" },
  { name: "Guezzam" },
  { name: "Touggourt" },
  { name: "Djanet" },
  { name: "M'Ghair" },
  { name: "Meniaa" },
];

const populateDestinations = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const destination = new Destination({ destinations: cities });
    await destination.save();

    console.log("Destinations populated successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating destinations:", error);
  }
};

populateDestinations();
