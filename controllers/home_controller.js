const Post=require('../models/post')
const User= require('../models/user');
//async await tells your server that this function contains asynchronous statements, so it tells your server to wait for one 
// async statement to execute by using(await)and then move to next it helps to look code more cleaner.


module.exports.home= async function(req,res){
   
  //populate the user of which post
  //await 1
  try{
      let posts=await Post.find({})
       .populate('user')
     .populate({
       path:'comments',
       populate:{
                path:'user'
       }
   })
  // await 2
      let user= await User.find({});


        return res.render('home',{
            title:"Codial|Home",
            posts:posts,
            all_users:user
        } )
    
   }  catch(err){
    console.log("error",err);
    }

}