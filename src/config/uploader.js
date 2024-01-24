require('dotenv').config({path: '../.env'});
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dvapewbfh',
    api_key: '217879581987317',
    api_secret: 'tW467HJUDJbVWRnd9Qd7hgXZ64s'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // Corrected spelling
    params: {
        folder: 'images',
        allowed_formats: ['jpg', 'png'] // Corrected spelling
    }
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;
