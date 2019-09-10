const mongoose=require('mongoose');
const express=require('express');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const config=require('config');
const methodOverride=require('method-override');
const flash=require('connect-flash');
const campgrounds=require('./routes/campgrounds');
const aboutposts=require('./routes/aboutposts');
const users=require('./routes/users');
const auth=require('./routes/auth');
const {User}=require('./models/users');
const logout=require('./routes/logout');
const userToken=require('./middleware/userToken');

mongoose.connect('mongodb://localhost/Yelpcamp',{ useNewUrlParser: true })
	.then(()=>console.log('Connected to database..'))
	.catch(err=>console.error('Could not connected to database',err));

const app=express();

app.use(require('express-session')({
	secret: config.get('privateKey'),
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());
app.use(userToken)
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/campgrounds',campgrounds);
app.use('/api/aboutposts',aboutposts);
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/logout',logout);

const port=process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening port ${port}...`));