const Post=require('../models/post')

module.exports.home=function(req,res){
   // return res.end('<h1>Express is up for codial!!</h1>')
  // console.log(req.cookies);
  // res.cookie('user_id',12);
  // return res.render('home',{
  //     title:"HOvME"

  //populate the user of which post
   Post.find({})
   .populate('user')
   .populate({
       path:'comments',
       populate:{
           path:'user'
       }
   })
   .exec(function(err,posts){
       return res.render('home',   {
           title:"Codial|Home",
           posts:posts
       } )
   })
}