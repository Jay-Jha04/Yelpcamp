const mongoose=require('mongoose');
const Joi=require('Joi');
const config=require('config');
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
	name:{
		type: String,
		required: true,
		minlength:2
	},
	username:{
		type: String,
		required:true,
		unique:true
	},
	password:{
		type: String,
		maxlength: 1025
	},
	isAdmin:{
		type: Boolean
	}
});

userSchema.plugin(passportLocalMongoose);

const User= mongoose.model('User',userSchema);


function validation(user){
	const schema={
		name: Joi.string().min(2).required(),
		username: Joi.string().min(5).required(),
		password: Joi.string().max(50)
	}

	return Joi.validate(user,schema);
}

exports.User=User;
exports.userValidation=validation;
exports.userSchema=userSchema;
