const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');


router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await new User({ username: username, email: email });
        const registered = await User.register(user, password);
        req.login(registered, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome');
            res.redirect('/campgrounds');
        })

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    if(req.session.returnTo) {
    return res.redirect(req.session.returnTo);
    } else res.redirect('/campgrounds');
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
})

module.exports = router;