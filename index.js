const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const chats = require("./data/data")
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('./config/connection')
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const path = require('path');
require('dotenv').config();

//view engin setup
app.set('view engine','ejs');
app.use(express.json()); //to accept JSON Data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'))
app.use(cors())

app.get('/',(req,res)=> {
    res.send("Api is running successfully");
});
// app.get('/api/chat',(req,res)=> {
//     res.send(chats)
// console.log(chats);
// })
// app.get('/api/chat/:id',(req,res)=> {
//   const singleChat = chats.find((c) => c._id === req.params.id);
//   res.send(singleChat);
// })

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);


const PORT =   process.env.PORT || 5000
app.listen(5000, console.log(`Server started on port ${PORT}`))