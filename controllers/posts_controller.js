const Post= require('../models/post');
const Comment = require('../models/comments');
module.exports.create =function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            req.flash('error','err')
            return res.redirect('back');
        }
        
        req.flash('success','post published!!')
        return res.redirect('back');
    })
}

// destry'
module.exports.destroy =async function(req,res){
    try{

  let post=await Post.findById(req.params.id);
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

          await  Comment.deleteMany({post:req.params.id});
          req.flash('success','post and associated commets deleted!!')
          return res.redirect('back');
        }else{
            req.flash('error','you cannot delete this post')
            return res.redirect('back');
        }
    }catch(err){
       req.flash('error',err);
        return res.redirect('back');
    }
    
}