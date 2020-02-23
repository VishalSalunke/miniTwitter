import axios from 'axios'

import { GET_POSTS, LOADING_POSTS,
		 GET_PROFILE, LOAD_PROFILE,
		 FOLLOW, UNFOLLOW } from '../constants'

export const getUserProfile = (userID) => dispatch => {
	dispatch(loadProfile())
	axios.get(`/api/users/${userID}`)
			.then(res => dispatch({
				type : GET_PROFILE,
				payload : res.data
			}))
			.catch(err => console.log(err))
} 	

export const refreshUserProfile = (userID) => dispatch => {
	axios.get(`/api/users/${userID}`)
			.then(res => dispatch({
				type : GET_PROFILE,
				payload : res.data
			}))
			.catch(err => console.log(err))
} 

export const  getPostByUSer = (userId) => dispatch => {
	dispatch(loadPosts())
	axios.get(`/api/posts/${userId}`)
			.then(res => dispatch({
					type : GET_POSTS,
					payload : res.data
			}))
			.catch(e => console.log(e))
}

export const followUser = (userId) => dispatch => {

	axios.post(`/api/users/follow`, {userId : userId})
			.then(res => {
					dispatch({
								type : FOLLOW,
								payload : res.data.userId
							})
			})
			.catch(e => console.log(e))
}

export const unFollowUser = (userId) => dispatch => {

	axios.post(`/api/users/unfollow`, {userId : userId})
			.then(res => dispatch({
				type : UNFOLLOW,
				payload : res.data.userId
			}))
			.catch(e => console.log(e))
}

export const loadPosts = () => {
	return {
		type : LOADING_POSTS,

	}
}

export const loadProfile = () => {
	return {
		type : LOAD_PROFILE,

	}
}