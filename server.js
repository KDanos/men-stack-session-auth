import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import methodOverride from 'method-override';
import mongoose from 'mongoose';

import User from './model/user.js'

//Create the app
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static('public'));

//Routes
app.get ('/', (req, res) => {
    res.render('index.ejs')
})

//Connections
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('You have succesfully connected to the database')
    } catch (error) {
        console.log('You have failed to connect to the database')
    }
    app.listen(3000, () => { 'we are listening on part 3000' });
}

//Start the application
connect();