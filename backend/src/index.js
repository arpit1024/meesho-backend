const express = require("express");

const { register, login } = require("./controllers/auth.controller");
const productController = require("./controllers/product.controller");
const passport = require('./configs/passport');

const app = express();

app.use(express.json());


app.post("/register", register);
app.post("/login", login);

app.use("/products", productController);
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}),function (req,res){
    console.log(req.profile);
    return res.send(req.user);
}
);


app.get('/auth/google/failure',function (req,res){
    return res.send("failed to login");
})


module.exports = app;
