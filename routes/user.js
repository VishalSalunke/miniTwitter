const router = require('express').Router()
const validateRegisterInput = require('../validation/register')
const validateLogin = require('../validation/login')
const User = require('../models/user')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.route('/register')
	  .post((req,res)=>{
	  		const {isValid, errors} = validateRegisterInput(req.body)

	  		if(!isValid){
	  			return res.status(400).json(errors)
	  		}
	  		
	  		User.findOne({email : req.body.email})
	  					.then(user=>{
	  						if(user){
	  							errors.email = 'email id already exists'
	  							return res.status(400).json(errors)
	  						}

	  					bcrypt.genSalt(10,function(err,salt){
	  						bcrypt.hash(req.body.password, salt, function(err, hash){
	  							const newUser = new User({
	  								email: req.body.email,
	  								username: req.body.username,
	  								password: hash
	  							})
	  							newUser.save()
	  								 .then(newUser=>{
	  								 	res.json(newUser)
	  								 })	
	  								 .catch(error=>{
	  								 	console.log(error)
	  								 })
	  						})
	  					})	
	  						
	  					})
})	

router.route('/login')
		.post((req,res)=>{
			const {isValid, errors} = validateLogin(req.body)

			if(!isValid){
					return res.status(400).json(errors)
				}
				
				User.findOne({email : req.body.email})
						.then(user => {
							if(user){
									bcrypt.compare(req.body.password,user.password)
									.then(isMatch=>{
											if(isMatch){
												const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn : '1d'},function(err,token){
													return res.json({
														success : true,
														token : token
													})
												})	
											}else{
												errors.password = "password is invalid"
												return res.status(400).json(errors)
											}
									})
								}else{
									errors.email = "email is invalid"
									return res.status(400).json(errors)
								}						
						})			
})

router.route('/')
		.get( passport.authenticate('jwt', {session: false}), (req,res) => {
				res.json({
					_id: req.user.id,
					email: req.user.email,
					username: req.user.username,
					following: req.user.following,
					followers: req.user.followers
				})
		})

router.route('/follow')
		.post(passport.authenticate('jwt',{session : false}), (req,res) => {
			User.findOneAndUpdate({
				_id: req.user.id
			},{
				$push : { following : req.body.userId}
			},{new : true })
			.then(user => {
				User.findOneAndUpdate({
					_id : req.body.userId,

				},{
					$push : { followers : req.user.id}
				},{	new : true })
				.then(user => {
					res.json({ userId : req.body.userId})})
				.catch(err => console.log(err))
			})
			.catch(e => console.log(err))
})

router.route('/unfollow')
		.post(passport.authenticate('jwt',{session : false}), (req,res)=>{
			User.findOneAndUpdate({
				_id: req.user.id
			},{
				$pull : { following : req.body.userId}
			},{
				new : true
			})
			.then(user => {
				User.findOneAndUpdate({
					_id : req.body.userId,

				},{
					$pull : { followers : req.user.id}
				},{
					new : true
				})
				.then(usernameser => res.json({"userId" : req.body.userId}))
				.catch(err => console.log(err))
			})
			.catch(e => console.log(err))
})

router.route('/:id')
		.get((req,res) => {
				
				User.findById(req.params.id)
					.then(user => {
						if(user){
							return	res.json({
										_id: user.id,
										email: user.email,
										username: user.username,
										following: user.following,
										followers: user.followers
									})
						}else{
							return res.status(400).json({ "msg" : "user not found"})
						}						
					})
					.catch(e => console.log(e))
})

module.exports = router	  