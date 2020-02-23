import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

import PersonIcon from '@material-ui/icons/Person';
import AddCommentIcon from '@material-ui/icons/AddComment';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { connect } from 'react-redux'
import { addComment, getPosts, deletePost } from '../../actions/postActions'

const styles = {
	paper : {
		padding : 10,
		display : 'flex',
		marginBottom : 5
	},
	avatar : {
		minWidth : 10,
		margin : '4px 10px 4px 4px'
	},
	username : {
		marginBottom : 5
	},
	time : {
		marginLeft : 10,
		color : '#bbb',
		fontSize : 14
	},
	Button : {
		width : '100%',
		marginTop : 20,
		marginBottom : 10,
		backgroundColor : '#4B0082',
		color : '#fff',
		'&:hover' : {
			color : '#800080'
		}
	},
	commentParentBox : {
		display : 'flex',
		marginTop : 5
	},
	commentsLable : {
		fontSize : 13,
		cursor: 'pointer',
		fontFamily: 'Times New Roman", Times, serif',
		fontStyle: 'italic',
		color : '#8000ff',
		margin : 10,
		marginTop : 1
	},
	commentBox : {
		padding : 7,
		display : 'flex',
		flexWrap: 'wrap'
	},
	comment : {
		flex: '0 0 100%',
		marginTop: 2,
		marginBottom : 5
	},
	textField : {
		width : '100%'
	}

}

class Post extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			showComments : false,
			addComment : false,
			newComment : ''
		}
	}

	handleChange = (e) => {
			this.setState({ [e.target.name] : e.target.value})
	}

	hadleSubmit = (e) => {
		e.preventDefault()
		const commentData = {
				comment : this.state.newComment,
				id : this.props.post._id
		}
		
		this.props.addComment(commentData)
		this.setState({ addComment : !this.state.addComment, showComments : true})
		this.props.postRefresh()		
	}

	deletePost = (id) => {
		this.props.deletePost(id)
		console.log(`deletePost post id ${id}`)
		this.props.postRefresh()
	}

	render(){
		const { classes, post, user } = this.props
		const { addComment, showComments } = this.state
		const { comments } = post 

		return(
				<Paper  className={classes.paper}> 
					<div
						className={classes.avatar}
						style={{
							backgroundColor : `#${post.user.id.slice(post.user.id.length - 3)}`
						}}
					/>
					<div>
						<h3 className={classes.username}> 
								<Link to={`/profile/${post.user.id}`}>{post.user.username}</Link>
							<span className={classes.time}> { (new Date(post.createdAt)).toLocaleString()	}</span>
							
							{
								post.user.id === user._id									
								  ?			<DeleteIcon
						    					style={{cursor : 'pointer' , paddingLeft: '10px' }}	
										    	fontSize='small'
										    	onClick={()=>{
									    			this.deletePost(post._id)
						    					}}
						     				/>
									: console.log("render post")	
							}							
							
						</h3>
						{post.text}
						<div className={classes.commentParentBox}> 
							<AddCommentIcon 
								style={{cursor : 'pointer' , marginTop: 8}}						
								onClick={() =>{
									this.setState({ addComment : ! addComment})
								}}
							/>
							<div className={classes.commentsLable}
									 onClick={()=> {									 	
									 	if(comments.length <  1) {
									 		return
									 	}else{
									 		this.setState({ showComments : ! showComments	})	
									 	}
									 	
									 }}	
							>
							comments <span>
							 			{ this.state.showComments
							 			   ?  <ArrowUpwardIcon fontSize="small"/>
							 			   :  <ArrowDownwardIcon fontSize="small" />
							 			} 
							  		</span>
						    </div>

						</div>    
							{
								this.state.addComment && 
									<div>					
										<TextField 
											name="newComment"
											className={classes.textField}
											multiline
											rowsMax="4"
											label="Add comment"
											onChange={this.handleChange}
											value={this.state.comment}
										/>
										<Button 
											variant="outlined" 
											className={classes.Button}
											onClick={this.hadleSubmit}
										>
										post comment
										</Button>
									</div>
							}

							{
							   this.state.showComments && comments &&
							   comments.map((item) => {
							   		let random = Math.random()
							   		return(
							   			<Paper key={`${item.user.email}-${random}`} className={classes.commentBox}>
											<div className={classes.comment}> 
												<div>
													<PersonIcon 
												 		 style={{marginTop: 8}}
												/> 
												<span 
												    style={{ 
												    	fontWeight : 'bold',
												    	marginLeft : 5,
												    	color : 'chocolate'	,
														fontFamily: 'Lobster'												    	
												    }}> { item.user.username }</span>
												</div>																				
												<div
													style={{ marginTop : 5 ,
															 fontFamily : 'Verdana, Geneva, sans-serif',
															 fontStyle : 'italic',
															 marginLeft : 10
															}}
												>  { item.comment } </div>									
											</div>
										</Paper>
							   			)
							   })
							}									
					</div>
				</Paper>
			)
	}
}

const  mapStateToProps = (state) => ({
	comment : state.post.comments,
	user : state.auth.user
})
export default  connect(mapStateToProps, { addComment, getPosts, deletePost })(withStyles(styles)(Post))