const Validator = require('validator')

module.exports = (data) => {
	let errors = {}

	if(Validator.isEmpty(data.email)){
		errors.email = 'email is empty'
	}

	if(!Validator.isEmail(data.email)){
		errors.email = 'email is invalid'		
	}

	if(Validator.isEmpty(data.username)){
		errors.username = 'username is empty'
	}

	if(!Validator.isLength(data.username,{min:4,max:30})){
		errors.username = "username length is not valid, must be between 4-30"
	}

	if(Validator.isEmpty(data.password)){
		errors.password = 'password is empty'
	}

	if(!Validator.isLength(data.password,{min:6,max:30})){
		errors.password = "password length is not valid, must be between 6-30"
	}

	if(Validator.isEmpty(data.password2)){
		errors.password2 = 'confirm password is empty,must be between 6-30'
	}

	if(!Validator.isLength(data.password2,{min:6,max:30})){
		errors.password2 = "confirm password length is not valid"
	}

	if(!Validator.equals(data.password,data.password2)){
		errors.password2 = "password did not match"
	}

	return {
		errors,
		isValid: Object.keys(errors).length ===0 
	}
}