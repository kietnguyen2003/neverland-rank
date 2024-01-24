const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const upload = require('../src/config/uploader.js');

router
    .route('/create')
    .post(upload.single('Img'), memberController.createMember);
router
    .route('/getMale')
    .get(memberController.getMemberMale)
router
    .route('/getFemale')
    .get(memberController.getMemberFemale)

module.exports = router;