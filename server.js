import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import session from 'express-session'

import authRouter from './controllers/auth.js'

//Create the app
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:true,
}))

//Routes
app.get ('/', async (req, res) => {
    res.render('index.ejs',{
        user:req.session.user,
    })
})


//1. Request hits our server, passes through the middleware and gets to this line
//2. At this point, because we used app.use(...) it ignores the HTTP verb (GET, POST)
//3. It simply checks wheteher the path of the request starts with '/auth'
//4. If it does, it checks whether the router has any matching routes apended to it
app.use('/auth', authRouter);

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