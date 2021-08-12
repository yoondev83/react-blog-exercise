require("dotenv").config();
const express   =   require ("express");
const app       =   express();
const mongoose  =   require("mongoose");
const config    =   require("./config/key");
const session   =   require("express-session");
const passport  =   require("./config/passport");
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("DB is connected")).catch(err=> console.log(err));
mongoose.set("useCreateIndex", true);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1)
app.use(session({
    secret: config.PASS_SECRET,
    resave: false,
    saveUninitialized: false
}));    


app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/main'));


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server has started on ${port}`));