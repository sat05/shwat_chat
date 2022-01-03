const express=require('express');
const app=express();

const port=8000;
const expressLayouts=require('express-ejs-layouts');
//use static files
app.use(express.static('./assets'));
app.use(expressLayouts);

//exract styles and script from the subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express router
app.use('/',require('./routes/index'));
// set up the view
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
if(err){
    //the way we have wriiten in console.log is called interpollation
    console.log(`Error in running the server:${err}`);
}
console.log(`Server is running on port:${port}`);
});