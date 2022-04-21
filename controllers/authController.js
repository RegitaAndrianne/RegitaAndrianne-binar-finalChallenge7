// controllers/authController.js
const passport = require('../lib/passport' )
const { User } = require('../models' )


module.exports = {
    registerPage: (_, res) => {
        res.render('register')
    },

    register: async (req, res, next) => {
        try {
            await User.register({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            res.redirect('login');
        } catch(err) {
            next(err);
        }
    },

    loginPage: (_, res) => {
        res.render('login')
    },

    login: passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/login',
        failureFlash: true
    }),


    logout: (req, res) => {
        req.logout();
        res.redirect('/home')
    },
};