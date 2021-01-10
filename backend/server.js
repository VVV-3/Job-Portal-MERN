const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Connecting to MongoBD
const uri = 'mongodb+srv://user123:user123@cluster0.6a9ks.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } ,() => console.log('Connected to DB!'))

//Creating Routes
const registerRoute = require('./routes/public/Register')


//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/register', registerRoute)


app.listen(3000, () => console.log('Connected to Port successfully!'));