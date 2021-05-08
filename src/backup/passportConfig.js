const User = require('./user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

    passport.use(
        new localStrategy((email, password, done) => {
            User.findOne({email: email}, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                console.log("1");
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        console.log("2");
                        return done(null, user);                        
                    }
                    else {
                        console.log("3");
                        return done(null, false);
                    }
                });
            });
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id}, (err, user) => {
            cb(err, user);
        });
    });
};