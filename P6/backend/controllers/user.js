const User = require("../models/User"); // importation du model User
const bcrypt = require("bcrypt"); // importation du paquet bcrypt
const jwt = require("jsonwebtoken"); // importation du paquet jwt
const userValidator = require("./user.validator");

exports.signup = (req, res, next) => {
  //console.log(req.body.password);
  if (userValidator.isGoodPassword(req.body.password)) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) =>
            res.status(400).json({ message: "Utilisateur déjà existant !" })
          );
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    return res.status(404).json({
      message:
        "Le mot de passe doit contenir au moins un nombre, une minuscule, une majuscule et être composé de 6 caractères minimum !",
    });
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // on récupère l'utilisateur de la base qui correspond a l'adresse mail entrée
    .then((user) => {
      if (!user) {
        // si on ne reçoit pas d'utilisateur
        return res.status(401).json({ error: "Utilisateur non trouvé !" }); // on renvoi une erreur
      }
      bcrypt
        .compare(req.body.password, user.password) // on compare le mot de passe entré avec le hash de la base de donnée
        .then((valid) => {
          if (!valid) {
            // si la comparaison n'est pas bonne
            return res.status(401).json({ error: "Mot de passe incorrect !" }); // on renvoi une erreur
          }
          res.status(200).json({
            // mais si la comparaison est bonne
            userId: user._id, // on renvoi son UserId
            token: jwt.sign(
              // fonction sign qui prend des arguments les données que nous allons encoder à l'intérieur du token
              { userId: user._id }, // création d'un objet avec le UserId pour être sur de la correspondance
              process.env.TOKEN_ENCODAGE, // clé secrète pour l'encodage
              { expiresIn: "24h" } // configuration de l'expiration du token
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
