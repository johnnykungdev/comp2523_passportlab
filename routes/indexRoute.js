const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const passport = require('passport')

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log(req.accessLevel)
  const accessLevel = req.accessLevel
  console.log(passport.session())
  if (accessLevel === 'admin') {
    const activeSessions = []
    console.log(req.sessionStore)
    for (let sessionID in req.sessionStore.sessions) {
      const sessionObject = JSON.parse(req.sessionStore.sessions[sessionID])
      console.log(sessionObject)
      const activeSession = {
        sessionID,
        userID: sessionObject.passport.user
      }
      activeSessions.push(activeSession)
    }
    console.log(activeSessions)
    res.render("adminDashboard", {
      user: req.user,
      activeSessions
    })
  } else {
    res.render("dashboard", {
      user: req.user,
    });
  }
});

router.post('/user', function(req, res) {
  console.log(req.body);
  const sessionID = req.body.sessionID
  delete req.sessionStore.sessions[sessionID]
  res.redirect('/dashboard')
})

module.exports = router;
