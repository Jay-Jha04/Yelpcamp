const mongoose=require('mongoose');
const passport=require('passport');
const {User}=require('../models/users');
const express=require('express');

const router=express.Router();

router.get('/',(req,res)=>{
	res.render("login");	
});

router.post('/', passport.authenticate("local",{
	successRedirect: "/api/campgrounds",
	failureRedirect: "/api/auth"
}),(req,res)=>{});


module.exports=router;