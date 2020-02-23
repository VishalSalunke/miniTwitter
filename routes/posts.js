const router = require('express').Router()
const passport = require('passport')
const Post = require('../models/Post')


router.route('/add')
		.post( passport.authenticate('jwt', {session: false}), (req,res) => {
				const text = req.body.text.trim()
				
				const newPost = new Post({
						user : {
							id : req.user.id,
							username : req.user.username
						},
						text 
				})

				newPost.save()
					.then(post=> res.json(post))
					.catch(e=> console.log(e))
				
})

router.route('/insertcomment')
	.post( 
			passport.authenticate('jwt', { session : false}),
			(req,res) => {				
				const comment = req.body.comment.trim()

				Post.findOneAndUpdate(
					{_id : req.body.id},
					{ $push : { comments : {
											user : req.user,
											comment : comment
											}
							  }
			        },
			        {new: true}
				)
				.then(post => res.json(post))
				.catch(e => console.log(e))
})

router.route('/delete/:id')
	.delete(
			passport.authenticate('jwt', { session : false}),
			(req,res) => {
				console.log(req.params)	
				Post.findOneAndRemove(
						{ _id : req.params.id}
					)
					.then( post => res.json(post))
					.catch(e => console.log(e))
})	

router.route('/')
		.get((req,res)=>{
			 Post.find()
			 	 .sort({createdAt : -1})
			 	 .then(posts => {
			 	 	res.json(posts)
			 	 })
			 	 .catch(e => {console.log(e)})
})

router.route('/following')
		.get(passport.authenticate('jwt', { session : false}),	
			(req,res) => {
				console.log(req.user)
				Post.find({
					'user.id' : { $in : req.user.following }
				})
				.sort({ createdAt : -1 })
				.then(posts => {
					res.json(posts)
				})
				.catch(e => console.log(e))
})		


router.route('/:userId')
		.get((req,res) => {
			Post.find({ 'user.id' : req.params.userId})
				.sort({createdAt : -1})
				.then(posts => res.json(posts))
				.catch(e => console.log(e))
		})


module.exports = router