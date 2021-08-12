const mongoose      =   require("mongoose");
const passportLocalMongoose =   require("passport-local-mongoose");

const userSchema    =   mongoose.Schema({
    name:{
        type: String,
        maxlength:50
    },
    email:{
        type: String,
        trim: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    //to distinguish admin and regular user
    role : {
        type: Number,
        default: 0
    },
    token: {
        type: String,
    },
    tokenExp:{
        type: Number
    }

})  ; 


userSchema.plugin(passportLocalMongoose);
const User  =   mongoose.model('User', userSchema);

module.exports  =   {User};