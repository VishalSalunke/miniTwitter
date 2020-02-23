import React from 'react'
import MadeWithLove from 'react-made-with-love'
import { withStyles } from '@material-ui/core/styles'

const styles = {
	root : {
		textAlign : 'center',
		marginTop : 20
	}
}
const Footer = ({ classes }) => {
		return (
					<div className={ classes.root}>
						<MadeWithLove 
							by="Vishal Salunke"							
							link="https://vishalsalunke.github.io/Myportfolio"
						/>
					</div>
				)	
}

export default withStyles(styles)(Footer)