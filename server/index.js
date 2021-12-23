//starting point of server application
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
// const dotenv = require("dotenv");

dotenv.config();
const app = express(); // all every express application hrs initialize app - can use diff method for all instance

/*use express middleware to connect to application we have to do 
    1st param: starting path of all routes inside posts.js, 2nd param: set routes
    what it does: every routes in postroutes is gon start with posts
    see more info/ex on posts.js (1)
*/


//set bodyParser so can send request
app.use(bodyParser.json({limit:"30mb", extended: true})); // if we send img
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));

app.use(cors()); //hrs diatasnya postRoutes klo g diblock sama cors


app.use('/posts', postRoutes);

app.get('/', (req, res) => {    //greeting route, as soon as someone comes to our application, see when we go to actually deployed version
    res.send('Hello to memories API');
});

const PORT = process.env.PORT || 5000;

//connect server to database - use mongodb, the cloud atlas
//2nd param not required tpi better have it
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)) ) // a promise - klo connection successful, also 2nd param of listen, a callback func ran after successful listening
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndMondify', false); // no warning in console

