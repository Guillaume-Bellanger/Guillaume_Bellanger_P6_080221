//importation du paquet mangoose
const mongoose = require("mongoose");

// importation du paquet mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");

// Modèle user
const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
  },
  { autoIndex: false }
);

// Plugin qui restreint à une création de user par adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
