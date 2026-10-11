const cloudinary = require("cloudinary").v2;

// Configure Cloudinary using credentials from the .env file.
cloudinary.config({
cloud_name: process.env.CLOUDINARY_NAME,
api_key: process.env.CLOUDINARY_KEY,
api_secret: process.env.CLOUDINARY_SECRET
});

// Make Cloudinary available to other files in our application.
module.exports = cloudinary;
