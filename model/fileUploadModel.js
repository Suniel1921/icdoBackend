const mongoose = require ("mongoose");

const fileUploadSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, 'Name is required'],
    },
    position : {
        type: String,
        required: [true, 'Position is required']
    },
    gender:{
        type: String,
        required: [true, 'Gender is required']
    },
    image:{
        type: String,
    }
},{timestamps: true})

const fileUploadModal = mongoose.model('fileUploadModel', fileUploadSchema);
module.exports = fileUploadModal;