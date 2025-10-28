import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//Routes

//Create a sign-up form (GET)
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

//Get a user object (POST)
router.post('/sign-up', async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        //Check that the password match each other
        if (password !== confirmPassword) {return res.status(400).send('Passwords not match')} else {console.log ('The passwords matched')}

        //Check is the username is already in the database
        const userNameInDatabase = await User.findOne({ username: username });     
        if (userNameInDatabase) {return res.status(400).send('Username already taken')} else {console.log ('The username is still available')};

        //Check if the email is already inthe database
        const emailInDatabase = await User.findOne({email: email});
        if(emailInDatabase) {return res.status (400).send('Email is already taken')} else {console.log('The email is still available')}

        //Before creating the user, hash the password
        const hashedPassword = bcrypt.hashSync(password,12);
        console.log(`The hashed password is ${hashedPassword}`)

        //Create the User
        const createdUser = await User.create (req.body);
        console.log ('The newly create user is ', createdUser);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong. Please try again later.')
    }

    // res.send('You have submitted a form')
})

//Create a sign-in form (GET)
router.get ('/sign-in', async (req, res) =>{
    res.render ('auth/sign-in.ejs')
})



export default router