const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();

const port=8000;
const expressLayouts=require('express-ejs-layouts');

const db=require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')
const sassMiddleware = require('node-sass-middleware');
//flash messages are stored in session-cookies and are cleared on the next request
//whenever we sign-in for the first time that flash msg is sent as locals in the session cookie and then erased after that. 
const flash=require('connect-flash');
const customware=require('./config/middleware');
app.use(sassMiddleware({
src: './assets/scss',
dest: './assets/css',
debug:true,
outputStyle:'extended',
prefix:'/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
//use layouts
app.use(expressLayouts);

//exract styles and script from the subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the view
app.set('view engine','ejs');
app.set('views','./views');
/*app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));*/
app.use(session(
    {
        name : 'Meow',
        secret : 'blahsomething',
        saveUninitialized : false,
        resave : false,
        cookie : 
        {
            maxAge : (1000*60*100)
        },
        store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove : 'disabled'
        }, (err)=>
        {
            console.log(err || 'connect-mongodb setup ok');
        })
        
    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customware.setFlash);
// use express router
app.use('/',require('./routes/index'));
app.listen(port,function(err){
if(err){
    //the way we have wriiten in console.log is called interpollation
    console.log(`Error in running the server:${err}`);
}
console.log(`Server is running on port:${port}`);
});