import React from 'react'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'

import { addPost } from '../../actions/postActions'
const styles = {
	paper : {
		padding : 8
	},
	textField : {
		width : '100%'
	},
	Button : {
		width : '100%',
		marginTop : 20,
		marginBottom : 10,
		backgroundColor : '#800080',
		color : '#fff',
		'&:hover' : {
			color : '#800080'
		}

	}
}

class AddPost extends React.Component {
		constructor(props){
			super(props)

			this.state = {
				text : ''
			}
		}

		handleChange = (e) => {
			this.setState({ [e.target.name] : e.target.value})
		}

		hadleSunmit = (e) => {
			e.preventDefault()

			const postData = {
				 text : this.state.text
			}
			
			this.props.addPost(postData)
			this.setState({ text : ''})
		}

		render() {
			const { classes } = this.props

			return(
					<Paper className={classes.paper}>
						<TextField 
							name="text"
							className={classes.textField}
							multiline
							rowsMax="4"
							label="what's happening??"
							onChange={this.handleChange}
							value={this.state.text}
						/>
						<Button 
							variant="outlined" 
							className={classes.Button}
							onClick={this.hadleSunmit}
						>
							tweet
						</Button>
					</Paper>
				)
		}
}

export default connect(null,{addPost})(withStyles(styles)(AddPost))