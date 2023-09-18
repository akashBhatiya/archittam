const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/sign-in',userController.auth);

router.post('/createUser',userController.createUser);

router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;