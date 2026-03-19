import dotenv from 'dotenv';
dotenv.config();
import multer from "multer";
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
// import crypto from "crypto"
// import path from "path";
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './upload')
//     },
//     filename: (req, file, cb) => {
//         crypto.randomBytes(12, (err, bytes) => {
//             const fn = bytes.toString("hex") + path.extname(file.originalname)
//             cb(null, fn)
//         })
//         console.log("image")
//     }
// })

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'User Profile',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    }
})
const upload = multer({ storage })
export default upload;