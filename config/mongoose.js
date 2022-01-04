const mongoose=require('mongoose');
console.log("mongoose is loaded");
//connect the database
mongoose.connect('mongodb://localhost/codeial_development');

//acquire the connection
const db= mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to database'));

//up and running the print the message
db.once('open',function(){
console.log("Successfully !!!!connected to the database");
})

module.exports=db;