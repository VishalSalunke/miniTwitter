import React, { useEffect} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getPostByUSer, getUserProfile,
		 followUser, unFollowUser,
		 refreshUserProfile } from '../../actions/profileActions'
import Post from '../posts/Post'
import LoadingPosts from '../posts/loadingPosts'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const styles = {
	paper : {
		padding : 10
	},
	detailsBlock : {
		display : 'flex'
	},
	username : {

	},
	email : {
		color : '#888',
		marginBottom : 10
	},
	detail : {
		marginRight : 5,
		fontWeight : 'bold'
	},
	detailTitle : {
		marginLeft : 3,
		textTransform : 'uppercase',
		fontSize : 11,
		fontWeight : 'normal'
	},
	FollowBtnBlock : {
		width : '100%',
		textAlign : 'right'
	},
	FollowBtn : {
		backgroundColor : '#9400D3',
		color : 'white',
		'&:hover' : {
			color : 'black',
			borderColor : '#9400D3'
		}
	}

}

const Profile = (props) => {

	const { classes,
			getPostByUSer,
			getUserProfile,
			loadingPosts,
			loadingProfile,
			list,
			auth,
			user,
			profile,
			match,
			followUser,
			unFollowUser,
			refreshUserProfile
			   } = props

	useEffect(() => {
		getPostByUSer(match.params.userId)
		getUserProfile(match.params.userId)
	}, [])	

	useEffect(() =>{
		refreshUserProfile(match.params.userId)
	},[user])

	const handleFollowUser = () => {
		followUser(match.params.userId)
	}	   

	const handleUnFollowUser = () => {
		unFollowUser(match.params.userId)
	}

	let followBtn
	if(auth.isAuthenticated){
		if(user.following.indexOf(match.params.userId) === -1){
			followBtn = (
						<div className={classes.FollowBtnBlock}>
								<Button className={classes.FollowBtn}
										variant="outlined"
										onClick= {handleFollowUser}
								> Follow 
								</Button>
						</div>
			)	
		}else {
			followBtn = (
						<div className={classes.FollowBtnBlock}>
								<Button className={classes.FollowBtn}
										variant="outlined"
										onClick={handleUnFollowUser}
								> Unfollow 
								</Button>
						</div>
			)	
		}
		
	}
	let items; 
	items = list && list.map( el => <Post key={el._id} post={el} />)
	let profileInfo

	if(profile && items){
		profileInfo = (
				<Paper className={classes.paper}>
						<h1 className={classes.username}> {profile.username }</h1>
						<div className={classes.email}>{profile.email} </div>
						<div className={ classes.detailsBlock }>
							<div className={ classes.detail}>
								{ items.length }
								<span className={ classes.detailTitle}>posts</span>
							</div>
							<div className={classes.detail}>
								{ profile.followers.length }
								<span className={ classes.detailTitle}>followers</span>
							</div>
							<div className={classes.detail}>
								{ profile.following.length }
								<span className={ classes.detailTitle}>following</span>
							</div>
								{ followBtn }
						</div>
				</Paper>
			)
	}
	return (
			<div>
					{ loadingProfile ? <div>Loading profiles</div> : profileInfo }
					{loadingPosts ? <LoadingPosts /> : items}
					
			</div>
		)
}

const mapStateToProps = (state) => ({
		loadingPosts : state.post.loading,
		list : state.post.list,
		profile : state.profile.user,
		loadingProfile : state.profile.loading,
		auth : state.auth,
		user : state.auth.user
})

export default connect(mapStateToProps,
						 { getPostByUSer, getUserProfile, 
						 	followUser, unFollowUser, refreshUserProfile 
						 })(withStyles(styles)(Profile))