import { LOADING_POSTS, ADD_POST, GET_POSTS, ADD_COMMENT, DELETE_POST } from '../constants'

const initialState = {
	list : null,
	loading : false,
	deletedPosts : null
}

export default function (state=initialState,action){
	switch(action.type){
		
		case ADD_POST :
			return {
				...state,
				list : [action.payload, ...state.list]
			} 

		case LOADING_POSTS :
			 return {
			 	...state,
			 	loading : action.payload
			 }	

		case GET_POSTS :
			 return {
			 	...state,
			 	loading : false,
			 	list : action.payload
			 }	
		case ADD_COMMENT :
			return {
				...state,
				comments : action.payload
			}
		case DELETE_POST : 
				return {
					...state,
					deletedPosts : action.payload
				}	
		default :
			return state
	}
}