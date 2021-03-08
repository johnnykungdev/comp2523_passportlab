const express = require('express')
const githubAuthRouter = new express.Router()
const passport = require('../middleware/passport_github')
const { insertUser, getUserById } = require('../controllers/userController')


githubAuthRouter.get('/login', passport.authenticate('github'));

githubAuthRouter.get('/login/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("github callback", req.user)
    const userId = req.user.id
    console.log(userId)
    if (!getUserById(userId)) {
        const newUser = {
            id: req.user.id,
            name: req.user.displayName,
            email: req.user._json.email,
            accessLevel: "user"
        }
        insertUser(newUser)
        req.accessLevel = "user"
    }

    // Successful authentication, redirect home.
    res.redirect('/dashboard')
});

module.exports = githubAuthRouter