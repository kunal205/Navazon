import multer from "multer";
import crypto from "crypto"
import path from "path";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("dbfhjbfghb")
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(12, (err, bytes) => {
            const fn = bytes.toString("hex") + path.extname(file.originalname)
            cb(null, fn)
        })
        console.log("image")
    }
})
const upload = multer({ storage })
export default upload;