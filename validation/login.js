const Validator = require('validator')

module.exports = (data) => {
	let errors = {}

	if(Validator.isEmpty(data.email)){
		errors.email = 'email is empty'
	}

	if(!Validator.isEmail(data.email)){
		errors.email = 'email is invalid'		
	}

	if(Validator.isEmpty(data.password)){
		errors.password = 'password is empty'
	}

	if(!Validator.isLength(data.password,{min:6,max:30})){
		errors.password = "password length is not valid, must be between 6-30"
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0 
	}
}