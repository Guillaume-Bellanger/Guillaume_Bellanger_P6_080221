const limiter = require("express-rate-limit");

module.exports = limiter({
  windowMs: 15 * 60 * 1000, //periode de temps 15 minutes en ms
  max: 10, //nombre max de requete
  message: " il y a trop de requete en cour ", //message en cas de requete excessives
});
