const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/',homeController.homePage);

router.use('/users',require('./user'));
router.use('/admin',require('./admin'));

module.exports = router;