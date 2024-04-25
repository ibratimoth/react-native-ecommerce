const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const  connectDB  = require('./config/db')
const testRoutes = require('./routes/testRoutes')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary')
const cors = require('cors')

//configure env
dotenv.config()

//rest object
const app = express()

//database config
connectDB();

//cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})
//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser())

//routes
app.use('/api/v1', testRoutes);
app.use('/api/v1/user', userRoutes);
//rest api
app.get('/',(req,res) => {
    res.send("<h1>Welcome to ecommerce app</h1>")
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})