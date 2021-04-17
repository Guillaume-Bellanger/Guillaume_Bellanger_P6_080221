//importations des différents paquets
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const app = express();
//securité
const helmet = require("helmet");
const cors = require("cors");
const limiter = require("./middleware/api.limiter ");

// Securisation entêtes HTTP
app.use(helmet());

// Active CORS pour éviter les attaques CSRF
app.use(
  cors({
    origin: process.env.DOMAINE, // .env
  })
);

// Connexion à MongoDB
mongoose
  .connect(process.env.BDD_SECRET, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// middleware général appliqué à toute les requêtes (CORS)
app.use((req, res, next) => {
  // autorisation d'acceder à notre API
  res.setHeader("Access-Control-Allow-Origin", "*");

  //  autorisation d'utiliser certains headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  // autorisation d'utiliser certaines méthodes
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Pour pouvoir utiliser les données du corps de la requête , transformer en objet JS utilisable
app.use(bodyParser.json());

//middleware spécifique qui permet de servir le dossier image lors d'une requête spécifique avec l'image
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes API : on utilise le router sauceRoutes et userRoutes
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

// Exportation de l'application
module.exports = app;
