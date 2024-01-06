const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const { requireAuth } = require("../middleware/middleware");

/* GET home page. */
router.route("/").get(indexController.indexPage);
router.route("/characters").get(requireAuth, indexController.getAllCharacters);

module.exports = router;
