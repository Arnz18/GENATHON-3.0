const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRegistration = new Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true ,
        lowercase : true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },
    age : {
        type : Number,
        type : required
    },
    college : {
        type : String,
        required : true
    },
    linkdin : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    }       
} 
);


const User = mongoose.model("User",userRegistration);

module.exports = User;