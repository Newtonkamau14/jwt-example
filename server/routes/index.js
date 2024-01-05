const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */
router.route('/').get(indexController.indexPage)
router.route('/characters').get(indexController.getAllCharacters)

module.exports = router;
