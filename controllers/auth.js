import express from 'express';
import User from '../models/user.js'
import mongoose from 'mongoose';

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

        console.log(`The password is ${password}`)
        console.log (`The confirm password is ${confirmPassword}`)
        //Check that the password match each other
        if(password!==confirmPassword){return res.status(400).send('Passwords not match')};

        //Check is the username is already in the database
        const userNameInDatabase = User.findOne ({username:username})
        if (userNameInDatabaseInDatabase ret)

    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong. Please try again later.')
    }

    // res.send('You have submitted a form')
})


export default router