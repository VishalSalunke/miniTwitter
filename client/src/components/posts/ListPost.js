import React from 'react'
import AddPost from './AddPost'
import Post from './Post'
import { connect } from 'react-redux'
import { getPosts, getPostByFollowingUsers } from '../../actions/postActions'
import LoadingPosts from './loadingPosts'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'


class ListPost extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			allPosts : true,
			refreshPosts : false
		}
	}

	handleSwitch = (e) => {
		this.setState({ allPosts : !this.state.allPosts})
	}

	componentDidUpdate(prevProps, prevState){
			if( prevState.allPosts !== this.state.allPosts){
					this.state.allPosts
					? this.props.getPosts() 
					: this.props.getPostByFollowingUsers()	
			}
	}

	refreshPosts = () => {
		this.props.getPosts()
		this.setState({ refreshPosts : !this.state.refreshPosts})
	}

	componentDidMount(){
		this.props.getPosts()
	}
	render(){
		const { list, loading } = this.props
		const { allPosts } = this.state
		const items = list && list.map(element=> <Post key={element._id} post={element} postRefresh={this.refreshPosts} />) 
		return(
				<div>
					<AddPost />
					<FormControlLabel
						control={
							<Switch checked={ allPosts } onClick={this.handleSwitch} />
						}
						label={ allPosts ? 'All posts' : 'Posts from following users' }
						style={ this.state.refreshPosts ?  {color : 'black'} : {color : 'red'}}
					/>
						{ loading ? <LoadingPosts /> : items}
				</div>
			)
	}
}

const mapStateToProps = (state) => ({
	list : state.post.list,
	loading : state.post.loading
})

export default connect(mapStateToProps, {getPosts, getPostByFollowingUsers})(ListPost)