const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();

const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//use layouts
app.use(expressLayouts);

//exract styles and script from the subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the view
app.set('view engine','ejs');
app.set('views','./views');
// use express router
app.use('/',require('./routes/index'));
app.listen(port,function(err){
if(err){
    //the way we have wriiten in console.log is called interpollation
    console.log(`Error in running the server:${err}`);
}
console.log(`Server is running on port:${port}`);
});