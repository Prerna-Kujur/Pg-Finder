const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the storage for multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Create the uploads folder if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating uploads directory:', err);
      }
    });
    
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    const fileName = `profile_${Date.now()}${ext}`;
    callback(null, fileName);
  },
});

// Initialize multer with the defined storage
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, callback) => {
    // Ensure only image files with specific extensions are allowed
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(ext)) {
      return callback(null, true);
    }

    const error = new Error('Invalid file type. Only images are allowed.');
    error.status = 400;
    callback(error);
  },
});

module.exports = upload;








// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Define the storage for multer
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     const uploadDir = path.join(__dirname, '../uploads');
//     fs.mkdirSync(uploadDir, { recursive: true }); // Create the uploads folder if it doesn't exist
//     callback(null, uploadDir);
//   },
//   filename: (req, file, callback) => {
//     const ext = path.extname(file.originalname);
//     const fileName = `profile_${Date.now()}${ext}`;
//     callback(null, fileName);
//   },
// });

// // Initialize multer with the defined storage
// const upload = multer({ storage });

// module.exports = upload;
