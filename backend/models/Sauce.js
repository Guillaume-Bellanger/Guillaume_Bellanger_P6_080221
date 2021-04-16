// importation du paquet mangoose
const mongoose = require("mongoose");

// fonction Schema à qui on va passer notre Object et qui va structurer les différents champs
const sauceSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
  },
  { autoIndex: false }
);

// exportation du model terminé, en passant le nom du model et le schema
module.exports = mongoose.model("Sauce", sauceSchema);
