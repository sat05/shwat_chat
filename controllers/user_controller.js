//import the schema
const User=require('../models/user');


module.exports.profile=function(req,res){
   // res.end('<h1>User Profile</h1>');
   User.findById(req.params.id ,function(err,user){
    return res.render('user',{
        title:"USER_PROFILE",
        profile_user:user
    })
   })
  
}

module.exports.update = async function(req,res){
   /* if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }*/
    if(req.user.id == req.params.id){
        try{
            let user= await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('***Multer error',err);
                }

               console.log("this is file",req.file,"this is body",req.body,"useravatarpath",User.avaterpath);

                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar= User.avaterpath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }


    }else{
        req.flash('error',err);
        return res.status(401).send('Unauthorized');
    }
}
//sign-up
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/user/profile');
    }
    return res.render('user_sign-up',{
        title:"Codeial || SignUp"
    })
}
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/user/profile');
    }
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
    // todo later
    // sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','logged in Successfully');
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have logged out!');
console.log(req.user);
    return res.redirect('/');
}