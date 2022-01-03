module.exports.profile=function(req,res){
   // res.end('<h1>User Profile</h1>');
   return res.render('user',{
       title:"USER_PROFILE"
   })
}