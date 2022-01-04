const express=require('express');
const router=express.Router();

//requiring the controller
const userController=require('../controllers/user_controller');
const userpost=require('../controllers/post_controller');

router.get('/profile',userController.profile);
router.get('/post',userpost.post);

router.get('/sign-up',userController.signup);
router.get('/sign-in',userController.signin);


router.post('/create',userController.create);
module.exports=router;