const express=require('express');
const app=express();

const port=8000;

app.listen(port,function(err){
if(err){
    //the way we have wriiten in console.log is called interpollation
    console.log(`Error in running the server:${err}`);
}
console.log(`Server is running on port:${port}`);
});