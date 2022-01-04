//import the schema
const User=require('../models/user');


module.exports.profile=function(req,res){
   // res.end('<h1>User Profile</h1>');
   return res.render('user',{
       title:"USER_PROFILE"
   })
}
module.exports.signup=function(req,res){
    return res.render('user_sign-up',{
        title:"Codeial || SignUp"
    })
}
module.exports.signin=function(req,res){
    return res.render('user_sign-in',{
        title:"Codeial || SignIn"
    })
}
// get the sign up data
module.exports.create=function(req,res){
   if(req.body.password !=req.body.confirm_password){
       return res.redirect('back');
   }
   User.findOne({email:req.body.email},function(err,user){
       if(err){
           console.log('error in finding user in signing up');
           return
       }
       if(!user){
           User.create(req.body,function(err,user2){
            if(err){
                console.log('error in finding user in signing up');

                return
            }
            

            return res.redirect('/user/sign-in');
           })
       }else{
           return res.redirect('back');
       }
   })
}
// get the sign in data
module.exports.createSession=function(req,res){
    // todo later
}