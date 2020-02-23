import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreVert from '@material-ui/icons/MoreVert'

import { logoutUser } from '../../actions/authActions'

const styles = {
	root : {
		flexGrow: 1
	},
	logo : {
		color: "#fff",
		fontSize: 30
	},
	space : {
		justifyContent : 'space-between'
	}
}

class Header extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			anchorEl : null
		}		
	}

	handleMenu = (event) => {
		this.setState({ anchorEl : event.currentTarget });
	} 

	handleClose = (event) => {
		this.setState({ anchorEl : null})
	}

	handleLogout = () => {
		this.setState({anchorEl: null})
		this.props.logoutUser()
		this.props.history && this.props.history.push('/login')
	}

	render(){
			  const { classes, isAuthenticated, user } = this.props	
			  const { anchorEl } = this.state
			  const open = Boolean(anchorEl)

			  const guestLinks = (
			  		<div>
			  			<IconButton
			  				aria-owns={ open ? 'menu' : undefined}
			  				aria-haspopup="true"
			  				color="inherit"
			  				onClick={this.handleMenu}			  				
			  			>
			  				<MoreVert />
			  			</IconButton>
			  			<Menu
			  				id="menu"
			  			 	open={open}
			  			 	anchorEl={anchorEl}
			  			 	anchorOrigin={{
			  			 		vertical: 'top',
			  			 		horizontal: 'right',
			  			 	}}
			  			 	transformOrigin={{
			  			 		vertical: 'top',
			  			 		horizontal: 'right'
			  			 	}}	
			  			 	onClose={this.handleClose}
			  			>
			  				 <MenuItem onClick={this.handleClose}> 
			  				 	<Link to="/login"> Login </Link>
			  				 </MenuItem>	
			  				 <MenuItem onClick={this.handleClose}> 
			  				 	<Link to="/register"> Register</Link>
			  				 </MenuItem>
			  			</Menu>
			  		</div>	
			  	)

			  const authLinks =  isAuthenticated && (
			  		<div>
			  			<IconButton
			  				aria-owns={ open ? 'menu' : undefined}
			  				aria-haspopup="true"
			  				color="inherit"
			  				onClick={this.handleMenu}			  				
			  			>
			  				<AccountCircle />
			  			</IconButton>

			  			Hello<span style={{ fontStyle : 'italic'}}>  {user.username}</span>
			  			<Menu
			  				id="menu"
			  			 	open={open}
			  			 	anchorEl={anchorEl}
			  			 	anchorOrigin={{
			  			 		vertical: 'top',
			  			 		horizontal: 'right',
			  			 	}}
			  			 	transformOrigin={{
			  			 		vertical: 'top',
			  			 		horizontal: 'right'
			  			 	}}	
			  			 	onClose={this.handleClose}
			  			>

			  				 <MenuItem onClick={this.handleClose}> 
			  				 		<Link to={`/profile/${user._id}`} >Profile </Link>
			  				 </MenuItem>	
			  				 <MenuItem onClick={this.handleLogout}> Logout </MenuItem>
			  			</Menu>

			  		</div>
			  )
				return (
						<div className={classes.root}>
							<AppBar position="static" style={{ backgroundColor: '#4B0082'}}>
								<Toolbar className={classes.space}>
									<Link to="/" className={classes.logo}> Twitter </Link>
									{ isAuthenticated ? authLinks : guestLinks}
								</Toolbar>

							</AppBar>
						</div>

					)
			}
}

const mapStateToProps = (state) => ({
	isAuthenticated : state.auth.isAuthenticated,
	user : state.auth.user
})

export default connect(mapStateToProps, {logoutUser})(withStyles(styles)(Header))