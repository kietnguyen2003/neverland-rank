const express = require('express');
const router = express.Router();
const moveController = require('../controllers/moveController.js');

router
    .get('/home', moveController.getHome)
    .get('/male', moveController.getMalePage)
    .get('/female', moveController.getFemalePage)

module.exports = router;
