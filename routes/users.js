const mongoose=require('mongoose');
const express=require('express');
const passport=require('passport');
const {User,userValidation}=require('../models/users');

const router=express.Router();

router.route('/')
	.get((req,res)=>{
		res.render("register");
	})
	.post(async(req,res)=>{
		const {error}=userValidation(req.body);
		if(error) return res.status(400).send(error.details[0].message);

		let user= await User.findOne({username:req.body.username});
		if(user){
			req.flash('error','User already exist');
			return res.render("register");
		}
		user= new User({
			name: req.body.name,
			username: req.body.username
		});

		User.register(user,req.body.password,function(err,user){
			if(err){
				return res.render("register");
			}
			passport.authenticate("local")(req,res,()=>{
				req.flash('success','Welcome to Yelpcamp '+user.name);
				res.redirect('/api/campgrounds');
			});
		});
	});


module.exports=router;