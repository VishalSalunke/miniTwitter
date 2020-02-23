import React from 'react'
import { connect } from 'react-redux' 
import ListPost from './posts/ListPost'
import Login from './auth/Login'

class Home extends React.Component {

	render (){
		const { isAuthenticated } = this.props
		return(
				<div>
					{ isAuthenticated ? <ListPost /> : <Login />}
				</div>
			)
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home)