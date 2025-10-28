import express, { application } from 'express';
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
        //Reset the password
        req.body.password = hashedPassword
        //Create the User
        const createdUser = await User.create (req.body);
        console.log ('The newly create user is ', createdUser);
        res.redirect('/auth/sign-in')

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

//Find the user and sign him in
router.post ('/sign-in', async (req,res)=>{

    try {
        const username =req.body.username
        const password = req.body.password
        
        const existingUser = await User.findOne({username:username})
        const validPassword = bcrypt.compareSync(password, existingUser.password)
        console.log(`Sign in password is ${password}`)
        console.log(`Saved hashed password is `, existingUser.password)
        console.log(`validePassword status is ${validPassword}`)

        if (!validPassword) {return res.send('Login failed on password check.')}
        //Update the session store, before the user is signed in, for the cookie to be generated and sent back to the client
        req.session.user  ={
            _id: existingUser._id,
            username: existingUser.username
        }
        res.redirect('/')
        
        await console.log('The user name exists')
        
    } catch (error) {
        console.error(error)
        return res.send('Login failed. Please try again')

    }

})
export default router