const express=require('express');
const ejs=require('ejs');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const expressSession=require('express-session');
const morgan = require('morgan');
const route = require('./routes');
const app =express();
const db = require('./config/db');
const fileUpload=require('express-fileupload')

db.connect();

app.use(fileUpload())
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(morgan('combined'));
app.use(expressSession({
    secret: 'keyboard cat'
}));

// global.loggedIn=null;
// app.use("*",(req,res,next)=>{
//     loggedIn=req.session.user;
//     next()
// });

route(app);

// app.get('/', (req, res) => {
//     res.render('home');
// });

app.listen(3000,()=>{
    console.log("App listening at http://localhost:3000")
})



/*
app.get('/login',loginController)
app.post('/login',loginUserController)
app.get('/',homeController)
app.get('/register',registerController)

app.post('/register',storeUserController)

app.get('/logout',logoutController)
*/
