// importation du paquet express
const express = require("express");

// création du router
const router = express.Router();

// importation du controller user
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
