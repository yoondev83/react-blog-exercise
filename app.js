const express   =   require ("express");
const app       =   express();
const mongoose  =   require("mongoose");
const {User}    = require("./model/user");
const config    =   require('./config/key');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("DB is connected")).catch(err=> console.log(err));

app.get("/", (req, res) => {
    res.send("Hii");
});

app.post('/api/users/register', (req, res) =>{
    const user = new User(req.body);
    console.log(req.body);
    user.save((err, userData) => {
        if(err) return res.json({success: false, err})
    });

});


app.listen(5000, () => console.log("Server has started on Port 5000"));