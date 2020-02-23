import axios from 'axios'
import { ADD_POST, GET_POSTS, LOADING_POSTS, ADD_COMMENT, DELETE_POST } from '../constants'

export const addPost = postData => dispatch => {
		axios.post('/api/posts/add', postData)
			  .then(res =>  dispatch({
			  		type : ADD_POST,
			  		payload :  res.data
			  }))
			  .catch(e => console.log(e))		
} 

export const addComment = commentData => dispatch => {
		axios.post('/api/posts/insertcomment', commentData)
			.then(res => dispatch({
					type : ADD_COMMENT,
					payload : res.data
			}))
			.catch(e => console.log(e))
}

export const deletePost = postId => dispatch => {
	console.log(` deleting post in action with id ${postId}`)
	const postData = { id : postId }
		axios.delete(`/api/posts/delete/${postId}`)
			.then(res => dispatch({
					type : DELETE_POST,
					payload : res.data
			}))
			.catch(e => console.log(e))	
}

export const getPosts = () => dispatch => {
	dispatch(loadPosts)
	axios.get('/api/posts')
			.then(res=> dispatch({
					type : GET_POSTS,
					payload : res.data
			}))
			.catch(e => console.log(e))
}

export const getPostByFollowingUsers = () => dispatch => {
	axios.get('/api/posts/following')
		.then(res => dispatch({
				type : GET_POSTS,
				payload : res.data
		}))
		.catch(e => console.log(e))

}

export const loadPosts = () => {
	return {
		type : LOADING_POSTS
	}
}