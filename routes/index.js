const express=require('express');
const router=express.Router();
// requiring the controller
const homeController = require('../controllers/home_controller');

console.log('router loaded');
router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comments'));
module.exports=router;