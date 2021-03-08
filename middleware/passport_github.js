const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy

const githubLogin = new GitHubStrategy({
        clientID: 'Iv1.57a3747b71e3e718',
        clientSecret: process.env.GITHUB_TOKEN,
        callbackURL: 'https://5517d483cbc7.ngrok.io/auth/github/login/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
    }
)

passport.serializeUser(function(user, done) {
    done(null, user)
}) 

passport.deserializeUser(function(user, done) {
    done(null, user)
})

module.exports = passport.use(githubLogin)