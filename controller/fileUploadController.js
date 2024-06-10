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













const fileUploadModal = require("../model/fileUploadModel");
const cloudinary = require("cloudinary").v2;

async function isFileSupported(type) {
    const supportedTypes = ['jpg', 'jpeg', 'png'];
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
      const { name, position , gender} = req.body;
      const file = req.files && req.files.image ? req.files.image : null;
  
      if (!file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
  
      const fileType = file.name.split('.').pop().toLowerCase();
      if (!(await isFileSupported(fileType))) {
        return res.status(400).json({ success: false, message: 'File format is not supported' });
      }
  
      const response = await uploadFileToCloudinary(file, 'userImage', 30);
      if (!response.secure_url) {
        return res.status(500).json({ success: false, message: "Failed to upload image" });
      }
  
      const fileData = await fileUploadModal.create({ name, position, gender, image: response.secure_url });
  
      return res.status(201).json({ success: true, message: 'User created successfully', fileData });
    } catch (error) {
      console.error("Error while uploading file:", error);
      return res.status(500).json({ success: false, message: `Error while uploading file: ${error.message}` });
    }
  };
  

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await fileUploadModal.find({});
        if (allUsers.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" });
        }
        return res.status(200).json({ success: true, message: "Users found", users: allUsers });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position } = req.body;
        const file = req.files && req.files.image ? req.files.image : null;

        // Update name and position
        const updateFields = { name, position };

        // If there's a file, update image
        if (file) {
            const fileType = file.name.split('.').pop().toLowerCase();
            if (!(await isFileSupported(fileType))) {
                return res.status(400).json({ success: false, message: 'File format is not supported' });
            }
            const result = await uploadFileToCloudinary(file, 'userImage', 30);
            if (!result.secure_url) {
                return res.status(500).json({ success: false, message: "Failed to upload image" });
            }
            updateFields.image = result.secure_url;
        }

        const updatedUser = await fileUploadModal.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

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
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
}





//total users
exports.totalUsers = async (req, res) => {
    try {
      const totalUsers = await fileUploadModal.countDocuments();
      res.status(200).json({ success: true, message: "Total users fetched successfully", count: totalUsers });
    } catch (error) {
      console.error('Error fetching total users:', error);
      res.status(500).json({ success: false, message: "Internal Server Error." });
    }
  };
