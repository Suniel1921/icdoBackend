const mongoose = require ("mongoose");

const contactSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
    },
    phone:{
        type: Number,
        required : true,
    },
    subject: {
        type : String,
        required: true,
    },
    message : {
        type : String,
        required: true,
    }
},{timestamps: true})

const contactModel = mongoose.model('ContactModel', contactSchema);
module.exports = contactModel;