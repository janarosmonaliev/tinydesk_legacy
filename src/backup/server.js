const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const User = require('./user');


mongoose.connect("mongodb+srv://fabio:ZeN84312632@commandtbackend.4toiz.mongodb.net/commandTBackupDev?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
() => {
    console.log("Mongoose Is Connected!");
    }
);

// Some necessary code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:8000", // gatsby localhost location
    credentials: true
}));


// Create a cookie
app.use(session({
    secret: "unicorncookie",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser("unicorncode"));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// Routes
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err,user,info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, err=> {
                if (err) throw err;
                res.send('Successfully Authenticated');
                console.log(req.user);
            });
        }
    })(req, res, next);
});

app.post("/signup", (req, res) => {
    User.findOne({email: req.body.email}, async (err,doc) => {
        if (err) throw err;
        if (doc) res.send("user Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                location: req.body.location,
            });
            await newUser.save();
            res.send("User Created");
        }
    })
});


// This code starts the express server
app.listen(4000, () => {
    console.log('Server started successfully');
})