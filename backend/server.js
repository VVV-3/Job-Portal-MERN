const express = require('express');
const app = express();
const mongoose = require('mongoose');


//Connecting to MongoBD
const uri = 'mongodb+srv://user123:user123@cluster0.6a9ks.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } ,() => console.log('Connected to DB!'))




app.listen(3000, () => console.log('Connectedd to Port successfully!'));