const express = require ("express");
const router = express.Router();
const controller  = require ("../controller/fileUploadController");

//routes
router.post('/uploadImg', controller.imageUpload);
router.get("/allUser", controller.getAllUsers);
router.delete('/deleteUser/:id', controller.deleteUser);
router.put("/updateUser/:id", controller.updateUser);
router.get("/totalUser", controller.totalUsers);
router.post("/gallery", controller.galleryUpload);
router.get("/getAllPhoto", controller.getAllGalleryPhoto);
router.post('/announcement', controller.announcementUpload);
router.get("/allAnnouncement", controller.getAllAnnouncement);



module.exports = router;