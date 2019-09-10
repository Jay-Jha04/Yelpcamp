const mongoose=require('mongoose');
const {Campground}=require('../models/campgrounds');

module.exports=async function(req,res,next){
	if(req.isAuthenticated()){
		const campground= await Campground.findById(new mongoose.Types.ObjectId(req.params.id));
		if(req.user._id.equals(campground.author._id)){
			next();
		}else{
			req.flash('errror','Permission denied..');
			res.redirect('back');
		}
	}else{
		res.redirect('back');
	}
}

