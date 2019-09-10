const express=require('express');
const mongoose=require('mongoose');
const {Campground, validation}=require('../models/campgrounds');
const {User}=require('../models/users');
const auth=require('../middleware/auth');

const router=express.Router();

router.get('/', async(req,res)=>{
	const campgrounds=await Campground.find();
	res.render("campgrounds",{campgrounds:campgrounds});
});

router.post('/', auth,async(req,res)=>{
	const {error}=validation(req.body);
	if(error) return res.status(400).send(req.flash('error',error.details[0].message));

	const user=await User.findOne(new mongoose.Types.ObjectId(req.user._id));

	const r=Math.random().toString(36).substring(6);
	
	const campground=new Campground({
		name:req.body.name,
		image:req.body.image,
		description: req.body.description,
		author:{
			_id:new mongoose.Types.ObjectId(req.user._id), 
			name:user.name, 
			username: r+user.username
		}
	});


	await campground.save();
	req.flash('success','Successfully added a new campground '+campground.name);
	res.redirect('/api/campgrounds');
});

router.get('/new', auth,(req,res)=>{
	res.render("new");
});

module.exports=router;



