const mongoose=require('mongoose');
const express=require('express');
const {Campground, validation} =require('../models/campgrounds');
const {Comment}=require('../models/comments');
const auth=require('../middleware/auth');
const permission=require('../middleware/permission');

const router=express.Router();

router.get('/:id', async(req,res)=>{
	const post=await Campground.findById(new mongoose.Types.ObjectId(req.params.id));
	if(!post) return res.status(404).send('Invalid Id...'); 

	res.render("./aboutposts/aboutposts",{post:post}); 
});

router.put('/:id', auth,async(req,res)=>{
	const post=await Campground.findById(new mongoose.Types.ObjectId(req.params.id));
	if(!post) return res.status(404).send('Invalid Id....');

	const comment=new Comment({
		author: req.body.author,
		text:req.body.text
	});
	
	await comment.save();

	post.comments.push(comment);

	await post.save();
	res.redirect('/api/aboutposts/'+post.id);
});

router.get('/:id/edit',permission,async(req,res)=>{
	const campground= await Campground.findById(new mongoose.Types.ObjectId(req.params.id)); 
	res.render('./aboutposts/edit', {campground: campground});
});

router.put('/:id/edit',permission,async(req,res)=>{
	const campground= await Campground.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id),{
		$set:{
			name:req.body.name,
			image:req.body.image,
			description: req.body.description
		}
	},{new: true});

	await campground.save();
	res.redirect('/api/aboutposts/'+campground.id);
});

router.delete('/:id', permission,async(req,res)=>{
	const campground= await Campground.findByIdAndRemove(new mongoose.Types.ObjectId(req.params.id));

	if(!campground) return res.status(400).send('Bad Request...');

	req.flash('success',campground.name+' deleted successfully..');
	res.redirect('/api/campgrounds');

});



module.exports=router;