const cloudinary = require("../config/cloudinary");

// Upload an image buffer to Cloudinary.
const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        // Send the image data from memory to Cloudinary.
        uploadStream.end(fileBuffer);
    });
};

module.exports = uploadToCloudinary;