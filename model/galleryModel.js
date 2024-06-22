const mongoose = require ("mongoose");

const galleryUploadSchema = new mongoose.Schema({
    image:{
        type: String,
    }
},{timestamps: true})

const galleryUploadModal = mongoose.model('galleryUploadModal', galleryUploadSchema);
module.exports = galleryUploadModal;





