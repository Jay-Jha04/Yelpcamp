const express=require('express');

const router=express.Router();

router.get('/', async(req,res)=>{
	req.logout();
	req.flash('success','Successfully logged out..');
	res.redirect('/api/campgrounds');
});

module.exports=router;