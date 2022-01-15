const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile',passport.checkAuthentication, userController.profile);

router.get('/sign-up', userController.signup);
router.get('/sign-in', userController.signin);


router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
), userController.createSession);
router.get('/sign-out', userController.destroySession);
module.exports = router;