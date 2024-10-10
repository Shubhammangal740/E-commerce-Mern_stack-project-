const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images", // Optional: specify a folder in Cloudinary
    allowed_formats: ["jpg", "png"], // Allowed file formats
    public_id: (req, file) => file.originalname, // Optionally use the original filename
  },
});

// Multer upload middleware using Cloudinary storage
const upload = multer({ storage });

module.exports = upload;
