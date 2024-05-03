const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const cors = require('cors')
const authController = require('./controllers/authController')
const blogController = require('./controllers/blogController')
const multer = require('multer')
const app = express()
const port = process.env.PORT 
//connect db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB has started successfully'))
.catch(err => console.error('Error connecting to MongoDB:', err));
// routes
app.use('/images', express.static('public/images'))

// app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/blog', blogController)

// multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        cb(null, req.body.filename)
    }
})

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single("image"), async(req, res) => {
    return res.status(200).json({msg: "Successfully uploaded"})
})

// connect server
app.listen(port, () => console.log('Server has been started successfully'))