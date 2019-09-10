const mongoose=require('mongoose');
const Joi=require('Joi');

const commentSchema = new mongoose.Schema({
	author:{ 
		type:String,
		required: true,
	},
	text:{
		type: String,
		required:true
	}
});

const Comment = mongoose.model('Comment',commentSchema);

function validation(comment){
	const schema={
		author: Joi.string().required(),
		text: Joi.string().required()
	}

	return Joi.validate(comment,schema);
}

exports.Comment=Comment;
exports.commentSchema=commentSchema;
exports.validation=validation;
