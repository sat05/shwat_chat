const express=require('express');
const router=express.Router();

//requiring the controller
const userController=require('../controllers/user_controller');
const userpost=require('../controllers/post_controller');

router.get('/profile',userController.profile);
router.get('/post',userpost.post);

module.exports=router;