const multer = require("multer");

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Rename uploaded files with unique names
  },
});

const upload = multer({ storage: storage });

// Middleware to handle a single thumbnail image upload
const uploadThumbnailImage = upload.single("thumbnailImage");


module.exports = uploadThumbnailImage;