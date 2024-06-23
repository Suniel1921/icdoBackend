const mongoose = require ("mongoose");

const announceUploadSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    }
},{timestamps: true})

const announceUploadModal = mongoose.model('announceUploadModal', announceUploadSchema);
module.exports = announceUploadModal;





