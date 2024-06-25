// const fileUploadModal = require("../model/fileUploadModel");
// const cloudinary = require("cloudinary").v2;

// function isFileSupported(type, supportedTypes){
//     return supportedTypes.includes(type);
// }

// async function uploadFileToCloudinary(file, folder, quality){
//     const options = {folder, resource_type: 'auto'};
//     if (quality){
//         options.quality = quality;
//     }
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }

// exports.imageUpload = async (req, res) => {
//     try {

//         const { name, position } = req.body;
//         const file = req.files && req.files.image ? req.files.image : null; // Updated to access 'image' property
        
//         if (!file) {
//             return res.status(400).json({ success: false, message: "No file uploaded" });
//         }
        
//         // Validation
//         const supportedTypes = ['jpg', 'jpeg', 'png'];
//         const fileType = file.name.split('.').pop().toLowerCase();
        
//         if (!isFileSupported(fileType, supportedTypes)) {
//             return res.status(400).json({ success: false, message: 'File format is not supported' });
//         }

//         // Upload file to Cloudinary
//         const response = await uploadFileToCloudinary(file, 'userImage', 30);

//         // Save new user with uploaded image URL
//         const fileData = await fileUploadModal.create({ name, position, image: response.secure_url });
        
//         return res.status(201).json({ success: true, message: 'User created successfully', fileData });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: `Error while uploading file: ${error.message}` });
//     }
// };






// // Get all users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const allUsers = await fileUploadModal.find({});
        
//         if (allUsers.length === 0) {
//             return res.status(404).json({ success: false, message: "No users found" });
//         }
        
//         return res.status(200).json({ success: true, message: "Users found", users: allUsers });
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// }


// // Update user
// exports.updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, position } = req.body;

//         // Check if an image was uploaded
//         if (!req.files || !req.files.image) {
//             return res.status(400).json({ success: false, message: "No image uploaded" });
//         }

//         // Get the uploaded image
//         const { image } = req.files;

//         // Assuming you're using Cloudinary, upload the image
//         const result = await cloudinary.uploader.upload(image.tempFilePath);

//         // Check if the image was uploaded successfully
//         if (!result.secure_url) {
//             return res.status(500).json({ success: false, message: "Failed to upload image" });
//         }

//         // Update the user with the new image URL
//         const updatedUser = await fileUploadModal.findByIdAndUpdate(
//             id,
//             { name, position, image: result.secure_url },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         return res.status(200).json({ success: true, message: "User updated successfully", updatedUser });
//     } catch (error) {
//         console.error("Error updating user:", error);
//         return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
//     }
// };





// //delete user
// exports.deleteUser = async (req, res)=>{
//     try {
//         const {id} = req.params;
//         const deleteUser = await fileUploadModal.findByIdAndDelete(id);
//         if(!deleteUser){
//             return res.status({success: false, message: 'User not found'});
//         }
//         return res.status(200).send({success: true, message: 'User deleted successfully'})

        
//     } catch (error) {
        
//     }
// }









const announceUploadModal = require("../model/announceModel");
const fileUploadModal = require("../model/fileUploadModel");
const galleryUploadModal = require("../model/galleryModel");
const cloudinary = require("cloudinary").v2;

const supportedTypes = ['jpg', 'jpeg', 'png'];

