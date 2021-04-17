// importation du paquet express
const express = require("express");

// création du router
const router = express.Router();

// importation du controller sauce
const sauceCtrl = require("../controllers/sauce");

// importation de notre middleware d'authentification
const auth = require("../middleware/auth");

// importation de notre middleware multer
const multer = require("../middleware/multer-config.js");

router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;
