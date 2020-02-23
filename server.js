const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const users = require('./routes/user')
const cors = require('cors')
const passport = require('passport')
const posts = require('./routes/posts')
const path = require('path')



dotenv.config()

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users',users)
app.use('/api/posts',posts)

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/buid'))

	app.get('*', (req,res)=>{
		console.log("++++++++++++++++++++   handle route +++++++++++++++++++++++++++++");
		console.log(req)
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) //relative path
	})
}


const PORT = process.env.PORT || 3000 ;
app.listen(PORT, ()=>{
	console.log(`server is running on ${PORT}`)
})