async function isFileSupported(type) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder, resource_type: 'auto' };
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        const { name, position, gender,stafforBoardMember } = req.body;
        const file = req.files && req.files.image ? req.files.image : null;

        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const fileType = file.name.split('.').pop().toLowerCase();
        if (!isFileSupported(fileType)) {
            return res.status(400).json({ success: false, message: 'File format is not supported' });
        }

        const response = await uploadFileToCloudinary(file, 'userImage', 30);
        if (!response.secure_url) {
            return res.status(500).json({ success: false, message: "Failed to upload image" });
        }

        const fileData = await fileUploadModal.create({ name, position, gender,stafforBoardMember, image: response.secure_url });

        return res.status(201).json({ success: true, message: 'User created successfully', fileData });
    } catch (error) {
        console.error("Error while uploading file:", error);
        return res.status(500).json({ success: false, message: `Error while uploading file: ${error.message}` });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await fileUploadModal.find({});
        if (!allUsers.length) {
            return res.status(404).json({ success: false, message: "No users found" });
        }
        return res.status(200).json({ success: true, message: "Users found", users: allUsers });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position } = req.body;
        const file = req.files && req.files.image ? req.files.image : null;

        const updateFields = { name, position };

        if (file) {
            const fileType = file.name.split('.').pop().toLowerCase();
            if (!isFileSupported(fileType)) {
                return res.status(400).json({ success: false, message: 'File format is not supported' });
            }
            const result = await uploadFileToCloudinary(file, 'userImage', 30);
            if (!result.secure_url) {
                return res.status(500).json({ success: false, message: "Failed to upload image" });
            }
            updateFields.image = result.secure_url;
        }

        const updatedUser = await fileUploadModal.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await fileUploadModal.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status (500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};

exports.totalUsers = async (req, res) => {
    try {
        const totalUsers = await fileUploadModal.countDocuments();
        res.status(200).json({ success: true, message: "Total users fetched successfully", count: totalUsers });
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
};



// *************************gallery photo uploader**********************************

exports.galleryUpload = async (req, res) => {
    try {
        const file = req.files && req.files.image ? req.files.image : null;

        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const fileType = file.name.split('.').pop().toLowerCase();
        if (!isFileSupported(fileType)) {
            return res.status(400).json({ success: false, message: 'File format is not supported' });
        }

        const response = await uploadFileToCloudinary(file, 'userImage', 30);
        if (!response.secure_url) {
            return res.status(500).json({ success: false, message: "Failed to upload image" });
        }

        const fileData = await galleryUploadModal.create({image: response.secure_url });

        return res.status(201).json({ success: true, message: 'Image uploaded successfully', fileData });
    } catch (error) {
        console.error("Error while uploading file:", error);
        return res.status(500).json({ success: false, message: `Error while uploading file: ${error.message}` });
    }
};

exports.getAllGalleryPhoto = async (req, res) => {
    try {
        const allPhoto = await galleryUploadModal.find({});
        if (!allPhoto.length) {
            return res.status(404).json({ success: false, message: "No photos found" });
        }
        return res.status(200).json({ success: true, message: "Photos found", allPhoto });
    } catch (error) {
        console.error("Error fetching photos:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.deleteGalleryPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await galleryUploadModal.findByIdAndDelete(id);
        if (!photo) {
            return res.status(404).json({ success: false, message: "Photo not found" });
        }
        return res.status(200).json({ success: true, message: "Photo deleted successfully" });
    } catch (error) {
        console.error("Error deleting photo:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// *******************announcement api*******************

exports.announcementUpload = async (req, res) => {
    try {
        const { title } = req.body;
        const file = req.files && req.files.image ? req.files.image : null;

        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const fileType = file.name.split('.').pop().toLowerCase();
        if (!isFileSupported(fileType)) {
            return res.status(400).json({ success: false, message: 'File format is not supported' });
        }

        const response = await uploadFileToCloudinary(file, 'userImage', 30);
        if (!response.secure_url) {
            return res.status(500).json({ success: false, message: "Failed to upload image" });
        }

        const fileData = await announceUploadModal.create({ title, image: response.secure_url });

        return res.status(201).json({ success: true, message: 'Announcement uploaded successfully', fileData });
    } catch (error) {
        console.error("Error while uploading file:", error);
        return res.status(500).json({ success: false, message: `Error while uploading file: ${error.message}` });
    }
};

exports.getAllAnnouncement = async (req, res) => {
    try {
        const allAnnouncement = await announceUploadModal.find({});
        if (!allAnnouncement.length) {
            return res.status(404).json({ success: false, message: "No announcements found" });
        }
        return res.status(200).json({ success: true, message: "Announcements found", allAnnouncement });
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const announcement = await announceUploadModal.findByIdAndDelete(id);
        if (!announcement) {
            return res.status(404).json({ success: false, message: "Announcement not found" });
        }
        return res.status(200).json({ success: true, message: "Announcement deleted successfully" });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
