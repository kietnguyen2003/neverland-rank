const express = require('express');
const router = express.Router();

const updateController = require('../controllers/updateController')

router
    .route('/male')
    .get(updateController.updateMalePage)
router
    .route('/female')
    .get(updateController.updateFemalePage)
router
    .route('/done')
    .post(updateController.doneUpdate)
router
    .route('/delete')
    .post(updateController.deleteMember)

module.exports = router;