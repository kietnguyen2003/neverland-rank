const express = require('express');
const router = express.Router();

const signInController = require('../controllers/signInController')

router
    .route('/signIn')
    .post(signInController.signIn)
router
    .route('/signUp')
    .post(signInController.createUser)

module.exports = router;