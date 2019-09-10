const mongoose=require('mongoose');
const Joi=require('Joi');
const {commentSchema}=require('./comments');
Joi.objectId=require('joi-objectId')(Joi);

const Campground=mongoose.model('Campground',new mongoose.Schema({
	name:{
		type:String,
		required: true,
		minlength: 3
	},
	image:{
		type: String,
		required: true,
		minlength:5
	},
	description:{
		type: String,
		required:true,
	},
	author:{
		type: new mongoose.Schema({
			name:{
				type: String,
				required:true
			},
			username:{
				type:String,
				required: true
			}
		}),
		required: true
	},
	comments:{
		type: [commentSchema],
	}

}));

function validation(campground){
	const schema={
		name:Joi.string().min(3).required(),
		image:Joi.string().min(5).required(),
		description: Joi.string().required(),
		comments: Joi.objectId()
	}

	return Joi.validate(campground,schema);
}

exports.Campground=Campground;
exports.validation=validation;