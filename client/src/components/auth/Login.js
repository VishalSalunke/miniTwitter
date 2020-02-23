import React, {Component} from 'react'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { loginUser }  from '../../actions/authActions'
import { withRouter } from 'react-router-dom'


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

class Login extends Component {
	constructor(props){
		super(props)

		this.state = {
				email : '',
				password : '',
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
		
		if(nextProps.auth.isAuthenticated){
			console.log("set history")
			this.props.history.push('/')	
		}
	}

	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push('/')
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const userData = {
				email : this.state.email,
				password : this.state.password
		}	
		this.props.loginUser(userData)
		
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
								name='password'
								type='password'
								label='Password'
								className={classes.textFields}
								value={this.state.password}
								onChange={this.handleChange}
								helperText={errors.password ? errors.password : ''}
								error={errors.password ? true : false }
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

const mapStatetoProps = (state) => ({
		errors : state.errors,
		auth : state.auth
})

export default connect(mapStatetoProps,{ loginUser })(withRouter(withStyles(styles)(Login)))