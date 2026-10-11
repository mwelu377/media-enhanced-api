const multer = require("multer");

// Keep uploaded files in memory temporarily.
const storage = multer.memoryStorage();

// Allow image files only.
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Configure Multer.
const upload = multer({
    storage: storage,

    // Maximum size of each uploaded file: 3 MB.
    limits: {
        fileSize: 3 * 1024 * 1024
    },

    fileFilter: fileFilter
});

// Make the upload configuration available to other files.
module.exports = upload;