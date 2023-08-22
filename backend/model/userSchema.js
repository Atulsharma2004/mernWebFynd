const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: String,
    cpassword: String,
    image: String
})

//Modal

const userModel = mongoose.model('user', userSchema)

module.exports= userModel;