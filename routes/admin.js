const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');


router.get('/addProduct', adminController.addProduct);

router.post('/createProduct',adminController.createProduct);

module.exports = router;
