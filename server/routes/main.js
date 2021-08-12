const router = require('express').Router();
const bcrypt    =   require("bcrypt");
const saltRounds=   10;
const passport  =   require("../config/passport");
const {User}    =   require("../model/user");


router.get("/", (req, res) => {
    res.send("Hii");
});


router.post('/api/user/login', (req, res) => {
    const loginUser      =   new User({
        username : req.body.name,
        password : req.body.password
    });

    //find email
    User.findOne({email: req.body.email}, (err, foundUser) => {
        if(err){
            console.log(err);
        }else{
            if(!foundUser){
                return res.json({
                    loginSuccess: false,
                    message: "Email not found"
                });
            }else{
                //compare password
                bcrypt.compare(req.body.password, foundUser.password, (err, result)=>{
                    if (result === true){
                        req.login(loginUser, err =>{
                            if(err){
                                console.log(err);
                                return res.json({
                                    login: false,
                                    message: "login failed"
                                });
                            }else{
                                passport.authenticate("local")(req, res, () =>{
                                    return res.json({
                                        authentication: true,
                                        message: "the user is authenticated"
                                    });
                                })
                            }
                        });
                        
                    }else{
                        console.log(err);
                        return res.json({
                            loginSuccess: false,
                            message: "No match"
                        });

                    }
                })
            }
        }
    });

    //generate token
});

router.post('/api/user/logout', (req, res) => {
    if(req.isAuthenticated()){
        req.logOut(err =>{res.json({logout: false, message: "logout failed"});});
        res.send("You're logged out");
    }else{
        res.send("You didn't log in");
    }
});

router.post('/api/users/register', (req, res) =>{
    bcrypt.hash(req.body.password, saltRounds, (err, hash) =>{
        // user.save((err, userData) => {
        //     if(err){
        //         console.log(err);
        //         return res.json({success: false, err});  
        //     } 
        // });

        User.register(new User({username: req.body.name, lastname: req.body.lastname, email: req.body.email, password: hash})
                    , req.body.password, (err, registeredUser) =>{
            if(err){
                console.log(err);
                return res.json({
                    registration: false,
                    message: "Registration failed"
                });
            }else{
                passport.authenticate("local")(req, res, function(){
                    return res.json({
                        registration: true,
                        message: "Registration is successful"
                    });
                });
            }
        });
    });

});

module.exports = router;