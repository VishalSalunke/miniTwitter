import React, {Component} from 'react'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {registerUser} from '../../actions/authActions'

const styles = {
		textFields : {
				width : '100%',
				marginBottom: 5
		},
		buttonBlock : {
			textAlign : 'center',
			marginBottom : 10,
			marginTop : 15
		}
}

class Register extends Component {
	constructor(props){
		super(props)

		this.state = {
				email : '',
				password : '',
				password2 : '',
				username : '',
				errors : {}
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name] : e.target.value })
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({ errors : nextProps.errors})
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const userData = {
				email : this.state.email,
				password : this.state.password,
				username : this.state.username,
				password2 : this.state.password2
		}	
		this.props.registerUser(userData, this.props.history)
	}

	render(){
		const { classes } = this.props
		const { errors } = this.state
		return(
				<Paper style={ {padding: 15 }}>
						<form onSubmit={this.handleSubmit}>
							<TextField 
								name='email'
								type='email'
								label='Email'
								className={classes.textFields}
								value={this.state.email}
								onChange={this.handleChange}
								helperText={errors.email ? errors.email : ''}
								error={errors.email ? true : false }
							/>
							<TextField 
								name='username'
								type='txet'
								label='username'
								className={classes.textFields}
								value={this.state.username}
								onChange={this.handleChange}
								helperText={errors.username ? errors.username : ''}
								error={errors.username ? true : false }

							/>
							<TextField
								name='password'
								type='password'
								label='Password'
								className={classes.textFields}
								value={this.state.password}
								onChange={this.handleChange}
								helperText={errors.password ? errors.password : ''}
								error={errors.password ? true : false }
							 />
							 <TextField
								name='password2'
								type='password'
								label='Repeat Password'
								className={classes.textFields}
								value={this.state.password2}
								onChange={this.handleChange}
								helperText={errors.password2 ? errors.password2 : ''}
								error={errors.password2 ? true : false }
							 />
							 <div className={classes.buttonBlock}>	
								<Button variant="outlined" type="submit">
									Submit
								</Button>
							</div>
						</form>
				</Paper>
			)
	}
}

const mapStateToProps = (state) => ({
	errors : state.errors
})


export default connect(mapStateToProps, {registerUser}) (withRouter(withStyles(styles)(Register)))